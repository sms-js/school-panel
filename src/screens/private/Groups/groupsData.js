const groupsName = [
	//{'notAssigned':'select group'},
	{'1ATM':'1ro A turno maniana'},
	{'1BTM':'1ro B turno maniana'},
	{'1ATT':'1ro A turno tarde'},
	{'1BTT':'1ro B turno tarde'},
]

const groupsProps = [
	{type:'originGroup',selectedGroup:'notAssigned',disabledMenu:false},
	{type:'destinationGroup_1',selectedGroup:'notAssigned',disabledMenu:true},
	{type:'destinationGroup_2',selectedGroup:'notAssigned',disabledMenu:true},
]

export { groupsName, groupsProps };