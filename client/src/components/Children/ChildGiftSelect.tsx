import React, { FormEvent, useState } from 'react'
import { GiftEntity, SetGiftForChildReq } from 'types'
import { Spinner } from '../Common/Spinner/Spinner'

interface Props {
	giftsList: GiftEntity[]
	selectedId: string | null
	childId: string
}

export const ChildGiftSelect = (props: Props) => {
	const [selected, setSelected] = useState<string>(props.selectedId === null ? '' : props.selectedId)

	const sendForm = async (e: FormEvent) => {
		e.preventDefault()
		await fetch(`http://localhost:3001/child/gift/${props.childId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				giftId: selected,
			} as SetGiftForChildReq),
		})
	}

	if (selected === null) {
		return <Spinner />
	}

	return (
		<form onSubmit={sendForm}>
			<select value={selected || ''} onChange={e => setSelected(e.target.value)}>
				<option value=''>Wybierz prezent</option>
				{props.giftsList.map(gift => (
					<option key={gift.id} value={gift.id}>
						{gift.name}
					</option>
				))}
			</select>
			<button type='submit'>Save</button>
		</form>
	)
}
