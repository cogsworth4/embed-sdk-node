"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const signature_1 = require("./signature");
const validation_1 = require("./validation");
class CogsworthSDK {
    constructor({ partnerId, apiKey }) {
        if (!partnerId) {
            throw new Error('partnerId is required');
        }
        if (!apiKey) {
            throw new Error('apiKey is required');
        }
        this.partnerId = partnerId;
        this.apiKey = apiKey;
    }
    generateClientPayload(data) {
        (0, validation_1.validateClientPayload)(data);
        const timestamp = Date.now();
        return {
            partnerId: this.partnerId,
            timestamp,
            user: Object.assign(Object.assign({}, data.user), { signature: (0, signature_1.signatureFor)({
                    apiKey: this.apiKey,
                    payload: data.user,
                    timestamp,
                }) }),
            business: Object.assign(Object.assign({}, data.business), { signature: (0, signature_1.signatureFor)({
                    apiKey: this.apiKey,
                    payload: data.business,
                    timestamp,
                }) }),
        };
    }
}
exports.default = CogsworthSDK;
//# sourceMappingURL=index.js.map