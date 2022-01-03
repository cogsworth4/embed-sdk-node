import { signatureFor } from "./signature";
import { validateClientPayload } from "./validation";

export class Cogsworth {
  constructor({ partnerId, apiKey }) {
    if (!partnerId) {
      throw new Error("partnerId is required");
    }

    if (!apiKey) {
      throw new Error("apiKey is required");
    }

    this.partnerId = partnerId;
    this.apiKey = apiKey;
  }

  generateClientPayload({ user, business }) {
    validateClientPayload({ user, business });

    return {
      partnerId: this.partnerId,
      user: {
        ...user,
        signature: signatureFor({ apiKey: this.apiKey, payload: user }),
      },
      business: {
        ...business,
        signature: signatureFor({ apiKey: this.apiKey, payload: business }),
      },
    };
  }
}
