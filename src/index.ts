import { signatureFor } from "./signature";
import { Input, Payload } from "./types";
import { validateClientPayload } from "./validation";

export default class CogsworthSDK {
  partnerId: string;
  apiKey: string;

  constructor({ partnerId, apiKey }: { partnerId: string; apiKey: string }) {
    if (!partnerId) {
      throw new Error("partnerId is required");
    }

    if (!apiKey) {
      throw new Error("apiKey is required");
    }

    this.partnerId = partnerId;
    this.apiKey = apiKey;
  }

  generateClientPayload(data: Input): Payload {
    validateClientPayload(data);

    const timestamp = Date.now();
    return {
      partnerId: this.partnerId,
      timestamp,
      user: {
        ...data.user,
        signature: signatureFor({
          apiKey: this.apiKey,
          payload: data.user,
          timestamp,
        }),
      },
      business: {
        ...data.business,
        signature: signatureFor({
          apiKey: this.apiKey,
          payload: data.business,
          timestamp,
        }),
      },
    };
  }
}
