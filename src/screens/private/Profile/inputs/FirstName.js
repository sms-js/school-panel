import React from 'react';
import styles from '../Profile.module.css';
import { Form, Icon, Input } from 'antd';

const getInput = (form, session) => {
	const { getFieldDecorator } = form;

	return getFieldDecorator('firstName', {
		rules: [ { required: true, message: 'Please input your first name!' } ],
		initialValue: session.user.firstName
	})(
		<Input
			key="profile-firstname-input"
			prefix={<Icon type="tag" className={styles['profile-icon']} />}
			placeholder="First name"
		/>
	);
};

const FirstName = ({ form, session }) => <Form.Item label="First name">{getInput(form, session)}</Form.Item>;

export default FirstName;
