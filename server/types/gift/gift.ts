import { GiftEntity } from './gift.record'

export type CreateGiftReq = Omit<GiftEntity, 'id'>
export interface GetSingleGiftRes {
	gift: GiftEntity
	givenCount: number
}
