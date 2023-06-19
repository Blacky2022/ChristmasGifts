import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './loginform.css'

export const LoginPageView = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()

	const handleUsernameChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setUsername(event.target.value)
	}

	const handlePasswordChange = (event: { target: { value: React.SetStateAction<string> } }) => {
		setPassword(event.target.value)
	}

	const handleLogin = async () => {
		try {
			const res = await fetch('http://localhost:3001/user/signin', {
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
			if (res.ok) {
				navigate('./child')
			}
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className='login-form'>
			<h1>Login</h1>
			<div className='login-form'>
				<input type='text' placeholder='username' value={username} onChange={handleUsernameChange} />
				<input type='password' placeholder='password' value={password} onChange={handlePasswordChange} />
				<div>
					<button onClick={handleLogin}>Login</button>
				</div>
				<div>
					<button>
						<Link to='/register' className='button-link'>
							Register
						</Link>
					</button>
				</div>
			</div>
		</div>
	)
}
