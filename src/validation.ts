import { Input } from './types'

const VALID_ROLES = ['OWNER', 'ADMIN', 'STAFF']

export const validateClientPayload = ({ user, business }: Input) => {
  if (!user) {
    throw new Error('user payload is required')
  }
  if (!business) {
    throw new Error('business payload is required')
  }
  if (!user.id || !user.email || !user.name) {
    throw new Error(
      'user payload must contain the following properties: id, email, name'
    )
  }
  if (VALID_ROLES.indexOf(business.userRole) === -1) {
    throw new Error(
      `business payload must contain the userRole property, with one of the following values: ${VALID_ROLES.join(
        ', '
      )}`
    )
  }
  if (!business.id || !business.name || !business.timezone) {
    throw new Error(
      'business payload must contain the following properties: id, name'
    )
  }
}
