"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClientPayload = void 0;
const VALID_ROLES = ["USER", "ADMIN", "STAFF"];
function validateClientPayload({ user, business }) {
    if (!user) {
        throw new Error("user payload is required");
    }
    if (!business) {
        throw new Error("business payload is required");
    }
    if (!user.id || !user.email || !user.name) {
        throw new Error("user payload must contain the following properties: id, email, name");
    }
    if (VALID_ROLES.indexOf(user.role) === -1) {
        throw new Error(`user payload must contain the role property, with one of the following values: ${VALID_ROLES.join(", ")}`);
    }
    if (!business.id || !business.name || !business.timezone) {
        throw new Error("business payload must contain the following properties: id, name");
    }
}
exports.validateClientPayload = validateClientPayload;
//# sourceMappingURL=validation.js.map