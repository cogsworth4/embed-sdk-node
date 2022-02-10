import { Input, Payload } from './src/types'

export = CogsworthSDK

declare class CogsworthSDK {
  constructor({ partnerId, apiKey }: { partnerId: string; apiKey: string })

  generateClientPayload(data: Input): Payload
}
