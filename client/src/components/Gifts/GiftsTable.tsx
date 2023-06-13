import React from 'react'
import { GiftEntity } from 'types'
import { GiftTableRow } from './GiftTableRow'

interface Props {
	gifts: GiftEntity[]
}
export const GiftsTable = (props: Props) => (
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>Nazwa</th>
				<th>Ilosc</th>
				<th>Usun</th>
			</tr>
		</thead>
		<tbody>
			{props.gifts.map(gift => (
				<GiftTableRow gift={gift} key={gift.id} />
			))}
		</tbody>
	</table>
)
