# Cogsworth Embed App Backend SDK

The Cogsworth Embed App SDK allows Cogsworth partners to embed the Cogsworth Embed application in their own sites with minimal configuration.

## Installation

```bash
npm install @cogsworth4/embed-sdk-node
# or
yarn add @cogsworth4/embed-sdk-node
```

## Usage

In order to securely generate a signed payload, it is required that you set up an endpoint in your backend. Your client application can then consume this endpoint to render the embed application.

The package needs to be configured with your Cogsworth account ID and API key, which you can find in your [Cogsworh Dashboard](https://www.cogsworth.com/account/):

```javascript
import CogsworthSDK from "@cogsworth4/embed-sdk-node";

const cogsworth = new CogsworthSDK({
  partnerId: "xxxxx",
  apiKey: "xxxxxx",
});
```

You can then use the SDK to generate a secure payload:

```javascript
const payload = cogsworth.generateClientPayload({
  user: {
    id: "xxxxxxxx",
    email: "user@example.com",
    name: "Dr. Test User",
  },
  business: {
    id: "xxxxxxxx",
    name: "Example Business",
    timezone: "Sydney/Australia",
    userRole: "OWNER",
  },
});
```

## Full example

```javascript
const handler = (req, res) => {
  const cogsworth = new CogsworthSDK({
    partnerId: "xxxxxxxx",
    apiKey: "xxxxxxxx",
  });

  const clientPayload = cogsworth.generateClientPayload({
    user: {
      id: "xxxxxxxx",
      email: "user@example.com",
      name: "Dr. Test User",
    },
    business: {
      id: "xxxxxxxx",
      name: "Example Business",
      timezone: "Sydney/Australia",
      userRole: "OWNER"
  });

  res.send(clientPayload);
};
```
