import styles from './Authenticated.module.css';

import React, { useContext } from 'react';
import SideBarContainer from 'components/SideBarContainer';
import { Card } from 'antd';
import { validateRules } from 'lib/session';
import SessionContext from 'components/SessionContext';

const WithoutPermissions = ({ rule }) => (
	<Card title="Error" className={[styles['authenticated-card'], styles['error']]}>
		<p>Without permissions</p>
		<p>Message: the rule ({rule}) validation failed</p>
	</Card>
);

const AuthComponentCardSuccess = user => {
	return validateRules('AuthComponentCardSuccess', user) ? (
		<Card key="AuthComponentCardSuccess" title="Success" className={[styles['authenticated-card'], styles['success']]}>
			<p>You have permissions to access AuthComponentCardSuccess</p>
		</Card>
	) : (
		<WithoutPermissions key="auth-success" rule="AuthComponentCardSuccess" />
	);
};

const AuthComponentCardError = user => {
	return validateRules('AuthComponentCardError', user) ? (
		<Card key="AuthComponentCardError" title="Error" className={[styles['authenticated-card'], styles['success']]}>
			<p>You have permissions to access AuthComponentCardError</p>
		</Card>
	) : (
		<WithoutPermissions key="auth-error" rule="AuthComponentCardError" />
	);
};

//Component, user, props = {}, redirect = true
const Authenticated = () => {
	const session = useContext(SessionContext.context);
	return (
		<SideBarContainer title="Authenticated route">
			<div className={styles['authenticated-container']}>
				{/* This component should validate and render */}
				{AuthComponentCardSuccess(session.user)}
				{/* This component should not validate and render WithoutPermission component */}
				{AuthComponentCardError(session.user)}
			</div>
		</SideBarContainer>
	);
};

export default Authenticated;
