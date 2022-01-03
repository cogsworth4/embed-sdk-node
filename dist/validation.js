"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateClientPayload = validateClientPayload;

function validateClientPayload({
  user,
  business
}) {
  if (!user) {
    throw new Error("user payload is required");
  }

  if (!business) {
    throw new Error("business payload is required");
  }

  if (!user.id || !user.email || !user.name) {
    throw new Error("user payload must contain the following properties: id, email, name");
  }

  if (!business.id || !business.name) {
    throw new Error("business payload must contain the following properties: id, name");
  }
}