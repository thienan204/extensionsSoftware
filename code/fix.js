const fs = require('fs');
let code = fs.readFileSync('contents/validator.ts', 'utf8');

const target1 = `        } else if (action === "SET_VALUE") {`;
const target2 = `          if (!rule.logic) continue;`;

const replacement = `        } else if (action === "SET_VALUE" || action === "SAVE_TO_STORAGE") {
          if (!rule.logic) continue;
          const isConditionMet = evaluateGroupSync(rule.logic, rule.id);
          const previousState = ruleStates.get(rule.id);
          
          if (isConditionMet && previousState !== true) {
            if (action === "SET_VALUE") {
              if (rule.targetSelector && rule.setValueConfig?.value !== undefined) {
                const finalValue = resolveDynamicValueSync(rule.setValueConfig!.value);
                const targetEls = document.querySelectorAll(rule.targetSelector);
                targetEls.forEach(el => {
                  if ((el as HTMLInputElement).value !== finalValue) {
                    (el as HTMLInputElement).value = finalValue;
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    
                    window.dispatchEvent(new CustomEvent("CARECHECK_TRIGGER_JQUERY_CHANGE", {
                      detail: {
                        selector: rule.targetSelector,
                        value: finalValue
                      }
                    }));
                  }
                });
              }
            } else if (action === "SAVE_TO_STORAGE") {
              if (rule.targetSelector && rule.setValueConfig?.value !== undefined) {
                const finalValue = resolveDynamicValueSync(rule.setValueConfig!.value);
                try {
                  if (rule.targetSelector.startsWith("SESSION:")) {
                    sessionStorage.setItem("CARECHECK_" + rule.targetSelector.substring(8).trim(), finalValue);
                  } else {
                    localStorage.setItem("CARECHECK_" + rule.targetSelector.trim(), finalValue);
                  }
                  console.log(\`[CareCheck DEBUG] SAVE_TO_STORAGE (REALTIME) kích hoạt cho luật \${rule.id}. Lưu giá trị: "\${finalValue}" vào biến "\${rule.targetSelector}"\`);
                } catch (e) {}
              }
            }
            ruleStates.set(rule.id, true);
          } else if (!isConditionMet) {
            ruleStates.set(rule.id, false);
          }`;

let lines = code.split('\\n');
let start = -1;
let end = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('} else if (action === "SET_VALUE") {') && lines[i+1].includes('if (!rule.logic) continue;')) {
    start = i;
  }
  if (start !== -1 && i > start && lines[i].includes('} else if (!isConditionMet) {')) {
    end = i + 3; // } else if (!isConditionMet) { ruleStates.set... }
    break;
  }
}

if (start !== -1 && end !== -1) {
  let chunk = lines.slice(start, end).join('\\n');
  code = code.replace(chunk, replacement);
  fs.writeFileSync('contents/validator.ts', code);
  console.log('replaced successfully');
} else {
  console.log('not found');
}
