import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styles from './styles';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const MessagesTable = ({ classes, messages, deleteMessage }) => {
	
	const drag = e => {
		e.dataTransfer.setData('draggedMessageId', e.target.id);
	};

	const notAllowDrop = e => {
		e.stopPropagation();
	};

	const handleDelete = key => {
		deleteMessage(key);
	};

	return (
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell align="left">Date</TableCell>
					<TableCell align="left">User</TableCell>
					<TableCell align="left">Data</TableCell>
					<TableCell align="left">Action</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{messages.map(message => (
					<TableRow
						key={message._id}
						id={message._id}
						draggable="true"
						onDragStart={e => drag(e)}
						onDragOver={e => notAllowDrop(e)}
					>
						<TableCell align="left">{moment(message.deliveryDate).format('DD/MM hh:mm')}</TableCell>
						<TableCell align="left">{message.listener}</TableCell>
						<TableCell align="left">{message.body}</TableCell>
						<TableCell align="left">
							<IconButton
								key={message._id}
								onClick={() => handleDelete(message._id)}
								aria-label="Delete"
							>
								<DeleteIcon />
							</IconButton>
						</TableCell>
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
