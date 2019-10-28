const studentFields = {
	firstName: {
		label: 'First name',
		value: 'studentFirstName',
		id: 'studentFirstName',
		type: 'String'
	},
	lastName: {
		label: 'Last name',
		value: 'studentLastName',
		id: 'studentLastName',
		type: 'String'
	},
	email: {
		label: 'Email',
		value: 'student@gmail.com',
		id: 'studentEmail',
		type: 'Email'
	},
	idNumber: {
		label: 'I.D. nr.',
		value: '123456',
		id: 'studentIdNumber',
		type: 'String'
	},
	streetName: {
		label: 'Street name',
		value: 'Av. Siempre Viva',
		id: 'studentStreetName',
		type: 'String'
	},
	houseNr: {
		label: 'House nr.',
		value: '456',
		id: 'studentHouseNumber',
		type: 'String'
	},
	floorNr: {
		label: 'Floor nr.',
		value: '1',
		id: 'studentFloorNumber',
		type: 'String'
	},
	flatNr: {
		label: 'Flat nr.',
		id: 'studentFlatNumber',
		value: 'A',
		type: 'String'
	},
	zipCode: {
		label: 'ZIP',
		value: '1427',
		id: 'studentZIP',
		type: 'String'
	},
	birthDate: {
		label: 'Birthdate',
		id: 'studentBirthdate',
		value: '01/01/2001',
		type: 'Date'
	},
	livesWith: {
		label: 'Stundent lives with:',
		value: 'both',
		id: 'studentLivesWith',
		type: 'String'
	}
};
const fatherFields = {
	firstName: {
		label: 'First name',
		value: 'fatherFirstName',
		id: 'fatherFirstName',
		type: 'String'
	},
	lastName: {
		label: 'Last name',
		value: 'fatherLastName',
		id: 'fatherLastName',
		type: 'String'
	},
	email: {
		label: 'Email',
		value: 'father@gmail.com',
		id: 'fatherEmail',
		type: 'Email'
	},
	idNumber: {
		label: 'I.D. number',
		id: 'fatherIdNumber',
		value: '123456',
		type: 'String'
	},
	streetName: {
		label: 'Street name',
		value: 'Av. Siempre Viva',
		type: 'String',
		id: 'fatherStreetName'
	},
	houseNr: {
		label: 'House nr.',
		value: '456',
		type: 'String',
		id: 'fatherHouseNr'
	},
	floorNr: {
		label: 'Floor number',
		value: '1',
		type: 'String',
		id: 'fatherFloorNr'
	},
	flatNr: {
		label: 'Flat nr.',
		value: 'A',
		type: 'String',
		id: 'fatherFlatNr'
	},
	zipCode: {
		label: 'ZIP',
		value: '1427',
		type: 'String',
		id: 'fatherZIP'
	},
	birthDate: {
		label: 'Birthdate',
		value: new Date(),
		id: 'fatherBirthDate',
		type: Date
	},
	cellPhone: {
		label: 'Cellphone nr.',
		value: '156677',
		id: 'fatherCellPhone',
		type: 'String'
	},
	userType: 'parent'
};

const motherFields = {
	firstName: {
		label: 'First name',
		value: 'motherFirstName',
		id: 'motherFirstName',
		type: 'String'
	},
	lastName: {
		label: 'Last name',
		value: 'motherLastName',
		id: 'motherLastName',
		type: 'String'
	},
	email: {
		label: 'Email',
		value: 'mother@gmail.com',
		id: 'motherEmail',
		type: 'Email'
	},
	idNumber: {
		label: 'I.D. number',
		id: 'motherIdNumber',
		value: '123456',
		type: 'String'
	},
	streetName: {
		label: 'Street name',
		value: 'Av. Siempre Viva',
		type: 'String',
		id: 'motherStreetName'
	},
	houseNr: {
		label: 'House nr.',
		value: '456',
		type: 'String',
		id: 'motherHouseNr'
	},
	floorNr: {
		label: 'Floor number',
		value: '1',
		type: 'String',
		id: 'motherFloorNr'
	},
	flatNr: {
		label: 'Flat nr.',
		value: 'A',
		type: 'String',
		id: 'motherFlatNr'
	},
	zipCode: {
		label: 'ZIP',
		value: '1427',
		type: 'String',
		id: 'motherZIP'
	},
	birthDate: {
		label: 'Birthdate',
		value: new Date(),
		id: 'motherBirthDate',
		type: Date
	},
	cellPhone: {
		label: 'Cellphone nr.',
		value: '156677',
		id: 'motherCellPhone',
		type: 'String'
	},
	userType: 'parent'
};

export { studentFields, fatherFields, motherFields };
