import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Spin, Table, Card, Popover, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import styles from './MessagesCards.module.css';
import SideBarContainer from 'components/SideBarContainer';
import SessionContext from 'components/SessionContext';
import { Draggable } from '../../../../../components/DnD';

const popovercontent = (
	<div>
		<p>popoverContent1</p>
		<p>popoverContent2</p>
	</div>
);

const CardWithPopOver = ({ props }) => {
	// console.log(' CardWithPopOver, props = ',props);
	// console.log(props.listener.wapUsername);

	return (
		<Popover key={'popover_key_' + props._id} overlayClassName={styles.popOverStyle} content={popovercontent} title={props.listener.wapUsername}>
			<Draggable key={'key_' + props._id} id={props._id}>
				<Card
					size="small"
					title={props.listener.wapUsername}
					extra={<a href="#">CouldBeALink</a>}
					className={styles.cardStyle}
					key={'card_key_'+props._id}
				>
					<p>{props.messageData.body}</p>
					<p>{props.messageData.codeWords[0]}</p>
					<p>Card content xxxxx</p>
				</Card>
			</Draggable>
		</Popover>
	);
};

/* const MessagesCards = ({ messages, onDelete }) => {
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const cardsArray = messages.map((msg) => (
		<Col key={'_id' + msg._id} span={8}>
			<CardWithPopOver props={msg} />
		</Col>
	));

	const SideBarComponent = (
		<div className={styles.cardsDiv}>
			<Row gutter={16}>{cardsArray}</Row>
		</div>
	);

	return SideBarComponent;
}; */

const MessagesCards = ({ messages, onDelete }) => {
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const cardsArray = messages.map((msg) => (
		<CardWithPopOver key={'cwpoKey_'+msg._id} props={msg} />
	));

	return  cardsArray;
};


export default MessagesCards;
