import React, { Component } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

const x = 3;
const y = 2;
const z = 1;
let gData = [];

const generateData = (_level, _preKey, _tns) => {
	const preKey = _preKey || '0';
	const tns = _tns || gData;

	const children = [];
	for (let i = 0; i < x; i++) {
		const key = `${preKey}-${i}`;
		tns.push({ title: key, key });
		if (i < y) {
			children.push(key);
		}
	}
	if (_level < 0) {
		return tns;
	}
	const level = _level - 1;
	children.forEach((key, index) => {
		tns[index].children = [];
		return generateData(level, key, tns[index].children);
	});
};
//generateData(z);

const TN1 = (
	<TreeNode key="level-0" title="level-0">
		<TreeNode key="level-0-0" title="level-0-0">
			<TreeNode key="level-0-0-0" title="level-0-0-0" />
			<TreeNode key="level-0-0-1" title="level-0-0-1" />
			<TreeNode key="level-0-0-2" title="level-0-0-2" />
		</TreeNode>
	</TreeNode>
);

// this is my ownData
gData = [
	{
		key: 'level-0',
		title: 'Tlevel-0',
		id: 'ID-Level-0',
		children: [
			{
				key: 'level-0-0',
				title: 'Tlevel-0-0',
				id: 'ID-Level-0-0',
				children: [
					{ key: 'level-0-0-0', title: 'Tlevel-0-0-0', id: 'ID-Level-0-0-0' },
					{ key: 'level-0-0-1', title: 'Tlevel-0-0-1', id: 'ID-Level-0-0-1' },
					{ key: 'level-0-0-2', title: 'Tlevel-0-0-2', id: 'ID-Level-0-0-2' }
				]
			}
		]
	}
];

class Demo extends Component {
	state = {
		gData,
		expandedKeys: [ '0-0', '0-0-0', '0-0-0-0' ]
	};

	onDragEnter = (info) => {
		console.log(info);
		// expandedKeys
		// this.setState({
		//   expandedKeys: info.expandedKeys,
		// });
	};

	onDrop = (info) => {
		console.log(info);
		info.event.preventDefault();
		const transferredData = info.event.dataTransfer.getData('transfer');
		console.log('transferred data = ', transferredData);
		const originContainerName = info.event.dataTransfer.getData('transfer2');

		const dropKey = info.node.props.eventKey;
		const dragKey = info.dragNode.props.eventKey;
		const dropPos = info.node.props.pos.split('-');
		const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

		const loop = (data, key, callback) => {
			data.forEach((item, index, arr) => {
				if (item.key === key) {
					return callback(item, index, arr);
				}
				if (item.children) {
					return loop(item.children, key, callback);
				}
			});
		};
		const data = [ ...this.state.gData ];

		// Find dragObject
		let dragObj;
		loop(data, dragKey, (item, index, arr) => {
			arr.splice(index, 1);
			dragObj = item;
		});

		if (!info.dropToGap) {
			// Drop on the content
			loop(data, dropKey, (item) => {
				item.children = item.children || [];
				// where to insert
				item.children.push(dragObj);
			});
		} else if (
			(info.node.props.children || []).length > 0 && // Has children
			info.node.props.expanded && // Is expanded
			dropPosition === 1 // On the bottom gap
		) {
			loop(data, dropKey, (item) => {
				item.children = item.children || [];
				// where to insert
				item.children.unshift(dragObj);
			});
		} else {
			let ar;
			let i;
			loop(data, dropKey, (item, index, arr) => {
				ar = arr;
				i = index;
			});
			if (dropPosition === -1) {
				ar.splice(i, 0, dragObj);
			} else {
				ar.splice(i + 1, 0, dragObj);
			}
		}

		this.setState({
			gData: data
		});
	};

	render() {
		const loop = (data) =>
			data.map((item) => {
				if (item.children && item.children.length) {
					return (
						<TreeNode key={item.key} title={item.title}>
							{loop(item.children)}
						</TreeNode>
					);
				}
				return <TreeNode key={item.key} title={item.title} />;
			});
		return (
			<Tree
				className="draggable-tree"
				defaultExpandedKeys={this.state.expandedKeys}
				draggable
				blockNode
				onDragEnter={this.onDragEnter}
				onDrop={this.onDrop}
			>
				{loop(this.state.gData)}
			</Tree>
		);
	}
}

//ReactDOM.render(<Demo />, mountNode);
export default Demo;