import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import PropTypes from 'prop-types';

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing.unit * 2
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing.unit * 1,
		top: theme.spacing.unit * 1,
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography variant="h6">{children}</Typography>
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing.unit * 2
	}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing.unit * 1
	}
}))(MuiDialogActions);

const ConfirmationModal = ({ fullScreen, modalTitle, modalContent,handleModalConfirm,modalKey }) => {
	
	const [open, setOpen] = useState(true);
	
	const handleButton= (props) => {
		 setOpen(false);
		 handleModalConfirm(props)
	 };

	return (
		<div>
			<Dialog aria-labelledby="customized-dialog-title" open={open} fullScreen={fullScreen}>
				<DialogTitle id="customized-dialog-title" >
					{`Folder: ${modalTitle}`}
				</DialogTitle>
				<DialogContent dividers="true">
					<Typography gutterBottom>{`${modalContent}`}</Typography>
				</DialogContent>
				<DialogActions>
					<Button  onClick={()=>handleButton(false)} color="primary">
						Cancel
					</Button>
					<Button variant="outlined" color="secondary" onClick={()=>handleButton(true)}>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

ConfirmationModal.propTypes = {
	fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(ConfirmationModal);
