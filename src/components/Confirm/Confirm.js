import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Confirm = ({ show, handleClose, title = '', description = '', no = 'No', yes = 'Yes' }) => {
	return (
		<div>
			<Dialog
				open={show}
				onClose={() => handleClose(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">{description}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleClose(false)} color="primary">
						{no}
					</Button>
					<Button onClick={() => handleClose(true)} color="primary" autoFocus>
						{yes}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Confirm;
