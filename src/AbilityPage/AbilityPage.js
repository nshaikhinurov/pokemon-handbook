import * as R from 'ramda'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SET_CATEGORY, SET_PAGE } from '../redux/actions'

const mapDispatchToProps = dispatch => ({
	setCategory(category) {
		dispatch({ type: SET_CATEGORY, category })
	},
	setPage(page) {
		dispatch({ type: SET_PAGE, page })
	},
})

function AbilityPage({ setPage, setCategory }) {
	let { ability } = useParams()
	const [abilityData, setAbilityData] = useState(null)

	useEffect(
		function fetchAbilityData() {
			fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
				.then(res => res.json())
				.then(data => ({
					id: data.id,
					name: R.pipe(
						//
						R.prop('names'),
						R.find(R.pathEq(['language', 'name'], 'en')),
						R.prop('name')
					)(data),
					description: R.pipe(
						//
						R.prop('flavor_text_entries'),
						R.find(R.pathEq(['language', 'name'], 'en')),
						R.prop('flavor_text')
					)(data),
					details: R.pipe(
						//
						R.prop('effect_entries'),
						R.find(R.pathEq(['language', 'name'], 'en')),
						R.prop('effect')
					)(data),
				}))
				.then(R.tap(setAbilityData))
				.then(R.tap(() => setCategory('abilities')))
				.then(R.pipe(R.prop('name'), setPage))
		},
		[ability, setCategory, setPage]
	)

	return abilityData ? (
		<>
			<h1>{abilityData.name}</h1>

			<div className="ability-details">
				<div className="table">
					<div>
						<span>Name</span>
						<span>{abilityData.name}</span>
					</div>
					<div>
						<span>Id</span>
						<span>{abilityData.id}</span>
					</div>
					<div>
						<span>Description</span>
						<span>{abilityData.description}</span>
					</div>
					<div>
						<span>Details</span>
						<span>{abilityData.details}</span>
					</div>
				</div>
			</div>
		</>
	) : (
		<div>Loading...</div>
	)
}

export default connect(null, mapDispatchToProps)(AbilityPage)
