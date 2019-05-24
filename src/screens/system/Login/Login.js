import styles from './Login.module.css';

import React, { useState, useContext } from 'react';
import { Card, Form, Icon, Input, Button } from 'antd';
import SessionContext from 'components/SessionContext';
import { login } from 'lib/api';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ form }) => {
	const [requestError, setRequestError] = useState(false);
	const { getFieldDecorator } = form;

	const handleSubmit = (session, e) => {
		setRequestError(false);
		e.preventDefault();
		form.validateFields(async (err, values) => {
			if (!err) {
				const { username, password } = values;
				const response = await login(username, password);
				if (!response) {
					setRequestError(true);
					return;
				}
				session.add(response);
			}
		});
	};

	const session = useContext(SessionContext.context);

	return session.logged ? (
		<Redirect to="/admin/home" />
	) : (
		<div className={styles['login-container']}>
			<Card title="Login" className={styles['login-card-container']}>
				<Form onSubmit={e => handleSubmit(session, e)} className={styles['login-form']}>
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: 'Please input your username!' }]
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
								autoComplete="current-username"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please input your Password!' }]
						})(
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="Password"
								autoComplete="current-password"
							/>
						)}
					</Form.Item>
					{requestError && <Form.Item validateStatus="error" help="Login request failed" />}
					<Form.Item>
						<div className={styles['buttons-style']}>
							<Button type="primary" htmlType="submit" className={styles['login-form-button']}>
								Log in
							</Button>
							<Button type="secondary" htmlType="button" className={styles['login-form-button']}>
								<Link to="/recoverpassword">Recover Password</Link>
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Form.create({ name: 'normal_login' })(Login);
