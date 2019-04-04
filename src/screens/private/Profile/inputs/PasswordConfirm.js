import React from 'react';
import styles from '../Profile.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = form => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('passwordConfirm', {
		rules: [{ required: true, message: 'Please confirm your new password' }],
		initialValue: ''
	})(
		<Input
			prefix={<Icon type="lock" className={styles['profile-icon']} />}
			type="password"
			placeholder="Password confirmation"
		/>
	);
};

const PasswordConfirm = ({ form }) => <Form.Item label="Password confirmation">{getInput(form)}</Form.Item>;

export default PasswordConfirm;
