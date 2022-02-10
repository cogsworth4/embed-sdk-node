"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = __importDefault(require("../src/index"));
describe('Cogsworth', () => {
    describe('constructor', () => {
        it('class can be instantiated', () => {
            const cogsworth = new index_1.default({
                partnerId: 'partner-1',
                apiKey: 'partner-key',
            });
            (0, globals_1.expect)(cogsworth.partnerId).toEqual('partner-1');
            (0, globals_1.expect)(cogsworth.apiKey).toEqual('partner-key');
        });
        it('throws an error when api key is not provided', () => {
            (0, globals_1.expect)(() => {
                new index_1.default({
                    partnerId: 'partner-1',
                });
            }).toThrow();
        });
        it('throws an error when parner id is not provided', () => {
            (0, globals_1.expect)(() => {
                new index_1.default({
                    apiKey: 'partner-key',
                });
            }).toThrow();
        });
    });
    describe('generateClientPayload', () => {
        it('returns the payload including the generated signatures', () => {
            const cogsworth = new index_1.default({
                partnerId: 'partner-1',
                apiKey: 'partner-key',
            });
            const payload = cogsworth.generateClientPayload({
                user: {
                    id: 'user-1',
                    name: 'Dr John',
                    email: 'john@company.com',
                },
                business: { id: 'business-1', name: 'Clinic' },
            });
            (0, globals_1.expect)(payload).toEqual({
                partnerId: 'partner-1',
                user: Object.assign(Object.assign({}, payload.user), { signature: '8a3fe670e0c8efad2b9d9140eae4a5ede9c11b3a9a4a326f7afaac0972275615' }),
                business: Object.assign(Object.assign({}, payload.business), { signature: '71d640b9703f710913c8c140d41001fe5c4455a851670e1678bd0ba34601da83' }),
            });
        });
        it('throws an error if user or business payload is missing', () => {
            const cogsworth = new index_1.default({
                partnerId: 'partner-1',
                apiKey: 'partner-key',
            });
            (0, globals_1.expect)(() => {
                const data = {};
                cogsworth.generateClientPayload(data);
            }).toThrow();
            (0, globals_1.expect)(() => {
                const data = {
                    user: {
                        id: 'user-1',
                        name: 'Dr John',
                        email: 'john@company.com',
                    },
                };
                cogsworth.generateClientPayload(data);
            }).toThrow();
            (0, globals_1.expect)(() => {
                const data = {
                    business: { id: 'business-1', name: 'Clinic' },
                };
                cogsworth.generateClientPayload(data);
            }).toThrow();
        });
        it('throws an error if user or business payload is incomplete', () => {
            const cogsworth = new index_1.default({
                partnerId: 'partner-1',
                apiKey: 'partner-key',
            });
            (0, globals_1.expect)(() => {
                const data = {
                    user: { id: 'user-1', name: 'Dr John' },
                    business: { id: 'business-1', name: 'Clinic' },
                };
                cogsworth.generateClientPayload(data);
            }).toThrow();
            (0, globals_1.expect)(() => {
                const data = {
                    user: { id: 'user-1', name: 'Dr John' },
                    business: { id: 'business-1' },
                };
                cogsworth.generateClientPayload(data);
            }).toThrow();
        });
    });
});
//# sourceMappingURL=index.test.js.map