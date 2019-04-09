import React from 'react';
import styles from '../UserEdition.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = (form, user) => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('email', {
		rules: [{ required: true, type: 'email', message: 'Please input the user email!' }],
		initialValue: user.email
	})(
		<Input
			key="profile-email-input"
			disabled={user._id}
			prefix={<Icon type="tag" className={styles['home-icon']} />}
			placeholder="Email"
		/>
	);
};

const Email = ({ form, user }) => <Form.Item hasFeedback label="Email">{getInput(form, user)}</Form.Item>;

export default Email;
