import { FieldPacket, RowDataPacket } from 'mysql2'
import { pool } from '../utils/db'
import { ValidationError } from '../utils/errors'
import { v4 as uuid } from 'uuid'
import { ChildEntity } from '../types'

type ChildRecordResults = [ChildRecord[], FieldPacket[]]
export class ChildRecord implements ChildEntity {
	id?: string
	name: string
	giftid: string
	constructor(obj: ChildEntity) {
		if (!obj.name || obj.name.length < 3 || obj.name.length > 25) {
			throw new ValidationError('Imię musi mieć od 3 do 25 znaków.')
		}

		this.id = obj.id
		this.name = obj.name
		this.giftid = obj.giftid
	}

	async insert(): Promise<string> {
		if (!this.id) {
			this.id = uuid()
		}

		await pool.execute('INSERT INTO `children`(`id`, `name`) VALUES(:id, :name)', {
			id: this.id,
			name: this.name,
		})

		return this.id
	}

	static async listAll(): Promise<ChildRecord[]> {
		const [results] = (await pool.execute('SELECT * FROM `children` ORDER BY `name` ASC')) as ChildRecordResults
		console.log({ results })
		return results.map(obj => new ChildRecord(obj))
	}

	static async getOne(id: string): Promise<null | ChildRecord> {
		const [results] = (await pool.execute('SELECT * FROM `children` WHERE `id` = :id', {
			id,
		})) as ChildRecordResults
		return results.length === 0 ? null : new ChildRecord(results[0])
	}

	async update(): Promise<void> {
		await pool.execute('UPDATE `children` SET `name` = :name, `giftId` = :giftId WHERE `id` = :id', {
			id: this.id,
			name: this.name,
			giftId: this.giftid,
		})
	}
}
