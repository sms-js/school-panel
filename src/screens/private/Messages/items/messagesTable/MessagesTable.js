import React, {Component,useEffect,useState} from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import styles from './MessagesTable.module.css';


//=======================================================================================================================
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let className = restProps.className;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style} />),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);

const columns1 = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const columns = [
	{
		title: 'Fecha',
		dataIndex: 'deliveryDate',
		key: 'deliveryDate',
		render: (text) => <p>{text}</p>
	},
	{
		title: 'Usuario',
		dataIndex: 'listener.wapUsername',
		key: 'User',
		render: (text) => <p>{text}</p>
	},
	{
		title: 'Mensaje',
		dataIndex: 'messageData.body',
		key: 'messageText',
		render: (text) => <p>{text}</p>
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, user) => (
			<span>
				<a href="#" style={{ marginLeft: '5px', color: 'red' }} onClick={user.onDelete}>
					Delete
				</a>
			</span>
		)
	}
];

const DragSortingTable=({messages})=> {
	console.log('messages = ', messages);
  
    const initialData= [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
		];
		//const [data,setData]=useState(initialData);
		const [data,setData]=useState(messages);
  

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = (dragIndex, hoverIndex) => {
    //const { data } = this.state;
    const dragRow = data[dragIndex];
			const newData=update(data, {$splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]]})
			return setData([...newData]);
  };

    return (
      <Table
        columns={columns}
        dataSource={data}
        components={components}
        onRow={(record, index) => ({
          index,
          moveRow: moveRow
        })}
      />
    );
  
}

const MessagesTable = DragDropContext(HTML5Backend)(DragSortingTable);
export default MessagesTable;


//=======================================================================================================================


const MessagesTable2 = ({ messages, onDelete }) => (
	<Table
		columns={columns}
		dataSource={messages.map((message) => {
			message.onDelete = () => onDelete(message._id);
			return message;
		})}
	/>
);

//export default MessagesTable2;
