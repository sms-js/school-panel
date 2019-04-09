import React from 'react';
import styles from '../UserEdition.module.css';
import { Form, Icon, Input, Select } from 'antd';

const { Option } = Select;

const getInput = (form, user) => {
	const { getFieldDecorator } = form;
	const userTypeCombo = getFieldDecorator('type', {
		rules: [ { required: true, message: 'Please define a user type' } ],
		initialValue: user.type
	})(
		<Select defaultValue="admin">
			<Option value="admin">admin</Option>
			<Option value="userR">read</Option>
			<Option value="userRW">read and write</Option>
		</Select>
	);
	return userTypeCombo;
};

const UserType = ({ form, user }) => (
	<Form.Item hasFeedback label="User type">
		{getInput(form, user)}
	</Form.Item>
);

export default UserType;
