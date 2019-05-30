import React, { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from './styles';

const MessagesTable = ({ classes, messages, sendSelectedMessageIdToParentCmp }) => {
	const [data, setData] = useState(messages);

	useEffect(() => {
		setData(messages);
	}, [messages]);

	const drag = e => {
		e.dataTransfer.setData('draggedMessageId', e.target.id);
	};

	const notAllowDrop = e => {
		e.stopPropagation();
	};

	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell align="left">Fecha</TableCell>
					<TableCell align="left">Usuario</TableCell>
					<TableCell align="left">Mensaje</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map(message => (
					<TableRow
						onClick={() => sendSelectedMessageIdToParentCmp(message._id)}
						key={message._id}
						id={message._id}
						draggable="true"
						onDragStart={e => drag(e)}
						onDragOver={e => notAllowDrop(e)}
					>
						<TableCell align="left">{moment(message.deliveryDate).format('DD/MM hh:mm')}</TableCell>
						<TableCell align="left">{message.listener}</TableCell>
						<TableCell align="left">{message.body}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

MessagesTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessagesTable);
