import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from './Common/Spinner/Spinner'

const AuthContext = createContext(false)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [loggedIn, setLoggedIn] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		async function checkAuth() {
			try {
				const res = await fetch('http://localhost:3001/user/auth', {
					method: 'POST',
					credentials: 'include',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (res.ok) {
					setLoggedIn(true)
				} else {
					setLoggedIn(false)
					navigate('/')
				}
			} catch (error) {
				setLoggedIn(false)
				navigate('/')
			}
		}

		checkAuth()
	}, [navigate])

	return (
		<>{loggedIn === false ? <Spinner /> : <AuthContext.Provider value={loggedIn}>{children}</AuthContext.Provider>}</>
	)
}

export { AuthContext, AuthProvider }
