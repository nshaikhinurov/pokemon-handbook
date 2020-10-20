import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Abilities from '../Abilities/Abilities'
import AbilityPage from '../AbilityPage/AbilityPage'
import Breadcrumbs from '../Breadcrumb/Breadcrumbs'
import PokemonPage from '../PokemonPage/PokemonPage'
import PokemonsPage from '../Pokemons/Pokemons'
import './Content.css'

function Content() {
	return (
		<div className="content">
			<Breadcrumbs />

			<Switch>
				<Route path="/pokemons/:id">
					<PokemonPage />
				</Route>
				<Route path="/pokemons">
					<PokemonsPage />
				</Route>
				<Route path="/abilities/:ability">
					<AbilityPage />
				</Route>
				<Route path="/abilities">
					<Abilities />
				</Route>
				<Route exact path="/">
					<Redirect to="/pokemons" />
				</Route>
			</Switch>
		</div>
	)
}

export default Content
