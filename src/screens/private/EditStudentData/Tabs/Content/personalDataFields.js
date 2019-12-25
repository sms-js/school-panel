const newDate = new Date();

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
		value: newDate.toString(),
		type: 'Date'
	},
	livesWith: {
		label: 'Lives with',
		value: 'both',
		id: 'studentLivesWith',
		type: 'Select',
		selectOptions: {
			both: 'Both parents',
			mother: 'Mother',
			father: 'Father',
			alternate: 'Alternate'
		}
	},
	grade: {
		label: 'Grade',
		value: '1',
		id: 'studentGrade',
		type: 'Select',
		selectOptions: {
			'1': '1st grade',
			'2': '2nd grade',
			'3': '3th grade',
			'4': '4th grade',
			'5': '5th grade',
			'6': '6th grade',
			'7': '7th grade'
		}
	}
};
const healthData = {
	company: {
		label: 'Company',
		value: '',
		id: 'company',
		type: 'String',
		error: false
	},
	affiliateNumber: {
		label: 'Affilate Number',
		value: '',
		id: 'affiliateNumber',
		type: 'String',
		error: false
	},
	allergies: {
		label: 'Allergies',
		value: ['acaros', 'pollen'],
		id: 'allergies',
		type: 'Array',
		error: false
	},
	emergencyPhoneNumbers: {
		label: 'Emergency Phone Numbers',
		data: [{ column2: '15-1111-911', column1: 'father' }],
		header: ['Pertenece a', 'Numero'],
		id: 'emergencyPhoneNumbers',
		type: 'Table',
		error: false
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
		value: '',
		type: 'String',
		id: 'fatherStreetName'
	},
	houseNr: {
		label: 'House nr.',
		value: '',
		type: 'String',
		id: 'fatherHouseNr'
	},
	floorNr: {
		label: 'Floor number',
		value: '',
		type: 'String',
		id: 'fatherFloorNr'
	},
	flatNr: {
		label: 'Flat nr.',
		value: '',
		type: 'String',
		id: 'fatherFlatNr'
	},
	zipCode: {
		label: 'ZIP',
		value: '',
		type: 'String',
		id: 'fatherZIP'
	},
	birthDate: {
		label: 'Birthdate',
		value: 'DD/MM/YYYY',
		id: 'fatherBirthDate',
		type: 'Date'
	},
	cellPhone: {
		label: 'Cellphone nr.',
		value: '',
		id: 'fatherCellPhone',
		type: 'String'
	}
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
		value: '',
		type: 'String',
		id: 'motherStreetName'
	},
	houseNr: {
		label: 'House nr.',
		value: '',
		type: 'String',
		id: 'motherHouseNr'
	},
	floorNr: {
		label: 'Floor number',
		value: '',
		type: 'String',
		id: 'motherFloorNr'
	},
	flatNr: {
		label: 'Flat nr.',
		value: '',
		type: 'String',
		id: 'motherFlatNr'
	},
	zipCode: {
		label: 'ZIP',
		value: '',
		type: 'String',
		id: 'motherZIP'
	},
	birthDate: {
		label: 'Birthdate',
		value: newDate.toString(),
		id: 'motherBirthDate',
		type: 'Date'
	},
	cellPhone: {
		label: 'Cellphone nr.',
		value: '156677',
		id: 'motherCellPhone',
		type: 'String'
	}
};

export { studentFields, fatherFields, motherFields, healthData };
