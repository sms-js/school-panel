const UserRulesList = [
	{
		name: 'User',
		actions: [ 'list', 'read' ]
	}
];

const UserRulesListAndUpdate = [
	{
		name: 'User',
		actions: [ 'list', 'read', 'update' ]
	}
];

const UserRulesFull = [
	{
		name: 'User',
		actions: [ 'create', 'list', 'read', 'update' ]
	}
];

const MessagesRulesListReadUpdate = [
	{
		name: 'Messagedata',
		actions: [ 'list', 'read' ]
	}
];

const rules = {
	Profile: {
		rules: UserRulesListAndUpdate
	},
	UserReadOnly: {
		rules: UserRulesList
	},
	UserFull: {
		rules: UserRulesFull
	},
	AuthComponentCardSuccess: {
		rules: [
			{
				name: 'User',
				actions: [ 'list', 'read' ]
			}
		]
	},
	AuthComponentCardError: {
		rules: [
			{
				name: 'User',
				actions: [ 'error' ]
			}
		]
	},
	MessagesListReadUpdate: { rules: MessagesRulesListReadUpdate }
};

export default rules;
