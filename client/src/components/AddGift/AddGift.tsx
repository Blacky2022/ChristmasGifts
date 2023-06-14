import React, { FormEvent, useState } from 'react'
import { CreateGiftReq, GiftEntity } from 'types'
import { Spinner } from '../Common/Spinner/Spinner'
export const AddGift = () => {
	const [form, setForm] = useState<CreateGiftReq>({
		name: '',
		count: 0,
	})
	const [loading, setLoading] = useState<boolean>(false)
	const [resultInfo, setResultInfo] = useState<string | null>(null)
	const updateForm = (key: string, value: any) => {
		setForm(form => ({
			...form,
			[key]: value,
		}))
	}

	const sendForm = async (e: FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await fetch(`http://localhost:3001/gift`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
			const data: GiftEntity = await res.json()

			setResultInfo(`${data.name} added with ID ${data.id}.`)
		} finally {
			setLoading(false)
		}
	}

	if (loading) {
		return <Spinner />
	}
	if (resultInfo !== null) {
		return (
			<div>
				{' '}
				<p>
					<strong>{resultInfo}</strong>
				</p>
				<button onClick={() => setResultInfo(null)}>Dodaj kolejny</button>
			</div>
		)
	}

	return (
		<form onSubmit={sendForm}>
			<h2>Dodaj prezent</h2>
			<p>
				<label>
					Nazwa:
					<br />
					<input
						type='text'
						placeholder='nazwa prezentu'
						value={form.name}
						onChange={e => updateForm('name', e.target.value)}
					/>
				</label>
			</p>
			<p>
				<label>
					Ilosc:
					<br />
					<input
						type='number'
						placeholder='Liczba sztuk'
						value={form.count}
						onChange={e => updateForm('count', e.target.value)}
					/>
				</label>
			</p>
			<button type='submit'>Dodaj</button>
		</form>
	)
}
