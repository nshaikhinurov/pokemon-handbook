import React from 'react'
import './Avatar.css'

function Avatar({ id, style }) {
	return <img style={style} className="avatar" src={id ? `https://pokeres.bastionbot.org/images/pokemon/${id}.png` : '/pokeball.svg'}></img>
}

export default Avatar
