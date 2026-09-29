const val = '{{SELECTOR:tr.jqgrow[aria-selected="true"] td[aria-describedby="grdBenhNhanGiuong_GIOVAO"]}}';
const matches = val.match(/\{\{SELECTOR:([^{}]+)\}\}/g);
console.log('Matches:', matches);
if (matches) {
  for (const match of matches) {
    const selector = match.replace('{{SELECTOR:', '').replace('}}', '').trim();
    console.log('Selector extracted:', selector);
  }
}
