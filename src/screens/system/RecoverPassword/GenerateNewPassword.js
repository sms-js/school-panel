import styles from './GenerateNewPassword.module.css';

import React, { useState, useContext, useEffect } from 'react';
import { Card, Form, Icon, Input, Button, Spin } from 'antd';
import SessionContext from 'components/SessionContext';
import { generatenewpassword, validateToken } from 'lib/api';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const GenerateNewPassword = ({ form, match }) => {
	const [requestError, setRequestError] = useState(false);
	const [passwordHasBeenChanged, setPasswordHasBeenChanged] = useState(false);
	const [tokenHasBeenValidated, setTokenHasBeenValidated] = useState(false);
	const [loading, setLoading] = useState(true);

	const { getFieldDecorator } = form;

	useEffect(() => {
		validateTokenProcess();
	}, []);

	const validateTokenProcess = async () => {
		if (match.params.token !== undefined) {
			const response = await validateToken({ token: match.params.token });
			if (response.success) {
				setTokenHasBeenValidated(true);
			}
		}
		setLoading(false);
	};

	const handleSubmit = (session, e) => {
		setRequestError(false);
		e.preventDefault();
		form.validateFields(async (err, values) => {
			if (!err) {
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
	let loginHasFailedCard = (
		<div className={styles['login-container']}>
			<Card title="Authentication error" className={styles['login-card-container']}>
				<div className={styles['buttons-style']}>
					<Button type="primary" htmlType="button" className={styles['login-form-button']}>
						<Link to="/login">Log in</Link>
					</Button>
				</div>
			</Card>
		</div>
	);

	let generateNewPasswordCard = (
		<div className={styles['login-container']}>
			<Card title="Generate your new password" className={styles['login-card-container']}>
				<Form onSubmit={e => handleSubmit(session, e)} className={styles['login-form']}>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please enter your new password' }]
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
							rules: [{ required: true, message: 'Please confirm your new password' }]
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

	const passwordHasBeenChangedCard = (
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

	const loadingCard = (
		<div className={styles['login-container']}>
			<Card title="Loading" className={styles['login-card-container']}>
				{loading && <Spin style={{ paddingLeft: '50%' }} />}
			</Card>
		</div>
	);

	let activeCard = <div />;
	if (loading === true) {
		activeCard = loadingCard;
	} else {
		if (tokenHasBeenValidated === true) {
			activeCard = passwordHasBeenChanged ? passwordHasBeenChangedCard : generateNewPasswordCard;
		} else {
			activeCard = loginHasFailedCard;
		}
	}

	const session = useContext(SessionContext.context);

	return session.logged ? <Redirect to="/admin/home" /> : activeCard;
};

export default Form.create({ name: 'generate_new_password' })(GenerateNewPassword);
