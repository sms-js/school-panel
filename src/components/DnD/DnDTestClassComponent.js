import React, { Component } from 'react';
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

class DnDTest extends Component {
	state = {
		dataSource: data,
		containers: {
			drop1: data.map(el => el.id),
			drop2: [],
			drop3: []
		}
	};

	updateArrays(currentDropTarget, transferredElement, updatedDestinationContainer, originContainerName) {
		console.log('currentDropTarget = ', currentDropTarget);
		console.log('transferredElement = ', transferredElement);
		console.log('updatedDestinationContainer = ', updatedDestinationContainer);
		console.log('originContainer = ', originContainerName);
		console.log('this.state.dataSource = ', this.state.dataSource);
		let actualOriginContainer = this.state.containers[originContainerName];
		let actualDestinationContainer = this.state.containers[currentDropTarget];
		let updatedOriginContainer = [];
		actualOriginContainer.forEach(el => {
			if (el !== transferredElement) {
				updatedOriginContainer.push(el);
			}
		});

		let state = { ...this.state };
		state.containers[originContainerName] = updatedOriginContainer;
		state.containers[currentDropTarget] = updatedDestinationContainer;
		this.setState(state);
	}

	drop = e => {
		e.preventDefault();
		const transferredData = e.dataTransfer.getData('transfer');
		const originContainerName = e.dataTransfer.getData('transfer2');
		e.target.appendChild(document.getElementById(transferredData));
		const destinationContainerName = e.currentTarget.id;
		let updatedDestinationContainer = [];
		e.currentTarget.childNodes.forEach(el => updatedDestinationContainer.push(el.id));

		this.updateArrays(destinationContainerName, transferredData, updatedDestinationContainer, originContainerName);
	};

	allowDrop = e => {
		e.preventDefault();
	};

	render() {
		return (
			<div>
				<Wrapper>
					<Droppable allowDrop={this.allowDrop} drop={this.drop} id="drop1" style={droppableStyle}>
						{draggableArray}
					</Droppable>
					<Droppable allowDrop={this.allowDrop} drop={this.drop} id="drop2" style={droppableStyle} />
					<Droppable allowDrop={this.allowDrop} drop={this.drop} id="drop3" style={droppableStyle} />
				</Wrapper>
				<div>
					<p>{this.state.containers.drop1}</p>
					<div>-----------------------------------</div>
					<p>{this.state.containers.drop2}</p>
					<div>-----------------------------------</div>
					<p>{this.state.containers.drop3}</p>
				</div>
			</div>
		);
	}
}

export default DnDTest;
