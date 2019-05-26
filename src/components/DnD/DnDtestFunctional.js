import React, { useState } from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';
import Droppable from './Droppable';

const Wrapper = styled.div`
	height: 500;
	padding: 0px;
	background-color: blue;
	border: 3px solid black;
	display: flex;
	flex-direction: row;
`;

const Item = styled.div`
	padding: 8px;
	color: #444;
	background-color: white;
	border-radius: 5px;
`;

const droppableStyle = {
	backgroundColor: '#888',
	width: 200,
	height: 300,
	margin: '32px',
	border: '1px solid red'
};

const data = [
	{
		id: 'a1_',
		bodyText: 'este es el bodyText 1'
	},
	{
		id: 'a2_',
		bodyText: 'este es el bodyText 2'
	},
	{
		id: 'a3_',
		bodyText: 'este es el bodyText 3'
	},
	{
		id: 'a4_',
		bodyText: 'este es el bodyText 4'
	},
	{
		id: 'a5_',
		bodyText: 'este es el bodyText 5'
	}
];

const draggableArray = data.map(el => {
	return (
		<Draggable key={'key_' + el.id} id={el.id} style={{ margin: '8px' }}>
			<Item>{el.bodyText}</Item>
		</Draggable>
	);
});

const DnDTest = () => {
	const [containers, setContainers] = useState({
		drop1: data.map(el => el.id),
		drop2: [],
		drop3: []
	});

	const updateArrays = (currentDropTarget, transferredElement, updatedDestinationContainer, originContainerName) => {
		console.log('currentDropTarget = ', currentDropTarget);
		console.log('transferredElement = ', transferredElement);
		console.log('updatedDestinationContainer = ', updatedDestinationContainer);
		console.log('originContainer = ', originContainerName);
		let actualOriginContainer = containers[originContainerName];
		let updatedOriginContainer = [];
		actualOriginContainer.forEach(el => {
			if (el !== transferredElement) {
				updatedOriginContainer.push(el);
			}
		});

		let newContainer = { ...containers };
		newContainer[originContainerName] = updatedOriginContainer;
		newContainer[currentDropTarget] = updatedDestinationContainer;
		setContainers(newContainer);
	};

	const drop = e => {
		e.preventDefault();
		const transferredData = e.dataTransfer.getData('transfer');
		const originContainerName = e.dataTransfer.getData('transfer2');
		e.target.appendChild(document.getElementById(transferredData));
		const destinationContainerName = e.currentTarget.id;
		let updatedDestinationContainer = [];
		e.currentTarget.childNodes.forEach(el => updatedDestinationContainer.push(el.id));

		updateArrays(destinationContainerName, transferredData, updatedDestinationContainer, originContainerName);
	};

	const allowDrop = e => {
		e.preventDefault();
	};

	return (
		<div>
			<Wrapper>
				<Droppable allowDrop={allowDrop} drop={drop} id="drop1" style={droppableStyle}>
					{draggableArray}
				</Droppable>
				<Droppable allowDrop={allowDrop} drop={drop} id="drop2" style={droppableStyle} />
				<Droppable allowDrop={allowDrop} drop={drop} id="drop3" style={droppableStyle} />
			</Wrapper>
			<div>
				<p>{containers.drop1}</p>
				<div>-----------------------------------</div>
				<p>{containers.drop2}</p>
				<div>-----------------------------------</div>
				<p>{containers.drop3}</p>
			</div>
		</div>
	);
};

export default DnDTest;
