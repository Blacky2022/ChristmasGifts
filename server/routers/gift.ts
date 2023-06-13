import { Request, Response, Router } from 'express'
import { GiftRecord } from '../records/gift.record'
import { ValidationError } from '../utils/errors'

export const giftRouter = Router()

giftRouter

	.get('/', async (req: Request, res: Response): Promise<void> => {
		const giftsList = await GiftRecord.listAll()

		res.json({
			giftsList,
		})
	})

	.post('/', async (req: Request, res: Response): Promise<void> => {
		const data = {
			...req.body,
			count: Number(req.body.count),
		}

		const newGift = new GiftRecord(data)
		await newGift.insert()

		res.json()
	})
	.delete('/:id', async (req: Request, res: Response): Promise<void> => {
		const gift = await GiftRecord.getOne(req.params.id)
		if (!gift) {
			throw new Error('Taki prezent nie istnieje!')
		}

		if ((await gift.countGivenGifts()) > 0) {
			throw new ValidationError('Cannot remvoe given gifty.')
		}
		res.end()
	})
