import startCase from 'lodash.startcase'
import queryString from 'query-string'
import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Pagination from '../Pagination/Pagination'
import { SET_CATEGORY, SET_PAGE } from '../redux/actions'
import './Abilities.css'

const mapDispatchToProps = dispatch => ({
	setCategory(category) {
		dispatch({ type: SET_CATEGORY, category })
	},
	setPage(page) {
		dispatch({ type: SET_PAGE, page })
	},
})

function AbilitiesPage({ setPage, setCategory }) {
	const limit = 20
	const total = 293
	const [abilities, setAbilities] = useState([])
	const { search } = useLocation()
	const searchParams = queryString.parse(search)
	const currentPageNumber = Number(searchParams.page) || 1

	useEffect(
		function updateBreadcrumbs() {
			setCategory('abilities')
			setPage(null)
		},
		[setPage, setCategory]
	)

	useEffect(
		function loadAbilities() {
			fetch(`https://pokeapi.co/api/v2/ability/?limit=${limit}&offset=${(currentPageNumber - 1) * limit}`)
				.then(res => res.json())
				.then(R.pipe(R.prop('results'), R.pluck('name')))
				.then(setAbilities)
		},
		[setPage, setCategory, currentPageNumber]
	)

	return (
		<>
			<h1>Abilities</h1>
			<ol className="ability-cards">
				{R.map(ability => (
					<Link to={`/abilities/${ability}`} key={ability}>
						{startCase(ability)}
					</Link>
				))(abilities)}
			</ol>
			<Pagination numberOfPages={Math.ceil(total / limit)} />
		</>
	)
}

export default connect(null, mapDispatchToProps)(AbilitiesPage)
