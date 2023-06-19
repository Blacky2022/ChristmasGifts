import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './loginform.css'
export const RegisterPageView = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleUsernameChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setUsername(event.target.value)
	}

	const handlePasswordChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setPassword(event.target.value)
	}

	const handleRegister = async () => {
		try {
			const response = await fetch('http://localhost:3001/user/signup', {
				method: 'POST',
				credentials: 'include',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			})

			if (response.ok) {
				navigate('/child')
			} else {
				const errorData = await response.json()
				setError(errorData.Error)
			}
		} catch (err) {
			console.error(err)
			setError('An error occurred while registering.')
		}
	}

	return (
		<div className='login-form'>
			<h1>Register</h1>
			<input type='text' placeholder='username' value={username} onChange={handleUsernameChange} />
			<input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
			<div>
				<button onClick={handleRegister}>Register</button>
			</div>
			{error && <div className='error'>{error}</div>}
			<div>
				<button>
					<Link to='/' className='button-link'>
						Back to Login
					</Link>
				</button>
			</div>
		</div>
	)
}
