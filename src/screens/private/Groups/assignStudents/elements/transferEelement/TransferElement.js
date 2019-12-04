import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto'
	},
	cardHeader: {
		padding: theme.spacing(1, 2)
	},
	list: {
		width: 400,
		height: 230,
		backgroundColor: theme.palette.background.paper,
		overflow: 'auto'
	},
	button: {
		margin: theme.spacing(0.5, 0)
	}
}));

function not(a, b) {
	return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter(value => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

const TransferElement = ({
	sourceStudents,
	destinationGroupCode,
	destinationGroupStudents,
	removeFromGroup,
	addToGroup
}) => {
	const classes = useStyles();
	const [checked, setChecked] = useState([]);
	const [students, setSourceStudents] = useState(sourceStudents);
	const [transferredStudents, setTransferredStudents] = useState(destinationGroupStudents);
	const [remove, setRemove] = useState([]);
	const [assign, setAssign] = useState([]);

	const leftChecked = intersection(checked, students);
	const rightChecked = intersection(checked, transferredStudents);

	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = items => intersection(checked, items).length;

	const handleToggleAll = items => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};
	useEffect(() => {
		removeFromGroup({ remove });
	}, [remove]);

	useEffect(() => {
		addToGroup({ assign });
	}, [assign]);

	const handleCheckedRight = () => {
		setAssign(() => [...leftChecked]);
		setTransferredStudents(transferredStudents.concat(leftChecked));
		setSourceStudents(not(students, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setRemove([...rightChecked]);
		setSourceStudents(students.concat(rightChecked));
		setTransferredStudents(not(transferredStudents, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const customList = (title, items) => (
		<Card>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
						disabled={items.length === 0}
						inputProps={{ 'aria-label': 'all items selected' }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items.map(value => {
					const labelId = `transfer-list-all-item-${value._id}-label`;

					return (
						<ListItem key={value._id} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={value._id} primary={`${(value.lastName, value.firstName)}`} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	return (
		<Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
			<Grid item>{customList('Source', students)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label="move selected right"
					>
						&gt;
					</Button>
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected students"
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList('Destination', transferredStudents)}</Grid>
		</Grid>
	);
};

export default TransferElement;
