import React,{useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function MessagesTable({ classes,messages,onDelete,sendSelectedMessageIdToParentCmp }) {
	const [data, setData] = useState(messages);

	useEffect(() => {
		setData(messages);
	}, [messages]);

	const drag = (e) => {
		console.log('starting to drag, e = ', e);
		console.log('starting to drag, e.target.id = ', e.target.id);
		e.dataTransfer.setData('draggedMessageId', e.target.id);
		//e.dataTransfer.setData('transfer2', e.target.parentElement._id);
	};

	const notAllowDrop = (e) => {
		e.stopPropagation();
	};


  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Usuario</TableCell>
            <TableCell align="center">Mensaje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(message => (
						<TableRow onClick={()=>sendSelectedMessageIdToParentCmp(message._id)} key={message._id}
							id={message._id} draggable="true"
						onDragStart={(e) => drag(e)}
						onDragOver={(e) => notAllowDrop(e)}>
              <TableCell align='left'>
                {message.deliveryDate}
              </TableCell>
              <TableCell align="left">{message.listener.wapUsername}</TableCell>
              <TableCell align="left">{message.messageData.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

MessagesTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessagesTable);
