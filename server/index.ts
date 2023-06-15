import express, { urlencoded, static as eStatic } from 'express'
import 'express-async-errors'
//import { engine } from 'express-handlebars'
//import methodOverride from 'method-override'
import { handleError } from './utils/errors'
import { childRouter } from './routers/child'
import { giftRouter } from './routers/gift'
import cors from 'cors'
import bodyParser from 'body-parser'
require('./utils/db')
const { handlebarsHelpers } = require('./utils/handlebars-helpers')

const app = express()

//app.use(methodOverride('_method'))
/*app.use(
	urlencoded({
		extended: true,
	})
)
app.use(eStatic('public'))
app.use(express.json()); // Content-type: application/json
app.engine(
	'.hbs',
	engine({
		extname: '.hbs',
		helpers: handlebarsHelpers, // Dodatkowe funkcjonalności, które chcemy dodać do Handlebarsów
	})
)*/

//app.set('view engine', '.hbs')
app.use(bodyParser.json())
app.use(
	cors({
		origin: 'http://localhost:3000',
	})
)

app.use('/child', childRouter)
app.use('/gift', giftRouter)

app.use(handleError)

app.listen(3001, '0.0.0.0', (): void => {
	console.log('Listening on http://localhost:3001')
})
function Static(arg0: string): any {
	throw new Error('Function not implemented.')
}
