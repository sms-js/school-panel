import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TagDatesRange from './elements/TagDatesRange';
import AutoAssignTagSwitch from './elements/AutoAssignTagSwitch';
import CodeWordField from './elements/CodeWordField';
import moment from 'moment';
import PropTypes from 'prop-types';

const TagRClickMenu = ({ resetShowModal, actualSelectedTag, sendNewSelectedTagStateToTagTree, showModal }) => {
	const [open, setOpen] = useState(showModal);
	const [autoAssignTagToIncomingMessage, setShowTagDatesRange] = useState(
		actualSelectedTag.autoAssignTagToIncomingMessage
	);
	const [codeWord, setCodeWord] = useState(actualSelectedTag.codeWord);

	const startDefaultDate = actualSelectedTag.startDate !== undefined ? moment(actualSelectedTag.startDate) : moment();
	const endDefaultDate =
		actualSelectedTag.endDate !== undefined ? moment(actualSelectedTag.endDate) : moment().add(24, 'h');
	const [range, setRange] = useState({
		startDate: startDefaultDate.format('YYYY-MM-DDTHH:mm'),
		endDate: endDefaultDate.format('YYYY-MM-DDTHH:mm')
	});

	const handleClose = () => {
		setOpen(false);
	};
	const handleShowTagDatesRange = switchState => {
		setShowTagDatesRange(switchState);
	};
	const getSelectedDates = params => {
		console.log('getSelectedDates, params ', params);
	};
	const getCodeWord = value => {
		setCodeWord(value);
	};
	const handleDatesChange = name => {
		return event => {
			return setRange(Object.assign(range, { [name]: event.target.value }));
		};
	};

	const handleSubmit = () => {
		sendNewSelectedTagStateToTagTree({
			...range,
			codeWord,
			autoAssignTagToIncomingMessage
		});
		setOpen(false);
	};

	return (
		<form noValidate autoComplete="off">
			<div>
				<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">{`Edit folder: ${actualSelectedTag.title}`}</DialogTitle>
					<Divider />
					<DialogContent>
						<CodeWordField sendCodeWordToModal={getCodeWord} actualTagCodeWord={actualSelectedTag.codeWord} />
						<DialogContentText>
							<Grid container direction="row" justify="space-between" alignItems="center">
								Auto-assign incomming messages
								<AutoAssignTagSwitch
									handleShowTagDatesRange={handleShowTagDatesRange}
									actualState={actualSelectedTag.autoAssignTagToIncomingMessage}
								/>
								{autoAssignTagToIncomingMessage ? (
									<TagDatesRange
										handleDatesChange={handleDatesChange}
										sendSelectedDates={getSelectedDates}
										actualEndDate={range.endDate}
										actualStartDate={range.startDate}
									/>
								) : null}
							</Grid>
						</DialogContentText>
						<Divider />
					</DialogContent>
					<DialogActions>
						<Button onClick={resetShowModal} color="primary">
							Cancel
						</Button>
						<Button onClick={handleSubmit} color="primary">
							Confirm
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</form>
	);
};

TagRClickMenu.propTypes = {
	resetShowModal: PropTypes.func.isRequired,
	actualSelectedTag: PropTypes.object.isRequired,
	sendNewSelectedTagStateToTagTree: PropTypes.func.isRequired,
	showModal:PropTypes.bool.isRequired
};

export default TagRClickMenu;
