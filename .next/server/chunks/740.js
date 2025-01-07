exports.id = 740;
exports.ids = [740];
exports.modules = {

/***/ 4437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var React = __webpack_require__(8038);

const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};

const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}

function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}

function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}

function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}

const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}

const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage.icons[name] = icon;
    } else {
      storage.missing.add(name);
    }
  });
}
function addIconToStorage(storage, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
function listIcons(provider, prefix) {
  let allIcons = [];
  const providers = typeof provider === "string" ? [provider] : Object.keys(dataStorage);
  providers.forEach((provider2) => {
    const prefixes = typeof provider2 === "string" && typeof prefix === "string" ? [prefix] : Object.keys(dataStorage[provider2] || {});
    prefixes.forEach((prefix2) => {
      const storage = getStorage(provider2, prefix2);
      allIcons = allIcons.concat(
        Object.keys(storage.icons).map(
          (name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name
        )
      );
    });
  });
  return allIcons;
}

let simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage.icons[iconName] || (storage.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage = getStorage(provider, prefix);
  return !!addIconSet(storage, data);
}
function iconExists(name) {
  return !!getIconData(name);
}
function getIcon(name) {
  const result = getIconData(name);
  return result ? {
    ...defaultIconProps,
    ...result
  } : null;
}

const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});

const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  attributes.viewBox = box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString();
  return {
    attributes,
    body
  };
}

const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}

const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}

function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function listAPIProviders() {
  return Object.keys(configStorage);
}

const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function setFetch(fetch2) {
  fetchModule = fetch2;
}
function getFetch() {
  return fetchModule;
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};

function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage[provider] || (storage[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}

function removeCallback(storages, id) {
  storages.forEach((storage) => {
    const items = storage.loaderCallbacks;
    if (items) {
      storage.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage) {
  if (!storage.pendingCallbacksFlag) {
    storage.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage.pendingCallbacksFlag = false;
      const items = storage.loaderCallbacks ? storage.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage.provider;
      const prefix = storage.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
let idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage) => {
    (storage.loaderCallbacks || (storage.loaderCallbacks = [])).push(item);
  });
  return abort;
}

function listToIcons(list, validate = true, simpleNames = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}

// src/config.ts
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};

// src/query.ts
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}

// src/index.ts
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}

function emptyCallback$1() {
}
const redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send = api.send;
      }
    }
  }
  if (!redundancy || !send) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send, callback)().abort;
}

const browserCacheVersion = "iconify2";
const browserCachePrefix = "iconify";
const browserCacheCountKey = browserCachePrefix + "-count";
const browserCacheVersionKey = browserCachePrefix + "-version";
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;

function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}

function setBrowserStorageItemsCount(storage, value) {
  return setStoredItem(storage, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage) {
  return parseInt(getStoredItem(storage, browserCacheCountKey)) || 0;
}

const browserStorageConfig = {
  local: true,
  session: true
};
const browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}

let _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}

function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}

function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage.lastModifiedCached = storage.lastModifiedCached ? Math.min(storage.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}

function updateLastModified(storage, lastModified) {
  const lastValue = storage.lastModifiedCached;
  if (
    // Matches or newer
    lastValue && lastValue >= lastModified
  ) {
    return lastValue === lastModified;
  }
  storage.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key in browserStorageConfig) {
      iterateBrowserStorage(key, (item) => {
        const iconSet = item.data;
        return item.provider !== storage.provider || iconSet.prefix !== storage.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key) {
    let func;
    if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
      return;
    }
    const set = browserStorageEmptyItems[key];
    let index;
    if (set.size) {
      set.delete(index = Array.from(set).shift());
    } else {
      index = getBrowserStorageItemsCount(func);
      if (!setBrowserStorageItemsCount(func, index + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage.provider,
      data
    };
    return setStoredItem(
      func,
      browserCachePrefix + index.toString(),
      JSON.stringify(item)
    );
  }
  if (data.lastModified && !updateLastModified(storage, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}

function emptyCallback() {
}
function loadedNewIcons(storage) {
  if (!storage.iconsLoaderFlag) {
    storage.iconsLoaderFlag = true;
    setTimeout(() => {
      storage.iconsLoaderFlag = false;
      updateCallbacks(storage);
    });
  }
}
function loadNewIcons(storage, icons) {
  if (!storage.iconsToLoad) {
    storage.iconsToLoad = icons;
  } else {
    storage.iconsToLoad = storage.iconsToLoad.concat(icons).sort();
  }
  if (!storage.iconsQueueFlag) {
    storage.iconsQueueFlag = true;
    setTimeout(() => {
      storage.iconsQueueFlag = false;
      const { provider, prefix } = storage;
      const icons2 = storage.iconsToLoad;
      delete storage.iconsToLoad;
      let api;
      if (!icons2 || !(api = getAPIModule(provider))) {
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          if (typeof data !== "object") {
            item.icons.forEach((name) => {
              storage.missing.add(name);
            });
          } else {
            try {
              const parsed = addIconSet(
                storage,
                data
              );
              if (!parsed.length) {
                return;
              }
              const pending = storage.pendingIcons;
              if (pending) {
                parsed.forEach((name) => {
                  pending.delete(name);
                });
              }
              storeInBrowserStorage(storage, data);
            } catch (err) {
              console.error(err);
            }
          }
          loadedNewIcons(storage);
        });
      });
    });
  }
}
const loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(
            sortedIcons.loaded,
            sortedIcons.missing,
            sortedIcons.pending,
            emptyCallback
          );
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage = getStorage(provider, prefix);
    const pendingQueue = storage.pendingIcons || (storage.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage) => {
    const { provider, prefix } = storage;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(storage, newIcons[provider][prefix]);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
const loadIcon = (icon) => {
  return new Promise((fulfill, reject) => {
    const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
    if (!iconObj) {
      reject(icon);
      return;
    }
    loadIcons([iconObj || icon], (loaded) => {
      if (loaded.length && iconObj) {
        const data = getIconData(iconObj);
        if (data) {
          fulfill({
            ...defaultIconProps,
            ...data
          });
          return;
        }
      }
      reject(icon);
    });
  });
};

function toggleBrowserCache(storage, value) {
  switch (storage) {
    case "local":
    case "session":
      browserStorageConfig[storage] = value;
      break;
    case "all":
      for (const key in browserStorageConfig) {
        browserStorageConfig[key] = value;
      }
      break;
  }
}

function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}

const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}

function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}

function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}

function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}

let policy;
function createPolicy() {
  try {
    policy = window.trustedTypes.createPolicy("iconify", {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      createHTML: (s) => s
    });
  } catch (err) {
    policy = null;
  }
}
function cleanUpInnerHTML(html) {
  if (policy === void 0) {
    createPolicy();
  }
  return policy ? policy.createHTML(html) : html;
}

const defaultExtendedIconCustomisations = {
    ...defaultIconCustomisations,
    inline: false,
};

/**
 * Default SVG attributes
 */
const svgDefaults = {
    'xmlns': 'http://www.w3.org/2000/svg',
    'xmlnsXlink': 'http://www.w3.org/1999/xlink',
    'aria-hidden': true,
    'role': 'img',
};
/**
 * Style modes
 */
const commonProps = {
    display: 'inline-block',
};
const monotoneProps = {
    backgroundColor: 'currentColor',
};
const coloredProps = {
    backgroundColor: 'transparent',
};
// Dynamically add common props to variables above
const propsToAdd = {
    Image: 'var(--svg)',
    Repeat: 'no-repeat',
    Size: '100% 100%',
};
const propsToAddTo = {
    WebkitMask: monotoneProps,
    mask: monotoneProps,
    background: coloredProps,
};
for (const prefix in propsToAddTo) {
    const list = propsToAddTo[prefix];
    for (const prop in propsToAdd) {
        list[prefix + prop] = propsToAdd[prop];
    }
}
/**
 * Default values for customisations for inline icon
 */
const inlineDefaults = {
    ...defaultExtendedIconCustomisations,
    inline: true,
};
/**
 * Fix size: add 'px' to numbers
 */
function fixSize(value) {
    return value + (value.match(/^[-0-9.]+$/) ? 'px' : '');
}
/**
 * Render icon
 */
const render = (
// Icon must be validated before calling this function
icon, 
// Partial properties
props, 
// True if icon should have vertical-align added
inline, 
// Optional reference for SVG/SPAN, extracted by React.forwardRef()
ref) => {
    // Get default properties
    const defaultProps = inline
        ? inlineDefaults
        : defaultExtendedIconCustomisations;
    // Get all customisations
    const customisations = mergeCustomisations(defaultProps, props);
    // Check mode
    const mode = props.mode || 'svg';
    // Create style
    const style = {};
    const customStyle = props.style || {};
    // Create SVG component properties
    const componentProps = {
        ...(mode === 'svg' ? svgDefaults : {}),
        ref,
    };
    // Get element properties
    for (let key in props) {
        const value = props[key];
        if (value === void 0) {
            continue;
        }
        switch (key) {
            // Properties to ignore
            case 'icon':
            case 'style':
            case 'children':
            case 'onLoad':
            case 'mode':
            case '_ref':
            case '_inline':
                break;
            // Boolean attributes
            case 'inline':
            case 'hFlip':
            case 'vFlip':
                customisations[key] =
                    value === true || value === 'true' || value === 1;
                break;
            // Flip as string: 'horizontal,vertical'
            case 'flip':
                if (typeof value === 'string') {
                    flipFromString(customisations, value);
                }
                break;
            // Color: copy to style
            case 'color':
                style.color = value;
                break;
            // Rotation as string
            case 'rotate':
                if (typeof value === 'string') {
                    customisations[key] = rotateFromString(value);
                }
                else if (typeof value === 'number') {
                    customisations[key] = value;
                }
                break;
            // Remove aria-hidden
            case 'ariaHidden':
            case 'aria-hidden':
                if (value !== true && value !== 'true') {
                    delete componentProps['aria-hidden'];
                }
                break;
            // Copy missing property if it does not exist in customisations
            default:
                if (defaultProps[key] === void 0) {
                    componentProps[key] = value;
                }
        }
    }
    // Generate icon
    const item = iconToSVG(icon, customisations);
    const renderAttribs = item.attributes;
    // Inline display
    if (customisations.inline) {
        style.verticalAlign = '-0.125em';
    }
    if (mode === 'svg') {
        // Add style
        componentProps.style = {
            ...style,
            ...customStyle,
        };
        // Add icon stuff
        Object.assign(componentProps, renderAttribs);
        // Counter for ids based on "id" property to render icons consistently on server and client
        let localCounter = 0;
        let id = props.id;
        if (typeof id === 'string') {
            // Convert '-' to '_' to avoid errors in animations
            id = id.replace(/-/g, '_');
        }
        // Add icon stuff
        componentProps.dangerouslySetInnerHTML = {
            __html: cleanUpInnerHTML(replaceIDs(item.body, id ? () => id + 'ID' + localCounter++ : 'iconifyReact')),
        };
        return React.createElement('svg', componentProps);
    }
    // Render <span> with style
    const { body, width, height } = icon;
    const useMask = mode === 'mask' ||
        (mode === 'bg' ? false : body.indexOf('currentColor') !== -1);
    // Generate SVG
    const html = iconToHTML(body, {
        ...renderAttribs,
        width: width + '',
        height: height + '',
    });
    // Generate style
    componentProps.style = {
        ...style,
        '--svg': svgToURL(html),
        'width': fixSize(renderAttribs.width),
        'height': fixSize(renderAttribs.height),
        ...commonProps,
        ...(useMask ? monotoneProps : coloredProps),
        ...customStyle,
    };
    return React.createElement('span', componentProps);
};

/**
 * Enable cache
 */
function enableCache(storage) {
    toggleBrowserCache(storage, true);
}
/**
 * Disable cache
 */
function disableCache(storage) {
    toggleBrowserCache(storage, false);
}
/**
 * Initialise stuff
 */
// Enable short names
allowSimpleNames(true);
// Set API module
setAPIModule('', fetchAPIModule);
/**
 * Browser stuff
 */
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    // Set cache and load existing cache
    initBrowserStorage();
    const _window = window;
    // Load icons from global "IconifyPreload"
    if (_window.IconifyPreload !== void 0) {
        const preload = _window.IconifyPreload;
        const err = 'Invalid IconifyPreload syntax.';
        if (typeof preload === 'object' && preload !== null) {
            (preload instanceof Array ? preload : [preload]).forEach((item) => {
                try {
                    if (
                    // Check if item is an object and not null/array
                    typeof item !== 'object' ||
                        item === null ||
                        item instanceof Array ||
                        // Check for 'icons' and 'prefix'
                        typeof item.icons !== 'object' ||
                        typeof item.prefix !== 'string' ||
                        // Add icon set
                        !addCollection(item)) {
                        console.error(err);
                    }
                }
                catch (e) {
                    console.error(err);
                }
            });
        }
    }
    // Set API from global "IconifyProviders"
    if (_window.IconifyProviders !== void 0) {
        const providers = _window.IconifyProviders;
        if (typeof providers === 'object' && providers !== null) {
            for (let key in providers) {
                const err = 'IconifyProviders[' + key + '] is invalid.';
                try {
                    const value = providers[key];
                    if (typeof value !== 'object' ||
                        !value ||
                        value.resources === void 0) {
                        continue;
                    }
                    if (!addAPIProvider(key, value)) {
                        console.error(err);
                    }
                }
                catch (e) {
                    console.error(err);
                }
            }
        }
    }
}
class IconComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Render placeholder before component is mounted
            icon: null,
        };
    }
    /**
     * Abort loading icon
     */
    _abortLoading() {
        if (this._loading) {
            this._loading.abort();
            this._loading = null;
        }
    }
    /**
     * Update state
     */
    _setData(icon) {
        if (this.state.icon !== icon) {
            this.setState({
                icon,
            });
        }
    }
    /**
     * Check if icon should be loaded
     */
    _checkIcon(changed) {
        const state = this.state;
        const icon = this.props.icon;
        // Icon is an object
        if (typeof icon === 'object' &&
            icon !== null &&
            typeof icon.body === 'string') {
            // Stop loading
            this._icon = '';
            this._abortLoading();
            if (changed || state.icon === null) {
                // Set data if it was changed
                this._setData({
                    data: icon,
                });
            }
            return;
        }
        // Invalid icon?
        let iconName;
        if (typeof icon !== 'string' ||
            (iconName = stringToIcon(icon, false, true)) === null) {
            this._abortLoading();
            this._setData(null);
            return;
        }
        // Load icon
        const data = getIconData(iconName);
        if (!data) {
            // Icon data is not available
            if (!this._loading || this._loading.name !== icon) {
                // New icon to load
                this._abortLoading();
                this._icon = '';
                this._setData(null);
                if (data !== null) {
                    // Icon was not loaded
                    this._loading = {
                        name: icon,
                        abort: loadIcons([iconName], this._checkIcon.bind(this, false)),
                    };
                }
            }
            return;
        }
        // Icon data is available
        if (this._icon !== icon || state.icon === null) {
            // New icon or icon has been loaded
            this._abortLoading();
            this._icon = icon;
            // Add classes
            const classes = ['iconify'];
            if (iconName.prefix !== '') {
                classes.push('iconify--' + iconName.prefix);
            }
            if (iconName.provider !== '') {
                classes.push('iconify--' + iconName.provider);
            }
            // Set data
            this._setData({
                data,
                classes,
            });
            if (this.props.onLoad) {
                this.props.onLoad(icon);
            }
        }
    }
    /**
     * Component mounted
     */
    componentDidMount() {
        this._checkIcon(false);
    }
    /**
     * Component updated
     */
    componentDidUpdate(oldProps) {
        if (oldProps.icon !== this.props.icon) {
            this._checkIcon(true);
        }
    }
    /**
     * Abort loading
     */
    componentWillUnmount() {
        this._abortLoading();
    }
    /**
     * Render
     */
    render() {
        const props = this.props;
        const icon = this.state.icon;
        if (icon === null) {
            // Render placeholder
            return props.children
                ? props.children
                : React.createElement('span', {});
        }
        // Add classes
        let newProps = props;
        if (icon.classes) {
            newProps = {
                ...props,
                className: (typeof props.className === 'string'
                    ? props.className + ' '
                    : '') + icon.classes.join(' '),
            };
        }
        // Render icon
        return render({
            ...defaultIconProps,
            ...icon.data,
        }, newProps, props._inline, props._ref);
    }
}
/**
 * Block icon
 *
 * @param props - Component properties
 */
const Icon = React.forwardRef(function Icon(props, ref) {
    const newProps = {
        ...props,
        _ref: ref,
        _inline: false,
    };
    return React.createElement(IconComponent, newProps);
});
/**
 * Inline icon (has negative verticalAlign that makes it behave like icon font)
 *
 * @param props - Component properties
 */
const InlineIcon = React.forwardRef(function InlineIcon(props, ref) {
    const newProps = {
        ...props,
        _ref: ref,
        _inline: true,
    };
    return React.createElement(IconComponent, newProps);
});
/**
 * Internal API
 */
const _api = {
    getAPIConfig,
    setAPIModule,
    sendAPIQuery,
    setFetch,
    getFetch,
    listAPIProviders,
};

exports.Icon = Icon;
exports.InlineIcon = InlineIcon;
exports._api = _api;
exports.addAPIProvider = addAPIProvider;
exports.addCollection = addCollection;
exports.addIcon = addIcon;
exports.buildIcon = iconToSVG;
exports.calculateSize = calculateSize;
exports.disableCache = disableCache;
exports.enableCache = enableCache;
exports.getIcon = getIcon;
exports.iconExists = iconExists;
exports.listIcons = listIcons;
exports.loadIcon = loadIcon;
exports.loadIcons = loadIcons;
exports.replaceIDs = replaceIDs;


/***/ }),

/***/ 2438:
/***/ (() => {



/***/ }),

/***/ 4220:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(2439);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(1456));

var _createClass2 = _interopRequireDefault(__webpack_require__(3977));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(9687));

var _inherits2 = _interopRequireDefault(__webpack_require__(2261));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(7880));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(5091));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _react = __webpack_require__(8038);

var _utils = __webpack_require__(1849);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CurrentTime = function (_PureComponent) {
  (0, _inherits2.default)(CurrentTime, _PureComponent);

  var _super = _createSuper(CurrentTime);

  function CurrentTime(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CurrentTime);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "audio", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hasAddedAudioEventListener", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      currentTime: _this.props.defaultCurrentTime
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAudioCurrentTimeChange", function (e) {
      var audio = e.target;
      var _this$props = _this.props,
          isLeftTime = _this$props.isLeftTime,
          timeFormat = _this$props.timeFormat,
          defaultCurrentTime = _this$props.defaultCurrentTime;

      _this.setState({
        currentTime: (0, _utils.getDisplayTimeBySeconds)(isLeftTime ? audio.duration - audio.currentTime : audio.currentTime, audio.duration, timeFormat) || defaultCurrentTime
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "addAudioEventListeners", function () {
      var audio = _this.props.audio;

      if (audio && !_this.hasAddedAudioEventListener) {
        _this.audio = audio;
        _this.hasAddedAudioEventListener = true;
        audio.addEventListener('timeupdate', _this.handleAudioCurrentTimeChange);
        audio.addEventListener('loadedmetadata', _this.handleAudioCurrentTimeChange);
      }
    });
    var _audio = props.audio,
        _defaultCurrentTime = props.defaultCurrentTime,
        _isLeftTime = props.isLeftTime,
        _timeFormat = props.timeFormat;
    var currentTime = _defaultCurrentTime;

    if (_audio) {
      currentTime = (0, _utils.getDisplayTimeBySeconds)(_isLeftTime ? _audio.duration - _audio.currentTime : _audio.currentTime, _audio.duration, _timeFormat);
    }

    _this.state = {
      currentTime: currentTime
    };
    return _this;
  }

  (0, _createClass2.default)(CurrentTime, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.addAudioEventListeners();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.addAudioEventListeners();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.audio && this.hasAddedAudioEventListener) {
        this.audio.removeEventListener('timeupdate', this.handleAudioCurrentTimeChange);
        this.audio.removeEventListener('loadedmetadata', this.handleAudioCurrentTimeChange);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.currentTime;
    }
  }]);
  return CurrentTime;
}(_react.PureComponent);

var _default = CurrentTime;
exports["default"] = _default;

/***/ }),

/***/ 3683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(2439);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(1456));

var _createClass2 = _interopRequireDefault(__webpack_require__(3977));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(9687));

var _inherits2 = _interopRequireDefault(__webpack_require__(2261));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(7880));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(5091));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _react = __webpack_require__(8038);

var _utils = __webpack_require__(1849);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Duration = function (_PureComponent) {
  (0, _inherits2.default)(Duration, _PureComponent);

  var _super = _createSuper(Duration);

  function Duration(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Duration);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "audio", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hasAddedAudioEventListener", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      duration: _this.props.audio ? (0, _utils.getDisplayTimeBySeconds)(_this.props.audio.duration, _this.props.audio.duration, _this.props.timeFormat) : _this.props.defaultDuration
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAudioDurationChange", function (e) {
      var audio = e.target;
      var _this$props = _this.props,
          timeFormat = _this$props.timeFormat,
          defaultDuration = _this$props.defaultDuration;

      _this.setState({
        duration: (0, _utils.getDisplayTimeBySeconds)(audio.duration, audio.duration, timeFormat) || defaultDuration
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "addAudioEventListeners", function () {
      var audio = _this.props.audio;

      if (audio && !_this.hasAddedAudioEventListener) {
        _this.audio = audio;
        _this.hasAddedAudioEventListener = true;
        audio.addEventListener('durationchange', _this.handleAudioDurationChange);
        audio.addEventListener('abort', _this.handleAudioDurationChange);
      }
    });
    var _audio = props.audio,
        _timeFormat = props.timeFormat,
        _defaultDuration = props.defaultDuration;
    _this.state = {
      duration: _audio ? (0, _utils.getDisplayTimeBySeconds)(_audio.duration, _audio.duration, _timeFormat) : _defaultDuration
    };
    return _this;
  }

  (0, _createClass2.default)(Duration, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.addAudioEventListeners();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.addAudioEventListeners();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.audio && this.hasAddedAudioEventListener) {
        this.audio.removeEventListener('durationchange', this.handleAudioDurationChange);
        this.audio.removeEventListener('abort', this.handleAudioDurationChange);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.duration;
    }
  }]);
  return Duration;
}(_react.PureComponent);

var _default = Duration;
exports["default"] = _default;

/***/ }),

/***/ 5216:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(2439);

var _typeof = __webpack_require__(7236);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = exports.ProgressBarForwardRef = exports.ProgressBar = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(3259));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(1456));

var _createClass2 = _interopRequireDefault(__webpack_require__(3977));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(9687));

var _inherits2 = _interopRequireDefault(__webpack_require__(2261));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(7880));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(5091));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _react = _interopRequireWildcard(__webpack_require__(8038));

var _utils = __webpack_require__(1849);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ProgressBar = function (_Component) {
  (0, _inherits2.default)(ProgressBar, _Component);

  var _super = _createSuper(ProgressBar);

  function ProgressBar() {
    var _this;

    (0, _classCallCheck2.default)(this, ProgressBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "audio", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "timeOnMouseMove", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hasAddedAudioEventListener", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "downloadProgressAnimationTimer", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isDraggingProgress: false,
      currentTimePos: '0%',
      hasDownloadProgressAnimation: false,
      downloadProgressArr: [],
      waitingForSeekCallback: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getCurrentProgress", function (event) {
      var _this$props = _this.props,
          audio = _this$props.audio,
          progressBar = _this$props.progressBar;
      var isSingleFileProgressiveDownload = audio.src.indexOf('blob:') !== 0 && typeof _this.props.srcDuration === 'undefined';

      if (isSingleFileProgressiveDownload && (!audio.src || !isFinite(audio.currentTime) || !progressBar.current)) {
        return {
          currentTime: 0,
          currentTimePos: '0%'
        };
      }

      var progressBarRect = progressBar.current.getBoundingClientRect();
      var maxRelativePos = progressBarRect.width;
      var relativePos = (0, _utils.getPosX)(event) - progressBarRect.left;

      if (relativePos < 0) {
        relativePos = 0;
      } else if (relativePos > maxRelativePos) {
        relativePos = maxRelativePos;
      }

      var duration = _this.getDuration();

      var currentTime = duration * relativePos / maxRelativePos;
      return {
        currentTime: currentTime,
        currentTimePos: "".concat((relativePos / maxRelativePos * 100).toFixed(2), "%")
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleContextMenu", function (event) {
      event.preventDefault();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleMouseDownOrTouchStartProgressBar", function (event) {
      event.stopPropagation();

      var _this$getCurrentProgr = _this.getCurrentProgress(event.nativeEvent),
          currentTime = _this$getCurrentProgr.currentTime,
          currentTimePos = _this$getCurrentProgr.currentTimePos;

      if (isFinite(currentTime)) {
        _this.timeOnMouseMove = currentTime;

        _this.setState({
          isDraggingProgress: true,
          currentTimePos: currentTimePos
        });

        if (event.nativeEvent instanceof MouseEvent) {
          window.addEventListener('mousemove', _this.handleWindowMouseOrTouchMove);
          window.addEventListener('mouseup', _this.handleWindowMouseOrTouchUp);
        } else {
          window.addEventListener('touchmove', _this.handleWindowMouseOrTouchMove);
          window.addEventListener('touchend', _this.handleWindowMouseOrTouchUp);
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleWindowMouseOrTouchMove", function (event) {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }

      event.stopPropagation();
      var windowSelection = window.getSelection();

      if (windowSelection && windowSelection.type === 'Range') {
        windowSelection.empty();
      }

      var isDraggingProgress = _this.state.isDraggingProgress;

      if (isDraggingProgress) {
        var _this$getCurrentProgr2 = _this.getCurrentProgress(event),
            currentTime = _this$getCurrentProgr2.currentTime,
            currentTimePos = _this$getCurrentProgr2.currentTimePos;

        _this.timeOnMouseMove = currentTime;

        _this.setState({
          currentTimePos: currentTimePos
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleWindowMouseOrTouchUp", function (event) {
      event.stopPropagation();
      var newTime = _this.timeOnMouseMove;
      var _this$props2 = _this.props,
          audio = _this$props2.audio,
          onChangeCurrentTimeError = _this$props2.onChangeCurrentTimeError,
          onSeek = _this$props2.onSeek;

      if (onSeek) {
        _this.setState({
          isDraggingProgress: false,
          waitingForSeekCallback: true
        }, function () {
          onSeek(audio, newTime).then(function () {
            return _this.setState({
              waitingForSeekCallback: false
            });
          }, function (err) {
            throw new Error(err);
          });
        });
      } else {
        var newProps = {
          isDraggingProgress: false
        };

        if (audio.readyState === audio.HAVE_NOTHING || audio.readyState === audio.HAVE_METADATA || !isFinite(newTime)) {
          try {
            audio.load();
          } catch (err) {
            newProps.currentTimePos = '0%';
            return onChangeCurrentTimeError && onChangeCurrentTimeError(err);
          }
        }

        audio.currentTime = newTime;

        _this.setState(newProps);
      }

      if (event instanceof MouseEvent) {
        window.removeEventListener('mousemove', _this.handleWindowMouseOrTouchMove);
        window.removeEventListener('mouseup', _this.handleWindowMouseOrTouchUp);
      } else {
        window.removeEventListener('touchmove', _this.handleWindowMouseOrTouchMove);
        window.removeEventListener('touchend', _this.handleWindowMouseOrTouchUp);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAudioTimeUpdate", (0, _utils.throttle)(function (e) {
      var isDraggingProgress = _this.state.isDraggingProgress;
      var audio = e.target;
      if (isDraggingProgress || _this.state.waitingForSeekCallback === true) return;
      var currentTime = audio.currentTime;

      var duration = _this.getDuration();

      _this.setState({
        currentTimePos: "".concat((currentTime / duration * 100 || 0).toFixed(2), "%")
      });
    }, _this.props.progressUpdateInterval));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAudioDownloadProgressUpdate", function (e) {
      var audio = e.target;

      var duration = _this.getDuration();

      var downloadProgressArr = [];

      for (var i = 0; i < audio.buffered.length; i++) {
        var bufferedStart = audio.buffered.start(i);
        var bufferedEnd = audio.buffered.end(i);
        downloadProgressArr.push({
          left: "".concat(Math.round(100 / duration * bufferedStart) || 0, "%"),
          width: "".concat(Math.round(100 / duration * (bufferedEnd - bufferedStart)) || 0, "%")
        });
      }

      clearTimeout(_this.downloadProgressAnimationTimer);

      _this.setState({
        downloadProgressArr: downloadProgressArr,
        hasDownloadProgressAnimation: true
      });

      _this.downloadProgressAnimationTimer = setTimeout(function () {
        _this.setState({
          hasDownloadProgressAnimation: false
        });
      }, 200);
    });
    return _this;
  }

  (0, _createClass2.default)(ProgressBar, [{
    key: "getDuration",
    value: function getDuration() {
      var _this$props3 = this.props,
          audio = _this$props3.audio,
          srcDuration = _this$props3.srcDuration;
      return typeof srcDuration === 'undefined' ? audio.duration : srcDuration;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var audio = this.props.audio;

      if (audio && !this.hasAddedAudioEventListener) {
        this.audio = audio;
        this.hasAddedAudioEventListener = true;
        audio.addEventListener('timeupdate', this.handleAudioTimeUpdate);
        audio.addEventListener('progress', this.handleAudioDownloadProgressUpdate);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initialize();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.initialize();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.audio && this.hasAddedAudioEventListener) {
        this.audio.removeEventListener('timeupdate', this.handleAudioTimeUpdate);
        this.audio.removeEventListener('progress', this.handleAudioDownloadProgressUpdate);
      }

      clearTimeout(this.downloadProgressAnimationTimer);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          showDownloadProgress = _this$props4.showDownloadProgress,
          showFilledProgress = _this$props4.showFilledProgress,
          progressBar = _this$props4.progressBar,
          i18nProgressBar = _this$props4.i18nProgressBar;
      var _this$state = this.state,
          currentTimePos = _this$state.currentTimePos,
          downloadProgressArr = _this$state.downloadProgressArr,
          hasDownloadProgressAnimation = _this$state.hasDownloadProgressAnimation;
      return _react.default.createElement("div", {
        className: "rhap_progress-container",
        ref: progressBar,
        "aria-label": i18nProgressBar,
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": Number(currentTimePos.split('%')[0]),
        tabIndex: 0,
        onMouseDown: this.handleMouseDownOrTouchStartProgressBar,
        onTouchStart: this.handleMouseDownOrTouchStartProgressBar,
        onContextMenu: this.handleContextMenu
      }, _react.default.createElement("div", {
        className: "rhap_progress-bar ".concat(showDownloadProgress ? 'rhap_progress-bar-show-download' : '')
      }, _react.default.createElement("div", {
        className: "rhap_progress-indicator",
        style: {
          left: currentTimePos
        }
      }), showFilledProgress && _react.default.createElement("div", {
        className: "rhap_progress-filled",
        style: {
          width: currentTimePos
        }
      }), showDownloadProgress && downloadProgressArr.map(function (_ref, i) {
        var left = _ref.left,
            width = _ref.width;
        return _react.default.createElement("div", {
          key: i,
          className: "rhap_download-progress",
          style: {
            left: left,
            width: width,
            transitionDuration: hasDownloadProgressAnimation ? '.2s' : '0s'
          }
        });
      })));
    }
  }]);
  return ProgressBar;
}(_react.Component);

exports.ProgressBar = ProgressBar;

var ProgressBarForwardRef = function ProgressBarForwardRef(props, ref) {
  return _react.default.createElement(ProgressBar, (0, _extends2.default)({}, props, {
    progressBar: ref
  }));
};

exports.ProgressBarForwardRef = ProgressBarForwardRef;

var _default = (0, _react.forwardRef)(ProgressBarForwardRef);

exports["default"] = _default;

/***/ }),

/***/ 1375:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(2439);

var _typeof = __webpack_require__(7236);

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(1456));

var _createClass2 = _interopRequireDefault(__webpack_require__(3977));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(9687));

var _inherits2 = _interopRequireDefault(__webpack_require__(2261));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(7880));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(5091));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _react = _interopRequireWildcard(__webpack_require__(8038));

var _utils = __webpack_require__(1849);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var VolumeControls = function (_Component) {
  (0, _inherits2.default)(VolumeControls, _Component);

  var _super = _createSuper(VolumeControls);

  function VolumeControls() {
    var _this;

    (0, _classCallCheck2.default)(this, VolumeControls);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "audio", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hasAddedAudioEventListener", false);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "volumeBar", (0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "volumeAnimationTimer", 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "lastVolume", _this.props.volume);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      currentVolumePos: "".concat((_this.lastVolume / 1 * 100 || 0).toFixed(2), "%"),
      hasVolumeAnimation: false,
      isDraggingVolume: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getCurrentVolume", function (event) {
      var audio = _this.props.audio;

      if (!_this.volumeBar.current) {
        return {
          currentVolume: audio.volume,
          currentVolumePos: _this.state.currentVolumePos
        };
      }

      var volumeBarRect = _this.volumeBar.current.getBoundingClientRect();

      var maxRelativePos = volumeBarRect.width;
      var relativePos = (0, _utils.getPosX)(event) - volumeBarRect.left;
      var currentVolume;
      var currentVolumePos;

      if (relativePos < 0) {
        currentVolume = 0;
        currentVolumePos = '0%';
      } else if (relativePos > volumeBarRect.width) {
        currentVolume = 1;
        currentVolumePos = '100%';
      } else {
        currentVolume = relativePos / maxRelativePos;
        currentVolumePos = "".concat(relativePos / maxRelativePos * 100, "%");
      }

      return {
        currentVolume: currentVolume,
        currentVolumePos: currentVolumePos
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleContextMenu", function (event) {
      event.preventDefault();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClickVolumeButton", function () {
      var audio = _this.props.audio;

      if (audio.volume > 0) {
        _this.lastVolume = audio.volume;
        audio.volume = 0;
      } else {
        audio.volume = _this.lastVolume;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleVolumnControlMouseOrTouchDown", function (event) {
      event.stopPropagation();
      var audio = _this.props.audio;

      var _this$getCurrentVolum = _this.getCurrentVolume(event.nativeEvent),
          currentVolume = _this$getCurrentVolum.currentVolume,
          currentVolumePos = _this$getCurrentVolum.currentVolumePos;

      audio.volume = currentVolume;

      _this.setState({
        isDraggingVolume: true,
        currentVolumePos: currentVolumePos
      });

      if (event.nativeEvent instanceof MouseEvent) {
        window.addEventListener('mousemove', _this.handleWindowMouseOrTouchMove);
        window.addEventListener('mouseup', _this.handleWindowMouseOrTouchUp);
      } else {
        window.addEventListener('touchmove', _this.handleWindowMouseOrTouchMove);
        window.addEventListener('touchend', _this.handleWindowMouseOrTouchUp);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleWindowMouseOrTouchMove", function (event) {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }

      event.stopPropagation();
      var audio = _this.props.audio;
      var windowSelection = window.getSelection();

      if (windowSelection && windowSelection.type === 'Range') {
        windowSelection.empty();
      }

      var isDraggingVolume = _this.state.isDraggingVolume;

      if (isDraggingVolume) {
        var _this$getCurrentVolum2 = _this.getCurrentVolume(event),
            currentVolume = _this$getCurrentVolum2.currentVolume,
            currentVolumePos = _this$getCurrentVolum2.currentVolumePos;

        audio.volume = currentVolume;

        _this.setState({
          currentVolumePos: currentVolumePos
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleWindowMouseOrTouchUp", function (event) {
      event.stopPropagation();

      _this.setState({
        isDraggingVolume: false
      });

      if (event instanceof MouseEvent) {
        window.removeEventListener('mousemove', _this.handleWindowMouseOrTouchMove);
        window.removeEventListener('mouseup', _this.handleWindowMouseOrTouchUp);
      } else {
        window.removeEventListener('touchmove', _this.handleWindowMouseOrTouchMove);
        window.removeEventListener('touchend', _this.handleWindowMouseOrTouchUp);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAudioVolumeChange", function (e) {
      var isDraggingVolume = _this.state.isDraggingVolume;
      var _ref = e.target,
          volume = _ref.volume;

      if (_this.lastVolume > 0 && volume === 0 || _this.lastVolume === 0 && volume > 0) {
        _this.props.onMuteChange();
      }

      _this.lastVolume = volume;
      if (isDraggingVolume) return;

      _this.setState({
        hasVolumeAnimation: true,
        currentVolumePos: "".concat((volume / 1 * 100 || 0).toFixed(2), "%")
      });

      clearTimeout(_this.volumeAnimationTimer);
      _this.volumeAnimationTimer = setTimeout(function () {
        _this.setState({
          hasVolumeAnimation: false
        });
      }, 100);
    });
    return _this;
  }

  (0, _createClass2.default)(VolumeControls, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var audio = this.props.audio;

      if (audio && !this.hasAddedAudioEventListener) {
        this.audio = audio;
        this.hasAddedAudioEventListener = true;
        audio.addEventListener('volumechange', this.handleAudioVolumeChange);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.audio && this.hasAddedAudioEventListener) {
        this.audio.removeEventListener('volumechange', this.handleAudioVolumeChange);
      }

      clearTimeout(this.volumeAnimationTimer);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          audio = _this$props.audio,
          showFilledVolume = _this$props.showFilledVolume,
          i18nVolumeControl = _this$props.i18nVolumeControl;
      var _this$state = this.state,
          currentVolumePos = _this$state.currentVolumePos,
          hasVolumeAnimation = _this$state.hasVolumeAnimation;

      var _ref2 = audio || {},
          volume = _ref2.volume;

      return _react.default.createElement("div", {
        ref: this.volumeBar,
        onMouseDown: this.handleVolumnControlMouseOrTouchDown,
        onTouchStart: this.handleVolumnControlMouseOrTouchDown,
        onContextMenu: this.handleContextMenu,
        role: "progressbar",
        "aria-label": i18nVolumeControl,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": Number((volume * 100).toFixed(0)),
        tabIndex: 0,
        className: "rhap_volume-bar-area"
      }, _react.default.createElement("div", {
        className: "rhap_volume-bar"
      }, _react.default.createElement("div", {
        className: "rhap_volume-indicator",
        style: {
          left: currentVolumePos,
          transitionDuration: hasVolumeAnimation ? '.1s' : '0s'
        }
      }), showFilledVolume && _react.default.createElement("div", {
        className: "rhap_volume-filled",
        style: {
          width: currentVolumePos
        }
      })));
    }
  }]);
  return VolumeControls;
}(_react.Component);

var _default = VolumeControls;
exports["default"] = _default;

/***/ }),

/***/ 8478:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RHAP_UI = void 0;
var RHAP_UI;
exports.RHAP_UI = RHAP_UI;

(function (RHAP_UI) {
  RHAP_UI["CURRENT_TIME"] = "CURRENT_TIME";
  RHAP_UI["CURRENT_LEFT_TIME"] = "CURRENT_LEFT_TIME";
  RHAP_UI["PROGRESS_BAR"] = "PROGRESS_BAR";
  RHAP_UI["DURATION"] = "DURATION";
  RHAP_UI["ADDITIONAL_CONTROLS"] = "ADDITIONAL_CONTROLS";
  RHAP_UI["MAIN_CONTROLS"] = "MAIN_CONTROLS";
  RHAP_UI["VOLUME_CONTROLS"] = "VOLUME_CONTROLS";
  RHAP_UI["LOOP"] = "LOOP";
  RHAP_UI["VOLUME"] = "VOLUME";
})(RHAP_UI || (exports.RHAP_UI = RHAP_UI = {}));

/***/ }),

/***/ 6679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(2439);

var _typeof = __webpack_require__(7236);

__webpack_unused_export__ = ({
  value: true
});
Object.defineProperty(exports, "s2", ({
  enumerable: true,
  get: function get() {
    return _constants.RHAP_UI;
  }
}));
exports.ZP = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(1456));

var _createClass2 = _interopRequireDefault(__webpack_require__(3977));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(9687));

var _inherits2 = _interopRequireDefault(__webpack_require__(2261));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(7880));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(5091));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(513));

var _react = _interopRequireWildcard(__webpack_require__(8038));

var _react2 = __webpack_require__(4437);

var _ProgressBar = _interopRequireDefault(__webpack_require__(5216));

var _CurrentTime = _interopRequireDefault(__webpack_require__(4220));

var _Duration = _interopRequireDefault(__webpack_require__(3683));

var _VolumeBar = _interopRequireDefault(__webpack_require__(1375));

var _constants = __webpack_require__(8478);

var _utils = __webpack_require__(1849);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var H5AudioPlayer = function (_Component) {
  (0, _inherits2.default)(H5AudioPlayer, _Component);

  var _super = _createSuper(H5AudioPlayer);

  function H5AudioPlayer() {
    var _this;

    (0, _classCallCheck2.default)(this, H5AudioPlayer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "audio", (0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "progressBar", (0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "container", (0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "lastVolume", _this.props.volume);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "listenTracker", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "volumeAnimationTimer", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "downloadProgressAnimationTimer", void 0);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "togglePlay", function (e) {
      e.stopPropagation();
      var audio = _this.audio.current;

      if ((audio.paused || audio.ended) && audio.src) {
        _this.playAudioPromise();
      } else if (!audio.paused) {
        audio.pause();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "playAudioPromise", function () {
      if (_this.audio.current.error) {
        _this.audio.current.load();
      }

      var playPromise = _this.audio.current.play();

      if (playPromise) {
        playPromise.then(null).catch(function (err) {
          var onPlayError = _this.props.onPlayError;
          onPlayError && onPlayError(new Error(err));
        });
      } else {
        _this.forceUpdate();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isPlaying", function () {
      var audio = _this.audio.current;
      if (!audio) return false;
      return !audio.paused && !audio.ended;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handlePlay", function (e) {
      _this.forceUpdate();

      _this.props.onPlay && _this.props.onPlay(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handlePause", function (e) {
      if (!_this.audio) return;

      _this.forceUpdate();

      _this.props.onPause && _this.props.onPause(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleEnded", function (e) {
      if (!_this.audio) return;

      _this.forceUpdate();

      _this.props.onEnded && _this.props.onEnded(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleAbort", function (e) {
      _this.props.onAbort && _this.props.onAbort(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClickVolumeButton", function () {
      var audio = _this.audio.current;

      if (audio.volume > 0) {
        _this.lastVolume = audio.volume;
        audio.volume = 0;
      } else {
        audio.volume = _this.lastVolume;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleMuteChange", function () {
      _this.forceUpdate();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClickLoopButton", function () {
      _this.audio.current.loop = !_this.audio.current.loop;

      _this.forceUpdate();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClickRewind", function () {
      var _this$props = _this.props,
          progressJumpSteps = _this$props.progressJumpSteps,
          progressJumpStep = _this$props.progressJumpStep;
      var jumpStep = progressJumpSteps.backward || progressJumpStep;

      _this.setJumpTime(-jumpStep);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClickForward", function () {
      var _this$props2 = _this.props,
          progressJumpSteps = _this$props2.progressJumpSteps,
          progressJumpStep = _this$props2.progressJumpStep;
      var jumpStep = progressJumpSteps.forward || progressJumpStep;

      _this.setJumpTime(jumpStep);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setJumpTime", function (time) {
      var audio = _this.audio.current;
      var duration = audio.duration,
          prevTime = audio.currentTime;

      if (audio.readyState === audio.HAVE_NOTHING || audio.readyState === audio.HAVE_METADATA || !isFinite(duration) || !isFinite(prevTime)) {
        try {
          audio.load();
        } catch (err) {
          return _this.props.onChangeCurrentTimeError && _this.props.onChangeCurrentTimeError(err);
        }
      }

      var currentTime = prevTime + time / 1000;

      if (currentTime < 0) {
        audio.currentTime = 0;
        currentTime = 0;
      } else if (currentTime > duration) {
        audio.currentTime = duration;
        currentTime = duration;
      } else {
        audio.currentTime = currentTime;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setJumpVolume", function (volume) {
      var newVolume = _this.audio.current.volume + volume;
      if (newVolume < 0) newVolume = 0;else if (newVolume > 1) newVolume = 1;
      _this.audio.current.volume = newVolume;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyDown", function (e) {
      if (_this.props.hasDefaultKeyBindings) {
        switch (e.key) {
          case ' ':
            if (e.target === _this.container.current || e.target === _this.progressBar.current) {
              e.preventDefault();

              _this.togglePlay(e);
            }

            break;

          case 'ArrowLeft':
            _this.handleClickRewind();

            break;

          case 'ArrowRight':
            _this.handleClickForward();

            break;

          case 'ArrowUp':
            e.preventDefault();

            _this.setJumpVolume(_this.props.volumeJumpStep);

            break;

          case 'ArrowDown':
            e.preventDefault();

            _this.setJumpVolume(-_this.props.volumeJumpStep);

            break;

          case 'l':
            _this.handleClickLoopButton();

            break;

          case 'm':
            _this.handleClickVolumeButton();

            break;
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderUIModules", function (modules) {
      return modules.map(function (comp, i) {
        return _this.renderUIModule(comp, i);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderUIModule", function (comp, key) {
      var _this$props3 = _this.props,
          defaultCurrentTime = _this$props3.defaultCurrentTime,
          progressUpdateInterval = _this$props3.progressUpdateInterval,
          showDownloadProgress = _this$props3.showDownloadProgress,
          showFilledProgress = _this$props3.showFilledProgress,
          showFilledVolume = _this$props3.showFilledVolume,
          defaultDuration = _this$props3.defaultDuration,
          customIcons = _this$props3.customIcons,
          showSkipControls = _this$props3.showSkipControls,
          onClickPrevious = _this$props3.onClickPrevious,
          onClickNext = _this$props3.onClickNext,
          onChangeCurrentTimeError = _this$props3.onChangeCurrentTimeError,
          showJumpControls = _this$props3.showJumpControls,
          customAdditionalControls = _this$props3.customAdditionalControls,
          customVolumeControls = _this$props3.customVolumeControls,
          muted = _this$props3.muted,
          timeFormat = _this$props3.timeFormat,
          volumeProp = _this$props3.volume,
          loopProp = _this$props3.loop,
          mse = _this$props3.mse,
          i18nAriaLabels = _this$props3.i18nAriaLabels;

      switch (comp) {
        case _constants.RHAP_UI.CURRENT_TIME:
          return _react.default.createElement("div", {
            key: key,
            id: "rhap_current-time",
            className: "rhap_time rhap_current-time"
          }, _react.default.createElement(_CurrentTime.default, {
            audio: _this.audio.current,
            isLeftTime: false,
            defaultCurrentTime: defaultCurrentTime,
            timeFormat: timeFormat
          }));

        case _constants.RHAP_UI.CURRENT_LEFT_TIME:
          return _react.default.createElement("div", {
            key: key,
            id: "rhap_current-left-time",
            className: "rhap_time rhap_current-left-time"
          }, _react.default.createElement(_CurrentTime.default, {
            audio: _this.audio.current,
            isLeftTime: true,
            defaultCurrentTime: defaultCurrentTime,
            timeFormat: timeFormat
          }));

        case _constants.RHAP_UI.PROGRESS_BAR:
          return _react.default.createElement(_ProgressBar.default, {
            key: key,
            ref: _this.progressBar,
            audio: _this.audio.current,
            progressUpdateInterval: progressUpdateInterval,
            showDownloadProgress: showDownloadProgress,
            showFilledProgress: showFilledProgress,
            onSeek: mse && mse.onSeek,
            onChangeCurrentTimeError: onChangeCurrentTimeError,
            srcDuration: mse && mse.srcDuration,
            i18nProgressBar: i18nAriaLabels.progressControl
          });

        case _constants.RHAP_UI.DURATION:
          return _react.default.createElement("div", {
            key: key,
            className: "rhap_time rhap_total-time"
          }, mse && mse.srcDuration ? (0, _utils.getDisplayTimeBySeconds)(mse.srcDuration, mse.srcDuration, _this.props.timeFormat) : _react.default.createElement(_Duration.default, {
            audio: _this.audio.current,
            defaultDuration: defaultDuration,
            timeFormat: timeFormat
          }));

        case _constants.RHAP_UI.ADDITIONAL_CONTROLS:
          return _react.default.createElement("div", {
            key: key,
            className: "rhap_additional-controls"
          }, _this.renderUIModules(customAdditionalControls));

        case _constants.RHAP_UI.MAIN_CONTROLS:
          {
            var isPlaying = _this.isPlaying();

            var actionIcon;

            if (isPlaying) {
              actionIcon = customIcons.pause ? customIcons.pause : _react.default.createElement(_react2.Icon, {
                icon: "mdi:pause-circle"
              });
            } else {
              actionIcon = customIcons.play ? customIcons.play : _react.default.createElement(_react2.Icon, {
                icon: "mdi:play-circle"
              });
            }

            return _react.default.createElement("div", {
              key: key,
              className: "rhap_main-controls"
            }, showSkipControls && _react.default.createElement("button", {
              "aria-label": i18nAriaLabels.previous,
              className: "rhap_button-clear rhap_main-controls-button rhap_skip-button",
              type: "button",
              onClick: onClickPrevious
            }, customIcons.previous ? customIcons.previous : _react.default.createElement(_react2.Icon, {
              icon: "mdi:skip-previous"
            })), showJumpControls && _react.default.createElement("button", {
              "aria-label": i18nAriaLabels.rewind,
              className: "rhap_button-clear rhap_main-controls-button rhap_rewind-button",
              type: "button",
              onClick: _this.handleClickRewind
            }, customIcons.rewind ? customIcons.rewind : _react.default.createElement(_react2.Icon, {
              icon: "mdi:rewind"
            })), _react.default.createElement("button", {
              "aria-label": isPlaying ? i18nAriaLabels.pause : i18nAriaLabels.play,
              className: "rhap_button-clear rhap_main-controls-button rhap_play-pause-button",
              type: "button",
              onClick: _this.togglePlay
            }, actionIcon), showJumpControls && _react.default.createElement("button", {
              "aria-label": i18nAriaLabels.forward,
              className: "rhap_button-clear rhap_main-controls-button rhap_forward-button",
              type: "button",
              onClick: _this.handleClickForward
            }, customIcons.forward ? customIcons.forward : _react.default.createElement(_react2.Icon, {
              icon: "mdi:fast-forward"
            })), showSkipControls && _react.default.createElement("button", {
              "aria-label": i18nAriaLabels.next,
              className: "rhap_button-clear rhap_main-controls-button rhap_skip-button",
              type: "button",
              onClick: onClickNext
            }, customIcons.next ? customIcons.next : _react.default.createElement(_react2.Icon, {
              icon: "mdi:skip-next"
            })));
          }

        case _constants.RHAP_UI.VOLUME_CONTROLS:
          return _react.default.createElement("div", {
            key: key,
            className: "rhap_volume-controls"
          }, _this.renderUIModules(customVolumeControls));

        case _constants.RHAP_UI.LOOP:
          {
            var loop = _this.audio.current ? _this.audio.current.loop : loopProp;
            var loopIcon;

            if (loop) {
              loopIcon = customIcons.loop ? customIcons.loop : _react.default.createElement(_react2.Icon, {
                icon: "mdi:repeat"
              });
            } else {
              loopIcon = customIcons.loopOff ? customIcons.loopOff : _react.default.createElement(_react2.Icon, {
                icon: "mdi:repeat-off"
              });
            }

            return _react.default.createElement("button", {
              key: key,
              "aria-label": loop ? i18nAriaLabels.loop : i18nAriaLabels.loopOff,
              className: "rhap_button-clear rhap_repeat-button",
              type: "button",
              onClick: _this.handleClickLoopButton
            }, loopIcon);
          }

        case _constants.RHAP_UI.VOLUME:
          {
            var _ref = _this.audio.current || {},
                _ref$volume = _ref.volume,
                volume = _ref$volume === void 0 ? muted ? 0 : volumeProp : _ref$volume;

            var volumeIcon;

            if (volume) {
              volumeIcon = customIcons.volume ? customIcons.volume : _react.default.createElement(_react2.Icon, {
                icon: "mdi:volume-high"
              });
            } else {
              volumeIcon = customIcons.volume ? customIcons.volumeMute : _react.default.createElement(_react2.Icon, {
                icon: "mdi:volume-mute"
              });
            }

            return _react.default.createElement("div", {
              key: key,
              className: "rhap_volume-container"
            }, _react.default.createElement("button", {
              "aria-label": volume ? i18nAriaLabels.volume : i18nAriaLabels.volumeMute,
              onClick: _this.handleClickVolumeButton,
              type: "button",
              className: "rhap_button-clear rhap_volume-button"
            }, volumeIcon), _react.default.createElement(_VolumeBar.default, {
              audio: _this.audio.current,
              volume: volume,
              onMuteChange: _this.handleMuteChange,
              showFilledVolume: showFilledVolume,
              i18nVolumeControl: i18nAriaLabels.volumeControl
            }));
          }

        default:
          if (!(0, _react.isValidElement)(comp)) {
            return null;
          }

          return comp.key ? comp : (0, _react.cloneElement)(comp, {
            key: key
          });
      }
    });
    return _this;
  }

  (0, _createClass2.default)(H5AudioPlayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.forceUpdate();
      var audio = this.audio.current;

      if (this.props.muted) {
        audio.volume = 0;
      } else {
        audio.volume = this.lastVolume;
      }

      audio.addEventListener('error', function (e) {
        var target = e.target;

        if (target.error && target.currentTime === target.duration) {
          return _this2.props.onEnded && _this2.props.onEnded(e);
        }

        _this2.props.onError && _this2.props.onError(e);
      });
      audio.addEventListener('canplay', function (e) {
        _this2.props.onCanPlay && _this2.props.onCanPlay(e);
      });
      audio.addEventListener('canplaythrough', function (e) {
        _this2.props.onCanPlayThrough && _this2.props.onCanPlayThrough(e);
      });
      audio.addEventListener('play', this.handlePlay);
      audio.addEventListener('abort', this.handleAbort);
      audio.addEventListener('ended', this.handleEnded);
      audio.addEventListener('playing', function (e) {
        _this2.props.onPlaying && _this2.props.onPlaying(e);
      });
      audio.addEventListener('seeking', function (e) {
        _this2.props.onSeeking && _this2.props.onSeeking(e);
      });
      audio.addEventListener('seeked', function (e) {
        _this2.props.onSeeked && _this2.props.onSeeked(e);
      });
      audio.addEventListener('waiting', function (e) {
        _this2.props.onWaiting && _this2.props.onWaiting(e);
      });
      audio.addEventListener('emptied', function (e) {
        _this2.props.onEmptied && _this2.props.onEmptied(e);
      });
      audio.addEventListener('stalled', function (e) {
        _this2.props.onStalled && _this2.props.onStalled(e);
      });
      audio.addEventListener('suspend', function (e) {
        _this2.props.onSuspend && _this2.props.onSuspend(e);
      });
      audio.addEventListener('loadstart', function (e) {
        _this2.props.onLoadStart && _this2.props.onLoadStart(e);
      });
      audio.addEventListener('loadedmetadata', function (e) {
        _this2.props.onLoadedMetaData && _this2.props.onLoadedMetaData(e);
      });
      audio.addEventListener('loadeddata', function (e) {
        _this2.props.onLoadedData && _this2.props.onLoadedData(e);
      });
      audio.addEventListener('pause', this.handlePause);
      audio.addEventListener('timeupdate', (0, _utils.throttle)(function (e) {
        _this2.props.onListen && _this2.props.onListen(e);
      }, this.props.listenInterval));
      audio.addEventListener('volumechange', function (e) {
        _this2.props.onVolumeChange && _this2.props.onVolumeChange(e);
      });
      audio.addEventListener('encrypted', function (e) {
        var mse = _this2.props.mse;
        mse && mse.onEcrypted && mse.onEcrypted(e);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props4 = this.props,
          src = _this$props4.src,
          autoPlayAfterSrcChange = _this$props4.autoPlayAfterSrcChange;

      if (prevProps.src !== src) {
        if (autoPlayAfterSrcChange) {
          this.playAudioPromise();
        } else {
          this.forceUpdate();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          className = _this$props5.className,
          src = _this$props5.src,
          loopProp = _this$props5.loop,
          preload = _this$props5.preload,
          autoPlay = _this$props5.autoPlay,
          crossOrigin = _this$props5.crossOrigin,
          mediaGroup = _this$props5.mediaGroup,
          header = _this$props5.header,
          footer = _this$props5.footer,
          layout = _this$props5.layout,
          customProgressBarSection = _this$props5.customProgressBarSection,
          customControlsSection = _this$props5.customControlsSection,
          children = _this$props5.children,
          style = _this$props5.style,
          i18nAriaLabels = _this$props5.i18nAriaLabels;
      var loop = this.audio.current ? this.audio.current.loop : loopProp;
      var loopClass = loop ? 'rhap_loop--on' : 'rhap_loop--off';
      var isPlayingClass = this.isPlaying() ? 'rhap_play-status--playing' : 'rhap_play-status--paused';
      return _react.default.createElement("div", {
        role: "group",
        tabIndex: 0,
        "aria-label": i18nAriaLabels.player,
        className: "rhap_container ".concat(loopClass, " ").concat(isPlayingClass, " ").concat(className),
        onKeyDown: this.handleKeyDown,
        ref: this.container,
        style: style
      }, _react.default.createElement("audio", {
        src: src,
        controls: false,
        loop: loop,
        autoPlay: autoPlay,
        preload: preload,
        crossOrigin: crossOrigin,
        mediaGroup: mediaGroup,
        ref: this.audio
      }, children), header && _react.default.createElement("div", {
        className: "rhap_header"
      }, header), _react.default.createElement("div", {
        className: "rhap_main ".concat((0, _utils.getMainLayoutClassName)(layout))
      }, _react.default.createElement("div", {
        className: "rhap_progress-section"
      }, this.renderUIModules(customProgressBarSection)), _react.default.createElement("div", {
        className: "rhap_controls-section"
      }, this.renderUIModules(customControlsSection))), footer && _react.default.createElement("div", {
        className: "rhap_footer"
      }, footer));
    }
  }]);
  return H5AudioPlayer;
}(_react.Component);

(0, _defineProperty2.default)(H5AudioPlayer, "defaultProps", {
  autoPlay: false,
  autoPlayAfterSrcChange: true,
  listenInterval: 1000,
  progressJumpStep: 5000,
  progressJumpSteps: {},
  volumeJumpStep: 0.1,
  loop: false,
  muted: false,
  preload: 'auto',
  progressUpdateInterval: 20,
  defaultCurrentTime: '--:--',
  defaultDuration: '--:--',
  timeFormat: 'auto',
  volume: 1,
  className: '',
  showJumpControls: true,
  showSkipControls: false,
  showDownloadProgress: true,
  showFilledProgress: true,
  showFilledVolume: false,
  customIcons: {},
  customProgressBarSection: [_constants.RHAP_UI.CURRENT_TIME, _constants.RHAP_UI.PROGRESS_BAR, _constants.RHAP_UI.DURATION],
  customControlsSection: [_constants.RHAP_UI.ADDITIONAL_CONTROLS, _constants.RHAP_UI.MAIN_CONTROLS, _constants.RHAP_UI.VOLUME_CONTROLS],
  customAdditionalControls: [_constants.RHAP_UI.LOOP],
  customVolumeControls: [_constants.RHAP_UI.VOLUME],
  layout: 'stacked',
  hasDefaultKeyBindings: true,
  i18nAriaLabels: {
    player: 'Audio player',
    progressControl: 'Audio progress control',
    volumeControl: 'Volume control',
    play: 'Play',
    pause: 'Pause',
    rewind: 'Rewind',
    forward: 'Forward',
    previous: 'Previous',
    next: 'Skip',
    loop: 'Disable loop',
    loopOff: 'Enable loop',
    volume: 'Mute',
    volumeMute: 'Unmute'
  }
});
var _default = H5AudioPlayer;
exports.ZP = _default;

/***/ }),

/***/ 1849:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getPosX = exports.getMainLayoutClassName = exports.getDisplayTimeBySeconds = void 0;
exports.throttle = throttle;

var getMainLayoutClassName = function getMainLayoutClassName(layout) {
  switch (layout) {
    case 'stacked':
      return 'rhap_stacked';

    case 'stacked-reverse':
      return 'rhap_stacked-reverse';

    case 'horizontal':
      return 'rhap_horizontal';

    case 'horizontal-reverse':
      return 'rhap_horizontal-reverse';

    default:
      return 'rhap_stacked';
  }
};

exports.getMainLayoutClassName = getMainLayoutClassName;

var getPosX = function getPosX(event) {
  if (event instanceof MouseEvent) {
    return event.clientX;
  } else {
    return event.touches[0].clientX;
  }
};

exports.getPosX = getPosX;

var addHeadingZero = function addHeadingZero(num) {
  return num > 9 ? num.toString() : "0".concat(num);
};

var getDisplayTimeBySeconds = function getDisplayTimeBySeconds(seconds, totalSeconds, timeFormat) {
  if (!isFinite(seconds)) {
    return null;
  }

  var min = Math.floor(seconds / 60);
  var minStr = addHeadingZero(min);
  var secStr = addHeadingZero(Math.floor(seconds % 60));
  var minStrForHour = addHeadingZero(Math.floor(min % 60));
  var hourStr = Math.floor(min / 60);
  var mmSs = "".concat(minStr, ":").concat(secStr);
  var hhMmSs = "".concat(hourStr, ":").concat(minStrForHour, ":").concat(secStr);

  if (timeFormat === 'auto') {
    if (totalSeconds >= 3600) {
      return hhMmSs;
    } else {
      return mmSs;
    }
  } else if (timeFormat === 'mm:ss') {
    return mmSs;
  } else if (timeFormat === 'hh:mm:ss') {
    return hhMmSs;
  }
};

exports.getDisplayTimeBySeconds = getDisplayTimeBySeconds;

function throttle(func, limit) {
  var inThrottle = false;
  return function (arg) {
    if (!inThrottle) {
      func(arg);
      inThrottle = true;
      setTimeout(function () {
        return inThrottle = false;
      }, limit);
    }
  };
}

/***/ }),

/***/ 9687:
/***/ ((module) => {

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1456:
/***/ ((module) => {

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 3977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(6651);
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 513:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPropertyKey = __webpack_require__(6651);
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 3259:
/***/ ((module) => {

function _extends() {
  return module.exports = _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _extends.apply(null, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 5091:
/***/ ((module) => {

function _getPrototypeOf(t) {
  return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(1540);
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && setPrototypeOf(t, e);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2439:
/***/ ((module) => {

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(7236)["default"]);
var assertThisInitialized = __webpack_require__(9687);
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 1540:
/***/ ((module) => {

function _setPrototypeOf(t, e) {
  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9312:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(7236)["default"]);
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 6651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(7236)["default"]);
var toPrimitive = __webpack_require__(9312);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7236:
/***/ ((module) => {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ })

};
;