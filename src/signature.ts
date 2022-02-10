import crypto from 'crypto'

export function signatureFor({ apiKey, payload, timestamp }) {
  if (!apiKey) {
    throw new Error('apiKey is required')
  }

  if (!payload) {
    throw new Error('apiKey is required')
  }

  // Attach timestamp and sort object keys
  const data = sortedKeys({
    ...payload,
    timestamp,
  })

  return crypto
    .createHmac('sha256', apiKey)
    .update(JSON.stringify(data))
    .digest('hex')
}

const sortedKeys = (obj: any) => {
  return Object.keys(obj)
    .sort()
    .reduce(function (acc: any, key) {
      acc[key] = obj[key]
      return acc
    }, {})
}
