import React from 'react'
import './App.css'
import Content from '../Content/Content'
import logo from '../pikachu-logo.png'
import { BrowserRouter as Router } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

function App() {
	return (
		<Router>
			<div className="App">
				<header className="block">
					<img src={logo} className="logo" alt="logo" />
					<div className="title">Pokemon Handbook</div>
				</header>

				<main>
					<Sidebar />
					<Content />
				</main>
				<footer className="block block-dark">
					Created by <a href="https://github.com/nshaikhinurov">Nail Shaikhinurov</a>
				</footer>
			</div>
		</Router>
	)
}

export default App
