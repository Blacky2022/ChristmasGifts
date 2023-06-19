import express, { urlencoded, static as eStatic } from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import { handleError } from './utils/errors'
import { childRouter } from './routers/child'
import { giftRouter } from './routers/gift'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { userRouter } from './routers/user'
require('./utils/db')

const app = express()
dotenv.config()
app.use(express.json())
app.use(bodyParser.json())
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)
app.use(cookieParser())
app.use('/child', childRouter)
app.use('/gift', giftRouter)
app.use('/user', userRouter)
app.use(handleError)

app.listen(3001, '0.0.0.0', (): void => {
	console.log('Tobiasz Latocha podsłuchuje na http://localhost:3001')
})
function Static(arg0: string): any {
	throw new Error('Function not implemented.')
}
