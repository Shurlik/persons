import React, {useEffect, useState} from 'react';
import {Box, Button, Checkbox, DialogActions, FormControlLabel, FormGroup} from "@mui/material";
import {colors} from "../assets/styles/colors";
import PersonCardHead from "./PersonCardHead";
import officeGirl from "../assets/images/cartoon-office-girl.png";
import officeBoy from "../assets/images/cartoon-office-boy.png";
import DrawerPersFormDetails from "./DrawerPersFormDetails";
import Grid from "@mui/material/Grid2";

const ADD_DATA = ['Limbic Types', 'Important Values', 'Pain Points', 'Fears', 'Goals and Dreams', 'Materialistic Gains', 'Emotional Win'];


const UserFormSelect = ({person, selectedValues, setSelectedValues, setSteps, steps}) => {
	const [details, setDetails] = useState(null);


	const detailsHandler = () => {
		setDetails(true);
	};

	const onSelectChange = (selected, name) => {
		if (name === 'Select all') {
			if (selected) {
				setSelectedValues([...ADD_DATA]);
			} else {
				setSelectedValues([]);
			}
		} else {
			if (selected) {
				selectedValues.push(name);
				setSelectedValues([...selectedValues]);
			} else {
				const val = selectedValues.filter(v => {
					return v !== name;
				});
				setSelectedValues([...val]);
			}
		}
	};

	const nextStepHandler = () => {
		setSteps(null);
		setTimeout(() => setSteps(steps += 1), 350);
	};

	useEffect(() => {
		setSelectedValues([]);
	}, [person]);

	const t1 = ADD_DATA.map(i => <Grid
		size={6}
		key={i}
		sx={{textAlign: 'left', paddingLeft: '3rem'}}
	>
		<FormControlLabel
			key={i}
			sx={{
				'& .MuiFormControlLabel-label': {
					color: colors.white,
				}
			}}
			control={<Checkbox
				label={i}
				sx={{
					color: colors.orange,
					'&.Mui-checked': {
						color: colors.orange,
					},
				}}
				name={i}
				checked={selectedValues.includes(i)}
				onChange={(event) => onSelectChange(event.target.checked, event.target.name)}
			/>}
			label={i}
			color={'primary'}
		/>
	</Grid>);

	return (
		<Box
			sx={{
				width: '100%',
				borderRadius: '.8rem',
				textAlign: 'center',
				padding: '.8rem .3rem'
			}}
		>
			<PersonCardHead
				place={person.fields['Place of residence']}
				image={person.fields['User Image']?.length > 0 ? person.fields['User Image'][0]?.url : person.fields['Gender'] === 'Female' ? officeGirl : officeBoy}
				name={person.fields['Name']}
				age={person.fields['Age']}
				work={person.fields['Job title']}
			/>
			<FormGroup>
				<Grid
					container
					spacing={1}
					flexWrap
				>
					{t1}
					<Grid
						size={6}
						key={'all'}
						sx={{textAlign: 'left', paddingLeft: '3rem'}}
					>
						<FormControlLabel
							key={'Select all'}
							sx={{
								// marginTop: '1rem',
								justifyContent: 'center',
								'& .MuiFormControlLabel-label': {
									color: colors.mainGreen,
								}
							}}
							control={<Checkbox
								sx={{
									color: colors.orange,
									'&.Mui-checked': {
										color: colors.orange,
									},
								}}
								name={'Select all'}
								checked={selectedValues.length === ADD_DATA.length}
								onChange={(event) => onSelectChange(event.target.checked, event.target.name)}
							/>}
							label={'Select all'}
							color={'primary'}
						/>
					</Grid>
				</Grid>
			</FormGroup>
			<Box mt={7}>
				<Button
					onClick={detailsHandler}
					variant={'outlined'}
					color={'info'}
				>Details</Button>
			</Box>
			<DrawerPersFormDetails
				person={person}
				setDetails={setDetails}
				details={details}
			/>
			<DialogActions sx={{marginTop: '3rem'}}>
				<Button
					onClick={nextStepHandler}
					variant={'contained'}
					color={'primary'}
					sx={{width: '100%'}}
				>Next step</Button>
			</DialogActions>
		</Box>
	);
};

export default UserFormSelect;
