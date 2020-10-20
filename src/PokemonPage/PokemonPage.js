import cx from 'classnames'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import { capitalize } from '../helpers'
import { SET_PAGE } from '../redux/actions'
import './PokemonPage.css'

const mapDispatchToProps = dispatch => ({
	setPage(page) {
		dispatch({ type: SET_PAGE, page })
	},
})

function PokemonPage({ setPage }) {
	let { id } = useParams()
	const [pokemonData, setPokemonData] = useState(null)

	useEffect(
		function fetchPokemonData() {
			fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
				.then(res => res.json())
				.then(data => ({
					id: data.id,
					name: data.name,
					weight: data.weight,
					height: data.height,
					abilities: R.map(R.path(['ability', 'name']))(data.abilities),
					types: R.map(R.path(['type', 'name']))(data.types),
				}))
				.then(R.tap(setPokemonData))
				.then(R.pipe(R.prop('name'), setPage))
		},
		[id, setPage]
	)

	return (
		pokemonData && (
			<div className="pokemon-details">
				<Avatar id={id} style={{ maxWidth: '250px', backgroundColor: 'transparent' }} />
				<div className="name">{pokemonData.name}</div>
				<div className="table">
					<div className="id">
						<span>Id</span>
						<span>{id}</span>
					</div>
					<div className="type">
						<span>Type</span>
						<span className="tags">
							{R.map(type => (
								<span key={type} className={cx('tag', type)}>
									{capitalize(type)}
								</span>
							))(pokemonData.types)}
						</span>
					</div>
					<div className="weight">
						<span>Weight</span>
						<span>{pokemonData.weight / 10} kg</span>
					</div>
					<div className="height">
						<span>Height</span>
						<span>{pokemonData.height / 10} m</span>
					</div>
					<div className="abilities">
						<span>Abilities</span>
						<ul className="tags">
							{R.map(ability => (
								<li key={ability}>
									<Link className="tag" to={`/abilities/${ability}`}>
										{capitalize(ability)}
									</Link>
								</li>
							))(pokemonData.abilities)}
						</ul>
					</div>
				</div>
			</div>
		)
	)
}

export default connect(null, mapDispatchToProps)(PokemonPage)
