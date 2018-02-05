import React, { Component } from 'react'
import update from 'react-addons-update'
import KanbanItem from './KanbanItem'

export default class KanbanBoard extends Component {
	constructor (props) {
		super(props)
		this.state = {
			count: 1,
			children: [
				{ id: 1, text: "" }
			]
		}
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}
	addItem() {
		var children = this.state.children;
		children.push({ id: ++this.state.count, text: "" });
		this.setState({ children: children });
	}
	deleteItem(e) {
		var children = this.state.children;
		var index = e.target.getAttribute("data-index");
		children.splice(index, 1);
		if(children.length === 0) {
			children.push({ id: ++this.state.count, text: "" });
		}
		this.setState({ children: children });
	}
	pushCard (card) {
		this.setState(update(this.state, {
			cards: {
				$push: [ card ]
			}
		}))
	}
	removeCard (index) {
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[index, 1]
				]
			}
		}))
	}
	moveCard (dragIndex, hoverIndex) {
		const { children } = this.state;
		const dragCard = children[dragIndex];
		this.setState(update(this.state, {
			children: {
				$splice: [
					[ dragIndex, 1 ],
					[ hoverIndex, 0, dragCard ]
				]
			}
		}))
	}
	render() {
		return(
			<div className="kanban-board">
				<h2>{this.props.type}</h2>
				<ul className="kanban-list">
					{this.state.children.map((child, index) =>
						<KanbanItem key={child.id} index={index} deleteItem={this.deleteItem} removeCard={this.removeCard.bind(this)} moveCard={this.moveCard.bind(this)} />
					)}
				</ul>
				<button type="button" className="kanban-add" onClick={this.addItem}>＋</button>
			</div>
		);
	}
}
