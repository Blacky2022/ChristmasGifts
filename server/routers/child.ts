import { Request, Response, Router } from 'express'
import { ChildRecord } from '../records/child.record'
import { GiftRecord } from '../records/gift.record'
import { ValidationError } from '../utils/errors'
import { CreateChildReq, ListChildrenRes, SetGiftForChildReq, childAndGiftEntity } from '../types'
import { ChildAndGiftRecord, Gift } from '../records/childAndGifts.record'

export const childRouter = Router()

childRouter // /child

	.get('/', async (req: Request, res: Response): Promise<void> => {
		const childrenList = await ChildRecord.listAll()
		const giftsList = await GiftRecord.listAll()
		console.trace(JSON.stringify(childrenList, undefined, '\t'))
		res.json({
			childrenList,
			giftsList,
		} as ListChildrenRes)
	})
	.get('/all', async (req: Request, res: Response): Promise<void> => {
		const records: Gift[] = await ChildAndGiftRecord.listAll()
		res.json(records)
	})
	.post('/', async (req: Request, res: Response): Promise<void> => {
		const newChild = new ChildRecord(req.body as CreateChildReq)
		await newChild.insert()

		res.json(newChild)
	})

	.patch('/gift/:childId', async (req, res) => {
		const {
			body,
		}: {
			body: SetGiftForChildReq
		} = req

		const child = await ChildRecord.getOne(req.params.childId)

		if (child === null) {
			throw new ValidationError('Nie znaleziono dziecka z podanym ID.')
		}

		const gift = body.giftId === '' ? null : await GiftRecord.getOne(body.giftId)

		if (gift) {
			if (gift.count <= (await gift.countGivenGifts())) {
				throw new ValidationError('Tego prezentu jest za mało.')
			}
		}

		child.giftid = gift?.id ?? null
		await child.update()

		res.json(child)
	})
