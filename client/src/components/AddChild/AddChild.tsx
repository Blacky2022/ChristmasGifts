import { FormEvent, useState } from 'react'
import { ChildEntity, CreateChildReq } from 'types'
import { Spinner } from '../Common/Spinner/Spinner'
export const AddChild = () => {
	const [form, setForm] = useState<CreateChildReq>({
		name: '',
		giftId: '',
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
			const res = await fetch(`http://localhost:3001/child`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})
			const data: ChildEntity = await res.json()

			setResultInfo(`${data.name} : dodano do listy .`)
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
			<h2>Dodaj dziecko</h2>
			<p>
				<label>
					Imie:
					<br />
					<input
						type='text'
						placeholder='Imie dziecka'
						value={form.name}
						onChange={e => updateForm('name', e.target.value)}
					/>
				</label>
			</p>
			<button type='submit'>Dodaj</button>
		</form>
	)
}
