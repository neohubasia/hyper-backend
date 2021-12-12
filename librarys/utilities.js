/**
 * Utils Functions
 */
var moment = require("moment");

/* Helper Methods */
module.exports.isEmpty = function (obj) {
  if (typeof obj === "undefined") return true;
  if (obj === null) return true;
  if (typeof obj === "string" && obj === "") return true;
  if (typeof obj === "number" && obj === 0) return true;
  return false;
};

module.exports.isEmptyObject = function (obj) {
  if (typeof obj !== "object") return true;
  if (obj === null) return true;
  return false;
};

module.exports.isEmptyArray = function (arr) {
  if (typeof arr !== "object") return true;
  if (arr === null) return true;
  if (!Array.isArray(arr)) return true;
  if (arr.length < 1) return true;
  return false;
};

module.exports.isEmptyString = function (str) {
  if (typeof str !== "string") return true;
  if (str === "") return true;
  return false;
};

module.exports.isEmptyNumber = function (num) {
  if (typeof num !== "number") return true;
  if (num === 0) return true;
  return false;
};

module.exports.isArray = function (arr) {
  if (typeof arr !== "object") return false;
  if (arr === null) return false;
  return Array.isArray(arr);
};

module.exports.isEmail = function (email) {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    email
  );
};

module.exports.hasKey = function (obj, key) {
  if (typeof obj !== "object") return false;
  if (obj === null) return false;

  if (typeof key === "undefined") return false;
  if (key === null) return false;
  if (typeof key === "string" && key === "") return false;

  return typeof obj[key] !== "undefined";
};

module.exports.hasValNotEmpty = function (obj, key) {
  if (typeof obj !== "object") return false;
  if (obj === null) return false;

  if (typeof key === "undefined") return false;
  if (key === null) return false;
  if (typeof key === "string" && key === "") return false;

  if (typeof obj[key] === "undefined") return false;
  if (obj[key] === null) return false;
  if (typeof obj[key] === "string" && obj[key] === "") return false;
  if (typeof obj[key] === "number" && obj[key] === 0) return false;

  return true;
};

module.exports.urlDecode = function (text) {
  if (text == "") return text;
  var exps = [
    /%0A/g,
    /%0D/g,
    /%20/g,
    /%23/g,
    /%24/g,
    /%25/g,
    /%26/g,
    /%2B/g,
    /%2C/g,
    /%2F/g,
    /%3A/g,
    /%3B/g,
    /%3D/g,
    /%3F/g,
    /%40/g,
    /%5B/g,
    /%5D/g,
    /%22/g,
    /%3C/g,
    /%3E/g,
    /%5E/g,
    /%60/g,
    /%7B/g,
    /%7C/g,
    /%7D/g,
  ];
  for (var i in exps) {
    text = text.replace(exps[i], function (x) {
      x = x.substr(1);
      return String.fromCharCode(parseInt(x, 16));
    });
  }
  return text;
};

module.exports.urlEncode = function (text) {
  if (text == "") return text;
  // \s\n\r!#$%&'\(\)\*\+,/:;=\?@\[\]\"\-.<>\\^_`\{|\}~
  return text
    .replace(/%/g, "%25")
    .replace(/\n/g, "%0A")
    .replace(/\r/g, "%0D")
    .replace(/\s/g, "%20")
    .replace(/[#$&\+,/:;=\?@\[\]\"<>\\^`\{|\}]/g, function (x) {
      return "%" + x.charCodeAt(0).toString(16).toUpperCase();
    });
};

module.exports.nFormatter = function (num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

/* Date Methods */
