import React from 'react'
import { GiftsList } from '../components/Gifts/GiftsList'
import { AddGift } from '../components/AddGift/AddGift'
import { Header } from '../components/Header/Header'
import { AuthProvider } from '../components/AuthProvider'

export const GiftsView = () => (
	<AuthProvider>
		<Header />
		<GiftsList />
		<AddGift />
	</AuthProvider>
)
