import { FieldPacket } from 'mysql2'
import { pool } from '../utils/db'
import { ValidationError } from '../utils/errors'
import { v4 as uuid } from 'uuid'

type UserRecordResults = [UserRecord[], FieldPacket[]]

export interface UserEntity {
	id?: string
	username: string
	password: string
}

export class UserRecord implements UserEntity {
	id?: string
	username: string
	password: string

	constructor(obj: UserEntity) {
		if (!obj.username || obj.username.length < 8 || obj.username.length > 55) {
			throw new ValidationError('Nazwa uzytkownika musi mieć od 8 do 55 znaków.')
		}
		this.id = obj.id
		this.username = obj.username
		this.password = obj.password
	}

	async insert(): Promise<string> {
		if (!this.id) {
			this.id = uuid()
		}

		await pool.execute('INSERT INTO `users` VALUES (?, ?, ?)', [this.id, this.username, this.password])
		return this.id
	}

	static async getByUsername(username: string): Promise<UserRecord | null> {
		const [results] = (await pool.execute('SELECT * FROM `users` WHERE `username` = ?', [
			username,
		])) as UserRecordResults
		return results.length === 0 ? null : new UserRecord(results[0])
	}
}

export default UserRecord
