import React from 'react';
import PropTypes from 'prop-types';

const Droppable = (props) => {
	return (
		<div  id={props.id} onDrop={props.drop} onDragOver={props.allowDrop} style={props.style}>
			{props.children}
		</div>
	);
};

Droppable.propTypes = {
	id: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.node
};

export default Droppable;
