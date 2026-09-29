(function(define){var __define; typeof define === "function" && (__define=define,define=null);
// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"93xyw":[function(require,module,exports) {
var d = globalThis.process?.argv || [];
var y = ()=>globalThis.process?.env || {};
var H = new Set(d), _ = (e)=>H.has(e), G = d.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var Z = _("--dry-run"), p = ()=>_("--verbose") || y().VERBOSE === "true", q = p();
var u = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var x = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), v = (...e)=>u("\uD83D\uDD35 INFO", ...e), m = (...e)=>u("\uD83D\uDFE0 WARN", ...e), S = 0, c = (...e)=>p() && u(`\u{1F7E1} ${S++}`, ...e);
var n = {
    "isContentScript": true,
    "isBackground": false,
    "isReact": false,
    "runtimes": [
        "script-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "D:\\1.ProjectBVDKLS\\extensionsSoftware\\code\\contents\\validator.ts",
    "bundleId": "dc17cbb608f00271",
    "envHash": "e792fbbdaa78ee84",
    "verbose": "false",
    "secure": false,
    "serverPort": 1012
};
module.bundle.HMR_BUNDLE_ID = n.bundleId;
globalThis.process = {
    argv: [],
    env: {
        VERBOSE: n.verbose
    }
};
var D = module.bundle.Module;
function I(e) {
    D.call(this, e), this.hot = {
        data: module.bundle.hotData[e],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(t) {
            this._acceptCallbacks.push(t || function() {});
        },
        dispose: function(t) {
            this._disposeCallbacks.push(t);
        }
    }, module.bundle.hotData[e] = void 0;
}
module.bundle.Module = I;
module.bundle.hotData = {};
var l = globalThis.browser || globalThis.chrome || null;
function b() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function C() {
    return n.port || location.port;
}
var E = "__plasmo_runtime_script_";
function L(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function O(e = C()) {
    let t = b();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function B(e) {
    typeof e.message == "string" && x("[plasmo/parcel-runtime]: " + e.message);
}
function P(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(O());
    return t.addEventListener("message", async function(o) {
        let r = JSON.parse(o.data);
        if (r.type === "update" && await e(r.assets), r.type === "error") for (let a of r.diagnostics.ansi){
            let w = a.codeframe || a.stack;
            m("[plasmo/parcel-runtime]: " + a.message + `
` + w + `

` + a.hints.join(`
`));
        }
    }), t.addEventListener("error", B), t.addEventListener("open", ()=>{
        v(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        m(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var s = "__plasmo-loading__";
function $() {
    let e = globalThis.window?.trustedTypes;
    if (typeof e > "u") return;
    let t = document.querySelector('meta[name="trusted-types"]')?.content?.split(" "), o = t ? t[t?.length - 1].replace(/;/g, "") : void 0;
    return typeof e < "u" ? e.createPolicy(o || `trusted-html-${s}`, {
        createHTML: (a)=>a
    }) : void 0;
}
var T = $();
function g() {
    return document.getElementById(s);
}
function f() {
    return !g();
}
function F() {
    let e = document.createElement("div");
    e.id = s;
    let t = `
  <style>
    #${s} {
      background: #f3f3f3;
      color: #333;
      border: 1px solid #333;
      box-shadow: #333 4.7px 4.7px;
    }

    #${s}:hover {
      background: #e3e3e3;
      color: #444;
    }

    @keyframes plasmo-loading-animate-svg-fill {
      0% {
        fill: transparent;
      }
    
      100% {
        fill: #333;
      }
    }

    #${s} .svg-elem-1 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.8s both infinite;
    }

    #${s} .svg-elem-2 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 0.9s both infinite;
    }
    
    #${s} .svg-elem-3 {
      animation: plasmo-loading-animate-svg-fill 1.47s cubic-bezier(0.47, 0, 0.745, 0.715) 1s both infinite;
    }

    #${s} .hidden {
      display: none;
    }

  </style>
  
  <svg height="32" width="32" viewBox="0 0 264 354" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M139.221 282.243C154.252 282.243 166.903 294.849 161.338 308.812C159.489 313.454 157.15 317.913 154.347 322.109C146.464 333.909 135.26 343.107 122.151 348.538C109.043 353.969 94.6182 355.39 80.7022 352.621C66.7861 349.852 54.0034 343.018 43.9705 332.983C33.9375 322.947 27.105 310.162 24.3369 296.242C21.5689 282.323 22.9895 267.895 28.4193 254.783C33.8491 241.671 43.0441 230.464 54.8416 222.579C59.0353 219.777 63.4908 217.438 68.1295 215.588C82.0915 210.021 94.6978 222.671 94.6978 237.703L94.6978 255.027C94.6978 270.058 106.883 282.243 121.914 282.243H139.221Z" fill="#333" class="svg-elem-1" ></path>
    <path d="M192.261 142.028C192.261 126.996 204.867 114.346 218.829 119.913C223.468 121.763 227.923 124.102 232.117 126.904C243.915 134.789 253.11 145.996 258.539 159.108C263.969 172.22 265.39 186.648 262.622 200.567C259.854 214.487 253.021 227.272 242.988 237.308C232.955 247.343 220.173 254.177 206.256 256.946C192.34 259.715 177.916 258.294 164.807 252.863C151.699 247.432 140.495 238.234 132.612 226.434C129.808 222.238 127.47 217.779 125.62 213.137C120.056 199.174 132.707 186.568 147.738 186.568L165.044 186.568C180.076 186.568 192.261 174.383 192.261 159.352L192.261 142.028Z" fill="#333" class="svg-elem-2" ></path>
    <path d="M95.6522 164.135C95.6522 179.167 83.2279 191.725 68.8013 187.505C59.5145 184.788 50.6432 180.663 42.5106 175.227C26.7806 164.714 14.5206 149.772 7.28089 132.289C0.041183 114.807 -1.85305 95.5697 1.83772 77.0104C5.52849 58.4511 14.6385 41.4033 28.0157 28.0228C41.393 14.6423 58.4366 5.53006 76.9914 1.83839C95.5461 -1.85329 114.779 0.0414162 132.257 7.2829C149.735 14.5244 164.674 26.7874 175.184 42.5212C180.62 50.6576 184.744 59.5332 187.46 68.8245C191.678 83.2519 179.119 95.6759 164.088 95.6759L122.869 95.6759C107.837 95.6759 95.6522 107.861 95.6522 122.892L95.6522 164.135Z" fill="#333" class="svg-elem-3"></path>
  </svg>
  <span class="hidden">Context Invalidated, Press to Reload</span>
  `;
    return e.innerHTML = T ? T.createHTML(t) : t, e.style.pointerEvents = "none", e.style.position = "fixed", e.style.bottom = "14.7px", e.style.right = "14.7px", e.style.fontFamily = "sans-serif", e.style.display = "flex", e.style.justifyContent = "center", e.style.alignItems = "center", e.style.padding = "14.7px", e.style.gap = "14.7px", e.style.borderRadius = "4.7px", e.style.zIndex = "2147483647", e.style.opacity = "0", e.style.transition = "all 0.47s ease-in-out", e;
}
function N(e) {
    return new Promise((t)=>{
        document.documentElement ? (f() && (document.documentElement.appendChild(e), t()), t()) : globalThis.addEventListener("DOMContentLoaded", ()=>{
            f() && document.documentElement.appendChild(e), t();
        });
    });
}
var k = ()=>{
    let e;
    if (f()) {
        let t = F();
        e = N(t);
    }
    return {
        show: async ({ reloadButton: t = !1 } = {})=>{
            await e;
            let o = g();
            o.style.opacity = "1", t && (o.onclick = (r)=>{
                r.stopPropagation(), globalThis.location.reload();
            }, o.querySelector("span").classList.remove("hidden"), o.style.cursor = "pointer", o.style.pointerEvents = "all");
        },
        hide: async ()=>{
            await e;
            let t = g();
            t.style.opacity = "0";
        }
    };
};
var W = `${E}${module.id}__`, i, A = !1, M = k();
async function h() {
    c("Script Runtime - reloading"), A ? globalThis.location?.reload?.() : M.show({
        reloadButton: !0
    });
}
function R() {
    i?.disconnect(), i = l?.runtime.connect({
        name: W
    }), i.onDisconnect.addListener(()=>{
        h();
    }), i.onMessage.addListener((e)=>{
        e.__plasmo_cs_reload__ && h(), e.__plasmo_cs_active_tab__ && (A = !0);
    });
}
function j() {
    if (l?.runtime) try {
        R(), setInterval(R, 24e3);
    } catch  {
        return;
    }
}
j();
P(async (e)=>{
    c("Script runtime - on updated assets"), e.filter((o)=>o.envHash === n.envHash).some((o)=>L(module.bundle, o.id)) && (M.show(), l?.runtime ? i.postMessage({
        __plasmo_cs_changed__: !0
    }) : setTimeout(()=>{
        h();
    }, 4700));
});

},{}],"lNypx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "config", ()=>config);
parcelHelpers.export(exports, "showWarningUI", ()=>showWarningUI);
parcelHelpers.export(exports, "resolveDynamicValueSync", ()=>resolveDynamicValueSync);
parcelHelpers.export(exports, "evaluateRuleAndUpdateStateSync", ()=>evaluateRuleAndUpdateStateSync);
var _storage = require("@plasmohq/storage");
const config = {
    matches: [
        "*://*.vncare.vn/*"
    ],
    all_frames: true
};
const storage = new (0, _storage.Storage)({
    area: "local"
});
const RULES_STORAGE_KEY = "mock_db_rules";
// \u0110\u00e1nh d\u1ea5u ph\u1ea7n t\u1eed \u0111\u00e3 b\u1ecb l\u1ed7i \u0111\u1ec3 qu\u1ea3n l\u00fd
const ERROR_ATTR = "data-carecheck-error";
const TOAST_CONTAINER_ID = "carecheck-toast-container";
const ruleStates = window.__carecheckRuleStates = window.__carecheckRuleStates || new Map();
const dismissedRules = window.__carecheckDismissedRules = window.__carecheckDismissedRules || new Set();
const ruleOffendingValues = window.__carecheckOffendingValues = window.__carecheckOffendingValues || new Map();
let activeRules = [];
// B\u01a1m CSS Animation cho Toast
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
    @keyframes carecheck-slide-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
    document.head.appendChild(style);
}
async function showWarningUI(rule) {
    if (dismissedRules.has(rule.id)) return;
    const warningId = `carecheck-warning-${rule.id}`;
    const existingWarning = document.getElementById(warningId);
    if (existingWarning) existingWarning.remove(); // X\u00f3a Toast c\u0169 \u0111\u1ec3 c\u1eadp nh\u1eadt Toast m\u1edbi (khi click li\u00ean ti\u1ebfp nhi\u1ec1u row)
    const config = rule.warningConfig || {
        template: "TOAST",
        position: "BOTTOM_RIGHT",
        title: "",
        message: rule.message || "C\u1ea3nh b\xe1o L\u1ed7i!"
    };
    // H\u00e0m x\u1eed l\u00fd th\u00f4ng \u0111i\u1ec7p \u0111\u1ed9ng (String Interpolation)
    const interpolateString = async (str)=>{
        if (!str) return str;
        const matches = str.match(/\{\{([^}]+)\}\}/g);
        if (!matches) return str;
        let result = str;
        for (const match of matches){
            if (match === "{{VALUE}}") continue; // S\u1ebd \u0111\u01b0\u1ee3c x\u1eed l\u00fd ri\u00eang \u1edf d\u01b0\u1edbi
            const fullPath = match.replace(/[{}]/g, "").trim();
            const parts = fullPath.split(".");
            if (parts.length > 0) {
                const storageKey = parts[0];
                const data = await storage.get(storageKey);
                let val = "";
                if (data) {
                    const extracted = extractFromPath(data, parts.slice(1).join("."));
                    val = extracted != null ? String(extracted) : "";
                }
                // Replace all occurrences of this specific match
                result = result.split(match).join(val);
            }
        }
        // Thay th\u1ebf nhanh {{VALUE}} b\u1eb1ng gi\u00e1 tr\u1ecb vi ph\u1ea1m (n\u1ebfu c\u00f3)
        const offendingValue = window.__carecheckOffendingValues?.get(rule.id) || "";
        result = result.replace(/\{\{VALUE\}\}/g, offendingValue);
        return result;
    };
    const messageText = await interpolateString(config.message);
    const titleText = await interpolateString(config.title || "");
    if (!messageText) return; // N\u1ebfu r\u1ed7ng th\u00ec \u1ea9n \u0111i theo rule
    const wrapper = document.createElement("div");
    wrapper.id = warningId;
    wrapper.style.zIndex = "2147483647"; // Max z-index
    wrapper.style.pointerEvents = "auto";
    wrapper.style.fontFamily = "sans-serif";
    // H\u00e0m t\u1ea1o N\u00fat H\u00e0nh \u0111\u1ed9ng
    const createActionBtn = ()=>{
        if (!rule.toastAction?.apiUrl || !rule.toastAction?.label) return null;
        const btn = document.createElement("button");
        btn.innerText = rule.toastAction.label;
        btn.style.cssText = "background: white; color: #ef4444; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; font-size: 14px; cursor: pointer;";
        if (config.template === "TOAST") btn.style.marginLeft = "auto";
        if (config.template === "MODAL") btn.style.marginTop = "12px";
        btn.onclick = async (e)=>{
            e.stopPropagation();
            try {
                btn.innerText = "\u0110ang x\u1eed l\xfd...";
                btn.disabled = true;
                let username = "";
                if (rule.toastAction.userSelector) try {
                    const userEl = document.querySelector(rule.toastAction.userSelector);
                    username = userEl ? userEl.value || userEl.textContent || "" : "";
                } catch (e) {
                    console.error(`[CareCheck] Invalid userSelector in toastAction: ${rule.toastAction.userSelector}`);
                }
                const offendingValue = ruleOffendingValues.get(rule.id) || "";
                const res = await fetch(rule.toastAction.apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username.trim(),
                        error_value: offendingValue.trim()
                    })
                });
                if (res.ok) {
                    btn.style.background = "#22c55e";
                    btn.style.color = "white";
                    btn.innerText = "\u2713 Th\xe0nh c\xf4ng";
                    setTimeout(()=>wrapper.remove(), 2000);
                } else btn.innerText = "\u274c L\u1ed7i Server";
            } catch (err) {
                btn.innerText = "\u274c L\u1ed7i M\u1ea1ng";
            }
        };
        return btn;
    };
    const actionBtn = createActionBtn();
    const closeBtnHtml = `<button class="carecheck-close-btn" style="background:none;border:none;color:inherit;cursor:pointer;font-size:20px;opacity:0.8;padding:0;line-height:1;" title="\u0110\u00f3ng">\u2715</button>`;
    if (config.template === "MODAL") {
        wrapper.style.position = "fixed";
        wrapper.style.inset = "0";
        wrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        wrapper.style.backdropFilter = "blur(4px)";
        wrapper.style.display = "flex";
        // Position alignment cho Modal (CENTER l\u00e0 m\u1eb7c \u0111\u1ecbnh)
        wrapper.style.alignItems = "center";
        wrapper.style.justifyContent = "center";
        wrapper.innerHTML = `
      <div class="carecheck-modal-content" style="background: white; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); max-width: 500px; width: 90%; overflow: hidden; animation: carecheck-slide-in 0.3s ease-out;">
        <div style="background: #ef4444; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; display: flex; gap: 8px; align-items: center;">
            <span style="font-size: 24px;">\u26a0\ufe0f</span> ${titleText || "C\u1ea3nh b\xe1o H\u1ec7 th\u1ed1ng"}
          </h2>
          ${closeBtnHtml}
        </div>
        <div style="padding: 24px; color: #1e293b; font-size: 16px; line-height: 1.5;">
          ${messageText}
        </div>
        <div class="carecheck-action-container" style="padding: 0 24px 24px; display: flex; justify-content: flex-end;"></div>
      </div>
    `;
        // \u0110\u00f3ng khi click X ho\u1eb7c ra ngo\u00e0i n\u1ec1n
        wrapper.onclick = (e)=>{
            if (e.target === wrapper) {
                wrapper.remove();
                dismissedRules.add(rule.id);
            }
        };
        wrapper.querySelector(".carecheck-close-btn")?.addEventListener("click", ()=>{
            wrapper.remove();
            dismissedRules.add(rule.id);
        });
        if (actionBtn) {
            actionBtn.style.background = "#ef4444";
            actionBtn.style.color = "white";
            wrapper.querySelector(".carecheck-action-container")?.appendChild(actionBtn);
        }
        document.body.appendChild(wrapper);
    } else if (config.template === "BANNER") {
        wrapper.style.position = "fixed";
        wrapper.style.left = "0";
        wrapper.style.right = "0";
        if (config.position === "BOTTOM_CENTER") wrapper.style.bottom = "0";
        else wrapper.style.top = "0";
        wrapper.style.backgroundColor = "#ef4444";
        wrapper.style.color = "white";
        wrapper.style.padding = "12px 24px";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.justifyContent = "center";
        wrapper.style.gap = "16px";
        wrapper.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
        wrapper.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; flex: 1; max-width: 1200px; margin: 0 auto;">
        <span style="font-size: 20px;">\u26a0\ufe0f</span>
        ${titleText ? `<strong>${titleText}:</strong>` : ""} 
        <span>${messageText}</span>
        <div class="carecheck-action-container" style="margin-left: auto; display: flex; align-items: center; gap: 16px;">
          ${closeBtnHtml}
        </div>
      </div>
    `;
        wrapper.querySelector(".carecheck-close-btn")?.addEventListener("click", ()=>wrapper.remove());
        if (actionBtn) wrapper.querySelector(".carecheck-action-container")?.prepend(actionBtn);
        document.body.appendChild(wrapper);
    } else {
        // TOAST (M\u1eb7c \u0111\u1ecbnh)
        wrapper.style.backgroundColor = "#ef4444"; // red-500
        wrapper.style.color = "white";
        wrapper.style.padding = "16px 24px";
        wrapper.style.borderRadius = "8px";
        wrapper.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.3)";
        wrapper.style.fontWeight = "bold";
        wrapper.style.fontSize = "16px";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.gap = "12px";
        wrapper.style.animation = "carecheck-slide-in 0.3s ease-out";
        // T\u00ecm ho\u1eb7c t\u1ea1o Container cho Toast d\u1ef1a tr\u00ean v\u1ecb tr\u00ed
        const position = config.position || "BOTTOM_RIGHT";
        const containerId = `carecheck-toast-container-${position}`;
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement("div");
            container.id = containerId;
            container.style.position = "fixed";
            container.style.display = "flex";
            // X\u1ebfp ch\u1ed3ng t\u1eeb d\u01b0\u1edbi l\u00ean ho\u1eb7c t\u1eeb tr\u00ean xu\u1ed1ng t\u00f9y v\u1ecb tr\u00ed
            container.style.flexDirection = position.startsWith("BOTTOM") ? "column-reverse" : "column";
            container.style.gap = "12px";
            container.style.zIndex = "999999";
            const margin = "20px";
            if (position === "TOP_LEFT") {
                container.style.top = margin;
                container.style.left = margin;
            } else if (position === "TOP_RIGHT") {
                container.style.top = margin;
                container.style.right = margin;
            } else if (position === "BOTTOM_LEFT") {
                container.style.bottom = margin;
                container.style.left = margin;
            } else {
                container.style.bottom = margin;
                container.style.right = margin;
            }
            document.body.appendChild(container);
        }
        wrapper.innerHTML = `
      <span style="font-size: 24px;">\u26a0\ufe0f</span> 
      <span style="flex: 1;">${messageText}</span>
      ${closeBtnHtml}
    `;
        const closeBtn = wrapper.querySelector(".carecheck-close-btn");
        const dismissHandler = ()=>{
            wrapper.remove();
            ruleStates.set(rule.id, false);
            if (rule.triggerMode !== "EVENT_BASED") dismissedRules.add(rule.id); // Ch\u1ec9 \u0111\u00e1nh d\u1ea5u \u0111\u00f3ng v\u0129nh vi\u1ec5n v\u1edbi REALTIME
        };
        closeBtn?.addEventListener("click", dismissHandler);
        // B\u1ecf t\u00ednh n\u0103ng "click ra ngo\u00e0i \u0111\u1ec3 \u0111\u00f3ng" \u0111\u1ed1i v\u1edbi Toast v\u00ec gi\u1edd n\u00f3 l\u00e0 1 list ch\u1ed3ng l\u00ean nhau,
        // click ra ngo\u00e0i th\u00ec \u0111\u00f3ng nh\u1ea7m c\u00e1c Toast kh\u00e1c. B\u00e1c s\u0129 ph\u1ea3i \u1ea5n X ho\u1eb7c s\u1eeda l\u1ed7i \u0111\u1ec3 \u0111\u00f3ng.
        if (actionBtn) {
            if (closeBtn && closeBtn.parentNode) closeBtn.parentNode.insertBefore(actionBtn, closeBtn);
            else wrapper.appendChild(actionBtn);
        }
        container.appendChild(wrapper);
    }
}
function removeWarningUI(ruleId) {
    const warning = document.getElementById(`carecheck-warning-${ruleId}`);
    if (warning) warning.remove();
}
function showDataSelectionModal(dataArray, rule) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.log(`[CareCheck] FETCH_AND_SELECT: Kh\u00f4ng c\u00f3 d\u1eef li\u1ec7u tr\u1ea3 v\u1ec1 ho\u1eb7c m\u1ea3ng r\u1ed7ng.`);
        alert(`Kh\u00f4ng t\u00ecm th\u1ea5y d\u1eef li\u1ec7u n\u00e0o t\u1eeb API cho l\u1ec7nh: ${rule.name}`);
        return;
    }
    const modalId = `carecheck-selection-modal-${rule.id}`;
    document.querySelectorAll(`#${modalId}`).forEach((el)=>el.remove());
    const wrapper = document.createElement("div");
    wrapper.id = modalId;
    wrapper.style.position = "fixed";
    wrapper.style.inset = "0";
    wrapper.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    wrapper.style.backdropFilter = "blur(4px)";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.zIndex = "2147483647";
    wrapper.style.fontFamily = "sans-serif";
    const config = rule.fetchAndSelectConfig;
    if (!config) return;
    const columns = config.columns || [];
    let tableHeaders = "";
    for (const col of columns)tableHeaders += `<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; background: #f8fafc; color: #475569; font-weight: bold;">${col.title}</th>`;
    tableHeaders += `<th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0; background: #f8fafc; color: #475569; font-weight: bold;">Thao t\u00e1c</th>`;
    let tableRows = "";
    dataArray.forEach((item, index)=>{
        let rowCells = "";
        for (const col of columns){
            const rawVal = extractFromPath(item, col.key);
            let val = rawVal !== undefined && rawVal !== null ? String(rawVal) : "";
            if (/^\d{12}$/.test(val)) val = `${val.substring(6, 8)}/${val.substring(4, 6)}/${val.substring(0, 4)} ${val.substring(8, 10)}:${val.substring(10, 12)}`;
            else if (/^\d{8}$/.test(val)) val = `${val.substring(6, 8)}/${val.substring(4, 6)}/${val.substring(0, 4)}`;
            rowCells += `<td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${val}</td>`;
        }
        const rawSelectVal = extractFromPath(item, config.selectField);
        const selectVal = rawSelectVal !== undefined && rawSelectVal !== null ? rawSelectVal : "";
        rowCells += `<td style="padding: 12px; text-align: center; border-bottom: 1px solid #f1f5f9;">
      <button class="carecheck-select-btn" data-index="${index}" data-val="${selectVal}" style="background: #2563eb; color: white; border: none; padding: 6px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;">Ch\u1ecdn</button>
    </td>`;
        tableRows += `<tr style="transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f1f5f9'" onmouseout="this.style.backgroundColor='transparent'">${rowCells}</tr>`;
    });
    wrapper.innerHTML = `
    <div style="background: white; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); width: 90%; max-width: 800px; max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; animation: carecheck-slide-in 0.3s ease-out;">
      <div style="background: #2563eb; color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
        <h2 style="margin: 0; font-size: 18px; font-weight: bold; display: flex; gap: 8px; align-items: center;">
          <span style="font-size: 24px;">\ud83d</span> ${config.modalTitle || "Vui l\xf2ng ch\u1ecdn m\u1ed9t b\u1ea3n ghi"}
        </h2>
        <button class="carecheck-close-btn" style="background:none;border:none;color:inherit;cursor:pointer;font-size:20px;opacity:0.8;padding:0;line-height:1;" title="\u0110\u00f3ng">\u2715</button>
      </div>
      <div style="padding: 0; flex: 1; overflow: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead><tr>${tableHeaders}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </div>
  `;
    wrapper.querySelector(".carecheck-close-btn")?.addEventListener("click", ()=>wrapper.remove());
    wrapper.querySelectorAll(".carecheck-select-btn").forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            // LU\u00d4N LU\u00d4N x\u00f3a modal ngay l\u1eadp t\u1ee9c \u0111\u1ec3 kh\u00f4ng b\u1ecb k\u1eb9t (B\u1ea5t k\u1ec3 tr\u01b0\u1eddng h\u1ee3p n\u00e0o)
            if (document.body.contains(wrapper)) wrapper.remove();
            document.querySelectorAll(`#${modalId}`).forEach((el)=>el.remove());
            const targetVal = e.target.getAttribute("data-val");
            // N\u1ebfu c\u00f3 \u0111\u00edch \u0111\u1ebfn v\u00e0 c\u00f3 gi\u00e1 tr\u1ecb th\u00ec m\u1edbi \u0111i\u1ec1n (n\u1ebfu gi\u00e1 tr\u1ecb r\u1ed7ng t\u1ee9c l\u00e0 b\u1ecf qua kh\u00f4ng \u0111i\u1ec1n)
            if (rule.targetSelector && targetVal && targetVal.trim() !== "") try {
                const targetEl = document.querySelector(rule.targetSelector);
                if (targetEl) {
                    targetEl.value = targetVal;
                    // B\u1eafn s\u1ef1 ki\u1ec7n change/input \u0111\u1ec3 HIS ghi nh\u1eadn
                    targetEl.dispatchEvent(new Event("change", {
                        bubbles: true
                    }));
                    targetEl.dispatchEvent(new Event("input", {
                        bubbles: true
                    }));
                    // B\u1eafn custom event cho ch\u1eafc \u0103n
                    window.dispatchEvent(new CustomEvent("CARECHECK_TRIGGER_JQUERY_CHANGE", {
                        detail: {
                            selector: rule.targetSelector,
                            value: targetVal
                        }
                    }));
                    console.log(`[CareCheck] FETCH_AND_SELECT: \u0110\u00e3 \u0111i\u1ec1n gi\u00e1 tr\u1ecb "${targetVal}" v\u00e0o selector "${rule.targetSelector}"`);
                } else console.error(`[CareCheck] FETCH_AND_SELECT: Kh\u00f4ng t\u00ecm th\u1ea5y \u00f4 \u0111\u00edch: ${rule.targetSelector}`);
            } catch (err) {
                console.error("[CareCheck] FETCH_AND_SELECT: L\u1ed7i khi \u0111i\u1ec1n d\u1eef li\u1ec7u v\xe0o form HIS:", err);
            }
            else console.log(`[CareCheck] FETCH_AND_SELECT: B\u1ecf qua kh\u00f4ng \u0111i\u1ec1n do gi\u00e1 tr\u1ecb r\u1ed7ng ho\u1eb7c kh\u00f4ng c\u00f3 targetSelector.`);
        });
    });
    document.body.appendChild(wrapper);
}
function extractFromPath(obj, path) {
    if (!obj || !path) return obj;
    const parts = path.split(".");
    let current = obj;
    for(let i = 0; i < parts.length; i++){
        const part = parts[i];
        if (current == null) return undefined;
        if (Array.isArray(current)) {
            // If we hit an array, the current part needs to be extracted from each item
            const remainingPath = parts.slice(i).join(".");
            return current.map((item)=>extractFromPath(item, remainingPath)).filter((item)=>item != null);
        }
        current = current[part];
    }
    return current;
}
const storageCache = new Map();
function getConditionDataSync(node) {
    if (node.dataSourceType === "STATIC") return node.value || "";
    if (node.dataSourceType === "LOCAL_STORAGE" && node.localStorageKey) {
        let data = storageCache.get(node.localStorageKey);
        if (data && node.apiResponsePath) data = extractFromPath(data, node.apiResponsePath);
        return data;
    }
    // API is not supported in EVENT_BASED realtime synchronous evaluation yet.
    return "";
}
function evaluateConditionSync(node, ruleId, triggerEl1) {
    let el = null;
    const safeSelector = node.selector ? node.selector.replace(/[\u201c\u201d]/g, '"').replace(/[\u2018\u2019]/g, "'") : "";
    try {
        if (!safeSelector) return false; // Tr\u00e1nh l\u1ed7i DOMException khi ng\u01b0\u1eddi d\u00f9ng \u0111\u1ec3 tr\u1ed1ng selector
        if (safeSelector === "{{VALUE}}") {
            if (triggerEl1) {
                const row = triggerEl1.closest("tr") || triggerEl1.closest(".jqgrow") || triggerEl1.closest(".row");
                if (row) {
                    const targetData = getConditionDataSync(node);
                    // X\u1eed l\u00fd \u0111\u1eb7c bi\u1ec7t cho jqGrid (Frozen columns chia row l\u00e0m 2 th\u1ebb tr \u1edf 2 b\u1ea3ng kh\u00e1c nhau)
                    let rowsToCheck = [
                        row
                    ];
                    const tr = row;
                    if (row.id) // \u01afu ti\u00ean d\u00f9ng id v\u00ec jqGrid lu\u00f4n \u0111\u1eb7t id b\u1eb1ng nhau cho c\u1ea3 2 n\u1eeda d\u00f2ng (r\u1ea5t ch\u00ednh x\u00e1c)
                    try {
                        const escapedId = CSS.escape(row.id);
                        const matchingRows = document.querySelectorAll(`[id="${escapedId}"]`);
                        rowsToCheck = Array.from(matchingRows);
                    } catch (e) {}
                    else if (tr.tagName === "TR") {
                        // D\u1ef1 ph\u00f2ng: n\u1ebfu kh\u00f4ng c\u00f3 id, d\u00f9ng rowIndex (nh\u01b0ng c\u00f3 th\u1ec3 l\u1ec7ch n\u1ebfu header 2 b\u1ea3ng kh\u00e1c nhau)
                        const rowIndex = tr.rowIndex;
                        if (rowIndex >= 0) {
                            const allTables = document.querySelectorAll("table");
                            allTables.forEach((table)=>{
                                if (table.rows && table.rows.length > rowIndex) {
                                    const siblingRow = table.rows[rowIndex];
                                    if (siblingRow && siblingRow !== tr) rowsToCheck.push(siblingRow);
                                }
                            });
                        }
                    }
                    for (const r of rowsToCheck){
                        // Ki\u1ec3m tra c\u1ea3 input value v\u00e0 textContent c\u1ee7a T\u1ea4T C\u1ea2 c\u00e1c th\u1ebb b\u00ean trong d\u00f2ng
                        const textVal = r.textContent?.trim() || "";
                        if (textVal && performOperatorCheck(node, textVal, targetData, ruleId)) {
                            console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Value: "${textVal}" | Match: TRUE (row textContent)`);
                            return true;
                        }
                        const inputs = r.querySelectorAll('input:not([type="checkbox"])');
                        for(let i = 0; i < inputs.length; i++){
                            const val = inputs[i].value?.trim();
                            if (val && performOperatorCheck(node, val, targetData, ruleId)) {
                                console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Value: "${val}" | Match: TRUE (input value)`);
                                return true;
                            }
                        }
                        // Th\u1eed check l\u1ea1i t\u1eebng \u00f4 (td/div)
                        const cells = r.querySelectorAll("td, div");
                        for(let i = 0; i < cells.length; i++){
                            const val = cells[i].textContent?.trim() || "";
                            if (val && performOperatorCheck(node, val, targetData, ruleId)) {
                                console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Value: "${val}" | Match: TRUE (cell textContent)`);
                                return true;
                            }
                        }
                    }
                    console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | Target: "${targetData}" | Match: FALSE (Checked ${rowsToCheck.length} rows)`);
                } else console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | L\u1ed7i: Kh\u00f4ng t\u00ecm th\u1ea5y d\u00f2ng cha (tr) c\u1ee7a trigger!`);
            } else console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: {{VALUE}} | L\u1ed7i: triggerEl b\u1ecb null!`);
            return false;
        }
        if (safeSelector.startsWith("{{STORAGE:") && safeSelector.endsWith("}}")) {
            const fullPath = safeSelector.substring(10, safeSelector.length - 2).trim();
            const dotIndex = fullPath.indexOf(".");
            const rootKey = dotIndex > -1 ? fullPath.substring(0, dotIndex) : fullPath;
            const jsonPath = dotIndex > -1 ? fullPath.substring(dotIndex + 1) : "";
            let storageVal = storageCache.get(rootKey);
            if (jsonPath && storageVal) storageVal = extractFromPath(storageVal, jsonPath);
            const targetData = getConditionDataSync(node);
            const valStr = typeof storageVal === "string" ? storageVal : JSON.stringify(storageVal || "");
            const result = performOperatorCheck(node, valStr, targetData, ruleId);
            console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: ${safeSelector} | StorageValue: "${valStr}" | Operator: ${node.operator} | Target: "${targetData}" | Result: ${result}`);
            return result;
        }
        if (triggerEl1) {
            const row = triggerEl1.closest("tr") || triggerEl1.closest(".row") || triggerEl1.parentElement;
            if (row) el = row.querySelector(safeSelector);
        }
        if (!el) el = document.querySelector(safeSelector);
    } catch (e) {
        console.error(`[CareCheck] Invalid selector in condition for rule ${ruleId}: ${node.selector}`, e);
        return false;
    }
    if (!el) {
        console.log(`[CareCheck DEBUG] Rule ${ruleId}: Kh\u00f4ng t\u00ecm th\u1ea5y ph\u1ea7n t\u1eed cho selector ${safeSelector}`);
        return false;
    }
    let value = "";
    if (el.type === "checkbox" || el.type === "radio") value = el.checked ? "true" : "false";
    else value = el.value?.trim() || el.textContent?.trim() || "";
    const targetData = getConditionDataSync(node);
    const result = performOperatorCheck(node, value, targetData, ruleId);
    console.log(`[CareCheck DEBUG] Rule ${ruleId} - Selector: ${safeSelector} | Value: "${value}" | Operator: ${node.operator} | Target: "${targetData}" | Result: ${result}`);
    return result;
}
function performOperatorCheck(node, value, targetData, ruleId) {
    if (node.operator === "IN_ARRAY" || node.operator === "NOT_IN_ARRAY") {
        let arr = [];
        if (Array.isArray(targetData)) arr = targetData;
        else if (typeof targetData === "string") arr = targetData.split(",").map((s)=>s.trim());
        // So s\u00e1nh m\u1ea3ng
        const valString = String(value).toLowerCase();
        const isInArray = arr.some((item)=>String(item).toLowerCase() === valString);
        if (node.operator === "IN_ARRAY") {
            if (isInArray) ruleOffendingValues.set(ruleId, value);
            return isInArray;
        }
        if (node.operator === "NOT_IN_ARRAY") {
            if (!isInArray) ruleOffendingValues.set(ruleId, value);
            return !isInArray;
        }
    }
    const targetVal = String(targetData || "").trim();
    const targetNum = parseFloat(targetVal) || 0;
    const valNum = parseFloat(value) || 0;
    let isMatched = false;
    switch(node.operator){
        case "==":
            isMatched = value.toLowerCase() === targetVal.toLowerCase();
            break;
        case "!=":
            isMatched = value.toLowerCase() !== targetVal.toLowerCase();
            break;
        case "CONTAINS":
            isMatched = value.toLowerCase().includes(targetVal.toLowerCase());
            break;
        case "NOT_CONTAINS":
            isMatched = !value.toLowerCase().includes(targetVal.toLowerCase());
            break;
        case "IS_EMPTY":
            isMatched = !value;
            break;
        case "IS_NOT_EMPTY":
            isMatched = !!value;
            break;
        case "LENGTH_EQUALS":
            isMatched = value.length === (parseInt(targetVal, 10) || 0);
            break;
        case "LENGTH_NOT_EQUALS":
            isMatched = value.length !== (parseInt(targetVal, 10) || 0);
            break;
        case "LENGTH_MIN":
            isMatched = value.length >= (parseInt(targetVal, 10) || 0);
            break;
        case ">":
            isMatched = valNum > targetNum;
            break;
        case "<":
            isMatched = valNum < targetNum;
            break;
        case ">=":
            isMatched = valNum >= targetNum;
            break;
        case "<=":
            isMatched = valNum <= targetNum;
            break;
    }
    if (isMatched) ruleOffendingValues.set(ruleId, value);
    return isMatched;
}
function evaluateGroupSync(group, ruleId, triggerEl1) {
    if (group.logicalOp === "AND") {
        for (const child of group.conditions){
            const isTrue = child.type === "CONDITION" ? evaluateConditionSync(child, ruleId, triggerEl1) : evaluateGroupSync(child, ruleId, triggerEl1);
            if (!isTrue) return false; // Fail fast for AND
        }
        return true; // All true
    } else {
        for (const child of group.conditions){
            const isTrue = child.type === "CONDITION" ? evaluateConditionSync(child, ruleId, triggerEl1) : evaluateGroupSync(child, ruleId, triggerEl1);
            if (isTrue) return true; // Succeed fast for OR
        }
        return false; // All false
    }
}
function applyErrorVisuals(el, ruleId = "true") {
    // N\u1ebfu el l\u00e0 m\u1ed9t checkbox n\u1eb1m trong 1 row (b\u1ea3ng), ta n\u00ean t\u00f4 \u0111\u1ecf C\u1ea2 D\u00d2NG thay v\u00ec ch\u1ec9 t\u00f4 m\u1ed7i c\u00e1i checkbox b\u00e9 x\u00edu
    let targetEl = el;
    if (el.tagName === "INPUT" && el.type === "checkbox") {
        const tr = el.closest("tr") || el.closest(".jqgrow");
        if (tr) targetEl = tr;
    }
    if (targetEl.hasAttribute(ERROR_ATTR) && targetEl.getAttribute(ERROR_ATTR) === ruleId) return;
    targetEl.setAttribute(ERROR_ATTR, ruleId);
    const htmlEl = targetEl;
    // L\u01b0u style c\u0169
    htmlEl.dataset.oldOutline = htmlEl.style.outline || "";
    htmlEl.dataset.oldOutlineOffset = htmlEl.style.outlineOffset || "";
    // \u00c1p d\u1ee5ng style l\u1ed7i (Ch\u1ec9 b\u00f4i vi\u1ec1n \u0111\u1ecf, gi\u1eef nguy\u00ean m\u00e0u n\u1ec1n v\u00e0ng c\u1ee7a d\u00f2ng)
    // D\u00f9ng outline thay v\u00ec border v\u00ec outline ho\u1ea1t \u0111\u1ed9ng c\u1ef1c t\u1ed1t tr\u00ean th\u1ebb <tr> m\u00e0 kh\u00f4ng l\u00e0m l\u1ec7ch form b\u1ea3ng
    htmlEl.style.setProperty("outline", "2px solid red", "important");
    htmlEl.style.setProperty("outline-offset", "-1px", "important");
// Kh\u00f4ng d\u00f9ng tooltip c\u1ee5c b\u1ed9 n\u1eefa v\u00ec \u0111\u00e3 c\u00f3 Toast \u1edf g\u00f3c
}
function removeErrorVisuals(el) {
    let targetEl = el;
    if (el.tagName === "INPUT" && el.type === "checkbox") {
        const tr = el.closest("tr") || el.closest(".jqgrow");
        if (tr) targetEl = tr;
    }
    if (!targetEl.hasAttribute(ERROR_ATTR)) return;
    const htmlEl = targetEl;
    htmlEl.style.removeProperty("outline");
    htmlEl.style.removeProperty("outline-offset");
    // Tr\u1ecb d\u1ee9t \u0111i\u1ec3m c\u0103n b\u1ec7nh m\u1edd ch\u1eef (white text) do b\u00f3ng ma c\u0169 \u0111\u1ec3 l\u1ea1i
    htmlEl.style.setProperty("color", "black", "important");
    if (htmlEl.dataset.oldOutline) htmlEl.style.outline = htmlEl.dataset.oldOutline;
    if (htmlEl.dataset.oldOutlineOffset) htmlEl.style.outlineOffset = htmlEl.dataset.oldOutlineOffset;
    el.removeAttribute(ERROR_ATTR);
}
// L\u1ea5y danh s\u00e1ch lu\u1eadt v\u00e0 ch\u1ea1y ki\u1ec3m tra \u0111\u1ec7 quy
let isEvaluating = false;
let engineInterval;
let cachedRules = [];
// Theo d\u00f5i thay \u0111\u1ed5i t\u1eeb storage \u0111\u1ec3 c\u1eadp nh\u1eadt cache
if (typeof chrome !== "undefined" && chrome.storage) chrome.storage.onChanged.addListener((changes, area)=>{
    if (area === "local") {
        if (changes[RULES_STORAGE_KEY]) {
            try {
                cachedRules = JSON.parse(changes[RULES_STORAGE_KEY].newValue) || [];
            } catch (e) {
                cachedRules = changes[RULES_STORAGE_KEY].newValue || [];
            }
            // Khi rules \u0111\u1ed5i, qu\u00e9t l\u1ea1i c\u00e1c key c\u1ea7n cache v\u00e0 fetch b\u1ed5 sung
            const newKeys = new Set();
            const extractNewKeys = (group)=>{
                group.conditions.forEach((c)=>{
                    if (c.type === "CONDITION") {
                        const node = c;
                        if (node.dataSourceType === "LOCAL_STORAGE" && node.localStorageKey) newKeys.add(node.localStorageKey);
                        if (node.selector && node.selector.startsWith("{{STORAGE:") && node.selector.endsWith("}}")) {
                            const fullPath = node.selector.substring(10, node.selector.length - 2).trim();
                            const rootKey = fullPath.split(".")[0];
                            if (rootKey) newKeys.add(rootKey);
                        }
                    } else extractNewKeys(c);
                });
            };
            cachedRules.forEach((r)=>{
                if (r.logic) extractNewKeys(r.logic);
            });
            newKeys.forEach((key)=>{
                if (!storageCache.has(key)) chrome.storage.local.get(key, (data)=>{
                    storageCache.set(key, data[key]);
                });
            });
        }
        // Lu\u00f4n \u0111\u1ed3ng b\u1ed9 d\u1eef li\u1ec7u m\u1edbi nh\u1ea5t v\u00e0o storageCache n\u1ebfu n\u00f3 thay \u0111\u1ed5i
        for (const [key, change] of Object.entries(changes))if (key !== RULES_STORAGE_KEY) storageCache.set(key, change.newValue);
    }
});
function resolveDynamicValueSync(val, triggerEl1) {
    if (!val) return val;
    if (val.includes("{{SELECTOR:")) {
        const matches = val.match(/\{\{SELECTOR:([^{}]+)\}\}/g);
        if (matches) for (const match of matches){
            const selector = match.replace("{{SELECTOR:", "").replace("}}", "").trim();
            try {
                let el = null;
                if (triggerEl1) {
                    const row = triggerEl1.closest("tr") || triggerEl1.closest(".row") || triggerEl1.parentElement;
                    if (row) el = row.querySelector(selector);
                }
                if (!el) el = document.querySelector(selector);
                const extracted = el ? (el.value || el.textContent || "").trim() : "";
                console.log(`[CareCheck DEBUG] resolveDynamicValueSync: Selector="${selector}" -> Element=`, el, `-> Extracted="${extracted}"`);
                val = val.split(match).join(extracted);
            } catch (e) {
                val = val.split(match).join("");
            }
        }
    }
    if (val.includes("{{STORAGE:")) {
        const matches = val.match(/\{\{STORAGE:([^{}]+)\}\}/g);
        if (matches) for (const match of matches){
            const fullPath = match.replace("{{STORAGE:", "").replace("}}", "").trim();
            const parts = fullPath.split(".");
            let extracted = "";
            if (parts.length > 0) {
                const rootKey = parts[0];
                const data = storageCache.get(rootKey);
                if (data) {
                    const valObj = extractFromPath(data, parts.slice(1).join("."));
                    extracted = valObj != null ? String(valObj) : "";
                }
            }
            val = val.split(match).join(extracted);
        }
    }
    if (val.includes("{{REGEX:")) {
        const matches = val.match(/\{\{REGEX:([^}]+)\}\}/g);
        if (matches) for (const match of matches){
            const regexStr = match.substring(8, match.length - 2);
            try {
                const regexParts = regexStr.match(/^\/(.*?)\/([gimsuy]*)$/);
                let regex;
                if (regexParts) regex = new RegExp(regexParts[1], regexParts[2]);
                else regex = new RegExp(regexStr);
                const bodyText = document.body.innerText || "";
                const regMatch = bodyText.match(regex);
                const extracted = regMatch ? regMatch[1] || regMatch[0] : "";
                val = val.split(match).join(extracted);
            } catch (e) {
                val = val.split(match).join("");
            }
        }
    }
    if (val.includes("{{SESSION:")) {
        const matches = val.match(/\{\{SESSION:([^{}]+)\}\}/g);
        if (matches) for (const match of matches){
            const fullPath = match.replace("{{SESSION:", "").replace("}}", "").trim();
            const parts = fullPath.split(".");
            let extracted = "";
            if (parts.length > 0) {
                const rootKey = parts[0];
                try {
                    const data = sessionStorage.getItem("CARECHECK_" + rootKey);
                    if (data) {
                        if (parts.length > 1) try {
                            const json = JSON.parse(data);
                            const valObj = extractFromPath(json, parts.slice(1).join("."));
                            extracted = valObj != null ? String(valObj) : "";
                        } catch (e) {
                            extracted = data;
                        }
                        else extracted = data;
                    }
                } catch (e) {}
            }
            val = val.split(match).join(extracted);
        }
    }
    return val;
}
function evaluateRuleAndUpdateStateSync(rule, triggerEl1) {
    try {
        console.log(`[CareCheck DEBUG] === B\u1eaeT \u0110\u1ea6U \u0110\u00c1NH GI\u00c1 LU\u1eacT: ${rule.name} (${rule.id}) ===`);
        const action = rule.actionType || "SHOW_WARNING";
        if (action === "CLEAR_STORAGE") {
            if (rule.clearStorageConfig?.storageKey) {
                storage.remove(rule.clearStorageConfig.storageKey);
                console.log(`[CareCheck] \u0110\u00e3 x\u00f3a LocalStorage key: ${rule.clearStorageConfig.storageKey}`);
            }
            return false; // Kh\u00f4ng block UI
        }
        if (action === "SET_VALUE") {
            if (!rule.logic) return false;
            const isConditionMet = evaluateGroupSync(rule.logic, rule.id, triggerEl1);
            const previousState = ruleStates.get(rule.id);
            if (isConditionMet && previousState !== true) {
                if (rule.targetSelector && rule.setValueConfig?.value !== undefined) {
                    const targetEls = document.querySelectorAll(rule.targetSelector);
                    targetEls.forEach((el)=>{
                        if (el.value !== rule.setValueConfig.value) {
                            el.value = rule.setValueConfig.value;
                            el.dispatchEvent(new Event("change", {
                                bubbles: true
                            }));
                            el.dispatchEvent(new Event("input", {
                                bubbles: true
                            }));
                            // G\u1eedi s\u1ef1 ki\u1ec7n cho main_world.ts \u0111\u1ec3 k\u00edch ho\u1ea1t jQuery & Select2 c\u1ee7a HIS
                            window.dispatchEvent(new CustomEvent("CARECHECK_TRIGGER_JQUERY_CHANGE", {
                                detail: {
                                    selector: rule.targetSelector,
                                    value: rule.setValueConfig.value
                                }
                            }));
                        }
                    });
                }
            }
            ruleStates.set(rule.id, isConditionMet);
            return false;
        }
        if (action === "SAVE_TO_STORAGE") {
            const isConditionMet = rule.logic ? evaluateGroupSync(rule.logic, rule.id, triggerEl1) : true;
            const previousState = ruleStates.get(rule.id);
            if (isConditionMet && (rule.triggerMode === "EVENT_BASED" || previousState !== true)) {
                if (rule.targetSelector && rule.setValueConfig?.value !== undefined) {
                    const finalValue = resolveDynamicValueSync(rule.setValueConfig.value, triggerEl1);
                    try {
                        if (rule.targetSelector.startsWith("SESSION:")) sessionStorage.setItem("CARECHECK_" + rule.targetSelector.substring(8).trim(), finalValue);
                        else localStorage.setItem("CARECHECK_" + rule.targetSelector.trim(), finalValue);
                        console.log(`[CareCheck DEBUG] SAVE_TO_STORAGE k\u00edch ho\u1ea1t cho lu\u1eadt ${rule.id}. L\u01b0u gi\u00e1 tr\u1ecb: "${finalValue}" v\u00e0o bi\u1ebfn "${rule.targetSelector}"`);
                    } catch (e) {}
                }
            }
            ruleStates.set(rule.id, isConditionMet);
            return false;
        }
        if (action === "FETCH_API") {
            if (rule.apiActionConfig?.apiUrl && rule.apiActionConfig?.storageKey) {
                let finalUrl = rule.apiActionConfig.apiUrl;
                let paramValue = "";
                // N\u1ed1i tham s\u1ed1 n\u1ebfu c\u00f3
                if (rule.apiActionConfig.paramSelector) try {
                    const paramEl = document.querySelector(rule.apiActionConfig.paramSelector);
                    if (paramEl && paramEl.value) {
                        paramValue = paramEl.value.trim();
                        // X\u00f3a kho\u1ea3ng tr\u1eafng \u1edf c\u00e1c tr\u01b0\u1eddng m\u00e3 (\u0111\u1eb7c bi\u1ec7t l\u00e0 BHYT)
                        if (rule.apiActionConfig.paramSelector.toLowerCase().includes("bhyt") || finalUrl.toLowerCase().includes("bhyt")) paramValue = paramValue.replace(/\s+/g, "");
                        if (finalUrl.includes(rule.apiActionConfig.paramSelector)) finalUrl = finalUrl.replace(rule.apiActionConfig.paramSelector, paramValue);
                        else finalUrl += paramValue;
                    }
                } catch (e) {
                    console.error(`[CareCheck] Invalid paramSelector in API config: ${rule.apiActionConfig.paramSelector}`);
                }
                console.log(`[CareCheck] \u0110ang g\u1ecdi API: ${finalUrl}`);
                try {
                    // T\u1ef1 \u0111\u1ed9ng x\u00f3a d\u1eef li\u1ec7u c\u0169 trong Storage tr\u01b0\u1edbc khi g\u1ecdi API m\u1edbi \u0111\u1ec3 tr\u00e1nh b\u1ecb r\u00f2 r\u1ec9 d\u1eef li\u1ec7u c\u1ee7a user c\u0169
                    const keyToRemove = rule.apiActionConfig.clearStorageKeyBeforeFetch !== undefined && rule.apiActionConfig.clearStorageKeyBeforeFetch.trim() !== "" ? rule.apiActionConfig.clearStorageKeyBeforeFetch : rule.apiActionConfig.storageKey;
                    storage.remove(keyToRemove);
                    storage.remove(rule.apiActionConfig.storageKey + "_param"); // X\u00f3a param c\u0169
                    console.log(`[CareCheck] \u0110\u00e3 x\u00f3a LocalStorage key [${keyToRemove}] tr\u01b0\u1edbc khi g\u1ecdi API m\u1edbi`);
                    chrome.runtime.sendMessage({
                        action: "PROXY_FETCH",
                        url: finalUrl,
                        saveToStorageKey: rule.apiActionConfig.storageKey,
                        saveParamToStorageKey: rule.apiActionConfig.storageKey + "_param",
                        paramValue: paramValue
                    }, (res)=>{
                        if (chrome.runtime.lastError) {
                            console.log("[CareCheck] L\u1ed7i k\u1ebft n\u1ed1i (Extension context invalidated). Vui l\xf2ng t\u1ea3i l\u1ea1i trang (F5).");
                            return;
                        }
                        if (res && res.success && res.data) {
                            storage.set(rule.apiActionConfig.storageKey, res.data);
                            console.log(`[CareCheck] \u0110\u00e3 l\u1ea5y API xong, k\u00edch ho\u1ea1t qu\u00e9t l\u1ea1i c\u00e1c lu\u1eadt c\u1ea3nh b\u00e1o \u0111\u1ec3 c\u1eadp nh\u1eadt giao di\u1ec7n...`);
                            // K\u00edch ho\u1ea1t qu\u00e9t l\u1ea1i c\u00e1c lu\u1eadt EVENT_BASED \u0111\u1ec3 C\u1ea3nh b\u00e1o \u0103n theo data m\u1edbi
                            cachedRules.forEach((r)=>{
                                if ((!r.actionType || r.actionType === "SHOW_WARNING") && r.triggerMode === "EVENT_BASED" && r.triggerSelector) {
                                    const els = document.querySelectorAll(r.triggerSelector);
                                    els.forEach((el)=>evaluateRuleAndUpdateStateSync(r, el));
                                }
                            });
                        }
                    });
                } catch (err) {
                    if (String(err).includes("Extension context invalidated") || err && err.message && err.message.includes("Extension context invalidated")) console.log("[CareCheck] Ti\u1ec7n \xedch v\u1eeba \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt. Vui l\xf2ng t\u1ea3i l\u1ea1i trang (F5) \u0111\u1ec3 s\u1eed d\u1ee5ng.");
                    else console.error(`[CareCheck] L\u1ed7i khi g\u1ecdi API qua proxy:`, err);
                }
            }
            return false; // Kh\u00f4ng block UI
        }
        if (action === "FETCH_AND_SELECT") {
            const isConditionMet = rule.logic ? evaluateGroupSync(rule.logic, rule.id, triggerEl1) : true;
            const previousState = ruleStates.get(rule.id);
            if (isConditionMet && (rule.triggerMode === "EVENT_BASED" || previousState !== true)) {
                if (rule.fetchAndSelectConfig?.apiUrl) {
                    let finalUrl = rule.fetchAndSelectConfig.apiUrl;
                    let paramValue = "";
                    if (rule.fetchAndSelectConfig.paramSelector) {
                        try {
                            const paramEl = document.querySelector(rule.fetchAndSelectConfig.paramSelector);
                            if (paramEl && paramEl.value) {
                                paramValue = paramEl.value.trim();
                                // X\u00f3a kho\u1ea3ng tr\u1eafng \u1edf c\u00e1c tr\u01b0\u1eddng m\u00e3 (\u0111\u1eb7c bi\u1ec7t l\u00e0 BHYT)
                                if (rule.fetchAndSelectConfig.paramSelector.toLowerCase().includes("bhyt") || finalUrl.toLowerCase().includes("bhyt")) paramValue = paramValue.replace(/\s+/g, "");
                                if (finalUrl.includes(rule.fetchAndSelectConfig.paramSelector)) finalUrl = finalUrl.replace(rule.fetchAndSelectConfig.paramSelector, paramValue);
                                else finalUrl += paramValue;
                            }
                        } catch (e) {
                            console.error(`[CareCheck] Invalid paramSelector in FETCH_AND_SELECT config: ${rule.fetchAndSelectConfig.paramSelector}`);
                        }
                        if (!paramValue) {
                            console.log(`[CareCheck] FETCH_AND_SELECT: B\u1ecf qua g\u1ecdi API v\u00ec \u00f4 tham s\u1ed1 (${rule.fetchAndSelectConfig.paramSelector}) \u0111ang b\u1ecb tr\u1ed1ng.`);
                            return;
                        }
                    }
                    console.log(`[CareCheck] \u0110ang g\u1ecdi API \u0111\u1ec3 FETCH_AND_SELECT: ${finalUrl}`);
                    try {
                        chrome.runtime.sendMessage({
                            action: "PROXY_FETCH",
                            url: finalUrl,
                            saveToStorageKey: "TEMP_FETCH_AND_SELECT",
                            paramValue: paramValue
                        }, (res)=>{
                            if (chrome.runtime.lastError) {
                                console.log("[CareCheck] L\u1ed7i k\u1ebft n\u1ed1i (Extension context invalidated). Vui l\xf2ng t\u1ea3i l\u1ea1i trang (F5).");
                                return;
                            }
                            if (res && res.success && res.data) {
                                console.log(`[CareCheck] FETCH_AND_SELECT \u0111\u00e3 l\u1ea5y d\u1eef li\u1ec7u th\u00e0nh c\u00f4ng t\u1eeb URL: ${finalUrl}`, res.data);
                                let dataArray = Array.isArray(res.data) ? res.data : res.data.data ? res.data.data : null;
                                if (!dataArray || !Array.isArray(dataArray)) {
                                    console.log(`[CareCheck] FETCH_AND_SELECT: API tr\u1ea3 v\u1ec1 kh\u00f4ng \u0111\u00fang \u0111\u1ecbnh d\u1ea1ng m\u1ea3ng d\u1eef li\u1ec7u! URL: ${finalUrl}`);
                                    return;
                                }
                                // L\u1ecdc b\u1ecf c\u00e1c d\u00f2ng tr\u1eafng ho\u00e0n to\u00e0n (t\u1ea5t c\u1ea3 c\u00e1c c\u1ed9t hi\u1ec3n th\u1ecb \u0111\u1ec1u tr\u1ed1ng/null ho\u1eb7c API tr\u1ea3 m\u1ea3ng [{}])
                                if (rule.fetchAndSelectConfig.columns && rule.fetchAndSelectConfig.columns.length > 0) dataArray = dataArray.filter((item)=>{
                                    return rule.fetchAndSelectConfig.columns.some((col)=>{
                                        const rawVal = extractFromPath(item, col.key);
                                        return rawVal !== undefined && rawVal !== null && String(rawVal).trim() !== "";
                                    });
                                });
                                if (dataArray.length === 0) {
                                    console.log(`[CareCheck] FETCH_AND_SELECT: Kh\u00f4ng c\u00f3 d\u1eef li\u1ec7u h\u1ee3p l\u1ec7 (ho\u1eb7c kh\u00f4ng c\u00f3 s\u1ed1 h\u1eb9n kh\u00e1m)! URL: ${finalUrl}`);
                                    // Hi\u1ec3n th\u1ecb m\u1ed9t Toast nh\u1ecf c\u1ea3nh b\u00e1o \u1edf g\u00f3c ph\u1ea3i
                                    const toast = document.createElement("div");
                                    toast.innerHTML = `\u26a0\ufe0f Kh\u00f4ng t\u00ecm th\u1ea5y s\u1ed1 h\u1eb9n kh\u00e1m l\u1ea7n tr\u01b0\u1edbc (ho\u1eb7c sai s\u1ed1 th\u1ebb BHYT)!`;
                                    toast.style.position = "fixed";
                                    toast.style.bottom = "20px";
                                    toast.style.right = "20px";
                                    toast.style.backgroundColor = "#ef4444";
                                    toast.style.color = "white";
                                    toast.style.padding = "12px 20px";
                                    toast.style.borderRadius = "8px";
                                    toast.style.fontWeight = "bold";
                                    toast.style.zIndex = "9999999";
                                    toast.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.3)";
                                    toast.style.animation = "carecheck-slide-in 0.3s ease-out";
                                    document.body.appendChild(toast);
                                    setTimeout(()=>toast.remove(), 4000);
                                    return;
                                }
                                showDataSelectionModal(dataArray, rule);
                            } else {
                                console.error(`[CareCheck] FETCH_AND_SELECT: API l\u1ed7i ho\u1eb7c tr\u1ea3 v\u1ec1 kh\u00f4ng h\u1ee3p l\u1ec7`, res);
                                alert(`Kh\u00f4ng th\u1ec3 l\u1ea5y d\u1eef li\u1ec7u t\u1eeb API cho l\u1ec7nh: ${rule.name}\nURL: ${finalUrl}`);
                            }
                        });
                    } catch (err) {
                        if (String(err).includes("Extension context invalidated") || err && err.message && err.message.includes("Extension context invalidated")) console.log("[CareCheck] Ti\u1ec7n \xedch v\u1eeba \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt. Vui l\xf2ng t\u1ea3i l\u1ea1i trang (F5) \u0111\u1ec3 s\u1eed d\u1ee5ng.");
                        else console.error(`[CareCheck] L\u1ed7i khi g\u1ecdi API qua proxy (FETCH_AND_SELECT):`, err);
                    }
                }
            }
            ruleStates.set(rule.id, isConditionMet);
            return false; // Kh\u00f4ng block UI
        }
        // \u0110\u00e1nh gi\u00e1 logic
        if (!rule.logic) return false;
        let isError = evaluateGroupSync(rule.logic, rule.id, triggerEl1);
        // LOGIC \u0110\u1eb6C BI\u1ec6T CHO B\u1ec6NH VI\u1ec6N: N\u1ebfu click v\u00e0o checkbox ho\u1eb7c row \u0111\u1ec3 B\u1ece CHECK (unchecked), 
        // th\u00ec tuy\u1ec7t \u0111\u1ed1i kh\u00f4ng bao gi\u1edd l\u00e0 l\u1ed7i (v\u00ec b\u1ecf check ngh\u0129a l\u00e0 h\u1ee7y ch\u1ec9 \u0111\u1ecbnh).
        if (rule.triggerMode === "EVENT_BASED" && triggerEl1) {
            let relatedCheckbox = null;
            if (triggerEl1.tagName === "INPUT" && triggerEl1.type === "checkbox") relatedCheckbox = triggerEl1;
            else relatedCheckbox = triggerEl1.querySelector('input[type="checkbox"]');
            // N\u1ebfu t\u00ecm th\u1ea5y checkbox m\u00e0 n\u00f3 \u0111ang KH\u00d4NG \u0111\u01b0\u1ee3c check -> Coi nh\u01b0 kh\u00f4ng c\u00f3 l\u1ed7i!
            if (relatedCheckbox && !relatedCheckbox.checked) isError = false;
        }
        ruleStates.set(rule.id, isError);
        if (rule.triggerMode === "EVENT_BASED") {
            if (isError) {
                showWarningUI(rule);
                if (triggerEl1) {
                    // X\u00f3a vi\u1ec1n \u0111\u1ecf c\u0169 c\u1ee7a lu\u1eadt n\u00e0y tr\u00ean c\u00e1c row kh\u00e1c tr\u01b0\u1edbc khi t\u00f4 row m\u1edbi
                    const oldVisuals = document.querySelectorAll(`[data-carecheck-error="${rule.id}"]`);
                    oldVisuals.forEach((el)=>removeErrorVisuals(el));
                    applyErrorVisuals(triggerEl1, rule.id);
                }
            } else {
                if (triggerEl1) removeErrorVisuals(triggerEl1);
                // N\u1ebfu h\u1ebft l\u1ed7i, t\u1ef1 \u0111\u1ed9ng x\u00f3a Toast n\u1ebfu \u0111ang hi\u1ec7n
                removeWarningUI(rule.id);
                dismissedRules.delete(rule.id); // Reset tr\u1ea1ng th\u00e1i dismiss khi l\u1ed7i \u0111\u00e3 \u0111\u01b0\u1ee3c kh\u1eafc ph\u1ee5c
            }
        } else {
            if (!isError) dismissedRules.delete(rule.id);
            renderVisualsAndToasts();
        }
        return isError;
    } catch (e) {
        console.error(`[CareCheck DEBUG] L\u1ed7i trong evaluateRuleAndUpdateStateSync c\u1ee7a lu\u1eadt ${rule.id}:`, e);
        return false;
    }
}
function renderVisualsAndToasts() {
    const activeErrorRules = cachedRules.filter((r)=>ruleStates.get(r.id) === true && r.triggerMode !== "EVENT_BASED");
    const errorTargetEls = new Set();
    activeErrorRules.forEach((rule)=>{
        showWarningUI(rule);
        if (rule.targetSelector) {
            const targetEls = document.querySelectorAll(rule.targetSelector);
            targetEls.forEach((el)=>errorTargetEls.add(el));
        }
    });
    const resolvedRules = cachedRules.filter((r)=>ruleStates.get(r.id) === false && r.triggerMode !== "EVENT_BASED");
    resolvedRules.forEach((rule)=>{
        removeWarningUI(rule.id);
    });
    // Cleanup Visuals
    const oldErrorEls = document.querySelectorAll(`[${ERROR_ATTR}]`);
    oldErrorEls.forEach((el)=>{
        if (!errorTargetEls.has(el)) removeErrorVisuals(el);
    });
    // Apply Visuals
    errorTargetEls.forEach((el)=>applyErrorVisuals(el));
}
// Global keydown listener for shortcuts
let isKeydownBound = false;
function bindGlobalKeydown() {
    if (isKeydownBound) return;
    isKeydownBound = true;
    document.addEventListener("keydown", (e)=>{
        const currentUrl = window.location.href;
        const activeEventRules = cachedRules.filter((rule)=>{
            if (rule.isActive === false) return false;
            if (rule.triggerMode !== "EVENT_BASED" || !rule.triggerShortcut) return false;
            if (!rule.urlPattern) return true;
            try {
                const escapedPattern = rule.urlPattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
                const regex = new RegExp(`^${escapedPattern.replace(/\*/g, ".*")}$`);
                return regex.test(currentUrl);
            } catch (err) {
                return false;
            }
        });
        if (activeEventRules.length === 0) return;
        let keyPressed = e.key.toLowerCase();
        let combo = [];
        if (e.ctrlKey) combo.push("ctrl");
        if (e.shiftKey) combo.push("shift");
        if (e.altKey) combo.push("alt");
        combo.push(keyPressed);
        const comboStr = combo.join("+");
        let hasError = false;
        for (const rule of activeEventRules){
            const shortcuts = rule.triggerShortcut.split(",").map((s)=>s.trim().toLowerCase());
            if (shortcuts.includes(keyPressed) || shortcuts.includes(comboStr)) {
                const isError = evaluateRuleAndUpdateStateSync(rule);
                if (isError) hasError = true;
            }
        }
        if (hasError) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, true); // Capture phase
}
const executedOnLoadRules = new Set(); // Tracker for ON_LOAD rules
async function runEngineEvaluation() {
    if (isEvaluating) return;
    isEvaluating = true;
    try {
        const rules = cachedRules;
        if (!rules || rules.length === 0) return;
        // \u0110\u1ecdc danh s\u00e1ch lu\u1eadt b\u1ecb t\u1eaft b\u1edfi B\u00e1c s\u0129 (Client)
        const clientStorage = await chrome.storage.local.get("client_disabled_rules");
        const clientDisabledRules = new Set(clientStorage.client_disabled_rules || []);
        const currentUrl = window.location.href;
        const activeRules = rules.filter((rule)=>{
            // 1. Admin t\u1eaft (Global) -> Lo\u1ea1i b\u1ecf
            if (rule.isActive === false) return false;
            // 2. Client t\u1eaft (Local) v\u00e0 Admin cho ph\u00e9p t\u1eaft -> Lo\u1ea1i b\u1ecf
            if (clientDisabledRules.has(rule.id) && rule.allowClientToggle !== false) return false;
            if (!rule.urlPattern) return true;
            try {
                const escapedPattern = rule.urlPattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
                const pattern = escapedPattern.replace(/\*/g, ".*");
                const regex = new RegExp(`^${pattern}$`);
                return regex.test(currentUrl);
            } catch (e) {
                console.error("Invalid regex in rule:", rule.name, e);
                return false;
            }
        });
        // D\u1ecdn d\u1eb9p ruleStates cho c\u00e1c rule kh\u00f4ng c\u00f2n th\u1ecfa m\u00e3n URL
        const activeRuleIds = new Set(activeRules.map((r)=>r.id));
        for (const key of ruleStates.keys())if (!activeRuleIds.has(key)) ruleStates.delete(key);
        // 0. Cache Storage d\u1eef li\u1ec7u cho c\u00e1c rule hi\u1ec7n t\u1ea1i
        const keysToCache = new Set();
        const extractKeys = (group)=>{
            group.conditions.forEach((c)=>{
                if (c.type === "CONDITION") {
                    const node = c;
                    if (node.dataSourceType === "LOCAL_STORAGE" && node.localStorageKey) keysToCache.add(node.localStorageKey);
                    if (node.selector && node.selector.startsWith("{{STORAGE:") && node.selector.endsWith("}}")) {
                        const fullPath = node.selector.substring(10, node.selector.length - 2).trim();
                        const rootKey = fullPath.split(".")[0];
                        if (rootKey) keysToCache.add(rootKey);
                    }
                } else extractKeys(c);
            });
        };
        activeRules.forEach((r)=>{
            if (r.logic) extractKeys(r.logic);
        });
        for (const key of keysToCache){
            const val = await storage.get(key);
            storageCache.set(key, val);
        }
        // 1. \u0110\u00e1nh gi\u00e1 l\u1ed7i (ch\u1ec9 v\u1edbi REALTIME rules) v\u00e0 th\u1ef1c thi ON_LOAD
        for (const rule of activeRules){
            const action = rule.actionType || "SHOW_WARNING";
            if (rule.triggerMode === "ON_LOAD") {
                if (!executedOnLoadRules.has(rule.id)) {
                    executedOnLoadRules.add(rule.id);
                    evaluateRuleAndUpdateStateSync(rule);
                }
            } else if (rule.triggerMode !== "EVENT_BASED") {
                // REALTIME
                if (action === "SHOW_WARNING" || action === "CONFIRM_WARNING") {
                    if (!rule.logic) continue;
                    const isError = evaluateGroupSync(rule.logic, rule.id);
                    ruleStates.set(rule.id, isError);
                } else if (action === "SET_VALUE" || action === "SAVE_TO_STORAGE") {
                    if (!rule.logic) continue;
                    const isConditionMet = evaluateGroupSync(rule.logic, rule.id);
                    const previousState = ruleStates.get(rule.id);
                    if (isConditionMet) {
                        if (action === "SET_VALUE") {
                            if (previousState !== true) {
                                if (rule.targetSelector && rule.setValueConfig?.value !== undefined) {
                                    const finalValue = resolveDynamicValueSync(rule.setValueConfig.value, triggerEl);
                                    const targetEls = document.querySelectorAll(rule.targetSelector);
                                    targetEls.forEach((el)=>{
                                        if (el.value !== finalValue) {
                                            el.value = finalValue;
                                            el.dispatchEvent(new Event("change", {
                                                bubbles: true
                                            }));
                                            el.dispatchEvent(new Event("input", {
                                                bubbles: true
                                            }));
                                            window.dispatchEvent(new CustomEvent("CARECHECK_TRIGGER_JQUERY_CHANGE", {
                                                detail: {
                                                    selector: rule.targetSelector,
                                                    value: finalValue
                                                }
                                            }));
                                        }
                                    });
                                }
                            }
                        } else if (action === "SAVE_TO_STORAGE") {
                            if (rule.targetSelector && rule.setValueConfig?.value !== undefined) {
                                const finalValue = resolveDynamicValueSync(rule.setValueConfig.value);
                                const storageKey = "CARECHECK_" + (rule.targetSelector.startsWith("SESSION:") ? rule.targetSelector.substring(8).trim() : rule.targetSelector.trim());
                                try {
                                    let currentSavedValue = rule.targetSelector.startsWith("SESSION:") ? sessionStorage.getItem(storageKey) : localStorage.getItem(storageKey);
                                    // Ch\u1ec9 save l\u1ea1i n\u1ebfu gi\u00e1 tr\u1ecb v\u1eeba l\u1ea5y ra KH\u00c1C v\u1edbi gi\u00e1 tr\u1ecb \u0111ang l\u01b0u trong Storage (ho\u1eb7c state nh\u1ea3y t\u1eeb false l\u00ean true)
                                    if (currentSavedValue !== finalValue || previousState !== true) {
                                        if (rule.targetSelector.startsWith("SESSION:")) sessionStorage.setItem(storageKey, finalValue);
                                        else localStorage.setItem(storageKey, finalValue);
                                        console.log(`[CareCheck DEBUG] SAVE_TO_STORAGE (REALTIME) k\u00edch ho\u1ea1t cho lu\u1eadt ${rule.id}. L\u01b0u gi\u00e1 tr\u1ecb: "${finalValue}" v\u00e0o bi\u1ebfn "${rule.targetSelector}"`);
                                    }
                                } catch (e) {
                                    console.error("L\u1ed7i khi l\u01b0u v\xe0o Storage:", e);
                                }
                            }
                        }
                    }
                    ruleStates.set(rule.id, isConditionMet);
                }
            } else {
                // G\u1eafn s\u1ef1 ki\u1ec7n cho EVENT_BASED rules
                // a. B\u1eaft s\u1ef1 ki\u1ec7n blur/change tr\u00ean targetSelector (CH\u1ec8 \u00e1p d\u1ee5ng cho c\u00e1c h\u00e0nh \u0111\u1ed9ng C\u1ea3nh b\u00e1o, v\u00ec c\u00e1c h\u00e0nh \u0111\u1ed9ng kh\u00e1c targetSelector l\u00e0 \u0110\u1ea7u ra/\u0110\u00edch \u0111\u1ebfn)
                const actionType = rule.actionType || "SHOW_WARNING";
                if ((actionType === "SHOW_WARNING" || actionType === "CONFIRM_WARNING") && rule.targetSelector && rule.targetSelector.trim() !== "") try {
                    const targetEls = document.querySelectorAll(rule.targetSelector);
                    targetEls.forEach((el)=>{
                        if (!el.hasAttribute(`data-bound-blur-${rule.id}`)) {
                            el.setAttribute(`data-bound-blur-${rule.id}`, "true");
                            el.addEventListener("blur", ()=>{
                                evaluateRuleAndUpdateStateSync(rule, el);
                            });
                            if (el.tagName === "SELECT" || el.tagName === "INPUT" || el.tagName === "TEXTAREA") el.addEventListener("change", ()=>evaluateRuleAndUpdateStateSync(rule, el));
                        }
                    });
                } catch (e) {
                    console.error(`[CareCheck] Invalid targetSelector in rule ${rule.id}: ${rule.targetSelector}`, e);
                }
                // b. B\u1eaft s\u1ef1 ki\u1ec7n tr\u00ean triggerSelector
                if (rule.triggerSelector && rule.triggerSelector.trim() !== "") try {
                    const triggerEls = document.querySelectorAll(rule.triggerSelector);
                    triggerEls.forEach((el)=>{
                        if (!el.hasAttribute(`data-bound-trigger-${rule.id}`)) {
                            el.setAttribute(`data-bound-trigger-${rule.id}`, "true");
                            let isExecuting = false;
                            let lastTriggerValue = undefined;
                            let lastTriggerChecked = undefined;
                            const handler = (e)=>{
                                if (isExecuting) return;
                                const isCheckbox = el.tagName === "INPUT" && el.type === "checkbox";
                                const currentValue = el.value || "";
                                const currentChecked = isCheckbox ? el.checked : undefined;
                                if (e.type === "blur" && lastTriggerValue === currentValue) return; // Ch\u1ed1ng l\u1eb7p: N\u1ebfu blur m\u00e0 gi\u00e1 tr\u1ecb kh\u00f4ng \u0111\u1ed5i, b\u1ecf qua kh\u00f4ng g\u1ecdi API l\u1ea1i
                                if (e.type === "change" || e.type === "blur" || e.type === "input") lastTriggerValue = currentValue;
                                // B\u1ecf qua s\u1ef1 ki\u1ec7n click tr\u00ean th\u1ebb SELECT \u0111\u1ec3 tr\u00e1nh k\u00edch ho\u1ea1t lu\u1eadt khi v\u1eeba click m\u1edf menu dropdown
                                if (e.type === "click" && el.tagName === "SELECT") return;
                                if (isCheckbox && e.type === "change") {
                                    // Ch\u1ed1ng l\u1eb7p khi click v\u00e0 change \u0111i li\u1ec1n nhau
                                    if (lastTriggerChecked === currentChecked) return;
                                }
                                const isRow = el.tagName === "TR" || el.tagName === "TD";
                                const isClickOnButton = e.type === "click" && !isCheckbox && !isRow;
                                // 1. Ki\u1ec3m tra t\u1ee9c th\u1eddi (Synchronous Check) ch\u1eb7n Save HIS
                                if (isClickOnButton) {
                                    if (rule.logic) {
                                        const isErrorSync = evaluateGroupSync(rule.logic, rule.id, el);
                                        if (isErrorSync) {
                                            const msg = rule.warningConfig?.message || rule.message || "D\u1eef li\u1ec7u kh\xf4ng h\u1ee3p l\u1ec7!";
                                            if (rule.actionType === "CONFIRM_WARNING") {
                                                // N\u1ebfu \u0111\u00e3 bypass qua modal custom r\u1ed3i th\u00ec b\u1ecf qua kh\u00f4ng check n\u1eefa
                                                if (window.__carecheckBypassedRules?.has(rule.id)) return;
                                                e.preventDefault();
                                                e.stopImmediatePropagation();
                                                const offendingVal = window.__carecheckOffendingValues?.get(rule.id) || "";
                                                const finalMsg = msg.replace(/\{\{VALUE\}\}/g, offendingVal);
                                                showCustomConfirmModal("C\u1ea2NH B\xc1O KI\u1ec2M TRA L\u1ed6I!", finalMsg, ()=>{
                                                    // Confirm: \u0110\u00e1nh d\u1ea5u \u0111\u00e3 bypass
                                                    if (!window.__carecheckBypassedRules) window.__carecheckBypassedRules = new Set();
                                                    window.__carecheckBypassedRules.add(rule.id);
                                                    // Gi\u1ea3 l\u1eadp l\u1ea1i c\u00fa click chu\u1ed9t \u0111\u1ec3 \u0111i ti\u1ebfp
                                                    if (typeof jQuery !== "undefined") jQuery(el).trigger("click");
                                                    else el.click();
                                                    // X\u00f3a c\u1edd bypass sau n\u1eeda gi\u00e2y
                                                    setTimeout(()=>{
                                                        window.__carecheckBypassedRules.delete(rule.id);
                                                    }, 500);
                                                }, ()=>{
                                                // Cancel: Kh\u00f4ng l\u00e0m g\u00ec c\u1ea3
                                                });
                                                return;
                                            } else {
                                                // M\u1eb7c \u0111\u1ecbnh SHOW_WARNING (Hard block)
                                                e.preventDefault();
                                                e.stopImmediatePropagation();
                                                evaluateRuleAndUpdateStateSync(rule, el); // K\u00edch ho\u1ea1t Toast UI
                                                return;
                                            }
                                        }
                                    }
                                    return; // Kh\u00f4ng c\u00f3 l\u1ed7i, cho HIS ch\u1ea1y ti\u1ebfp
                                }
                                // 2. V\u1edbi Checkbox/Row tr\u00ean l\u01b0\u1edbi, v\u1eabn gi\u1eef nguy\u00ean c\u01a1 ch\u1ebf ch\u1edd \u0111\u1ec3 HIS c\u1eadp nh\u1eadt DOM
                                isExecuting = true;
                                if (isCheckbox && e.type === "change") {
                                    // N\u1ebfu l\u00e0 s\u1ef1 ki\u1ec7n change th\u00ec DOM \u0111\u00e3 \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt, x\u1eed l\u00fd ngay
                                    lastTriggerChecked = currentChecked;
                                    evaluateRuleAndUpdateStateSync(rule, el);
                                    setTimeout(()=>{
                                        isExecuting = false;
                                    }, 100);
                                    return;
                                }
                                const initialState = currentChecked;
                                let attempts = 0;
                                const checkInterval = setInterval(()=>{
                                    attempts++;
                                    // N\u1ebfu kh\u00f4ng ph\u1ea3i checkbox, x\u1eed l\u00fd ngay trong tick \u0111\u1ea7u ti\u00ean.
                                    // N\u1ebfu l\u00e0 checkbox, \u0111\u1ee3i t\u1ed1i \u0111a 1 gi\u00e2y (20 * 50ms) \u0111\u1ec3 DOM thay \u0111\u1ed5i
                                    if (!isCheckbox || el.checked !== initialState || attempts >= 20) {
                                        clearInterval(checkInterval);
                                        if (isCheckbox) lastTriggerChecked = el.checked;
                                        evaluateRuleAndUpdateStateSync(rule, el);
                                        setTimeout(()=>{
                                            isExecuting = false;
                                        }, 100);
                                    }
                                }, 50);
                            };
                            el.addEventListener("click", handler, true);
                            el.addEventListener("change", handler, true);
                            // M\u1edf r\u1ed9ng v\u00f9ng b\u1eaft s\u1ef1 ki\u1ec7n: N\u1ebfu ng\u01b0\u1eddi d\u00f9ng c\u1ea5u h\u00ecnh trigger l\u00e0 checkbox, 
                            // nh\u01b0ng h\u1ecd l\u1ea1i click v\u00e0o c\u00e1i Row (th\u1ebb <tr>), th\u00ec HIS v\u1eabn s\u1ebd check checkbox.
                            // Do \u0111\u00f3 ta ph\u1ea3i b\u1eaft lu\u00f4n c\u1ea3 s\u1ef1 ki\u1ec7n click tr\u00ean c\u00e1i Row ch\u1ee9a n\u00f3!
                            const parentRow = el.closest("tr") || el.closest(".jqgrow");
                            if (parentRow && !parentRow.hasAttribute(`data-bound-trigger-row-${rule.id}`)) {
                                parentRow.setAttribute(`data-bound-trigger-row-${rule.id}`, "true");
                                parentRow.addEventListener("click", handler, true);
                            }
                            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
                                el.addEventListener("blur", handler, true);
                                el.addEventListener("change", handler, true);
                                el.addEventListener("keydown", (e)=>{
                                    if (e.key === "Enter") handler(e);
                                }, true);
                            }
                        }
                    });
                } catch (e) {
                    console.error(`[CareCheck] Invalid triggerSelector in rule ${rule.id}: ${rule.triggerSelector}`, e);
                }
                // c. \u0110\u0103ng k\u00fd ph\u00edm t\u1eaft to\u00e0n c\u1ee5c
                if (rule.triggerShortcut) bindGlobalKeydown();
            }
        }
        // 2. Render giao di\u1ec7n Toast v\u00e0 Visuals
        renderVisualsAndToasts();
    } catch (error) {
        if (error.message && error.message.includes("Extension context invalidated")) {
            console.log("[CareCheck] Extension \u0111\xe3 \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt b\u1ea3n m\u1edbi. \u0110ang t\u1eaft lu\u1ed3ng c\u0169...");
            if (engineInterval) clearInterval(engineInterval);
            return;
        }
        console.error("L\u1ed7i khi ch\u1ea1y engine \u0111\xe1nh gi\xe1:", error);
    } finally{
        isEvaluating = false;
    }
}
// Kh\u1edfi ch\u1ea1y \u0110\u1ed9ng c\u01a1
async function startEngine() {
    console.log("[CareCheck Assistant] Kh\u1edfi \u0111\u1ed9ng \u0111\u1ed9ng c\u01a1 logic ph\u1ee9c h\u1ee3p...");
    // N\u1ea1p Rules v\u00e0o b\u1ed9 nh\u1edb \u0111\u1ec7m (Cache) ngay l\u1ea7n \u0111\u1ea7u
    const initialRules = await storage.get(RULES_STORAGE_KEY);
    if (initialRules) cachedRules = initialRules;
    // Ch\u1ea1y ngay l\u1ea7n \u0111\u1ea7u
    await runEngineEvaluation();
    // \u0110\u0103ng k\u00fd observer \u0111\u1ec3 ch\u1ea1y l\u1ea1i m\u1ed7i khi DOM thay \u0111\u1ed5i ho\u1eb7c user g\u00f5 ph\u00edm
    const debouncedEval = debounce(runEngineEvaluation, 500);
    const observer = new MutationObserver(()=>{
        debouncedEval();
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });
    // L\u1eafng nghe s\u1ef1 ki\u1ec7n input \u0111\u1ec3 g\u1ee1 l\u1ed7i realtime
    document.body.addEventListener("input", ()=>{
        debouncedEval();
    }, true);
    document.body.addEventListener("change", ()=>{
        debouncedEval();
    }, true);
    // Fallback: Qu\u00e9t \u0111\u1ecbnh k\u1ef3 m\u1ed7i 0.1 gi\u00e2y (100ms) \u0111\u1ec3 ph\u1ea3n h\u1ed3i si\u00eau t\u1ed1c \u0111\u1ed9
    // Ch\u1ea1y th\u1eb3ng runEngineEvaluation thay v\u00ec debounce \u0111\u1ec3 kh\u00f4ng b\u1ecb c\u1ed9ng d\u1ed3n \u0111\u1ed9 tr\u1ec5
    if (engineInterval) clearInterval(engineInterval);
    engineInterval = setInterval(()=>{
        runEngineEvaluation();
    }, 100);
}
// Utility debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(()=>func(...args), wait);
    };
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", startEngine);
else startEngine();
function showCustomConfirmModal(title, message, onConfirm, onCancel) {
    const modalId = "carecheck-confirm-overlay";
    const existingModal = document.getElementById(modalId);
    if (existingModal) return;
    const overlayHTML = `
    <div id="${modalId}" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 2147483647; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(2px); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="background: white; width: 450px; max-width: 90%; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); overflow: hidden; animation: cc-modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
        <div style="background: #dc2626; padding: 24px; text-align: center;">
          <svg style="width: 56px; height: 56px; color: white; margin: 0 auto;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <div style="padding: 24px;">
          <h3 style="margin: 0 0 12px 0; color: #111827; font-size: 1.35rem; font-weight: 700; text-align: center; line-height: 1.2;">${title}</h3>
          <p style="margin: 0 0 28px 0; color: #4b5563; font-size: 1.05rem; line-height: 1.6; text-align: center; font-weight: 500;">${message}</p>
          <div style="display: flex; gap: 12px;">
            <button id="cc-btn-cancel" style="flex: 1; padding: 12px 16px; background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">H\u1ee7y b\u1ecf (S\u1eeda l\u1ea1i)</button>
            <button id="cc-btn-confirm" style="flex: 1; padding: 12px 16px; background: #ef4444; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">B\u1ecf qua & Ti\u1ebfp t\u1ee5c</button>
          </div>
        </div>
      </div>
    </div>
  `;
    const div = document.createElement("div");
    div.innerHTML = overlayHTML;
    document.body.appendChild(div);
    if (!document.getElementById("cc-modal-style")) {
        const style = document.createElement("style");
        style.id = "cc-modal-style";
        style.innerHTML = `
      @keyframes cc-modal-pop {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      #cc-btn-cancel:hover { background: #e5e7eb !important; border-color: #9ca3af !important; }
      #cc-btn-cancel:active { background: #d1d5db !important; }
      #cc-btn-confirm:hover { background: #dc2626 !important; transform: translateY(-1px); box-shadow: 0 4px 6px -1px rgba(239,68,68,0.4); }
      #cc-btn-confirm:active { background: #b91c1c !important; transform: translateY(0); box-shadow: none; }
    `;
        document.head.appendChild(style);
    }
    document.getElementById("cc-btn-cancel").onclick = ()=>{
        div.remove();
        onCancel();
    };
    document.getElementById("cc-btn-confirm").onclick = ()=>{
        div.remove();
        onConfirm();
    };
}

},{"@plasmohq/storage":"4Xe2t","@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"4Xe2t":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseStorage", ()=>o);
parcelHelpers.export(exports, "Storage", ()=>g);
var _pify = require("pify");
var _pifyDefault = parcelHelpers.interopDefault(_pify);
var l = ()=>{
    try {
        let e = globalThis.navigator?.userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (e[1] === "Chrome") return parseInt(e[2]) < 100 || globalThis.chrome.runtime?.getManifest()?.manifest_version === 2;
    } catch  {
        return !1;
    }
    return !1;
};
var o = class {
    #r;
    #t;
    get primaryClient() {
        return this.#t;
    }
    #e;
    get secondaryClient() {
        return this.#e;
    }
    #a;
    get area() {
        return this.#a;
    }
    get hasWebApi() {
        try {
            return typeof window < "u" && !!window.localStorage;
        } catch (e) {
            return console.error(e), !1;
        }
    }
    #s = new Map;
    #i;
    get copiedKeySet() {
        return this.#i;
    }
    isCopied = (e)=>this.hasWebApi && (this.allCopied || this.copiedKeySet.has(e));
    #n = !1;
    get allCopied() {
        return this.#n;
    }
    getExtStorageApi = ()=>globalThis.browser?.storage || globalThis.chrome?.storage;
    get hasExtensionApi() {
        try {
            return !!this.getExtStorageApi();
        } catch (e) {
            return console.error(e), !1;
        }
    }
    isWatchSupported = ()=>this.hasExtensionApi;
    keyNamespace = "";
    isValidKey = (e)=>e.startsWith(this.keyNamespace);
    getNamespacedKey = (e)=>`${this.keyNamespace}${e}`;
    getUnnamespacedKey = (e)=>e.slice(this.keyNamespace.length);
    serde = {
        serializer: JSON.stringify,
        deserializer: JSON.parse
    };
    constructor({ area: e = "sync", allCopied: t = !1, copiedKeyList: s = [], serde: r = {} } = {}){
        this.setCopiedKeySet(s), this.#a = e, this.#n = t, this.serde = {
            ...this.serde,
            ...r
        };
        try {
            this.hasWebApi && (t || s.length > 0) && (this.#e = window.localStorage);
        } catch  {}
        try {
            this.hasExtensionApi && (this.#r = this.getExtStorageApi(), l() ? this.#t = (0, _pifyDefault.default)(this.#r[this.area], {
                exclude: [
                    "getBytesInUse"
                ],
                errorFirst: !1
            }) : this.#t = this.#r[this.area]);
        } catch  {}
    }
    setCopiedKeySet(e) {
        this.#i = new Set(e);
    }
    rawGetAll = ()=>this.#t?.get();
    getAll = async ()=>{
        let e = await this.rawGetAll();
        return Object.entries(e).filter(([t])=>this.isValidKey(t)).reduce((t, [s, r])=>(t[this.getUnnamespacedKey(s)] = r, t), {});
    };
    copy = async (e)=>{
        let t = e === void 0;
        if (!t && !this.copiedKeySet.has(e) || !this.allCopied || !this.hasExtensionApi) return !1;
        let s = this.allCopied ? await this.rawGetAll() : await this.#t.get((t ? [
            ...this.copiedKeySet
        ] : [
            e
        ]).map(this.getNamespacedKey));
        if (!s) return !1;
        let r = !1;
        for(let a in s){
            let i = s[a], n = this.#e?.getItem(a);
            this.#e?.setItem(a, i), r ||= i !== n;
        }
        return r;
    };
    rawGet = async (e)=>(await this.rawGetMany([
            e
        ]))[e];
    rawGetMany = async (e)=>this.hasExtensionApi ? await this.#t.get(e) : e.filter(this.isCopied).reduce((t, s)=>(t[s] = this.#e?.getItem(s), t), {});
    rawSet = async (e, t)=>await this.rawSetMany({
            [e]: t
        });
    rawSetMany = async (e)=>(this.#e && Object.entries(e).filter(([t])=>this.isCopied(t)).forEach(([t, s])=>this.#e.setItem(t, s)), this.hasExtensionApi && await this.#t.set(e), null);
    clear = async (e = !1)=>{
        e && this.#e?.clear(), await this.#t.clear();
    };
    rawRemove = async (e)=>{
        await this.rawRemoveMany([
            e
        ]);
    };
    rawRemoveMany = async (e)=>{
        this.#e && e.filter(this.isCopied).forEach((t)=>this.#e.removeItem(t)), this.hasExtensionApi && await this.#t.remove(e);
    };
    removeAll = async ()=>{
        let e = await this.getAll(), t = Object.keys(e);
        await this.removeMany(t);
    };
    watch = (e)=>{
        let t = this.isWatchSupported();
        return t && this.#o(e), t;
    };
    #o = (e)=>{
        for(let t in e){
            let s = this.getNamespacedKey(t), r = this.#s.get(s)?.callbackSet || new Set;
            if (r.add(e[t]), r.size > 1) continue;
            let a = (i, n)=>{
                if (n !== this.area || !i[s]) return;
                let h = this.#s.get(s);
                if (!h) throw new Error(`Storage comms does not exist for nsKey: ${s}`);
                Promise.all([
                    this.parseValue(i[s].newValue),
                    this.parseValue(i[s].oldValue)
                ]).then(([y, d])=>{
                    for (let p of h.callbackSet)p({
                        newValue: y,
                        oldValue: d
                    }, n);
                });
            };
            this.#r.onChanged.addListener(a), this.#s.set(s, {
                callbackSet: r,
                listener: a
            });
        }
    };
    unwatch = (e)=>{
        let t = this.isWatchSupported();
        return t && this.#c(e), t;
    };
    #c(e) {
        for(let t in e){
            let s = this.getNamespacedKey(t), r = e[t], a = this.#s.get(s);
            a && (a.callbackSet.delete(r), a.callbackSet.size === 0 && (this.#s.delete(s), this.#r.onChanged.removeListener(a.listener)));
        }
    }
    unwatchAll = ()=>this.#h();
    #h() {
        this.#s.forEach(({ listener: e })=>this.#r.onChanged.removeListener(e)), this.#s.clear();
    }
    async getItem(e) {
        return this.get(e);
    }
    async getItems(e) {
        return await this.getMany(e);
    }
    async setItem(e, t) {
        await this.set(e, t);
    }
    async setItems(e) {
        await await this.setMany(e);
    }
    async removeItem(e) {
        return this.remove(e);
    }
    async removeItems(e) {
        return await this.removeMany(e);
    }
}, g = class extends o {
    get = async (e)=>{
        let t = this.getNamespacedKey(e), s = await this.rawGet(t);
        return this.parseValue(s);
    };
    getMany = async (e)=>{
        let t = e.map(this.getNamespacedKey), s = await this.rawGetMany(t), r = await Promise.all(Object.values(s).map(this.parseValue));
        return Object.keys(s).reduce((a, i, n)=>(a[this.getUnnamespacedKey(i)] = r[n], a), {});
    };
    set = async (e, t)=>{
        let s = this.getNamespacedKey(e), r = this.serde.serializer(t);
        return this.rawSet(s, r);
    };
    setMany = async (e)=>{
        let t = Object.entries(e).reduce((s, [r, a])=>(s[this.getNamespacedKey(r)] = this.serde.serializer(a), s), {});
        return await this.rawSetMany(t);
    };
    remove = async (e)=>{
        let t = this.getNamespacedKey(e);
        return this.rawRemove(t);
    };
    removeMany = async (e)=>{
        let t = e.map(this.getNamespacedKey);
        return await this.rawRemoveMany(t);
    };
    setNamespace = (e)=>{
        this.keyNamespace = e;
    };
    parseValue = async (e)=>{
        try {
            if (e !== void 0) return this.serde.deserializer(e);
        } catch (t) {
            console.error(t);
        }
    };
};

},{"pify":"fA13J","@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"fA13J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>pify);
const processFunction = (function_, options, proxy, unwrapped)=>function(...arguments_) {
        const P = options.promiseModule;
        return new P((resolve, reject)=>{
            if (options.multiArgs) arguments_.push((...result)=>{
                if (options.errorFirst) {
                    if (result[0]) reject(result);
                    else {
                        result.shift();
                        resolve(result);
                    }
                } else resolve(result);
            });
            else if (options.errorFirst) arguments_.push((error, result)=>{
                if (error) reject(error);
                else resolve(result);
            });
            else arguments_.push(resolve);
            const self = this === proxy ? unwrapped : this;
            Reflect.apply(function_, self, arguments_);
        });
    };
const filterCache = new WeakMap();
function pify(input, options) {
    options = {
        exclude: [
            /.+(?:Sync|Stream)$/
        ],
        errorFirst: true,
        promiseModule: Promise,
        ...options
    };
    const objectType = typeof input;
    if (!(input !== null && (objectType === "object" || objectType === "function"))) throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? "null" : objectType}\``);
    const filter = (target, key)=>{
        let cached = filterCache.get(target);
        if (!cached) {
            cached = {};
            filterCache.set(target, cached);
        }
        if (key in cached) return cached[key];
        const match = (pattern)=>typeof pattern === "string" || typeof key === "symbol" ? key === pattern : pattern.test(key);
        const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
        const writableOrConfigurableOwn = descriptor === undefined || descriptor.writable || descriptor.configurable;
        const included = options.include ? options.include.some((element)=>match(element)) : !options.exclude.some((element)=>match(element));
        const shouldFilter = included && writableOrConfigurableOwn;
        cached[key] = shouldFilter;
        return shouldFilter;
    };
    const cache = new WeakMap();
    const proxy = new Proxy(input, {
        apply (target, thisArg, args) {
            const cached = cache.get(target);
            if (cached) return Reflect.apply(cached, thisArg, args);
            const pified = options.excludeMain ? target : processFunction(target, options, proxy, target);
            cache.set(target, pified);
            return Reflect.apply(pified, thisArg, args);
        },
        get (target, key) {
            const property = target[key];
            // eslint-disable-next-line no-use-extend-native/no-use-extend-native
            if (!filter(target, key) || property === Function.prototype[key]) return property;
            const cached = cache.get(property);
            if (cached) return cached;
            if (typeof property === "function") {
                const pified = processFunction(property, options, proxy, target);
                cache.set(property, pified);
                return pified;
            }
            return property;
        }
    });
    return proxy;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"boKlo"}],"boKlo":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["93xyw","lNypx"], "lNypx", "parcelRequire8c29")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLGNBQWM7UUFBQyxPQUFPO0lBQUk7QUFDckQ7QUFFQSxRQUFRLFlBQVksU0FBVSxNQUFNLEVBQUUsSUFBSTtJQUN4QyxPQUFPLEtBQUssUUFBUSxRQUFRLFNBQVUsR0FBRztRQUN2QyxJQUFJLFFBQVEsYUFBYSxRQUFRLGdCQUFnQixLQUFLLGVBQWUsTUFDbkU7UUFHRixPQUFPLGVBQWUsTUFBTSxLQUFLO1lBQy9CLFlBQVk7WUFDWixLQUFLO2dCQUNILE9BQU8sTUFBTSxDQUFDLElBQUk7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBTztBQUNUO0FBRUEsUUFBUSxTQUFTLFNBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHO0lBQzVDLE9BQU8sZUFBZSxNQUFNLFVBQVU7UUFDcEMsWUFBWTtRQUNaLEtBQUs7SUFDUDtBQUNGIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHBsYXNtb2hxL3BhcmNlbC1ydW50aW1lL2Rpc3QvcnVudGltZS1iYTRlNWEwYjNjMGNjZjU3LmpzIiwiY29udGVudHMvdmFsaWRhdG9yLnRzIiwibm9kZV9tb2R1bGVzL0BwbGFzbW9ocS9zdG9yYWdlL2Rpc3QvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGlmeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3RyYW5zZm9ybWVyLWpzL3NyYy9lc21vZHVsZS1oZWxwZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBkPWdsb2JhbFRoaXMucHJvY2Vzcz8uYXJndnx8W107dmFyIHk9KCk9Pmdsb2JhbFRoaXMucHJvY2Vzcz8uZW52fHx7fTt2YXIgSD1uZXcgU2V0KGQpLF89ZT0+SC5oYXMoZSksRz1kLmZpbHRlcihlPT5lLnN0YXJ0c1dpdGgoXCItLVwiKSYmZS5pbmNsdWRlcyhcIj1cIikpLm1hcChlPT5lLnNwbGl0KFwiPVwiKSkucmVkdWNlKChlLFt0LG9dKT0+KGVbdF09byxlKSx7fSk7dmFyIFo9XyhcIi0tZHJ5LXJ1blwiKSxwPSgpPT5fKFwiLS12ZXJib3NlXCIpfHx5KCkuVkVSQk9TRT09PVwidHJ1ZVwiLHE9cCgpO3ZhciB1PShlPVwiXCIsLi4udCk9PmNvbnNvbGUubG9nKGUucGFkRW5kKDkpLFwifFwiLC4uLnQpO3ZhciB4PSguLi5lKT0+Y29uc29sZS5lcnJvcihcIlxcdXsxRjUzNH0gRVJST1JcIi5wYWRFbmQoOSksXCJ8XCIsLi4uZSksdj0oLi4uZSk9PnUoXCJcXHV7MUY1MzV9IElORk9cIiwuLi5lKSxtPSguLi5lKT0+dShcIlxcdXsxRjdFMH0gV0FSTlwiLC4uLmUpLFM9MCxjPSguLi5lKT0+cCgpJiZ1KGBcXHV7MUY3RTF9ICR7UysrfWAsLi4uZSk7dmFyIG49e1wiaXNDb250ZW50U2NyaXB0XCI6dHJ1ZSxcImlzQmFja2dyb3VuZFwiOmZhbHNlLFwiaXNSZWFjdFwiOmZhbHNlLFwicnVudGltZXNcIjpbXCJzY3JpcHQtcnVudGltZVwiXSxcImhvc3RcIjpcImxvY2FsaG9zdFwiLFwicG9ydFwiOjE4MTUsXCJlbnRyeUZpbGVQYXRoXCI6XCJEOlxcXFwxLlByb2plY3RCVkRLTFNcXFxcZXh0ZW5zaW9uc1NvZnR3YXJlXFxcXGNvZGVcXFxcY29udGVudHNcXFxcdmFsaWRhdG9yLnRzXCIsXCJidW5kbGVJZFwiOlwiZGMxN2NiYjYwOGYwMDI3MVwiLFwiZW52SGFzaFwiOlwiZTc5MmZiYmRhYTc4ZWU4NFwiLFwidmVyYm9zZVwiOlwiZmFsc2VcIixcInNlY3VyZVwiOmZhbHNlLFwic2VydmVyUG9ydFwiOjEwMTJ9O21vZHVsZS5idW5kbGUuSE1SX0JVTkRMRV9JRD1uLmJ1bmRsZUlkO2dsb2JhbFRoaXMucHJvY2Vzcz17YXJndjpbXSxlbnY6e1ZFUkJPU0U6bi52ZXJib3NlfX07dmFyIEQ9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU7ZnVuY3Rpb24gSShlKXtELmNhbGwodGhpcyxlKSx0aGlzLmhvdD17ZGF0YTptb2R1bGUuYnVuZGxlLmhvdERhdGFbZV0sX2FjY2VwdENhbGxiYWNrczpbXSxfZGlzcG9zZUNhbGxiYWNrczpbXSxhY2NlcHQ6ZnVuY3Rpb24odCl7dGhpcy5fYWNjZXB0Q2FsbGJhY2tzLnB1c2godHx8ZnVuY3Rpb24oKXt9KX0sZGlzcG9zZTpmdW5jdGlvbih0KXt0aGlzLl9kaXNwb3NlQ2FsbGJhY2tzLnB1c2godCl9fSxtb2R1bGUuYnVuZGxlLmhvdERhdGFbZV09dm9pZCAwfW1vZHVsZS5idW5kbGUuTW9kdWxlPUk7bW9kdWxlLmJ1bmRsZS5ob3REYXRhPXt9O3ZhciBsPWdsb2JhbFRoaXMuYnJvd3Nlcnx8Z2xvYmFsVGhpcy5jaHJvbWV8fG51bGw7ZnVuY3Rpb24gYigpe3JldHVybiFuLmhvc3R8fG4uaG9zdD09PVwiMC4wLjAuMFwiP1wibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIEMoKXtyZXR1cm4gbi5wb3J0fHxsb2NhdGlvbi5wb3J0fXZhciBFPVwiX19wbGFzbW9fcnVudGltZV9zY3JpcHRfXCI7ZnVuY3Rpb24gTChlLHQpe2xldHttb2R1bGVzOm99PWU7cmV0dXJuIG8/ISFvW3RdOiExfWZ1bmN0aW9uIE8oZT1DKCkpe2xldCB0PWIoKTtyZXR1cm5gJHtuLnNlY3VyZXx8bG9jYXRpb24ucHJvdG9jb2w9PT1cImh0dHBzOlwiJiYhL2xvY2FsaG9zdHwxMjcuMC4wLjF8MC4wLjAuMC8udGVzdCh0KT9cIndzc1wiOlwid3NcIn06Ly8ke3R9OiR7ZX0vYH1mdW5jdGlvbiBCKGUpe3R5cGVvZiBlLm1lc3NhZ2U9PVwic3RyaW5nXCImJngoXCJbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogXCIrZS5tZXNzYWdlKX1mdW5jdGlvbiBQKGUpe2lmKHR5cGVvZiBnbG9iYWxUaGlzLldlYlNvY2tldD5cInVcIilyZXR1cm47bGV0IHQ9bmV3IFdlYlNvY2tldChPKCkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHI9SlNPTi5wYXJzZShvLmRhdGEpO2lmKHIudHlwZT09PVwidXBkYXRlXCImJmF3YWl0IGUoci5hc3NldHMpLHIudHlwZT09PVwiZXJyb3JcIilmb3IobGV0IGEgb2Ygci5kaWFnbm9zdGljcy5hbnNpKXtsZXQgdz1hLmNvZGVmcmFtZXx8YS5zdGFjazttKFwiW3BsYXNtby9wYXJjZWwtcnVudGltZV06IFwiK2EubWVzc2FnZStgXG5gK3crYFxuXG5gK2EuaGludHMuam9pbihgXG5gKSl9fSksdC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixCKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJvcGVuXCIsKCk9Pnt2KGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGVkIHRvIEhNUiBzZXJ2ZXIgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdC5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIiwoKT0+e20oYFtwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBDb25uZWN0aW9uIHRvIHRoZSBITVIgc2VydmVyIGlzIGNsb3NlZCBmb3IgJHtuLmVudHJ5RmlsZVBhdGh9YCl9KSx0fXZhciBzPVwiX19wbGFzbW8tbG9hZGluZ19fXCI7ZnVuY3Rpb24gJCgpe2xldCBlPWdsb2JhbFRoaXMud2luZG93Py50cnVzdGVkVHlwZXM7aWYodHlwZW9mIGU+XCJ1XCIpcmV0dXJuO2xldCB0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInRydXN0ZWQtdHlwZXNcIl0nKT8uY29udGVudD8uc3BsaXQoXCIgXCIpLG89dD90W3Q/Lmxlbmd0aC0xXS5yZXBsYWNlKC87L2csXCJcIik6dm9pZCAwO3JldHVybiB0eXBlb2YgZTxcInVcIj9lLmNyZWF0ZVBvbGljeShvfHxgdHJ1c3RlZC1odG1sLSR7c31gLHtjcmVhdGVIVE1MOmE9PmF9KTp2b2lkIDB9dmFyIFQ9JCgpO2Z1bmN0aW9uIGcoKXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocyl9ZnVuY3Rpb24gZigpe3JldHVybiFnKCl9ZnVuY3Rpb24gRigpe2xldCBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7ZS5pZD1zO2xldCB0PWBcbiAgPHN0eWxlPlxuICAgICMke3N9IHtcbiAgICAgIGJhY2tncm91bmQ6ICNmM2YzZjM7XG4gICAgICBjb2xvcjogIzMzMztcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzM7XG4gICAgICBib3gtc2hhZG93OiAjMzMzIDQuN3B4IDQuN3B4O1xuICAgIH1cblxuICAgICMke3N9OmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICNlM2UzZTM7XG4gICAgICBjb2xvcjogIzQ0NDtcbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIHBsYXNtby1sb2FkaW5nLWFuaW1hdGUtc3ZnLWZpbGwge1xuICAgICAgMCUge1xuICAgICAgICBmaWxsOiB0cmFuc3BhcmVudDtcbiAgICAgIH1cbiAgICBcbiAgICAgIDEwMCUge1xuICAgICAgICBmaWxsOiAjMzMzO1xuICAgICAgfVxuICAgIH1cblxuICAgICMke3N9IC5zdmctZWxlbS0xIHtcbiAgICAgIGFuaW1hdGlvbjogcGxhc21vLWxvYWRpbmctYW5pbWF0ZS1zdmctZmlsbCAxLjQ3cyBjdWJpYy1iZXppZXIoMC40NywgMCwgMC43NDUsIDAuNzE1KSAwLjhzIGJvdGggaW5maW5pdGU7XG4gICAgfVxuXG4gICAgIyR7c30gLnN2Zy1lbGVtLTIge1xuICAgICAgYW5pbWF0aW9uOiBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIDEuNDdzIGN1YmljLWJlemllcigwLjQ3LCAwLCAwLjc0NSwgMC43MTUpIDAuOXMgYm90aCBpbmZpbml0ZTtcbiAgICB9XG4gICAgXG4gICAgIyR7c30gLnN2Zy1lbGVtLTMge1xuICAgICAgYW5pbWF0aW9uOiBwbGFzbW8tbG9hZGluZy1hbmltYXRlLXN2Zy1maWxsIDEuNDdzIGN1YmljLWJlemllcigwLjQ3LCAwLCAwLjc0NSwgMC43MTUpIDFzIGJvdGggaW5maW5pdGU7XG4gICAgfVxuXG4gICAgIyR7c30gLmhpZGRlbiB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICA8L3N0eWxlPlxuICBcbiAgPHN2ZyBoZWlnaHQ9XCIzMlwiIHdpZHRoPVwiMzJcIiB2aWV3Qm94PVwiMCAwIDI2NCAzNTRcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICA8cGF0aCBkPVwiTTEzOS4yMjEgMjgyLjI0M0MxNTQuMjUyIDI4Mi4yNDMgMTY2LjkwMyAyOTQuODQ5IDE2MS4zMzggMzA4LjgxMkMxNTkuNDg5IDMxMy40NTQgMTU3LjE1IDMxNy45MTMgMTU0LjM0NyAzMjIuMTA5QzE0Ni40NjQgMzMzLjkwOSAxMzUuMjYgMzQzLjEwNyAxMjIuMTUxIDM0OC41MzhDMTA5LjA0MyAzNTMuOTY5IDk0LjYxODIgMzU1LjM5IDgwLjcwMjIgMzUyLjYyMUM2Ni43ODYxIDM0OS44NTIgNTQuMDAzNCAzNDMuMDE4IDQzLjk3MDUgMzMyLjk4M0MzMy45Mzc1IDMyMi45NDcgMjcuMTA1IDMxMC4xNjIgMjQuMzM2OSAyOTYuMjQyQzIxLjU2ODkgMjgyLjMyMyAyMi45ODk1IDI2Ny44OTUgMjguNDE5MyAyNTQuNzgzQzMzLjg0OTEgMjQxLjY3MSA0My4wNDQxIDIzMC40NjQgNTQuODQxNiAyMjIuNTc5QzU5LjAzNTMgMjE5Ljc3NyA2My40OTA4IDIxNy40MzggNjguMTI5NSAyMTUuNTg4QzgyLjA5MTUgMjEwLjAyMSA5NC42OTc4IDIyMi42NzEgOTQuNjk3OCAyMzcuNzAzTDk0LjY5NzggMjU1LjAyN0M5NC42OTc4IDI3MC4wNTggMTA2Ljg4MyAyODIuMjQzIDEyMS45MTQgMjgyLjI0M0gxMzkuMjIxWlwiIGZpbGw9XCIjMzMzXCIgY2xhc3M9XCJzdmctZWxlbS0xXCIgPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE5Mi4yNjEgMTQyLjAyOEMxOTIuMjYxIDEyNi45OTYgMjA0Ljg2NyAxMTQuMzQ2IDIxOC44MjkgMTE5LjkxM0MyMjMuNDY4IDEyMS43NjMgMjI3LjkyMyAxMjQuMTAyIDIzMi4xMTcgMTI2LjkwNEMyNDMuOTE1IDEzNC43ODkgMjUzLjExIDE0NS45OTYgMjU4LjUzOSAxNTkuMTA4QzI2My45NjkgMTcyLjIyIDI2NS4zOSAxODYuNjQ4IDI2Mi42MjIgMjAwLjU2N0MyNTkuODU0IDIxNC40ODcgMjUzLjAyMSAyMjcuMjcyIDI0Mi45ODggMjM3LjMwOEMyMzIuOTU1IDI0Ny4zNDMgMjIwLjE3MyAyNTQuMTc3IDIwNi4yNTYgMjU2Ljk0NkMxOTIuMzQgMjU5LjcxNSAxNzcuOTE2IDI1OC4yOTQgMTY0LjgwNyAyNTIuODYzQzE1MS42OTkgMjQ3LjQzMiAxNDAuNDk1IDIzOC4yMzQgMTMyLjYxMiAyMjYuNDM0QzEyOS44MDggMjIyLjIzOCAxMjcuNDcgMjE3Ljc3OSAxMjUuNjIgMjEzLjEzN0MxMjAuMDU2IDE5OS4xNzQgMTMyLjcwNyAxODYuNTY4IDE0Ny43MzggMTg2LjU2OEwxNjUuMDQ0IDE4Ni41NjhDMTgwLjA3NiAxODYuNTY4IDE5Mi4yNjEgMTc0LjM4MyAxOTIuMjYxIDE1OS4zNTJMMTkyLjI2MSAxNDIuMDI4WlwiIGZpbGw9XCIjMzMzXCIgY2xhc3M9XCJzdmctZWxlbS0yXCIgPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTk1LjY1MjIgMTY0LjEzNUM5NS42NTIyIDE3OS4xNjcgODMuMjI3OSAxOTEuNzI1IDY4LjgwMTMgMTg3LjUwNUM1OS41MTQ1IDE4NC43ODggNTAuNjQzMiAxODAuNjYzIDQyLjUxMDYgMTc1LjIyN0MyNi43ODA2IDE2NC43MTQgMTQuNTIwNiAxNDkuNzcyIDcuMjgwODkgMTMyLjI4OUMwLjA0MTE4MyAxMTQuODA3IC0xLjg1MzA1IDk1LjU2OTcgMS44Mzc3MiA3Ny4wMTA0QzUuNTI4NDkgNTguNDUxMSAxNC42Mzg1IDQxLjQwMzMgMjguMDE1NyAyOC4wMjI4QzQxLjM5MyAxNC42NDIzIDU4LjQzNjYgNS41MzAwNiA3Ni45OTE0IDEuODM4MzlDOTUuNTQ2MSAtMS44NTMyOSAxMTQuNzc5IDAuMDQxNDE2MiAxMzIuMjU3IDcuMjgyOUMxNDkuNzM1IDE0LjUyNDQgMTY0LjY3NCAyNi43ODc0IDE3NS4xODQgNDIuNTIxMkMxODAuNjIgNTAuNjU3NiAxODQuNzQ0IDU5LjUzMzIgMTg3LjQ2IDY4LjgyNDVDMTkxLjY3OCA4My4yNTE5IDE3OS4xMTkgOTUuNjc1OSAxNjQuMDg4IDk1LjY3NTlMMTIyLjg2OSA5NS42NzU5QzEwNy44MzcgOTUuNjc1OSA5NS42NTIyIDEwNy44NjEgOTUuNjUyMiAxMjIuODkyTDk1LjY1MjIgMTY0LjEzNVpcIiBmaWxsPVwiIzMzM1wiIGNsYXNzPVwic3ZnLWVsZW0tM1wiPjwvcGF0aD5cbiAgPC9zdmc+XG4gIDxzcGFuIGNsYXNzPVwiaGlkZGVuXCI+Q29udGV4dCBJbnZhbGlkYXRlZCwgUHJlc3MgdG8gUmVsb2FkPC9zcGFuPlxuICBgO3JldHVybiBlLmlubmVySFRNTD1UP1QuY3JlYXRlSFRNTCh0KTp0LGUuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixlLnN0eWxlLnBvc2l0aW9uPVwiZml4ZWRcIixlLnN0eWxlLmJvdHRvbT1cIjE0LjdweFwiLGUuc3R5bGUucmlnaHQ9XCIxNC43cHhcIixlLnN0eWxlLmZvbnRGYW1pbHk9XCJzYW5zLXNlcmlmXCIsZS5zdHlsZS5kaXNwbGF5PVwiZmxleFwiLGUuc3R5bGUuanVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIixlLnN0eWxlLmFsaWduSXRlbXM9XCJjZW50ZXJcIixlLnN0eWxlLnBhZGRpbmc9XCIxNC43cHhcIixlLnN0eWxlLmdhcD1cIjE0LjdweFwiLGUuc3R5bGUuYm9yZGVyUmFkaXVzPVwiNC43cHhcIixlLnN0eWxlLnpJbmRleD1cIjIxNDc0ODM2NDdcIixlLnN0eWxlLm9wYWNpdHk9XCIwXCIsZS5zdHlsZS50cmFuc2l0aW9uPVwiYWxsIDAuNDdzIGVhc2UtaW4tb3V0XCIsZX1mdW5jdGlvbiBOKGUpe3JldHVybiBuZXcgUHJvbWlzZSh0PT57ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50PyhmKCkmJihkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZSksdCgpKSx0KCkpOmdsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwoKT0+e2YoKSYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGUpLHQoKX0pfSl9dmFyIGs9KCk9PntsZXQgZTtpZihmKCkpe2xldCB0PUYoKTtlPU4odCl9cmV0dXJue3Nob3c6YXN5bmMoe3JlbG9hZEJ1dHRvbjp0PSExfT17fSk9Pnthd2FpdCBlO2xldCBvPWcoKTtvLnN0eWxlLm9wYWNpdHk9XCIxXCIsdCYmKG8ub25jbGljaz1yPT57ci5zdG9wUHJvcGFnYXRpb24oKSxnbG9iYWxUaGlzLmxvY2F0aW9uLnJlbG9hZCgpfSxvLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIiksby5zdHlsZS5jdXJzb3I9XCJwb2ludGVyXCIsby5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYWxsXCIpfSxoaWRlOmFzeW5jKCk9Pnthd2FpdCBlO2xldCB0PWcoKTt0LnN0eWxlLm9wYWNpdHk9XCIwXCJ9fX07dmFyIFc9YCR7RX0ke21vZHVsZS5pZH1fX2AsaSxBPSExLE09aygpO2FzeW5jIGZ1bmN0aW9uIGgoKXtjKFwiU2NyaXB0IFJ1bnRpbWUgLSByZWxvYWRpbmdcIiksQT9nbG9iYWxUaGlzLmxvY2F0aW9uPy5yZWxvYWQ/LigpOk0uc2hvdyh7cmVsb2FkQnV0dG9uOiEwfSl9ZnVuY3Rpb24gUigpe2k/LmRpc2Nvbm5lY3QoKSxpPWw/LnJ1bnRpbWUuY29ubmVjdCh7bmFtZTpXfSksaS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCk9PntoKCl9KSxpLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihlPT57ZS5fX3BsYXNtb19jc19yZWxvYWRfXyYmaCgpLGUuX19wbGFzbW9fY3NfYWN0aXZlX3RhYl9fJiYoQT0hMCl9KX1mdW5jdGlvbiBqKCl7aWYobD8ucnVudGltZSl0cnl7UigpLHNldEludGVydmFsKFIsMjRlMyl9Y2F0Y2h7cmV0dXJufX1qKCk7UChhc3luYyBlPT57YyhcIlNjcmlwdCBydW50aW1lIC0gb24gdXBkYXRlZCBhc3NldHNcIiksZS5maWx0ZXIobz0+by5lbnZIYXNoPT09bi5lbnZIYXNoKS5zb21lKG89PkwobW9kdWxlLmJ1bmRsZSxvLmlkKSkmJihNLnNob3coKSxsPy5ydW50aW1lP2kucG9zdE1lc3NhZ2Uoe19fcGxhc21vX2NzX2NoYW5nZWRfXzohMH0pOnNldFRpbWVvdXQoKCk9PntoKCl9LDQ3MDApKX0pO1xuIiwiaW1wb3J0IHR5cGUgeyBQbGFzbW9DU0NvbmZpZyB9IGZyb20gXCJwbGFzbW9cIlxyXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIkBwbGFzbW9ocS9zdG9yYWdlXCJcclxuaW1wb3J0IHR5cGUgeyBSdWxlLCBMb2dpY0dyb3VwLCBDb25kaXRpb25Ob2RlIH0gZnJvbSBcIi4uL2ZlYXR1cmVzL2FkbWluL1J1bGVMaXN0XCJcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWc6IFBsYXNtb0NTQ29uZmlnID0ge1xyXG4gIG1hdGNoZXM6IFtcIio6Ly8qLnZuY2FyZS52bi8qXCJdLFxyXG4gIGFsbF9mcmFtZXM6IHRydWVcclxufVxyXG5cclxuY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKHsgYXJlYTogXCJsb2NhbFwiIH0pXHJcbmNvbnN0IFJVTEVTX1NUT1JBR0VfS0VZID0gXCJtb2NrX2RiX3J1bGVzXCJcclxuXHJcbi8vIMSQw6FuaCBk4bqldSBwaOG6p24gdOG7rSDEkcOjIGLhu4sgbOG7l2kgxJHhu4MgcXXhuqNuIGzDvVxyXG5jb25zdCBFUlJPUl9BVFRSID0gXCJkYXRhLWNhcmVjaGVjay1lcnJvclwiO1xyXG5jb25zdCBUT0FTVF9DT05UQUlORVJfSUQgPSBcImNhcmVjaGVjay10b2FzdC1jb250YWluZXJcIjtcclxuY29uc3QgcnVsZVN0YXRlcyA9ICh3aW5kb3cgYXMgYW55KS5fX2NhcmVjaGVja1J1bGVTdGF0ZXMgPSAod2luZG93IGFzIGFueSkuX19jYXJlY2hlY2tSdWxlU3RhdGVzIHx8IG5ldyBNYXA8c3RyaW5nLCBib29sZWFuPigpO1xyXG5jb25zdCBkaXNtaXNzZWRSdWxlcyA9ICh3aW5kb3cgYXMgYW55KS5fX2NhcmVjaGVja0Rpc21pc3NlZFJ1bGVzID0gKHdpbmRvdyBhcyBhbnkpLl9fY2FyZWNoZWNrRGlzbWlzc2VkUnVsZXMgfHwgbmV3IFNldDxzdHJpbmc+KCk7XHJcbmNvbnN0IHJ1bGVPZmZlbmRpbmdWYWx1ZXMgPSAod2luZG93IGFzIGFueSkuX19jYXJlY2hlY2tPZmZlbmRpbmdWYWx1ZXMgPSAod2luZG93IGFzIGFueSkuX19jYXJlY2hlY2tPZmZlbmRpbmdWYWx1ZXMgfHwgbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcclxubGV0IGFjdGl2ZVJ1bGVzOiBSdWxlW10gPSBbXTtcclxuXHJcbi8vIELGoW0gQ1NTIEFuaW1hdGlvbiBjaG8gVG9hc3RcclxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICBzdHlsZS50ZXh0Q29udGVudCA9IGBcclxuICAgIEBrZXlmcmFtZXMgY2FyZWNoZWNrLXNsaWRlLWluIHtcclxuICAgICAgZnJvbSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTsgb3BhY2l0eTogMDsgfVxyXG4gICAgICB0byB7IHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsgb3BhY2l0eTogMTsgfVxyXG4gICAgfVxyXG4gIGA7XHJcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaG93V2FybmluZ1VJKHJ1bGU6IFJ1bGUpIHtcclxuICBpZiAoZGlzbWlzc2VkUnVsZXMuaGFzKHJ1bGUuaWQpKSByZXR1cm47XHJcblxyXG4gIGNvbnN0IHdhcm5pbmdJZCA9IGBjYXJlY2hlY2std2FybmluZy0ke3J1bGUuaWR9YDtcclxuICBjb25zdCBleGlzdGluZ1dhcm5pbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh3YXJuaW5nSWQpO1xyXG4gIGlmIChleGlzdGluZ1dhcm5pbmcpIHtcclxuICAgIGV4aXN0aW5nV2FybmluZy5yZW1vdmUoKTsgLy8gWMOzYSBUb2FzdCBjxakgxJHhu4MgY+G6rXAgbmjhuq10IFRvYXN0IG3hu5tpIChraGkgY2xpY2sgbGnDqm4gdGnhur9wIG5oaeG7gXUgcm93KVxyXG4gIH1cclxuICBcclxuICBjb25zdCBjb25maWcgPSBydWxlLndhcm5pbmdDb25maWcgfHwge1xyXG4gICAgdGVtcGxhdGU6IFwiVE9BU1RcIixcclxuICAgIHBvc2l0aW9uOiBcIkJPVFRPTV9SSUdIVFwiLFxyXG4gICAgdGl0bGU6IFwiXCIsXHJcbiAgICBtZXNzYWdlOiBydWxlLm1lc3NhZ2UgfHwgXCJD4bqjbmggYsOhbyBM4buXaSFcIlxyXG4gIH07XHJcbiAgXHJcbiAgLy8gSMOgbSB44butIGzDvSB0aMO0bmcgxJFp4buHcCDEkeG7mW5nIChTdHJpbmcgSW50ZXJwb2xhdGlvbilcclxuICBjb25zdCBpbnRlcnBvbGF0ZVN0cmluZyA9IGFzeW5jIChzdHI6IHN0cmluZykgPT4ge1xyXG4gICAgaWYgKCFzdHIpIHJldHVybiBzdHI7XHJcbiAgICBjb25zdCBtYXRjaGVzID0gc3RyLm1hdGNoKC9cXHtcXHsoW159XSspXFx9XFx9L2cpO1xyXG4gICAgaWYgKCFtYXRjaGVzKSByZXR1cm4gc3RyO1xyXG4gICAgXHJcbiAgICBsZXQgcmVzdWx0ID0gc3RyO1xyXG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSB7XHJcbiAgICAgIGlmIChtYXRjaCA9PT0gXCJ7e1ZBTFVFfX1cIikgY29udGludWU7IC8vIFPhur0gxJHGsOG7o2MgeOG7rSBsw70gcmnDqm5nIOG7nyBkxrDhu5tpXHJcbiAgICAgIGNvbnN0IGZ1bGxQYXRoID0gbWF0Y2gucmVwbGFjZSgvW3t9XS9nLCAnJykudHJpbSgpO1xyXG4gICAgICBjb25zdCBwYXJ0cyA9IGZ1bGxQYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBzdG9yYWdlS2V5ID0gcGFydHNbMF07XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHN0b3JhZ2UuZ2V0PGFueT4oc3RvcmFnZUtleSk7XHJcbiAgICAgICAgbGV0IHZhbCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZCA9IGV4dHJhY3RGcm9tUGF0aChkYXRhLCBwYXJ0cy5zbGljZSgxKS5qb2luKFwiLlwiKSk7XHJcbiAgICAgICAgICB2YWwgPSBleHRyYWN0ZWQgIT0gbnVsbCA/IFN0cmluZyhleHRyYWN0ZWQpIDogXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVwbGFjZSBhbGwgb2NjdXJyZW5jZXMgb2YgdGhpcyBzcGVjaWZpYyBtYXRjaFxyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zcGxpdChtYXRjaCkuam9pbih2YWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIFRoYXkgdGjhur8gbmhhbmgge3tWQUxVRX19IGLhurFuZyBnacOhIHRy4buLIHZpIHBo4bqhbSAobuG6v3UgY8OzKVxyXG4gICAgY29uc3Qgb2ZmZW5kaW5nVmFsdWUgPSAod2luZG93IGFzIGFueSkuX19jYXJlY2hlY2tPZmZlbmRpbmdWYWx1ZXM/LmdldChydWxlLmlkKSB8fCBcIlwiO1xyXG4gICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xce1xce1ZBTFVFXFx9XFx9L2csIG9mZmVuZGluZ1ZhbHVlKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9O1xyXG5cclxuICBjb25zdCBtZXNzYWdlVGV4dCA9IGF3YWl0IGludGVycG9sYXRlU3RyaW5nKGNvbmZpZy5tZXNzYWdlKTtcclxuICBjb25zdCB0aXRsZVRleHQgPSBhd2FpdCBpbnRlcnBvbGF0ZVN0cmluZyhjb25maWcudGl0bGUgfHwgXCJcIik7XHJcbiAgXHJcbiAgaWYgKCFtZXNzYWdlVGV4dCkgcmV0dXJuOyAvLyBO4bq/dSBy4buXbmcgdGjDrCDhuqluIMSRaSB0aGVvIHJ1bGVcclxuICBcclxuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICB3cmFwcGVyLmlkID0gd2FybmluZ0lkO1xyXG4gIHdyYXBwZXIuc3R5bGUuekluZGV4ID0gXCIyMTQ3NDgzNjQ3XCI7IC8vIE1heCB6LWluZGV4XHJcbiAgd3JhcHBlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbiAgd3JhcHBlci5zdHlsZS5mb250RmFtaWx5ID0gXCJzYW5zLXNlcmlmXCI7XHJcbiAgXHJcbiAgLy8gSMOgbSB04bqhbyBOw7p0IEjDoG5oIMSR4buZbmdcclxuICBjb25zdCBjcmVhdGVBY3Rpb25CdG4gPSAoKSA9PiB7XHJcbiAgICBpZiAoIXJ1bGUudG9hc3RBY3Rpb24/LmFwaVVybCB8fCAhcnVsZS50b2FzdEFjdGlvbj8ubGFiZWwpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBidG4uaW5uZXJUZXh0ID0gcnVsZS50b2FzdEFjdGlvbi5sYWJlbDtcclxuICAgIGJ0bi5zdHlsZS5jc3NUZXh0ID0gXCJiYWNrZ3JvdW5kOiB3aGl0ZTsgY29sb3I6ICNlZjQ0NDQ7IGJvcmRlcjogbm9uZTsgcGFkZGluZzogNnB4IDEycHg7IGJvcmRlci1yYWRpdXM6IDRweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGZvbnQtc2l6ZTogMTRweDsgY3Vyc29yOiBwb2ludGVyO1wiO1xyXG4gICAgaWYgKGNvbmZpZy50ZW1wbGF0ZSA9PT0gXCJUT0FTVFwiKSBidG4uc3R5bGUubWFyZ2luTGVmdCA9IFwiYXV0b1wiO1xyXG4gICAgaWYgKGNvbmZpZy50ZW1wbGF0ZSA9PT0gXCJNT0RBTFwiKSBidG4uc3R5bGUubWFyZ2luVG9wID0gXCIxMnB4XCI7XHJcbiAgICBcclxuICAgIGJ0bi5vbmNsaWNrID0gYXN5bmMgKGUpID0+IHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBidG4uaW5uZXJUZXh0ID0gXCLEkGFuZyB44butIGzDvS4uLlwiO1xyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHVzZXJuYW1lID0gXCJcIjtcclxuICAgICAgICBpZiAocnVsZS50b2FzdEFjdGlvbiEudXNlclNlbGVjdG9yKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJ1bGUudG9hc3RBY3Rpb24hLnVzZXJTZWxlY3RvcikgYXMgYW55O1xyXG4gICAgICAgICAgICB1c2VybmFtZSA9IHVzZXJFbCA/ICh1c2VyRWwudmFsdWUgfHwgdXNlckVsLnRleHRDb250ZW50IHx8IFwiXCIpIDogXCJcIjtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW0NhcmVDaGVja10gSW52YWxpZCB1c2VyU2VsZWN0b3IgaW4gdG9hc3RBY3Rpb246ICR7cnVsZS50b2FzdEFjdGlvbiEudXNlclNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvZmZlbmRpbmdWYWx1ZSA9IHJ1bGVPZmZlbmRpbmdWYWx1ZXMuZ2V0KHJ1bGUuaWQpIHx8IFwiXCI7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2gocnVsZS50b2FzdEFjdGlvbiEuYXBpVXJsLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1c2VybmFtZTogdXNlcm5hbWUudHJpbSgpLCBlcnJvcl92YWx1ZTogb2ZmZW5kaW5nVmFsdWUudHJpbSgpIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHJlcy5vaykge1xyXG4gICAgICAgICAgYnRuLnN0eWxlLmJhY2tncm91bmQgPSBcIiMyMmM1NWVcIjsgYnRuLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiOyBidG4uaW5uZXJUZXh0ID0gXCLinJMgVGjDoG5oIGPDtG5nXCI7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHdyYXBwZXIucmVtb3ZlKCksIDIwMDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBidG4uaW5uZXJUZXh0ID0gXCLinYwgTOG7l2kgU2VydmVyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBidG4uaW5uZXJUZXh0ID0gXCLinYwgTOG7l2kgTeG6oW5nXCI7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gYnRuO1xyXG4gIH07XHJcbiAgXHJcbiAgY29uc3QgYWN0aW9uQnRuID0gY3JlYXRlQWN0aW9uQnRuKCk7XHJcbiAgY29uc3QgY2xvc2VCdG5IdG1sID0gYDxidXR0b24gY2xhc3M9XCJjYXJlY2hlY2stY2xvc2UtYnRuXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOm5vbmU7Ym9yZGVyOm5vbmU7Y29sb3I6aW5oZXJpdDtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MjBweDtvcGFjaXR5OjAuODtwYWRkaW5nOjA7bGluZS1oZWlnaHQ6MTtcIiB0aXRsZT1cIsSQw7NuZ1wiPuKclTwvYnV0dG9uPmA7XHJcblxyXG4gIGlmIChjb25maWcudGVtcGxhdGUgPT09IFwiTU9EQUxcIikge1xyXG4gICAgd3JhcHBlci5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuaW5zZXQgPSBcIjBcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuYmFja2Ryb3BGaWx0ZXIgPSBcImJsdXIoNHB4KVwiO1xyXG4gICAgd3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgICBcclxuICAgIC8vIFBvc2l0aW9uIGFsaWdubWVudCBjaG8gTW9kYWwgKENFTlRFUiBsw6AgbeG6t2MgxJHhu4tuaClcclxuICAgIHdyYXBwZXIuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XHJcbiAgICB3cmFwcGVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcclxuICAgIFxyXG4gICAgd3JhcHBlci5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJlY2hlY2stbW9kYWwtY29udGVudFwiIHN0eWxlPVwiYmFja2dyb3VuZDogd2hpdGU7IGJvcmRlci1yYWRpdXM6IDEycHg7IGJveC1zaGFkb3c6IDAgMjVweCA1MHB4IC0xMnB4IHJnYmEoMCwwLDAsMC4yNSk7IG1heC13aWR0aDogNTAwcHg7IHdpZHRoOiA5MCU7IG92ZXJmbG93OiBoaWRkZW47IGFuaW1hdGlvbjogY2FyZWNoZWNrLXNsaWRlLWluIDAuM3MgZWFzZS1vdXQ7XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6ICNlZjQ0NDQ7IGNvbG9yOiB3aGl0ZTsgcGFkZGluZzogMTZweCAyMHB4OyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCI+XHJcbiAgICAgICAgICA8aDIgc3R5bGU9XCJtYXJnaW46IDA7IGZvbnQtc2l6ZTogMThweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGRpc3BsYXk6IGZsZXg7IGdhcDogOHB4OyBhbGlnbi1pdGVtczogY2VudGVyO1wiPlxyXG4gICAgICAgICAgICA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogMjRweDtcIj7imqDvuI88L3NwYW4+ICR7dGl0bGVUZXh0IHx8IFwiQ+G6o25oIGLDoW8gSOG7hyB0aOG7kW5nXCJ9XHJcbiAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgJHtjbG9zZUJ0bkh0bWx9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDI0cHg7IGNvbG9yOiAjMWUyOTNiOyBmb250LXNpemU6IDE2cHg7IGxpbmUtaGVpZ2h0OiAxLjU7XCI+XHJcbiAgICAgICAgICAke21lc3NhZ2VUZXh0fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJlY2hlY2stYWN0aW9uLWNvbnRhaW5lclwiIHN0eWxlPVwicGFkZGluZzogMCAyNHB4IDI0cHg7IGRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICAgIFxyXG4gICAgLy8gxJDDs25nIGtoaSBjbGljayBYIGhv4bq3YyByYSBuZ2/DoGkgbuG7gW5cclxuICAgIHdyYXBwZXIub25jbGljayA9IChlKSA9PiB7XHJcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gd3JhcHBlcikge1xyXG4gICAgICAgIHdyYXBwZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgZGlzbWlzc2VkUnVsZXMuYWRkKHJ1bGUuaWQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuY2FyZWNoZWNrLWNsb3NlLWJ0bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgd3JhcHBlci5yZW1vdmUoKTtcclxuICAgICAgZGlzbWlzc2VkUnVsZXMuYWRkKHJ1bGUuaWQpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIGlmIChhY3Rpb25CdG4pIHtcclxuICAgICAgYWN0aW9uQnRuLnN0eWxlLmJhY2tncm91bmQgPSBcIiNlZjQ0NDRcIjtcclxuICAgICAgYWN0aW9uQnRuLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgICB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jYXJlY2hlY2stYWN0aW9uLWNvbnRhaW5lcicpPy5hcHBlbmRDaGlsZChhY3Rpb25CdG4pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG4gIH0gXHJcbiAgZWxzZSBpZiAoY29uZmlnLnRlbXBsYXRlID09PSBcIkJBTk5FUlwiKSB7XHJcbiAgICB3cmFwcGVyLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgd3JhcHBlci5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcbiAgICB3cmFwcGVyLnN0eWxlLnJpZ2h0ID0gXCIwXCI7XHJcbiAgICBpZiAoY29uZmlnLnBvc2l0aW9uID09PSBcIkJPVFRPTV9DRU5URVJcIikge1xyXG4gICAgICB3cmFwcGVyLnN0eWxlLmJvdHRvbSA9IFwiMFwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3JhcHBlci5zdHlsZS50b3AgPSBcIjBcIjtcclxuICAgIH1cclxuICAgIHdyYXBwZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZWY0NDQ0XCI7XHJcbiAgICB3cmFwcGVyLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgd3JhcHBlci5zdHlsZS5wYWRkaW5nID0gXCIxMnB4IDI0cHhcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgd3JhcHBlci5zdHlsZS5hbGlnbkl0ZW1zID0gXCJjZW50ZXJcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xyXG4gICAgd3JhcHBlci5zdHlsZS5nYXAgPSBcIjE2cHhcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuYm94U2hhZG93ID0gXCIwIDRweCA2cHggLTFweCByZ2JhKDAsIDAsIDAsIDAuMSlcIjtcclxuICAgIFxyXG4gICAgd3JhcHBlci5pbm5lckhUTUwgPSBgXHJcbiAgICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDhweDsgZmxleDogMTsgbWF4LXdpZHRoOiAxMjAwcHg7IG1hcmdpbjogMCBhdXRvO1wiPlxyXG4gICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiAyMHB4O1wiPuKaoO+4jzwvc3Bhbj5cclxuICAgICAgICAke3RpdGxlVGV4dCA/IGA8c3Ryb25nPiR7dGl0bGVUZXh0fTo8L3N0cm9uZz5gIDogXCJcIn0gXHJcbiAgICAgICAgPHNwYW4+JHttZXNzYWdlVGV4dH08L3NwYW4+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmVjaGVjay1hY3Rpb24tY29udGFpbmVyXCIgc3R5bGU9XCJtYXJnaW4tbGVmdDogYXV0bzsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxNnB4O1wiPlxyXG4gICAgICAgICAgJHtjbG9zZUJ0bkh0bWx9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICAgIFxyXG4gICAgd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuY2FyZWNoZWNrLWNsb3NlLWJ0bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHdyYXBwZXIucmVtb3ZlKCkpO1xyXG4gICAgaWYgKGFjdGlvbkJ0bikge1xyXG4gICAgICB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jYXJlY2hlY2stYWN0aW9uLWNvbnRhaW5lcicpPy5wcmVwZW5kKGFjdGlvbkJ0bik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgLy8gVE9BU1QgKE3hurdjIMSR4buLbmgpXHJcbiAgICB3cmFwcGVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2VmNDQ0NFwiOyAvLyByZWQtNTAwXHJcbiAgICB3cmFwcGVyLnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xyXG4gICAgd3JhcHBlci5zdHlsZS5wYWRkaW5nID0gXCIxNnB4IDI0cHhcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI4cHhcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuYm94U2hhZG93ID0gXCIwIDEwcHggMTVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4zKVwiO1xyXG4gICAgd3JhcHBlci5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcbiAgICB3cmFwcGVyLnN0eWxlLmZvbnRTaXplID0gXCIxNnB4XCI7XHJcbiAgICB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIHdyYXBwZXIuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCI7XHJcbiAgICB3cmFwcGVyLnN0eWxlLmdhcCA9IFwiMTJweFwiO1xyXG4gICAgd3JhcHBlci5zdHlsZS5hbmltYXRpb24gPSBcImNhcmVjaGVjay1zbGlkZS1pbiAwLjNzIGVhc2Utb3V0XCI7XHJcbiAgICBcclxuICAgIC8vIFTDrG0gaG/hurdjIHThuqFvIENvbnRhaW5lciBjaG8gVG9hc3QgZOG7sWEgdHLDqm4gduG7iyB0csOtXHJcbiAgICBjb25zdCBwb3NpdGlvbiA9IGNvbmZpZy5wb3NpdGlvbiB8fCBcIkJPVFRPTV9SSUdIVFwiO1xyXG4gICAgY29uc3QgY29udGFpbmVySWQgPSBgY2FyZWNoZWNrLXRvYXN0LWNvbnRhaW5lci0ke3Bvc2l0aW9ufWA7XHJcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVySWQpO1xyXG4gICAgXHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBjb250YWluZXIuaWQgPSBjb250YWluZXJJZDtcclxuICAgICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICBjb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgICAvLyBY4bq/cCBjaOG7k25nIHThu6sgZMaw4bubaSBsw6puIGhv4bq3YyB04burIHRyw6puIHh14buRbmcgdMO5eSB24buLIHRyw61cclxuICAgICAgY29udGFpbmVyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSBwb3NpdGlvbi5zdGFydHNXaXRoKFwiQk9UVE9NXCIpID8gXCJjb2x1bW4tcmV2ZXJzZVwiIDogXCJjb2x1bW5cIjtcclxuICAgICAgY29udGFpbmVyLnN0eWxlLmdhcCA9IFwiMTJweFwiO1xyXG4gICAgICBjb250YWluZXIuc3R5bGUuekluZGV4ID0gXCI5OTk5OTlcIjtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IG1hcmdpbiA9IFwiMjBweFwiO1xyXG4gICAgICBpZiAocG9zaXRpb24gPT09IFwiVE9QX0xFRlRcIikgeyBjb250YWluZXIuc3R5bGUudG9wID0gbWFyZ2luOyBjb250YWluZXIuc3R5bGUubGVmdCA9IG1hcmdpbjsgfVxyXG4gICAgICBlbHNlIGlmIChwb3NpdGlvbiA9PT0gXCJUT1BfUklHSFRcIikgeyBjb250YWluZXIuc3R5bGUudG9wID0gbWFyZ2luOyBjb250YWluZXIuc3R5bGUucmlnaHQgPSBtYXJnaW47IH1cclxuICAgICAgZWxzZSBpZiAocG9zaXRpb24gPT09IFwiQk9UVE9NX0xFRlRcIikgeyBjb250YWluZXIuc3R5bGUuYm90dG9tID0gbWFyZ2luOyBjb250YWluZXIuc3R5bGUubGVmdCA9IG1hcmdpbjsgfVxyXG4gICAgICBlbHNlIHsgY29udGFpbmVyLnN0eWxlLmJvdHRvbSA9IG1hcmdpbjsgY29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gbWFyZ2luOyB9XHJcbiAgICAgIFxyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHdyYXBwZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICA8c3BhbiBzdHlsZT1cImZvbnQtc2l6ZTogMjRweDtcIj7imqDvuI88L3NwYW4+IFxyXG4gICAgICA8c3BhbiBzdHlsZT1cImZsZXg6IDE7XCI+JHttZXNzYWdlVGV4dH08L3NwYW4+XHJcbiAgICAgICR7Y2xvc2VCdG5IdG1sfVxyXG4gICAgYDtcclxuICAgIFxyXG4gICAgY29uc3QgY2xvc2VCdG4gPSB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy5jYXJlY2hlY2stY2xvc2UtYnRuJyk7XHJcbiAgICBjb25zdCBkaXNtaXNzSGFuZGxlciA9ICgpID0+IHtcclxuICAgICAgd3JhcHBlci5yZW1vdmUoKTtcclxuICAgICAgcnVsZVN0YXRlcy5zZXQocnVsZS5pZCwgZmFsc2UpO1xyXG4gICAgICBpZiAocnVsZS50cmlnZ2VyTW9kZSAhPT0gXCJFVkVOVF9CQVNFRFwiKSB7XHJcbiAgICAgICAgZGlzbWlzc2VkUnVsZXMuYWRkKHJ1bGUuaWQpOyAvLyBDaOG7iSDEkcOhbmggZOG6pXUgxJHDs25nIHbEqW5oIHZp4buFbiB24bubaSBSRUFMVElNRVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjbG9zZUJ0bj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNtaXNzSGFuZGxlcik7XHJcbiAgICBcclxuICAgIC8vIELhu48gdMOtbmggbsSDbmcgXCJjbGljayByYSBuZ2/DoGkgxJHhu4MgxJHDs25nXCIgxJHhu5FpIHbhu5tpIFRvYXN0IHbDrCBnaeG7nSBuw7MgbMOgIDEgbGlzdCBjaOG7k25nIGzDqm4gbmhhdSxcclxuICAgIC8vIGNsaWNrIHJhIG5nb8OgaSB0aMOsIMSRw7NuZyBuaOG6p20gY8OhYyBUb2FzdCBraMOhYy4gQsOhYyBzxKkgcGjhuqNpIOG6pW4gWCBob+G6t2Mgc+G7rWEgbOG7l2kgxJHhu4MgxJHDs25nLlxyXG4gICAgXHJcbiAgICBpZiAoYWN0aW9uQnRuKSB7XHJcbiAgICAgIGlmIChjbG9zZUJ0biAmJiBjbG9zZUJ0bi5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgY2xvc2VCdG4ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYWN0aW9uQnRuLCBjbG9zZUJ0bik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChhY3Rpb25CdG4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVdhcm5pbmdVSShydWxlSWQ6IHN0cmluZykge1xyXG4gIGNvbnN0IHdhcm5pbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgY2FyZWNoZWNrLXdhcm5pbmctJHtydWxlSWR9YCk7XHJcbiAgaWYgKHdhcm5pbmcpIHtcclxuICAgIHdhcm5pbmcucmVtb3ZlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93RGF0YVNlbGVjdGlvbk1vZGFsKGRhdGFBcnJheTogYW55W10sIHJ1bGU6IFJ1bGUpIHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YUFycmF5KSB8fCBkYXRhQXJyYXkubGVuZ3RoID09PSAwKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gRkVUQ0hfQU5EX1NFTEVDVDogS2jDtG5nIGPDsyBk4buvIGxp4buHdSB0cuG6oyB24buBIGhv4bq3YyBt4bqjbmcgcuG7l25nLmApO1xyXG4gICAgYWxlcnQoYEtow7RuZyB0w6xtIHRo4bqleSBk4buvIGxp4buHdSBuw6BvIHThu6sgQVBJIGNobyBs4buHbmg6ICR7cnVsZS5uYW1lfWApO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbW9kYWxJZCA9IGBjYXJlY2hlY2stc2VsZWN0aW9uLW1vZGFsLSR7cnVsZS5pZH1gO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke21vZGFsSWR9YCkuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XHJcblxyXG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIHdyYXBwZXIuaWQgPSBtb2RhbElkO1xyXG4gIHdyYXBwZXIuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XHJcbiAgd3JhcHBlci5zdHlsZS5pbnNldCA9IFwiMFwiO1xyXG4gIHdyYXBwZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIjtcclxuICB3cmFwcGVyLnN0eWxlLmJhY2tkcm9wRmlsdGVyID0gXCJibHVyKDRweClcIjtcclxuICB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICB3cmFwcGVyLnN0eWxlLmFsaWduSXRlbXMgPSBcImNlbnRlclwiO1xyXG4gIHdyYXBwZXIuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSBcImNlbnRlclwiO1xyXG4gIHdyYXBwZXIuc3R5bGUuekluZGV4ID0gXCIyMTQ3NDgzNjQ3XCI7XHJcbiAgd3JhcHBlci5zdHlsZS5mb250RmFtaWx5ID0gXCJzYW5zLXNlcmlmXCI7XHJcblxyXG4gIGNvbnN0IGNvbmZpZyA9IHJ1bGUuZmV0Y2hBbmRTZWxlY3RDb25maWc7XHJcbiAgaWYgKCFjb25maWcpIHJldHVybjtcclxuXHJcbiAgY29uc3QgY29sdW1ucyA9IGNvbmZpZy5jb2x1bW5zIHx8IFtdO1xyXG4gIGxldCB0YWJsZUhlYWRlcnMgPSBcIlwiO1xyXG4gIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcclxuICAgIHRhYmxlSGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzogMTJweDsgdGV4dC1hbGlnbjogbGVmdDsgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICNlMmU4ZjA7IGJhY2tncm91bmQ6ICNmOGZhZmM7IGNvbG9yOiAjNDc1NTY5OyBmb250LXdlaWdodDogYm9sZDtcIj4ke2NvbC50aXRsZX08L3RoPmA7XHJcbiAgfVxyXG4gIHRhYmxlSGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzogMTJweDsgdGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItYm90dG9tOiAycHggc29saWQgI2UyZThmMDsgYmFja2dyb3VuZDogI2Y4ZmFmYzsgY29sb3I6ICM0NzU1Njk7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPlRoYW8gdMOhYzwvdGg+YDtcclxuXHJcbiAgbGV0IHRhYmxlUm93cyA9IFwiXCI7XHJcbiAgZGF0YUFycmF5LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICBsZXQgcm93Q2VsbHMgPSBcIlwiO1xyXG4gICAgZm9yIChjb25zdCBjb2wgb2YgY29sdW1ucykge1xyXG4gICAgICBjb25zdCByYXdWYWwgPSBleHRyYWN0RnJvbVBhdGgoaXRlbSwgY29sLmtleSk7XHJcbiAgICAgIGxldCB2YWwgPSByYXdWYWwgIT09IHVuZGVmaW5lZCAmJiByYXdWYWwgIT09IG51bGwgPyBTdHJpbmcocmF3VmFsKSA6IFwiXCI7XHJcbiAgICAgIGlmICgvXlxcZHsxMn0kLy50ZXN0KHZhbCkpIHtcclxuICAgICAgICB2YWwgPSBgJHt2YWwuc3Vic3RyaW5nKDYsOCl9LyR7dmFsLnN1YnN0cmluZyg0LDYpfS8ke3ZhbC5zdWJzdHJpbmcoMCw0KX0gJHt2YWwuc3Vic3RyaW5nKDgsMTApfToke3ZhbC5zdWJzdHJpbmcoMTAsMTIpfWA7XHJcbiAgICAgIH0gZWxzZSBpZiAoL15cXGR7OH0kLy50ZXN0KHZhbCkpIHtcclxuICAgICAgICB2YWwgPSBgJHt2YWwuc3Vic3RyaW5nKDYsOCl9LyR7dmFsLnN1YnN0cmluZyg0LDYpfS8ke3ZhbC5zdWJzdHJpbmcoMCw0KX1gO1xyXG4gICAgICB9XHJcbiAgICAgIHJvd0NlbGxzICs9IGA8dGQgc3R5bGU9XCJwYWRkaW5nOiAxMnB4OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2YxZjVmOTsgY29sb3I6ICMxZTI5M2I7XCI+JHt2YWx9PC90ZD5gO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmF3U2VsZWN0VmFsID0gZXh0cmFjdEZyb21QYXRoKGl0ZW0sIGNvbmZpZy5zZWxlY3RGaWVsZCk7XHJcbiAgICBjb25zdCBzZWxlY3RWYWwgPSByYXdTZWxlY3RWYWwgIT09IHVuZGVmaW5lZCAmJiByYXdTZWxlY3RWYWwgIT09IG51bGwgPyByYXdTZWxlY3RWYWwgOiBcIlwiO1xyXG4gICAgcm93Q2VsbHMgKz0gYDx0ZCBzdHlsZT1cInBhZGRpbmc6IDEycHg7IHRleHQtYWxpZ246IGNlbnRlcjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMWY1Zjk7XCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJjYXJlY2hlY2stc2VsZWN0LWJ0blwiIGRhdGEtaW5kZXg9XCIke2luZGV4fVwiIGRhdGEtdmFsPVwiJHtzZWxlY3RWYWx9XCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjMjU2M2ViOyBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgcGFkZGluZzogNnB4IDE2cHg7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGN1cnNvcjogcG9pbnRlcjsgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzO1wiPkNo4buNbjwvYnV0dG9uPlxyXG4gICAgPC90ZD5gO1xyXG4gICAgdGFibGVSb3dzICs9IGA8dHIgc3R5bGU9XCJ0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMnM7XCIgb25tb3VzZW92ZXI9XCJ0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvcj0nI2YxZjVmOSdcIiBvbm1vdXNlb3V0PVwidGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9J3RyYW5zcGFyZW50J1wiPiR7cm93Q2VsbHN9PC90cj5gO1xyXG4gIH0pO1xyXG5cclxuICB3cmFwcGVyLmlubmVySFRNTCA9IGBcclxuICAgIDxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogMTJweDsgYm94LXNoYWRvdzogMCAyNXB4IDUwcHggLTEycHggcmdiYSgwLDAsMCwwLjI1KTsgd2lkdGg6IDkwJTsgbWF4LXdpZHRoOiA4MDBweDsgbWF4LWhlaWdodDogOTB2aDsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgb3ZlcmZsb3c6IGhpZGRlbjsgYW5pbWF0aW9uOiBjYXJlY2hlY2stc2xpZGUtaW4gMC4zcyBlYXNlLW91dDtcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6ICMyNTYzZWI7IGNvbG9yOiB3aGl0ZTsgcGFkZGluZzogMTZweCAyMHB4OyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCI+XHJcbiAgICAgICAgPGgyIHN0eWxlPVwibWFyZ2luOiAwOyBmb250LXNpemU6IDE4cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBkaXNwbGF5OiBmbGV4OyBnYXA6IDhweDsgYWxpZ24taXRlbXM6IGNlbnRlcjtcIj5cclxuICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZm9udC1zaXplOiAyNHB4O1wiPvCfk4s8L3NwYW4+ICR7Y29uZmlnLm1vZGFsVGl0bGUgfHwgJ1Z1aSBsw7JuZyBjaOG7jW4gbeG7mXQgYuG6o24gZ2hpJ31cclxuICAgICAgICA8L2gyPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJjYXJlY2hlY2stY2xvc2UtYnRuXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOm5vbmU7Ym9yZGVyOm5vbmU7Y29sb3I6aW5oZXJpdDtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MjBweDtvcGFjaXR5OjAuODtwYWRkaW5nOjA7bGluZS1oZWlnaHQ6MTtcIiB0aXRsZT1cIsSQw7NuZ1wiPuKclTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBzdHlsZT1cInBhZGRpbmc6IDA7IGZsZXg6IDE7IG92ZXJmbG93OiBhdXRvO1wiPlxyXG4gICAgICAgIDx0YWJsZSBzdHlsZT1cIndpZHRoOiAxMDAlOyBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOyBmb250LXNpemU6IDE0cHg7XCI+XHJcbiAgICAgICAgICA8dGhlYWQ+PHRyPiR7dGFibGVIZWFkZXJzfTwvdHI+PC90aGVhZD5cclxuICAgICAgICAgIDx0Ym9keT4ke3RhYmxlUm93c308L3Rib2R5PlxyXG4gICAgICAgIDwvdGFibGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYDtcclxuXHJcbiAgd3JhcHBlci5xdWVyeVNlbGVjdG9yKCcuY2FyZWNoZWNrLWNsb3NlLWJ0bicpPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHdyYXBwZXIucmVtb3ZlKCkpO1xyXG5cclxuICB3cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJlY2hlY2stc2VsZWN0LWJ0bicpLmZvckVhY2goYnRuID0+IHtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIC8vIExVw5ROIExVw5ROIHjDs2EgbW9kYWwgbmdheSBs4bqtcCB04bupYyDEkeG7gyBraMO0bmcgYuG7iyBr4bq5dCAoQuG6pXQga+G7gyB0csaw4budbmcgaOG7o3AgbsOgbylcclxuICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY29udGFpbnMod3JhcHBlcikpIHtcclxuICAgICAgICB3cmFwcGVyLnJlbW92ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke21vZGFsSWR9YCkuZm9yRWFjaChlbCA9PiBlbC5yZW1vdmUoKSk7XHJcblxyXG4gICAgICBjb25zdCB0YXJnZXRWYWwgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmdldEF0dHJpYnV0ZSgnZGF0YS12YWwnKTtcclxuICAgICAgXHJcbiAgICAgIC8vIE7hur91IGPDsyDEkcOtY2ggxJHhur9uIHbDoCBjw7MgZ2nDoSB0cuG7iyB0aMOsIG3hu5tpIMSRaeG7gW4gKG7hur91IGdpw6EgdHLhu4sgcuG7l25nIHThu6ljIGzDoCBi4buPIHF1YSBraMO0bmcgxJFp4buBbilcclxuICAgICAgaWYgKHJ1bGUudGFyZ2V0U2VsZWN0b3IgJiYgdGFyZ2V0VmFsICYmIHRhcmdldFZhbC50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY29uc3QgdGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJ1bGUudGFyZ2V0U2VsZWN0b3IpIGFzIEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICAgICAgICBpZiAodGFyZ2V0RWwpIHtcclxuICAgICAgICAgICAgdGFyZ2V0RWwudmFsdWUgPSB0YXJnZXRWYWw7XHJcbiAgICAgICAgICAgIC8vIELhuq9uIHPhu7Ega2nhu4duIGNoYW5nZS9pbnB1dCDEkeG7gyBISVMgZ2hpIG5o4bqtblxyXG4gICAgICAgICAgICB0YXJnZXRFbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImNoYW5nZVwiLCB7IGJ1YmJsZXM6IHRydWUgfSkpO1xyXG4gICAgICAgICAgICB0YXJnZXRFbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHsgYnViYmxlczogdHJ1ZSB9KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBC4bqvbiBjdXN0b20gZXZlbnQgY2hvIGNo4bqvYyDEg25cclxuICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiQ0FSRUNIRUNLX1RSSUdHRVJfSlFVRVJZX0NIQU5HRVwiLCB7XHJcbiAgICAgICAgICAgICAgZGV0YWlsOiB7IHNlbGVjdG9yOiBydWxlLnRhcmdldFNlbGVjdG9yLCB2YWx1ZTogdGFyZ2V0VmFsIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2tdIEZFVENIX0FORF9TRUxFQ1Q6IMSQw6MgxJFp4buBbiBnacOhIHRy4buLIFwiJHt0YXJnZXRWYWx9XCIgdsOgbyBzZWxlY3RvciBcIiR7cnVsZS50YXJnZXRTZWxlY3Rvcn1cImApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW0NhcmVDaGVja10gRkVUQ0hfQU5EX1NFTEVDVDogS2jDtG5nIHTDrG0gdGjhuqV5IMO0IMSRw61jaDogJHtydWxlLnRhcmdldFNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIltDYXJlQ2hlY2tdIEZFVENIX0FORF9TRUxFQ1Q6IEzhu5dpIGtoaSDEkWnhu4FuIGThu68gbGnhu4d1IHbDoG8gZm9ybSBISVM6XCIsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gRkVUQ0hfQU5EX1NFTEVDVDogQuG7jyBxdWEga2jDtG5nIMSRaeG7gW4gZG8gZ2nDoSB0cuG7iyBy4buXbmcgaG/hurdjIGtow7RuZyBjw7MgdGFyZ2V0U2VsZWN0b3IuYCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRyYWN0RnJvbVBhdGgob2JqOiBhbnksIHBhdGg6IHN0cmluZyk6IGFueSB7XHJcbiAgaWYgKCFvYmogfHwgIXBhdGgpIHJldHVybiBvYmo7XHJcbiAgY29uc3QgcGFydHMgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgbGV0IGN1cnJlbnQgPSBvYmo7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgY29uc3QgcGFydCA9IHBhcnRzW2ldO1xyXG4gICAgaWYgKGN1cnJlbnQgPT0gbnVsbCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnQpKSB7XHJcbiAgICAgIC8vIElmIHdlIGhpdCBhbiBhcnJheSwgdGhlIGN1cnJlbnQgcGFydCBuZWVkcyB0byBiZSBleHRyYWN0ZWQgZnJvbSBlYWNoIGl0ZW1cclxuICAgICAgY29uc3QgcmVtYWluaW5nUGF0aCA9IHBhcnRzLnNsaWNlKGkpLmpvaW4oJy4nKTtcclxuICAgICAgcmV0dXJuIGN1cnJlbnQubWFwKChpdGVtOiBhbnkpID0+IGV4dHJhY3RGcm9tUGF0aChpdGVtLCByZW1haW5pbmdQYXRoKSkuZmlsdGVyKChpdGVtOiBhbnkpID0+IGl0ZW0gIT0gbnVsbCk7XHJcbiAgICB9XHJcbiAgICBjdXJyZW50ID0gY3VycmVudFtwYXJ0XTtcclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnQ7XHJcbn1cclxuXHJcbmNvbnN0IHN0b3JhZ2VDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XHJcblxyXG5mdW5jdGlvbiBnZXRDb25kaXRpb25EYXRhU3luYyhub2RlOiBDb25kaXRpb25Ob2RlKTogYW55IHtcclxuICBpZiAobm9kZS5kYXRhU291cmNlVHlwZSA9PT0gXCJTVEFUSUNcIikge1xyXG4gICAgcmV0dXJuIG5vZGUudmFsdWUgfHwgXCJcIjtcclxuICB9XHJcbiAgXHJcbiAgaWYgKG5vZGUuZGF0YVNvdXJjZVR5cGUgPT09IFwiTE9DQUxfU1RPUkFHRVwiICYmIG5vZGUubG9jYWxTdG9yYWdlS2V5KSB7XHJcbiAgICBsZXQgZGF0YSA9IHN0b3JhZ2VDYWNoZS5nZXQobm9kZS5sb2NhbFN0b3JhZ2VLZXkpO1xyXG4gICAgaWYgKGRhdGEgJiYgbm9kZS5hcGlSZXNwb25zZVBhdGgpIHtcclxuICAgICAgZGF0YSA9IGV4dHJhY3RGcm9tUGF0aChkYXRhLCBub2RlLmFwaVJlc3BvbnNlUGF0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcblxyXG4gIC8vIEFQSSBpcyBub3Qgc3VwcG9ydGVkIGluIEVWRU5UX0JBU0VEIHJlYWx0aW1lIHN5bmNocm9ub3VzIGV2YWx1YXRpb24geWV0LlxyXG4gIHJldHVybiBcIlwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBldmFsdWF0ZUNvbmRpdGlvblN5bmMobm9kZTogQ29uZGl0aW9uTm9kZSwgcnVsZUlkOiBzdHJpbmcsIHRyaWdnZXJFbD86IEVsZW1lbnQpOiBib29sZWFuIHtcclxuICBsZXQgZWw6IEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICBjb25zdCBzYWZlU2VsZWN0b3IgPSBub2RlLnNlbGVjdG9yID8gbm9kZS5zZWxlY3Rvci5yZXBsYWNlKC9b4oCc4oCdXS9nLCAnXCInKS5yZXBsYWNlKC9b4oCY4oCZXS9nLCBcIidcIikgOiBcIlwiO1xyXG4gIFxyXG4gIHRyeSB7XHJcbiAgICBpZiAoIXNhZmVTZWxlY3RvcikgcmV0dXJuIGZhbHNlOyAvLyBUcsOhbmggbOG7l2kgRE9NRXhjZXB0aW9uIGtoaSBuZ8aw4budaSBkw7luZyDEkeG7gyB0cuG7kW5nIHNlbGVjdG9yXHJcblxyXG4gICAgaWYgKHNhZmVTZWxlY3RvciA9PT0gXCJ7e1ZBTFVFfX1cIikge1xyXG4gICAgICBpZiAodHJpZ2dlckVsKSB7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gdHJpZ2dlckVsLmNsb3Nlc3QoJ3RyJykgfHwgdHJpZ2dlckVsLmNsb3Nlc3QoJy5qcWdyb3cnKSB8fCB0cmlnZ2VyRWwuY2xvc2VzdCgnLnJvdycpO1xyXG4gICAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICAgIGNvbnN0IHRhcmdldERhdGEgPSBnZXRDb25kaXRpb25EYXRhU3luYyhub2RlKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgLy8gWOG7rSBsw70gxJHhurdjIGJp4buHdCBjaG8ganFHcmlkIChGcm96ZW4gY29sdW1ucyBjaGlhIHJvdyBsw6BtIDIgdGjhursgdHIg4bufIDIgYuG6o25nIGtow6FjIG5oYXUpXHJcbiAgICAgICAgICBsZXQgcm93c1RvQ2hlY2s6IEVsZW1lbnRbXSA9IFtyb3ddO1xyXG4gICAgICAgICAgY29uc3QgdHIgPSByb3cgYXMgSFRNTFRhYmxlUm93RWxlbWVudDtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYgKHJvdy5pZCkge1xyXG4gICAgICAgICAgICAvLyDGr3UgdGnDqm4gZMO5bmcgaWQgdsOsIGpxR3JpZCBsdcO0biDEkeG6t3QgaWQgYuG6sW5nIG5oYXUgY2hvIGPhuqMgMiBu4butYSBkw7JuZyAocuG6pXQgY2jDrW5oIHjDoWMpXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgZXNjYXBlZElkID0gQ1NTLmVzY2FwZShyb3cuaWQpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nUm93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtpZD1cIiR7ZXNjYXBlZElkfVwiXWApO1xyXG4gICAgICAgICAgICAgIHJvd3NUb0NoZWNrID0gQXJyYXkuZnJvbShtYXRjaGluZ1Jvd3MpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgICAgICAgfSBlbHNlIGlmICh0ci50YWdOYW1lID09PSBcIlRSXCIpIHtcclxuICAgICAgICAgICAgLy8gROG7sSBwaMOybmc6IG7hur91IGtow7RuZyBjw7MgaWQsIGTDuW5nIHJvd0luZGV4IChuaMawbmcgY8OzIHRo4buDIGzhu4djaCBu4bq/dSBoZWFkZXIgMiBi4bqjbmcga2jDoWMgbmhhdSlcclxuICAgICAgICAgICAgY29uc3Qgcm93SW5kZXggPSB0ci5yb3dJbmRleDtcclxuICAgICAgICAgICAgaWYgKHJvd0luZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICBjb25zdCBhbGxUYWJsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0YWJsZScpO1xyXG4gICAgICAgICAgICAgIGFsbFRhYmxlcy5mb3JFYWNoKHRhYmxlID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0YWJsZS5yb3dzICYmIHRhYmxlLnJvd3MubGVuZ3RoID4gcm93SW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3Qgc2libGluZ1JvdyA9IHRhYmxlLnJvd3Nbcm93SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICBpZiAoc2libGluZ1JvdyAmJiBzaWJsaW5nUm93ICE9PSB0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd3NUb0NoZWNrLnB1c2goc2libGluZ1Jvdyk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBmb3IgKGNvbnN0IHIgb2Ygcm93c1RvQ2hlY2spIHtcclxuICAgICAgICAgICAgLy8gS2nhu4NtIHRyYSBj4bqjIGlucHV0IHZhbHVlIHbDoCB0ZXh0Q29udGVudCBj4bunYSBU4bqkVCBD4bqiIGPDoWMgdGjhursgYsOqbiB0cm9uZyBkw7JuZ1xyXG4gICAgICAgICAgICBjb25zdCB0ZXh0VmFsID0gci50ZXh0Q29udGVudD8udHJpbSgpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0VmFsICYmIHBlcmZvcm1PcGVyYXRvckNoZWNrKG5vZGUsIHRleHRWYWwsIHRhcmdldERhdGEsIHJ1bGVJZCkpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVjayBERUJVR10gUnVsZSAke3J1bGVJZH0gLSBTZWxlY3Rvcjoge3tWQUxVRX19IHwgVmFsdWU6IFwiJHt0ZXh0VmFsfVwiIHwgTWF0Y2g6IFRSVUUgKHJvdyB0ZXh0Q29udGVudClgKTtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgaW5wdXRzID0gci5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dDpub3QoW3R5cGU9XCJjaGVja2JveFwiXSknKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICBjb25zdCB2YWwgPSAoaW5wdXRzW2ldIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlPy50cmltKCk7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbCAmJiBwZXJmb3JtT3BlcmF0b3JDaGVjayhub2RlLCB2YWwsIHRhcmdldERhdGEsIHJ1bGVJZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbQ2FyZUNoZWNrIERFQlVHXSBSdWxlICR7cnVsZUlkfSAtIFNlbGVjdG9yOiB7e1ZBTFVFfX0gfCBWYWx1ZTogXCIke3ZhbH1cIiB8IE1hdGNoOiBUUlVFIChpbnB1dCB2YWx1ZSlgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gVGjhu60gY2hlY2sgbOG6oWkgdOG7q25nIMO0ICh0ZC9kaXYpXHJcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gci5xdWVyeVNlbGVjdG9yQWxsKCd0ZCwgZGl2Jyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICBjb25zdCB2YWwgPSBjZWxsc1tpXS50ZXh0Q29udGVudD8udHJpbSgpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbCAmJiBwZXJmb3JtT3BlcmF0b3JDaGVjayhub2RlLCB2YWwsIHRhcmdldERhdGEsIHJ1bGVJZCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbQ2FyZUNoZWNrIERFQlVHXSBSdWxlICR7cnVsZUlkfSAtIFNlbGVjdG9yOiB7e1ZBTFVFfX0gfCBWYWx1ZTogXCIke3ZhbH1cIiB8IE1hdGNoOiBUUlVFIChjZWxsIHRleHRDb250ZW50KWApO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVjayBERUJVR10gUnVsZSAke3J1bGVJZH0gLSBTZWxlY3Rvcjoge3tWQUxVRX19IHwgVGFyZ2V0OiBcIiR7dGFyZ2V0RGF0YX1cIiB8IE1hdGNoOiBGQUxTRSAoQ2hlY2tlZCAke3Jvd3NUb0NoZWNrLmxlbmd0aH0gcm93cylgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2sgREVCVUddIFJ1bGUgJHtydWxlSWR9IC0gU2VsZWN0b3I6IHt7VkFMVUV9fSB8IEzhu5dpOiBLaMO0bmcgdMOsbSB0aOG6pXkgZMOybmcgY2hhICh0cikgY+G7p2EgdHJpZ2dlciFgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2sgREVCVUddIFJ1bGUgJHtydWxlSWR9IC0gU2VsZWN0b3I6IHt7VkFMVUV9fSB8IEzhu5dpOiB0cmlnZ2VyRWwgYuG7iyBudWxsIWApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2FmZVNlbGVjdG9yLnN0YXJ0c1dpdGgoXCJ7e1NUT1JBR0U6XCIpICYmIHNhZmVTZWxlY3Rvci5lbmRzV2l0aChcIn19XCIpKSB7XHJcbiAgICAgIGNvbnN0IGZ1bGxQYXRoID0gc2FmZVNlbGVjdG9yLnN1YnN0cmluZygxMCwgc2FmZVNlbGVjdG9yLmxlbmd0aCAtIDIpLnRyaW0oKTtcclxuICAgICAgY29uc3QgZG90SW5kZXggPSBmdWxsUGF0aC5pbmRleE9mKCcuJyk7XHJcbiAgICAgIGNvbnN0IHJvb3RLZXkgPSBkb3RJbmRleCA+IC0xID8gZnVsbFBhdGguc3Vic3RyaW5nKDAsIGRvdEluZGV4KSA6IGZ1bGxQYXRoO1xyXG4gICAgICBjb25zdCBqc29uUGF0aCA9IGRvdEluZGV4ID4gLTEgPyBmdWxsUGF0aC5zdWJzdHJpbmcoZG90SW5kZXggKyAxKSA6IFwiXCI7XHJcbiAgICAgIFxyXG4gICAgICBsZXQgc3RvcmFnZVZhbCA9IHN0b3JhZ2VDYWNoZS5nZXQocm9vdEtleSk7XHJcbiAgICAgIGlmIChqc29uUGF0aCAmJiBzdG9yYWdlVmFsKSB7XHJcbiAgICAgICAgc3RvcmFnZVZhbCA9IGV4dHJhY3RGcm9tUGF0aChzdG9yYWdlVmFsLCBqc29uUGF0aCk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHRhcmdldERhdGEgPSBnZXRDb25kaXRpb25EYXRhU3luYyhub2RlKTtcclxuICAgICAgY29uc3QgdmFsU3RyID0gdHlwZW9mIHN0b3JhZ2VWYWwgPT09ICdzdHJpbmcnID8gc3RvcmFnZVZhbCA6IEpTT04uc3RyaW5naWZ5KHN0b3JhZ2VWYWwgfHwgXCJcIik7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHBlcmZvcm1PcGVyYXRvckNoZWNrKG5vZGUsIHZhbFN0ciwgdGFyZ2V0RGF0YSwgcnVsZUlkKTtcclxuICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2sgREVCVUddIFJ1bGUgJHtydWxlSWR9IC0gU2VsZWN0b3I6ICR7c2FmZVNlbGVjdG9yfSB8IFN0b3JhZ2VWYWx1ZTogXCIke3ZhbFN0cn1cIiB8IE9wZXJhdG9yOiAke25vZGUub3BlcmF0b3J9IHwgVGFyZ2V0OiBcIiR7dGFyZ2V0RGF0YX1cIiB8IFJlc3VsdDogJHtyZXN1bHR9YCk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRyaWdnZXJFbCkge1xyXG4gICAgICBjb25zdCByb3cgPSB0cmlnZ2VyRWwuY2xvc2VzdCgndHInKSB8fCB0cmlnZ2VyRWwuY2xvc2VzdCgnLnJvdycpIHx8IHRyaWdnZXJFbC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICBpZiAocm93KSB7XHJcbiAgICAgICAgZWwgPSByb3cucXVlcnlTZWxlY3RvcihzYWZlU2VsZWN0b3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIWVsKSB7XHJcbiAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzYWZlU2VsZWN0b3IpO1xyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoYFtDYXJlQ2hlY2tdIEludmFsaWQgc2VsZWN0b3IgaW4gY29uZGl0aW9uIGZvciBydWxlICR7cnVsZUlkfTogJHtub2RlLnNlbGVjdG9yfWAsIGUpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBpZiAoIWVsKSB7XHJcbiAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVjayBERUJVR10gUnVsZSAke3J1bGVJZH06IEtow7RuZyB0w6xtIHRo4bqleSBwaOG6p24gdOG7rSBjaG8gc2VsZWN0b3IgJHtzYWZlU2VsZWN0b3J9YCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBsZXQgdmFsdWUgPSBcIlwiO1xyXG4gIGlmICgoZWwgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZSA9PT0gXCJjaGVja2JveFwiIHx8IChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS50eXBlID09PSBcInJhZGlvXCIpIHtcclxuICAgIHZhbHVlID0gKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQgPyBcInRydWVcIiA6IFwiZmFsc2VcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgdmFsdWUgPSAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU/LnRyaW0oKSB8fCBlbC50ZXh0Q29udGVudD8udHJpbSgpIHx8IFwiXCI7XHJcbiAgfVxyXG4gIGNvbnN0IHRhcmdldERhdGEgPSBnZXRDb25kaXRpb25EYXRhU3luYyhub2RlKTtcclxuICBcclxuICBjb25zdCByZXN1bHQgPSBwZXJmb3JtT3BlcmF0b3JDaGVjayhub2RlLCB2YWx1ZSwgdGFyZ2V0RGF0YSwgcnVsZUlkKTtcclxuICBjb25zb2xlLmxvZyhgW0NhcmVDaGVjayBERUJVR10gUnVsZSAke3J1bGVJZH0gLSBTZWxlY3RvcjogJHtzYWZlU2VsZWN0b3J9IHwgVmFsdWU6IFwiJHt2YWx1ZX1cIiB8IE9wZXJhdG9yOiAke25vZGUub3BlcmF0b3J9IHwgVGFyZ2V0OiBcIiR7dGFyZ2V0RGF0YX1cIiB8IFJlc3VsdDogJHtyZXN1bHR9YCk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybU9wZXJhdG9yQ2hlY2sobm9kZTogQ29uZGl0aW9uTm9kZSwgdmFsdWU6IHN0cmluZywgdGFyZ2V0RGF0YTogYW55LCBydWxlSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gIGlmIChub2RlLm9wZXJhdG9yID09PSBcIklOX0FSUkFZXCIgfHwgbm9kZS5vcGVyYXRvciA9PT0gXCJOT1RfSU5fQVJSQVlcIikge1xyXG4gICAgbGV0IGFycjogYW55W10gPSBbXTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldERhdGEpKSB7XHJcbiAgICAgIGFyciA9IHRhcmdldERhdGE7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXREYXRhID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgIGFyciA9IHRhcmdldERhdGEuc3BsaXQoXCIsXCIpLm1hcChzID0+IHMudHJpbSgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gU28gc8OhbmggbeG6o25nXHJcbiAgICBjb25zdCB2YWxTdHJpbmcgPSBTdHJpbmcodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCBpc0luQXJyYXkgPSBhcnIuc29tZShpdGVtID0+IFN0cmluZyhpdGVtKS50b0xvd2VyQ2FzZSgpID09PSB2YWxTdHJpbmcpO1xyXG4gICAgXHJcbiAgICBpZiAobm9kZS5vcGVyYXRvciA9PT0gXCJJTl9BUlJBWVwiKSB7XHJcbiAgICAgIGlmIChpc0luQXJyYXkpIHJ1bGVPZmZlbmRpbmdWYWx1ZXMuc2V0KHJ1bGVJZCwgdmFsdWUpO1xyXG4gICAgICByZXR1cm4gaXNJbkFycmF5O1xyXG4gICAgfVxyXG4gICAgaWYgKG5vZGUub3BlcmF0b3IgPT09IFwiTk9UX0lOX0FSUkFZXCIpIHtcclxuICAgICAgaWYgKCFpc0luQXJyYXkpIHJ1bGVPZmZlbmRpbmdWYWx1ZXMuc2V0KHJ1bGVJZCwgdmFsdWUpO1xyXG4gICAgICByZXR1cm4gIWlzSW5BcnJheTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHRhcmdldFZhbCA9IFN0cmluZyh0YXJnZXREYXRhIHx8IFwiXCIpLnRyaW0oKTtcclxuICBjb25zdCB0YXJnZXROdW0gPSBwYXJzZUZsb2F0KHRhcmdldFZhbCkgfHwgMDtcclxuICBjb25zdCB2YWxOdW0gPSBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xyXG5cclxuICBsZXQgaXNNYXRjaGVkID0gZmFsc2U7XHJcbiAgc3dpdGNoIChub2RlLm9wZXJhdG9yKSB7XHJcbiAgICBjYXNlIFwiPT1cIjogaXNNYXRjaGVkID0gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gdGFyZ2V0VmFsLnRvTG93ZXJDYXNlKCk7IGJyZWFrO1xyXG4gICAgY2FzZSBcIiE9XCI6IGlzTWF0Y2hlZCA9IHZhbHVlLnRvTG93ZXJDYXNlKCkgIT09IHRhcmdldFZhbC50b0xvd2VyQ2FzZSgpOyBicmVhaztcclxuICAgIGNhc2UgXCJDT05UQUlOU1wiOiBpc01hdGNoZWQgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHRhcmdldFZhbC50b0xvd2VyQ2FzZSgpKTsgYnJlYWs7XHJcbiAgICBjYXNlIFwiTk9UX0NPTlRBSU5TXCI6IGlzTWF0Y2hlZCA9ICF2YWx1ZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHRhcmdldFZhbC50b0xvd2VyQ2FzZSgpKTsgYnJlYWs7XHJcbiAgICBjYXNlIFwiSVNfRU1QVFlcIjogaXNNYXRjaGVkID0gIXZhbHVlOyBicmVhaztcclxuICAgIGNhc2UgXCJJU19OT1RfRU1QVFlcIjogaXNNYXRjaGVkID0gISF2YWx1ZTsgYnJlYWs7XHJcbiAgICBjYXNlIFwiTEVOR1RIX0VRVUFMU1wiOiBpc01hdGNoZWQgPSB2YWx1ZS5sZW5ndGggPT09IChwYXJzZUludCh0YXJnZXRWYWwsIDEwKSB8fCAwKTsgYnJlYWs7XHJcbiAgICBjYXNlIFwiTEVOR1RIX05PVF9FUVVBTFNcIjogaXNNYXRjaGVkID0gdmFsdWUubGVuZ3RoICE9PSAocGFyc2VJbnQodGFyZ2V0VmFsLCAxMCkgfHwgMCk7IGJyZWFrO1xyXG4gICAgY2FzZSBcIkxFTkdUSF9NSU5cIjogaXNNYXRjaGVkID0gdmFsdWUubGVuZ3RoID49IChwYXJzZUludCh0YXJnZXRWYWwsIDEwKSB8fCAwKTsgYnJlYWs7XHJcbiAgICBjYXNlIFwiPlwiOiBpc01hdGNoZWQgPSB2YWxOdW0gPiB0YXJnZXROdW07IGJyZWFrO1xyXG4gICAgY2FzZSBcIjxcIjogaXNNYXRjaGVkID0gdmFsTnVtIDwgdGFyZ2V0TnVtOyBicmVhaztcclxuICAgIGNhc2UgXCI+PVwiOiBpc01hdGNoZWQgPSB2YWxOdW0gPj0gdGFyZ2V0TnVtOyBicmVhaztcclxuICAgIGNhc2UgXCI8PVwiOiBpc01hdGNoZWQgPSB2YWxOdW0gPD0gdGFyZ2V0TnVtOyBicmVhaztcclxuICB9XHJcblxyXG4gIGlmIChpc01hdGNoZWQpIHtcclxuICAgIHJ1bGVPZmZlbmRpbmdWYWx1ZXMuc2V0KHJ1bGVJZCwgdmFsdWUpO1xyXG4gIH1cclxuICByZXR1cm4gaXNNYXRjaGVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBldmFsdWF0ZUdyb3VwU3luYyhncm91cDogTG9naWNHcm91cCwgcnVsZUlkOiBzdHJpbmcsIHRyaWdnZXJFbD86IEVsZW1lbnQpOiBib29sZWFuIHtcclxuICBpZiAoZ3JvdXAubG9naWNhbE9wID09PSBcIkFORFwiKSB7XHJcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGdyb3VwLmNvbmRpdGlvbnMpIHtcclxuICAgICAgY29uc3QgaXNUcnVlID0gY2hpbGQudHlwZSA9PT0gXCJDT05ESVRJT05cIiA/IGV2YWx1YXRlQ29uZGl0aW9uU3luYyhjaGlsZCBhcyBDb25kaXRpb25Ob2RlLCBydWxlSWQsIHRyaWdnZXJFbCkgOiBldmFsdWF0ZUdyb3VwU3luYyhjaGlsZCBhcyBMb2dpY0dyb3VwLCBydWxlSWQsIHRyaWdnZXJFbCk7XHJcbiAgICAgIGlmICghaXNUcnVlKSByZXR1cm4gZmFsc2U7IC8vIEZhaWwgZmFzdCBmb3IgQU5EXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTsgLy8gQWxsIHRydWVcclxuICB9IGVsc2UgeyAvLyBPUlxyXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBncm91cC5jb25kaXRpb25zKSB7XHJcbiAgICAgIGNvbnN0IGlzVHJ1ZSA9IGNoaWxkLnR5cGUgPT09IFwiQ09ORElUSU9OXCIgPyBldmFsdWF0ZUNvbmRpdGlvblN5bmMoY2hpbGQgYXMgQ29uZGl0aW9uTm9kZSwgcnVsZUlkLCB0cmlnZ2VyRWwpIDogZXZhbHVhdGVHcm91cFN5bmMoY2hpbGQgYXMgTG9naWNHcm91cCwgcnVsZUlkLCB0cmlnZ2VyRWwpO1xyXG4gICAgICBpZiAoaXNUcnVlKSByZXR1cm4gdHJ1ZTsgLy8gU3VjY2VlZCBmYXN0IGZvciBPUlxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlOyAvLyBBbGwgZmFsc2VcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5RXJyb3JWaXN1YWxzKGVsOiBFbGVtZW50LCBydWxlSWQ6IHN0cmluZyA9IFwidHJ1ZVwiKSB7XHJcbiAgLy8gTuG6v3UgZWwgbMOgIG3hu5l0IGNoZWNrYm94IG7hurFtIHRyb25nIDEgcm93IChi4bqjbmcpLCB0YSBuw6puIHTDtCDEkeG7jyBD4bqiIETDkk5HIHRoYXkgdsOsIGNo4buJIHTDtCBt4buXaSBjw6FpIGNoZWNrYm94IGLDqSB4w611XHJcbiAgbGV0IHRhcmdldEVsID0gZWw7XHJcbiAgaWYgKGVsLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICBjb25zdCB0ciA9IGVsLmNsb3Nlc3QoJ3RyJykgfHwgZWwuY2xvc2VzdCgnLmpxZ3JvdycpO1xyXG4gICAgaWYgKHRyKSB0YXJnZXRFbCA9IHRyO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRhcmdldEVsLmhhc0F0dHJpYnV0ZShFUlJPUl9BVFRSKSAmJiB0YXJnZXRFbC5nZXRBdHRyaWJ1dGUoRVJST1JfQVRUUikgPT09IHJ1bGVJZCkgcmV0dXJuO1xyXG4gIHRhcmdldEVsLnNldEF0dHJpYnV0ZShFUlJPUl9BVFRSLCBydWxlSWQpO1xyXG4gIFxyXG4gIGNvbnN0IGh0bWxFbCA9IHRhcmdldEVsIGFzIEhUTUxFbGVtZW50O1xyXG4gIFxyXG4gIC8vIEzGsHUgc3R5bGUgY8WpXHJcbiAgaHRtbEVsLmRhdGFzZXQub2xkT3V0bGluZSA9IGh0bWxFbC5zdHlsZS5vdXRsaW5lIHx8IFwiXCI7XHJcbiAgaHRtbEVsLmRhdGFzZXQub2xkT3V0bGluZU9mZnNldCA9IGh0bWxFbC5zdHlsZS5vdXRsaW5lT2Zmc2V0IHx8IFwiXCI7XHJcblxyXG4gIC8vIMOBcCBk4bulbmcgc3R5bGUgbOG7l2kgKENo4buJIGLDtGkgdmnhu4FuIMSR4buPLCBnaeG7ryBuZ3V5w6puIG3DoHUgbuG7gW4gdsOgbmcgY+G7p2EgZMOybmcpXHJcbiAgLy8gRMO5bmcgb3V0bGluZSB0aGF5IHbDrCBib3JkZXIgdsOsIG91dGxpbmUgaG/huqF0IMSR4buZbmcgY+G7sWMgdOG7kXQgdHLDqm4gdGjhursgPHRyPiBtw6Aga2jDtG5nIGzDoG0gbOG7h2NoIGZvcm0gYuG6o25nXHJcbiAgaHRtbEVsLnN0eWxlLnNldFByb3BlcnR5KFwib3V0bGluZVwiLCBcIjJweCBzb2xpZCByZWRcIiwgXCJpbXBvcnRhbnRcIik7XHJcbiAgaHRtbEVsLnN0eWxlLnNldFByb3BlcnR5KFwib3V0bGluZS1vZmZzZXRcIiwgXCItMXB4XCIsIFwiaW1wb3J0YW50XCIpO1xyXG4gIFxyXG4gIC8vIEtow7RuZyBkw7luZyB0b29sdGlwIGPhu6VjIGLhu5kgbuG7r2EgdsOsIMSRw6MgY8OzIFRvYXN0IOG7nyBnw7NjXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUVycm9yVmlzdWFscyhlbDogRWxlbWVudCkge1xyXG4gIGxldCB0YXJnZXRFbCA9IGVsO1xyXG4gIGlmIChlbC50YWdOYW1lID09PSBcIklOUFVUXCIgJiYgKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnR5cGUgPT09IFwiY2hlY2tib3hcIikge1xyXG4gICAgY29uc3QgdHIgPSBlbC5jbG9zZXN0KCd0cicpIHx8IGVsLmNsb3Nlc3QoJy5qcWdyb3cnKTtcclxuICAgIGlmICh0cikgdGFyZ2V0RWwgPSB0cjtcclxuICB9XHJcblxyXG4gIGlmICghdGFyZ2V0RWwuaGFzQXR0cmlidXRlKEVSUk9SX0FUVFIpKSByZXR1cm47XHJcbiAgXHJcbiAgY29uc3QgaHRtbEVsID0gdGFyZ2V0RWwgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgaHRtbEVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwib3V0bGluZVwiKTtcclxuICBodG1sRWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJvdXRsaW5lLW9mZnNldFwiKTtcclxuICBcclxuICAvLyBUcuG7iyBk4bupdCDEkWnhu4NtIGPEg24gYuG7h25oIG3hu50gY2jhu68gKHdoaXRlIHRleHQpIGRvIGLDs25nIG1hIGPFqSDEkeG7gyBs4bqhaVxyXG4gIGh0bWxFbC5zdHlsZS5zZXRQcm9wZXJ0eShcImNvbG9yXCIsIFwiYmxhY2tcIiwgXCJpbXBvcnRhbnRcIik7XHJcbiAgXHJcbiAgaWYgKGh0bWxFbC5kYXRhc2V0Lm9sZE91dGxpbmUpIHtcclxuICAgIGh0bWxFbC5zdHlsZS5vdXRsaW5lID0gaHRtbEVsLmRhdGFzZXQub2xkT3V0bGluZTtcclxuICB9XHJcbiAgaWYgKGh0bWxFbC5kYXRhc2V0Lm9sZE91dGxpbmVPZmZzZXQpIHtcclxuICAgIGh0bWxFbC5zdHlsZS5vdXRsaW5lT2Zmc2V0ID0gaHRtbEVsLmRhdGFzZXQub2xkT3V0bGluZU9mZnNldDtcclxuICB9XHJcbiAgXHJcbiAgZWwucmVtb3ZlQXR0cmlidXRlKEVSUk9SX0FUVFIpO1xyXG59XHJcblxyXG4vLyBM4bqleSBkYW5oIHPDoWNoIGx14bqtdCB2w6AgY2jhuqF5IGtp4buDbSB0cmEgxJHhu4cgcXV5XHJcbmxldCBpc0V2YWx1YXRpbmcgPSBmYWxzZTtcclxubGV0IGVuZ2luZUludGVydmFsOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRJbnRlcnZhbD47XHJcbmxldCBjYWNoZWRSdWxlczogUnVsZVtdID0gW107XHJcblxyXG4vLyBUaGVvIGTDtWkgdGhheSDEkeG7lWkgdOG7qyBzdG9yYWdlIMSR4buDIGPhuq1wIG5o4bqtdCBjYWNoZVxyXG5pZiAodHlwZW9mIGNocm9tZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjaHJvbWUuc3RvcmFnZSkge1xyXG4gIGNocm9tZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcigoY2hhbmdlcywgYXJlYSkgPT4ge1xyXG4gICAgaWYgKGFyZWEgPT09IFwibG9jYWxcIikge1xyXG4gICAgICBpZiAoY2hhbmdlc1tSVUxFU19TVE9SQUdFX0tFWV0pIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY2FjaGVkUnVsZXMgPSBKU09OLnBhcnNlKGNoYW5nZXNbUlVMRVNfU1RPUkFHRV9LRVldLm5ld1ZhbHVlKSB8fCBbXTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICBjYWNoZWRSdWxlcyA9IGNoYW5nZXNbUlVMRVNfU1RPUkFHRV9LRVldLm5ld1ZhbHVlIHx8IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBLaGkgcnVsZXMgxJHhu5VpLCBxdcOpdCBs4bqhaSBjw6FjIGtleSBj4bqnbiBjYWNoZSB2w6AgZmV0Y2ggYuG7lSBzdW5nXHJcbiAgICAgICAgY29uc3QgbmV3S2V5cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICAgIGNvbnN0IGV4dHJhY3ROZXdLZXlzID0gKGdyb3VwOiBMb2dpY0dyb3VwKSA9PiB7XHJcbiAgICAgICAgICBncm91cC5jb25kaXRpb25zLmZvckVhY2goYyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjLnR5cGUgPT09IFwiQ09ORElUSU9OXCIpIHtcclxuICAgICAgICAgICAgICBjb25zdCBub2RlID0gYyBhcyBDb25kaXRpb25Ob2RlO1xyXG4gICAgICAgICAgICAgIGlmIChub2RlLmRhdGFTb3VyY2VUeXBlID09PSBcIkxPQ0FMX1NUT1JBR0VcIiAmJiBub2RlLmxvY2FsU3RvcmFnZUtleSkge1xyXG4gICAgICAgICAgICAgICAgbmV3S2V5cy5hZGQobm9kZS5sb2NhbFN0b3JhZ2VLZXkpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAobm9kZS5zZWxlY3RvciAmJiBub2RlLnNlbGVjdG9yLnN0YXJ0c1dpdGgoXCJ7e1NUT1JBR0U6XCIpICYmIG5vZGUuc2VsZWN0b3IuZW5kc1dpdGgoXCJ9fVwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnVsbFBhdGggPSBub2RlLnNlbGVjdG9yLnN1YnN0cmluZygxMCwgbm9kZS5zZWxlY3Rvci5sZW5ndGggLSAyKS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb290S2V5ID0gZnVsbFBhdGguc3BsaXQoJy4nKVswXTtcclxuICAgICAgICAgICAgICAgIGlmIChyb290S2V5KSBuZXdLZXlzLmFkZChyb290S2V5KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZXh0cmFjdE5ld0tleXMoYyBhcyBMb2dpY0dyb3VwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjYWNoZWRSdWxlcy5mb3JFYWNoKHIgPT4geyBpZiAoci5sb2dpYykgZXh0cmFjdE5ld0tleXMoci5sb2dpYyk7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIG5ld0tleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFzdG9yYWdlQ2FjaGUuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KGtleSwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICBzdG9yYWdlQ2FjaGUuc2V0KGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIC8vIEx1w7RuIMSR4buTbmcgYuG7mSBk4buvIGxp4buHdSBt4bubaSBuaOG6pXQgdsOgbyBzdG9yYWdlQ2FjaGUgbuG6v3UgbsOzIHRoYXkgxJHhu5VpXHJcbiAgICAgIGZvciAoY29uc3QgW2tleSwgY2hhbmdlXSBvZiBPYmplY3QuZW50cmllcyhjaGFuZ2VzKSkge1xyXG4gICAgICAgIGlmIChrZXkgIT09IFJVTEVTX1NUT1JBR0VfS0VZKSB7XHJcbiAgICAgICAgICBzdG9yYWdlQ2FjaGUuc2V0KGtleSwgY2hhbmdlLm5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVEeW5hbWljVmFsdWVTeW5jKHZhbDogc3RyaW5nLCB0cmlnZ2VyRWw/OiBFbGVtZW50KTogc3RyaW5nIHtcclxuICBpZiAoIXZhbCkgcmV0dXJuIHZhbDtcclxuICBpZiAodmFsLmluY2x1ZGVzKFwie3tTRUxFQ1RPUjpcIikpIHtcclxuICAgIGNvbnN0IG1hdGNoZXMgPSB2YWwubWF0Y2goL1xce1xce1NFTEVDVE9SOihbXnt9XSspXFx9XFx9L2cpO1xyXG4gICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSB7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBtYXRjaC5yZXBsYWNlKFwie3tTRUxFQ1RPUjpcIiwgXCJcIikucmVwbGFjZShcIn19XCIsIFwiXCIpLnRyaW0oKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbGV0IGVsOiBFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgICBpZiAodHJpZ2dlckVsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHRyaWdnZXJFbC5jbG9zZXN0KCd0cicpIHx8IHRyaWdnZXJFbC5jbG9zZXN0KCcucm93JykgfHwgdHJpZ2dlckVsLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChyb3cpIHtcclxuICAgICAgICAgICAgICBlbCA9IHJvdy5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCFlbCkge1xyXG4gICAgICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgZXh0cmFjdGVkID0gZWwgPyAoKGVsIGFzIGFueSkudmFsdWUgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIikudHJpbSgpIDogXCJcIjtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGBbQ2FyZUNoZWNrIERFQlVHXSByZXNvbHZlRHluYW1pY1ZhbHVlU3luYzogU2VsZWN0b3I9XCIke3NlbGVjdG9yfVwiIC0+IEVsZW1lbnQ9YCwgZWwsIGAtPiBFeHRyYWN0ZWQ9XCIke2V4dHJhY3RlZH1cImApO1xyXG4gICAgICAgICAgdmFsID0gdmFsLnNwbGl0KG1hdGNoKS5qb2luKGV4dHJhY3RlZCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgdmFsID0gdmFsLnNwbGl0KG1hdGNoKS5qb2luKFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBpZiAodmFsLmluY2x1ZGVzKFwie3tTVE9SQUdFOlwiKSkge1xyXG4gICAgY29uc3QgbWF0Y2hlcyA9IHZhbC5tYXRjaCgvXFx7XFx7U1RPUkFHRTooW157fV0rKVxcfVxcfS9nKTtcclxuICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xyXG4gICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gbWF0Y2gucmVwbGFjZShcInt7U1RPUkFHRTpcIiwgXCJcIikucmVwbGFjZShcIn19XCIsIFwiXCIpLnRyaW0oKTtcclxuICAgICAgICBjb25zdCBwYXJ0cyA9IGZ1bGxQYXRoLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgZXh0cmFjdGVkID0gXCJcIjtcclxuICAgICAgICBpZiAocGFydHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgcm9vdEtleSA9IHBhcnRzWzBdO1xyXG4gICAgICAgICAgY29uc3QgZGF0YSA9IHN0b3JhZ2VDYWNoZS5nZXQocm9vdEtleSk7XHJcbiAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWxPYmogPSBleHRyYWN0RnJvbVBhdGgoZGF0YSwgcGFydHMuc2xpY2UoMSkuam9pbihcIi5cIikpO1xyXG4gICAgICAgICAgICBleHRyYWN0ZWQgPSB2YWxPYmogIT0gbnVsbCA/IFN0cmluZyh2YWxPYmopIDogXCJcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFsID0gdmFsLnNwbGl0KG1hdGNoKS5qb2luKGV4dHJhY3RlZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHZhbC5pbmNsdWRlcyhcInt7UkVHRVg6XCIpKSB7XHJcbiAgICBjb25zdCBtYXRjaGVzID0gdmFsLm1hdGNoKC9cXHtcXHtSRUdFWDooW159XSspXFx9XFx9L2cpO1xyXG4gICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgZm9yIChjb25zdCBtYXRjaCBvZiBtYXRjaGVzKSB7XHJcbiAgICAgICAgY29uc3QgcmVnZXhTdHIgPSBtYXRjaC5zdWJzdHJpbmcoOCwgbWF0Y2gubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IHJlZ2V4UGFydHMgPSByZWdleFN0ci5tYXRjaCgvXlxcLyguKj8pXFwvKFtnaW1zdXldKikkLyk7XHJcbiAgICAgICAgICBsZXQgcmVnZXg7XHJcbiAgICAgICAgICBpZiAocmVnZXhQYXJ0cykge1xyXG4gICAgICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhQYXJ0c1sxXSwgcmVnZXhQYXJ0c1syXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWdleCA9IG5ldyBSZWdFeHAocmVnZXhTdHIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgYm9keVRleHQgPSBkb2N1bWVudC5ib2R5LmlubmVyVGV4dCB8fCBcIlwiO1xyXG4gICAgICAgICAgY29uc3QgcmVnTWF0Y2ggPSBib2R5VGV4dC5tYXRjaChyZWdleCk7XHJcbiAgICAgICAgICBjb25zdCBleHRyYWN0ZWQgPSByZWdNYXRjaCA/IHJlZ01hdGNoWzFdIHx8IHJlZ01hdGNoWzBdIDogXCJcIjtcclxuICAgICAgICAgIHZhbCA9IHZhbC5zcGxpdChtYXRjaCkuam9pbihleHRyYWN0ZWQpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIHZhbCA9IHZhbC5zcGxpdChtYXRjaCkuam9pbihcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHZhbC5pbmNsdWRlcyhcInt7U0VTU0lPTjpcIikpIHtcclxuICAgIGNvbnN0IG1hdGNoZXMgPSB2YWwubWF0Y2goL1xce1xce1NFU1NJT046KFtee31dKylcXH1cXH0vZyk7XHJcbiAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICBmb3IgKGNvbnN0IG1hdGNoIG9mIG1hdGNoZXMpIHtcclxuICAgICAgICBjb25zdCBmdWxsUGF0aCA9IG1hdGNoLnJlcGxhY2UoXCJ7e1NFU1NJT046XCIsIFwiXCIpLnJlcGxhY2UoXCJ9fVwiLCBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgY29uc3QgcGFydHMgPSBmdWxsUGF0aC5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgbGV0IGV4dHJhY3RlZCA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IHJvb3RLZXkgPSBwYXJ0c1swXTtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiQ0FSRUNIRUNLX1wiICsgcm9vdEtleSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCB2YWxPYmogPSBleHRyYWN0RnJvbVBhdGgoanNvbiwgcGFydHMuc2xpY2UoMSkuam9pbihcIi5cIikpO1xyXG4gICAgICAgICAgICAgICAgICBleHRyYWN0ZWQgPSB2YWxPYmogIT0gbnVsbCA/IFN0cmluZyh2YWxPYmopIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICBleHRyYWN0ZWQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWN0ZWQgPSBkYXRhO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaChlKSB7fVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YWwgPSB2YWwuc3BsaXQobWF0Y2gpLmpvaW4oZXh0cmFjdGVkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdmFsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVSdWxlQW5kVXBkYXRlU3RhdGVTeW5jKHJ1bGU6IFJ1bGUsIHRyaWdnZXJFbD86IEVsZW1lbnQpIHtcclxuICB0cnkge1xyXG4gICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2sgREVCVUddID09PSBC4bquVCDEkOG6plUgxJDDgU5IIEdJw4EgTFXhuqxUOiAke3J1bGUubmFtZX0gKCR7cnVsZS5pZH0pID09PWApO1xyXG4gIFxyXG4gICAgY29uc3QgYWN0aW9uID0gcnVsZS5hY3Rpb25UeXBlIHx8IFwiU0hPV19XQVJOSU5HXCI7XHJcblxyXG4gIGlmIChhY3Rpb24gPT09IFwiQ0xFQVJfU1RPUkFHRVwiKSB7XHJcbiAgICBpZiAocnVsZS5jbGVhclN0b3JhZ2VDb25maWc/LnN0b3JhZ2VLZXkpIHtcclxuICAgICAgc3RvcmFnZS5yZW1vdmUocnVsZS5jbGVhclN0b3JhZ2VDb25maWcuc3RvcmFnZUtleSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBbQ2FyZUNoZWNrXSDEkMOjIHjDs2EgTG9jYWxTdG9yYWdlIGtleTogJHtydWxlLmNsZWFyU3RvcmFnZUNvbmZpZy5zdG9yYWdlS2V5fWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlOyAvLyBLaMO0bmcgYmxvY2sgVUlcclxuICB9XHJcblxyXG4gIGlmIChhY3Rpb24gPT09IFwiU0VUX1ZBTFVFXCIpIHtcclxuICAgIGlmICghcnVsZS5sb2dpYykgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3QgaXNDb25kaXRpb25NZXQgPSBldmFsdWF0ZUdyb3VwU3luYyhydWxlLmxvZ2ljLCBydWxlLmlkLCB0cmlnZ2VyRWwpO1xyXG4gICAgY29uc3QgcHJldmlvdXNTdGF0ZSA9IHJ1bGVTdGF0ZXMuZ2V0KHJ1bGUuaWQpO1xyXG5cclxuICAgIGlmIChpc0NvbmRpdGlvbk1ldCAmJiBwcmV2aW91c1N0YXRlICE9PSB0cnVlKSB7XHJcbiAgICAgIGlmIChydWxlLnRhcmdldFNlbGVjdG9yICYmIHJ1bGUuc2V0VmFsdWVDb25maWc/LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHJ1bGUudGFyZ2V0U2VsZWN0b3IpO1xyXG4gICAgICAgIHRhcmdldEVscy5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgIGlmICgoZWwgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgIT09IHJ1bGUuc2V0VmFsdWVDb25maWchLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHJ1bGUuc2V0VmFsdWVDb25maWchLnZhbHVlO1xyXG4gICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcclxuICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEfhu61pIHPhu7Ega2nhu4duIGNobyBtYWluX3dvcmxkLnRzIMSR4buDIGvDrWNoIGhv4bqhdCBqUXVlcnkgJiBTZWxlY3QyIGPhu6dhIEhJU1xyXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJDQVJFQ0hFQ0tfVFJJR0dFUl9KUVVFUllfQ0hBTkdFXCIsIHtcclxuICAgICAgICAgICAgICBkZXRhaWw6IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBydWxlLnRhcmdldFNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHJ1bGUuc2V0VmFsdWVDb25maWchLnZhbHVlXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1bGVTdGF0ZXMuc2V0KHJ1bGUuaWQsIGlzQ29uZGl0aW9uTWV0KTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmIChhY3Rpb24gPT09IFwiU0FWRV9UT19TVE9SQUdFXCIpIHtcclxuICAgIGNvbnN0IGlzQ29uZGl0aW9uTWV0ID0gcnVsZS5sb2dpYyA/IGV2YWx1YXRlR3JvdXBTeW5jKHJ1bGUubG9naWMsIHJ1bGUuaWQsIHRyaWdnZXJFbCkgOiB0cnVlO1xyXG4gICAgY29uc3QgcHJldmlvdXNTdGF0ZSA9IHJ1bGVTdGF0ZXMuZ2V0KHJ1bGUuaWQpO1xyXG5cclxuICAgIGlmIChpc0NvbmRpdGlvbk1ldCAmJiAocnVsZS50cmlnZ2VyTW9kZSA9PT0gXCJFVkVOVF9CQVNFRFwiIHx8IHByZXZpb3VzU3RhdGUgIT09IHRydWUpKSB7XHJcbiAgICAgIGlmIChydWxlLnRhcmdldFNlbGVjdG9yICYmIHJ1bGUuc2V0VmFsdWVDb25maWc/LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjb25zdCBmaW5hbFZhbHVlID0gcmVzb2x2ZUR5bmFtaWNWYWx1ZVN5bmMocnVsZS5zZXRWYWx1ZUNvbmZpZyEudmFsdWUsIHRyaWdnZXJFbCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGlmIChydWxlLnRhcmdldFNlbGVjdG9yLnN0YXJ0c1dpdGgoXCJTRVNTSU9OOlwiKSkge1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiQ0FSRUNIRUNLX1wiICsgcnVsZS50YXJnZXRTZWxlY3Rvci5zdWJzdHJpbmcoOCkudHJpbSgpLCBmaW5hbFZhbHVlKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiQ0FSRUNIRUNLX1wiICsgcnVsZS50YXJnZXRTZWxlY3Rvci50cmltKCksIGZpbmFsVmFsdWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2sgREVCVUddIFNBVkVfVE9fU1RPUkFHRSBrw61jaCBob+G6oXQgY2hvIGx14bqtdCAke3J1bGUuaWR9LiBMxrB1IGdpw6EgdHLhu4s6IFwiJHtmaW5hbFZhbHVlfVwiIHbDoG8gYmnhur9uIFwiJHtydWxlLnRhcmdldFNlbGVjdG9yfVwiYCk7XHJcbiAgICAgICAgfSBjYXRjaChlKSB7fVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBydWxlU3RhdGVzLnNldChydWxlLmlkLCBpc0NvbmRpdGlvbk1ldCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoYWN0aW9uID09PSBcIkZFVENIX0FQSVwiKSB7XHJcbiAgICBpZiAocnVsZS5hcGlBY3Rpb25Db25maWc/LmFwaVVybCAmJiBydWxlLmFwaUFjdGlvbkNvbmZpZz8uc3RvcmFnZUtleSkge1xyXG4gICAgICBsZXQgZmluYWxVcmwgPSBydWxlLmFwaUFjdGlvbkNvbmZpZy5hcGlVcmw7XHJcbiAgICAgIGxldCBwYXJhbVZhbHVlID0gXCJcIjtcclxuICAgICAgLy8gTuG7kWkgdGhhbSBz4buRIG7hur91IGPDs1xyXG4gICAgICBpZiAocnVsZS5hcGlBY3Rpb25Db25maWcucGFyYW1TZWxlY3Rvcikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBwYXJhbUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihydWxlLmFwaUFjdGlvbkNvbmZpZy5wYXJhbVNlbGVjdG9yKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgICAgaWYgKHBhcmFtRWwgJiYgcGFyYW1FbC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwYXJhbVZhbHVlID0gcGFyYW1FbC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBYw7NhIGtob+G6o25nIHRy4bqvbmcg4bufIGPDoWMgdHLGsOG7nW5nIG3DoyAoxJHhurdjIGJp4buHdCBsw6AgQkhZVClcclxuICAgICAgICAgICAgaWYgKHJ1bGUuYXBpQWN0aW9uQ29uZmlnLnBhcmFtU2VsZWN0b3IudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYmh5dCcpIHx8IGZpbmFsVXJsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2JoeXQnKSkge1xyXG4gICAgICAgICAgICAgIHBhcmFtVmFsdWUgPSBwYXJhbVZhbHVlLnJlcGxhY2UoL1xccysvZywgJycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZmluYWxVcmwuaW5jbHVkZXMocnVsZS5hcGlBY3Rpb25Db25maWcucGFyYW1TZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICBmaW5hbFVybCA9IGZpbmFsVXJsLnJlcGxhY2UocnVsZS5hcGlBY3Rpb25Db25maWcucGFyYW1TZWxlY3RvciwgcGFyYW1WYWx1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZmluYWxVcmwgKz0gcGFyYW1WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtDYXJlQ2hlY2tdIEludmFsaWQgcGFyYW1TZWxlY3RvciBpbiBBUEkgY29uZmlnOiAke3J1bGUuYXBpQWN0aW9uQ29uZmlnLnBhcmFtU2VsZWN0b3J9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gxJBhbmcgZ+G7jWkgQVBJOiAke2ZpbmFsVXJsfWApO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIC8vIFThu7EgxJHhu5luZyB4w7NhIGThu68gbGnhu4d1IGPFqSB0cm9uZyBTdG9yYWdlIHRyxrDhu5tjIGtoaSBn4buNaSBBUEkgbeG7m2kgxJHhu4MgdHLDoW5oIGLhu4sgcsOyIHLhu4kgZOG7ryBsaeG7h3UgY+G7p2EgdXNlciBjxalcclxuICAgICAgICBjb25zdCBrZXlUb1JlbW92ZSA9IHJ1bGUuYXBpQWN0aW9uQ29uZmlnLmNsZWFyU3RvcmFnZUtleUJlZm9yZUZldGNoICE9PSB1bmRlZmluZWQgJiYgcnVsZS5hcGlBY3Rpb25Db25maWcuY2xlYXJTdG9yYWdlS2V5QmVmb3JlRmV0Y2gudHJpbSgpICE9PSBcIlwiID8gcnVsZS5hcGlBY3Rpb25Db25maWcuY2xlYXJTdG9yYWdlS2V5QmVmb3JlRmV0Y2ggOiBydWxlLmFwaUFjdGlvbkNvbmZpZy5zdG9yYWdlS2V5O1xyXG4gICAgICAgIHN0b3JhZ2UucmVtb3ZlKGtleVRvUmVtb3ZlKTtcclxuICAgICAgICBzdG9yYWdlLnJlbW92ZShydWxlLmFwaUFjdGlvbkNvbmZpZy5zdG9yYWdlS2V5ICsgXCJfcGFyYW1cIik7IC8vIFjDs2EgcGFyYW0gY8WpXHJcbiAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2tdIMSQw6MgeMOzYSBMb2NhbFN0b3JhZ2Uga2V5IFske2tleVRvUmVtb3ZlfV0gdHLGsOG7m2Mga2hpIGfhu41pIEFQSSBt4bubaWApO1xyXG5cclxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IFxyXG4gICAgICAgICAgYWN0aW9uOiBcIlBST1hZX0ZFVENIXCIsIFxyXG4gICAgICAgICAgdXJsOiBmaW5hbFVybCxcclxuICAgICAgICAgIHNhdmVUb1N0b3JhZ2VLZXk6IHJ1bGUuYXBpQWN0aW9uQ29uZmlnLnN0b3JhZ2VLZXksXHJcbiAgICAgICAgICBzYXZlUGFyYW1Ub1N0b3JhZ2VLZXk6IHJ1bGUuYXBpQWN0aW9uQ29uZmlnLnN0b3JhZ2VLZXkgKyBcIl9wYXJhbVwiLFxyXG4gICAgICAgICAgcGFyYW1WYWx1ZTogcGFyYW1WYWx1ZVxyXG4gICAgICAgIH0sIChyZXMpID0+IHtcclxuICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0NhcmVDaGVja10gTOG7l2kga+G6v3QgbuG7kWkgKEV4dGVuc2lvbiBjb250ZXh0IGludmFsaWRhdGVkKS4gVnVpIGzDsm5nIHThuqNpIGzhuqFpIHRyYW5nIChGNSkuXCIpO1xyXG4gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHJlcyAmJiByZXMuc3VjY2VzcyAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICBzdG9yYWdlLnNldChydWxlLmFwaUFjdGlvbkNvbmZpZyEuc3RvcmFnZUtleSwgcmVzLmRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gxJDDoyBs4bqleSBBUEkgeG9uZywga8OtY2ggaG/huqF0IHF1w6l0IGzhuqFpIGPDoWMgbHXhuq10IGPhuqNuaCBiw6FvIMSR4buDIGPhuq1wIG5o4bqtdCBnaWFvIGRp4buHbi4uLmApO1xyXG4gICAgICAgICAgICAvLyBLw61jaCBob+G6oXQgcXXDqXQgbOG6oWkgY8OhYyBsdeG6rXQgRVZFTlRfQkFTRUQgxJHhu4MgQ+G6o25oIGLDoW8gxINuIHRoZW8gZGF0YSBt4bubaVxyXG4gICAgICAgICAgICBjYWNoZWRSdWxlcy5mb3JFYWNoKHIgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICgoIXIuYWN0aW9uVHlwZSB8fCByLmFjdGlvblR5cGUgPT09IFwiU0hPV19XQVJOSU5HXCIpICYmIHIudHJpZ2dlck1vZGUgPT09IFwiRVZFTlRfQkFTRURcIiAmJiByLnRyaWdnZXJTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChyLnRyaWdnZXJTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICBlbHMuZm9yRWFjaChlbCA9PiBldmFsdWF0ZVJ1bGVBbmRVcGRhdGVTdGF0ZVN5bmMociwgZWwpKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xyXG4gICAgICAgIGlmIChTdHJpbmcoZXJyKS5pbmNsdWRlcyhcIkV4dGVuc2lvbiBjb250ZXh0IGludmFsaWRhdGVkXCIpIHx8IChlcnIgJiYgZXJyLm1lc3NhZ2UgJiYgZXJyLm1lc3NhZ2UuaW5jbHVkZXMoXCJFeHRlbnNpb24gY29udGV4dCBpbnZhbGlkYXRlZFwiKSkpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0NhcmVDaGVja10gVGnhu4duIMOtY2ggduG7q2EgxJHGsOG7o2MgY+G6rXAgbmjhuq10LiBWdWkgbMOybmcgdOG6o2kgbOG6oWkgdHJhbmcgKEY1KSDEkeG7gyBz4butIGThu6VuZy5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFtDYXJlQ2hlY2tdIEzhu5dpIGtoaSBn4buNaSBBUEkgcXVhIHByb3h5OmAsIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7IC8vIEtow7RuZyBibG9jayBVSVxyXG4gIH1cclxuXHJcbiAgaWYgKGFjdGlvbiA9PT0gXCJGRVRDSF9BTkRfU0VMRUNUXCIpIHtcclxuICAgIGNvbnN0IGlzQ29uZGl0aW9uTWV0ID0gcnVsZS5sb2dpYyA/IGV2YWx1YXRlR3JvdXBTeW5jKHJ1bGUubG9naWMsIHJ1bGUuaWQsIHRyaWdnZXJFbCkgOiB0cnVlO1xyXG4gICAgY29uc3QgcHJldmlvdXNTdGF0ZSA9IHJ1bGVTdGF0ZXMuZ2V0KHJ1bGUuaWQpO1xyXG4gICAgXHJcbiAgICBpZiAoaXNDb25kaXRpb25NZXQgJiYgKHJ1bGUudHJpZ2dlck1vZGUgPT09IFwiRVZFTlRfQkFTRURcIiB8fCBwcmV2aW91c1N0YXRlICE9PSB0cnVlKSkge1xyXG4gICAgICBpZiAocnVsZS5mZXRjaEFuZFNlbGVjdENvbmZpZz8uYXBpVXJsKSB7XHJcbiAgICAgICAgbGV0IGZpbmFsVXJsID0gcnVsZS5mZXRjaEFuZFNlbGVjdENvbmZpZy5hcGlVcmw7XHJcbiAgICAgICAgbGV0IHBhcmFtVmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIGlmIChydWxlLmZldGNoQW5kU2VsZWN0Q29uZmlnLnBhcmFtU2VsZWN0b3IpIHtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJ1bGUuZmV0Y2hBbmRTZWxlY3RDb25maWcucGFyYW1TZWxlY3RvcikgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHBhcmFtRWwgJiYgcGFyYW1FbC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgIHBhcmFtVmFsdWUgPSBwYXJhbUVsLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAvLyBYw7NhIGtob+G6o25nIHRy4bqvbmcg4bufIGPDoWMgdHLGsOG7nW5nIG3DoyAoxJHhurdjIGJp4buHdCBsw6AgQkhZVClcclxuICAgICAgICAgICAgICBpZiAocnVsZS5mZXRjaEFuZFNlbGVjdENvbmZpZy5wYXJhbVNlbGVjdG9yLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2JoeXQnKSB8fCBmaW5hbFVybC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdiaHl0JykpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtVmFsdWUgPSBwYXJhbVZhbHVlLnJlcGxhY2UoL1xccysvZywgJycpO1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgaWYgKGZpbmFsVXJsLmluY2x1ZGVzKHJ1bGUuZmV0Y2hBbmRTZWxlY3RDb25maWcucGFyYW1TZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICAgIGZpbmFsVXJsID0gZmluYWxVcmwucmVwbGFjZShydWxlLmZldGNoQW5kU2VsZWN0Q29uZmlnLnBhcmFtU2VsZWN0b3IsIHBhcmFtVmFsdWUpO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaW5hbFVybCArPSBwYXJhbVZhbHVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbQ2FyZUNoZWNrXSBJbnZhbGlkIHBhcmFtU2VsZWN0b3IgaW4gRkVUQ0hfQU5EX1NFTEVDVCBjb25maWc6ICR7cnVsZS5mZXRjaEFuZFNlbGVjdENvbmZpZy5wYXJhbVNlbGVjdG9yfWApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZiAoIXBhcmFtVmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2tdIEZFVENIX0FORF9TRUxFQ1Q6IELhu48gcXVhIGfhu41pIEFQSSB2w6wgw7QgdGhhbSBz4buRICgke3J1bGUuZmV0Y2hBbmRTZWxlY3RDb25maWcucGFyYW1TZWxlY3Rvcn0pIMSRYW5nIGLhu4sgdHLhu5FuZy5gKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gxJBhbmcgZ+G7jWkgQVBJIMSR4buDIEZFVENIX0FORF9TRUxFQ1Q6ICR7ZmluYWxVcmx9YCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgXHJcbiAgICAgICAgICAgIGFjdGlvbjogXCJQUk9YWV9GRVRDSFwiLCBcclxuICAgICAgICAgICAgdXJsOiBmaW5hbFVybCxcclxuICAgICAgICAgICAgc2F2ZVRvU3RvcmFnZUtleTogXCJURU1QX0ZFVENIX0FORF9TRUxFQ1RcIixcclxuICAgICAgICAgICAgcGFyYW1WYWx1ZTogcGFyYW1WYWx1ZVxyXG4gICAgICAgICAgfSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0NhcmVDaGVja10gTOG7l2kga+G6v3QgbuG7kWkgKEV4dGVuc2lvbiBjb250ZXh0IGludmFsaWRhdGVkKS4gVnVpIGzDsm5nIHThuqNpIGzhuqFpIHRyYW5nIChGNSkuXCIpO1xyXG4gICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuc3VjY2VzcyAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gRkVUQ0hfQU5EX1NFTEVDVCDEkcOjIGzhuqV5IGThu68gbGnhu4d1IHRow6BuaCBjw7RuZyB04burIFVSTDogJHtmaW5hbFVybH1gLCByZXMuZGF0YSk7XHJcbiAgICAgICAgICAgICAgIGxldCBkYXRhQXJyYXkgPSBBcnJheS5pc0FycmF5KHJlcy5kYXRhKSA/IHJlcy5kYXRhIDogKHJlcy5kYXRhLmRhdGEgPyByZXMuZGF0YS5kYXRhIDogbnVsbCk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICBpZiAoIWRhdGFBcnJheSB8fCAhQXJyYXkuaXNBcnJheShkYXRhQXJyYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2tdIEZFVENIX0FORF9TRUxFQ1Q6IEFQSSB0cuG6oyB24buBIGtow7RuZyDEkcO6bmcgxJHhu4tuaCBk4bqhbmcgbeG6o25nIGThu68gbGnhu4d1ISBVUkw6ICR7ZmluYWxVcmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAvLyBM4buNYyBi4buPIGPDoWMgZMOybmcgdHLhuq9uZyBob8OgbiB0b8OgbiAodOG6pXQgY+G6oyBjw6FjIGPhu5l0IGhp4buDbiB0aOG7iyDEkeG7gXUgdHLhu5FuZy9udWxsIGhv4bq3YyBBUEkgdHLhuqMgbeG6o25nIFt7fV0pXHJcbiAgICAgICAgICAgICAgIGlmIChydWxlLmZldGNoQW5kU2VsZWN0Q29uZmlnLmNvbHVtbnMgJiYgcnVsZS5mZXRjaEFuZFNlbGVjdENvbmZpZy5jb2x1bW5zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSBkYXRhQXJyYXkuZmlsdGVyKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bGUuZmV0Y2hBbmRTZWxlY3RDb25maWcuY29sdW1ucyEuc29tZShjb2wgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICBjb25zdCByYXdWYWwgPSBleHRyYWN0RnJvbVBhdGgoaXRlbSwgY29sLmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiByYXdWYWwgIT09IHVuZGVmaW5lZCAmJiByYXdWYWwgIT09IG51bGwgJiYgU3RyaW5nKHJhd1ZhbCkudHJpbSgpICE9PSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgIGlmIChkYXRhQXJyYXkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2tdIEZFVENIX0FORF9TRUxFQ1Q6IEtow7RuZyBjw7MgZOG7ryBsaeG7h3UgaOG7o3AgbOG7hyAoaG/hurdjIGtow7RuZyBjw7Mgc+G7kSBo4bq5biBraMOhbSkhIFVSTDogJHtmaW5hbFVybH1gKTtcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAvLyBIaeG7g24gdGjhu4sgbeG7mXQgVG9hc3Qgbmjhu48gY+G6o25oIGLDoW8g4bufIGfDs2MgcGjhuqNpXHJcbiAgICAgICAgICAgICAgICAgY29uc3QgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgIHRvYXN0LmlubmVySFRNTCA9IGDimqDvuI8gS2jDtG5nIHTDrG0gdGjhuqV5IHPhu5EgaOG6uW4ga2jDoW0gbOG6p24gdHLGsOG7m2MgKGhv4bq3YyBzYWkgc+G7kSB0aOG6uyBCSFlUKSFgO1xyXG4gICAgICAgICAgICAgICAgIHRvYXN0LnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xyXG4gICAgICAgICAgICAgICAgIHRvYXN0LnN0eWxlLmJvdHRvbSA9IFwiMjBweFwiO1xyXG4gICAgICAgICAgICAgICAgIHRvYXN0LnN0eWxlLnJpZ2h0ID0gXCIyMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgdG9hc3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZWY0NDQ0XCI7XHJcbiAgICAgICAgICAgICAgICAgdG9hc3Quc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgICAgICAgdG9hc3Quc3R5bGUucGFkZGluZyA9IFwiMTJweCAyMHB4XCI7XHJcbiAgICAgICAgICAgICAgICAgdG9hc3Quc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI4cHhcIjtcclxuICAgICAgICAgICAgICAgICB0b2FzdC5zdHlsZS5mb250V2VpZ2h0ID0gXCJib2xkXCI7XHJcbiAgICAgICAgICAgICAgICAgdG9hc3Quc3R5bGUuekluZGV4ID0gXCI5OTk5OTk5XCI7XHJcbiAgICAgICAgICAgICAgICAgdG9hc3Quc3R5bGUuYm94U2hhZG93ID0gXCIwIDEwcHggMTVweCAtM3B4IHJnYmEoMCwwLDAsMC4zKVwiO1xyXG4gICAgICAgICAgICAgICAgIHRvYXN0LnN0eWxlLmFuaW1hdGlvbiA9IFwiY2FyZWNoZWNrLXNsaWRlLWluIDAuM3MgZWFzZS1vdXRcIjtcclxuICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRvYXN0KTtcclxuICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRvYXN0LnJlbW92ZSgpLCA0MDAwKTtcclxuICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgIHNob3dEYXRhU2VsZWN0aW9uTW9kYWwoZGF0YUFycmF5LCBydWxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW0NhcmVDaGVja10gRkVUQ0hfQU5EX1NFTEVDVDogQVBJIGzhu5dpIGhv4bq3YyB0cuG6oyB24buBIGtow7RuZyBo4bujcCBs4buHYCwgcmVzKTtcclxuICAgICAgICAgICAgICAgYWxlcnQoYEtow7RuZyB0aOG7gyBs4bqleSBk4buvIGxp4buHdSB04burIEFQSSBjaG8gbOG7h25oOiAke3J1bGUubmFtZX1cXG5VUkw6ICR7ZmluYWxVcmx9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgICAgICBpZiAoU3RyaW5nKGVycikuaW5jbHVkZXMoXCJFeHRlbnNpb24gY29udGV4dCBpbnZhbGlkYXRlZFwiKSB8fCAoZXJyICYmIGVyci5tZXNzYWdlICYmIGVyci5tZXNzYWdlLmluY2x1ZGVzKFwiRXh0ZW5zaW9uIGNvbnRleHQgaW52YWxpZGF0ZWRcIikpKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0NhcmVDaGVja10gVGnhu4duIMOtY2ggduG7q2EgxJHGsOG7o2MgY+G6rXAgbmjhuq10LiBWdWkgbMOybmcgdOG6o2kgbOG6oWkgdHJhbmcgKEY1KSDEkeG7gyBz4butIGThu6VuZy5cIik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbQ2FyZUNoZWNrXSBM4buXaSBraGkgZ+G7jWkgQVBJIHF1YSBwcm94eSAoRkVUQ0hfQU5EX1NFTEVDVCk6YCwgZXJyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJ1bGVTdGF0ZXMuc2V0KHJ1bGUuaWQsIGlzQ29uZGl0aW9uTWV0KTtcclxuICAgIHJldHVybiBmYWxzZTsgLy8gS2jDtG5nIGJsb2NrIFVJXHJcbiAgfVxyXG5cclxuICAvLyDEkMOhbmggZ2nDoSBsb2dpY1xyXG4gIGlmICghcnVsZS5sb2dpYykgcmV0dXJuIGZhbHNlO1xyXG4gIFxyXG4gIGxldCBpc0Vycm9yID0gZXZhbHVhdGVHcm91cFN5bmMocnVsZS5sb2dpYywgcnVsZS5pZCwgdHJpZ2dlckVsKTtcclxuICBcclxuICAvLyBMT0dJQyDEkOG6tkMgQknhu4ZUIENITyBC4buGTkggVknhu4ZOOiBO4bq/dSBjbGljayB2w6BvIGNoZWNrYm94IGhv4bq3YyByb3cgxJHhu4MgQuG7jiBDSEVDSyAodW5jaGVja2VkKSwgXHJcbiAgLy8gdGjDrCB0dXnhu4d0IMSR4buRaSBraMO0bmcgYmFvIGdp4budIGzDoCBs4buXaSAodsOsIGLhu48gY2hlY2sgbmdoxKlhIGzDoCBo4buneSBjaOG7iSDEkeG7i25oKS5cclxuICBpZiAocnVsZS50cmlnZ2VyTW9kZSA9PT0gXCJFVkVOVF9CQVNFRFwiICYmIHRyaWdnZXJFbCkge1xyXG4gICAgbGV0IHJlbGF0ZWRDaGVja2JveDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG4gICAgaWYgKHRyaWdnZXJFbC50YWdOYW1lID09PSBcIklOUFVUXCIgJiYgKHRyaWdnZXJFbCBhcyBIVE1MSW5wdXRFbGVtZW50KS50eXBlID09PSBcImNoZWNrYm94XCIpIHtcclxuICAgICAgcmVsYXRlZENoZWNrYm94ID0gdHJpZ2dlckVsIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZWxhdGVkQ2hlY2tib3ggPSB0cmlnZ2VyRWwucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8gTuG6v3UgdMOsbSB0aOG6pXkgY2hlY2tib3ggbcOgIG7DsyDEkWFuZyBLSMOUTkcgxJHGsOG7o2MgY2hlY2sgLT4gQ29pIG5oxrAga2jDtG5nIGPDsyBs4buXaSFcclxuICAgIGlmIChyZWxhdGVkQ2hlY2tib3ggJiYgIXJlbGF0ZWRDaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgIGlzRXJyb3IgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgcnVsZVN0YXRlcy5zZXQocnVsZS5pZCwgaXNFcnJvcik7XHJcbiAgXHJcbiAgaWYgKHJ1bGUudHJpZ2dlck1vZGUgPT09IFwiRVZFTlRfQkFTRURcIikge1xyXG4gICAgaWYgKGlzRXJyb3IpIHtcclxuICAgICAgc2hvd1dhcm5pbmdVSShydWxlKTtcclxuICAgICAgaWYgKHRyaWdnZXJFbCkge1xyXG4gICAgICAgIC8vIFjDs2Egdmnhu4FuIMSR4buPIGPFqSBj4bunYSBsdeG6rXQgbsOgeSB0csOqbiBjw6FjIHJvdyBraMOhYyB0csaw4bubYyBraGkgdMO0IHJvdyBt4bubaVxyXG4gICAgICAgIGNvbnN0IG9sZFZpc3VhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jYXJlY2hlY2stZXJyb3I9XCIke3J1bGUuaWR9XCJdYCk7XHJcbiAgICAgICAgb2xkVmlzdWFscy5mb3JFYWNoKGVsID0+IHJlbW92ZUVycm9yVmlzdWFscyhlbCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFwcGx5RXJyb3JWaXN1YWxzKHRyaWdnZXJFbCwgcnVsZS5pZCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0cmlnZ2VyRWwpIHJlbW92ZUVycm9yVmlzdWFscyh0cmlnZ2VyRWwpO1xyXG4gICAgICAvLyBO4bq/dSBo4bq/dCBs4buXaSwgdOG7sSDEkeG7mW5nIHjDs2EgVG9hc3QgbuG6v3UgxJFhbmcgaGnhu4duXHJcbiAgICAgIHJlbW92ZVdhcm5pbmdVSShydWxlLmlkKTtcclxuICAgICAgZGlzbWlzc2VkUnVsZXMuZGVsZXRlKHJ1bGUuaWQpOyAvLyBSZXNldCB0cuG6oW5nIHRow6FpIGRpc21pc3Mga2hpIGzhu5dpIMSRw6MgxJHGsOG7o2Mga2jhuq9jIHBo4bulY1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoIWlzRXJyb3IpIHtcclxuICAgICAgZGlzbWlzc2VkUnVsZXMuZGVsZXRlKHJ1bGUuaWQpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyVmlzdWFsc0FuZFRvYXN0cygpO1xyXG4gIH1cclxuICBcclxuICByZXR1cm4gaXNFcnJvcjtcclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGBbQ2FyZUNoZWNrIERFQlVHXSBM4buXaSB0cm9uZyBldmFsdWF0ZVJ1bGVBbmRVcGRhdGVTdGF0ZVN5bmMgY+G7p2EgbHXhuq10ICR7cnVsZS5pZH06YCwgZSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJWaXN1YWxzQW5kVG9hc3RzKCkge1xyXG4gIGNvbnN0IGFjdGl2ZUVycm9yUnVsZXMgPSBjYWNoZWRSdWxlcy5maWx0ZXIociA9PiBydWxlU3RhdGVzLmdldChyLmlkKSA9PT0gdHJ1ZSAmJiByLnRyaWdnZXJNb2RlICE9PSBcIkVWRU5UX0JBU0VEXCIpO1xyXG4gIFxyXG4gIGNvbnN0IGVycm9yVGFyZ2V0RWxzID0gbmV3IFNldDxFbGVtZW50PigpO1xyXG5cclxuICBhY3RpdmVFcnJvclJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICBzaG93V2FybmluZ1VJKHJ1bGUpO1xyXG4gICAgaWYgKHJ1bGUudGFyZ2V0U2VsZWN0b3IpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0RWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChydWxlLnRhcmdldFNlbGVjdG9yKTtcclxuICAgICAgdGFyZ2V0RWxzLmZvckVhY2goZWwgPT4gZXJyb3JUYXJnZXRFbHMuYWRkKGVsKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVkUnVsZXMgPSBjYWNoZWRSdWxlcy5maWx0ZXIociA9PiBydWxlU3RhdGVzLmdldChyLmlkKSA9PT0gZmFsc2UgJiYgci50cmlnZ2VyTW9kZSAhPT0gXCJFVkVOVF9CQVNFRFwiKTtcclxuICByZXNvbHZlZFJ1bGVzLmZvckVhY2gocnVsZSA9PiB7XHJcbiAgICByZW1vdmVXYXJuaW5nVUkocnVsZS5pZCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIENsZWFudXAgVmlzdWFsc1xyXG4gIGNvbnN0IG9sZEVycm9yRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgWyR7RVJST1JfQVRUUn1dYCk7XHJcbiAgb2xkRXJyb3JFbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICBpZiAoIWVycm9yVGFyZ2V0RWxzLmhhcyhlbCkpIHtcclxuICAgICAgcmVtb3ZlRXJyb3JWaXN1YWxzKGVsKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gQXBwbHkgVmlzdWFsc1xyXG4gIGVycm9yVGFyZ2V0RWxzLmZvckVhY2goZWwgPT4gYXBwbHlFcnJvclZpc3VhbHMoZWwpKTtcclxufVxyXG5cclxuLy8gR2xvYmFsIGtleWRvd24gbGlzdGVuZXIgZm9yIHNob3J0Y3V0c1xyXG5sZXQgaXNLZXlkb3duQm91bmQgPSBmYWxzZTtcclxuZnVuY3Rpb24gYmluZEdsb2JhbEtleWRvd24oKSB7XHJcbiAgaWYgKGlzS2V5ZG93bkJvdW5kKSByZXR1cm47XHJcbiAgaXNLZXlkb3duQm91bmQgPSB0cnVlO1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50VXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XHJcbiAgICBjb25zdCBhY3RpdmVFdmVudFJ1bGVzID0gY2FjaGVkUnVsZXMuZmlsdGVyKHJ1bGUgPT4ge1xyXG4gICAgICBpZiAocnVsZS5pc0FjdGl2ZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKHJ1bGUudHJpZ2dlck1vZGUgIT09IFwiRVZFTlRfQkFTRURcIiB8fCAhcnVsZS50cmlnZ2VyU2hvcnRjdXQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCFydWxlLnVybFBhdHRlcm4pIHJldHVybiB0cnVlO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGVzY2FwZWRQYXR0ZXJuID0gcnVsZS51cmxQYXR0ZXJuLnJlcGxhY2UoL1suKz9eJHt9KCl8W1xcXVxcXFxdL2csICdcXFxcJCYnKTtcclxuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYF4ke2VzY2FwZWRQYXR0ZXJuLnJlcGxhY2UoL1xcKi9nLCBcIi4qXCIpfSRgKTtcclxuICAgICAgICByZXR1cm4gcmVnZXgudGVzdChjdXJyZW50VXJsKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGFjdGl2ZUV2ZW50UnVsZXMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGtleVByZXNzZWQgPSBlLmtleS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IGNvbWJvID0gW107XHJcbiAgICBpZiAoZS5jdHJsS2V5KSBjb21iby5wdXNoKFwiY3RybFwiKTtcclxuICAgIGlmIChlLnNoaWZ0S2V5KSBjb21iby5wdXNoKFwic2hpZnRcIik7XHJcbiAgICBpZiAoZS5hbHRLZXkpIGNvbWJvLnB1c2goXCJhbHRcIik7XHJcbiAgICBjb21iby5wdXNoKGtleVByZXNzZWQpO1xyXG4gICAgY29uc3QgY29tYm9TdHIgPSBjb21iby5qb2luKFwiK1wiKTtcclxuXHJcbiAgICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcclxuICAgIGZvciAoY29uc3QgcnVsZSBvZiBhY3RpdmVFdmVudFJ1bGVzKSB7XHJcbiAgICAgIGNvbnN0IHNob3J0Y3V0cyA9IHJ1bGUudHJpZ2dlclNob3J0Y3V0IS5zcGxpdCgnLCcpLm1hcChzID0+IHMudHJpbSgpLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICBpZiAoc2hvcnRjdXRzLmluY2x1ZGVzKGtleVByZXNzZWQpIHx8IHNob3J0Y3V0cy5pbmNsdWRlcyhjb21ib1N0cikpIHtcclxuICAgICAgICBjb25zdCBpc0Vycm9yID0gZXZhbHVhdGVSdWxlQW5kVXBkYXRlU3RhdGVTeW5jKHJ1bGUpO1xyXG4gICAgICAgIGlmIChpc0Vycm9yKSBoYXNFcnJvciA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGFzRXJyb3IpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG4gIH0sIHRydWUpOyAvLyBDYXB0dXJlIHBoYXNlXHJcbn1cclxuXHJcbmNvbnN0IGV4ZWN1dGVkT25Mb2FkUnVsZXMgPSBuZXcgU2V0PHN0cmluZz4oKTsgLy8gVHJhY2tlciBmb3IgT05fTE9BRCBydWxlc1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gcnVuRW5naW5lRXZhbHVhdGlvbigpIHtcclxuICBpZiAoaXNFdmFsdWF0aW5nKSByZXR1cm47XHJcbiAgaXNFdmFsdWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJ1bGVzID0gY2FjaGVkUnVsZXM7XHJcbiAgICBpZiAoIXJ1bGVzIHx8IHJ1bGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAvLyDEkOG7jWMgZGFuaCBzw6FjaCBsdeG6rXQgYuG7iyB04bqvdCBi4bufaSBCw6FjIHPEqSAoQ2xpZW50KVxyXG4gICAgY29uc3QgY2xpZW50U3RvcmFnZSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChcImNsaWVudF9kaXNhYmxlZF9ydWxlc1wiKTtcclxuICAgIGNvbnN0IGNsaWVudERpc2FibGVkUnVsZXMgPSBuZXcgU2V0PHN0cmluZz4oY2xpZW50U3RvcmFnZS5jbGllbnRfZGlzYWJsZWRfcnVsZXMgfHwgW10pO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgIGNvbnN0IGFjdGl2ZVJ1bGVzID0gcnVsZXMuZmlsdGVyKHJ1bGUgPT4ge1xyXG4gICAgICAvLyAxLiBBZG1pbiB04bqvdCAoR2xvYmFsKSAtPiBMb+G6oWkgYuG7j1xyXG4gICAgICBpZiAocnVsZS5pc0FjdGl2ZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcclxuICAgICAgXHJcbiAgICAgIC8vIDIuIENsaWVudCB04bqvdCAoTG9jYWwpIHbDoCBBZG1pbiBjaG8gcGjDqXAgdOG6r3QgLT4gTG/huqFpIGLhu49cclxuICAgICAgaWYgKGNsaWVudERpc2FibGVkUnVsZXMuaGFzKHJ1bGUuaWQpICYmIHJ1bGUuYWxsb3dDbGllbnRUb2dnbGUgIT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoIXJ1bGUudXJsUGF0dGVybikgcmV0dXJuIHRydWU7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgZXNjYXBlZFBhdHRlcm4gPSBydWxlLnVybFBhdHRlcm4ucmVwbGFjZSgvWy4rP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpO1xyXG4gICAgICAgIGNvbnN0IHBhdHRlcm4gPSBlc2NhcGVkUGF0dGVybi5yZXBsYWNlKC9cXCovZywgXCIuKlwiKTtcclxuICAgICAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYF4ke3BhdHRlcm59JGApO1xyXG4gICAgICAgIHJldHVybiByZWdleC50ZXN0KGN1cnJlbnRVcmwpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgcmVnZXggaW4gcnVsZTpcIiwgcnVsZS5uYW1lLCBlKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEThu41uIGThurlwIHJ1bGVTdGF0ZXMgY2hvIGPDoWMgcnVsZSBraMO0bmcgY8OybiB0aOG7j2EgbcOjbiBVUkxcclxuICAgIGNvbnN0IGFjdGl2ZVJ1bGVJZHMgPSBuZXcgU2V0KGFjdGl2ZVJ1bGVzLm1hcChyID0+IHIuaWQpKTtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIHJ1bGVTdGF0ZXMua2V5cygpKSB7XHJcbiAgICAgIGlmICghYWN0aXZlUnVsZUlkcy5oYXMoa2V5KSkgcnVsZVN0YXRlcy5kZWxldGUoa2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAwLiBDYWNoZSBTdG9yYWdlIGThu68gbGnhu4d1IGNobyBjw6FjIHJ1bGUgaGnhu4duIHThuqFpXHJcbiAgICBjb25zdCBrZXlzVG9DYWNoZSA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgY29uc3QgZXh0cmFjdEtleXMgPSAoZ3JvdXA6IExvZ2ljR3JvdXApID0+IHtcclxuICAgICAgZ3JvdXAuY29uZGl0aW9ucy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgIGlmIChjLnR5cGUgPT09IFwiQ09ORElUSU9OXCIpIHtcclxuICAgICAgICAgIGNvbnN0IG5vZGUgPSBjIGFzIENvbmRpdGlvbk5vZGU7XHJcbiAgICAgICAgICBpZiAobm9kZS5kYXRhU291cmNlVHlwZSA9PT0gXCJMT0NBTF9TVE9SQUdFXCIgJiYgbm9kZS5sb2NhbFN0b3JhZ2VLZXkpIHtcclxuICAgICAgICAgICAga2V5c1RvQ2FjaGUuYWRkKG5vZGUubG9jYWxTdG9yYWdlS2V5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChub2RlLnNlbGVjdG9yICYmIG5vZGUuc2VsZWN0b3Iuc3RhcnRzV2l0aChcInt7U1RPUkFHRTpcIikgJiYgbm9kZS5zZWxlY3Rvci5lbmRzV2l0aChcIn19XCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZ1bGxQYXRoID0gbm9kZS5zZWxlY3Rvci5zdWJzdHJpbmcoMTAsIG5vZGUuc2VsZWN0b3IubGVuZ3RoIC0gMikudHJpbSgpO1xyXG4gICAgICAgICAgICBjb25zdCByb290S2V5ID0gZnVsbFBhdGguc3BsaXQoJy4nKVswXTtcclxuICAgICAgICAgICAgaWYgKHJvb3RLZXkpIGtleXNUb0NhY2hlLmFkZChyb290S2V5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZXh0cmFjdEtleXMoYyBhcyBMb2dpY0dyb3VwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGFjdGl2ZVJ1bGVzLmZvckVhY2gociA9PiB7XHJcbiAgICAgIGlmIChyLmxvZ2ljKSBleHRyYWN0S2V5cyhyLmxvZ2ljKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXNUb0NhY2hlKSB7XHJcbiAgICAgIGNvbnN0IHZhbCA9IGF3YWl0IHN0b3JhZ2UuZ2V0KGtleSk7XHJcbiAgICAgIHN0b3JhZ2VDYWNoZS5zZXQoa2V5LCB2YWwpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyAxLiDEkMOhbmggZ2nDoSBs4buXaSAoY2jhu4kgduG7m2kgUkVBTFRJTUUgcnVsZXMpIHbDoCB0aOG7sWMgdGhpIE9OX0xPQURcclxuICAgIGZvciAoY29uc3QgcnVsZSBvZiBhY3RpdmVSdWxlcykge1xyXG4gICAgICBjb25zdCBhY3Rpb24gPSBydWxlLmFjdGlvblR5cGUgfHwgXCJTSE9XX1dBUk5JTkdcIjtcclxuXHJcbiAgICAgIGlmIChydWxlLnRyaWdnZXJNb2RlID09PSBcIk9OX0xPQURcIikge1xyXG4gICAgICAgIGlmICghZXhlY3V0ZWRPbkxvYWRSdWxlcy5oYXMocnVsZS5pZCkpIHtcclxuICAgICAgICAgIGV4ZWN1dGVkT25Mb2FkUnVsZXMuYWRkKHJ1bGUuaWQpO1xyXG4gICAgICAgICAgZXZhbHVhdGVSdWxlQW5kVXBkYXRlU3RhdGVTeW5jKHJ1bGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmIChydWxlLnRyaWdnZXJNb2RlICE9PSBcIkVWRU5UX0JBU0VEXCIpIHtcclxuICAgICAgICAvLyBSRUFMVElNRVxyXG4gICAgICAgIGlmIChhY3Rpb24gPT09IFwiU0hPV19XQVJOSU5HXCIgfHwgYWN0aW9uID09PSBcIkNPTkZJUk1fV0FSTklOR1wiKSB7XHJcbiAgICAgICAgICBpZiAoIXJ1bGUubG9naWMpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgY29uc3QgaXNFcnJvciA9IGV2YWx1YXRlR3JvdXBTeW5jKHJ1bGUubG9naWMsIHJ1bGUuaWQpO1xyXG4gICAgICAgICAgcnVsZVN0YXRlcy5zZXQocnVsZS5pZCwgaXNFcnJvcik7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24gPT09IFwiU0VUX1ZBTFVFXCIgfHwgYWN0aW9uID09PSBcIlNBVkVfVE9fU1RPUkFHRVwiKSB7XHJcbiAgICAgICAgICBpZiAoIXJ1bGUubG9naWMpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgY29uc3QgaXNDb25kaXRpb25NZXQgPSBldmFsdWF0ZUdyb3VwU3luYyhydWxlLmxvZ2ljLCBydWxlLmlkKTtcclxuICAgICAgICAgIGNvbnN0IHByZXZpb3VzU3RhdGUgPSBydWxlU3RhdGVzLmdldChydWxlLmlkKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaXNDb25kaXRpb25NZXQpIHtcclxuICAgICAgICAgICAgICBpZiAoYWN0aW9uID09PSBcIlNFVF9WQUxVRVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNTdGF0ZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAocnVsZS50YXJnZXRTZWxlY3RvciAmJiBydWxlLnNldFZhbHVlQ29uZmlnPy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmluYWxWYWx1ZSA9IHJlc29sdmVEeW5hbWljVmFsdWVTeW5jKHJ1bGUuc2V0VmFsdWVDb25maWchLnZhbHVlLCB0cmlnZ2VyRWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldEVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocnVsZS50YXJnZXRTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RWxzLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSAhPT0gZmluYWxWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBmaW5hbFZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJywgeyBidWJibGVzOiB0cnVlIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JywgeyBidWJibGVzOiB0cnVlIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIkNBUkVDSEVDS19UUklHR0VSX0pRVUVSWV9DSEFOR0VcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDogeyBzZWxlY3RvcjogcnVsZS50YXJnZXRTZWxlY3RvciwgdmFsdWU6IGZpbmFsVmFsdWUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbiA9PT0gXCJTQVZFX1RPX1NUT1JBR0VcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJ1bGUudGFyZ2V0U2VsZWN0b3IgJiYgcnVsZS5zZXRWYWx1ZUNvbmZpZz8udmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBmaW5hbFZhbHVlID0gcmVzb2x2ZUR5bmFtaWNWYWx1ZVN5bmMocnVsZS5zZXRWYWx1ZUNvbmZpZyEudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBzdG9yYWdlS2V5ID0gXCJDQVJFQ0hFQ0tfXCIgKyAocnVsZS50YXJnZXRTZWxlY3Rvci5zdGFydHNXaXRoKFwiU0VTU0lPTjpcIikgPyBydWxlLnRhcmdldFNlbGVjdG9yLnN1YnN0cmluZyg4KS50cmltKCkgOiBydWxlLnRhcmdldFNlbGVjdG9yLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U2F2ZWRWYWx1ZSA9IHJ1bGUudGFyZ2V0U2VsZWN0b3Iuc3RhcnRzV2l0aChcIlNFU1NJT046XCIpID8gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KSA6IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0b3JhZ2VLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENo4buJIHNhdmUgbOG6oWkgbuG6v3UgZ2nDoSB0cuG7iyB24burYSBs4bqleSByYSBLSMOBQyB24bubaSBnacOhIHRy4buLIMSRYW5nIGzGsHUgdHJvbmcgU3RvcmFnZSAoaG/hurdjIHN0YXRlIG5o4bqjeSB04burIGZhbHNlIGzDqm4gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFNhdmVkVmFsdWUgIT09IGZpbmFsVmFsdWUgfHwgcHJldmlvdXNTdGF0ZSAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGUudGFyZ2V0U2VsZWN0b3Iuc3RhcnRzV2l0aChcIlNFU1NJT046XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgZmluYWxWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdG9yYWdlS2V5LCBmaW5hbFZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbQ2FyZUNoZWNrIERFQlVHXSBTQVZFX1RPX1NUT1JBR0UgKFJFQUxUSU1FKSBrw61jaCBob+G6oXQgY2hvIGx14bqtdCAke3J1bGUuaWR9LiBMxrB1IGdpw6EgdHLhu4s6IFwiJHtmaW5hbFZhbHVlfVwiIHbDoG8gYmnhur9uIFwiJHtydWxlLnRhcmdldFNlbGVjdG9yfVwiYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkzhu5dpIGtoaSBsxrB1IHbDoG8gU3RvcmFnZTpcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIHJ1bGVTdGF0ZXMuc2V0KHJ1bGUuaWQsIGlzQ29uZGl0aW9uTWV0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gR+G6r24gc+G7sSBraeG7h24gY2hvIEVWRU5UX0JBU0VEIHJ1bGVzXHJcbiAgICAgICAgLy8gYS4gQuG6r3Qgc+G7sSBraeG7h24gYmx1ci9jaGFuZ2UgdHLDqm4gdGFyZ2V0U2VsZWN0b3IgKENI4buIIMOhcCBk4bulbmcgY2hvIGPDoWMgaMOgbmggxJHhu5luZyBD4bqjbmggYsOhbywgdsOsIGPDoWMgaMOgbmggxJHhu5luZyBraMOhYyB0YXJnZXRTZWxlY3RvciBsw6AgxJDhuqd1IHJhL8SQw61jaCDEkeG6v24pXHJcbiAgICAgICAgY29uc3QgYWN0aW9uVHlwZSA9IHJ1bGUuYWN0aW9uVHlwZSB8fCBcIlNIT1dfV0FSTklOR1wiO1xyXG4gICAgICAgIGlmICgoYWN0aW9uVHlwZSA9PT0gXCJTSE9XX1dBUk5JTkdcIiB8fCBhY3Rpb25UeXBlID09PSBcIkNPTkZJUk1fV0FSTklOR1wiKSAmJiBydWxlLnRhcmdldFNlbGVjdG9yICYmIHJ1bGUudGFyZ2V0U2VsZWN0b3IudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHJ1bGUudGFyZ2V0U2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB0YXJnZXRFbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoYGRhdGEtYm91bmQtYmx1ci0ke3J1bGUuaWR9YCkpIHtcclxuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShgZGF0YS1ib3VuZC1ibHVyLSR7cnVsZS5pZH1gLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGV2YWx1YXRlUnVsZUFuZFVwZGF0ZVN0YXRlU3luYyhydWxlLCBlbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChlbC50YWdOYW1lID09PSBcIlNFTEVDVFwiIHx8IGVsLnRhZ05hbWUgPT09IFwiSU5QVVRcIiB8fCBlbC50YWdOYW1lID09PSBcIlRFWFRBUkVBXCIpIHtcclxuICAgICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiBldmFsdWF0ZVJ1bGVBbmRVcGRhdGVTdGF0ZVN5bmMocnVsZSwgZWwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbQ2FyZUNoZWNrXSBJbnZhbGlkIHRhcmdldFNlbGVjdG9yIGluIHJ1bGUgJHtydWxlLmlkfTogJHtydWxlLnRhcmdldFNlbGVjdG9yfWAsIGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBiLiBC4bqvdCBz4buxIGtp4buHbiB0csOqbiB0cmlnZ2VyU2VsZWN0b3JcclxuICAgICAgICBpZiAocnVsZS50cmlnZ2VyU2VsZWN0b3IgJiYgcnVsZS50cmlnZ2VyU2VsZWN0b3IudHJpbSgpICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChydWxlLnRyaWdnZXJTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFbHMuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFlbC5oYXNBdHRyaWJ1dGUoYGRhdGEtYm91bmQtdHJpZ2dlci0ke3J1bGUuaWR9YCkpIHtcclxuICAgICAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShgZGF0YS1ib3VuZC10cmlnZ2VyLSR7cnVsZS5pZH1gLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBpc0V4ZWN1dGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3RUcmlnZ2VyVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0VHJpZ2dlckNoZWNrZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZTogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGlzRXhlY3V0aW5nKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0NoZWNrYm94ID0gZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS50eXBlID09PSBcImNoZWNrYm94XCI7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IChlbCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSB8fCBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Q2hlY2tlZCA9IGlzQ2hlY2tib3ggPyAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCA6IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgPT09IFwiYmx1clwiICYmIGxhc3RUcmlnZ2VyVmFsdWUgPT09IGN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy8gQ2jhu5FuZyBs4bq3cDogTuG6v3UgYmx1ciBtw6AgZ2nDoSB0cuG7iyBraMO0bmcgxJHhu5VpLCBi4buPIHF1YSBraMO0bmcgZ+G7jWkgQVBJIGzhuqFpXHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgaWYgKGUudHlwZSA9PT0gXCJjaGFuZ2VcIiB8fCBlLnR5cGUgPT09IFwiYmx1clwiIHx8IGUudHlwZSA9PT0gXCJpbnB1dFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFRyaWdnZXJWYWx1ZSA9IGN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gQuG7jyBxdWEgc+G7sSBraeG7h24gY2xpY2sgdHLDqm4gdGjhursgU0VMRUNUIMSR4buDIHRyw6FuaCBrw61jaCBob+G6oXQgbHXhuq10IGtoaSB24burYSBjbGljayBt4bufIG1lbnUgZHJvcGRvd25cclxuICAgICAgICAgICAgICAgICAgaWYgKGUudHlwZSA9PT0gXCJjbGlja1wiICYmIGVsLnRhZ05hbWUgPT09IFwiU0VMRUNUXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIGlmIChpc0NoZWNrYm94ICYmIGUudHlwZSA9PT0gXCJjaGFuZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENo4buRbmcgbOG6t3Aga2hpIGNsaWNrIHbDoCBjaGFuZ2UgxJFpIGxp4buBbiBuaGF1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RUcmlnZ2VyQ2hlY2tlZCA9PT0gY3VycmVudENoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzUm93ID0gZWwudGFnTmFtZSA9PT0gXCJUUlwiIHx8IGVsLnRhZ05hbWUgPT09IFwiVERcIjtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgaXNDbGlja09uQnV0dG9uID0gZS50eXBlID09PSBcImNsaWNrXCIgJiYgIWlzQ2hlY2tib3ggJiYgIWlzUm93O1xyXG5cclxuICAgICAgICAgICAgICAgICAgLy8gMS4gS2nhu4NtIHRyYSB04bupYyB0aOG7nWkgKFN5bmNocm9ub3VzIENoZWNrKSBjaOG6t24gU2F2ZSBISVNcclxuICAgICAgICAgICAgICAgICAgaWYgKGlzQ2xpY2tPbkJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChydWxlLmxvZ2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0Vycm9yU3luYyA9IGV2YWx1YXRlR3JvdXBTeW5jKHJ1bGUubG9naWMsIHJ1bGUuaWQsIGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0Vycm9yU3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSBydWxlLndhcm5pbmdDb25maWc/Lm1lc3NhZ2UgfHwgcnVsZS5tZXNzYWdlIHx8IFwiROG7ryBsaeG7h3Uga2jDtG5nIGjhu6NwIGzhu4chXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5hY3Rpb25UeXBlID09PSBcIkNPTkZJUk1fV0FSTklOR1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTuG6v3UgxJHDoyBieXBhc3MgcXVhIG1vZGFsIGN1c3RvbSBy4buTaSB0aMOsIGLhu48gcXVhIGtow7RuZyBjaGVjayBu4buvYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgod2luZG93IGFzIGFueSkuX19jYXJlY2hlY2tCeXBhc3NlZFJ1bGVzPy5oYXMocnVsZS5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9mZmVuZGluZ1ZhbCA9ICh3aW5kb3cgYXMgYW55KS5fX2NhcmVjaGVja09mZmVuZGluZ1ZhbHVlcz8uZ2V0KHJ1bGUuaWQpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmluYWxNc2cgPSBtc2cucmVwbGFjZSgvXFx7XFx7VkFMVUVcXH1cXH0vZywgb2ZmZW5kaW5nVmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q3VzdG9tQ29uZmlybU1vZGFsKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJD4bqiTkggQsOBTyBLSeG7gk0gVFJBIEzhu5ZJIVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxNc2csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbmZpcm06IMSQw6FuaCBk4bqldSDEkcOjIGJ5cGFzc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh3aW5kb3cgYXMgYW55KS5fX2NhcmVjaGVja0J5cGFzc2VkUnVsZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAod2luZG93IGFzIGFueSkuX19jYXJlY2hlY2tCeXBhc3NlZFJ1bGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLl9fY2FyZWNoZWNrQnlwYXNzZWRSdWxlcy5hZGQocnVsZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBHaeG6oyBs4bqtcCBs4bqhaSBjw7ogY2xpY2sgY2h14buZdCDEkeG7gyDEkWkgdGnhur9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeShlbCkudHJpZ2dlcignY2xpY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZWwgYXMgSFRNTEVsZW1lbnQpLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFjDs2EgY+G7nSBieXBhc3Mgc2F1IG7hu61hIGdpw6J5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5fX2NhcmVjaGVja0J5cGFzc2VkUnVsZXMuZGVsZXRlKHJ1bGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FuY2VsOiBLaMO0bmcgbMOgbSBnw6wgY+G6o1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE3hurdjIMSR4buLbmggU0hPV19XQVJOSU5HIChIYXJkIGJsb2NrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2YWx1YXRlUnVsZUFuZFVwZGF0ZVN0YXRlU3luYyhydWxlLCBlbCk7IC8vIEvDrWNoIGhv4bqhdCBUb2FzdCBVSVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47IC8vIEtow7RuZyBjw7MgbOG7l2ksIGNobyBISVMgY2jhuqF5IHRp4bq/cFxyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAvLyAyLiBW4bubaSBDaGVja2JveC9Sb3cgdHLDqm4gbMaw4bubaSwgduG6q24gZ2nhu68gbmd1ecOqbiBjxqEgY2jhur8gY2jhu50gxJHhu4MgSElTIGPhuq1wIG5o4bqtdCBET01cclxuICAgICAgICAgICAgICAgICAgaXNFeGVjdXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgaWYgKGlzQ2hlY2tib3ggJiYgZS50eXBlID09PSBcImNoYW5nZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTuG6v3UgbMOgIHPhu7Ega2nhu4duIGNoYW5nZSB0aMOsIERPTSDEkcOjIMSRxrDhu6NjIGPhuq1wIG5o4bqtdCwgeOG7rSBsw70gbmdheVxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RUcmlnZ2VyQ2hlY2tlZCA9IGN1cnJlbnRDaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRlUnVsZUFuZFVwZGF0ZVN0YXRlU3luYyhydWxlLCBlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGlzRXhlY3V0aW5nID0gZmFsc2U7IH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsU3RhdGUgPSBjdXJyZW50Q2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcclxuICAgICAgICAgICAgICAgICAgICAvLyBO4bq/dSBraMO0bmcgcGjhuqNpIGNoZWNrYm94LCB44butIGzDvSBuZ2F5IHRyb25nIHRpY2sgxJHhuqd1IHRpw6puLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE7hur91IGzDoCBjaGVja2JveCwgxJHhu6NpIHThu5FpIMSRYSAxIGdpw6J5ICgyMCAqIDUwbXMpIMSR4buDIERPTSB0aGF5IMSR4buVaVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNDaGVja2JveCB8fCAoZWwgYXMgSFRNTElucHV0RWxlbWVudCkuY2hlY2tlZCAhPT0gaW5pdGlhbFN0YXRlIHx8IGF0dGVtcHRzID49IDIwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRyaWdnZXJDaGVja2VkID0gKGVsIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICBldmFsdWF0ZVJ1bGVBbmRVcGRhdGVTdGF0ZVN5bmMocnVsZSwgZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGlzRXhlY3V0aW5nID0gZmFsc2U7IH0sIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgaGFuZGxlciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIE3hu58gcuG7mW5nIHbDuW5nIGLhuq90IHPhu7Ega2nhu4duOiBO4bq/dSBuZ8aw4budaSBkw7luZyBj4bqldSBow6xuaCB0cmlnZ2VyIGzDoCBjaGVja2JveCwgXHJcbiAgICAgICAgICAgICAgICAvLyBuaMawbmcgaOG7jSBs4bqhaSBjbGljayB2w6BvIGPDoWkgUm93ICh0aOG6uyA8dHI+KSwgdGjDrCBISVMgduG6q24gc+G6vSBjaGVjayBjaGVja2JveC5cclxuICAgICAgICAgICAgICAgIC8vIERvIMSRw7MgdGEgcGjhuqNpIGLhuq90IGx1w7RuIGPhuqMgc+G7sSBraeG7h24gY2xpY2sgdHLDqm4gY8OhaSBSb3cgY2jhu6lhIG7DsyFcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFJvdyA9IGVsLmNsb3Nlc3QoJ3RyJykgfHwgZWwuY2xvc2VzdCgnLmpxZ3JvdycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFJvdyAmJiAhcGFyZW50Um93Lmhhc0F0dHJpYnV0ZShgZGF0YS1ib3VuZC10cmlnZ2VyLXJvdy0ke3J1bGUuaWR9YCkpIHtcclxuICAgICAgICAgICAgICAgICAgcGFyZW50Um93LnNldEF0dHJpYnV0ZShgZGF0YS1ib3VuZC10cmlnZ2VyLXJvdy0ke3J1bGUuaWR9YCwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICBwYXJlbnRSb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiIHx8IGVsLnRhZ05hbWUgPT09IFwiVEVYVEFSRUFcIiB8fCBlbC50YWdOYW1lID09PSBcIlNFTEVDVFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGhhbmRsZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGhhbmRsZXIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZSBhcyBLZXlib2FyZEV2ZW50KS5rZXkgPT09IFwiRW50ZXJcIikgaGFuZGxlcihlKTtcclxuICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW0NhcmVDaGVja10gSW52YWxpZCB0cmlnZ2VyU2VsZWN0b3IgaW4gcnVsZSAke3J1bGUuaWR9OiAke3J1bGUudHJpZ2dlclNlbGVjdG9yfWAsIGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBjLiDEkMSDbmcga8O9IHBow61tIHThuq90IHRvw6BuIGPhu6VjXHJcbiAgICAgICAgaWYgKHJ1bGUudHJpZ2dlclNob3J0Y3V0KSB7XHJcbiAgICAgICAgICBiaW5kR2xvYmFsS2V5ZG93bigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIDIuIFJlbmRlciBnaWFvIGRp4buHbiBUb2FzdCB2w6AgVmlzdWFsc1xyXG4gICAgcmVuZGVyVmlzdWFsc0FuZFRvYXN0cygpO1xyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIGlmIChlcnJvci5tZXNzYWdlICYmIGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJFeHRlbnNpb24gY29udGV4dCBpbnZhbGlkYXRlZFwiKSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIltDYXJlQ2hlY2tdIEV4dGVuc2lvbiDEkcOjIMSRxrDhu6NjIGPhuq1wIG5o4bqtdCBi4bqjbiBt4bubaS4gxJBhbmcgdOG6r3QgbHXhu5NuZyBjxakuLi5cIik7XHJcbiAgICAgIGlmIChlbmdpbmVJbnRlcnZhbCkgY2xlYXJJbnRlcnZhbChlbmdpbmVJbnRlcnZhbCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnNvbGUuZXJyb3IoXCJM4buXaSBraGkgY2jhuqF5IGVuZ2luZSDEkcOhbmggZ2nDoTpcIiwgZXJyb3IpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBpc0V2YWx1YXRpbmcgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbi8vIEto4bufaSBjaOG6oXkgxJDhu5luZyBjxqFcclxuYXN5bmMgZnVuY3Rpb24gc3RhcnRFbmdpbmUoKSB7XHJcbiAgY29uc29sZS5sb2coXCJbQ2FyZUNoZWNrIEFzc2lzdGFudF0gS2jhu59pIMSR4buZbmcgxJHhu5luZyBjxqEgbG9naWMgcGjhu6ljIGjhu6NwLi4uXCIpO1xyXG4gIFxyXG4gIC8vIE7huqFwIFJ1bGVzIHbDoG8gYuG7mSBuaOG7myDEkeG7h20gKENhY2hlKSBuZ2F5IGzhuqduIMSR4bqndVxyXG4gIGNvbnN0IGluaXRpYWxSdWxlcyA9IGF3YWl0IHN0b3JhZ2UuZ2V0PFJ1bGVbXT4oUlVMRVNfU1RPUkFHRV9LRVkpO1xyXG4gIGlmIChpbml0aWFsUnVsZXMpIHtcclxuICAgIGNhY2hlZFJ1bGVzID0gaW5pdGlhbFJ1bGVzO1xyXG4gIH1cclxuICBcclxuICAvLyBDaOG6oXkgbmdheSBs4bqnbiDEkeG6p3VcclxuICBhd2FpdCBydW5FbmdpbmVFdmFsdWF0aW9uKCk7XHJcblxyXG4gIC8vIMSQxINuZyBrw70gb2JzZXJ2ZXIgxJHhu4MgY2jhuqF5IGzhuqFpIG3hu5dpIGtoaSBET00gdGhheSDEkeG7lWkgaG/hurdjIHVzZXIgZ8O1IHBow61tXHJcbiAgY29uc3QgZGVib3VuY2VkRXZhbCA9IGRlYm91bmNlKHJ1bkVuZ2luZUV2YWx1YXRpb24sIDUwMCk7XHJcblxyXG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgZGVib3VuY2VkRXZhbCgpO1xyXG4gIH0pO1xyXG5cclxuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcclxuICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxyXG4gIH0pO1xyXG5cclxuICAvLyBM4bqvbmcgbmdoZSBz4buxIGtp4buHbiBpbnB1dCDEkeG7gyBn4buhIGzhu5dpIHJlYWx0aW1lXHJcbiAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG4gICAgZGVib3VuY2VkRXZhbCgpO1xyXG4gIH0sIHRydWUpO1xyXG4gIFxyXG4gIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICBkZWJvdW5jZWRFdmFsKCk7XHJcbiAgfSwgdHJ1ZSk7XHJcblxyXG4gIC8vIEZhbGxiYWNrOiBRdcOpdCDEkeG7i25oIGvhu7MgbeG7l2kgMC4xIGdpw6J5ICgxMDBtcykgxJHhu4MgcGjhuqNuIGjhu5NpIHNpw6p1IHThu5FjIMSR4buZXHJcbiAgLy8gQ2jhuqF5IHRo4bqzbmcgcnVuRW5naW5lRXZhbHVhdGlvbiB0aGF5IHbDrCBkZWJvdW5jZSDEkeG7gyBraMO0bmcgYuG7iyBj4buZbmcgZOG7k24gxJHhu5kgdHLhu4VcclxuICBpZiAoZW5naW5lSW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwoZW5naW5lSW50ZXJ2YWwpO1xyXG4gIGVuZ2luZUludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgcnVuRW5naW5lRXZhbHVhdGlvbigpO1xyXG4gIH0sIDEwMCk7XHJcbn1cclxuXHJcbi8vIFV0aWxpdHkgZGVib3VuY2UgZnVuY3Rpb25cclxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYzogRnVuY3Rpb24sIHdhaXQ6IG51bWJlcikge1xyXG4gIGxldCB0aW1lb3V0OiBhbnk7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKC4uLmFyZ3MpLCB3YWl0KTtcclxuICB9O1xyXG59XHJcblxyXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBzdGFydEVuZ2luZSlcclxufSBlbHNlIHtcclxuICBzdGFydEVuZ2luZSgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dDdXN0b21Db25maXJtTW9kYWwodGl0bGU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nLCBvbkNvbmZpcm06ICgpID0+IHZvaWQsIG9uQ2FuY2VsOiAoKSA9PiB2b2lkKSB7XHJcbiAgY29uc3QgbW9kYWxJZCA9IFwiY2FyZWNoZWNrLWNvbmZpcm0tb3ZlcmxheVwiO1xyXG4gIGNvbnN0IGV4aXN0aW5nTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElkKTtcclxuICBpZiAoZXhpc3RpbmdNb2RhbCkgcmV0dXJuO1xyXG5cclxuICBjb25zdCBvdmVybGF5SFRNTCA9IGBcclxuICAgIDxkaXYgaWQ9XCIke21vZGFsSWR9XCIgc3R5bGU9XCJwb3NpdGlvbjogZml4ZWQ7IHRvcDogMDsgbGVmdDogMDsgd2lkdGg6IDEwMHZ3OyBoZWlnaHQ6IDEwMHZoOyBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNik7IHotaW5kZXg6IDIxNDc0ODM2NDc7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOyBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnB4KTsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1wiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwiYmFja2dyb3VuZDogd2hpdGU7IHdpZHRoOiA0NTBweDsgbWF4LXdpZHRoOiA5MCU7IGJvcmRlci1yYWRpdXM6IDEycHg7IGJveC1zaGFkb3c6IDAgMjBweCAyNXB4IC01cHggcmdiYSgwLDAsMCwwLjEpLCAwIDEwcHggMTBweCAtNXB4IHJnYmEoMCwwLDAsMC4wNCk7IG92ZXJmbG93OiBoaWRkZW47IGFuaW1hdGlvbjogY2MtbW9kYWwtcG9wIDAuM3MgY3ViaWMtYmV6aWVyKDAuMTYsIDEsIDAuMywgMSk7XCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cImJhY2tncm91bmQ6ICNkYzI2MjY7IHBhZGRpbmc6IDI0cHg7IHRleHQtYWxpZ246IGNlbnRlcjtcIj5cclxuICAgICAgICAgIDxzdmcgc3R5bGU9XCJ3aWR0aDogNTZweDsgaGVpZ2h0OiA1NnB4OyBjb2xvcjogd2hpdGU7IG1hcmdpbjogMCBhdXRvO1wiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiPjxwYXRoIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTEyIDl2Mm0wIDRoLjAxbS02LjkzOCA0aDEzLjg1NmMxLjU0IDAgMi41MDItMS42NjcgMS43MzItM0wxMy43MzIgNGMtLjc3LTEuMzMzLTIuNjk0LTEuMzMzLTMuNDY0IDBMMy4zNCAxNmMtLjc3IDEuMzMzLjE5MiAzIDEuNzMyIDN6XCI+PC9wYXRoPjwvc3ZnPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJwYWRkaW5nOiAyNHB4O1wiPlxyXG4gICAgICAgICAgPGgzIHN0eWxlPVwibWFyZ2luOiAwIDAgMTJweCAwOyBjb2xvcjogIzExMTgyNzsgZm9udC1zaXplOiAxLjM1cmVtOyBmb250LXdlaWdodDogNzAwOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiAxLjI7XCI+JHt0aXRsZX08L2gzPlxyXG4gICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDAgMCAyOHB4IDA7IGNvbG9yOiAjNGI1NTYzOyBmb250LXNpemU6IDEuMDVyZW07IGxpbmUtaGVpZ2h0OiAxLjY7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udC13ZWlnaHQ6IDUwMDtcIj4ke21lc3NhZ2V9PC9wPlxyXG4gICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogMTJweDtcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImNjLWJ0bi1jYW5jZWxcIiBzdHlsZT1cImZsZXg6IDE7IHBhZGRpbmc6IDEycHggMTZweDsgYmFja2dyb3VuZDogI2YzZjRmNjsgY29sb3I6ICMzNzQxNTE7IGJvcmRlcjogMXB4IHNvbGlkICNkMWQ1ZGI7IGJvcmRlci1yYWRpdXM6IDhweDsgZm9udC13ZWlnaHQ6IDYwMDsgZm9udC1zaXplOiAxcmVtOyBjdXJzb3I6IHBvaW50ZXI7IHRyYW5zaXRpb246IGFsbCAwLjJzOyBib3gtc2hhZG93OiAwIDFweCAycHggcmdiYSgwLDAsMCwwLjA1KTtcIj5I4buneSBi4buPIChT4butYSBs4bqhaSk8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImNjLWJ0bi1jb25maXJtXCIgc3R5bGU9XCJmbGV4OiAxOyBwYWRkaW5nOiAxMnB4IDE2cHg7IGJhY2tncm91bmQ6ICNlZjQ0NDQ7IGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA4cHg7IGZvbnQtd2VpZ2h0OiA2MDA7IGZvbnQtc2l6ZTogMXJlbTsgY3Vyc29yOiBwb2ludGVyOyB0cmFuc2l0aW9uOiBhbGwgMC4yczsgYm94LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMCwwLDAsMC4wNSk7XCI+QuG7jyBxdWEgJiBUaeG6v3AgdOG7pWM8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGA7XHJcbiAgXHJcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgZGl2LmlubmVySFRNTCA9IG92ZXJsYXlIVE1MO1xyXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICBcclxuICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYy1tb2RhbC1zdHlsZScpKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICBzdHlsZS5pZCA9ICdjYy1tb2RhbC1zdHlsZSc7XHJcbiAgICBzdHlsZS5pbm5lckhUTUwgPSBgXHJcbiAgICAgIEBrZXlmcmFtZXMgY2MtbW9kYWwtcG9wIHtcclxuICAgICAgICAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMC45KTsgb3BhY2l0eTogMDsgfVxyXG4gICAgICAgIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyBvcGFjaXR5OiAxOyB9XHJcbiAgICAgIH1cclxuICAgICAgI2NjLWJ0bi1jYW5jZWw6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZTVlN2ViICFpbXBvcnRhbnQ7IGJvcmRlci1jb2xvcjogIzljYTNhZiAhaW1wb3J0YW50OyB9XHJcbiAgICAgICNjYy1idG4tY2FuY2VsOmFjdGl2ZSB7IGJhY2tncm91bmQ6ICNkMWQ1ZGIgIWltcG9ydGFudDsgfVxyXG4gICAgICAjY2MtYnRuLWNvbmZpcm06aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZGMyNjI2ICFpbXBvcnRhbnQ7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTsgYm94LXNoYWRvdzogMCA0cHggNnB4IC0xcHggcmdiYSgyMzksNjgsNjgsMC40KTsgfVxyXG4gICAgICAjY2MtYnRuLWNvbmZpcm06YWN0aXZlIHsgYmFja2dyb3VuZDogI2I5MWMxYyAhaW1wb3J0YW50OyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IGJveC1zaGFkb3c6IG5vbmU7IH1cclxuICAgIGA7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuICB9XHJcbiAgXHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NjLWJ0bi1jYW5jZWwnKSEub25jbGljayA9ICgpID0+IHtcclxuICAgIGRpdi5yZW1vdmUoKTtcclxuICAgIG9uQ2FuY2VsKCk7XHJcbiAgfTtcclxuICBcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2MtYnRuLWNvbmZpcm0nKSEub25jbGljayA9ICgpID0+IHtcclxuICAgIGRpdi5yZW1vdmUoKTtcclxuICAgIG9uQ29uZmlybSgpO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IG0gZnJvbVwicGlmeVwiO3ZhciBsPSgpPT57dHJ5e2xldCBlPShnbG9iYWxUaGlzLm5hdmlnYXRvcj8udXNlckFnZW50KS5tYXRjaCgvKG9wZXJhfGNocm9tZXxzYWZhcml8ZmlyZWZveHxtc2llfHRyaWRlbnQoPz1cXC8pKVxcLz9cXHMqKFxcZCspL2kpfHxbXTtpZihlWzFdPT09XCJDaHJvbWVcIilyZXR1cm4gcGFyc2VJbnQoZVsyXSk8MTAwfHxnbG9iYWxUaGlzLmNocm9tZS5ydW50aW1lPy5nZXRNYW5pZmVzdCgpPy5tYW5pZmVzdF92ZXJzaW9uPT09Mn1jYXRjaHtyZXR1cm4hMX1yZXR1cm4hMX07dmFyIG89Y2xhc3N7I3I7I3Q7Z2V0IHByaW1hcnlDbGllbnQoKXtyZXR1cm4gdGhpcy4jdH0jZTtnZXQgc2Vjb25kYXJ5Q2xpZW50KCl7cmV0dXJuIHRoaXMuI2V9I2E7Z2V0IGFyZWEoKXtyZXR1cm4gdGhpcy4jYX1nZXQgaGFzV2ViQXBpKCl7dHJ5e3JldHVybiB0eXBlb2Ygd2luZG93PFwidVwiJiYhIXdpbmRvdy5sb2NhbFN0b3JhZ2V9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUuZXJyb3IoZSksITF9fSNzPW5ldyBNYXA7I2k7Z2V0IGNvcGllZEtleVNldCgpe3JldHVybiB0aGlzLiNpfWlzQ29waWVkPWU9PnRoaXMuaGFzV2ViQXBpJiYodGhpcy5hbGxDb3BpZWR8fHRoaXMuY29waWVkS2V5U2V0LmhhcyhlKSk7I249ITE7Z2V0IGFsbENvcGllZCgpe3JldHVybiB0aGlzLiNufWdldEV4dFN0b3JhZ2VBcGk9KCk9Pmdsb2JhbFRoaXMuYnJvd3Nlcj8uc3RvcmFnZXx8Z2xvYmFsVGhpcy5jaHJvbWU/LnN0b3JhZ2U7Z2V0IGhhc0V4dGVuc2lvbkFwaSgpe3RyeXtyZXR1cm4hIXRoaXMuZ2V0RXh0U3RvcmFnZUFwaSgpfWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmVycm9yKGUpLCExfX1pc1dhdGNoU3VwcG9ydGVkPSgpPT50aGlzLmhhc0V4dGVuc2lvbkFwaTtrZXlOYW1lc3BhY2U9XCJcIjtpc1ZhbGlkS2V5PWU9PmUuc3RhcnRzV2l0aCh0aGlzLmtleU5hbWVzcGFjZSk7Z2V0TmFtZXNwYWNlZEtleT1lPT5gJHt0aGlzLmtleU5hbWVzcGFjZX0ke2V9YDtnZXRVbm5hbWVzcGFjZWRLZXk9ZT0+ZS5zbGljZSh0aGlzLmtleU5hbWVzcGFjZS5sZW5ndGgpO3NlcmRlPXtzZXJpYWxpemVyOkpTT04uc3RyaW5naWZ5LGRlc2VyaWFsaXplcjpKU09OLnBhcnNlfTtjb25zdHJ1Y3Rvcih7YXJlYTplPVwic3luY1wiLGFsbENvcGllZDp0PSExLGNvcGllZEtleUxpc3Q6cz1bXSxzZXJkZTpyPXt9fT17fSl7dGhpcy5zZXRDb3BpZWRLZXlTZXQocyksdGhpcy4jYT1lLHRoaXMuI249dCx0aGlzLnNlcmRlPXsuLi50aGlzLnNlcmRlLC4uLnJ9O3RyeXt0aGlzLmhhc1dlYkFwaSYmKHR8fHMubGVuZ3RoPjApJiYodGhpcy4jZT13aW5kb3cubG9jYWxTdG9yYWdlKX1jYXRjaHt9dHJ5e3RoaXMuaGFzRXh0ZW5zaW9uQXBpJiYodGhpcy4jcj10aGlzLmdldEV4dFN0b3JhZ2VBcGkoKSxsKCk/dGhpcy4jdD1tKHRoaXMuI3JbdGhpcy5hcmVhXSx7ZXhjbHVkZTpbXCJnZXRCeXRlc0luVXNlXCJdLGVycm9yRmlyc3Q6ITF9KTp0aGlzLiN0PXRoaXMuI3JbdGhpcy5hcmVhXSl9Y2F0Y2h7fX1zZXRDb3BpZWRLZXlTZXQoZSl7dGhpcy4jaT1uZXcgU2V0KGUpfXJhd0dldEFsbD0oKT0+dGhpcy4jdD8uZ2V0KCk7Z2V0QWxsPWFzeW5jKCk9PntsZXQgZT1hd2FpdCB0aGlzLnJhd0dldEFsbCgpO3JldHVybiBPYmplY3QuZW50cmllcyhlKS5maWx0ZXIoKFt0XSk9PnRoaXMuaXNWYWxpZEtleSh0KSkucmVkdWNlKCh0LFtzLHJdKT0+KHRbdGhpcy5nZXRVbm5hbWVzcGFjZWRLZXkocyldPXIsdCkse30pfTtjb3B5PWFzeW5jIGU9PntsZXQgdD1lPT09dm9pZCAwO2lmKCF0JiYhdGhpcy5jb3BpZWRLZXlTZXQuaGFzKGUpfHwhdGhpcy5hbGxDb3BpZWR8fCF0aGlzLmhhc0V4dGVuc2lvbkFwaSlyZXR1cm4hMTtsZXQgcz10aGlzLmFsbENvcGllZD9hd2FpdCB0aGlzLnJhd0dldEFsbCgpOmF3YWl0IHRoaXMuI3QuZ2V0KCh0P1suLi50aGlzLmNvcGllZEtleVNldF06W2VdKS5tYXAodGhpcy5nZXROYW1lc3BhY2VkS2V5KSk7aWYoIXMpcmV0dXJuITE7bGV0IHI9ITE7Zm9yKGxldCBhIGluIHMpe2xldCBpPXNbYV0sbj10aGlzLiNlPy5nZXRJdGVtKGEpO3RoaXMuI2U/LnNldEl0ZW0oYSxpKSxyfHw9aSE9PW59cmV0dXJuIHJ9O3Jhd0dldD1hc3luYyBlPT4oYXdhaXQgdGhpcy5yYXdHZXRNYW55KFtlXSkpW2VdO3Jhd0dldE1hbnk9YXN5bmMgZT0+dGhpcy5oYXNFeHRlbnNpb25BcGk/YXdhaXQgdGhpcy4jdC5nZXQoZSk6ZS5maWx0ZXIodGhpcy5pc0NvcGllZCkucmVkdWNlKCh0LHMpPT4odFtzXT10aGlzLiNlPy5nZXRJdGVtKHMpLHQpLHt9KTtyYXdTZXQ9YXN5bmMoZSx0KT0+YXdhaXQgdGhpcy5yYXdTZXRNYW55KHtbZV06dH0pO3Jhd1NldE1hbnk9YXN5bmMgZT0+KHRoaXMuI2UmJk9iamVjdC5lbnRyaWVzKGUpLmZpbHRlcigoW3RdKT0+dGhpcy5pc0NvcGllZCh0KSkuZm9yRWFjaCgoW3Qsc10pPT50aGlzLiNlLnNldEl0ZW0odCxzKSksdGhpcy5oYXNFeHRlbnNpb25BcGkmJmF3YWl0IHRoaXMuI3Quc2V0KGUpLG51bGwpO2NsZWFyPWFzeW5jKGU9ITEpPT57ZSYmdGhpcy4jZT8uY2xlYXIoKSxhd2FpdCB0aGlzLiN0LmNsZWFyKCl9O3Jhd1JlbW92ZT1hc3luYyBlPT57YXdhaXQgdGhpcy5yYXdSZW1vdmVNYW55KFtlXSl9O3Jhd1JlbW92ZU1hbnk9YXN5bmMgZT0+e3RoaXMuI2UmJmUuZmlsdGVyKHRoaXMuaXNDb3BpZWQpLmZvckVhY2godD0+dGhpcy4jZS5yZW1vdmVJdGVtKHQpKSx0aGlzLmhhc0V4dGVuc2lvbkFwaSYmYXdhaXQgdGhpcy4jdC5yZW1vdmUoZSl9O3JlbW92ZUFsbD1hc3luYygpPT57bGV0IGU9YXdhaXQgdGhpcy5nZXRBbGwoKSx0PU9iamVjdC5rZXlzKGUpO2F3YWl0IHRoaXMucmVtb3ZlTWFueSh0KX07d2F0Y2g9ZT0+e2xldCB0PXRoaXMuaXNXYXRjaFN1cHBvcnRlZCgpO3JldHVybiB0JiZ0aGlzLiNvKGUpLHR9OyNvPWU9Pntmb3IobGV0IHQgaW4gZSl7bGV0IHM9dGhpcy5nZXROYW1lc3BhY2VkS2V5KHQpLHI9dGhpcy4jcy5nZXQocyk/LmNhbGxiYWNrU2V0fHxuZXcgU2V0O2lmKHIuYWRkKGVbdF0pLHIuc2l6ZT4xKWNvbnRpbnVlO2xldCBhPShpLG4pPT57aWYobiE9PXRoaXMuYXJlYXx8IWlbc10pcmV0dXJuO2xldCBoPXRoaXMuI3MuZ2V0KHMpO2lmKCFoKXRocm93IG5ldyBFcnJvcihgU3RvcmFnZSBjb21tcyBkb2VzIG5vdCBleGlzdCBmb3IgbnNLZXk6ICR7c31gKTtQcm9taXNlLmFsbChbdGhpcy5wYXJzZVZhbHVlKGlbc10ubmV3VmFsdWUpLHRoaXMucGFyc2VWYWx1ZShpW3NdLm9sZFZhbHVlKV0pLnRoZW4oKFt5LGRdKT0+e2ZvcihsZXQgcCBvZiBoLmNhbGxiYWNrU2V0KXAoe25ld1ZhbHVlOnksb2xkVmFsdWU6ZH0sbil9KX07dGhpcy4jci5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoYSksdGhpcy4jcy5zZXQocyx7Y2FsbGJhY2tTZXQ6cixsaXN0ZW5lcjphfSl9fTt1bndhdGNoPWU9PntsZXQgdD10aGlzLmlzV2F0Y2hTdXBwb3J0ZWQoKTtyZXR1cm4gdCYmdGhpcy4jYyhlKSx0fTsjYyhlKXtmb3IobGV0IHQgaW4gZSl7bGV0IHM9dGhpcy5nZXROYW1lc3BhY2VkS2V5KHQpLHI9ZVt0XSxhPXRoaXMuI3MuZ2V0KHMpO2EmJihhLmNhbGxiYWNrU2V0LmRlbGV0ZShyKSxhLmNhbGxiYWNrU2V0LnNpemU9PT0wJiYodGhpcy4jcy5kZWxldGUocyksdGhpcy4jci5vbkNoYW5nZWQucmVtb3ZlTGlzdGVuZXIoYS5saXN0ZW5lcikpKX19dW53YXRjaEFsbD0oKT0+dGhpcy4jaCgpOyNoKCl7dGhpcy4jcy5mb3JFYWNoKCh7bGlzdGVuZXI6ZX0pPT50aGlzLiNyLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihlKSksdGhpcy4jcy5jbGVhcigpfWFzeW5jIGdldEl0ZW0oZSl7cmV0dXJuIHRoaXMuZ2V0KGUpfWFzeW5jIGdldEl0ZW1zKGUpe3JldHVybiBhd2FpdCB0aGlzLmdldE1hbnkoZSl9YXN5bmMgc2V0SXRlbShlLHQpe2F3YWl0IHRoaXMuc2V0KGUsdCl9YXN5bmMgc2V0SXRlbXMoZSl7YXdhaXQgYXdhaXQgdGhpcy5zZXRNYW55KGUpfWFzeW5jIHJlbW92ZUl0ZW0oZSl7cmV0dXJuIHRoaXMucmVtb3ZlKGUpfWFzeW5jIHJlbW92ZUl0ZW1zKGUpe3JldHVybiBhd2FpdCB0aGlzLnJlbW92ZU1hbnkoZSl9fSxnPWNsYXNzIGV4dGVuZHMgb3tnZXQ9YXN5bmMgZT0+e2xldCB0PXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKSxzPWF3YWl0IHRoaXMucmF3R2V0KHQpO3JldHVybiB0aGlzLnBhcnNlVmFsdWUocyl9O2dldE1hbnk9YXN5bmMgZT0+e2xldCB0PWUubWFwKHRoaXMuZ2V0TmFtZXNwYWNlZEtleSkscz1hd2FpdCB0aGlzLnJhd0dldE1hbnkodCkscj1hd2FpdCBQcm9taXNlLmFsbChPYmplY3QudmFsdWVzKHMpLm1hcCh0aGlzLnBhcnNlVmFsdWUpKTtyZXR1cm4gT2JqZWN0LmtleXMocykucmVkdWNlKChhLGksbik9PihhW3RoaXMuZ2V0VW5uYW1lc3BhY2VkS2V5KGkpXT1yW25dLGEpLHt9KX07c2V0PWFzeW5jKGUsdCk9PntsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkoZSkscj10aGlzLnNlcmRlLnNlcmlhbGl6ZXIodCk7cmV0dXJuIHRoaXMucmF3U2V0KHMscil9O3NldE1hbnk9YXN5bmMgZT0+e2xldCB0PU9iamVjdC5lbnRyaWVzKGUpLnJlZHVjZSgocyxbcixhXSk9PihzW3RoaXMuZ2V0TmFtZXNwYWNlZEtleShyKV09dGhpcy5zZXJkZS5zZXJpYWxpemVyKGEpLHMpLHt9KTtyZXR1cm4gYXdhaXQgdGhpcy5yYXdTZXRNYW55KHQpfTtyZW1vdmU9YXN5bmMgZT0+e2xldCB0PXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKTtyZXR1cm4gdGhpcy5yYXdSZW1vdmUodCl9O3JlbW92ZU1hbnk9YXN5bmMgZT0+e2xldCB0PWUubWFwKHRoaXMuZ2V0TmFtZXNwYWNlZEtleSk7cmV0dXJuIGF3YWl0IHRoaXMucmF3UmVtb3ZlTWFueSh0KX07c2V0TmFtZXNwYWNlPWU9Pnt0aGlzLmtleU5hbWVzcGFjZT1lfTtwYXJzZVZhbHVlPWFzeW5jIGU9Pnt0cnl7aWYoZSE9PXZvaWQgMClyZXR1cm4gdGhpcy5zZXJkZS5kZXNlcmlhbGl6ZXIoZSl9Y2F0Y2godCl7Y29uc29sZS5lcnJvcih0KX19fTtleHBvcnR7byBhcyBCYXNlU3RvcmFnZSxnIGFzIFN0b3JhZ2V9O1xuIiwiY29uc3QgcHJvY2Vzc0Z1bmN0aW9uID0gKGZ1bmN0aW9uXywgb3B0aW9ucywgcHJveHksIHVud3JhcHBlZCkgPT4gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0Y29uc3QgUCA9IG9wdGlvbnMucHJvbWlzZU1vZHVsZTtcblxuXHRyZXR1cm4gbmV3IFAoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGlmIChvcHRpb25zLm11bHRpQXJncykge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKCguLi5yZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKG9wdGlvbnMuZXJyb3JGaXJzdCkge1xuXHRcdFx0XHRcdGlmIChyZXN1bHRbMF0pIHtcblx0XHRcdFx0XHRcdHJlamVjdChyZXN1bHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuc2hpZnQoKTtcblx0XHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuZXJyb3JGaXJzdCkge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKChlcnJvciwgcmVzdWx0KSA9PiB7XG5cdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJndW1lbnRzXy5wdXNoKHJlc29sdmUpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzID09PSBwcm94eSA/IHVud3JhcHBlZCA6IHRoaXM7XG5cdFx0UmVmbGVjdC5hcHBseShmdW5jdGlvbl8sIHNlbGYsIGFyZ3VtZW50c18pO1xuXHR9KTtcbn07XG5cbmNvbnN0IGZpbHRlckNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGlmeShpbnB1dCwgb3B0aW9ucykge1xuXHRvcHRpb25zID0ge1xuXHRcdGV4Y2x1ZGU6IFsvLisoPzpTeW5jfFN0cmVhbSkkL10sXG5cdFx0ZXJyb3JGaXJzdDogdHJ1ZSxcblx0XHRwcm9taXNlTW9kdWxlOiBQcm9taXNlLFxuXHRcdC4uLm9wdGlvbnMsXG5cdH07XG5cblx0Y29uc3Qgb2JqZWN0VHlwZSA9IHR5cGVvZiBpbnB1dDtcblx0aWYgKCEoaW5wdXQgIT09IG51bGwgJiYgKG9iamVjdFR5cGUgPT09ICdvYmplY3QnIHx8IG9iamVjdFR5cGUgPT09ICdmdW5jdGlvbicpKSkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIFxcYGlucHV0XFxgIHRvIGJlIGEgXFxgRnVuY3Rpb25cXGAgb3IgXFxgT2JqZWN0XFxgLCBnb3QgXFxgJHtpbnB1dCA9PT0gbnVsbCA/ICdudWxsJyA6IG9iamVjdFR5cGV9XFxgYCk7XG5cdH1cblxuXHRjb25zdCBmaWx0ZXIgPSAodGFyZ2V0LCBrZXkpID0+IHtcblx0XHRsZXQgY2FjaGVkID0gZmlsdGVyQ2FjaGUuZ2V0KHRhcmdldCk7XG5cblx0XHRpZiAoIWNhY2hlZCkge1xuXHRcdFx0Y2FjaGVkID0ge307XG5cdFx0XHRmaWx0ZXJDYWNoZS5zZXQodGFyZ2V0LCBjYWNoZWQpO1xuXHRcdH1cblxuXHRcdGlmIChrZXkgaW4gY2FjaGVkKSB7XG5cdFx0XHRyZXR1cm4gY2FjaGVkW2tleV07XG5cdFx0fVxuXG5cdFx0Y29uc3QgbWF0Y2ggPSBwYXR0ZXJuID0+ICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpID8ga2V5ID09PSBwYXR0ZXJuIDogcGF0dGVybi50ZXN0KGtleSk7XG5cdFx0Y29uc3QgZGVzY3JpcHRvciA9IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcblx0XHRjb25zdCB3cml0YWJsZU9yQ29uZmlndXJhYmxlT3duID0gKGRlc2NyaXB0b3IgPT09IHVuZGVmaW5lZCB8fCBkZXNjcmlwdG9yLndyaXRhYmxlIHx8IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlKTtcblx0XHRjb25zdCBpbmNsdWRlZCA9IG9wdGlvbnMuaW5jbHVkZSA/IG9wdGlvbnMuaW5jbHVkZS5zb21lKGVsZW1lbnQgPT4gbWF0Y2goZWxlbWVudCkpIDogIW9wdGlvbnMuZXhjbHVkZS5zb21lKGVsZW1lbnQgPT4gbWF0Y2goZWxlbWVudCkpO1xuXHRcdGNvbnN0IHNob3VsZEZpbHRlciA9IGluY2x1ZGVkICYmIHdyaXRhYmxlT3JDb25maWd1cmFibGVPd247XG5cdFx0Y2FjaGVkW2tleV0gPSBzaG91bGRGaWx0ZXI7XG5cdFx0cmV0dXJuIHNob3VsZEZpbHRlcjtcblx0fTtcblxuXHRjb25zdCBjYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG5cblx0Y29uc3QgcHJveHkgPSBuZXcgUHJveHkoaW5wdXQsIHtcblx0XHRhcHBseSh0YXJnZXQsIHRoaXNBcmcsIGFyZ3MpIHtcblx0XHRcdGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldCh0YXJnZXQpO1xuXG5cdFx0XHRpZiAoY2FjaGVkKSB7XG5cdFx0XHRcdHJldHVybiBSZWZsZWN0LmFwcGx5KGNhY2hlZCwgdGhpc0FyZywgYXJncyk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHBpZmllZCA9IG9wdGlvbnMuZXhjbHVkZU1haW4gPyB0YXJnZXQgOiBwcm9jZXNzRnVuY3Rpb24odGFyZ2V0LCBvcHRpb25zLCBwcm94eSwgdGFyZ2V0KTtcblx0XHRcdGNhY2hlLnNldCh0YXJnZXQsIHBpZmllZCk7XG5cdFx0XHRyZXR1cm4gUmVmbGVjdC5hcHBseShwaWZpZWQsIHRoaXNBcmcsIGFyZ3MpO1xuXHRcdH0sXG5cblx0XHRnZXQodGFyZ2V0LCBrZXkpIHtcblx0XHRcdGNvbnN0IHByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG5cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtZXh0ZW5kLW5hdGl2ZS9uby11c2UtZXh0ZW5kLW5hdGl2ZVxuXHRcdFx0aWYgKCFmaWx0ZXIodGFyZ2V0LCBrZXkpIHx8IHByb3BlcnR5ID09PSBGdW5jdGlvbi5wcm90b3R5cGVba2V5XSkge1xuXHRcdFx0XHRyZXR1cm4gcHJvcGVydHk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChwcm9wZXJ0eSk7XG5cblx0XHRcdGlmIChjYWNoZWQpIHtcblx0XHRcdFx0cmV0dXJuIGNhY2hlZDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRjb25zdCBwaWZpZWQgPSBwcm9jZXNzRnVuY3Rpb24ocHJvcGVydHksIG9wdGlvbnMsIHByb3h5LCB0YXJnZXQpO1xuXHRcdFx0XHRjYWNoZS5zZXQocHJvcGVydHksIHBpZmllZCk7XG5cdFx0XHRcdHJldHVybiBwaWZpZWQ7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBwcm9wZXJ0eTtcblx0XHR9LFxuXHR9KTtcblxuXHRyZXR1cm4gcHJveHk7XG59XG4iLCJleHBvcnRzLmludGVyb3BEZWZhdWx0ID0gZnVuY3Rpb24gKGEpIHtcbiAgcmV0dXJuIGEgJiYgYS5fX2VzTW9kdWxlID8gYSA6IHtkZWZhdWx0OiBhfTtcbn07XG5cbmV4cG9ydHMuZGVmaW5lSW50ZXJvcEZsYWcgPSBmdW5jdGlvbiAoYSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYSwgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KTtcbn07XG5cbmV4cG9ydHMuZXhwb3J0QWxsID0gZnVuY3Rpb24gKHNvdXJjZSwgZGVzdCkge1xuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgPT09ICdkZWZhdWx0JyB8fCBrZXkgPT09ICdfX2VzTW9kdWxlJyB8fCBkZXN0Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwga2V5LCB7XG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Vba2V5XTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXN0O1xufTtcblxuZXhwb3J0cy5leHBvcnQgPSBmdW5jdGlvbiAoZGVzdCwgZGVzdE5hbWUsIGdldCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZGVzdCwgZGVzdE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldDogZ2V0LFxuICB9KTtcbn07XG4iXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLjA4ZjAwMjcxLmpzLm1hcCJ9
 globalThis.define=__define;  })(globalThis.define);