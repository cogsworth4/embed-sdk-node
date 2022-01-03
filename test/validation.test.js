import { validateClientPayload } from "../src/validation";

describe("validateClientPayload", () => {
  it("throws an error if user is not present in payload", () => {
    expect(() => {
      validateClientPayload({ business: { id: "business-1", name: "Clinic" } });
    }).toThrow();
  });

  it("throws an error if business is not present in payload", () => {
    expect(() => {
      validateClientPayload({
        user: { id: "user-1", email: "user@example.com", name: "Clinic" },
      });
    }).toThrow();
  });

  it("throws an error if user payload is missing a required property", () => {
    expect(() => {
      validateClientPayload({
        user: { email: "user@example.com", name: "Clinic" },
        business: { id: "business-1", name: "Clinic" },
      });
    }).toThrow();
  });

  it("throws an error if user payload is missing a required property", () => {
    expect(() => {
      validateClientPayload({
        user: { id: "user-1", email: "user@example.com", name: "Clinic" },
        business: { name: "Clinic" },
      });
    }).toThrow();
  });

  it("does not throw an error if all required data is present", () => {
    validateClientPayload({
      user: { id: "user-1", email: "user@example.com", name: "Clinic" },
      business: { id: "business-1", name: "Clinic" },
    });

    expect(true).toBeTruthy();
  });
});
