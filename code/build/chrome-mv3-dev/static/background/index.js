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
})({"2ZPU2":[function(require,module,exports) {
var u = globalThis.process?.argv || [];
var h = ()=>globalThis.process?.env || {};
var B = new Set(u), _ = (e)=>B.has(e), G = u.filter((e)=>e.startsWith("--") && e.includes("=")).map((e)=>e.split("=")).reduce((e, [t, o])=>(e[t] = o, e), {});
var U = _("--dry-run"), g = ()=>_("--verbose") || h().VERBOSE === "true", N = g();
var m = (e = "", ...t)=>console.log(e.padEnd(9), "|", ...t);
var y = (...e)=>console.error("\uD83D\uDD34 ERROR".padEnd(9), "|", ...e), v = (...e)=>m("\uD83D\uDD35 INFO", ...e), f = (...e)=>m("\uD83D\uDFE0 WARN", ...e), M = 0, i = (...e)=>g() && m(`\u{1F7E1} ${M++}`, ...e);
var b = ()=>{
    let e = globalThis.browser?.runtime || globalThis.chrome?.runtime, t = ()=>setInterval(e.getPlatformInfo, 24e3);
    e.onStartup.addListener(t), t();
};
var n = {
    "isContentScript": false,
    "isBackground": true,
    "isReact": false,
    "runtimes": [
        "background-service-runtime"
    ],
    "host": "localhost",
    "port": 1815,
    "entryFilePath": "D:\\1.ProjectBVDKLS\\extensionsSoftware\\code\\.plasmo\\static\\background\\index.ts",
    "bundleId": "c338908e704c91f1",
    "envHash": "d99a5ffa57acd638",
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
function H(e) {
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
module.bundle.Module = H;
module.bundle.hotData = {};
var c = globalThis.browser || globalThis.chrome || null;
function R() {
    return !n.host || n.host === "0.0.0.0" ? location.protocol.indexOf("http") === 0 ? location.hostname : "localhost" : n.host;
}
function x() {
    return !n.host || n.host === "0.0.0.0" ? "localhost" : n.host;
}
function d() {
    return n.port || location.port;
}
var P = "__plasmo_runtime_page_", S = "__plasmo_runtime_script_";
var O = `${n.secure ? "https" : "http"}://${R()}:${d()}/`;
async function k(e = 1470) {
    for(;;)try {
        await fetch(O);
        break;
    } catch  {
        await new Promise((o)=>setTimeout(o, e));
    }
}
if (c.runtime.getManifest().manifest_version === 3) {
    let e = c.runtime.getURL("/__plasmo_hmr_proxy__?url=");
    globalThis.addEventListener("fetch", function(t) {
        let o = t.request.url;
        if (o.startsWith(e)) {
            let s = new URL(decodeURIComponent(o.slice(e.length)));
            s.hostname === n.host && s.port === `${n.port}` ? (s.searchParams.set("t", Date.now().toString()), t.respondWith(fetch(s).then((r)=>new Response(r.body, {
                    headers: {
                        "Content-Type": r.headers.get("Content-Type") ?? "text/javascript"
                    }
                })))) : t.respondWith(new Response("Plasmo HMR", {
                status: 200,
                statusText: "Testing"
            }));
        }
    });
}
function E(e, t) {
    let { modules: o } = e;
    return o ? !!o[t] : !1;
}
function C(e = d()) {
    let t = x();
    return `${n.secure || location.protocol === "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(t) ? "wss" : "ws"}://${t}:${e}/`;
}
function L(e) {
    typeof e.message == "string" && y("[plasmo/parcel-runtime]: " + e.message);
}
function T(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C(Number(d()) + 1));
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        await e(s);
    }), t.addEventListener("error", L), t;
}
function A(e) {
    if (typeof globalThis.WebSocket > "u") return;
    let t = new WebSocket(C());
    return t.addEventListener("message", async function(o) {
        let s = JSON.parse(o.data);
        if (s.type === "update" && await e(s.assets), s.type === "error") for (let r of s.diagnostics.ansi){
            let l = r.codeframe || r.stack;
            f("[plasmo/parcel-runtime]: " + r.message + `
` + l + `

` + r.hints.join(`
`));
        }
    }), t.addEventListener("error", L), t.addEventListener("open", ()=>{
        v(`[plasmo/parcel-runtime]: Connected to HMR server for ${n.entryFilePath}`);
    }), t.addEventListener("close", ()=>{
        f(`[plasmo/parcel-runtime]: Connection to the HMR server is closed for ${n.entryFilePath}`);
    }), t;
}
var w = module.bundle.parent, a = {
    buildReady: !1,
    bgChanged: !1,
    csChanged: !1,
    pageChanged: !1,
    scriptPorts: new Set,
    pagePorts: new Set
};
async function p(e = !1) {
    if (e || a.buildReady && a.pageChanged) {
        i("BGSW Runtime - reloading Page");
        for (let t of a.pagePorts)t.postMessage(null);
    }
    if (e || a.buildReady && (a.bgChanged || a.csChanged)) {
        i("BGSW Runtime - reloading CS");
        let t = await c?.tabs.query({
            active: !0
        });
        for (let o of a.scriptPorts){
            let s = t.some((r)=>r.id === o.sender.tab?.id);
            o.postMessage({
                __plasmo_cs_active_tab__: s
            });
        }
        c.runtime.reload();
    }
}
if (!w || !w.isParcelRequire) {
    b();
    let e = A(async (t)=>{
        i("BGSW Runtime - On HMR Update"), a.bgChanged ||= t.filter((s)=>s.envHash === n.envHash).some((s)=>E(module.bundle, s.id));
        let o = t.find((s)=>s.type === "json");
        if (o) {
            let s = new Set(t.map((l)=>l.id)), r = Object.values(o.depsByBundle).map((l)=>Object.values(l)).flat();
            a.bgChanged ||= r.every((l)=>s.has(l));
        }
        p();
    });
    e.addEventListener("open", ()=>{
        let t = setInterval(()=>e.send("ping"), 24e3);
        e.addEventListener("close", ()=>clearInterval(t));
    }), e.addEventListener("close", async ()=>{
        await k(), p(!0);
    });
}
T(async (e)=>{
    switch(i("BGSW Runtime - On Build Repackaged"), e.type){
        case "build_ready":
            a.buildReady ||= !0, p();
            break;
        case "cs_changed":
            a.csChanged ||= !0, p();
            break;
    }
});
c.runtime.onConnect.addListener(function(e) {
    let t = e.name.startsWith(P), o = e.name.startsWith(S);
    if (t || o) {
        let s = t ? a.pagePorts : a.scriptPorts;
        s.add(e), e.onDisconnect.addListener(()=>{
            s.delete(e);
        }), e.onMessage.addListener(function(r) {
            i("BGSW Runtime - On source changed", r), r.__plasmo_cs_changed__ && (a.csChanged ||= !0), r.__plasmo_page_changed__ && (a.pageChanged ||= !0), p();
        });
    }
});
c.runtime.onMessage.addListener(function(t) {
    return t.__plasmo_full_reload__ && (i("BGSW Runtime - On top-level code changed"), p()), !0;
});

},{}],"8oeFb":[function(require,module,exports) {
var _background = require("../../../background");
var _mainWorldScripts = require("./main-world-scripts");

},{"../../../background":"14rpM","./main-world-scripts":"fMGyO"}],"14rpM":[function(require,module,exports) {
var _storage = require("@plasmohq/storage");
var _api = require("./services/api");
const storage = new (0, _storage.Storage)({
    area: "local"
});
const RULES_STORAGE_KEY = "mock_db_rules";
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message.action === "OPEN_OPTIONS") {
        chrome.runtime.openOptionsPage();
        // \u00c9p tr\u00ecnh duy\u1ec7t tr\u1ecf th\u1eb3ng v\u1ec1 tab Options v\u00e0 \u0111\u1ea9y c\u1eeda s\u1ed5 \u0111\u00f3 l\u00ean tr\u00ean c\u00f9ng
        const optionsUrl = chrome.runtime.getURL("options.html");
        chrome.tabs.query({
            url: optionsUrl + "*"
        }, (tabs)=>{
            if (tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, {
                    active: true
                });
                chrome.windows.update(tabs[0].windowId, {
                    focused: true
                });
            }
        });
    }
    if (message.action === "UPDATE_SYNC_ALARM") {
        setupSyncAlarm();
        sendResponse({
            success: true
        });
    }
    if (message.action === "FORCE_SYNC_RULES") {
        console.log("[CareCheck] Nh\u1eadn \u0111\u01b0\u1ee3c l\u1ec7nh \xe9p \u0111\u1ed3ng b\u1ed9 t\u1eeb Content Script (N\xfat \u0110\u0103ng nh\u1eadp)");
        autoSyncRules();
        sendResponse({
            success: true
        });
    }
    if (message.action === "FETCH_API_PERMISSIONS") {
        console.log("[CareCheck] Background: B\u1eaft \u0111\u1ea7u l\u1ea5y quy\u1ec1n cho user", message.username);
        fetchAndSavePermissions(message.username).then(()=>{
            sendResponse({
                success: true
            });
        });
        return true; // Keep message channel open for async
    }
    if (message.action === "CLEAR_API_PERMISSIONS") {
        console.log("[CareCheck] Background: X\xf3a quy\u1ec1n \u0111\u0103ng nh\u1eadp c\u0169");
        require("4c73c95d59d0ef5f").then((api)=>{
            api.clearPermissionData().then(()=>sendResponse({
                    success: true
                }));
        });
        return true;
    }
    if (message.action === "PROXY_FETCH") {
        console.log("[CareCheck] Background: B\u1eaft \u0111\u1ea7u Proxy Fetch URL:", message.url);
        fetch(message.url).then((res)=>res.json()).then(async (data)=>{
            if (message.saveToStorageKey) {
                await storage.set(message.saveToStorageKey, data);
                console.log(`[CareCheck] Background: \u0110\u00e3 l\u01b0u API data v\u00e0o bi\u1ebfn [${message.saveToStorageKey}] an to\u00e0n`);
            }
            if (message.saveParamToStorageKey && message.paramValue !== undefined) {
                await storage.set(message.saveParamToStorageKey, message.paramValue);
                console.log(`[CareCheck] Background: \u0110\u00e3 l\u01b0u Param value v\u00e0o bi\u1ebfn [${message.saveParamToStorageKey}] an to\u00e0n`);
            }
            sendResponse({
                success: true,
                data
            });
        }).catch((err)=>sendResponse({
                success: false,
                error: err.message || String(err)
            }));
        return true; // Keep message channel open for async
    }
});
async function fetchAndSavePermissions(username) {
    try {
        const { getPermissionSettings, savePermissionData } = await require("4c73c95d59d0ef5f");
        const settings = await getPermissionSettings();
        if (!settings.enabled) {
            console.log("[CareCheck] Ph\xe2n quy\u1ec1n API \u0111ang t\u1eaft.");
            return;
        }
        let permissionData = [];
        if (settings.apiUrl) {
            // C\u00f3 link API th\u1eadt -> Fetch
            const targetUrl = settings.apiUrl.includes("?") ? `${settings.apiUrl}${username}` : `${settings.apiUrl}?user=${username}`;
            console.log("[CareCheck] \u0110ang g\u1ecdi API th\u1eadt:", targetUrl);
            const res = await fetch(targetUrl);
            if (res.ok) permissionData = await res.json();
            else console.warn("[CareCheck] L\u1ed7i g\u1ecdi API, m\xe3 l\u1ed7i:", res.status);
        } else {
            // KH\u00d4NG C\u00d3 LINK API -> D\u00d9NG GI\u1ea2 L\u1eacP (MOCK DATA)
            console.log("[CareCheck] \u0110ang s\u1eed d\u1ee5ng Mock Data cho user", username);
            if (username === "dkls.bvdkls") permissionData = [
                {
                    "ma_dich_vu": "22.0015.1308"
                },
                {
                    "ma_dich_vu": "22.0154.1735"
                } // \u0110\u01b0\u1ee3c ph\u00e9p
            ];
            else // T\u00e0i kho\u1ea3n kh\u00e1c th\u00ec gi\u1ea3 v\u1edd ch\u1ec9 c\u00f3 quy\u1ec1n l\u00e0m 1 d\u1ecbch v\u1ee5
            permissionData = [
                {
                    "ma_dich_vu": "03.0191.1510"
                }
            ];
        }
        // L\u01b0u v\u00e0o Storage
        await savePermissionData(permissionData);
        console.log(`[CareCheck] \u0110\u00e3 l\u01b0u ${permissionData.length} quy\u1ec1n cho user ${username}`);
    } catch (err) {
        console.error("[CareCheck] L\u1ed7i khi t\u1ea3i quy\u1ec1n API:", err);
    }
}
async function setupSyncAlarm() {
    const settings = await (0, _api.getSyncSettings)();
    const interval = settings.syncInterval || 30;
    // X\u00f3a alarm c\u0169 n\u1ebfu c\u00f3
    chrome.alarms.clear("syncRulesAlarm", ()=>{
        // T\u1ea1o l\u1ea1i alarm m\u1edbi v\u1edbi chu k\u1ef3 m\u1edbi
        chrome.alarms.create("syncRulesAlarm", {
            periodInMinutes: interval
        });
        console.log(`[CareCheck] \u0110\u00e3 c\u00e0i \u0111\u1eb7t chu k\u1ef3 \u0111\u1ed3ng b\u1ed9 ng\u1ea7m: ${interval} ph\u00fat`);
    });
}
// X\u00f3a d\u00f2ng n\u00e0y \u1edf top-level \u0111\u1ec3 tr\u00e1nh reset alarm m\u1ed7i khi Service Worker th\u1ee9c d\u1eady
// setupSyncAlarm();
chrome.alarms.onAlarm.addListener((alarm)=>{
    if (alarm.name === "syncRulesAlarm") autoSyncRules();
});
// Ch\u1ea1y m\u1ed9t l\u1ea7n khi Extension v\u1eeba \u0111\u01b0\u1ee3c load
chrome.runtime.onStartup.addListener(()=>{
    setupSyncAlarm();
    autoSyncRules();
});
chrome.runtime.onInstalled.addListener(()=>{
    setupSyncAlarm();
    autoSyncRules();
});
async function autoSyncRules() {
    try {
        const settings = await (0, _api.getSyncSettings)();
        // N\u1ebfu l\u00e0 Admin, admin c\u00f3 th\u1ec3 t\u1ef1 b\u1ea5m \u0111\u1ed3ng b\u1ed9 th\u1ee7 c\u00f4ng, kh\u00f4ng nh\u1ea5t thi\u1ebft ph\u1ea3i k\u00e9o ng\u1ea7m li\u00ean t\u1ee5c
        // Nh\u01b0ng \u0111\u1ec3 an to\u00e0n cho m\u00e1y con (CLIENT), b\u1eaft bu\u1ed9c ph\u1ea3i k\u00e9o ng\u1ea7m.
        if (settings.role !== "CLIENT") {
            console.log("[CareCheck] Background: B\u1ecf qua Auto-Sync v\xec \u0111\xe2y l\xe0 m\xe1y Admin.");
            return;
        }
        console.log("[CareCheck] Background: B\u1eaft \u0111\u1ea7u t\u1ef1 \u0111\u1ed9ng \u0111\u1ed3ng b\u1ed9 lu\u1eadt t\u1eeb Cloud...");
        const fetchedRules = await (0, _api.fetchRulesFromCloud)(settings);
        if (fetchedRules && Array.isArray(fetchedRules)) {
            await (0, _api.saveAllRulesAPI)(fetchedRules);
            console.log("[CareCheck] Background: \u0110\xe3 \u0111\u1ed3ng b\u1ed9 th\xe0nh c\xf4ng", fetchedRules.length, "lu\u1eadt.");
        }
    } catch (err) {
        console.error("[CareCheck] Background: L\u1ed7i \u0111\u1ed3ng b\u1ed9 ng\u1ea7m", err);
    }
}

},{"@plasmohq/storage":"i0YkM","./services/api":"a4xvA","4c73c95d59d0ef5f":"lBIrQ"}],"i0YkM":[function(require,module,exports) {
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

},{"pify":"6Hkib","@parcel/transformer-js/src/esmodule-helpers.js":"iIXqM"}],"6Hkib":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"iIXqM"}],"iIXqM":[function(require,module,exports) {
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

},{}],"a4xvA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultPermissionSettings", ()=>defaultPermissionSettings);
parcelHelpers.export(exports, "getPermissionSettings", ()=>getPermissionSettings);
parcelHelpers.export(exports, "savePermissionSettings", ()=>savePermissionSettings);
parcelHelpers.export(exports, "clearPermissionData", ()=>clearPermissionData);
parcelHelpers.export(exports, "savePermissionData", ()=>savePermissionData);
parcelHelpers.export(exports, "getPermissionData", ()=>getPermissionData);
parcelHelpers.export(exports, "defaultSyncSettings", ()=>defaultSyncSettings);
parcelHelpers.export(exports, "getSyncSettings", ()=>getSyncSettings);
parcelHelpers.export(exports, "saveSyncSettings", ()=>saveSyncSettings);
// ----------------------------------------------------
// LOCAL STORAGE API (For UI and Content Script reading)
// ----------------------------------------------------
parcelHelpers.export(exports, "fetchRulesAPI", ()=>fetchRulesAPI);
parcelHelpers.export(exports, "saveRuleAPI", ()=>saveRuleAPI);
parcelHelpers.export(exports, "deleteRuleAPI", ()=>deleteRuleAPI);
parcelHelpers.export(exports, "saveAllRulesAPI", ()=>saveAllRulesAPI);
// ----------------------------------------------------
// CLOUD SYNC API
// ----------------------------------------------------
parcelHelpers.export(exports, "fetchRulesFromCloud", ()=>fetchRulesFromCloud);
parcelHelpers.export(exports, "pushRulesToCloud", ()=>pushRulesToCloud);
var _storage = require("@plasmohq/storage");
const storage = new (0, _storage.Storage)({
    area: "local"
});
const RULES_STORAGE_KEY = "mock_db_rules";
const SYNC_SETTINGS_KEY = "cloud_sync_settings";
const defaultPermissionSettings = {
    enabled: false,
    apiUrl: "",
    loginBtnSelector: "#btnLogin, button[type='submit']",
    usernameSelector: "input[name='username'], input[type='text'], #username",
    serviceCodeSuffix: "_MADICHVU",
    icdInputSelector: ""
};
const PERMISSION_SETTINGS_KEY = "advanced_permission_settings";
const PERMISSION_DATA_KEY = "advanced_permission_data"; // N\u01a1i l\u01b0u m\u1ea3ng m\u00e3 d\u1ecbch v\u1ee5
async function getPermissionSettings() {
    const settings = await storage.get(PERMISSION_SETTINGS_KEY);
    return settings || defaultPermissionSettings;
}
async function savePermissionSettings(settings) {
    await storage.set(PERMISSION_SETTINGS_KEY, settings);
}
async function clearPermissionData() {
    await storage.remove(PERMISSION_DATA_KEY);
}
async function savePermissionData(data) {
    await storage.set(PERMISSION_DATA_KEY, data);
}
async function getPermissionData() {
    return await storage.get(PERMISSION_DATA_KEY);
}
const defaultSyncSettings = {
    role: "ADMIN",
    backendType: "CUSTOM_API",
    binId: "",
    masterKey: "",
    getUrl: "https://htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien/api/extension-config?key=carecheck_rules",
    postUrl: "https://htqlbenhvien.bvdklangson.com.vn:201/htqlbenhvien/api/extension-config?key=carecheck_rules",
    apiKey: "",
    syncInterval: 30
};
async function getSyncSettings() {
    const settings = await storage.get(SYNC_SETTINGS_KEY);
    return settings || defaultSyncSettings;
}
async function saveSyncSettings(settings) {
    await storage.set(SYNC_SETTINGS_KEY, settings);
}
async function fetchRulesAPI() {
    const rules = await storage.get(RULES_STORAGE_KEY);
    if (!rules || rules.length === 0) return [];
    return rules;
}
async function saveRuleAPI(rule) {
    const currentRules = await fetchRulesAPI();
    const existingIndex = currentRules.findIndex((r)=>r.id === rule.id);
    let updatedRules;
    if (existingIndex >= 0) {
        updatedRules = [
            ...currentRules
        ];
        updatedRules[existingIndex] = rule;
    } else updatedRules = [
        ...currentRules,
        rule
    ];
    await storage.set(RULES_STORAGE_KEY, updatedRules);
    // If ADMIN, push to cloud
    const settings = await getSyncSettings();
    if (settings.role === "ADMIN") await pushRulesToCloud(updatedRules, settings).catch((e)=>console.error(e));
    return true;
}
async function deleteRuleAPI(id) {
    const rules = await fetchRulesAPI();
    const updatedRules = rules.filter((r)=>r.id !== id);
    await storage.set(RULES_STORAGE_KEY, updatedRules);
    // If ADMIN, push to cloud
    const settings = await getSyncSettings();
    if (settings.role === "ADMIN") await pushRulesToCloud(updatedRules, settings).catch((e)=>console.error(e));
    return true;
}
async function saveAllRulesAPI(rules) {
    await storage.set(RULES_STORAGE_KEY, rules);
    // If ADMIN, push to cloud
    const settings = await getSyncSettings();
    if (settings.role === "ADMIN") await pushRulesToCloud(rules, settings).catch((e)=>console.error(e));
    return true;
}
async function fetchRulesFromCloud(settings) {
    const config = settings || await getSyncSettings();
    try {
        if (config.backendType === "JSONBIN") {
            if (!config.binId) {
                console.warn("[CareCheck] B\u1ecf qua \u0111\u1ed3ng b\u1ed9: Ch\u01b0a c\u1ea5u h\xecnh JSONBin Bin ID");
                return null;
            }
            const headers = {};
            if (config.masterKey) headers["X-Master-Key"] = config.masterKey;
            const res = await fetch(`https://api.jsonbin.io/v3/b/${config.binId}/latest`, {
                headers
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            return data.record;
        } else if (config.backendType === "CUSTOM_API") {
            if (!config.getUrl) {
                console.warn("[CareCheck] B\u1ecf qua \u0111\u1ed3ng b\u1ed9: Ch\u01b0a c\u1ea5u h\xecnh Custom API GET URL");
                return null;
            }
            const headers = {};
            if (config.apiKey) headers["Authorization"] = `Bearer ${config.apiKey}`;
            const res = await fetch(config.getUrl, {
                headers
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            return Array.isArray(data) ? data : data.rules || data.data || data; // Attempt to unpack
        }
    } catch (error) {
        console.error("[CareCheck] Error fetching from cloud:", error);
    }
    return null;
}
async function pushRulesToCloud(rules, settings) {
    const config = settings || await getSyncSettings();
    if (config.role !== "ADMIN") return; // Only Admin can push
    try {
        if (config.backendType === "JSONBIN") {
            if (!config.binId || !config.masterKey) {
                console.warn("[CareCheck] B\u1ecf qua Push Cloud: Ch\u01b0a c\u1ea5u h\xecnh JSONBin Bin ID ho\u1eb7c Master Key");
                return;
            }
            const res = await fetch(`https://api.jsonbin.io/v3/b/${config.binId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": config.masterKey
                },
                body: JSON.stringify(rules)
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        } else if (config.backendType === "CUSTOM_API") {
            if (!config.postUrl) {
                console.warn("[CareCheck] B\u1ecf qua Push Cloud: Ch\u01b0a c\u1ea5u h\xecnh Custom API POST URL");
                return;
            }
            const headers = {
                "Content-Type": "application/json"
            };
            if (config.apiKey) headers["Authorization"] = `Bearer ${config.apiKey}`;
            const res = await fetch(config.postUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(rules)
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        }
    } catch (error) {
        console.error("[CareCheck] Error pushing to cloud:", error);
    }
}

},{"@plasmohq/storage":"i0YkM","@parcel/transformer-js/src/esmodule-helpers.js":"iIXqM"}],"lBIrQ":[function(require,module,exports) {
module.exports = require("35611305e5af8b89")(require("bd022b4a9834e8ac").getBundleURL("gL9HQ") + "../../api.0f1922f4.js" + "?" + Date.now()).catch((err)=>{
    delete module.bundle.cache[module.id];
    throw err;
}).then(()=>module.bundle.root("a4xvA"));

},{"35611305e5af8b89":"9Ufja","bd022b4a9834e8ac":"4lLQs"}],"9Ufja":[function(require,module,exports) {
"use strict";
/* global __parcel__importScripts__:readonly*/ var cacheLoader = require("e18e0f4b8102d3ab");
module.exports = cacheLoader(function(bundle) {
    return new Promise(function(resolve, reject) {
        try {
            importScripts(bundle);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
});

},{"e18e0f4b8102d3ab":"8suT0"}],"8suT0":[function(require,module,exports) {
"use strict";
var cachedBundles = {};
var cachedPreloads = {};
var cachedPrefetches = {};
function getCache(type) {
    switch(type){
        case "preload":
            return cachedPreloads;
        case "prefetch":
            return cachedPrefetches;
        default:
            return cachedBundles;
    }
}
module.exports = function(loader, type) {
    return function(bundle) {
        var cache = getCache(type);
        if (cache[bundle]) return cache[bundle];
        return cache[bundle] = loader.apply(null, arguments).catch(function(e) {
            delete cache[bundle];
            throw e;
        });
    };
};

},{}],"4lLQs":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"fMGyO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _mainWorld = require("url:../../../contents/main_world");
var _mainWorldDefault = parcelHelpers.interopDefault(_mainWorld);
chrome.scripting.registerContentScripts([
    {
        "id": "contentsMainWorld",
        "js": [
            (0, _mainWorldDefault.default).split("/").pop().split("?")[0]
        ],
        "matches": [
            "<all_urls>"
        ],
        "world": "MAIN"
    }
]).catch((_)=>{});

},{"url:../../../contents/main_world":"em9UP","@parcel/transformer-js/src/esmodule-helpers.js":"iIXqM"}],"em9UP":[function(require,module,exports) {
module.exports = require("7ae97555dddf3207").getBundleURL("gL9HQ") + "../../main_world.5d952e1c.js" + "?" + Date.now();

},{"7ae97555dddf3207":"4lLQs"}]},["2ZPU2","8oeFb"], "8oeFb", "parcelRequire8c29")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDQUFDLENBQUMsSUFBSSxJQUFHLElBQUcsRUFBRztJQUFBLFFBQU0sT0FBTSxJQUFFLENBQUMsQ0FBQztRQUFJLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVEsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFBTyxFQUFFO0lBQUEsWUFBVSxPQUFNO1FBQUksTUFBTSxJQUFJLENBQUMsY0FBYztZQUFDO1NBQUU7SUFBQyxFQUFFO0lBQUEsZ0JBQWMsT0FBTTtRQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLFVBQVUsUUFBUSxDQUFBLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsS0FBSSxJQUFJLENBQUMsbUJBQWlCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87SUFBRSxFQUFFO0lBQUEsWUFBVTtRQUFVLElBQUksSUFBRSxNQUFNLElBQUksQ0FBQyxVQUFTLElBQUUsT0FBTyxLQUFLO1FBQUcsTUFBTSxJQUFJLENBQUMsV0FBVztJQUFFLEVBQUU7SUFBQSxRQUFNLENBQUE7UUFBSSxJQUFJLElBQUUsSUFBSSxDQUFDO1FBQW1CLE9BQU8sS0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRztJQUFDLEVBQUU7SUFBQSxDQUFDLENBQUMsR0FBQyxDQUFBO1FBQUksSUFBSSxJQUFJLEtBQUssRUFBRTtZQUFDLElBQUksSUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQUcsSUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLGVBQWEsSUFBSTtZQUFJLElBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUUsRUFBRSxPQUFLLEdBQUU7WUFBUyxJQUFJLElBQUUsQ0FBQyxHQUFFO2dCQUFLLElBQUcsTUFBSSxJQUFJLENBQUMsUUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBQU8sSUFBSSxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUFHLElBQUcsQ0FBQyxHQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsd0NBQXdDLEVBQUUsRUFBRSxDQUFDO2dCQUFFLFFBQVEsSUFBSTtvQkFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUFVLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUM7aUJBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFFLEVBQUU7b0JBQUksS0FBSSxJQUFJLEtBQUssRUFBRSxZQUFZLEVBQUU7d0JBQUMsVUFBUzt3QkFBRSxVQUFTO29CQUFDLEdBQUU7Z0JBQUU7WUFBRTtZQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLFlBQVksSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFFO2dCQUFDLGFBQVk7Z0JBQUUsVUFBUztZQUFDO1FBQUU7SUFBQyxFQUFFO0lBQUEsVUFBUSxDQUFBO1FBQUksSUFBSSxJQUFFLElBQUksQ0FBQztRQUFtQixPQUFPLEtBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUc7SUFBQyxFQUFFO0lBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFFLElBQUksSUFBSSxLQUFLLEVBQUU7WUFBQyxJQUFJLElBQUUsSUFBSSxDQUFDLGlCQUFpQixJQUFHLElBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBQyxJQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQUcsS0FBSSxDQUFBLEVBQUUsWUFBWSxPQUFPLElBQUcsRUFBRSxZQUFZLFNBQU8sS0FBSSxDQUFBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsZUFBZSxFQUFFLFNBQVEsQ0FBQztRQUFFO0lBQUM7SUFBQyxhQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO0lBQUEsQ0FBQyxDQUFDO1FBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsZUFBZSxLQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFPO0lBQUMsTUFBTSxRQUFRLENBQUMsRUFBQztRQUFDLE9BQU8sSUFBSSxDQUFDLElBQUk7SUFBRTtJQUFDLE1BQU0sU0FBUyxDQUFDLEVBQUM7UUFBQyxPQUFPLE1BQU0sSUFBSSxDQUFDLFFBQVE7SUFBRTtJQUFDLE1BQU0sUUFBUSxDQUFDLEVBQUMsQ0FBQyxFQUFDO1FBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxHQUFFO0lBQUU7SUFBQyxNQUFNLFNBQVMsQ0FBQyxFQUFDO1FBQUMsTUFBTSxNQUFNLElBQUksQ0FBQyxRQUFRO0lBQUU7SUFBQyxNQUFNLFdBQVcsQ0FBQyxFQUFDO1FBQUMsT0FBTyxJQUFJLENBQUMsT0FBTztJQUFFO0lBQUMsTUFBTSxZQUFZLENBQUMsRUFBQztRQUFDLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVztJQUFFO0FBQUMsR0FBRSxJQUFFLGNBQWM7SUFBRSxNQUFJLE9BQU07UUFBSSxJQUFJLElBQUUsSUFBSSxDQUFDLGlCQUFpQixJQUFHLElBQUUsTUFBTSxJQUFJLENBQUMsT0FBTztRQUFHLE9BQU8sSUFBSSxDQUFDLFdBQVc7SUFBRSxFQUFFO0lBQUEsVUFBUSxPQUFNO1FBQUksSUFBSSxJQUFFLEVBQUUsSUFBSSxJQUFJLENBQUMsbUJBQWtCLElBQUUsTUFBTSxJQUFJLENBQUMsV0FBVyxJQUFHLElBQUUsTUFBTSxRQUFRLElBQUksT0FBTyxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUM7UUFBYSxPQUFPLE9BQU8sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFFLEdBQUUsSUFBSyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUEsR0FBRyxDQUFDO0lBQUUsRUFBRTtJQUFBLE1BQUksT0FBTSxHQUFFO1FBQUssSUFBSSxJQUFFLElBQUksQ0FBQyxpQkFB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ZGVfbW9kdWxlcy9AcGxhc21vaHEvcGFyY2VsLXJ1bnRpbWUvZGlzdC9ydW50aW1lLWEyNDNhN2JhNWRkNjEyZmUuanMiLCIucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL2luZGV4LnRzIiwiYmFja2dyb3VuZC50cyIsIm5vZGVfbW9kdWxlcy9AcGxhc21vaHEvc3RvcmFnZS9kaXN0L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3BpZnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC90cmFuc2Zvcm1lci1qcy9zcmMvZXNtb2R1bGUtaGVscGVycy5qcyIsInNlcnZpY2VzL2FwaS50cyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL3J1bnRpbWUtMGQzZTMzOWFiMmY2MGUwNy5qcyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL2hlbHBlcnMvd29ya2VyL2pzLWxvYWRlci5qcyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL2hlbHBlcnMvY2FjaGVMb2FkZXIuanMiLCJub2RlX21vZHVsZXMvQHBhcmNlbC9ydW50aW1lLWpzL2xpYi9oZWxwZXJzL2J1bmRsZS11cmwuanMiLCIucGxhc21vL3N0YXRpYy9iYWNrZ3JvdW5kL21haW4td29ybGQtc2NyaXB0cy50cyIsIm5vZGVfbW9kdWxlcy9AcGFyY2VsL3J1bnRpbWUtanMvbGliL3J1bnRpbWUtZmI0YzczMGZmNDExMGY3OS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdT1nbG9iYWxUaGlzLnByb2Nlc3M/LmFyZ3Z8fFtdO3ZhciBoPSgpPT5nbG9iYWxUaGlzLnByb2Nlc3M/LmVudnx8e307dmFyIEI9bmV3IFNldCh1KSxfPWU9PkIuaGFzKGUpLEc9dS5maWx0ZXIoZT0+ZS5zdGFydHNXaXRoKFwiLS1cIikmJmUuaW5jbHVkZXMoXCI9XCIpKS5tYXAoZT0+ZS5zcGxpdChcIj1cIikpLnJlZHVjZSgoZSxbdCxvXSk9PihlW3RdPW8sZSkse30pO3ZhciBVPV8oXCItLWRyeS1ydW5cIiksZz0oKT0+XyhcIi0tdmVyYm9zZVwiKXx8aCgpLlZFUkJPU0U9PT1cInRydWVcIixOPWcoKTt2YXIgbT0oZT1cIlwiLC4uLnQpPT5jb25zb2xlLmxvZyhlLnBhZEVuZCg5KSxcInxcIiwuLi50KTt2YXIgeT0oLi4uZSk9PmNvbnNvbGUuZXJyb3IoXCJcXHV7MUY1MzR9IEVSUk9SXCIucGFkRW5kKDkpLFwifFwiLC4uLmUpLHY9KC4uLmUpPT5tKFwiXFx1ezFGNTM1fSBJTkZPXCIsLi4uZSksZj0oLi4uZSk9Pm0oXCJcXHV7MUY3RTB9IFdBUk5cIiwuLi5lKSxNPTAsaT0oLi4uZSk9PmcoKSYmbShgXFx1ezFGN0UxfSAke00rK31gLC4uLmUpO3ZhciBiPSgpPT57bGV0IGU9Z2xvYmFsVGhpcy5icm93c2VyPy5ydW50aW1lfHxnbG9iYWxUaGlzLmNocm9tZT8ucnVudGltZSx0PSgpPT5zZXRJbnRlcnZhbChlLmdldFBsYXRmb3JtSW5mbywyNGUzKTtlLm9uU3RhcnR1cC5hZGRMaXN0ZW5lcih0KSx0KCl9O3ZhciBuPXtcImlzQ29udGVudFNjcmlwdFwiOmZhbHNlLFwiaXNCYWNrZ3JvdW5kXCI6dHJ1ZSxcImlzUmVhY3RcIjpmYWxzZSxcInJ1bnRpbWVzXCI6W1wiYmFja2dyb3VuZC1zZXJ2aWNlLXJ1bnRpbWVcIl0sXCJob3N0XCI6XCJsb2NhbGhvc3RcIixcInBvcnRcIjoxODE1LFwiZW50cnlGaWxlUGF0aFwiOlwiRDpcXFxcMS5Qcm9qZWN0QlZES0xTXFxcXGV4dGVuc2lvbnNTb2Z0d2FyZVxcXFxjb2RlXFxcXC5wbGFzbW9cXFxcc3RhdGljXFxcXGJhY2tncm91bmRcXFxcaW5kZXgudHNcIixcImJ1bmRsZUlkXCI6XCJjMzM4OTA4ZTcwNGM5MWYxXCIsXCJlbnZIYXNoXCI6XCJkOTlhNWZmYTU3YWNkNjM4XCIsXCJ2ZXJib3NlXCI6XCJmYWxzZVwiLFwic2VjdXJlXCI6ZmFsc2UsXCJzZXJ2ZXJQb3J0XCI6MTAxMn07bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEPW4uYnVuZGxlSWQ7Z2xvYmFsVGhpcy5wcm9jZXNzPXthcmd2OltdLGVudjp7VkVSQk9TRTpuLnZlcmJvc2V9fTt2YXIgRD1tb2R1bGUuYnVuZGxlLk1vZHVsZTtmdW5jdGlvbiBIKGUpe0QuY2FsbCh0aGlzLGUpLHRoaXMuaG90PXtkYXRhOm1vZHVsZS5idW5kbGUuaG90RGF0YVtlXSxfYWNjZXB0Q2FsbGJhY2tzOltdLF9kaXNwb3NlQ2FsbGJhY2tzOltdLGFjY2VwdDpmdW5jdGlvbih0KXt0aGlzLl9hY2NlcHRDYWxsYmFja3MucHVzaCh0fHxmdW5jdGlvbigpe30pfSxkaXNwb3NlOmZ1bmN0aW9uKHQpe3RoaXMuX2Rpc3Bvc2VDYWxsYmFja3MucHVzaCh0KX19LG1vZHVsZS5idW5kbGUuaG90RGF0YVtlXT12b2lkIDB9bW9kdWxlLmJ1bmRsZS5Nb2R1bGU9SDttb2R1bGUuYnVuZGxlLmhvdERhdGE9e307dmFyIGM9Z2xvYmFsVGhpcy5icm93c2VyfHxnbG9iYWxUaGlzLmNocm9tZXx8bnVsbDtmdW5jdGlvbiBSKCl7cmV0dXJuIW4uaG9zdHx8bi5ob3N0PT09XCIwLjAuMC4wXCI/bG9jYXRpb24ucHJvdG9jb2wuaW5kZXhPZihcImh0dHBcIik9PT0wP2xvY2F0aW9uLmhvc3RuYW1lOlwibG9jYWxob3N0XCI6bi5ob3N0fWZ1bmN0aW9uIHgoKXtyZXR1cm4hbi5ob3N0fHxuLmhvc3Q9PT1cIjAuMC4wLjBcIj9cImxvY2FsaG9zdFwiOm4uaG9zdH1mdW5jdGlvbiBkKCl7cmV0dXJuIG4ucG9ydHx8bG9jYXRpb24ucG9ydH12YXIgUD1cIl9fcGxhc21vX3J1bnRpbWVfcGFnZV9cIixTPVwiX19wbGFzbW9fcnVudGltZV9zY3JpcHRfXCI7dmFyIE89YCR7bi5zZWN1cmU/XCJodHRwc1wiOlwiaHR0cFwifTovLyR7UigpfToke2QoKX0vYDthc3luYyBmdW5jdGlvbiBrKGU9MTQ3MCl7Zm9yKDs7KXRyeXthd2FpdCBmZXRjaChPKTticmVha31jYXRjaHthd2FpdCBuZXcgUHJvbWlzZShvPT5zZXRUaW1lb3V0KG8sZSkpfX1pZihjLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS5tYW5pZmVzdF92ZXJzaW9uPT09Myl7bGV0IGU9Yy5ydW50aW1lLmdldFVSTChcIi9fX3BsYXNtb19obXJfcHJveHlfXz91cmw9XCIpO2dsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcihcImZldGNoXCIsZnVuY3Rpb24odCl7bGV0IG89dC5yZXF1ZXN0LnVybDtpZihvLnN0YXJ0c1dpdGgoZSkpe2xldCBzPW5ldyBVUkwoZGVjb2RlVVJJQ29tcG9uZW50KG8uc2xpY2UoZS5sZW5ndGgpKSk7cy5ob3N0bmFtZT09PW4uaG9zdCYmcy5wb3J0PT09YCR7bi5wb3J0fWA/KHMuc2VhcmNoUGFyYW1zLnNldChcInRcIixEYXRlLm5vdygpLnRvU3RyaW5nKCkpLHQucmVzcG9uZFdpdGgoZmV0Y2gocykudGhlbihyPT5uZXcgUmVzcG9uc2Uoci5ib2R5LHtoZWFkZXJzOntcIkNvbnRlbnQtVHlwZVwiOnIuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/P1widGV4dC9qYXZhc2NyaXB0XCJ9fSkpKSk6dC5yZXNwb25kV2l0aChuZXcgUmVzcG9uc2UoXCJQbGFzbW8gSE1SXCIse3N0YXR1czoyMDAsc3RhdHVzVGV4dDpcIlRlc3RpbmdcIn0pKX19KX1mdW5jdGlvbiBFKGUsdCl7bGV0e21vZHVsZXM6b309ZTtyZXR1cm4gbz8hIW9bdF06ITF9ZnVuY3Rpb24gQyhlPWQoKSl7bGV0IHQ9eCgpO3JldHVybmAke24uc2VjdXJlfHxsb2NhdGlvbi5wcm90b2NvbD09PVwiaHR0cHM6XCImJiEvbG9jYWxob3N0fDEyNy4wLjAuMXwwLjAuMC4wLy50ZXN0KHQpP1wid3NzXCI6XCJ3c1wifTovLyR7dH06JHtlfS9gfWZ1bmN0aW9uIEwoZSl7dHlwZW9mIGUubWVzc2FnZT09XCJzdHJpbmdcIiYmeShcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIitlLm1lc3NhZ2UpfWZ1bmN0aW9uIFQoZSl7aWYodHlwZW9mIGdsb2JhbFRoaXMuV2ViU29ja2V0PlwidVwiKXJldHVybjtsZXQgdD1uZXcgV2ViU29ja2V0KEMoTnVtYmVyKGQoKSkrMSkpO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYXN5bmMgZnVuY3Rpb24obyl7bGV0IHM9SlNPTi5wYXJzZShvLmRhdGEpO2F3YWl0IGUocyl9KSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLEwpLHR9ZnVuY3Rpb24gQShlKXtpZih0eXBlb2YgZ2xvYmFsVGhpcy5XZWJTb2NrZXQ+XCJ1XCIpcmV0dXJuO2xldCB0PW5ldyBXZWJTb2NrZXQoQygpKTtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGFzeW5jIGZ1bmN0aW9uKG8pe2xldCBzPUpTT04ucGFyc2Uoby5kYXRhKTtpZihzLnR5cGU9PT1cInVwZGF0ZVwiJiZhd2FpdCBlKHMuYXNzZXRzKSxzLnR5cGU9PT1cImVycm9yXCIpZm9yKGxldCByIG9mIHMuZGlhZ25vc3RpY3MuYW5zaSl7bGV0IGw9ci5jb2RlZnJhbWV8fHIuc3RhY2s7ZihcIltwbGFzbW8vcGFyY2VsLXJ1bnRpbWVdOiBcIityLm1lc3NhZ2UrYFxuYCtsK2BcblxuYCtyLmhpbnRzLmpvaW4oYFxuYCkpfX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsTCksdC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCgpPT57dihgW3BsYXNtby9wYXJjZWwtcnVudGltZV06IENvbm5lY3RlZCB0byBITVIgc2VydmVyIGZvciAke24uZW50cnlGaWxlUGF0aH1gKX0pLHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PntmKGBbcGxhc21vL3BhcmNlbC1ydW50aW1lXTogQ29ubmVjdGlvbiB0byB0aGUgSE1SIHNlcnZlciBpcyBjbG9zZWQgZm9yICR7bi5lbnRyeUZpbGVQYXRofWApfSksdH12YXIgdz1tb2R1bGUuYnVuZGxlLnBhcmVudCxhPXtidWlsZFJlYWR5OiExLGJnQ2hhbmdlZDohMSxjc0NoYW5nZWQ6ITEscGFnZUNoYW5nZWQ6ITEsc2NyaXB0UG9ydHM6bmV3IFNldCxwYWdlUG9ydHM6bmV3IFNldH07YXN5bmMgZnVuY3Rpb24gcChlPSExKXtpZihlfHxhLmJ1aWxkUmVhZHkmJmEucGFnZUNoYW5nZWQpe2koXCJCR1NXIFJ1bnRpbWUgLSByZWxvYWRpbmcgUGFnZVwiKTtmb3IobGV0IHQgb2YgYS5wYWdlUG9ydHMpdC5wb3N0TWVzc2FnZShudWxsKX1pZihlfHxhLmJ1aWxkUmVhZHkmJihhLmJnQ2hhbmdlZHx8YS5jc0NoYW5nZWQpKXtpKFwiQkdTVyBSdW50aW1lIC0gcmVsb2FkaW5nIENTXCIpO2xldCB0PWF3YWl0IGM/LnRhYnMucXVlcnkoe2FjdGl2ZTohMH0pO2ZvcihsZXQgbyBvZiBhLnNjcmlwdFBvcnRzKXtsZXQgcz10LnNvbWUocj0+ci5pZD09PW8uc2VuZGVyLnRhYj8uaWQpO28ucG9zdE1lc3NhZ2Uoe19fcGxhc21vX2NzX2FjdGl2ZV90YWJfXzpzfSl9Yy5ydW50aW1lLnJlbG9hZCgpfX1pZighd3x8IXcuaXNQYXJjZWxSZXF1aXJlKXtiKCk7bGV0IGU9QShhc3luYyB0PT57aShcIkJHU1cgUnVudGltZSAtIE9uIEhNUiBVcGRhdGVcIiksYS5iZ0NoYW5nZWR8fD10LmZpbHRlcihzPT5zLmVudkhhc2g9PT1uLmVudkhhc2gpLnNvbWUocz0+RShtb2R1bGUuYnVuZGxlLHMuaWQpKTtsZXQgbz10LmZpbmQocz0+cy50eXBlPT09XCJqc29uXCIpO2lmKG8pe2xldCBzPW5ldyBTZXQodC5tYXAobD0+bC5pZCkpLHI9T2JqZWN0LnZhbHVlcyhvLmRlcHNCeUJ1bmRsZSkubWFwKGw9Pk9iamVjdC52YWx1ZXMobCkpLmZsYXQoKTthLmJnQ2hhbmdlZHx8PXIuZXZlcnkobD0+cy5oYXMobCkpfXAoKX0pO2UuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e2xldCB0PXNldEludGVydmFsKCgpPT5lLnNlbmQoXCJwaW5nXCIpLDI0ZTMpO2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsKCk9PmNsZWFySW50ZXJ2YWwodCkpfSksZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIixhc3luYygpPT57YXdhaXQgaygpLHAoITApfSl9VChhc3luYyBlPT57c3dpdGNoKGkoXCJCR1NXIFJ1bnRpbWUgLSBPbiBCdWlsZCBSZXBhY2thZ2VkXCIpLGUudHlwZSl7Y2FzZVwiYnVpbGRfcmVhZHlcIjp7YS5idWlsZFJlYWR5fHw9ITAscCgpO2JyZWFrfWNhc2VcImNzX2NoYW5nZWRcIjp7YS5jc0NoYW5nZWR8fD0hMCxwKCk7YnJlYWt9fX0pO2MucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoZnVuY3Rpb24oZSl7bGV0IHQ9ZS5uYW1lLnN0YXJ0c1dpdGgoUCksbz1lLm5hbWUuc3RhcnRzV2l0aChTKTtpZih0fHxvKXtsZXQgcz10P2EucGFnZVBvcnRzOmEuc2NyaXB0UG9ydHM7cy5hZGQoZSksZS5vbkRpc2Nvbm5lY3QuYWRkTGlzdGVuZXIoKCk9PntzLmRlbGV0ZShlKX0pLGUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uKHIpe2koXCJCR1NXIFJ1bnRpbWUgLSBPbiBzb3VyY2UgY2hhbmdlZFwiLHIpLHIuX19wbGFzbW9fY3NfY2hhbmdlZF9fJiYoYS5jc0NoYW5nZWR8fD0hMCksci5fX3BsYXNtb19wYWdlX2NoYW5nZWRfXyYmKGEucGFnZUNoYW5nZWR8fD0hMCkscCgpfSl9fSk7Yy5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3BsYXNtb19mdWxsX3JlbG9hZF9fJiYoaShcIkJHU1cgUnVudGltZSAtIE9uIHRvcC1sZXZlbCBjb2RlIGNoYW5nZWRcIikscCgpKSwhMH0pO1xuIiwiaW1wb3J0IFwiLi4vLi4vLi4vYmFja2dyb3VuZFwiXG5pbXBvcnQgXCIuL21haW4td29ybGQtc2NyaXB0c1wiIiwiaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCJAcGxhc21vaHEvc3RvcmFnZVwiXG5pbXBvcnQgeyBnZXRTeW5jU2V0dGluZ3MsIGZldGNoUnVsZXNGcm9tQ2xvdWQsIHNhdmVBbGxSdWxlc0FQSSB9IGZyb20gXCIuL3NlcnZpY2VzL2FwaVwiXG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSh7IGFyZWE6IFwibG9jYWxcIiB9KVxuY29uc3QgUlVMRVNfU1RPUkFHRV9LRVkgPSBcIm1vY2tfZGJfcnVsZXNcIlxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2UsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gXCJPUEVOX09QVElPTlNcIikge1xuICAgIGNocm9tZS5ydW50aW1lLm9wZW5PcHRpb25zUGFnZSgpO1xuICAgIC8vIMOJcCB0csOsbmggZHV54buHdCB0cuG7jyB0aOG6s25nIHbhu4EgdGFiIE9wdGlvbnMgdsOgIMSR4bqpeSBj4butYSBz4buVIMSRw7MgbMOqbiB0csOqbiBjw7luZ1xuICAgIGNvbnN0IG9wdGlvbnNVcmwgPSBjaHJvbWUucnVudGltZS5nZXRVUkwoXCJvcHRpb25zLmh0bWxcIik7XG4gICAgY2hyb21lLnRhYnMucXVlcnkoeyB1cmw6IG9wdGlvbnNVcmwgKyBcIipcIiB9LCAodGFicykgPT4ge1xuICAgICAgaWYgKHRhYnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjaHJvbWUudGFicy51cGRhdGUodGFic1swXS5pZCEsIHsgYWN0aXZlOiB0cnVlIH0pO1xuICAgICAgICBjaHJvbWUud2luZG93cy51cGRhdGUodGFic1swXS53aW5kb3dJZCwgeyBmb2N1c2VkOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIFxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IFwiVVBEQVRFX1NZTkNfQUxBUk1cIikge1xuICAgIHNldHVwU3luY0FsYXJtKCk7XG4gICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgfVxuICBcbiAgaWYgKG1lc3NhZ2UuYWN0aW9uID09PSBcIkZPUkNFX1NZTkNfUlVMRVNcIikge1xuICAgIGNvbnNvbGUubG9nKFwiW0NhcmVDaGVja10gTmjhuq1uIMSRxrDhu6NjIGzhu4duaCDDqXAgxJHhu5NuZyBi4buZIHThu6sgQ29udGVudCBTY3JpcHQgKE7DunQgxJDEg25nIG5o4bqtcClcIik7XG4gICAgYXV0b1N5bmNSdWxlcygpO1xuICAgIHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gIH1cblxuICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IFwiRkVUQ0hfQVBJX1BFUk1JU1NJT05TXCIpIHtcbiAgICBjb25zb2xlLmxvZyhcIltDYXJlQ2hlY2tdIEJhY2tncm91bmQ6IELhuq90IMSR4bqndSBs4bqleSBxdXnhu4FuIGNobyB1c2VyXCIsIG1lc3NhZ2UudXNlcm5hbWUpO1xuICAgIGZldGNoQW5kU2F2ZVBlcm1pc3Npb25zKG1lc3NhZ2UudXNlcm5hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gS2VlcCBtZXNzYWdlIGNoYW5uZWwgb3BlbiBmb3IgYXN5bmNcbiAgfVxuXG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gXCJDTEVBUl9BUElfUEVSTUlTU0lPTlNcIikge1xuICAgIGNvbnNvbGUubG9nKFwiW0NhcmVDaGVja10gQmFja2dyb3VuZDogWMOzYSBxdXnhu4FuIMSRxINuZyBuaOG6rXAgY8WpXCIpO1xuICAgIGltcG9ydChcIi4vc2VydmljZXMvYXBpXCIpLnRoZW4oYXBpID0+IHtcbiAgICAgIGFwaS5jbGVhclBlcm1pc3Npb25EYXRhKCkudGhlbigoKSA9PiBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChtZXNzYWdlLmFjdGlvbiA9PT0gXCJQUk9YWV9GRVRDSFwiKSB7XG4gICAgY29uc29sZS5sb2coXCJbQ2FyZUNoZWNrXSBCYWNrZ3JvdW5kOiBC4bqvdCDEkeG6p3UgUHJveHkgRmV0Y2ggVVJMOlwiLCBtZXNzYWdlLnVybCk7XG4gICAgZmV0Y2gobWVzc2FnZS51cmwpXG4gICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgIC50aGVuKGFzeW5jIGRhdGEgPT4ge1xuICAgICAgICBpZiAobWVzc2FnZS5zYXZlVG9TdG9yYWdlS2V5KSB7XG4gICAgICAgICAgYXdhaXQgc3RvcmFnZS5zZXQobWVzc2FnZS5zYXZlVG9TdG9yYWdlS2V5LCBkYXRhKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gQmFja2dyb3VuZDogxJDDoyBsxrB1IEFQSSBkYXRhIHbDoG8gYmnhur9uIFske21lc3NhZ2Uuc2F2ZVRvU3RvcmFnZUtleX1dIGFuIHRvw6BuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lc3NhZ2Uuc2F2ZVBhcmFtVG9TdG9yYWdlS2V5ICYmIG1lc3NhZ2UucGFyYW1WYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYXdhaXQgc3RvcmFnZS5zZXQobWVzc2FnZS5zYXZlUGFyYW1Ub1N0b3JhZ2VLZXksIG1lc3NhZ2UucGFyYW1WYWx1ZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coYFtDYXJlQ2hlY2tdIEJhY2tncm91bmQ6IMSQw6MgbMawdSBQYXJhbSB2YWx1ZSB2w6BvIGJp4bq/biBbJHttZXNzYWdlLnNhdmVQYXJhbVRvU3RvcmFnZUtleX1dIGFuIHRvw6BuYCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VuZFJlc3BvbnNlKHsgc3VjY2VzczogdHJ1ZSwgZGF0YSB9KTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHNlbmRSZXNwb25zZSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogZXJyLm1lc3NhZ2UgfHwgU3RyaW5nKGVycikgfSkpO1xuICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIG1lc3NhZ2UgY2hhbm5lbCBvcGVuIGZvciBhc3luY1xuICB9XG59KVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEFuZFNhdmVQZXJtaXNzaW9ucyh1c2VybmFtZTogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBnZXRQZXJtaXNzaW9uU2V0dGluZ3MsIHNhdmVQZXJtaXNzaW9uRGF0YSB9ID0gYXdhaXQgaW1wb3J0KFwiLi9zZXJ2aWNlcy9hcGlcIik7XG4gICAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRQZXJtaXNzaW9uU2V0dGluZ3MoKTtcbiAgICBcbiAgICBpZiAoIXNldHRpbmdzLmVuYWJsZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0NhcmVDaGVja10gUGjDom4gcXV54buBbiBBUEkgxJFhbmcgdOG6r3QuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBwZXJtaXNzaW9uRGF0YTogYW55W10gPSBbXTtcblxuICAgIGlmIChzZXR0aW5ncy5hcGlVcmwpIHtcbiAgICAgIC8vIEPDsyBsaW5rIEFQSSB0aOG6rXQgLT4gRmV0Y2hcbiAgICAgIGNvbnN0IHRhcmdldFVybCA9IHNldHRpbmdzLmFwaVVybC5pbmNsdWRlcygnPycpIFxuICAgICAgICA/IGAke3NldHRpbmdzLmFwaVVybH0ke3VzZXJuYW1lfWAgXG4gICAgICAgIDogYCR7c2V0dGluZ3MuYXBpVXJsfT91c2VyPSR7dXNlcm5hbWV9YDtcbiAgICAgIFxuICAgICAgY29uc29sZS5sb2coXCJbQ2FyZUNoZWNrXSDEkGFuZyBn4buNaSBBUEkgdGjhuq10OlwiLCB0YXJnZXRVcmwpO1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godGFyZ2V0VXJsKTtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcGVybWlzc2lvbkRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW0NhcmVDaGVja10gTOG7l2kgZ+G7jWkgQVBJLCBtw6MgbOG7l2k6XCIsIHJlcy5zdGF0dXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBLSMOUTkcgQ8OTIExJTksgQVBJIC0+IETDmU5HIEdJ4bqiIEzhuqxQIChNT0NLIERBVEEpXG4gICAgICBjb25zb2xlLmxvZyhcIltDYXJlQ2hlY2tdIMSQYW5nIHPhu60gZOG7pW5nIE1vY2sgRGF0YSBjaG8gdXNlclwiLCB1c2VybmFtZSk7XG4gICAgICBpZiAodXNlcm5hbWUgPT09IFwiZGtscy5idmRrbHNcIikge1xuICAgICAgICBwZXJtaXNzaW9uRGF0YSA9IFtcbiAgICAgICAgICB7IFwibWFfZGljaF92dVwiOiBcIjIyLjAwMTUuMTMwOFwiIH0sIC8vIMSQxrDhu6NjIHBow6lwXG4gICAgICAgICAgeyBcIm1hX2RpY2hfdnVcIjogXCIyMi4wMTU0LjE3MzVcIiB9ICAvLyDEkMaw4bujYyBwaMOpcFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVMOgaSBraG/huqNuIGtow6FjIHRow6wgZ2nhuqMgduG7nSBjaOG7iSBjw7MgcXV54buBbiBsw6BtIDEgZOG7i2NoIHbhu6VcbiAgICAgICAgcGVybWlzc2lvbkRhdGEgPSBbXG4gICAgICAgICAgeyBcIm1hX2RpY2hfdnVcIjogXCIwMy4wMTkxLjE1MTBcIiB9IFxuICAgICAgICBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEzGsHUgdsOgbyBTdG9yYWdlXG4gICAgYXdhaXQgc2F2ZVBlcm1pc3Npb25EYXRhKHBlcm1pc3Npb25EYXRhKTtcbiAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gxJDDoyBsxrB1ICR7cGVybWlzc2lvbkRhdGEubGVuZ3RofSBxdXnhu4FuIGNobyB1c2VyICR7dXNlcm5hbWV9YCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbQ2FyZUNoZWNrXSBM4buXaSBraGkgdOG6o2kgcXV54buBbiBBUEk6XCIsIGVycik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBTeW5jQWxhcm0oKSB7XG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U3luY1NldHRpbmdzKCk7XG4gIGNvbnN0IGludGVydmFsID0gc2V0dGluZ3Muc3luY0ludGVydmFsIHx8IDMwO1xuICBcbiAgLy8gWMOzYSBhbGFybSBjxakgbuG6v3UgY8OzXG4gIGNocm9tZS5hbGFybXMuY2xlYXIoXCJzeW5jUnVsZXNBbGFybVwiLCAoKSA9PiB7XG4gICAgLy8gVOG6oW8gbOG6oWkgYWxhcm0gbeG7m2kgduG7m2kgY2h1IGvhu7MgbeG7m2lcbiAgICBjaHJvbWUuYWxhcm1zLmNyZWF0ZShcInN5bmNSdWxlc0FsYXJtXCIsIHtcbiAgICAgIHBlcmlvZEluTWludXRlczogaW50ZXJ2YWxcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhgW0NhcmVDaGVja10gxJDDoyBjw6BpIMSR4bq3dCBjaHUga+G7syDEkeG7k25nIGLhu5kgbmfhuqdtOiAke2ludGVydmFsfSBwaMO6dGApO1xuICB9KTtcbn1cblxuLy8gWMOzYSBkw7JuZyBuw6B5IOG7nyB0b3AtbGV2ZWwgxJHhu4MgdHLDoW5oIHJlc2V0IGFsYXJtIG3hu5dpIGtoaSBTZXJ2aWNlIFdvcmtlciB0aOG7qWMgZOG6rXlcbi8vIHNldHVwU3luY0FsYXJtKCk7XG5cbmNocm9tZS5hbGFybXMub25BbGFybS5hZGRMaXN0ZW5lcigoYWxhcm0pID0+IHtcbiAgaWYgKGFsYXJtLm5hbWUgPT09IFwic3luY1J1bGVzQWxhcm1cIikge1xuICAgIGF1dG9TeW5jUnVsZXMoKTtcbiAgfVxufSk7XG5cbi8vIENo4bqheSBt4buZdCBs4bqnbiBraGkgRXh0ZW5zaW9uIHbhu6thIMSRxrDhu6NjIGxvYWRcbmNocm9tZS5ydW50aW1lLm9uU3RhcnR1cC5hZGRMaXN0ZW5lcigoKSA9PiB7XG4gIHNldHVwU3luY0FsYXJtKCk7XG4gIGF1dG9TeW5jUnVsZXMoKTtcbn0pO1xuY2hyb21lLnJ1bnRpbWUub25JbnN0YWxsZWQuYWRkTGlzdGVuZXIoKCkgPT4ge1xuICBzZXR1cFN5bmNBbGFybSgpO1xuICBhdXRvU3luY1J1bGVzKCk7XG59KTtcblxuYXN5bmMgZnVuY3Rpb24gYXV0b1N5bmNSdWxlcygpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFN5bmNTZXR0aW5ncygpO1xuICAgIFxuICAgIC8vIE7hur91IGzDoCBBZG1pbiwgYWRtaW4gY8OzIHRo4buDIHThu7EgYuG6pW0gxJHhu5NuZyBi4buZIHRo4bunIGPDtG5nLCBraMO0bmcgbmjhuqV0IHRoaeG6v3QgcGjhuqNpIGvDqW8gbmfhuqdtIGxpw6puIHThu6VjXG4gICAgLy8gTmjGsG5nIMSR4buDIGFuIHRvw6BuIGNobyBtw6F5IGNvbiAoQ0xJRU5UKSwgYuG6r3QgYnXhu5ljIHBo4bqjaSBrw6lvIG5n4bqnbS5cbiAgICBpZiAoc2V0dGluZ3Mucm9sZSAhPT0gJ0NMSUVOVCcpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0NhcmVDaGVja10gQmFja2dyb3VuZDogQuG7jyBxdWEgQXV0by1TeW5jIHbDrCDEkcOieSBsw6AgbcOheSBBZG1pbi5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCJbQ2FyZUNoZWNrXSBCYWNrZ3JvdW5kOiBC4bqvdCDEkeG6p3UgdOG7sSDEkeG7mW5nIMSR4buTbmcgYuG7mSBsdeG6rXQgdOG7qyBDbG91ZC4uLlwiKTtcbiAgICBjb25zdCBmZXRjaGVkUnVsZXMgPSBhd2FpdCBmZXRjaFJ1bGVzRnJvbUNsb3VkKHNldHRpbmdzKTtcbiAgICBcbiAgICBpZiAoZmV0Y2hlZFJ1bGVzICYmIEFycmF5LmlzQXJyYXkoZmV0Y2hlZFJ1bGVzKSkge1xuICAgICAgYXdhaXQgc2F2ZUFsbFJ1bGVzQVBJKGZldGNoZWRSdWxlcyk7XG4gICAgICBjb25zb2xlLmxvZyhcIltDYXJlQ2hlY2tdIEJhY2tncm91bmQ6IMSQw6MgxJHhu5NuZyBi4buZIHRow6BuaCBjw7RuZ1wiLCBmZXRjaGVkUnVsZXMubGVuZ3RoLCBcImx14bqtdC5cIik7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW0NhcmVDaGVja10gQmFja2dyb3VuZDogTOG7l2kgxJHhu5NuZyBi4buZIG5n4bqnbVwiLCBlcnIpO1xuICB9XG59XG4iLCJpbXBvcnQgbSBmcm9tXCJwaWZ5XCI7dmFyIGw9KCk9Pnt0cnl7bGV0IGU9KGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQpLm1hdGNoKC8ob3BlcmF8Y2hyb21lfHNhZmFyaXxmaXJlZm94fG1zaWV8dHJpZGVudCg/PVxcLykpXFwvP1xccyooXFxkKykvaSl8fFtdO2lmKGVbMV09PT1cIkNocm9tZVwiKXJldHVybiBwYXJzZUludChlWzJdKTwxMDB8fGdsb2JhbFRoaXMuY2hyb21lLnJ1bnRpbWU/LmdldE1hbmlmZXN0KCk/Lm1hbmlmZXN0X3ZlcnNpb249PT0yfWNhdGNoe3JldHVybiExfXJldHVybiExfTt2YXIgbz1jbGFzc3sjcjsjdDtnZXQgcHJpbWFyeUNsaWVudCgpe3JldHVybiB0aGlzLiN0fSNlO2dldCBzZWNvbmRhcnlDbGllbnQoKXtyZXR1cm4gdGhpcy4jZX0jYTtnZXQgYXJlYSgpe3JldHVybiB0aGlzLiNhfWdldCBoYXNXZWJBcGkoKXt0cnl7cmV0dXJuIHR5cGVvZiB3aW5kb3c8XCJ1XCImJiEhd2luZG93LmxvY2FsU3RvcmFnZX1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5lcnJvcihlKSwhMX19I3M9bmV3IE1hcDsjaTtnZXQgY29waWVkS2V5U2V0KCl7cmV0dXJuIHRoaXMuI2l9aXNDb3BpZWQ9ZT0+dGhpcy5oYXNXZWJBcGkmJih0aGlzLmFsbENvcGllZHx8dGhpcy5jb3BpZWRLZXlTZXQuaGFzKGUpKTsjbj0hMTtnZXQgYWxsQ29waWVkKCl7cmV0dXJuIHRoaXMuI259Z2V0RXh0U3RvcmFnZUFwaT0oKT0+Z2xvYmFsVGhpcy5icm93c2VyPy5zdG9yYWdlfHxnbG9iYWxUaGlzLmNocm9tZT8uc3RvcmFnZTtnZXQgaGFzRXh0ZW5zaW9uQXBpKCl7dHJ5e3JldHVybiEhdGhpcy5nZXRFeHRTdG9yYWdlQXBpKCl9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUuZXJyb3IoZSksITF9fWlzV2F0Y2hTdXBwb3J0ZWQ9KCk9PnRoaXMuaGFzRXh0ZW5zaW9uQXBpO2tleU5hbWVzcGFjZT1cIlwiO2lzVmFsaWRLZXk9ZT0+ZS5zdGFydHNXaXRoKHRoaXMua2V5TmFtZXNwYWNlKTtnZXROYW1lc3BhY2VkS2V5PWU9PmAke3RoaXMua2V5TmFtZXNwYWNlfSR7ZX1gO2dldFVubmFtZXNwYWNlZEtleT1lPT5lLnNsaWNlKHRoaXMua2V5TmFtZXNwYWNlLmxlbmd0aCk7c2VyZGU9e3NlcmlhbGl6ZXI6SlNPTi5zdHJpbmdpZnksZGVzZXJpYWxpemVyOkpTT04ucGFyc2V9O2NvbnN0cnVjdG9yKHthcmVhOmU9XCJzeW5jXCIsYWxsQ29waWVkOnQ9ITEsY29waWVkS2V5TGlzdDpzPVtdLHNlcmRlOnI9e319PXt9KXt0aGlzLnNldENvcGllZEtleVNldChzKSx0aGlzLiNhPWUsdGhpcy4jbj10LHRoaXMuc2VyZGU9ey4uLnRoaXMuc2VyZGUsLi4ucn07dHJ5e3RoaXMuaGFzV2ViQXBpJiYodHx8cy5sZW5ndGg+MCkmJih0aGlzLiNlPXdpbmRvdy5sb2NhbFN0b3JhZ2UpfWNhdGNoe310cnl7dGhpcy5oYXNFeHRlbnNpb25BcGkmJih0aGlzLiNyPXRoaXMuZ2V0RXh0U3RvcmFnZUFwaSgpLGwoKT90aGlzLiN0PW0odGhpcy4jclt0aGlzLmFyZWFdLHtleGNsdWRlOltcImdldEJ5dGVzSW5Vc2VcIl0sZXJyb3JGaXJzdDohMX0pOnRoaXMuI3Q9dGhpcy4jclt0aGlzLmFyZWFdKX1jYXRjaHt9fXNldENvcGllZEtleVNldChlKXt0aGlzLiNpPW5ldyBTZXQoZSl9cmF3R2V0QWxsPSgpPT50aGlzLiN0Py5nZXQoKTtnZXRBbGw9YXN5bmMoKT0+e2xldCBlPWF3YWl0IHRoaXMucmF3R2V0QWxsKCk7cmV0dXJuIE9iamVjdC5lbnRyaWVzKGUpLmZpbHRlcigoW3RdKT0+dGhpcy5pc1ZhbGlkS2V5KHQpKS5yZWR1Y2UoKHQsW3Mscl0pPT4odFt0aGlzLmdldFVubmFtZXNwYWNlZEtleShzKV09cix0KSx7fSl9O2NvcHk9YXN5bmMgZT0+e2xldCB0PWU9PT12b2lkIDA7aWYoIXQmJiF0aGlzLmNvcGllZEtleVNldC5oYXMoZSl8fCF0aGlzLmFsbENvcGllZHx8IXRoaXMuaGFzRXh0ZW5zaW9uQXBpKXJldHVybiExO2xldCBzPXRoaXMuYWxsQ29waWVkP2F3YWl0IHRoaXMucmF3R2V0QWxsKCk6YXdhaXQgdGhpcy4jdC5nZXQoKHQ/Wy4uLnRoaXMuY29waWVkS2V5U2V0XTpbZV0pLm1hcCh0aGlzLmdldE5hbWVzcGFjZWRLZXkpKTtpZighcylyZXR1cm4hMTtsZXQgcj0hMTtmb3IobGV0IGEgaW4gcyl7bGV0IGk9c1thXSxuPXRoaXMuI2U/LmdldEl0ZW0oYSk7dGhpcy4jZT8uc2V0SXRlbShhLGkpLHJ8fD1pIT09bn1yZXR1cm4gcn07cmF3R2V0PWFzeW5jIGU9Pihhd2FpdCB0aGlzLnJhd0dldE1hbnkoW2VdKSlbZV07cmF3R2V0TWFueT1hc3luYyBlPT50aGlzLmhhc0V4dGVuc2lvbkFwaT9hd2FpdCB0aGlzLiN0LmdldChlKTplLmZpbHRlcih0aGlzLmlzQ29waWVkKS5yZWR1Y2UoKHQscyk9Pih0W3NdPXRoaXMuI2U/LmdldEl0ZW0ocyksdCkse30pO3Jhd1NldD1hc3luYyhlLHQpPT5hd2FpdCB0aGlzLnJhd1NldE1hbnkoe1tlXTp0fSk7cmF3U2V0TWFueT1hc3luYyBlPT4odGhpcy4jZSYmT2JqZWN0LmVudHJpZXMoZSkuZmlsdGVyKChbdF0pPT50aGlzLmlzQ29waWVkKHQpKS5mb3JFYWNoKChbdCxzXSk9PnRoaXMuI2Uuc2V0SXRlbSh0LHMpKSx0aGlzLmhhc0V4dGVuc2lvbkFwaSYmYXdhaXQgdGhpcy4jdC5zZXQoZSksbnVsbCk7Y2xlYXI9YXN5bmMoZT0hMSk9PntlJiZ0aGlzLiNlPy5jbGVhcigpLGF3YWl0IHRoaXMuI3QuY2xlYXIoKX07cmF3UmVtb3ZlPWFzeW5jIGU9Pnthd2FpdCB0aGlzLnJhd1JlbW92ZU1hbnkoW2VdKX07cmF3UmVtb3ZlTWFueT1hc3luYyBlPT57dGhpcy4jZSYmZS5maWx0ZXIodGhpcy5pc0NvcGllZCkuZm9yRWFjaCh0PT50aGlzLiNlLnJlbW92ZUl0ZW0odCkpLHRoaXMuaGFzRXh0ZW5zaW9uQXBpJiZhd2FpdCB0aGlzLiN0LnJlbW92ZShlKX07cmVtb3ZlQWxsPWFzeW5jKCk9PntsZXQgZT1hd2FpdCB0aGlzLmdldEFsbCgpLHQ9T2JqZWN0LmtleXMoZSk7YXdhaXQgdGhpcy5yZW1vdmVNYW55KHQpfTt3YXRjaD1lPT57bGV0IHQ9dGhpcy5pc1dhdGNoU3VwcG9ydGVkKCk7cmV0dXJuIHQmJnRoaXMuI28oZSksdH07I289ZT0+e2ZvcihsZXQgdCBpbiBlKXtsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkodCkscj10aGlzLiNzLmdldChzKT8uY2FsbGJhY2tTZXR8fG5ldyBTZXQ7aWYoci5hZGQoZVt0XSksci5zaXplPjEpY29udGludWU7bGV0IGE9KGksbik9PntpZihuIT09dGhpcy5hcmVhfHwhaVtzXSlyZXR1cm47bGV0IGg9dGhpcy4jcy5nZXQocyk7aWYoIWgpdGhyb3cgbmV3IEVycm9yKGBTdG9yYWdlIGNvbW1zIGRvZXMgbm90IGV4aXN0IGZvciBuc0tleTogJHtzfWApO1Byb21pc2UuYWxsKFt0aGlzLnBhcnNlVmFsdWUoaVtzXS5uZXdWYWx1ZSksdGhpcy5wYXJzZVZhbHVlKGlbc10ub2xkVmFsdWUpXSkudGhlbigoW3ksZF0pPT57Zm9yKGxldCBwIG9mIGguY2FsbGJhY2tTZXQpcCh7bmV3VmFsdWU6eSxvbGRWYWx1ZTpkfSxuKX0pfTt0aGlzLiNyLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihhKSx0aGlzLiNzLnNldChzLHtjYWxsYmFja1NldDpyLGxpc3RlbmVyOmF9KX19O3Vud2F0Y2g9ZT0+e2xldCB0PXRoaXMuaXNXYXRjaFN1cHBvcnRlZCgpO3JldHVybiB0JiZ0aGlzLiNjKGUpLHR9OyNjKGUpe2ZvcihsZXQgdCBpbiBlKXtsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkodCkscj1lW3RdLGE9dGhpcy4jcy5nZXQocyk7YSYmKGEuY2FsbGJhY2tTZXQuZGVsZXRlKHIpLGEuY2FsbGJhY2tTZXQuc2l6ZT09PTAmJih0aGlzLiNzLmRlbGV0ZShzKSx0aGlzLiNyLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihhLmxpc3RlbmVyKSkpfX11bndhdGNoQWxsPSgpPT50aGlzLiNoKCk7I2goKXt0aGlzLiNzLmZvckVhY2goKHtsaXN0ZW5lcjplfSk9PnRoaXMuI3Iub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKGUpKSx0aGlzLiNzLmNsZWFyKCl9YXN5bmMgZ2V0SXRlbShlKXtyZXR1cm4gdGhpcy5nZXQoZSl9YXN5bmMgZ2V0SXRlbXMoZSl7cmV0dXJuIGF3YWl0IHRoaXMuZ2V0TWFueShlKX1hc3luYyBzZXRJdGVtKGUsdCl7YXdhaXQgdGhpcy5zZXQoZSx0KX1hc3luYyBzZXRJdGVtcyhlKXthd2FpdCBhd2FpdCB0aGlzLnNldE1hbnkoZSl9YXN5bmMgcmVtb3ZlSXRlbShlKXtyZXR1cm4gdGhpcy5yZW1vdmUoZSl9YXN5bmMgcmVtb3ZlSXRlbXMoZSl7cmV0dXJuIGF3YWl0IHRoaXMucmVtb3ZlTWFueShlKX19LGc9Y2xhc3MgZXh0ZW5kcyBve2dldD1hc3luYyBlPT57bGV0IHQ9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpLHM9YXdhaXQgdGhpcy5yYXdHZXQodCk7cmV0dXJuIHRoaXMucGFyc2VWYWx1ZShzKX07Z2V0TWFueT1hc3luYyBlPT57bGV0IHQ9ZS5tYXAodGhpcy5nZXROYW1lc3BhY2VkS2V5KSxzPWF3YWl0IHRoaXMucmF3R2V0TWFueSh0KSxyPWF3YWl0IFByb21pc2UuYWxsKE9iamVjdC52YWx1ZXMocykubWFwKHRoaXMucGFyc2VWYWx1ZSkpO3JldHVybiBPYmplY3Qua2V5cyhzKS5yZWR1Y2UoKGEsaSxuKT0+KGFbdGhpcy5nZXRVbm5hbWVzcGFjZWRLZXkoaSldPXJbbl0sYSkse30pfTtzZXQ9YXN5bmMoZSx0KT0+e2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKSxyPXRoaXMuc2VyZGUuc2VyaWFsaXplcih0KTtyZXR1cm4gdGhpcy5yYXdTZXQocyxyKX07c2V0TWFueT1hc3luYyBlPT57bGV0IHQ9T2JqZWN0LmVudHJpZXMoZSkucmVkdWNlKChzLFtyLGFdKT0+KHNbdGhpcy5nZXROYW1lc3BhY2VkS2V5KHIpXT10aGlzLnNlcmRlLnNlcmlhbGl6ZXIoYSkscykse30pO3JldHVybiBhd2FpdCB0aGlzLnJhd1NldE1hbnkodCl9O3JlbW92ZT1hc3luYyBlPT57bGV0IHQ9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpO3JldHVybiB0aGlzLnJhd1JlbW92ZSh0KX07cmVtb3ZlTWFueT1hc3luYyBlPT57bGV0IHQ9ZS5tYXAodGhpcy5nZXROYW1lc3BhY2VkS2V5KTtyZXR1cm4gYXdhaXQgdGhpcy5yYXdSZW1vdmVNYW55KHQpfTtzZXROYW1lc3BhY2U9ZT0+e3RoaXMua2V5TmFtZXNwYWNlPWV9O3BhcnNlVmFsdWU9YXN5bmMgZT0+e3RyeXtpZihlIT09dm9pZCAwKXJldHVybiB0aGlzLnNlcmRlLmRlc2VyaWFsaXplcihlKX1jYXRjaCh0KXtjb25zb2xlLmVycm9yKHQpfX19O2V4cG9ydHtvIGFzIEJhc2VTdG9yYWdlLGcgYXMgU3RvcmFnZX07XG4iLCJjb25zdCBwcm9jZXNzRnVuY3Rpb24gPSAoZnVuY3Rpb25fLCBvcHRpb25zLCBwcm94eSwgdW53cmFwcGVkKSA9PiBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRjb25zdCBQID0gb3B0aW9ucy5wcm9taXNlTW9kdWxlO1xuXG5cdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKG9wdGlvbnMubXVsdGlBcmdzKSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2goKC4uLnJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAob3B0aW9ucy5lcnJvckZpcnN0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdFswXSkge1xuXHRcdFx0XHRcdFx0cmVqZWN0KHJlc3VsdCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5zaGlmdCgpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5lcnJvckZpcnN0KSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2goKGVycm9yLCByZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2gocmVzb2x2ZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXMgPT09IHByb3h5ID8gdW53cmFwcGVkIDogdGhpcztcblx0XHRSZWZsZWN0LmFwcGx5KGZ1bmN0aW9uXywgc2VsZiwgYXJndW1lbnRzXyk7XG5cdH0pO1xufTtcblxuY29uc3QgZmlsdGVyQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwaWZ5KGlucHV0LCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSB7XG5cdFx0ZXhjbHVkZTogWy8uKyg/OlN5bmN8U3RyZWFtKSQvXSxcblx0XHRlcnJvckZpcnN0OiB0cnVlLFxuXHRcdHByb21pc2VNb2R1bGU6IFByb21pc2UsXG5cdFx0Li4ub3B0aW9ucyxcblx0fTtcblxuXHRjb25zdCBvYmplY3RUeXBlID0gdHlwZW9mIGlucHV0O1xuXHRpZiAoIShpbnB1dCAhPT0gbnVsbCAmJiAob2JqZWN0VHlwZSA9PT0gJ29iamVjdCcgfHwgb2JqZWN0VHlwZSA9PT0gJ2Z1bmN0aW9uJykpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgaW5wdXRcXGAgdG8gYmUgYSBcXGBGdW5jdGlvblxcYCBvciBcXGBPYmplY3RcXGAsIGdvdCBcXGAke2lucHV0ID09PSBudWxsID8gJ251bGwnIDogb2JqZWN0VHlwZX1cXGBgKTtcblx0fVxuXG5cdGNvbnN0IGZpbHRlciA9ICh0YXJnZXQsIGtleSkgPT4ge1xuXHRcdGxldCBjYWNoZWQgPSBmaWx0ZXJDYWNoZS5nZXQodGFyZ2V0KTtcblxuXHRcdGlmICghY2FjaGVkKSB7XG5cdFx0XHRjYWNoZWQgPSB7fTtcblx0XHRcdGZpbHRlckNhY2hlLnNldCh0YXJnZXQsIGNhY2hlZCk7XG5cdFx0fVxuXG5cdFx0aWYgKGtleSBpbiBjYWNoZWQpIHtcblx0XHRcdHJldHVybiBjYWNoZWRba2V5XTtcblx0XHR9XG5cblx0XHRjb25zdCBtYXRjaCA9IHBhdHRlcm4gPT4gKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJyB8fCB0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykgPyBrZXkgPT09IHBhdHRlcm4gOiBwYXR0ZXJuLnRlc3Qoa2V5KTtcblx0XHRjb25zdCBkZXNjcmlwdG9yID0gUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuXHRcdGNvbnN0IHdyaXRhYmxlT3JDb25maWd1cmFibGVPd24gPSAoZGVzY3JpcHRvciA9PT0gdW5kZWZpbmVkIHx8IGRlc2NyaXB0b3Iud3JpdGFibGUgfHwgZGVzY3JpcHRvci5jb25maWd1cmFibGUpO1xuXHRcdGNvbnN0IGluY2x1ZGVkID0gb3B0aW9ucy5pbmNsdWRlID8gb3B0aW9ucy5pbmNsdWRlLnNvbWUoZWxlbWVudCA9PiBtYXRjaChlbGVtZW50KSkgOiAhb3B0aW9ucy5leGNsdWRlLnNvbWUoZWxlbWVudCA9PiBtYXRjaChlbGVtZW50KSk7XG5cdFx0Y29uc3Qgc2hvdWxkRmlsdGVyID0gaW5jbHVkZWQgJiYgd3JpdGFibGVPckNvbmZpZ3VyYWJsZU93bjtcblx0XHRjYWNoZWRba2V5XSA9IHNob3VsZEZpbHRlcjtcblx0XHRyZXR1cm4gc2hvdWxkRmlsdGVyO1xuXHR9O1xuXG5cdGNvbnN0IGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eShpbnB1dCwge1xuXHRcdGFwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykge1xuXHRcdFx0Y29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KHRhcmdldCk7XG5cblx0XHRcdGlmIChjYWNoZWQpIHtcblx0XHRcdFx0cmV0dXJuIFJlZmxlY3QuYXBwbHkoY2FjaGVkLCB0aGlzQXJnLCBhcmdzKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcGlmaWVkID0gb3B0aW9ucy5leGNsdWRlTWFpbiA/IHRhcmdldCA6IHByb2Nlc3NGdW5jdGlvbih0YXJnZXQsIG9wdGlvbnMsIHByb3h5LCB0YXJnZXQpO1xuXHRcdFx0Y2FjaGUuc2V0KHRhcmdldCwgcGlmaWVkKTtcblx0XHRcdHJldHVybiBSZWZsZWN0LmFwcGx5KHBpZmllZCwgdGhpc0FyZywgYXJncyk7XG5cdFx0fSxcblxuXHRcdGdldCh0YXJnZXQsIGtleSkge1xuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSB0YXJnZXRba2V5XTtcblxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1leHRlbmQtbmF0aXZlL25vLXVzZS1leHRlbmQtbmF0aXZlXG5cdFx0XHRpZiAoIWZpbHRlcih0YXJnZXQsIGtleSkgfHwgcHJvcGVydHkgPT09IEZ1bmN0aW9uLnByb3RvdHlwZVtrZXldKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wZXJ0eTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KHByb3BlcnR5KTtcblxuXHRcdFx0aWYgKGNhY2hlZCkge1xuXHRcdFx0XHRyZXR1cm4gY2FjaGVkO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGNvbnN0IHBpZmllZCA9IHByb2Nlc3NGdW5jdGlvbihwcm9wZXJ0eSwgb3B0aW9ucywgcHJveHksIHRhcmdldCk7XG5cdFx0XHRcdGNhY2hlLnNldChwcm9wZXJ0eSwgcGlmaWVkKTtcblx0XHRcdFx0cmV0dXJuIHBpZmllZDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXHRcdH0sXG5cdH0pO1xuXG5cdHJldHVybiBwcm94eTtcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiIsImltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tIFwiQHBsYXNtb2hxL3N0b3JhZ2VcIlxuaW1wb3J0IHR5cGUgeyBSdWxlIH0gZnJvbSBcIi4uL2ZlYXR1cmVzL2FkbWluL1J1bGVMaXN0XCJcblxuY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKHsgYXJlYTogXCJsb2NhbFwiIH0pXG5jb25zdCBSVUxFU19TVE9SQUdFX0tFWSA9IFwibW9ja19kYl9ydWxlc1wiXG5jb25zdCBTWU5DX1NFVFRJTkdTX0tFWSA9IFwiY2xvdWRfc3luY19zZXR0aW5nc1wiXG5cbmV4cG9ydCB0eXBlIFN5bmNSb2xlID0gXCJBRE1JTlwiIHwgXCJDTElFTlRcIjtcbmV4cG9ydCB0eXBlIEJhY2tlbmRUeXBlID0gXCJKU09OQklOXCIgfCBcIkNVU1RPTV9BUElcIjtcblxuZXhwb3J0IGludGVyZmFjZSBTeW5jU2V0dGluZ3Mge1xuICByb2xlOiBTeW5jUm9sZTtcbiAgYmFja2VuZFR5cGU6IEJhY2tlbmRUeXBlO1xuICBcbiAgLy8gRm9yIEpTT05CaW5cbiAgYmluSWQ/OiBzdHJpbmc7XG4gIG1hc3RlcktleT86IHN0cmluZztcbiAgXG4gIC8vIEZvciBDdXN0b20gQVBJXG4gIGdldFVybD86IHN0cmluZztcbiAgcG9zdFVybD86IHN0cmluZztcbiAgYXBpS2V5Pzogc3RyaW5nO1xuICBcbiAgLy8gR2VuZXJhbFxuICBzeW5jSW50ZXJ2YWw/OiBudW1iZXI7IC8vIENodSBr4buzIMSR4buTbmcgYuG7mSBuZ+G6p20gKHBow7p0KVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQSMOCTiBRVVnhu4BOIENI4buIIMSQ4buKTkggQVBJIFNFVFRJTkdTXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgaW50ZXJmYWNlIFBlcm1pc3Npb25TZXR0aW5ncyB7XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG4gIGFwaVVybDogc3RyaW5nO1xuICBsb2dpbkJ0blNlbGVjdG9yOiBzdHJpbmc7XG4gIHVzZXJuYW1lU2VsZWN0b3I6IHN0cmluZztcbiAgc2VydmljZUNvZGVTdWZmaXg6IHN0cmluZztcbiAgaWNkSW5wdXRTZWxlY3Rvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgZGVmYXVsdFBlcm1pc3Npb25TZXR0aW5nczogUGVybWlzc2lvblNldHRpbmdzID0ge1xuICBlbmFibGVkOiBmYWxzZSxcbiAgYXBpVXJsOiBcIlwiLFxuICBsb2dpbkJ0blNlbGVjdG9yOiBcIiNidG5Mb2dpbiwgYnV0dG9uW3R5cGU9J3N1Ym1pdCddXCIsXG4gIHVzZXJuYW1lU2VsZWN0b3I6IFwiaW5wdXRbbmFtZT0ndXNlcm5hbWUnXSwgaW5wdXRbdHlwZT0ndGV4dCddLCAjdXNlcm5hbWVcIixcbiAgc2VydmljZUNvZGVTdWZmaXg6IFwiX01BRElDSFZVXCIsXG4gIGljZElucHV0U2VsZWN0b3I6IFwiXCJcbn1cblxuY29uc3QgUEVSTUlTU0lPTl9TRVRUSU5HU19LRVkgPSBcImFkdmFuY2VkX3Blcm1pc3Npb25fc2V0dGluZ3NcIjtcbmNvbnN0IFBFUk1JU1NJT05fREFUQV9LRVkgPSBcImFkdmFuY2VkX3Blcm1pc3Npb25fZGF0YVwiOyAvLyBOxqFpIGzGsHUgbeG6o25nIG3DoyBk4buLY2ggduG7pVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UGVybWlzc2lvblNldHRpbmdzKCk6IFByb21pc2U8UGVybWlzc2lvblNldHRpbmdzPiB7XG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgc3RvcmFnZS5nZXQ8UGVybWlzc2lvblNldHRpbmdzPihQRVJNSVNTSU9OX1NFVFRJTkdTX0tFWSk7XG4gIHJldHVybiBzZXR0aW5ncyB8fCBkZWZhdWx0UGVybWlzc2lvblNldHRpbmdzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pc3Npb25TZXR0aW5ncyhzZXR0aW5nczogUGVybWlzc2lvblNldHRpbmdzKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IHN0b3JhZ2Uuc2V0KFBFUk1JU1NJT05fU0VUVElOR1NfS0VZLCBzZXR0aW5ncyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjbGVhclBlcm1pc3Npb25EYXRhKCk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBzdG9yYWdlLnJlbW92ZShQRVJNSVNTSU9OX0RBVEFfS0VZKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVQZXJtaXNzaW9uRGF0YShkYXRhOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgc3RvcmFnZS5zZXQoUEVSTUlTU0lPTl9EQVRBX0tFWSwgZGF0YSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQZXJtaXNzaW9uRGF0YSgpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gYXdhaXQgc3RvcmFnZS5nZXQoUEVSTUlTU0lPTl9EQVRBX0tFWSk7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0U3luY1NldHRpbmdzOiBTeW5jU2V0dGluZ3MgPSB7XG4gIHJvbGU6IFwiQURNSU5cIixcbiAgYmFja2VuZFR5cGU6IFwiQ1VTVE9NX0FQSVwiLFxuICBiaW5JZDogXCJcIixcbiAgbWFzdGVyS2V5OiBcIlwiLFxuICBnZXRVcmw6IFwiaHR0cHM6Ly9odHFsYmVuaHZpZW4uYnZka2xhbmdzb24uY29tLnZuOjIwMS9odHFsYmVuaHZpZW4vYXBpL2V4dGVuc2lvbi1jb25maWc/a2V5PWNhcmVjaGVja19ydWxlc1wiLFxuICBwb3N0VXJsOiBcImh0dHBzOi8vaHRxbGJlbmh2aWVuLmJ2ZGtsYW5nc29uLmNvbS52bjoyMDEvaHRxbGJlbmh2aWVuL2FwaS9leHRlbnNpb24tY29uZmlnP2tleT1jYXJlY2hlY2tfcnVsZXNcIixcbiAgYXBpS2V5OiBcIlwiLFxuICBzeW5jSW50ZXJ2YWw6IDMwXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTeW5jU2V0dGluZ3MoKTogUHJvbWlzZTxTeW5jU2V0dGluZ3M+IHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBzdG9yYWdlLmdldDxTeW5jU2V0dGluZ3M+KFNZTkNfU0VUVElOR1NfS0VZKTtcbiAgcmV0dXJuIHNldHRpbmdzIHx8IGRlZmF1bHRTeW5jU2V0dGluZ3M7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlU3luY1NldHRpbmdzKHNldHRpbmdzOiBTeW5jU2V0dGluZ3MpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgc3RvcmFnZS5zZXQoU1lOQ19TRVRUSU5HU19LRVksIHNldHRpbmdzKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTE9DQUwgU1RPUkFHRSBBUEkgKEZvciBVSSBhbmQgQ29udGVudCBTY3JpcHQgcmVhZGluZylcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoUnVsZXNBUEkoKTogUHJvbWlzZTxSdWxlW10+IHtcbiAgY29uc3QgcnVsZXMgPSBhd2FpdCBzdG9yYWdlLmdldDxSdWxlW10+KFJVTEVTX1NUT1JBR0VfS0VZKVxuICBpZiAoIXJ1bGVzIHx8IHJ1bGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gcnVsZXNcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVSdWxlQVBJKHJ1bGU6IFJ1bGUpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgY3VycmVudFJ1bGVzID0gYXdhaXQgZmV0Y2hSdWxlc0FQSSgpXG4gIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBjdXJyZW50UnVsZXMuZmluZEluZGV4KHIgPT4gci5pZCA9PT0gcnVsZS5pZClcbiAgbGV0IHVwZGF0ZWRSdWxlcztcbiAgaWYgKGV4aXN0aW5nSW5kZXggPj0gMCkge1xuICAgIHVwZGF0ZWRSdWxlcyA9IFsuLi5jdXJyZW50UnVsZXNdXG4gICAgdXBkYXRlZFJ1bGVzW2V4aXN0aW5nSW5kZXhdID0gcnVsZVxuICB9IGVsc2Uge1xuICAgIHVwZGF0ZWRSdWxlcyA9IFsuLi5jdXJyZW50UnVsZXMsIHJ1bGVdXG4gIH1cbiAgXG4gIGF3YWl0IHN0b3JhZ2Uuc2V0KFJVTEVTX1NUT1JBR0VfS0VZLCB1cGRhdGVkUnVsZXMpXG4gIFxuICAvLyBJZiBBRE1JTiwgcHVzaCB0byBjbG91ZFxuICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFN5bmNTZXR0aW5ncygpO1xuICBpZiAoc2V0dGluZ3Mucm9sZSA9PT0gXCJBRE1JTlwiKSB7XG4gICAgYXdhaXQgcHVzaFJ1bGVzVG9DbG91ZCh1cGRhdGVkUnVsZXMsIHNldHRpbmdzKS5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xuICB9XG4gIFxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUnVsZUFQSShpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IHJ1bGVzID0gYXdhaXQgZmV0Y2hSdWxlc0FQSSgpXG4gIGNvbnN0IHVwZGF0ZWRSdWxlcyA9IHJ1bGVzLmZpbHRlcihyID0+IHIuaWQgIT09IGlkKVxuICBhd2FpdCBzdG9yYWdlLnNldChSVUxFU19TVE9SQUdFX0tFWSwgdXBkYXRlZFJ1bGVzKVxuICBcbiAgLy8gSWYgQURNSU4sIHB1c2ggdG8gY2xvdWRcbiAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTeW5jU2V0dGluZ3MoKTtcbiAgaWYgKHNldHRpbmdzLnJvbGUgPT09IFwiQURNSU5cIikge1xuICAgIGF3YWl0IHB1c2hSdWxlc1RvQ2xvdWQodXBkYXRlZFJ1bGVzLCBzZXR0aW5ncykuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAgfVxuICBcbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVBbGxSdWxlc0FQSShydWxlczogUnVsZVtdKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGF3YWl0IHN0b3JhZ2Uuc2V0KFJVTEVTX1NUT1JBR0VfS0VZLCBydWxlcylcbiAgXG4gIC8vIElmIEFETUlOLCBwdXNoIHRvIGNsb3VkXG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U3luY1NldHRpbmdzKCk7XG4gIGlmIChzZXR0aW5ncy5yb2xlID09PSBcIkFETUlOXCIpIHtcbiAgICBhd2FpdCBwdXNoUnVsZXNUb0Nsb3VkKHJ1bGVzLCBzZXR0aW5ncykuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKTtcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBDTE9VRCBTWU5DIEFQSVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hSdWxlc0Zyb21DbG91ZChzZXR0aW5ncz86IFN5bmNTZXR0aW5ncyk6IFByb21pc2U8UnVsZVtdIHwgbnVsbD4ge1xuICBjb25zdCBjb25maWcgPSBzZXR0aW5ncyB8fCBhd2FpdCBnZXRTeW5jU2V0dGluZ3MoKTtcbiAgXG4gIHRyeSB7XG4gICAgaWYgKGNvbmZpZy5iYWNrZW5kVHlwZSA9PT0gXCJKU09OQklOXCIpIHtcbiAgICAgIGlmICghY29uZmlnLmJpbklkKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltDYXJlQ2hlY2tdIELhu48gcXVhIMSR4buTbmcgYuG7mTogQ2jGsGEgY+G6pXUgaMOsbmggSlNPTkJpbiBCaW4gSURcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgaGVhZGVyczogSGVhZGVyc0luaXQgPSB7fTtcbiAgICAgIGlmIChjb25maWcubWFzdGVyS2V5KSBoZWFkZXJzW1wiWC1NYXN0ZXItS2V5XCJdID0gY29uZmlnLm1hc3RlcktleTtcbiAgICAgIFxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmpzb25iaW4uaW8vdjMvYi8ke2NvbmZpZy5iaW5JZH0vbGF0ZXN0YCwgeyBoZWFkZXJzIH0pO1xuICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhLnJlY29yZCBhcyBSdWxlW107XG4gICAgfSBcbiAgICBlbHNlIGlmIChjb25maWcuYmFja2VuZFR5cGUgPT09IFwiQ1VTVE9NX0FQSVwiKSB7XG4gICAgICBpZiAoIWNvbmZpZy5nZXRVcmwpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW0NhcmVDaGVja10gQuG7jyBxdWEgxJHhu5NuZyBi4buZOiBDaMawYSBj4bqldSBow6xuaCBDdXN0b20gQVBJIEdFVCBVUkxcIik7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgaGVhZGVyczogSGVhZGVyc0luaXQgPSB7fTtcbiAgICAgIGlmIChjb25maWcuYXBpS2V5KSBoZWFkZXJzW1wiQXV0aG9yaXphdGlvblwiXSA9IGBCZWFyZXIgJHtjb25maWcuYXBpS2V5fWA7XG4gICAgICBcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGNvbmZpZy5nZXRVcmwsIHsgaGVhZGVycyB9KTtcbiAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIHN0YXR1czogJHtyZXMuc3RhdHVzfWApO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiAoZGF0YS5ydWxlcyB8fCBkYXRhLmRhdGEgfHwgZGF0YSk7IC8vIEF0dGVtcHQgdG8gdW5wYWNrXG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbQ2FyZUNoZWNrXSBFcnJvciBmZXRjaGluZyBmcm9tIGNsb3VkOlwiLCBlcnJvcik7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwdXNoUnVsZXNUb0Nsb3VkKHJ1bGVzOiBSdWxlW10sIHNldHRpbmdzPzogU3luY1NldHRpbmdzKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGNvbmZpZyA9IHNldHRpbmdzIHx8IGF3YWl0IGdldFN5bmNTZXR0aW5ncygpO1xuICBpZiAoY29uZmlnLnJvbGUgIT09IFwiQURNSU5cIikgcmV0dXJuOyAvLyBPbmx5IEFkbWluIGNhbiBwdXNoXG4gIFxuICB0cnkge1xuICAgIGlmIChjb25maWcuYmFja2VuZFR5cGUgPT09IFwiSlNPTkJJTlwiKSB7XG4gICAgICBpZiAoIWNvbmZpZy5iaW5JZCB8fCAhY29uZmlnLm1hc3RlcktleSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbQ2FyZUNoZWNrXSBC4buPIHF1YSBQdXNoIENsb3VkOiBDaMawYSBj4bqldSBow6xuaCBKU09OQmluIEJpbiBJRCBob+G6t2MgTWFzdGVyIEtleVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuanNvbmJpbi5pby92My9iLyR7Y29uZmlnLmJpbklkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgJ1gtTWFzdGVyLUtleSc6IGNvbmZpZy5tYXN0ZXJLZXlcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocnVsZXMpXG4gICAgICB9KTtcbiAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIHN0YXR1czogJHtyZXMuc3RhdHVzfWApO1xuICAgIH0gXG4gICAgZWxzZSBpZiAoY29uZmlnLmJhY2tlbmRUeXBlID09PSBcIkNVU1RPTV9BUElcIikge1xuICAgICAgaWYgKCFjb25maWcucG9zdFVybCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbQ2FyZUNoZWNrXSBC4buPIHF1YSBQdXNoIENsb3VkOiBDaMawYSBj4bqldSBow6xuaCBDdXN0b20gQVBJIFBPU1QgVVJMXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9O1xuICAgICAgaWYgKGNvbmZpZy5hcGlLZXkpIGhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gYEJlYXJlciAke2NvbmZpZy5hcGlLZXl9YDtcbiAgICAgIFxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goY29uZmlnLnBvc3RVcmwsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsIC8vIE9yIFBVVCwgdHlwaWNhbGx5IFBPU1Qgb3IgUFVUIHdvcmtzXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJ1bGVzKVxuICAgICAgfSk7XG4gICAgICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBzdGF0dXM6ICR7cmVzLnN0YXR1c31gKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltDYXJlQ2hlY2tdIEVycm9yIHB1c2hpbmcgdG8gY2xvdWQ6XCIsIGVycm9yKTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAocmVxdWlyZShcIi4vaGVscGVycy93b3JrZXIvanMtbG9hZGVyXCIpKHJlcXVpcmUoJy4vaGVscGVycy9idW5kbGUtdXJsJykuZ2V0QnVuZGxlVVJMKCdnTDlIUScpICsgXCIuLi8uLi9hcGkuMGYxOTIyZjQuanNcIiArIFwiP1wiICsgRGF0ZS5ub3coKSkuY2F0Y2goZXJyID0+IHtkZWxldGUgbW9kdWxlLmJ1bmRsZS5jYWNoZVttb2R1bGUuaWRdOyB0aHJvdyBlcnI7fSkpLnRoZW4oKCkgPT4gbW9kdWxlLmJ1bmRsZS5yb290KCdhNHh2QScpKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogZ2xvYmFsIF9fcGFyY2VsX19pbXBvcnRTY3JpcHRzX186cmVhZG9ubHkqL1xudmFyIGNhY2hlTG9hZGVyID0gcmVxdWlyZSgnLi4vY2FjaGVMb2FkZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUxvYWRlcihmdW5jdGlvbiAoYnVuZGxlKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdHJ5IHtcbiAgICAgIF9fcGFyY2VsX19pbXBvcnRTY3JpcHRzX18oYnVuZGxlKTtcblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJlamVjdChlKTtcbiAgICB9XG4gIH0pO1xufSk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjYWNoZWRCdW5kbGVzID0ge307XG52YXIgY2FjaGVkUHJlbG9hZHMgPSB7fTtcbnZhciBjYWNoZWRQcmVmZXRjaGVzID0ge307XG5cbmZ1bmN0aW9uIGdldENhY2hlKHR5cGUpIHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAncHJlbG9hZCc6XG4gICAgICByZXR1cm4gY2FjaGVkUHJlbG9hZHM7XG5cbiAgICBjYXNlICdwcmVmZXRjaCc6XG4gICAgICByZXR1cm4gY2FjaGVkUHJlZmV0Y2hlcztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gY2FjaGVkQnVuZGxlcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsb2FkZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChidW5kbGUpIHtcbiAgICB2YXIgY2FjaGUgPSBnZXRDYWNoZSh0eXBlKTtcblxuICAgIGlmIChjYWNoZVtidW5kbGVdKSB7XG4gICAgICByZXR1cm4gY2FjaGVbYnVuZGxlXTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FjaGVbYnVuZGxlXSA9IGxvYWRlci5hcHBseShudWxsLCBhcmd1bWVudHMpLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICBkZWxldGUgY2FjaGVbYnVuZGxlXTtcbiAgICAgIHRocm93IGU7XG4gICAgfSk7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYnVuZGxlVVJMID0ge307XG5cbmZ1bmN0aW9uIGdldEJ1bmRsZVVSTENhY2hlZChpZCkge1xuICB2YXIgdmFsdWUgPSBidW5kbGVVUkxbaWRdO1xuXG4gIGlmICghdmFsdWUpIHtcbiAgICB2YWx1ZSA9IGdldEJ1bmRsZVVSTCgpO1xuICAgIGJ1bmRsZVVSTFtpZF0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0QnVuZGxlVVJMKCkge1xuICB0cnkge1xuICAgIHRocm93IG5ldyBFcnJvcigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB2YXIgbWF0Y2hlcyA9ICgnJyArIGVyci5zdGFjaykubWF0Y2goLyhodHRwcz98ZmlsZXxmdHB8KGNocm9tZXxtb3p8c2FmYXJpLXdlYiktZXh0ZW5zaW9uKTpcXC9cXC9bXilcXG5dKy9nKTtcblxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAvLyBUaGUgZmlyc3QgdHdvIHN0YWNrIGZyYW1lcyB3aWxsIGJlIHRoaXMgZnVuY3Rpb24gYW5kIGdldEJ1bmRsZVVSTENhY2hlZC5cbiAgICAgIC8vIFVzZSB0aGUgM3JkIG9uZSwgd2hpY2ggd2lsbCBiZSBhIHJ1bnRpbWUgaW4gdGhlIG9yaWdpbmFsIGJ1bmRsZS5cbiAgICAgIHJldHVybiBnZXRCYXNlVVJMKG1hdGNoZXNbMl0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnLyc7XG59XG5cbmZ1bmN0aW9uIGdldEJhc2VVUkwodXJsKSB7XG4gIHJldHVybiAoJycgKyB1cmwpLnJlcGxhY2UoL14oKD86aHR0cHM/fGZpbGV8ZnRwfChjaHJvbWV8bW96fHNhZmFyaS13ZWIpLWV4dGVuc2lvbik6XFwvXFwvLispXFwvW14vXSskLywgJyQxJykgKyAnLyc7XG59IC8vIFRPRE86IFJlcGxhY2UgdXNlcyB3aXRoIGBuZXcgVVJMKHVybCkub3JpZ2luYCB3aGVuIGllMTEgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZC5cblxuXG5mdW5jdGlvbiBnZXRPcmlnaW4odXJsKSB7XG4gIHZhciBtYXRjaGVzID0gKCcnICsgdXJsKS5tYXRjaCgvKGh0dHBzP3xmaWxlfGZ0cHwoY2hyb21lfG1venxzYWZhcmktd2ViKS1leHRlbnNpb24pOlxcL1xcL1teL10rLyk7XG5cbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPcmlnaW4gbm90IGZvdW5kJyk7XG4gIH1cblxuICByZXR1cm4gbWF0Y2hlc1swXTtcbn1cblxuZXhwb3J0cy5nZXRCdW5kbGVVUkwgPSBnZXRCdW5kbGVVUkxDYWNoZWQ7XG5leHBvcnRzLmdldEJhc2VVUkwgPSBnZXRCYXNlVVJMO1xuZXhwb3J0cy5nZXRPcmlnaW4gPSBnZXRPcmlnaW47IiwiaW1wb3J0IGNvbnRlbnRzTWFpbldvcmxkIGZyb20gXCJ1cmw6Li4vLi4vLi4vY29udGVudHMvbWFpbl93b3JsZFwiXG5jaHJvbWUuc2NyaXB0aW5nLnJlZ2lzdGVyQ29udGVudFNjcmlwdHMoW1xuICB7XCJpZFwiOlwiY29udGVudHNNYWluV29ybGRcIixcImpzXCI6W2NvbnRlbnRzTWFpbldvcmxkLnNwbGl0KFwiL1wiKS5wb3AoKS5zcGxpdChcIj9cIilbMF1dLFwibWF0Y2hlc1wiOltcIjxhbGxfdXJscz5cIl0sXCJ3b3JsZFwiOlwiTUFJTlwifVxuXSkuY2F0Y2goXyA9PiB7fSlcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9oZWxwZXJzL2J1bmRsZS11cmwnKS5nZXRCdW5kbGVVUkwoJ2dMOUhRJykgKyBcIi4uLy4uL21haW5fd29ybGQuNWQ5NTJlMWMuanNcIiArIFwiP1wiICsgRGF0ZS5ub3coKTsiXSwibmFtZXMiOltdLCJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);