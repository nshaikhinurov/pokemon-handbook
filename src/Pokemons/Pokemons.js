import queryString from 'query-string'
import * as R from 'ramda'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import PokemonCard from '../Card/Card'
import Pagination from '../Pagination/Pagination'
import { SET_CATEGORY, SET_PAGE } from '../redux/actions'
import './Pokemons.css'

const mapDispatchToProps = dispatch => ({
	setCategory(category) {
		dispatch({ type: SET_CATEGORY, category })
	},
	setPage(page) {
		dispatch({ type: SET_PAGE, page })
	},
})

function PokemonsPage({ setPage, setCategory }) {
	const limit = 20
	const total = 100
	const { search } = useLocation()
	const searchParams = queryString.parse(search)
	const currentPageNumber = Number(searchParams.page) || 1

	useEffect(
		function updateBreadcrumbs() {
			setCategory('pokemons')
			setPage(null)
		},
		[setPage, setCategory]
	)

	return (
		<>
			<h1>Pokemons</h1>
			<div className="pokemon-cards">
				{R.map(id => <PokemonCard key={id} id={id} />)(R.range(1 + (currentPageNumber - 1) * limit, 1 + currentPageNumber * limit))}
			</div>
			<Pagination numberOfPages={Math.ceil(total / limit)} />
		</>
	)
}

export default connect(null, mapDispatchToProps)(PokemonsPage)
