import { expect } from '@jest/globals'
import { validateClientPayload } from '../src/validation'

const timezone = 'Australia/Sydney'

describe('validateClientPayload', () => {
  it('throws an error if user is not present in payload', () => {
    expect(() => {
      validateClientPayload({
        business: { id: 'business-1', name: 'Clinic', timezone },
      } as any)
    }).toThrow()
  })

  it('throws an error if business is not present in payload', () => {
    expect(() => {
      validateClientPayload({
        user: {
          id: 'user-1',
          email: 'user@example.com',
          name: 'Clinic',
          role: 'ADMIN',
        },
      } as any)
    }).toThrow()
  })

  it('throws an error if user payload is missing a required property', () => {
    expect(() => {
      validateClientPayload({
        user: { email: 'user@example.com', name: 'Clinic' },
        business: { id: 'business-1', name: 'Clinic' },
      } as any)
    }).toThrow()
  })

  it('throws an error if user payload is missing a required property', () => {
    expect(() => {
      validateClientPayload({
        user: { id: 'user-1', email: 'user@example.com', name: 'Clinic' },
        business: { name: 'Clinic' },
      } as any)
    }).toThrow()
  })

  it('does not throw an error if all required data is present', () => {
    validateClientPayload({
      user: { id: 'user-1', email: 'user@example.com', name: 'Clinic' },
      business: { id: 'business-1', name: 'Clinic' },
    } as any)

    expect(true).toBeTruthy()
  })
})
