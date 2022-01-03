"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cogsworth = void 0;

var _signature = require("./signature");

var _validation = require("./validation");

class Cogsworth {
  constructor({
    partnerId,
    apiKey
  }) {
    if (!partnerId) {
      throw new Error("partnerId is required");
    }

    if (!apiKey) {
      throw new Error("apiKey is required");
    }

    this.partnerId = partnerId;
    this.apiKey = apiKey;
  }

  generateClientPayload({
    user,
    business
  }) {
    (0, _validation.validateClientPayload)({
      user,
      business
    });
    return {
      partnerId: this.partnerId,
      user: { ...user,
        signature: (0, _signature.signatureFor)({
          apiKey: this.apiKey,
          payload: user
        })
      },
      business: { ...business,
        signature: (0, _signature.signatureFor)({
          apiKey: this.apiKey,
          payload: business
        })
      }
    };
  }

}

exports.Cogsworth = Cogsworth;