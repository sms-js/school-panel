import React, { useReducer } from 'react';
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
import { reducerFunction } from '../../libSideBarTT';

const TagRClickMenu = ({ resetShowModal, actualSelectedTag, sendNewSelectedTagStateToTagTree, showModal }) => {

	const startDefaultDate = actualSelectedTag.startDate !== undefined ? moment(actualSelectedTag.startDate) : moment();
	const endDefaultDate =
		actualSelectedTag.endDate !== undefined ? moment(actualSelectedTag.endDate) : moment().add(24, 'h');
	
	const initialReducerState = {
		open: showModal,
		autoAssignTagToIncomingMessage: actualSelectedTag.autoAssignTagToIncomingMessage,
		codeWord: actualSelectedTag.codeWord,
		range: {
			startDate: startDefaultDate.format('YYYY-MM-DDTHH:mm'),
			endDate: endDefaultDate.format('YYYY-MM-DDTHH:mm')
		}
	};
	
	const [state, dispatch] = useReducer(reducerFunction, initialReducerState);

	const getSelectedDates = params => {
		console.log('getSelectedDates, params ', params);
	};

	const handleDatesChange = name => {
		return event => {
			state.range[name] = event.target.value;
			dispatch({ type: 'setRange', payLoad: state.range });
		};
	};

	const handleSubmit = () => {
		sendNewSelectedTagStateToTagTree({
			range: state.range,
			codeWord: state.codeWord,
			autoAssignTagToIncomingMessage: state.autoAssignTagToIncomingMessage
		});
		dispatch({ type: 'closeMenu' });
	};

	return (
		<form noValidate autoComplete="off">
			<div>
				<Dialog open={state.open} onClose={() => dispatch({ type: 'closeMenu' })} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">{`Edit folder: ${actualSelectedTag.title}`}</DialogTitle>
					<Divider />
					<DialogContent>
						<CodeWordField
							sendCodeWordToModal={value => dispatch({ type: 'setCodeWord', payLoad: value })}
							actualTagCodeWord={state.codeWord}
						/>
						<DialogContentText>
							<Grid container direction="row" justify="space-between" alignItems="center">
								Auto-assign incomming messages
								<AutoAssignTagSwitch
									handleShowTagDatesRange={switchState =>
										dispatch({ type: 'setShowTagDatesRange', payLoad: switchState })
									}
									actualState={actualSelectedTag.autoAssignTagToIncomingMessage}
								/>
								{state.autoAssignTagToIncomingMessage ? (
									<TagDatesRange
										handleDatesChange={handleDatesChange}
										sendSelectedDates={getSelectedDates}
										actualEndDate={state.range.endDate}
										actualStartDate={state.range.startDate}
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
	showModal: PropTypes.bool.isRequired
};

export default TagRClickMenu;
