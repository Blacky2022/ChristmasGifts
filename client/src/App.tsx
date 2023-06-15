import React from 'react'
import './App.css'
import { GiftsView } from './views/GiftsView'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { NotFoundView } from './views/NotFoundView'
import { SingleGiftView } from './views/SingleGiftView'
import { ChildView} from './views/ChildView'
function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/gift' element={<GiftsView />} />
				<Route path='/gift/:idOfGift' element={<SingleGiftView />} />
				<Route path='/child' element={<ChildView />} />
				<Route path='*' element={<NotFoundView />} />
			</Routes>
		</>
	)
}

export default App
