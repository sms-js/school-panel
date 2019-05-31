import React from 'react';
import { Card, Popover } from 'antd';
import styles from './MessagesCards.module.css';
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
		<Popover
			key={'popover_key_' + props._id}
			overlayClassName={styles.popOverStyle}
			content={popovercontent}
			title={props.listener.wapUsername}
		>
			<Draggable key={'key_' + props._id} id={props._id}>
				<Card
					size="small"
					title={props.listener.wapUsername}
					extra={<a href="https://google.com">CouldBeALink</a>}
					className={styles.cardStyle}
					key={'card_key_' + props._id}
				>
					<p>{props.data.body}</p>
					<p>{props.data.codeWords[0]}</p>
					<p>Card content xxxxx</p>
				</Card>
			</Draggable>
		</Popover>
	);
};

const MessagesCards = ({ messages }) => {
	return messages.map(msg => <CardWithPopOver key={'cwpoKey_' + msg._id} props={msg} />);
};

export default MessagesCards;