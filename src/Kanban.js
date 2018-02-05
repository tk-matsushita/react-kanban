import './Kanban.css'
import React, { Component } from 'react'
import KanbanBoard from './KanbanBoard'

export default class Kanban extends Component {
	constructor (props) {
		super(props)
		this.state = {
			types: ["Todo", "Doing", "Done"]
		}
	}
	render () {
		return(
			<div>
				<h1>Kanban Demo</h1>
				{this.state.types.map((type) =>
					<KanbanBoard key={type} type={type} />
				)}
			</div>
		);
	}
}
