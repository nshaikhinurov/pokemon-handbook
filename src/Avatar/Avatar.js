import React from 'react'
import './Avatar.css'
import * as RA from 'ramda-adjunct'

function Avatar({ id, style, alt }) {
	return (
		<img
			alt={alt}
			style={style}
			className="avatar"
			src={id ? `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${RA.padCharsStart('0', 3, String(id))}.png` : '/pokeball.svg'}
		></img>
	)
}

export default Avatar
