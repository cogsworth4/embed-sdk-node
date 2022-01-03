"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signatureFor = signatureFor;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signatureFor({
  apiKey,
  payload
}) {
  if (!apiKey) {
    throw new Error("apiKey is required");
  }

  if (!payload) {
    throw new Error("apiKey is required");
  }

  return _crypto.default.createHmac("sha256", apiKey).update(JSON.stringify(payload)).digest("hex");
}