import styles from '../../styles';

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import DrawerContainer from 'components/DrawerContainer';
import { studentLib } from 'lib/models';

import { FormItem } from '../elements';
import { Redirect } from 'react-router-dom';
import { keyIsObject, isNotEmptyString, isNumber } from '../../../../../../lib/validators/types';
import { updateClassDeclaration } from 'typescript';

const ParentData = ({ parentType, adressEditable, parentData, classes, match, screenName, dispatchData }) => {
	const [parent, setParent] = useState(parentData);

	const [errors, setErrors] = useState(
		Object.keys(parentData).reduce((acc, key) => {
			acc[key] = false;
			return acc;
		}, {})
	);

	const [formError, setFormError] = useState(true);
	const [loading, setLoading] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [mustReturn] = useState(false);

	const updateFormErrors = () => {
		const hasErrors =
			Object.values(errors).indexOf(true) === -1
				? false //this happens, when all fields are fullfiled
				: true;
		setFormError(hasErrors);
	};

	const handleChange = (value, fieldName, index, userType, error) => {
		const newState = parent;
		newState[fieldName].value = value;
		setParent(Object.assign(parent, newState));
		setLoading(false);
		setSuccess(false);
		setErrors({ ...errors, [fieldName]: error });
		updateFormErrors();
		setTabsContainerState();
	};

	const setTabsContainerState = () => {
		if (parentType === 'mother') return dispatchData({ type: 'setMotherData', payLoad: parent });
		if (parentType === 'father') return dispatchData({ type: 'setFatherData', payLoad: parent });
	};

	const formItems = Object.keys(parent).map(key => {
		return (
			<Grid key={'grid_' + parent[key].id} item sm={3}>
				<FormItem
					validateField={isNotEmptyString}
					classes={classes}
					index={0}
					userType={parentType}
					handleChange={handleChange}
					error={errors[key]}
					key={parent[key].id}
					elementId={'id_' + parent[key].id}
					type={parent[key].type}
					label={parent[key].label}
					fieldName={key}
					value={parent[key].value}
					selectOptions={parent[key].type === 'Select' ? parent[key].selectOptions : null}
					editable={adressEditable}
				/>
			</Grid>
		);
	});

	useEffect(() => {
		const loadUser = async () => {
			const params = keyIsObject(match, 'params') ? match.params : {};
			if (params.id) {
				const data = await studentLib.getUser(params.id);
				if (!data) {
					setError(true);
				} else {
					setParent(data);
				}
				setLoading(false);
			} else {
				setLoading(false);
			}
		};
		loadUser();
	}, [match]);

	if (mustReturn) return <Redirect to="/admin/users" />;

	return (
		<Grid container spacing={2} style={{ flexGrow: 1 }}>
			<Paper className={classes.root} elevation={1} style={{ flexGrow: 1 }}>
				{loading && <LinearProgress />}
				{/* PARENT NAME, BIRTHDATE AND ID DATA */}
				<Grid container direction="row" style={{ flexGrow: 1 }}>
					<Grid item xs={12}>
						{parentType === 'mother' ? 'MOTHER DATA' : 'FATHER DATA'}
					</Grid>
					{formItems}
				</Grid>
				{success && <span className={classes.success}>Profile update success</span>}
				{error && <span className={classes.error}>Profile update error</span>}
			</Paper>
		</Grid>
	);
};

ParentData.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ParentData);
