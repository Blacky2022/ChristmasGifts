import { FieldPacket } from 'mysql2'
import { pool } from '../utils/db'
import { childAndGiftEntity } from '../types'

type ChildAndGiftRecordResults = [ChildAndGiftRecord[], FieldPacket[]]
export class ChildAndGiftRecord implements childAndGiftEntity {
	id?: string
	name: string
	gift_name: string | null
	constructor(obj: ChildAndGiftRecord) {
		this.id = obj.id
		this.name = obj.name
		this.gift_name = obj.gift_name
	}

	static async listAll(): Promise<ChildAndGiftRecord[]> {
		const [results] = (await pool.execute(
			'SELECT children.id, children.name, gifts.name AS gift_name FROM children LEFT JOIN gifts ON children.giftid = gifts.id;'
		)) as ChildAndGiftRecordResults
		return results.map(obj => new ChildAndGiftRecord(obj))
	}
}
