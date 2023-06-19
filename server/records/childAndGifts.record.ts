import { FieldPacket } from 'mysql2'
import { pool } from '../utils/db'
import { childAndGiftEntity } from '../types'

type ChildAndGiftRecordResults = [ChildAndGiftRecord[], FieldPacket[]]
interface Child {
	child_id: string
	child_name: string
}

export interface Gift {
	gift_id: string
	gift_name: string
	children: Child[]
}

export class ChildAndGiftRecord {
	id?: string | null
	name: string | null
	gift_id: string
	gift_name: string
 
	constructor(obj: ChildAndGiftRecord) {
		this.id = obj.id
		this.name = obj.name
		this.gift_id = obj.gift_id
		this.gift_name = obj.gift_name
	}

	static async listAll(): Promise<Gift[]> {
		const [results] = (await pool.execute(
			'SELECT children.id, children.name, gifts.id AS gift_id, gifts.name AS gift_name FROM gifts LEFT JOIN children ON children.giftid = gifts.id ORDER BY `gift_name` ASC'
		)) as ChildAndGiftRecordResults
		
		const gifts: Gift[] = []

		results.forEach(result => {
			const { gift_id, gift_name, id, name } = result

			const giftIndex = gifts.findIndex(gift => gift.gift_id === gift_id)

			if (giftIndex !== -1) {
				if (id && name) {
					gifts[giftIndex].children.push({
						child_id: id,
						child_name: name,
					})
				}
			} else {
				const newGift: Gift = {
					gift_id,
					gift_name,
					children: [],
				}

				if (id && name) {
					newGift.children.push({
						child_id: id,
						child_name: name,
					})
				}

				gifts.push(newGift)
			}
		})


		return gifts
	}
}
