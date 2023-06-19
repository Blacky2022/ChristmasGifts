import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { GetSingleGiftRes } from 'types'
import { AuthProvider } from '../components/AuthProvider'

export const SingleGiftView = () => {
	const [giftInfo, setGiftInfo] = useState<GetSingleGiftRes | null>(null)
	const { idOfGift } = useParams()
	useEffect(() => {
		;(async () => {
			const res = await fetch(`http://localhost:3001/gift/${idOfGift}`)
			setGiftInfo(await res.json())
		})()
	}, [])
	if (giftInfo === null) {
		return null
	}

	return (
		<AuthProvider>
		<Header />
			<h2>{giftInfo.gift.name}</h2>
			<p>
				Adres ID tego prezentu to: <strong>{giftInfo.gift.id}</strong> oraz pozostało{' '}
				<strong>{giftInfo.gift.count - giftInfo.givenCount}</strong> sztuk do rozdania
			</p>
		</AuthProvider>
	)
}
