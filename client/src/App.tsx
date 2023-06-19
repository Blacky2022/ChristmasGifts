
import { GiftsView } from './views/GiftsView'
import { Route, Routes } from 'react-router-dom'

import { NotFoundView } from './views/NotFoundView'
import { SingleGiftView } from './views/SingleGiftView'
import { ChildView } from './views/ChildView'
import { SummaryView } from './views/SummaryView'
import { LoginPageView } from './views/LoginPageView'
import { RegisterPageView } from './views/RegisterPageView'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<LoginPageView />} />
				<Route path='/register' element={<RegisterPageView />} />
				<Route path='/gift' element={<GiftsView />} />
				<Route path='/gift/:idOfGift' element={<SingleGiftView />} />
				<Route path='/child' element={<ChildView />} />
				<Route path='/summary' element={<SummaryView />} />
				<Route path='*' element={<NotFoundView />} />
			</Routes>
		</>
	)
}

export default App
