import React from 'react';
import PropTypes from 'prop-types';

const Draggable = props => {
	const drag = e => {
		e.dataTransfer.setData('transfer', e.target.id);
		e.dataTransfer.setData('transfer2', e.target.parentElement.id);
	};

	const notAllowDrop = e => {
		e.stopPropagation();
	};

	return (
		<div
			id={props.id}
			draggable="true"
			onDragStart={e => drag(e)}
			onDragOver={e => notAllowDrop(e)}
			style={props.style}
		>
			{props.children}
		</div>
	);
};

/*
class Draggable extends Component {
	drag = (e) => {
		e.dataTransfer.setData('transfer', e.target.id);
		e.dataTransfer.setData('transfer2', e.target.parentElement.id);
	};
	notAllowDrop = (e) => {
		e.stopPropagation();
	};
	render() {
		return (
			<div
				id={this.props.id}
				draggable="true"
				onDragStart={this.drag}
				onDragOver={this.notAllowDrop}
				style={this.props.style}
			>
				{this.props.children}
			</div>
		);
	}
} 
*/

Draggable.propTypes = {
	id: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.node
};

export default Draggable;
