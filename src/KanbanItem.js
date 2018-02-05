import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'

const kanbanItemSource = {
	beginDrag (props) {
		return {
			id: props.id,
			index: props.index
		}
	}
}
const kanbanItemTarget = {
	hover (props, monitor, component) {
		const dragIndex = monitor.getItem().index
		const hoverIndex = props.index
		if (dragIndex === hoverIndex) {
			return;
		}
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
		const clientOffset = monitor.getClientOffset()
		const hoverClientY = clientOffset.y - hoverBoundingRect.top
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}
		props.moveCard(dragIndex, hoverIndex)
		monitor.getItem().index = hoverIndex
	}
}
class KanbanItem extends Component {
	constructor (props) {
		super(props)
		this.state = {
			textValue: ""
		}
		this.onChange = this.onChange.bind(this);
	}
	onChange(e) {
		this.setState({ textValue: e.target.value });
	}
	render() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props;
		const opacity = isDragging ? 0 : 1;
		return connectDragSource(connectDropTarget(
			<li className="kanban-item" style={{opacity}}>
				<input type="text" value={this.state.textValue} onChange={this.onChange} placeholder="New" />
				<button type="button" className="kanban-delete" data-index={this.props.index} onClick={this.props.deleteItem}>×</button>
			</li>
		));
	}
}
export default flow(
	DropTarget('KanbanItem', kanbanItemTarget, connect => ({
		connectDropTarget: connect.dropTarget()
	})),
	DragSource('KanbanItem', kanbanItemSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}))
)(KanbanItem)
