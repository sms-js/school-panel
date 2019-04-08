import styles from './GenerateNewPassword.module.css';

import React, { useState, useContext } from 'react';
import { Card, Form, Icon, Input, Button, Spin } from 'antd';
import SessionContext from 'components/SessionContext';
import { generatenewpassword } from 'lib/api';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const GenerateNewPassword = ({ form, match }) => {
	console.log('generateNewPassword/match = ', match);
	const [ requestError, setRequestError ] = useState(false);
	const [ passwordHasBeenChanged, setPasswordHasBeenChanged ] = useState(false);
	const { getFieldDecorator } = form;

	const handleSubmit = (session, e) => {
		console.log('handle submit: session = ', session);
		setRequestError(false);
		e.preventDefault();
		form.validateFields(async (err, values) => {
			if (!err) {
				console.log('values =', values);
				if (values.password === values.passwordConfirm) {
					values.token = match.params.token;
					const response = await generatenewpassword({ ...values });
					if (!response) {
						setRequestError(true);
						return;
					}
					setPasswordHasBeenChanged(true);
					session.add(response);
				} else {
					alert('password values are not equal');
				}
			}
		});
	};

	let generateNewPasswordCard = (
		<div className={styles['login-container']}>
			<Card title="Generate your new password" className={styles['login-card-container']}>
				<Form onSubmit={(e) => handleSubmit(session, e)} className={styles['login-form']}>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [ { required: true, message: 'Please enter your new password' } ]
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="New Password"
								type="password"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('passwordConfirm', {
							rules: [ { required: true, message: 'Please confirm your new password' } ]
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Confirm Password"
							/>
						)}
					</Form.Item>
					{requestError && <Form.Item validateStatus="error" help="Password change failed" />}
					<Form.Item>
						<div className={styles['buttons-style']}>
							<Button type="primary" htmlType="submit" className={styles['login-form-button']}>
								Submit
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Card>{' '}
		</div>
	);

	const passwordHasBeenChangedText = (
		<div className={styles['login-container']}>
			<Card title="Password has been changed" className={styles['login-card-container']}>
				<div className={styles['buttons-style']}>
					<Button type="primary" htmlType="button" className={styles['login-form-button']}>
						<Link to="/login">Log in</Link>
					</Button>
				</div>
			</Card>
		</div>
	);

	let activeCard = passwordHasBeenChanged ? passwordHasBeenChangedText : generateNewPasswordCard;

	const session = useContext(SessionContext.context);
	
	return session.logged ? <Redirect to="/admin/home" /> : activeCard;
};

export default Form.create({ name: 'generate_new_password' })(GenerateNewPassword);
