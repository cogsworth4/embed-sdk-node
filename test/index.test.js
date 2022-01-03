import { expect } from "@jest/globals";
import { Cogsworth } from "../src/index";

describe("Cogsworth", () => {
  describe("constructor", () => {
    it("class can be instantiated", () => {
      const cogsworth = new Cogsworth({
        partnerId: "partner-1",
        apiKey: "partner-key",
      });

      expect(cogsworth.partnerId).toEqual("partner-1");
      expect(cogsworth.apiKey).toEqual("partner-key");
    });

    it("throws an error when api key is not provided", () => {
      expect(() => {
        new Cogsworth({
          partnerId: "partner-1",
        });
      }).toThrow();
    });

    it("throws an error when parner id is not provided", () => {
      expect(() => {
        new Cogsworth({
          apiKey: "partner-key",
        });
      }).toThrow();
    });
  });

  describe("generateClientPayload", () => {
    it("returns the payload including the generated signatures", () => {
      const cogsworth = new Cogsworth({
        partnerId: "partner-1",
        apiKey: "partner-key",
      });

      const payload = cogsworth.generateClientPayload({
        user: { id: "user-1", name: "Dr John", email: "john@company.com" },
        business: { id: "business-1", name: "Clinic" },
      });
      expect(payload).toEqual({
        partnerId: "partner-1",
        user: {
          ...payload.user,
          signature:
            "8a3fe670e0c8efad2b9d9140eae4a5ede9c11b3a9a4a326f7afaac0972275615",
        },
        business: {
          ...payload.business,
          signature:
            "71d640b9703f710913c8c140d41001fe5c4455a851670e1678bd0ba34601da83",
        },
      });
    });

    it("throws an error if user or business payload is missing", () => {
      const cogsworth = new Cogsworth({
        partnerId: "partner-1",
        apiKey: "partner-key",
      });

      expect(() => {
        cogsworth.generateClientPayload();
      }).toThrow();

      expect(() => {
        cogsworth.generateClientPayload({
          user: { id: "user-1", name: "Dr John", email: "john@company.com" },
        });
      }).toThrow();

      expect(() => {
        cogsworth.generateClientPayload({
          business: { id: "business-1", name: "Clinic" },
        });
      }).toThrow();
    });

    it("throws an error if user or business payload is incomplete", () => {
      const cogsworth = new Cogsworth({
        partnerId: "partner-1",
        apiKey: "partner-key",
      });

      expect(() => {
        cogsworth.generateClientPayload({
          user: { id: "user-1", name: "Dr John" },
          business: { id: "business-1", name: "Clinic" },
        });
      }).toThrow();

      expect(() => {
        cogsworth.generateClientPayload({
          user: { id: "user-1", name: "Dr John" },
          business: { id: "business-1" },
        });
      }).toThrow();
    });
  });
});
