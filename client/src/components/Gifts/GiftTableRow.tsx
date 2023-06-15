/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { GiftEntity } from 'types'
interface Props {
	gift: GiftEntity
	onGiftsChange: () => void
}
export const GiftTableRow = (props: Props) => {
	const deleteGift: MouseEventHandler<HTMLAnchorElement> = async e => {
		e.preventDefault()
		if (!window.confirm(`Czy na pewno chcesz usunąć ${props.gift.name}?`)) {
			return
		}

		const res = await fetch(`http://localhost:3001/gift/${props.gift.id}`, {
			method: 'DELETE',
		})
		if (res.status === 400) {
			const error = await res.json()
			alert(`Błąd serwera: ${error.message}`)
			return
		}
		props.onGiftsChange()
	}
	return (
		<tr>
			<th>
				<Link to={`/gift/${props.gift.id}`}>{props.gift.name}</Link>
			</th>
			<td>{props.gift.count}</td>
			<td>
				<a href='#' onClick={deleteGift}>
					🗑️
				</a>
			</td>
		</tr>
	)
}
