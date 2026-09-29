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
})({"a4xvA":[function(require,module,exports) {
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

},{"@plasmohq/storage":"i0YkM","@parcel/transformer-js/src/esmodule-helpers.js":"iIXqM"}],"i0YkM":[function(require,module,exports) {
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

},{}]},["a4xvA"], "a4xvA", "parcelRequire8c29")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVk7WUFDWixLQUFLO2dCQUNILE9BQU8sTUFBTSxDQUFDLElBQUk7WUFDcEI7UUFDRjtJQUNGO0lBRUEsT0FBTztBQUNUO0FBRUEsUUFBUSxTQUFTLFNBQVUsSUFBSSxFQUFFLFFBQVEsRUFBRSxHQUFHO0lBQzVDLE9BQU8sZUFBZSxNQUFNLFVBQVU7UUFDcEMsWUFBWTtRQUNaLEtBQUs7SUFDUDtBQUNGIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hcGkudHMiLCJub2RlX21vZHVsZXMvQHBsYXNtb2hxL3N0b3JhZ2UvZGlzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9waWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0BwYXJjZWwvdHJhbnNmb3JtZXItanMvc3JjL2VzbW9kdWxlLWhlbHBlcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCJAcGxhc21vaHEvc3RvcmFnZVwiXG5pbXBvcnQgdHlwZSB7IFJ1bGUgfSBmcm9tIFwiLi4vZmVhdHVyZXMvYWRtaW4vUnVsZUxpc3RcIlxuXG5jb25zdCBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoeyBhcmVhOiBcImxvY2FsXCIgfSlcbmNvbnN0IFJVTEVTX1NUT1JBR0VfS0VZID0gXCJtb2NrX2RiX3J1bGVzXCJcbmNvbnN0IFNZTkNfU0VUVElOR1NfS0VZID0gXCJjbG91ZF9zeW5jX3NldHRpbmdzXCJcblxuZXhwb3J0IHR5cGUgU3luY1JvbGUgPSBcIkFETUlOXCIgfCBcIkNMSUVOVFwiO1xuZXhwb3J0IHR5cGUgQmFja2VuZFR5cGUgPSBcIkpTT05CSU5cIiB8IFwiQ1VTVE9NX0FQSVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN5bmNTZXR0aW5ncyB7XG4gIHJvbGU6IFN5bmNSb2xlO1xuICBiYWNrZW5kVHlwZTogQmFja2VuZFR5cGU7XG4gIFxuICAvLyBGb3IgSlNPTkJpblxuICBiaW5JZD86IHN0cmluZztcbiAgbWFzdGVyS2V5Pzogc3RyaW5nO1xuICBcbiAgLy8gRm9yIEN1c3RvbSBBUElcbiAgZ2V0VXJsPzogc3RyaW5nO1xuICBwb3N0VXJsPzogc3RyaW5nO1xuICBhcGlLZXk/OiBzdHJpbmc7XG4gIFxuICAvLyBHZW5lcmFsXG4gIHN5bmNJbnRlcnZhbD86IG51bWJlcjsgLy8gQ2h1IGvhu7MgxJHhu5NuZyBi4buZIG5n4bqnbSAocGjDunQpXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFBIw4JOIFFVWeG7gE4gQ0jhu4ggxJDhu4pOSCBBUEkgU0VUVElOR1Ncbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmV4cG9ydCBpbnRlcmZhY2UgUGVybWlzc2lvblNldHRpbmdzIHtcbiAgZW5hYmxlZDogYm9vbGVhbjtcbiAgYXBpVXJsOiBzdHJpbmc7XG4gIGxvZ2luQnRuU2VsZWN0b3I6IHN0cmluZztcbiAgdXNlcm5hbWVTZWxlY3Rvcjogc3RyaW5nO1xuICBzZXJ2aWNlQ29kZVN1ZmZpeDogc3RyaW5nO1xuICBpY2RJbnB1dFNlbGVjdG9yOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UGVybWlzc2lvblNldHRpbmdzOiBQZXJtaXNzaW9uU2V0dGluZ3MgPSB7XG4gIGVuYWJsZWQ6IGZhbHNlLFxuICBhcGlVcmw6IFwiXCIsXG4gIGxvZ2luQnRuU2VsZWN0b3I6IFwiI2J0bkxvZ2luLCBidXR0b25bdHlwZT0nc3VibWl0J11cIixcbiAgdXNlcm5hbWVTZWxlY3RvcjogXCJpbnB1dFtuYW1lPSd1c2VybmFtZSddLCBpbnB1dFt0eXBlPSd0ZXh0J10sICN1c2VybmFtZVwiLFxuICBzZXJ2aWNlQ29kZVN1ZmZpeDogXCJfTUFESUNIVlVcIixcbiAgaWNkSW5wdXRTZWxlY3RvcjogXCJcIlxufVxuXG5jb25zdCBQRVJNSVNTSU9OX1NFVFRJTkdTX0tFWSA9IFwiYWR2YW5jZWRfcGVybWlzc2lvbl9zZXR0aW5nc1wiO1xuY29uc3QgUEVSTUlTU0lPTl9EQVRBX0tFWSA9IFwiYWR2YW5jZWRfcGVybWlzc2lvbl9kYXRhXCI7IC8vIE7GoWkgbMawdSBt4bqjbmcgbcOjIGThu4tjaCB24bulXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQZXJtaXNzaW9uU2V0dGluZ3MoKTogUHJvbWlzZTxQZXJtaXNzaW9uU2V0dGluZ3M+IHtcbiAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBzdG9yYWdlLmdldDxQZXJtaXNzaW9uU2V0dGluZ3M+KFBFUk1JU1NJT05fU0VUVElOR1NfS0VZKTtcbiAgcmV0dXJuIHNldHRpbmdzIHx8IGRlZmF1bHRQZXJtaXNzaW9uU2V0dGluZ3M7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlUGVybWlzc2lvblNldHRpbmdzKHNldHRpbmdzOiBQZXJtaXNzaW9uU2V0dGluZ3MpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgc3RvcmFnZS5zZXQoUEVSTUlTU0lPTl9TRVRUSU5HU19LRVksIHNldHRpbmdzKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFyUGVybWlzc2lvbkRhdGEoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IHN0b3JhZ2UucmVtb3ZlKFBFUk1JU1NJT05fREFUQV9LRVkpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVBlcm1pc3Npb25EYXRhKGRhdGE6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBzdG9yYWdlLnNldChQRVJNSVNTSU9OX0RBVEFfS0VZLCBkYXRhKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBlcm1pc3Npb25EYXRhKCk6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBhd2FpdCBzdG9yYWdlLmdldChQRVJNSVNTSU9OX0RBVEFfS0VZKTtcbn1cblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRTeW5jU2V0dGluZ3M6IFN5bmNTZXR0aW5ncyA9IHtcbiAgcm9sZTogXCJBRE1JTlwiLFxuICBiYWNrZW5kVHlwZTogXCJDVVNUT01fQVBJXCIsXG4gIGJpbklkOiBcIlwiLFxuICBtYXN0ZXJLZXk6IFwiXCIsXG4gIGdldFVybDogXCJodHRwczovL2h0cWxiZW5odmllbi5idmRrbGFuZ3Nvbi5jb20udm46MjAxL2h0cWxiZW5odmllbi9hcGkvZXh0ZW5zaW9uLWNvbmZpZz9rZXk9Y2FyZWNoZWNrX3J1bGVzXCIsXG4gIHBvc3RVcmw6IFwiaHR0cHM6Ly9odHFsYmVuaHZpZW4uYnZka2xhbmdzb24uY29tLnZuOjIwMS9odHFsYmVuaHZpZW4vYXBpL2V4dGVuc2lvbi1jb25maWc/a2V5PWNhcmVjaGVja19ydWxlc1wiLFxuICBhcGlLZXk6IFwiXCIsXG4gIHN5bmNJbnRlcnZhbDogMzBcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN5bmNTZXR0aW5ncygpOiBQcm9taXNlPFN5bmNTZXR0aW5ncz4ge1xuICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IHN0b3JhZ2UuZ2V0PFN5bmNTZXR0aW5ncz4oU1lOQ19TRVRUSU5HU19LRVkpO1xuICByZXR1cm4gc2V0dGluZ3MgfHwgZGVmYXVsdFN5bmNTZXR0aW5ncztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVTeW5jU2V0dGluZ3Moc2V0dGluZ3M6IFN5bmNTZXR0aW5ncyk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBzdG9yYWdlLnNldChTWU5DX1NFVFRJTkdTX0tFWSwgc2V0dGluZ3MpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBMT0NBTCBTVE9SQUdFIEFQSSAoRm9yIFVJIGFuZCBDb250ZW50IFNjcmlwdCByZWFkaW5nKVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hSdWxlc0FQSSgpOiBQcm9taXNlPFJ1bGVbXT4ge1xuICBjb25zdCBydWxlcyA9IGF3YWl0IHN0b3JhZ2UuZ2V0PFJ1bGVbXT4oUlVMRVNfU1RPUkFHRV9LRVkpXG4gIGlmICghcnVsZXMgfHwgcnVsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIHJldHVybiBydWxlc1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVJ1bGVBUEkocnVsZTogUnVsZSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBjb25zdCBjdXJyZW50UnVsZXMgPSBhd2FpdCBmZXRjaFJ1bGVzQVBJKClcbiAgY29uc3QgZXhpc3RpbmdJbmRleCA9IGN1cnJlbnRSdWxlcy5maW5kSW5kZXgociA9PiByLmlkID09PSBydWxlLmlkKVxuICBsZXQgdXBkYXRlZFJ1bGVzO1xuICBpZiAoZXhpc3RpbmdJbmRleCA+PSAwKSB7XG4gICAgdXBkYXRlZFJ1bGVzID0gWy4uLmN1cnJlbnRSdWxlc11cbiAgICB1cGRhdGVkUnVsZXNbZXhpc3RpbmdJbmRleF0gPSBydWxlXG4gIH0gZWxzZSB7XG4gICAgdXBkYXRlZFJ1bGVzID0gWy4uLmN1cnJlbnRSdWxlcywgcnVsZV1cbiAgfVxuICBcbiAgYXdhaXQgc3RvcmFnZS5zZXQoUlVMRVNfU1RPUkFHRV9LRVksIHVwZGF0ZWRSdWxlcylcbiAgXG4gIC8vIElmIEFETUlOLCBwdXNoIHRvIGNsb3VkXG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U3luY1NldHRpbmdzKCk7XG4gIGlmIChzZXR0aW5ncy5yb2xlID09PSBcIkFETUlOXCIpIHtcbiAgICBhd2FpdCBwdXNoUnVsZXNUb0Nsb3VkKHVwZGF0ZWRSdWxlcywgc2V0dGluZ3MpLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcihlKSk7XG4gIH1cbiAgXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVSdWxlQVBJKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgcnVsZXMgPSBhd2FpdCBmZXRjaFJ1bGVzQVBJKClcbiAgY29uc3QgdXBkYXRlZFJ1bGVzID0gcnVsZXMuZmlsdGVyKHIgPT4gci5pZCAhPT0gaWQpXG4gIGF3YWl0IHN0b3JhZ2Uuc2V0KFJVTEVTX1NUT1JBR0VfS0VZLCB1cGRhdGVkUnVsZXMpXG4gIFxuICAvLyBJZiBBRE1JTiwgcHVzaCB0byBjbG91ZFxuICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFN5bmNTZXR0aW5ncygpO1xuICBpZiAoc2V0dGluZ3Mucm9sZSA9PT0gXCJBRE1JTlwiKSB7XG4gICAgYXdhaXQgcHVzaFJ1bGVzVG9DbG91ZCh1cGRhdGVkUnVsZXMsIHNldHRpbmdzKS5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xuICB9XG4gIFxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUFsbFJ1bGVzQVBJKHJ1bGVzOiBSdWxlW10pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgYXdhaXQgc3RvcmFnZS5zZXQoUlVMRVNfU1RPUkFHRV9LRVksIHJ1bGVzKVxuICBcbiAgLy8gSWYgQURNSU4sIHB1c2ggdG8gY2xvdWRcbiAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTeW5jU2V0dGluZ3MoKTtcbiAgaWYgKHNldHRpbmdzLnJvbGUgPT09IFwiQURNSU5cIikge1xuICAgIGF3YWl0IHB1c2hSdWxlc1RvQ2xvdWQocnVsZXMsIHNldHRpbmdzKS5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENMT1VEIFNZTkMgQVBJXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFJ1bGVzRnJvbUNsb3VkKHNldHRpbmdzPzogU3luY1NldHRpbmdzKTogUHJvbWlzZTxSdWxlW10gfCBudWxsPiB7XG4gIGNvbnN0IGNvbmZpZyA9IHNldHRpbmdzIHx8IGF3YWl0IGdldFN5bmNTZXR0aW5ncygpO1xuICBcbiAgdHJ5IHtcbiAgICBpZiAoY29uZmlnLmJhY2tlbmRUeXBlID09PSBcIkpTT05CSU5cIikge1xuICAgICAgaWYgKCFjb25maWcuYmluSWQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW0NhcmVDaGVja10gQuG7jyBxdWEgxJHhu5NuZyBi4buZOiBDaMawYSBj4bqldSBow6xuaCBKU09OQmluIEJpbiBJRFwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHt9O1xuICAgICAgaWYgKGNvbmZpZy5tYXN0ZXJLZXkpIGhlYWRlcnNbXCJYLU1hc3Rlci1LZXlcIl0gPSBjb25maWcubWFzdGVyS2V5O1xuICAgICAgXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuanNvbmJpbi5pby92My9iLyR7Y29uZmlnLmJpbklkfS9sYXRlc3RgLCB7IGhlYWRlcnMgfSk7XG4gICAgICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKGBIVFRQIGVycm9yISBzdGF0dXM6ICR7cmVzLnN0YXR1c31gKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgcmV0dXJuIGRhdGEucmVjb3JkIGFzIFJ1bGVbXTtcbiAgICB9IFxuICAgIGVsc2UgaWYgKGNvbmZpZy5iYWNrZW5kVHlwZSA9PT0gXCJDVVNUT01fQVBJXCIpIHtcbiAgICAgIGlmICghY29uZmlnLmdldFVybCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbQ2FyZUNoZWNrXSBC4buPIHF1YSDEkeG7k25nIGLhu5k6IENoxrBhIGPhuqV1IGjDrG5oIEN1c3RvbSBBUEkgR0VUIFVSTFwiKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHt9O1xuICAgICAgaWYgKGNvbmZpZy5hcGlLZXkpIGhlYWRlcnNbXCJBdXRob3JpemF0aW9uXCJdID0gYEJlYXJlciAke2NvbmZpZy5hcGlLZXl9YDtcbiAgICAgIFxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goY29uZmlnLmdldFVybCwgeyBoZWFkZXJzIH0pO1xuICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IChkYXRhLnJ1bGVzIHx8IGRhdGEuZGF0YSB8fCBkYXRhKTsgLy8gQXR0ZW1wdCB0byB1bnBhY2tcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltDYXJlQ2hlY2tdIEVycm9yIGZldGNoaW5nIGZyb20gY2xvdWQ6XCIsIGVycm9yKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHB1c2hSdWxlc1RvQ2xvdWQocnVsZXM6IFJ1bGVbXSwgc2V0dGluZ3M/OiBTeW5jU2V0dGluZ3MpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgY29uZmlnID0gc2V0dGluZ3MgfHwgYXdhaXQgZ2V0U3luY1NldHRpbmdzKCk7XG4gIGlmIChjb25maWcucm9sZSAhPT0gXCJBRE1JTlwiKSByZXR1cm47IC8vIE9ubHkgQWRtaW4gY2FuIHB1c2hcbiAgXG4gIHRyeSB7XG4gICAgaWYgKGNvbmZpZy5iYWNrZW5kVHlwZSA9PT0gXCJKU09OQklOXCIpIHtcbiAgICAgIGlmICghY29uZmlnLmJpbklkIHx8ICFjb25maWcubWFzdGVyS2V5KSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltDYXJlQ2hlY2tdIELhu48gcXVhIFB1c2ggQ2xvdWQ6IENoxrBhIGPhuqV1IGjDrG5oIEpTT05CaW4gQmluIElEIGhv4bq3YyBNYXN0ZXIgS2V5XCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5qc29uYmluLmlvL3YzL2IvJHtjb25maWcuYmluSWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnWC1NYXN0ZXItS2V5JzogY29uZmlnLm1hc3RlcktleVxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShydWxlcylcbiAgICAgIH0pO1xuICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcihgSFRUUCBlcnJvciEgc3RhdHVzOiAke3Jlcy5zdGF0dXN9YCk7XG4gICAgfSBcbiAgICBlbHNlIGlmIChjb25maWcuYmFja2VuZFR5cGUgPT09IFwiQ1VTVE9NX0FQSVwiKSB7XG4gICAgICBpZiAoIWNvbmZpZy5wb3N0VXJsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltDYXJlQ2hlY2tdIELhu48gcXVhIFB1c2ggQ2xvdWQ6IENoxrBhIGPhuqV1IGjDrG5oIEN1c3RvbSBBUEkgUE9TVCBVUkxcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0ID0geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH07XG4gICAgICBpZiAoY29uZmlnLmFwaUtleSkgaGVhZGVyc1tcIkF1dGhvcml6YXRpb25cIl0gPSBgQmVhcmVyICR7Y29uZmlnLmFwaUtleX1gO1xuICAgICAgXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChjb25maWcucG9zdFVybCwge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJywgLy8gT3IgUFVULCB0eXBpY2FsbHkgUE9TVCBvciBQVVQgd29ya3NcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocnVsZXMpXG4gICAgICB9KTtcbiAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoYEhUVFAgZXJyb3IhIHN0YXR1czogJHtyZXMuc3RhdHVzfWApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiW0NhcmVDaGVja10gRXJyb3IgcHVzaGluZyB0byBjbG91ZDpcIiwgZXJyb3IpO1xuICB9XG59XG4iLCJpbXBvcnQgbSBmcm9tXCJwaWZ5XCI7dmFyIGw9KCk9Pnt0cnl7bGV0IGU9KGdsb2JhbFRoaXMubmF2aWdhdG9yPy51c2VyQWdlbnQpLm1hdGNoKC8ob3BlcmF8Y2hyb21lfHNhZmFyaXxmaXJlZm94fG1zaWV8dHJpZGVudCg/PVxcLykpXFwvP1xccyooXFxkKykvaSl8fFtdO2lmKGVbMV09PT1cIkNocm9tZVwiKXJldHVybiBwYXJzZUludChlWzJdKTwxMDB8fGdsb2JhbFRoaXMuY2hyb21lLnJ1bnRpbWU/LmdldE1hbmlmZXN0KCk/Lm1hbmlmZXN0X3ZlcnNpb249PT0yfWNhdGNoe3JldHVybiExfXJldHVybiExfTt2YXIgbz1jbGFzc3sjcjsjdDtnZXQgcHJpbWFyeUNsaWVudCgpe3JldHVybiB0aGlzLiN0fSNlO2dldCBzZWNvbmRhcnlDbGllbnQoKXtyZXR1cm4gdGhpcy4jZX0jYTtnZXQgYXJlYSgpe3JldHVybiB0aGlzLiNhfWdldCBoYXNXZWJBcGkoKXt0cnl7cmV0dXJuIHR5cGVvZiB3aW5kb3c8XCJ1XCImJiEhd2luZG93LmxvY2FsU3RvcmFnZX1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5lcnJvcihlKSwhMX19I3M9bmV3IE1hcDsjaTtnZXQgY29waWVkS2V5U2V0KCl7cmV0dXJuIHRoaXMuI2l9aXNDb3BpZWQ9ZT0+dGhpcy5oYXNXZWJBcGkmJih0aGlzLmFsbENvcGllZHx8dGhpcy5jb3BpZWRLZXlTZXQuaGFzKGUpKTsjbj0hMTtnZXQgYWxsQ29waWVkKCl7cmV0dXJuIHRoaXMuI259Z2V0RXh0U3RvcmFnZUFwaT0oKT0+Z2xvYmFsVGhpcy5icm93c2VyPy5zdG9yYWdlfHxnbG9iYWxUaGlzLmNocm9tZT8uc3RvcmFnZTtnZXQgaGFzRXh0ZW5zaW9uQXBpKCl7dHJ5e3JldHVybiEhdGhpcy5nZXRFeHRTdG9yYWdlQXBpKCl9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUuZXJyb3IoZSksITF9fWlzV2F0Y2hTdXBwb3J0ZWQ9KCk9PnRoaXMuaGFzRXh0ZW5zaW9uQXBpO2tleU5hbWVzcGFjZT1cIlwiO2lzVmFsaWRLZXk9ZT0+ZS5zdGFydHNXaXRoKHRoaXMua2V5TmFtZXNwYWNlKTtnZXROYW1lc3BhY2VkS2V5PWU9PmAke3RoaXMua2V5TmFtZXNwYWNlfSR7ZX1gO2dldFVubmFtZXNwYWNlZEtleT1lPT5lLnNsaWNlKHRoaXMua2V5TmFtZXNwYWNlLmxlbmd0aCk7c2VyZGU9e3NlcmlhbGl6ZXI6SlNPTi5zdHJpbmdpZnksZGVzZXJpYWxpemVyOkpTT04ucGFyc2V9O2NvbnN0cnVjdG9yKHthcmVhOmU9XCJzeW5jXCIsYWxsQ29waWVkOnQ9ITEsY29waWVkS2V5TGlzdDpzPVtdLHNlcmRlOnI9e319PXt9KXt0aGlzLnNldENvcGllZEtleVNldChzKSx0aGlzLiNhPWUsdGhpcy4jbj10LHRoaXMuc2VyZGU9ey4uLnRoaXMuc2VyZGUsLi4ucn07dHJ5e3RoaXMuaGFzV2ViQXBpJiYodHx8cy5sZW5ndGg+MCkmJih0aGlzLiNlPXdpbmRvdy5sb2NhbFN0b3JhZ2UpfWNhdGNoe310cnl7dGhpcy5oYXNFeHRlbnNpb25BcGkmJih0aGlzLiNyPXRoaXMuZ2V0RXh0U3RvcmFnZUFwaSgpLGwoKT90aGlzLiN0PW0odGhpcy4jclt0aGlzLmFyZWFdLHtleGNsdWRlOltcImdldEJ5dGVzSW5Vc2VcIl0sZXJyb3JGaXJzdDohMX0pOnRoaXMuI3Q9dGhpcy4jclt0aGlzLmFyZWFdKX1jYXRjaHt9fXNldENvcGllZEtleVNldChlKXt0aGlzLiNpPW5ldyBTZXQoZSl9cmF3R2V0QWxsPSgpPT50aGlzLiN0Py5nZXQoKTtnZXRBbGw9YXN5bmMoKT0+e2xldCBlPWF3YWl0IHRoaXMucmF3R2V0QWxsKCk7cmV0dXJuIE9iamVjdC5lbnRyaWVzKGUpLmZpbHRlcigoW3RdKT0+dGhpcy5pc1ZhbGlkS2V5KHQpKS5yZWR1Y2UoKHQsW3Mscl0pPT4odFt0aGlzLmdldFVubmFtZXNwYWNlZEtleShzKV09cix0KSx7fSl9O2NvcHk9YXN5bmMgZT0+e2xldCB0PWU9PT12b2lkIDA7aWYoIXQmJiF0aGlzLmNvcGllZEtleVNldC5oYXMoZSl8fCF0aGlzLmFsbENvcGllZHx8IXRoaXMuaGFzRXh0ZW5zaW9uQXBpKXJldHVybiExO2xldCBzPXRoaXMuYWxsQ29waWVkP2F3YWl0IHRoaXMucmF3R2V0QWxsKCk6YXdhaXQgdGhpcy4jdC5nZXQoKHQ/Wy4uLnRoaXMuY29waWVkS2V5U2V0XTpbZV0pLm1hcCh0aGlzLmdldE5hbWVzcGFjZWRLZXkpKTtpZighcylyZXR1cm4hMTtsZXQgcj0hMTtmb3IobGV0IGEgaW4gcyl7bGV0IGk9c1thXSxuPXRoaXMuI2U/LmdldEl0ZW0oYSk7dGhpcy4jZT8uc2V0SXRlbShhLGkpLHJ8fD1pIT09bn1yZXR1cm4gcn07cmF3R2V0PWFzeW5jIGU9Pihhd2FpdCB0aGlzLnJhd0dldE1hbnkoW2VdKSlbZV07cmF3R2V0TWFueT1hc3luYyBlPT50aGlzLmhhc0V4dGVuc2lvbkFwaT9hd2FpdCB0aGlzLiN0LmdldChlKTplLmZpbHRlcih0aGlzLmlzQ29waWVkKS5yZWR1Y2UoKHQscyk9Pih0W3NdPXRoaXMuI2U/LmdldEl0ZW0ocyksdCkse30pO3Jhd1NldD1hc3luYyhlLHQpPT5hd2FpdCB0aGlzLnJhd1NldE1hbnkoe1tlXTp0fSk7cmF3U2V0TWFueT1hc3luYyBlPT4odGhpcy4jZSYmT2JqZWN0LmVudHJpZXMoZSkuZmlsdGVyKChbdF0pPT50aGlzLmlzQ29waWVkKHQpKS5mb3JFYWNoKChbdCxzXSk9PnRoaXMuI2Uuc2V0SXRlbSh0LHMpKSx0aGlzLmhhc0V4dGVuc2lvbkFwaSYmYXdhaXQgdGhpcy4jdC5zZXQoZSksbnVsbCk7Y2xlYXI9YXN5bmMoZT0hMSk9PntlJiZ0aGlzLiNlPy5jbGVhcigpLGF3YWl0IHRoaXMuI3QuY2xlYXIoKX07cmF3UmVtb3ZlPWFzeW5jIGU9Pnthd2FpdCB0aGlzLnJhd1JlbW92ZU1hbnkoW2VdKX07cmF3UmVtb3ZlTWFueT1hc3luYyBlPT57dGhpcy4jZSYmZS5maWx0ZXIodGhpcy5pc0NvcGllZCkuZm9yRWFjaCh0PT50aGlzLiNlLnJlbW92ZUl0ZW0odCkpLHRoaXMuaGFzRXh0ZW5zaW9uQXBpJiZhd2FpdCB0aGlzLiN0LnJlbW92ZShlKX07cmVtb3ZlQWxsPWFzeW5jKCk9PntsZXQgZT1hd2FpdCB0aGlzLmdldEFsbCgpLHQ9T2JqZWN0LmtleXMoZSk7YXdhaXQgdGhpcy5yZW1vdmVNYW55KHQpfTt3YXRjaD1lPT57bGV0IHQ9dGhpcy5pc1dhdGNoU3VwcG9ydGVkKCk7cmV0dXJuIHQmJnRoaXMuI28oZSksdH07I289ZT0+e2ZvcihsZXQgdCBpbiBlKXtsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkodCkscj10aGlzLiNzLmdldChzKT8uY2FsbGJhY2tTZXR8fG5ldyBTZXQ7aWYoci5hZGQoZVt0XSksci5zaXplPjEpY29udGludWU7bGV0IGE9KGksbik9PntpZihuIT09dGhpcy5hcmVhfHwhaVtzXSlyZXR1cm47bGV0IGg9dGhpcy4jcy5nZXQocyk7aWYoIWgpdGhyb3cgbmV3IEVycm9yKGBTdG9yYWdlIGNvbW1zIGRvZXMgbm90IGV4aXN0IGZvciBuc0tleTogJHtzfWApO1Byb21pc2UuYWxsKFt0aGlzLnBhcnNlVmFsdWUoaVtzXS5uZXdWYWx1ZSksdGhpcy5wYXJzZVZhbHVlKGlbc10ub2xkVmFsdWUpXSkudGhlbigoW3ksZF0pPT57Zm9yKGxldCBwIG9mIGguY2FsbGJhY2tTZXQpcCh7bmV3VmFsdWU6eSxvbGRWYWx1ZTpkfSxuKX0pfTt0aGlzLiNyLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihhKSx0aGlzLiNzLnNldChzLHtjYWxsYmFja1NldDpyLGxpc3RlbmVyOmF9KX19O3Vud2F0Y2g9ZT0+e2xldCB0PXRoaXMuaXNXYXRjaFN1cHBvcnRlZCgpO3JldHVybiB0JiZ0aGlzLiNjKGUpLHR9OyNjKGUpe2ZvcihsZXQgdCBpbiBlKXtsZXQgcz10aGlzLmdldE5hbWVzcGFjZWRLZXkodCkscj1lW3RdLGE9dGhpcy4jcy5nZXQocyk7YSYmKGEuY2FsbGJhY2tTZXQuZGVsZXRlKHIpLGEuY2FsbGJhY2tTZXQuc2l6ZT09PTAmJih0aGlzLiNzLmRlbGV0ZShzKSx0aGlzLiNyLm9uQ2hhbmdlZC5yZW1vdmVMaXN0ZW5lcihhLmxpc3RlbmVyKSkpfX11bndhdGNoQWxsPSgpPT50aGlzLiNoKCk7I2goKXt0aGlzLiNzLmZvckVhY2goKHtsaXN0ZW5lcjplfSk9PnRoaXMuI3Iub25DaGFuZ2VkLnJlbW92ZUxpc3RlbmVyKGUpKSx0aGlzLiNzLmNsZWFyKCl9YXN5bmMgZ2V0SXRlbShlKXtyZXR1cm4gdGhpcy5nZXQoZSl9YXN5bmMgZ2V0SXRlbXMoZSl7cmV0dXJuIGF3YWl0IHRoaXMuZ2V0TWFueShlKX1hc3luYyBzZXRJdGVtKGUsdCl7YXdhaXQgdGhpcy5zZXQoZSx0KX1hc3luYyBzZXRJdGVtcyhlKXthd2FpdCBhd2FpdCB0aGlzLnNldE1hbnkoZSl9YXN5bmMgcmVtb3ZlSXRlbShlKXtyZXR1cm4gdGhpcy5yZW1vdmUoZSl9YXN5bmMgcmVtb3ZlSXRlbXMoZSl7cmV0dXJuIGF3YWl0IHRoaXMucmVtb3ZlTWFueShlKX19LGc9Y2xhc3MgZXh0ZW5kcyBve2dldD1hc3luYyBlPT57bGV0IHQ9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpLHM9YXdhaXQgdGhpcy5yYXdHZXQodCk7cmV0dXJuIHRoaXMucGFyc2VWYWx1ZShzKX07Z2V0TWFueT1hc3luYyBlPT57bGV0IHQ9ZS5tYXAodGhpcy5nZXROYW1lc3BhY2VkS2V5KSxzPWF3YWl0IHRoaXMucmF3R2V0TWFueSh0KSxyPWF3YWl0IFByb21pc2UuYWxsKE9iamVjdC52YWx1ZXMocykubWFwKHRoaXMucGFyc2VWYWx1ZSkpO3JldHVybiBPYmplY3Qua2V5cyhzKS5yZWR1Y2UoKGEsaSxuKT0+KGFbdGhpcy5nZXRVbm5hbWVzcGFjZWRLZXkoaSldPXJbbl0sYSkse30pfTtzZXQ9YXN5bmMoZSx0KT0+e2xldCBzPXRoaXMuZ2V0TmFtZXNwYWNlZEtleShlKSxyPXRoaXMuc2VyZGUuc2VyaWFsaXplcih0KTtyZXR1cm4gdGhpcy5yYXdTZXQocyxyKX07c2V0TWFueT1hc3luYyBlPT57bGV0IHQ9T2JqZWN0LmVudHJpZXMoZSkucmVkdWNlKChzLFtyLGFdKT0+KHNbdGhpcy5nZXROYW1lc3BhY2VkS2V5KHIpXT10aGlzLnNlcmRlLnNlcmlhbGl6ZXIoYSkscykse30pO3JldHVybiBhd2FpdCB0aGlzLnJhd1NldE1hbnkodCl9O3JlbW92ZT1hc3luYyBlPT57bGV0IHQ9dGhpcy5nZXROYW1lc3BhY2VkS2V5KGUpO3JldHVybiB0aGlzLnJhd1JlbW92ZSh0KX07cmVtb3ZlTWFueT1hc3luYyBlPT57bGV0IHQ9ZS5tYXAodGhpcy5nZXROYW1lc3BhY2VkS2V5KTtyZXR1cm4gYXdhaXQgdGhpcy5yYXdSZW1vdmVNYW55KHQpfTtzZXROYW1lc3BhY2U9ZT0+e3RoaXMua2V5TmFtZXNwYWNlPWV9O3BhcnNlVmFsdWU9YXN5bmMgZT0+e3RyeXtpZihlIT09dm9pZCAwKXJldHVybiB0aGlzLnNlcmRlLmRlc2VyaWFsaXplcihlKX1jYXRjaCh0KXtjb25zb2xlLmVycm9yKHQpfX19O2V4cG9ydHtvIGFzIEJhc2VTdG9yYWdlLGcgYXMgU3RvcmFnZX07XG4iLCJjb25zdCBwcm9jZXNzRnVuY3Rpb24gPSAoZnVuY3Rpb25fLCBvcHRpb25zLCBwcm94eSwgdW53cmFwcGVkKSA9PiBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRjb25zdCBQID0gb3B0aW9ucy5wcm9taXNlTW9kdWxlO1xuXG5cdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKG9wdGlvbnMubXVsdGlBcmdzKSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2goKC4uLnJlc3VsdCkgPT4ge1xuXHRcdFx0XHRpZiAob3B0aW9ucy5lcnJvckZpcnN0KSB7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdFswXSkge1xuXHRcdFx0XHRcdFx0cmVqZWN0KHJlc3VsdCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5zaGlmdCgpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShyZXN1bHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy5lcnJvckZpcnN0KSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2goKGVycm9yLCByZXN1bHQpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhcmd1bWVudHNfLnB1c2gocmVzb2x2ZSk7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXMgPT09IHByb3h5ID8gdW53cmFwcGVkIDogdGhpcztcblx0XHRSZWZsZWN0LmFwcGx5KGZ1bmN0aW9uXywgc2VsZiwgYXJndW1lbnRzXyk7XG5cdH0pO1xufTtcblxuY29uc3QgZmlsdGVyQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwaWZ5KGlucHV0LCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSB7XG5cdFx0ZXhjbHVkZTogWy8uKyg/OlN5bmN8U3RyZWFtKSQvXSxcblx0XHRlcnJvckZpcnN0OiB0cnVlLFxuXHRcdHByb21pc2VNb2R1bGU6IFByb21pc2UsXG5cdFx0Li4ub3B0aW9ucyxcblx0fTtcblxuXHRjb25zdCBvYmplY3RUeXBlID0gdHlwZW9mIGlucHV0O1xuXHRpZiAoIShpbnB1dCAhPT0gbnVsbCAmJiAob2JqZWN0VHlwZSA9PT0gJ29iamVjdCcgfHwgb2JqZWN0VHlwZSA9PT0gJ2Z1bmN0aW9uJykpKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgaW5wdXRcXGAgdG8gYmUgYSBcXGBGdW5jdGlvblxcYCBvciBcXGBPYmplY3RcXGAsIGdvdCBcXGAke2lucHV0ID09PSBudWxsID8gJ251bGwnIDogb2JqZWN0VHlwZX1cXGBgKTtcblx0fVxuXG5cdGNvbnN0IGZpbHRlciA9ICh0YXJnZXQsIGtleSkgPT4ge1xuXHRcdGxldCBjYWNoZWQgPSBmaWx0ZXJDYWNoZS5nZXQodGFyZ2V0KTtcblxuXHRcdGlmICghY2FjaGVkKSB7XG5cdFx0XHRjYWNoZWQgPSB7fTtcblx0XHRcdGZpbHRlckNhY2hlLnNldCh0YXJnZXQsIGNhY2hlZCk7XG5cdFx0fVxuXG5cdFx0aWYgKGtleSBpbiBjYWNoZWQpIHtcblx0XHRcdHJldHVybiBjYWNoZWRba2V5XTtcblx0XHR9XG5cblx0XHRjb25zdCBtYXRjaCA9IHBhdHRlcm4gPT4gKHR5cGVvZiBwYXR0ZXJuID09PSAnc3RyaW5nJyB8fCB0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykgPyBrZXkgPT09IHBhdHRlcm4gOiBwYXR0ZXJuLnRlc3Qoa2V5KTtcblx0XHRjb25zdCBkZXNjcmlwdG9yID0gUmVmbGVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuXHRcdGNvbnN0IHdyaXRhYmxlT3JDb25maWd1cmFibGVPd24gPSAoZGVzY3JpcHRvciA9PT0gdW5kZWZpbmVkIHx8IGRlc2NyaXB0b3Iud3JpdGFibGUgfHwgZGVzY3JpcHRvci5jb25maWd1cmFibGUpO1xuXHRcdGNvbnN0IGluY2x1ZGVkID0gb3B0aW9ucy5pbmNsdWRlID8gb3B0aW9ucy5pbmNsdWRlLnNvbWUoZWxlbWVudCA9PiBtYXRjaChlbGVtZW50KSkgOiAhb3B0aW9ucy5leGNsdWRlLnNvbWUoZWxlbWVudCA9PiBtYXRjaChlbGVtZW50KSk7XG5cdFx0Y29uc3Qgc2hvdWxkRmlsdGVyID0gaW5jbHVkZWQgJiYgd3JpdGFibGVPckNvbmZpZ3VyYWJsZU93bjtcblx0XHRjYWNoZWRba2V5XSA9IHNob3VsZEZpbHRlcjtcblx0XHRyZXR1cm4gc2hvdWxkRmlsdGVyO1xuXHR9O1xuXG5cdGNvbnN0IGNhY2hlID0gbmV3IFdlYWtNYXAoKTtcblxuXHRjb25zdCBwcm94eSA9IG5ldyBQcm94eShpbnB1dCwge1xuXHRcdGFwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJncykge1xuXHRcdFx0Y29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KHRhcmdldCk7XG5cblx0XHRcdGlmIChjYWNoZWQpIHtcblx0XHRcdFx0cmV0dXJuIFJlZmxlY3QuYXBwbHkoY2FjaGVkLCB0aGlzQXJnLCBhcmdzKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgcGlmaWVkID0gb3B0aW9ucy5leGNsdWRlTWFpbiA/IHRhcmdldCA6IHByb2Nlc3NGdW5jdGlvbih0YXJnZXQsIG9wdGlvbnMsIHByb3h5LCB0YXJnZXQpO1xuXHRcdFx0Y2FjaGUuc2V0KHRhcmdldCwgcGlmaWVkKTtcblx0XHRcdHJldHVybiBSZWZsZWN0LmFwcGx5KHBpZmllZCwgdGhpc0FyZywgYXJncyk7XG5cdFx0fSxcblxuXHRcdGdldCh0YXJnZXQsIGtleSkge1xuXHRcdFx0Y29uc3QgcHJvcGVydHkgPSB0YXJnZXRba2V5XTtcblxuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1leHRlbmQtbmF0aXZlL25vLXVzZS1leHRlbmQtbmF0aXZlXG5cdFx0XHRpZiAoIWZpbHRlcih0YXJnZXQsIGtleSkgfHwgcHJvcGVydHkgPT09IEZ1bmN0aW9uLnByb3RvdHlwZVtrZXldKSB7XG5cdFx0XHRcdHJldHVybiBwcm9wZXJ0eTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KHByb3BlcnR5KTtcblxuXHRcdFx0aWYgKGNhY2hlZCkge1xuXHRcdFx0XHRyZXR1cm4gY2FjaGVkO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGNvbnN0IHBpZmllZCA9IHByb2Nlc3NGdW5jdGlvbihwcm9wZXJ0eSwgb3B0aW9ucywgcHJveHksIHRhcmdldCk7XG5cdFx0XHRcdGNhY2hlLnNldChwcm9wZXJ0eSwgcGlmaWVkKTtcblx0XHRcdFx0cmV0dXJuIHBpZmllZDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHByb3BlcnR5O1xuXHRcdH0sXG5cdH0pO1xuXG5cdHJldHVybiBwcm94eTtcbn1cbiIsImV4cG9ydHMuaW50ZXJvcERlZmF1bHQgPSBmdW5jdGlvbiAoYSkge1xuICByZXR1cm4gYSAmJiBhLl9fZXNNb2R1bGUgPyBhIDoge2RlZmF1bHQ6IGF9O1xufTtcblxuZXhwb3J0cy5kZWZpbmVJbnRlcm9wRmxhZyA9IGZ1bmN0aW9uIChhKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pO1xufTtcblxuZXhwb3J0cy5leHBvcnRBbGwgPSBmdW5jdGlvbiAoc291cmNlLCBkZXN0KSB7XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ2RlZmF1bHQnIHx8IGtleSA9PT0gJ19fZXNNb2R1bGUnIHx8IGRlc3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBrZXksIHtcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZVtrZXldO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc3Q7XG59O1xuXG5leHBvcnRzLmV4cG9ydCA9IGZ1bmN0aW9uIChkZXN0LCBkZXN0TmFtZSwgZ2V0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZXN0LCBkZXN0TmFtZSwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBnZXQsXG4gIH0pO1xufTtcbiJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJhcGkuMGYxOTIyZjQuanMubWFwIn0=
 globalThis.define=__define;  })(globalThis.define);