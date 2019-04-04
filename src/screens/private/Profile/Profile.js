import styles from './Profile.module.css';

import React, { useState, useContext } from 'react';
import { Form, Button } from 'antd';
import SideBarContainer from 'components/SideBarContainer';
import { updateProfile } from 'lib/api';
import SessionContext from 'components/SessionContext';
import { UserName, FirstName, LastName, Password, PasswordConfirm } from './inputs';

const Profile = ({ form }) => {
	const [requestError, setRequestError] = useState(false);
	const [requestSuccess, setRequestSuccess] = useState(false);
	const [showingPassword, setShowingPassword] = useState(false);

	const handleSubmit = (session, e) => {
		setRequestSuccess(false);
		setRequestError(false);
		e.preventDefault();
		form.validateFields(async (err, values) => {
			if (!err) {
				const response = await updateProfile(session.user._id, values);
				if (!response) {
					setRequestError(true);
					return;
				}
				setRequestSuccess(true);
				session.updateUser(response);
			}
		});
	};

	const Messages = () => (
		<div>
			{requestError && <Form.Item validateStatus="error" help="Request failed" />}
			{requestSuccess && <Form.Item style={{ color: 'green' }} help="Saved!" />}
		</div>
	);

	const session = useContext(SessionContext.context);

	return (
		<SideBarContainer title="Profile">
			<div className={styles['profile-container']}>
				<Form onSubmit={e => handleSubmit(session, e)} className={styles['login-form']}>
					<UserName form={form} session={session} />
					<FirstName form={form} session={session} />
					<LastName form={form} session={session} />
					{showingPassword && <Password form={form} />}
					{showingPassword && <PasswordConfirm form={form} />}
					<Messages />
					<Form.Item>
						<Button type="primary" htmlType="submit" className={styles['login-form-button']}>
							Save
						</Button>
						<Button
							type="secondary"
							htmlType="button"
							className={styles['password-form-button']}
							onClick={() => setShowingPassword(!showingPassword)}
						>
							{!showingPassword ? 'Update password' : 'Hide'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</SideBarContainer>
	);
};

export default Form.create({ name: 'form_profile' })(Profile);
