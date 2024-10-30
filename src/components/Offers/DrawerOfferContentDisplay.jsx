import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Drawer, Typography} from "@mui/material";
import {colors} from "../../assets/styles/colors";
import useSWR from "swr";
import {getOffersSteps} from "../../services/offers";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Loader from "../Loader";


const DrawerOfferContentDisplay = ({selected, setSelected}) => {
	const {data = [], error, isLoading, mutate} = useSWR(`/offers/steps`, () => getOffersSteps(selected.id));

	const steps = data.map((s, i) =>
		<Accordion
			key={i}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon/>}
				aria-controls='panel2-content'
				id='panel2-header'
			>
				<Typography variant={'h5'}>Module {i + 1}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography
					variant={'subtitle'}
					sx={{whiteSpace: 'pre-wrap'}}
				>
					{s?.content}
				</Typography>
			</AccordionDetails>
		</Accordion>);

	return (
		<Drawer
			anchor={'right'}
			open={!!selected}
			onClose={() => setSelected(null)}
			PaperProps={{
				sx: {
					backgroundColor: 'transparent',
					boxShadow: 'none',
				},
			}}
		>
			<Box
				sx={{
					width: '60rem',
					borderTop: `1px solid ${colors.orange}`,
					borderLeft: `1px solid ${colors.orange}`,
					borderBottom: `1px solid ${colors.orange}`,
					height: '100%',
					borderRadius: '1rem 0 0 1rem',
					backgroundColor: colors.background,
					padding: '2rem',
					overflow: 'hidden'
				}}
			>
				<Box
					sx={{
						overflow: 'auto', height: '100%',
						'&::-webkit-scrollbar': {
							width: '10px',
							borderRadius: '4px',
						},
						'&::-webkit-scrollbar-track': {
							borderRadius: '4px',
							backgroundColor: colors.orange20,
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: colors.orange,
							borderRadius: '4px',
							width: '20px'
						},
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							paddingRight: '3rem'
						}}
					>
						<Typography
							variant={'h2'}
							sx={{color: colors.mainGreen, flexShrink: 3, flexGrow: 0}}
						>{selected?.title}</Typography>
					</Box>
					{isLoading && <Loader/>}
					<Box>
						{steps}
					</Box>
				</Box>
			</Box>
		</Drawer>
	);
};

export default DrawerOfferContentDisplay;
