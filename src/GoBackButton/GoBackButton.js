import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './GoBackButton.module.css'

function GoBackButton() {
	const history = useHistory()
	return (
		<button
			className={styles.button}
			type="button"
			onClick={() => {
				history.goBack()
			}}
		>
			← Go back
		</button>
	)
}

export default GoBackButton
