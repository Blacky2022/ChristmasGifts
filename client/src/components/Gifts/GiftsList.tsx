import React, { useEffect, useState } from 'react'
import {GiftEntity} from 'types'
import { GiftsTable } from './GiftsTable'

export const GiftsList = () => {
	const [GiftsList, setGiftsList] = useState<GiftEntity[] | null>(null)
	useEffect(() => {
		;(async () => {
			const res = await fetch('http://localhost:3001/gift')
			const data = await res.json()
			setGiftsList(data.giftsList)
		})()
	}, [])
	if (GiftsList === null) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h1>Gifts</h1>
			<GiftsTable gifts={GiftsList} />
		</>
	)
}
