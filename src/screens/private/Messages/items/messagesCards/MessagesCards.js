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
	console.log(props);
	console.log(props.listener.wapUsername);

	return (
		<Draggable key={'key_' + props._id} id={props._id}>
			<Popover overlayClassName={styles.popOverStyle} content={popovercontent} title={props.listener.wapUsername}>
				<Card
					size="small"
					title={props.listener.wapUsername}
					extra={<a href="#">CouldBeALink</a>}
					className={styles.cardsStyle}
				>
					<p>{props.messageData.body}</p>
					<p>{props.messageData.codeWords[0]}</p>
					<p>Card content xxxxx</p>
				</Card>
			</Popover>
		</Draggable>
	);
};

const MessagesCards = ({ messages, onDelete }) => {
	const [ error, setError ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const cardsArray = messages.map((msg) => (
		<Col span={8}>
			<CardWithPopOver props={msg} />
		</Col>
	));

	const SideBarComponent = (
		<div className={styles['mainDiv']}>
			<div className={styles.cardsDiv}>
				<Row gutter={16}>{cardsArray}</Row>
			</div>
		</div>
	);

	return SideBarComponent;
};

export default MessagesCards;
