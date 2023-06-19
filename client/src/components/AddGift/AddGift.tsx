import React, { FormEvent, useState } from 'react'
import { CreateGiftReq, GiftEntity } from 'types'
import { Spinner } from '../Common/Spinner/Spinner'
import './AddGift'
export const AddGift = () => {
	const [form, setForm] = useState<CreateGiftReq>({
		name: '',
		count: 0,
	})
	const [loading, setLoading] = useState<boolean>(false)
	const [resultInfo, setResultInfo] = useState<string | null>(null)
	const [nameError, setNameError] = useState<string | null>(null)
	const [countError, setCountError] = useState<string | null>(null)

	const updateForm = (key: string, value: any) => {
		setForm(form => ({
			...form,
			[key]: value,
		}))
	}

	const validateForm = () => {
		let hasErrors = false

		if (form.name.trim() === '') {
			setNameError('Nazwa prezentu jest wymagana.')
			hasErrors = true
		} else {
			setNameError(null)
		}

		if (form.count <= 0) {
			setCountError('Ilość musi być liczbą dodatnią.')
			hasErrors = true
		} else {
			setCountError(null)
		}

		return !hasErrors
	}

	const sendForm = async (e: FormEvent) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

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
			window.location.reload()
		}
	}

	if (loading) {
		return <Spinner />
	}

	if (resultInfo !== null) {
		return (
			<div>
				<p>
					<strong>{resultInfo}</strong>
				</p>
				<button onClick={() => setResultInfo(null)}>Dodaj kolejny</button>
			</div>
		)
	}

	return (
		<div className='container'>
			<form className='form-container' onSubmit={sendForm}>
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
					{nameError && <span style={{ color: 'red' }}>{nameError}</span>}
				</p>
				<p>
					<label>
						Ilosc:
						<br />
						<input
							type='number'
							placeholder='Liczba sztuk'
							value={form.count}
							onChange={e => updateForm('count', parseInt(e.target.value, 10))}
						/>
					</label>
					{countError && <span style={{ color: 'red' }}>{countError}</span>}
				</p>
				<button type='submit'>Dodaj</button>
			</form>
		</div>
	)
}
