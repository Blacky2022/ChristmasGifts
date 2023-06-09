import { Request, Response, Router, response } from 'express'
import jwt from 'jsonwebtoken'
import UserRecord, { UserEntity } from '../records/user.record'
import bcrypt from 'bcrypt'
import { authenticateToken } from '../middlewares/token.middleware'
export const userRouter = Router()

interface CustomRequest extends Request {
	user?: UserEntity
}

userRouter.post('/signup', async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password } = req.body
		
		const checkUser = await UserRecord.getByUsername(username)
		if (checkUser) {
			throw new Error('Użytkownik już istnieje.')
		}
		const hashPassword = await bcrypt.hash(password, 10)
		const user = new UserRecord({ username, password: hashPassword })
		await user.insert()

		const token = jwt.sign(
			{
				username: user.username,
			},
			process.env.TOKEN_SECRET,
			{
				expiresIn: '1d',
			}
		)

		res.cookie('token', token, {
			httpOnly: true,
		})

		res.json({
			message: 'Użytkownik został pomyślnie zarejestrowany i zalogowany.',
		})
	} catch (err) {
		console.log(err)
	}
})

userRouter.post('/signin', async (req: Request, res: Response): Promise<void> => {
	const { username, password } = req.body

	const user = await UserRecord.getByUsername(username)

	if (!user) {
		throw new Error('Użytkownik nie istnieje.')
	}

	const isPasswordValid = await bcrypt.compare(password, user.password)
	if (!isPasswordValid) {
		throw new Error('Nieprawidłowe hasło.')
	}

	const token = jwt.sign(
		{
			username: user.username,
		},
		process.env.TOKEN_SECRET,
		{
			expiresIn: '1d',
		}
	)

	res.cookie('token', token, {
		httpOnly: true,
	})
	res.json({
		message: 'zalogowano!',
		id: user.id,
	})
})
userRouter.post('/logout', async (req: Request, res: Response): Promise<void> => {
	res.clearCookie('token')
	res.json({ status: true })
})
userRouter.post('/auth', authenticateToken, async (req: Request, res: Response): Promise<void> => {
	console.log(res)
	res.json({ status: true })
})
