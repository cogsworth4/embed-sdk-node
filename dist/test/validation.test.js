"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const validation_1 = require("../src/validation");
const timezone = 'Australia/Sydney';
describe('validateClientPayload', () => {
    it('throws an error if user is not present in payload', () => {
        (0, globals_1.expect)(() => {
            (0, validation_1.validateClientPayload)({
                business: { id: 'business-1', name: 'Clinic', timezone },
            });
        }).toThrow();
    });
    it('throws an error if business is not present in payload', () => {
        (0, globals_1.expect)(() => {
            (0, validation_1.validateClientPayload)({
                user: {
                    id: 'user-1',
                    email: 'user@example.com',
                    name: 'Clinic',
                    role: 'ADMIN',
                },
            });
        }).toThrow();
    });
    it('throws an error if user payload is missing a required property', () => {
        (0, globals_1.expect)(() => {
            (0, validation_1.validateClientPayload)({
                user: { email: 'user@example.com', name: 'Clinic' },
                business: { id: 'business-1', name: 'Clinic' },
            });
        }).toThrow();
    });
    it('throws an error if user payload is missing a required property', () => {
        (0, globals_1.expect)(() => {
            (0, validation_1.validateClientPayload)({
                user: { id: 'user-1', email: 'user@example.com', name: 'Clinic' },
                business: { name: 'Clinic' },
            });
        }).toThrow();
    });
    it('does not throw an error if all required data is present', () => {
        (0, validation_1.validateClientPayload)({
            user: { id: 'user-1', email: 'user@example.com', name: 'Clinic' },
            business: { id: 'business-1', name: 'Clinic' },
        });
        (0, globals_1.expect)(true).toBeTruthy();
    });
});
//# sourceMappingURL=validation.test.js.map