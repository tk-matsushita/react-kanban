import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Kanban from './Kanban'

class App extends Component {
	render () {
		return (
			<Kanban />
		)
	}
}
export default DragDropContext(HTML5Backend)(App)
