# Cogsworth Embed App Backend SDK

The Cogsworth Embed App SDK allows Cogsworth partners to embed the Cogsworth Embed application in their own sites with minimal configuration.

## Installation

```bash
npm install @cogsworthdev/embed-sdk-node
# or
yarn add @cogsworthdev/embed-sdk-node
```

## Usage

In order to securely generate a signed payload, it is required that you set up an endpoint in your backend. Your client application can then consume this endpoint to render the embed application.

The package needs to be configured with your Cogsworth account ID and API key, which you can find in your [Cogsworh Dashboard](https://www.cogsworth.com/account/):

```javascript
import CogsworthSDK from '@cogsworth4/embed-sdk-node'

const cogsworth = new CogsworthSDK({
  partnerId: 'xxxxx',
  apiKey: 'xxxxxx',
})
```

You can then use the SDK to generate a secure payload:

```javascript
const payload = cogsworth.generateClientPayload({
  user: {
    id: 'xxxxxxxx',
    email: 'user@example.com',
    name: 'Dr. Test User',
  },
  business: {
    id: 'xxxxxxxx',
    name: 'Example Business',
    timezone: 'Sydney/Australia',
    userRole: 'OWNER',
    location: 'https://partner.com/room/xxxxxxxx',
  },
})
```

### Payload data

The payload needs to contain a `user` and a `business` objects, which require the following details:

**User**

- `user.id` - A unique identifier for the user in your system
- `user.email` - Emails are unique for each user
- `user.name` - The user name

**Business**

- `business.id` - A unique identifier for the user in your system
- `business.name` - The business name
- `business.timezone` - See a [List of possible timezones](https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a).
- `business.userRole` - The role for the provided user in this business. Can be one of the following:
  - `"OWNER"`: The business owner. Has full access to the business. Cogsworth can provision new businesses for owners only.
  - `"ADMIN"`: The business owner. Has full access to the business.
  - `"STAFF"`: Has limited access. Cannot change business settings and can only see their own appointments.
- `business.location` -Optional- The default location for the business appointments. If the value starts with _https_, it will be detected as a URL.

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
      userRole: "OWNER",
      location: "https://www.partner.com/room/xxxxxxxx",
  });

  res.send(clientPayload);
};
```
