import React from 'react'
import { NavLink } from 'react-router-dom'
export const Header = () => {
	const colorOfLink = ({ isActive }: {
		isActive?: boolean;
	}) => ({ color: isActive ? 'green' : 'red' })
	return (
		<>
			<h1>Organizer prezentowy</h1>
			Menu:
			<NavLink style={colorOfLink} to='/gift'>
				Prezenty
			</NavLink>
			|
			<NavLink style={colorOfLink} to='/child'>
				Dzieci
			</NavLink>
			<hr />
		</>
	)
}
