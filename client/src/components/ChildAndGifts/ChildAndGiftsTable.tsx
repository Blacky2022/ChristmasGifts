import { useEffect, useState } from 'react'
import { Spinner } from '../Common/Spinner/Spinner'
import { childAndGiftEntity } from 'types'
import { ChildrenAndGiftsRow } from './ChildAndGiftsRow'
import './Summary.css'
export const ChildAndGiftsTable = () => {
	const [data, setData] = useState<childAndGiftEntity[] | null>(null)

	const refreshChildAndGifts = async () => {
		;(async () => {
			setData(null)
			const res = await fetch('http://localhost:3001/child/all')
			const data = await res.json()
			setData(data.childrenAndGiftsList)
		})()
	}
	useEffect(() => {
		refreshChildAndGifts()
	}, [])
	if (data === null) {
		return <Spinner />
	}

	return (
		<div className='container'>
			<h1>Podsumowanie</h1>
			<table>
				<thead>
					<tr>
						<th>Imie</th>
						<th>Prezent</th>
					</tr>
				</thead>
				<tbody>
					{data.map(ChildAndGift => (
						<ChildrenAndGiftsRow key={ChildAndGift.id} child={ChildAndGift.name} gift={ChildAndGift.gift_name} />
					))}
				</tbody>
			</table>
		</div>
	)
}
