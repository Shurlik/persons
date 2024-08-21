import React from 'react';
import { Box, Typography, Checkbox } from "@mui/material";
import officeBoy from '../assets/images/cartoon-office-boy.png';
import officeGirl from '../assets/images/cartoon-office-girl.png';

const PersonCard = ({ person, isSelected, onSelectChange }) => {
	const { fields, id } = person;

	const DetailItem = ({ label, value }) => (
		<Box sx={{ mb: 1.5 }}>
			<Typography fontSize='.85rem' fontWeight='bold' component="span">{label}: </Typography>
			<Typography fontSize='.85rem' component="span">{value}</Typography>
		</Box>
	);

	const SectionTitle = ({ title }) => (
		<Typography variant="h6" fontWeight="bold" mt={1} mb={.5} color="#C400D7">
			{title}
		</Typography>
	);

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
			<Box
				sx={{
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
				<Box className="card-inner">
					{/* Front side */}
					<Box
						sx={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							backfaceVisibility: 'hidden',
							border: '1px solid silver',
							borderRadius: '25px',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Box
							sx={{
								backgroundColor: "#231E39",
								flexGrow: 3,
								padding: '25px',
								color: '#B3B8CD',
								textAlign: 'center'
							}}
						>
							<Box
								sx={{
									margin: '0 auto',
									border: '1px solid #C400D7',
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
										sx={{ width: '100%' }}
									/>
								</Box>
							</Box>
							<Typography variant='h4' marginTop={1} fontWeight={'bold'}>
								{fields['Name']}
							</Typography>
							<Typography fontSize={'1rem'} fontWeight={'bold'} mt={.5}>
								{fields['Place of residence (city, country, region)']}
							</Typography>
							<Typography fontSize={'1rem'} mt={.5}>
								{"Age: " + fields['Age'] + ", " + fields['Job title']}
							</Typography>
							<Typography fontSize={'1rem'} marginTop={1} textAlign={'left'}>
								{"Industry: " + fields['Industry']}
							</Typography>
							<Typography fontSize={'1rem'} marginTop={.5} variant={'body1'} textAlign={'left'}>
								{'Career stage: ' + fields['Career stage']}
							</Typography>
							<Typography fontSize={'1rem'} variant={'body1'} marginTop={.5} textAlign={'left'}>
								{"Working environment: " + fields['Working environment']}
							</Typography>
							<Typography fontSize={'1rem'} variant={'body1'} marginTop={.5} textAlign={'left'}>
								{"Education level: " + fields['Education level']}
							</Typography>
							<Typography fontSize={'1rem'} variant={'body1'} marginTop={.5} textAlign={'left'}>
								{"Income class: " + fields['Income class']}
							</Typography>
						</Box>
						<Box
							sx={{
								backgroundColor: "#1F1A36",
								height: '5%',
								padding: '20px',
								color: '#B3B8CD',
								textAlign: 'center',
								transition: '.3s',
								"&:hover": {
									backgroundColor: "#1F1A36dd",
								}
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
							backgroundColor: "#231E39",
							borderRadius: '25px',
							padding: '20px',
							color: '#B3B8CD',
							overflow: 'auto',
							'&::-webkit-scrollbar': {
								width: '8px',
							},
							'&::-webkit-scrollbar-thumb': {
								backgroundColor: '#C400D7',
								borderRadius: '4px',
							},
						}}
					>
						<SectionTitle title="Psychographic Characteristics" />
						<DetailItem label="Limbic Types" value={fields['Limbic Types']} />
						<DetailItem label="Enneagram" value={fields['Enneagram']} />
						<DetailItem label="Myers-Briggs" value={fields['Myers-Briggs']} />
						<DetailItem label="Spiral Dynamics" value={fields['Spiral Dynamics']} />
						<DetailItem label="Values and beliefs" value={fields['Values and beliefs']} />
						<DetailItem label="Lifestyle" value={fields['Lifestyle']} />

						<SectionTitle title="Media Usage" />
						<DetailItem label="Preferred communication channels" value={fields['Preferred communication channels (Social Media, Email, traditional media etc.)']} />
						<DetailItem label="Device usage" value={fields['Device usage (Smartphone, Desktop, Tablet)']} />
						<DetailItem label="Online behavior" value={fields['Online behavior (shopping preferences, sources of information)']} />

						<SectionTitle title="Buying Behavior" />
						<DetailItem label="Buying motives" value={fields['Buying motives']} />
						<DetailItem label="Buying barriers" value={fields['Buying barriers']} />
						<DetailItem label="Decision-making process" value={fields['Decision-making process (How does the persona make purchase decisions?)']} />
						<DetailItem label="Brand preferences" value={fields['Brand preferences']} />

						<SectionTitle title="Needs and challenges" />
						<DetailItem label="What does the persona need?" value={fields['What does the persona need?']} />
						<DetailItem label="What problems or challenges does it have?" value={fields['What problems or challenges does it have?']} />
						<DetailItem label="How can your product or service help?" value={fields['How can your product or service help?']} />

						<SectionTitle title="Goals and Dreams" />
						<DetailItem label="Short- and long-term goals" value={fields['Short- and long-term goals']} />
						<DetailItem label="Personal or professional aspirations" value={fields['Personal or professional aspirations']} />

						<SectionTitle title="Communication Preferences" />
						<DetailItem label="Tone and style of address" value={fields['Tone and style of address that resonates best']} />
						<DetailItem label="Visual preferences" value={fields['Visual preferences (colors, images, design)']} />
						<DetailItem label="Archetypes" value={fields['Archetypes']} />
						<DetailItem label="Key convincing messages" value={fields['What are the key messages that would convince the persona?']} />
					</Box>
				</Box>
			</Box>
			<Box sx={{ mt: 2, display: 'flex', alignItems: 'center', width: '100%' }}>
				<Checkbox
					checked={isSelected}
					onChange={(event) => onSelectChange(id, event.target.checked)}
					color="primary"
				/>
				<Typography variant="body2">Select Person</Typography>
			</Box>
		</Box>
	);
};

export default PersonCard;
