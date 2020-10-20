import cx from 'classnames'
import queryString from 'query-string'
import * as R from 'ramda'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Pagination.css'

function Pagination({ numberOfPages }) {
	const { search } = useLocation()
	const searchParams = queryString.parse(search)
	const currentPageNumber = Number(searchParams.page) || 1

	return (
		<div className="pagination">
			<Link
				className="button"
				disabled={currentPageNumber - 1 < 1}
				to={location => `${location.pathname}?${queryString.stringify({ ...searchParams, page: currentPageNumber - 1 })}`}
			>
				&lt;
			</Link>

			{R.map(i => (
				<Link
					key={i}
					className={cx('button', { active: i === currentPageNumber })}
					to={location => `${location.pathname}?${queryString.stringify({ ...searchParams, page: i })}`}
				>
					{i}
				</Link>
			))(R.range(1, 1 + numberOfPages))}

			<Link
				className="button"
				disabled={currentPageNumber + 1 > numberOfPages}
				to={location => `${location.pathname}?${queryString.stringify({ ...searchParams, page: currentPageNumber + 1 })}`}
			>
				&gt;
			</Link>
		</div>
	)
}

export default Pagination
