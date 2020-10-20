import React from 'react'
import * as R from 'ramda'
import BreadcrumbItem from './BreadcrumbItem'
import './Breadcrumbs.module.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { capitalize } from '../helpers'
import GoBackButton from '../GoBackButton/GoBackButton'

const mapStateToProps = state => ({
	category: state.category,
	page: state.page,
})

const Breadcrumbs = ({ category, page }) => {
	const items = R.filter(Boolean)([
		{ to: '/', label: 'Home' },
		{ to: `/${category}`, label: capitalize(category) },
		page && { to: `/${category}/${page}`, label: capitalize(page) },
	])

	return (
		<>
			<ol>
				{R.pipe(
					R.addIndex(R.map)(({ to, label }, index, { length }) => (
						<Link key={to} to={to} disabled={index === length - 1}>
							{label}
						</Link>
					)),
					R.addIndex(R.map)((item, index) => <BreadcrumbItem key={`breadcrumb_item-${index}`}>{item}</BreadcrumbItem>),
					R.addIndex(R.reduce)((acc, item, index, children) => {
						if (index === children.length - 1) {
							acc.push(item)
						} else {
							acc.push(
								item,
								<li key={`breadcrumb-separator-${index}`} className="breadcrumb-separator">
									&gt;
								</li>
							)
						}
						return acc
					}, [])
				)(items)}
			</ol>
			<GoBackButton />
		</>
	)
}

export default connect(mapStateToProps)(Breadcrumbs)
