/*
const preSetStateValue = (value) => {
	console.log(' value es ', value); //0-0-1
	setStateValue(value);
};
*/

/*
const SwitchDroppableArea = ({ allowDrop, drop, showDrop }) => {
	console.log('SwitchDroppableArea props = ', showDrop);
	const dr2 = (
		<div>
			DR 2
			<Droppable allowDrop={allowDrop} drop={drop} id="drop2" style={droppableStyle}>
							<ModifyObjectsInDrop2 testparams={containers.drop2} /> 
				{testArrDrop2}
			</Droppable>
		</div>
	);

	const dr3 = (
		<div>
			DR 3
			<Droppable allowDrop={allowDrop} drop={drop} id="drop3" style={droppableStyle} />
		</div>
	);
	return showDrop == 'drop2' ? dr2 : dr3;
};

*/

//======================TREESELECT COMP Test STARTS HERE ==========================
/*
	const preSetStateValue = (value) => {
		console.log(' value es ', value); //0-0-1
		setStateValue(value);
	};
*/

// const SwitchDroppableArea = ({ allowDrop, drop, showDrop }) => {
// 	console.log('SwitchDroppableArea props = ', showDrop);
// 	const dr2 = (
// 		<div>
// 			DR 2
// 			<Droppable allowDrop={allowDrop} drop={drop} id="drop2">
// 				{/* 			<ModifyObjectsInDrop2 testparams={containers.drop2} /> */}
// 				{testArrDrop2}
// 			</Droppable>
// 		</div>
// 	);

/*
const dr3 = (
			<div>
				DR 3
				<Droppable allowDrop={allowDrop} drop={drop} id="drop3" />
			</div>
		);
		return showDrop == 'drop2' ? dr2 : dr3;
	};
*/
//======================TREESELECT COMP Test ENDS HERE ==========================

const changeDropCount = () => {
	setDrop2Count((prevState) => !prevState);
};
const ModifyObjectsInDrop2 = ({ testparams }) => {
	let modifiedObjectsArray = testparams.map((el) => <button>{el || 'test'}</button>);
	//changeDropCount();
	return modifiedObjectsArray;
};


const updateDrop2Count = (params) => {
	setDrop2Count((prevState) => {
		return prevState + params;
	});
};


