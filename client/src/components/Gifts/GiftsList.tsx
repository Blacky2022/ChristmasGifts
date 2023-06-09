import React, { useEffect, useState } from 'react'
import { GiftEntity } from 'types'
import { GiftsTable } from './GiftsTable'
import { Spinner } from '../Common/Spinner/Spinner'
import './GiftsList.css'
export const GiftsList = () => {
	const [GiftsList, setGiftsList] = useState<GiftEntity[] | null>(null)

	const refreshGifts = async () => {
		;(async () => {
			setGiftsList(null)
			const res = await fetch('http://localhost:3001/gift')
			const data = await res.json()
			setGiftsList(data.giftsList)
		})()
	}
	useEffect(() => {
		refreshGifts()
	}, [])
	if (GiftsList === null) {
		return <Spinner />
	}

	return (
		<div className='container'>
			<h1>Prezenty</h1>
			<GiftsTable gifts={GiftsList} onGiftsChange={refreshGifts} />
		</div>
	)
}
