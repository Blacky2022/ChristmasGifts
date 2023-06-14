import { GiftEntity } from "./gift.record";

export type CreateGiftReq = Omit<GiftEntity, 'id'>