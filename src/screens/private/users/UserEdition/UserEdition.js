import styles from './UserEdition.module.css';

import React, { useState, useEffect } from 'react';
import { Form, Button, Spin } from 'antd';
import SideBarContainer from 'components/SideBarContainer';
import { user as userLib } from 'lib/models';
import { Email, FirstName, LastName, UserType,UserName } from './inputs';
import { Redirect } from 'react-router-dom';
import { keyIsObject } from 'lib/validators/types';

const UserEdition = ({ form, match }) => {
	const params = keyIsObject(match, 'params') ? match.params : {};
	const [ user, setUser ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ success, setSuccess ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ mustReturn, setReturn ] = useState(false);

	const loadUser = async () => {
		if (params.id) {
			const data = await userLib.getUser(params.id);
			if (!data) {
				setError(true);
			} else {
				setUser(data);
			}
			setLoading(false);
		} else {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	const handleSubmit = (user, e) => {
		setLoading(true);
		setSuccess(false);
		setError(false);
		e.preventDefault();
		form.validateFields(async (err, values) => {
			if (err) setLoading(false);
			const response = user._id ? await userLib.updateUser(user._id, values) : await userLib.createUser(values, values);
			setLoading(false);
			if (!response) return setError(true);
			setSuccess(true);
			// If you dont want to redirect user after saving uncomment next line
			//setReturn(true);
		});
	};

	const Messages = () => (
		<div>
			{error && <Form.Item validateStatus="error" help="Request failed" />}
			{success && <Form.Item style={{ color: 'green' }} help="Saved!" />}
		</div>
	);

	if (mustReturn) return <Redirect to="/admin/users" />;

	return (
		<SideBarContainer title={user._id ? 'Update user' : 'Create user'}>
			<div className={styles['user-edit-container']}>
				<Form onSubmit={(e) => handleSubmit(user, e)} className={styles['login-form']}>
					<FirstName form={form} user={user} />
					<LastName form={form} user={user} />
					<UserName form={form} user={user} />
					<Email form={form} user={user} />
					<UserType form={form} user={user} />
					<Messages />
					<Form.Item>
						<Button type="primary" htmlType="submit" className={styles['login-form-button']}>
							{loading && <Spin />}
							{user._id ? 'Save' : 'Create'}
						</Button>
						<Button
							type="secondary"
							htmlType="button"
							className={styles['login-form-button']}
							onClick={() => setReturn(true)}
						>
							{success ? 'Back' : 'Cancel'}
						</Button>
					</Form.Item>
				</Form>
			</div>
		</SideBarContainer>
	);
};

export default Form.create({ name: 'user_edition_form' })(UserEdition);
