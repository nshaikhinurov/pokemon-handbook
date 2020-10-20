import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
	return (
		<div className="sidebar">
			<NavLink to="/pokemons" className="sidebar-link">
				Pokemons
			</NavLink>
			<NavLink to="/abilities" className="sidebar-link">
				Abilities
			</NavLink>
		</div>
	)
}

export default Sidebar
