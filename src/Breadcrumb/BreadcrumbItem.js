import React from 'react'
import styles from './BreadcrumbItem.module.css'
import cx from 'classnames'

const BreadcrumbItem = ({ children, ...props }) => (
	<li className={cx('capitalize', styles['breadcrumb-item'])} {...props}>
		{children}
	</li>
)

export default BreadcrumbItem
