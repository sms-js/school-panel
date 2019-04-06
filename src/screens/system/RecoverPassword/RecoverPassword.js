import styles from './RecoverPassword.module.css';

import React, { useState, useContext } from 'react';
import { Card, Form, Icon, Input, Button } from 'antd';
import SessionContext from 'components/SessionContext';
import { login } from 'lib/api';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RecoverPassword = ({ form }) => {
	const [ requestError, setRequestError ] = useState(false);

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
			<Card title="RecoverPassword" className={styles['login-card-container']}>
				<Form onSubmit={(e) => handleSubmit(session, e)} className={styles['login-form']}>
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [ { required: true, message: 'Please enter your registrered email' } ]
						})(
							<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Email"
								
							/>
						)}
					</Form.Item>
					{requestError && <Form.Item validateStatus="error" help="Login request failed" />}
					<Form.Item>
						<div className={styles['buttons-style']}>
								<Button type="primary" htmlType="button" className={styles['login-form-button']}>
								Recuperar clave
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default Form.create({ name: 'recover_password' })(RecoverPassword);
