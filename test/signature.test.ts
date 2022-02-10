import { expect } from '@jest/globals'
import { signatureFor } from '../src/signature'

describe('signatureFor', () => {
  it('returns a signature given an apiKey and payload', () => {
    const signature = signatureFor({
      apiKey: 'api-key-1',
      payload: { id: 'user-1' },
      timestamp: 1642017657687,
    })

    expect(signature).toEqual(
      '46cd3c8e8898fb08c3c0dd7b6c49d4bf3bdcbb133000a72ccfa1eb26662d9bab'
    )
  })

  it('returns different signatures given two apiKeys and the same payload', () => {
    const signature1 = signatureFor({
      apiKey: 'api-key-1',
      payload: { id: 'user-1' },
      timestamp: 1642017657687,
    })

    const signature2 = signatureFor({
      apiKey: 'api-key-2',
      payload: { id: 'user-1' },
      timestamp: 1642017657687,
    })

    expect(signature1 === signature2).toBeFalsy()
  })

  it('returns the same signature given the same apiKeys and the same payload', () => {
    const signature1 = signatureFor({
      apiKey: 'api-key-1',
      payload: { id: 'user-1' },
      timestamp: 1642017657687,
    })

    const signature2 = signatureFor({
      apiKey: 'api-key-1',
      payload: { id: 'user-1' },
      timestamp: 1642017657687,
    })

    expect(signature1 === signature2).toBeTruthy()
  })

  it('throws an error if apiKey is not provided', () => {
    expect(() => {
      signatureFor({
        payload: { id: 'user-1' },
        timestamp: 1642017657687,
      } as any)
    }).toThrow()
  })

  it('throws an error if payload is not provided', () => {
    expect(() => {
      signatureFor({
        apiKey: 'api-key-1',
        timestamp: 1642017657687,
      } as any)
    }).toThrow()
  })

  it('throws an error if timestamp is not provided', () => {
    expect(() => {
      signatureFor({
        apiKey: 'api-key-1',
        payload: { id: 'user-1' },
      } as any)
    }).toThrow()
  })
})
