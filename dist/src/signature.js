"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureFor = void 0;
const crypto_1 = __importDefault(require("crypto"));
function signatureFor({ apiKey, payload, timestamp }) {
    if (!apiKey) {
        throw new Error("apiKey is required");
    }
    if (!payload) {
        throw new Error("apiKey is required");
    }
    // Attach timestamp and sort object keys
    const data = sortedKeys(Object.assign(Object.assign({}, payload), { timestamp }));
    return crypto_1.default
        .createHmac("sha256", apiKey)
        .update(JSON.stringify(data))
        .digest("hex");
}
exports.signatureFor = signatureFor;
const sortedKeys = (obj) => {
    return Object.keys(obj)
        .sort()
        .reduce(function (acc, key) {
        acc[key] = obj[key];
        return acc;
    }, {});
};
//# sourceMappingURL=signature.js.map