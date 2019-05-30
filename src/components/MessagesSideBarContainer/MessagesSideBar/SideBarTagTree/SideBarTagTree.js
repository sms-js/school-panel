import React, { useEffect, useReducer } from 'react';
import { Tree } from 'antd';
import { tagsLib } from '../../../../lib/models';
import {
	generateTreeNodesFunction,
	getTagPath,
	getTagMap,
	generateTreeData,
	fetchTags,
	recoverSelectedTagLib,
	reducerFunction,
	assignRecycleBinAsParentLib,
	removeTagFromReycleBinLib
} from './libSideBarTT';
import { TagRClickMenu, TagRClickWMenu } from './index';
import moment from 'moment';
import NewTagNameInputField from './elements/NewTagNameInputCmp';
import PropTypes from 'prop-types';

const SideBarTagTree = ({ sendDataToMessagesCmp }) => {
	const initialState = {
		showModal: false,
		showNewTagNameInputField: false,
		recycleBinTagIsSelected: false,
		tagsTreeDataStructure: [],
		mouseCoordinates: {},
		actualSelectedTag: {},
		draggedNode: '',
		tags: [],
		recycleBinTags: [],
		recycleBinTreeDataStructure: [],
		testState: false
	};

	const [state, dispatch] = useReducer(reducerFunction, initialState);

	const dispatchResponse = params => {
		if (params.dispatchTags) dispatch(params.dispatchTags);
		if (params.dispatchTagsTreeDataStructure) dispatch(params.dispatchTagsTreeDataStructure);
		if (params.dispatchRecycleBinTags) dispatch(params.dispatchRecycleBinTags);
		if (params.dispatchRecycleBinTreeDataStructure) dispatch(params.dispatchRecycleBinTreeDataStructure);
	};

	const initTags = async () => {
		const response = await fetchTags();
		dispatchResponse(response);
	};

	useEffect(() => {
		initTags();
	}, []);

	const onSelect = e => {
		//@todo: check this double click situation on same item with PG.
		if (e.length === 0) return;
		//e[0] is the selected treeNode key
		sendDataToMessagesCmp({
			destinationTag: e[0],
			draggedMessageId: undefined
		});
	};

	const onDrop = info => {
		info.event.preventDefault();
		const draggedMessageId = info.event.dataTransfer.getData('draggedMessageId'); //corresponds to dragged message id
		const destinationTag = info.node.props.eventKey; //corresponds to the destination tag id. Eg.: "5ccc37df5ad6ca045cb41f79"
		// draggedMessageId is not empty when a message is dropped from the MessageTable cmp into a tag element.
		if (draggedMessageId !== '') {
			const params = {
				destinationTag,
				draggedMessageId
			};
			sendDataToMessagesCmp(params);
		}
		/*	
		We can drag and drop 2 kind of elements:
		1) Drag a message-element and drop it into a nodeTree element.
		2) Drag a nodeTree element and drop it into another nodeTree element. 
		If situation 2) applies, then following if-statement is true and the (antD) code for handling of nodeTree elements applies. Following code (within the if-block) was delivered with the component and is related to the treeNode elements manipulation.
	*/
		if (draggedMessageId === '' && destinationTag !== '' && destinationTag !== state.draggedNode) {
			//==============================================================================
			/**
			 * Code inside the ======== lines is to be shown to PG. Problem: I had to comment out some node_module code to make this work. After review this code can be deleted.
			 *
			 */
			// const newTagA = state.tags
			// 	.filter(tag => tag._id == state.draggedNode)
			// 	.map(el => {
			// 		el.formerParentTag = el.parentTag;
			// 		el.parentTag = destinationTag;
			// 		el.selectable = true;
			// 		delete el.parent;
			// 		return el;
			// 	})[0];
			// tagsLib.updateTag(newTagA); //PATCH: updates the modified tag
			// const indexNewTag = state.tags.findIndex(el => el._id === newTagA._id);
			// let newTags = state.tags;
			// newTags.splice(indexNewTag, 1, newTagA);
			// dispatch({ type: 'setTags', payLoad: newTags });
			// //renders DOM
			// dispatch({ type: 'setTagsTreeData', payLoad: generateTreeData(newTags) });
			//==============================================================================

			const tagMap = getTagMap(state.tagsTreeDataStructure);
			let updatedTags = state.tags.map(tag => {
				// Reassignate dragged tag
				if (tag.key === state.draggedNode) {
					const newTag = tagMap[tag.key];
					newTag.formerParentTag = newTag.parent.key;
					newTag.parentTag = destinationTag;
					newTag.selectable = true;
					delete newTag.parent;
					tagsLib.updateTag(newTag); //PATCH: updates the modified tag
					return newTag;
				}
				// Return unmodified tag
				return tag;
			});
			dispatch({ type: 'setTags', payLoad: updatedTags });
			//renders DOM
			dispatch({ type: 'setTagsTreeData', payLoad: generateTreeData(updatedTags) });
		}
	};

	//getting selected tag props and sending them to the RCM
	//tagMap[node.props.eventKey] is the right click selected tag
	const rightClickFunction = ({ event, node }) => {
		const tagMap = getTagMap(state.tagsTreeDataStructure);
		const recycleBinMap = getTagMap(state.recycleBinTreeDataStructure);
		dispatch({ type: 'setMouseCoordinates', payLoad: { mouseX: event.clientX, mouseY: event.clientY } });
		dispatch({
			type: 'setActualSelectedTag',
			payLoad: tagMap[node.props.eventKey] || recycleBinMap[node.props.eventKey]
		});
		dispatch({ type: 'setRecycleBinTagIsSelected', payLoad: recycleBinMap[node.props.eventKey] !== undefined });
	};

	/* depending on users Rights: updatedTag should API-PATCH
		when user changes the tag props using the RCM (status,dates,title,codeword) and clicks on 'ok' the modified tag (named here as newTag) should PATCH the old tag. This step will be added to a later point.*/
	const getNewSelectedTagStateFromModal = params => {
		/*
		const query = {
    collection: 'Cats',  
    sort: 'asc',

    ...state && { state },
    ...priority && { priority },
};
		*/

		//when user press on "confirm" the modal closes and we want to set back its state to false (because if not, user has to click twice on edit tag props, to open the modal).
		dispatch({ type: 'setShowModal' });
		let newState = {
			...state.actualSelectedTag,
			...params,
			...{ ...params.range }
		};
		delete newState.parent;
		const selectedTagIndex = state.tags.findIndex(el => el.key === newState.key);
		const newTags = state.tags;
		const newTag = Object.assign(state.tags[selectedTagIndex], newState);
		tagsLib.updateTag(newTag); //PATCH: updates the modified tag
		newTags[selectedTagIndex] = newTag;
		dispatch({ type: 'setTags', payLoad: newTags });
	};

	/*
	generateNewTag gets called when user click generate New Tag in the RCM. It adds a child tag to the selected tag.
	Some considerations: 
	1) User clicks on create new tag.
	2) This new tag could be renamed at that point. Further props edition can be executed with the RCM option edit properties.
	3) After a tag creation or a tag edition, an API request gets sent and the tag object is modified on the DB.
	*/
	const generateNewTag = async newTagTitle => {
		const tagMap = getTagMap(state.tagsTreeDataStructure);
		/* 
		@todo: tag edition handling should trigger an API request.
		 */
		let newTag = {
			title: newTagTitle,
			parentTag: getTagPath(state.actualSelectedTag.key, tagMap).reverse()[0],
			startDate: moment(),
			autoAssignTagToIncomingMessage: false,
			status: true,
			selectable: true
		};

		//POST new tag
		const response = await tagsLib.postTag(newTag);
		newTag.key = response._id;
		newTag._id = response._id;
		let newTags = state.tags;
		const indexOfParentTag = state.tags.findIndex(el => el.key === newTag.parentTag);

		//GET new created tag from server: If following line is commented, the tag tree wont update after the new tag is posted.
		//updateTestArray(prevState => !prevState);//this triggers API GET request to fetch all tags from server

		/*
		tag will be created directly under its parentTag.
		modification of tags will reRender cmp and "new tag" will be shown in the tagTree.
		In this case we don't GET the new created tag from API. We just render the object.
		By commenting the setTags... line, the new tag wont be rendered into DOM and user should reload the browser to see the new created tag.
		 */
		newTags.splice(indexOfParentTag, 0, newTag);
		dispatch({ type: 'setTags', payLoad: newTags });
		//renders DOM
		dispatch({ type: 'setTagsTreeData', payLoad: generateTreeData(newTags) });
	};

	//sends selected tag back to main
	const recoverSelectedTag = () => {
		const response = recoverSelectedTagLib(state.actualSelectedTag, state.tags, state.recycleBinTags);
		dispatchResponse(response);
	};

	//send selected Tag to recycle bin
	const assignRecycleBinAsParent = () => {
		const response = assignRecycleBinAsParentLib(state.actualSelectedTag, state.tags, state.recycleBinTags);
		dispatchResponse(response);
	};

	//removes tag from recycle bin and wont be visualized because new status is set to false
	const removeTagFromReycleBin = () => {
		const response = removeTagFromReycleBinLib(state.actualSelectedTag, state.recycleBinTags);
		dispatchResponse(response);
	};

	const getSelectedOptionFromRCM = event => {
		switch (event) {
			case 'createNewTag':
				dispatch({ type: 'setShowNewTagNameInputFieldToTrue' });
				break;
			case 'editTagProperties':
				dispatch({ type: 'setShowModal' });
				break;
			case 'sendTagToBim':
				assignRecycleBinAsParent();
				break;
			case 'recoverTag':
				recoverSelectedTag();
				break;
			case 'setTagStatusToFalse':
				removeTagFromReycleBin();
				break;
			default:
				console.log('switch default case');
		}
	};

	const getDataFromChildCmp = newTagTitel => {
		dispatch({ type: 'setShowNewTagNameInputFieldToFalse' });
		//we don't create a tag if users enters one or more empty spaces in the titel input field.
		if (newTagTitel.trim().length > 0) generateNewTag(newTagTitel);
	};

	return (
		<div>
			<TagRClickWMenu
				sendSelectedOptionToParentCmp={getSelectedOptionFromRCM}
				actualSelectedTagTitel={state.actualSelectedTag.title}
			>
				<div>
					<Tree
						className="draggable-tree"
						draggable
						onDrop={onDrop}
						onSelect={onSelect}
						onRightClick={rightClickFunction}
						onDragStart={({ node }) => {
							dispatch({ type: 'setDraggedNode', payLoad: node.props.eventKey });
						}}
					>
						{generateTreeNodesFunction(state.tagsTreeDataStructure)}
					</Tree>
				</div>
			</TagRClickWMenu>
			<div>
				{state.showNewTagNameInputField ? (
					<NewTagNameInputField
						mouseRightClickPosition={state.mouseCoordinates}
						sendDataToParentCmp={getDataFromChildCmp}
					/>
				) : null}
			</div>
			<div>
				{state.showModal ? (
					<div>
						<TagRClickMenu
							showModal={state.showModal}
							actualSelectedTag={state.actualSelectedTag}
							sendNewSelectedTagStateToTagTree={getNewSelectedTagStateFromModal}
							mouseRightClickPosition={state.mouseCoordinates}
							resetShowModal={() => dispatch({ type: 'setShowModal' })}
						/>
					</div>
				) : null}
			</div>
			<div>
				<TagRClickWMenu
					recycleBinTagIsSelected={state.recycleBinTagIsSelected}
					actualSelectedTagTitel={state.actualSelectedTag.title}
					sendSelectedOptionToParentCmp={getSelectedOptionFromRCM}
				>
					<div>
						<Tree
							className="draggable-tree"
							draggable={false}
							onDrop={onDrop}
							onSelect={onSelect}
							onRightClick={rightClickFunction}
						>
							{generateTreeNodesFunction(state.recycleBinTreeDataStructure)}
						</Tree>
					</div>
				</TagRClickWMenu>
			</div>
		</div>
	);
};

SideBarTagTree.propTypes = {
	sendDataToMessagesCmp: PropTypes.func.isRequired
};

export default SideBarTagTree;
