import styles from './RecoverPassword.module.css';
import React, { useState, useContext } from 'react';
import { Card, Form, Icon, Input, Button } from 'antd';
import SessionContext from 'components/SessionContext';
import { recoverpassword } from 'lib/api';
import { Redirect, Link } from 'react-router-dom';

const RecoverPassword = ({ form }) => {
	const [ requestError, setRequestError ] = useState(false);
	const [ emailHasBeenSent, setEmailHasBeenSent ] = useState(false);

	const { getFieldDecorator } = form;

	const handleSubmit = (session, e) => {
		setRequestError(false);
		e.preventDefault();
		form.validateFields(async (err, values) => {
			if (!err) {
				const { emailadress } = values;
				const response = await recoverpassword(emailadress);
				if (!response) {
					setRequestError(true);
					return;
				}
				setEmailHasBeenSent(true);
				session.add(response);
			}
		});
	};

	const session = useContext(SessionContext.context);

	const recoveringEmailField = (
		<Card title="Recover Password" className={styles['login-card-container']}>
			<Form onSubmit={(e) => handleSubmit(session, e)} className={styles['login-form']}>
				<Form.Item>
					{getFieldDecorator('emailadress', {
						rules: [ { required: true, message: 'Please enter your registrered email' } ]
					})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
				</Form.Item>
				{requestError && <Form.Item validateStatus="error" help="Recover password request failed" />}
				<Form.Item>
					<div className={styles['buttons-style']}>
						<Button type="primary" htmlType="submit" className={styles['login-form-button']}>
							Submit
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Card>
	);

	const emailHasBeenSentText = (
		<Card title="Recovering link has been sent" className={styles['login-card-container']}>
			<div className={styles['buttons-style']}>
				<Button type="primary" htmlType="button" className={styles['login-form-button']}>
					<Link to="/login">Log in</Link>
				</Button>
			</div>
		</Card>
	);

  let recoverPasswordDialog = emailHasBeenSent ? emailHasBeenSentText : recoveringEmailField;

	let recoveringDialog = <div className={styles['login-container']}>{recoverPasswordDialog}</div>;

	return session.logged ? <Redirect to="/admin/home" /> : recoveringDialog;
};

export default Form.create({ name: 'recover_password' })(RecoverPassword);
