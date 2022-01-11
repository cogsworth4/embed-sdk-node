import crypto from "crypto";

export function signatureFor({ apiKey, payload }) {
  if (!apiKey) {
    throw new Error("apiKey is required");
  }

  if (!payload) {
    throw new Error("apiKey is required");
  }

  const data = {
    ...payload,
    timestamp: Date.now(),
  };

  return crypto
    .createHmac("sha256", apiKey)
    .update(JSON.stringify(data))
    .digest("hex");
}
