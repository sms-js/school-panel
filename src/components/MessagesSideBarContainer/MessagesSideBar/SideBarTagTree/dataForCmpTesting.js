//tasgArrayFromApi is a data structure similar to the one, which will be received from the API.Only the props: selectable and disable should be added if required. Those porps are used by antd components.
const testDataFromAPI = {
	tagsArray: [
		{
			key: '5ccc37645ad6ca045cb414545',
			title: 'Saludos de Cumple',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T14:00:00Z',
			autoAssignTagToIncomingMessage: true,
			status: true,
			selectable: true
		},
		{
			key: '5ccc37855ad6ca045cdsdeb41f74',
			parentTag: '5ccc37645ad6ca045cb414545',
			title: 'Saludos a zona oeste',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T10:00:00Z',
			status: true,
			selectable: true
		},
		{
			key: '5ccc37855ad6ca045cssaf74',
			parentTag: '5ccc37645ad6ca045cb414545',
			title: 'Saludos a zona SUR',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T10:00:00Z',
			status: true,
			selectable: true
		},
		{
			key: '5ccc37855ad6caasa74',
			parentTag: '5ccc37855ad6ca045cssaf74',
			title: 'Saludos a zona SUR pero de quilmes',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T10:00:00Z',
			status: true,
			selectable: true
		},
		{
			key: '5ccc37645ad6ca045cb41f73',
			title: 'Otros Pedidos',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T14:00:00Z',
			autoAssignTagToIncomingMessage: true,
			status: true
		},
		{
			key: '5ccc37855ad6ca045cb41f74',
			parentTag: '5ccc37645ad6ca045cb41f73',
			title: 'Canciones',
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-10T10:00:00Z',
			status: true
		},
		{
			key: '5ccc37a65ad6ca045cb41f75',
			parentTag: '5ccc37855ad6ca045cb41f74',
			title: 'Juan Corazon de Leon',
			disabled: false,
			selectable: true,
			status: true,
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-02T14:00:00Z'
		},
		{
			key: '5ccc37be5ad6ca045cb41f76',
			parentTag: '5ccc37a65ad6ca045cb41f75',
			title: 'hitasos',
			disabled: false,
			selectable: true,
			status: true,
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-02T14:00:00Z'
		},
		{
			key: '5ccc37da5ad6ca045cb41f78',
			parentTag: '5ccc37be5ad6ca045cb41f76',
			title: 'de los 80',
			disabled: false,
			status: true,
			startDate: '2019-01-01T10:00:00Z',
			endDate: '2019-01-02T14:00:00Z',
			selectable: true
		},
		{
			key: '5ccc37df5ad6ca045cb41f79',
			parentTag: '5ccc37be5ad6ca045cb41f76',
			title: 'de los 70',
			disabled: false,
			status: false,
			startDate: '2015-11-05T10:00:00Z',
			endDate: '2015-12-31T14:00:00Z',
			selectable: true
		}
	]
};

export default testDataFromAPI;
