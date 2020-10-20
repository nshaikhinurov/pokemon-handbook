import React from 'react'
import styles from './BreadcrumbItem.module.css'

const BreadcrumbItem = ({ children, ...props }) => (
	<li className={styles['breadcrumb-item']} {...props}>
		{children}
	</li>
)

export default BreadcrumbItem
