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

  /*
  The following data is expected:
  {
    user: {
      id: "xxxxx" // ID from partner system
      email: "user@email.com",
      name: "Dr. John Doe",
      role: "OWNER" // One of the following: {OWNER, ADMIN, STAFF}
    },
    business: {
      id: "xxxxx", // ID from partner system
      name: "The Clinic",
      timezone: "Australia/Sydney"
    }
  }
  */
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
