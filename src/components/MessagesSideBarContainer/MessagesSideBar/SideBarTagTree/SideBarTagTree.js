import React, { useState, useEffect, useReducer } from 'react';
import { Tree } from 'antd';
import { tagsLib } from '../../../../lib/models';
import {
	generateTreeNodesFunction,
	getTagPath,
	getTagMap,
	generateTreeData
} from '../../../../screens/private/Messages/helpFunctions';
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

	const reducerFunction = (state, action) => {
		switch (action.type) {
			case 'setShowModal':
				return { ...state, showModal: !state.showModal };
			case 'setShowNewTagNameInputFieldToTrue':
				return { ...state, showNewTagNameInputField: true };
			case 'setShowNewTagNameInputFieldToFalse':
				return { ...state, showNewTagNameInputField: false };
			case 'setRecycleBinTagIsSelected':
				return { ...state, recycleBinTagIsSelected: action.payLoad };
			case 'setTagsTreeData':
				return { ...state, tagsTreeDataStructure: action.payLoad };
			case 'setMouseCoordinates':
				return { ...state, mouseCoordinates: action.payLoad };
			case 'setActualSelectedTag':
				return { ...state, actualSelectedTag: action.payLoad };
			case 'setDraggedNode':
				return { ...state, draggedNode: action.payLoad };
			case 'setTags':
				return { ...state, tags: action.payLoad };
			case 'setRecycleBinTagsTags':
				return { ...state, recycleBinTags: action.payLoad };
			case 'setRecycleBinTreeData':
				return { ...state, recycleBinTreeDataStructure: action.payLoad };
			case 'setTestState':
				return { ...state, testState: !state.testState };
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(reducerFunction, initialState);

	const loadTags = async () => {
		const response = await tagsLib.getTags();
		return response;
	};

	useEffect(() => {
		console.log('UE');
		const initTags = async () => {
			const res = await loadTags();
			const tags = res
				.map(el => {
					el.key = el.title === 'Main' ? 'mainTagKey' : el._id;
					return el;
				})
				.filter(el => el.title !== 'Recycle Bin');
			dispatch({
				type: 'setTags',
				payLoad: tags
			});
			dispatch({ type: 'setTagsTreeData', payLoad: generateTreeData(tags) });
			const recycleTags = res
				.filter(el => el.title === 'Recycle Bin' || el.parentTag === 'recycleBin')
				.map(el => {
					el.key = el.title === 'Recycle Bin' ? 'recycleBin' : el._id;
					return el;
				});
			dispatch({
				type: 'setRecycleBinTagsTags',
				payLoad: recycleTags
			});
			dispatch({ type: 'setRecycleBinTreeData', payLoad: generateTreeData(recycleTags) });
		};
		initTags();
	}, []);
	const onSelect = e => {
		//@todo: check this double click situation on same item with PG.
		if (e.length === 0) return;
		//e equals to the selected treeNode key
		/*
		const params = {
			destinationTag: e[0],
			draggedMessageId: undefined
		};
		*/
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
			//const tagMap = getTagMap(tagsTreeDataStructure);
			const tagMap = getTagMap(state.tagsTreeDataStructure);
			//==============================
			const newTagA = state.tags
				.filter(tag => tag._id == state.draggedNode)
				.map(el => {
					el.formerParentTag = el.parentTag;
					el.parentTag = destinationTag;
					el.selectable = true;
					delete el.parent;
					return el;
				})[0];
			debugger;
			const indexNewTag = state.tags.findIndex(el => el._id === newTagA._id);
			let newTags = state.tags;
			newTags.splice(indexNewTag, 1, newTagA);
			debugger;
			dispatch({ type: 'setTags', payLoad: newTags });
			//renders DOM
			dispatch({ type: 'setTagsTreeData', payLoad: generateTreeData(newTags) });

			//===============================
		/* 	let updatedTags = state.tags.map(tag => {
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
		 */
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
		//when user press on "confirm" the modal closes and we want to set back its state to false (because if not, user has to click twice on edit tag props, to open the modal).
		dispatch({ type: 'setShowModal' });
		let newState = { ...state.actualSelectedTag, ...params };
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

	//=====================================================================
	/* following function generates an array with tags keys. When user deletes a specific tag, this function delivers the key  of the selected tag (the tag selected by user to be deleted) and all its children and children's childrens. Input element (focusedTag) should be an object like "state.actualSelectedTag" {...,key:'sdfasdf',children:[{},{},{key:'...',children:[...]}]} */
	//let affectedTags = [];
	/*
	const getTagKeyAndItsChildren = focusedTag => {
		affectedTags.push(focusedTag.key);
		focusedTag.children.forEach(el => {
			affectedTags.push(el.key);
			el.children.forEach(childEl => getTagKeyAndItsChildren(childEl));
		});
	};
	*/
	//=====================================================================

	const recoverSelectedTag = () => {
		let updatedTag = {
			...state.actualSelectedTag,
			parentTag: state.actualSelectedTag.formerParentTag,
			selectable: true,
			_id: state.actualSelectedTag.key,
			tagSentToRecycleBin: false
		};
		delete updatedTag.children;
		delete updatedTag.parent;
		//issue with the following code is that we have to "clean" all affected tags when we send one to the bim.
		//check if parentTag is available in the tags
		//updatedTag.parentTag = tags.findIndex(el => el._id === updatedTag.parentTag) > -1 ? updatedTag.parentTag : 'mainTagKey';

		//for now we will hardcode to parent tag. Every recovered tag will be displayed under main
		updatedTag.parentTag = 'mainTagKey';

		tagsLib.updateTag(updatedTag); //PATCH: updates the modified tag
		//update tags
		const newTags = state.tags.concat(updatedTag);
		//delete tag from recycleBinTags
		const newRecycleBinTags = state.recycleBinTags.filter(el => el.key !== updatedTag.key);
		//set recycleBinTags
		dispatch({ type: 'setRecycleBinTagsTags', payLoad: newRecycleBinTags });
		//renders DOM
		dispatch({ type: 'setRecycleBinTreeData', payLoad: generateTreeData(newRecycleBinTags) });
		//set tags
		dispatch({ type: 'setTags', payLoad: newTags });
		//renders DOM
		dispatch({ type: 'setTagsTreeData', payLoad: generateTreeData(newTags) });
	};

	const assignRecycleBinAsParent = () => {
		//getTagKeyAndItsChildren(state.actualSelectedTag);
		let updatedTag = {
			...state.actualSelectedTag,
			formerParentTag: state.actualSelectedTag.parent.key,
			parentTag: 'recycleBin',
			selectable: true,
			_id: state.actualSelectedTag.key,
			tagSentToRecycleBin: true
		};
		delete updatedTag.children;
		delete updatedTag.parent;
		//PATCH: updates the modified tag
		tagsLib.updateTag(updatedTag);
		//delete tag from tags
		const newTags = state.tags.filter(el => el.key !== updatedTag.key);
		//setTags(newTags);
		dispatch({ type: 'setTags', payLoad: newTags });
		//renders DOM
		dispatch({ type: 'setTagsTreeData', payLoad: generateTreeData(newTags) });
		//const newRecycleBinArray = recycleBinTags.concat(newRecycleBinElements);
		const newRecycleBinArray = state.recycleBinTags.concat(updatedTag);
		//setRecycleBinTagsTags(newRecycleBinArray);
		dispatch({ type: 'setRecycleBinTagsTags', payLoad: newRecycleBinArray });
		//renders DOM
		dispatch({ type: 'setRecycleBinTreeData', payLoad: generateTreeData(newRecycleBinArray) });
	};

	const setTagStatusToFalse = () => {
		//getTagKeyAndItsChildren(state.actualSelectedTag);
		let updatedTag = {
			...state.actualSelectedTag,
			parentTag: 'recycleBin',
			selectable: true,
			_id: state.actualSelectedTag.key,
			tagSentToRecycleBin: true
		};
		//wehn tag status is false, it wont be downloaded from server
		updatedTag.status = false;
		delete updatedTag.children;
		delete updatedTag.parent;
		//PATCH: updates the modified tag
		tagsLib.updateTag(updatedTag);
		//delete tag from recycleBinArray
		const newRecycleBinTags = state.recycleBinTags.filter(el => el.key !== updatedTag.key);
		//setRecycleBinTagsTags(newRecycleBinTags);
		dispatch({ type: 'setRecycleBinTagsTags', payLoad: newRecycleBinTags });
	};

	const getSelectedOptionFromRCM = event => {
		switch (event) {
			case 'createNewTag':
				//setShowNewTagNameInputField(true);
				dispatch({ type: 'setShowNewTagNameInputFieldToTrue' });
				break;
			case 'editTagProperties':
				//setShowModal(prevState => !prevState);
				dispatch({ type: 'setShowModal' });
				break;
			case 'sendTagToBim':
				assignRecycleBinAsParent();
				break;
			case 'recoverTag':
				recoverSelectedTag();
				break;
			case 'setTagStatusToFalse':
				setTagStatusToFalse();
				break;
			default:
				console.log('switch default case');
		}
	};

	const getDataFromChildCmp = newTagTitel => {
		//setShowNewTagNameInputField(false);
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
