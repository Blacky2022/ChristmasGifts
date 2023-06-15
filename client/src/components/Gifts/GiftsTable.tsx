import React from 'react'
import { GiftEntity } from 'types'
import { GiftTableRow } from './GiftTableRow'

interface Props {
	gifts: GiftEntity[]
	onGiftsChange: () => void
}
export const GiftsTable = (props: Props) => (
	<table>
		<thead>
			<tr>
				<th>Nazwa</th>
				<th>Ilosc</th>
				<th>Usun</th>
			</tr>
		</thead>
		<tbody>
			{props.gifts.map(gift => (
				<GiftTableRow gift={gift} key={gift.id} onGiftsChange={props.onGiftsChange} />
			))}
		</tbody>
	</table>
)
