import React from 'react';
import styles from '../Profile.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = form => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('password', {
		rules: [{ required: true, message: 'Please input your new password' }],
		initialValue: ''
	})(<Input prefix={<Icon type="lock" className={styles['profile-icon']} />} type="password" placeholder="Password" />);
};

const Password = ({ form }) => <Form.Item label="Password">{getInput(form)}</Form.Item>;

export default Password;
