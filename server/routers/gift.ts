import { Request, Response, Router } from 'express'
import { GiftRecord } from '../records/gift.record'
import { ValidationError } from '../utils/errors'
import { CreateGiftReq, GetSingleGiftRes } from '../types'

export const giftRouter = Router()

giftRouter

	.get('/', async (req: Request, res: Response): Promise<void> => {
		const giftsList = await GiftRecord.listAll()

		res.json({
			giftsList,
		})
	})
	.get('/:giftId', async (req: Request, res: Response): Promise<void> => {
		const gift = await GiftRecord.getOne(req.params.giftId)
		console.log(gift)
		const givenCount = await gift.countGivenGifts()
		res.json({
			gift,
			givenCount,
		} as GetSingleGiftRes)
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		const newGift = new GiftRecord(req.body as CreateGiftReq)
		await newGift.insert()
		res.json(newGift)
	})
	.delete('/:id', async (req: Request, res: Response): Promise<void> => {
		const gift = await GiftRecord.getOne(req.params.id)
		if (!gift) {
			throw new Error('Taki prezent nie istnieje!')
		}

		if ((await gift.countGivenGifts()) > 0) {
			throw new ValidationError('Nie mozna usunac prezentu przypisanego do dziecka.')
		}
		await gift.delete()
		res.end()
	})
