const UserRulesList = [
	{
		name: 'User',
		actions: ['list', 'read']
	}
];

const UserRulesFull = [
	{
		name: 'User',
		actions: ['create', 'list', 'read', 'update']
	}
];

const rules = {
	Profile: {
		rules: UserRulesFull
	},
	UserReadyOnly: {
		rules: UserRulesList
	},
	UserFull: {
		rules: UserRulesList
	},
	AuthComponentCardSuccess: {
		rules: [
			{
				name: 'User',
				actions: ['list', 'read']
			}
		]
	},
	AuthComponentCardError: {
		rules: [
			{
				name: 'User',
				actions: ['error']
			}
		]
	}
};

export default rules;
