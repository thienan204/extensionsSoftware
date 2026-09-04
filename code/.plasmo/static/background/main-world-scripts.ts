import contentsMainWorld from "url:../../../contents/main_world"
chrome.scripting.registerContentScripts([
  {"id":"contentsMainWorld","js":[contentsMainWorld.split("/").pop().split("?")[0]],"matches":["<all_urls>"],"world":"MAIN"}
]).catch(_ => {})
