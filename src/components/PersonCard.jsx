import React from 'react';
import {Box, Checkbox, Typography} from "@mui/material";
import officeBoy from '../assets/images/cartoon-office-boy.png';
import officeGirl from '../assets/images/cartoon-office-girl.png';
import { useNavigate} from "react-router-dom";
import {colors} from "../assets/styles/colors";

const PersonCard = ({person, isSelected, onSelectChange}) => {
	const {fields, id} = person;
	const navigate = useNavigate();

	const DetailItem = ({label, value}) => (
		<Box sx={{mb: 1.5}}>
			<Typography
				fontSize='.85rem'
				fontWeight='bold'
				component='span'
				color={colors.mainGreen80}
			>{label}: </Typography>
			<Typography
				fontSize='.85rem'
				component='span'
			>{value}</Typography>
		</Box>
	);

	const SectionTitle = ({title}) => (
		<Typography
			variant='h6'
			fontWeight='bold'
			mt={1}
			mb={.5}
			color={colors.mainGreen}
		>
			{title}
		</Typography>
	);

	function detailsHandler() {
		navigate(`/persons/${id}`);
	}

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4}}>
			<Box
				onClick={detailsHandler}
				sx={{
					cursor: 'pointer',
					width: '350px',
					height: '600px',
					perspective: '1000px',
					'& .card-inner': {
						position: 'relative',
						width: '100%',
						height: '100%',
						transition: 'transform 0.8s',
						transformStyle: 'preserve-3d',
					},
					'&:hover .card-inner': {
						transform: 'rotateY(180deg)',
					},
				}}
			>
				<Box className='card-inner'>
					{/* Front side */}
					<Box
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							backfaceVisibility: 'hidden',
							border: `1px solid ${colors.mainGreen80}`,
							borderRadius: '25px',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box
							sx={{
								backgroundColor: colors.black,
								flexGrow: 3,
								padding: '25px',
								color: '#B3B8CD',
								textAlign: 'center'
							}}
						>
							<Box
								sx={{
									margin: '0 auto',
									border: `1px solid ${colors.mainGreen}`,
									width: '140px',
									height: '140px',
									borderRadius: '50%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<Box
									sx={{
										border: '1px solid silver',
										width: '125px',
										height: '125px',
										borderRadius: '50%',
										overflow: 'hidden',
									}}
								>
									<Box
										component={'img'}
										alt={'user image'}
										src={fields.Gender === 'Female' ? officeGirl : officeBoy}
										sx={{width: '100%'}}
									/>
								</Box>
							</Box>
							<Typography
								variant='h4'
								marginTop={1}
								fontWeight={'bold'}
								sx={{color: colors.mainGreen}}
							>
								{fields['Name']}
							</Typography>
							<Typography
								fontSize={'1rem'}
								fontWeight={'bold'}
								mt={.5}
								sx={{color: colors.mainGreen}}
							>
								{fields['Place of residence (city, country, region)']}
							</Typography>
							<Typography
								fontSize={'1rem'}
								mt={.5}
								sx={{color: colors.silver}}
							>
								{"Age: " + fields['Age'] + ", " + fields['Job title']}
							</Typography>
							<Typography
								fontSize={'1rem'}
								marginTop={1}
								textAlign={'left'}
							>
								<Typography color={colors.mainGreen80} variant={'span'}>Industry: </Typography><Typography variant={'span'}>{fields['Industry']}</Typography>
							</Typography>
							<Typography
								fontSize={'1rem'}
								marginTop={.5}
								variant={'body1'}
								textAlign={'left'}
							>
								<Typography color={colors.mainGreen80} variant={'span'}>Career stage: </Typography><Typography variant={'span'}>{fields['Career stage']}</Typography>
							</Typography>
							<Typography
								fontSize={'1rem'}
								variant={'body1'}
								marginTop={.5}
								textAlign={'left'}
							>
								<Typography color={colors.mainGreen80} variant={'span'}>Working environment: </Typography><Typography variant={'span'}>{fields['Working environment']}</Typography>
							</Typography>
							<Typography
								fontSize={'1rem'}
								variant={'body1'}
								marginTop={.5}
								textAlign={'left'}
							>
								<Typography color={colors.mainGreen80} variant={'span'}>Education level: </Typography><Typography variant={'span'}>{fields['Education level']}</Typography>
							</Typography>
							<Typography
								fontSize={'1rem'}
								variant={"body1"}
								marginTop={.5}
								textAlign={'left'}
							>
								<Typography color={colors.mainGreen80} variant={'span'}>Income class: </Typography><Typography variant={'span'}>{fields['Income class']}</Typography>
							</Typography>
						</Box>
						<Box
							sx={{
								backgroundColor: colors.black,
								height: '5%',
								padding: '20px',
								color: '#B3B8CD',
								textAlign: 'center',
							}}
						>
						</Box>
					</Box>

					{/* Back side */}
					<Box
						sx={{
							position: 'absolute',
							width: '90%',
							height: '95%',
							backfaceVisibility: 'hidden',
							transform: 'rotateY(180deg)',
							backgroundColor: colors.black,
							borderRadius: '25px',
							padding: '20px',
							color: '#B3B8CD',
							overflow: 'auto',
							'&::-webkit-scrollbar': {
								width: '8px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: colors.mainGreen50,
								borderRadius: '4px',
							},
						}}
					>
						<SectionTitle title='Psychographic Characteristics'/>
						<DetailItem
							label='Limbic Types'
							value={fields['Limbic Types']}
						/>
						<DetailItem
							label='Enneagram'
							value={fields['Enneagram']}
						/>
						<DetailItem
							label='Myers-Briggs'
							value={fields['Myers-Briggs']}
						/>
						<DetailItem
							label='Spiral Dynamics'
							value={fields['Spiral Dynamics']}
						/>
						<DetailItem
							label='Values and beliefs'
							value={fields['Values and beliefs']}
						/>
						<DetailItem
							label='Lifestyle'
							value={fields['Lifestyle']}
						/>

						<SectionTitle title='Media Usage'/>
						<DetailItem
							label='Preferred communication channels'
							value={fields['Preferred communication channels (Social Media, Email, traditional media etc.)']}
						/>
						<DetailItem
							label='Device usage'
							value={fields['Device usage (Smartphone, Desktop, Tablet)']}
						/>
						<DetailItem
							label='Online behavior'
							value={fields['Online behavior (shopping preferences, sources of information)']}
						/>

						<SectionTitle title='Buying Behavior'/>
						<DetailItem
							label='Buying motives'
							value={fields['Buying motives']}
						/>
						<DetailItem
							label='Buying barriers'
							value={fields['Buying barriers']}
						/>
						<DetailItem
							label='Decision-making process'
							value={fields['Decision-making process (How does the persona make purchase decisions?)']}
						/>
						<DetailItem
							label='Brand preferences'
							value={fields['Brand preferences']}
						/>

						<SectionTitle title='Needs and challenges'/>
						<DetailItem
							label='What does the persona need?'
							value={fields['What does the persona need?']}
						/>
						<DetailItem
							label='What problems or challenges does it have?'
							value={fields['What problems or challenges does it have?']}
						/>
						<DetailItem
							label='How can your product or service help?'
							value={fields['How can your product or service help?']}
						/>

						<SectionTitle title='Goals and Dreams'/>
						<DetailItem
							label='Short- and long-term goals'
							value={fields['Short- and long-term goals']}
						/>
						<DetailItem
							label='Personal or professional aspirations'
							value={fields['Personal or professional aspirations']}
						/>

						<SectionTitle title='Communication Preferences'/>
						<DetailItem
							label='Tone and style of address'
							value={fields['Tone and style of address that resonates best']}
						/>
						<DetailItem
							label='Visual preferences'
							value={fields['Visual preferences (colors, images, design)']}
						/>
						<DetailItem
							label='Archetypes'
							value={fields['Archetypes']}
						/>
						<DetailItem
							label='Key convincing messages'
							value={fields['What are the key messages that would convince the persona?']}
						/>
					</Box>
				</Box>
			</Box>
			<Box sx={{mt: 2, display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center'}}>
				<Checkbox
					checked={isSelected}
					onChange={(event) => onSelectChange(id, event.target.checked)}
				/>
				<Typography variant='body2' color={colors.mainGreen}>Select Person</Typography>
			</Box>
		</Box>
	);
};

export default PersonCard;
