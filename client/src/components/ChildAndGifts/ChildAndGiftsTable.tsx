import React, { useEffect, useState } from 'react'
import { Spinner } from '../Common/Spinner/Spinner'
import './Summary.css'

export const ChildAndGiftsTable = () => {
	const [data, setData] = useState<any[] | null>(null)

	const refreshChildAndGifts = async () => {
		try {
			const res = await fetch('http://localhost:3001/child/all')
			const data = await res.json()
			setData(data)
		} catch (error) {
			console.log('Error:', error)
		}
	}

	useEffect(() => {
		refreshChildAndGifts()
	}, [])

	if (data === null) {
		return <Spinner />
	}

	return (
		<div>
			<h1>Lista prezentów</h1>
			<ul>
				{data.map(gift => (
					<li key={gift.gift_id}>
						<strong>{gift.gift_name}</strong>
						{gift.children.length > 0 && (
							<ul>
								{gift.children.map((child: { child_id: React.Key | null | undefined; child_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined }) => (
									<li key={child.child_id}>{child.child_name}</li>
								))}
							</ul>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}

