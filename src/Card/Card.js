import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
import * as R from 'ramda'
import cx from 'classnames'
import Avatar from '../Avatar/Avatar'
import { capitalize } from '../helpers'

function PokemonCard({ id }) {
	const [pokemonData, setPokemonData] = useState(null)

	useEffect(
		function fetchPokemonData() {
			fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
				.then(res => res.json())
				.then(R.pick(['id', 'name', 'abilities', 'types']))
				.then(setPokemonData)
		},
		[id]
	)

	return (
		<Link to={`/pokemons/${id}`} className="pokemon-card">
			<Avatar id={id} />
			<div className="name">{pokemonData ? pokemonData.name : 'Loading'}</div>
			<span className="types">
				{pokemonData &&
					R.map(R.pipe(R.path(['type', 'name']), type => <span key={type} className={cx('icon', type)} title={capitalize(type)} />))(
						pokemonData.types
					)}
			</span>
		</Link>
	)
}

export default PokemonCard
