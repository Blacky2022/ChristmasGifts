import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import LogoutButton from '../Common/Logout/LogoutButton'

export const Header = () => {
	const colorOfLink = ({ isActive }: { isActive?: boolean }) => ({ color: isActive ? 'black' : 'grey' })

	return (
		<> 
			<h1>Organizer prezentowy</h1>
			<div className='nav-links'>
				<NavLink style={colorOfLink} to='/gift'>
					Prezenty
				</NavLink>

				<NavLink style={colorOfLink} to='/child'>
					Dzieci
				</NavLink>

				<NavLink style={colorOfLink} to='/summary'>
					Podsumowanie
				</NavLink>

				<LogoutButton />
			</div>
			<hr />
		</>
	)
}
