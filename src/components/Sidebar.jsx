import React, {useState} from 'react';
import {Box, Collapse, Drawer, List, ListItem, Typography} from '@mui/material';
import {colors} from '../assets/styles/colors';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom';
import {AdsClick, AutoGraph, AutoMode, PersonOutlined, Phone, SubjectOutlined} from '@mui/icons-material';
import {
	AdsIcon,
	AIIcon,
	ArticlesIcon,
	BrandIcon,
	CampaignIcon,
	Email,
	FacebookIcon,
	GoalsIcon,
	GoogleIcon,
	IdeasIcon,
	InstIcon,
	KpiIcon,
	LandingIcon,
	LeadIcon,
	LinkedInIcon,
	NewsIcon,
	Podcast,
	Presentation,
	Sales,
	ShortformIcon,
	StepsIcon,
	StrategyIcon,
	XIcon,
	YoutubeIcon
} from './Icons';


const drawerWidth = 300;

const Sidebar = () => {
	const [openItems, setOpenItems] = useState({});

	const handleClick = (title) => {
		setOpenItems((prevState) => ({
			...prevState,
			[title]: !prevState[title],
		}));
	};

	return (
		<Drawer
			variant='permanent'
			sx={{
				width: drawerWidth,
				border: 'none',
				minHeight: '100vh',
				height: '100%',
				backgroundColor: colors.backgroundMain,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					top: '86px',
					backgroundColor: colors.backgroundMain,
					scrollbarWidth: 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
					borderRight: `1px solid ${colors.darkGrey42} !important`,
				},
			}}
		>
			<Box
				sx={{
					backgroundColor: colors.backgroundMain,
					color: colors.white,
					minHeight: '100vh',
					height: '100%',
					borderTop: `1px solid ${colors.grey4}`,
					padding: '24px',
				}}
			>
				<StrategySection/>
				<FunnelSection
					openItems={openItems}
					handleClick={handleClick}
				/>
				<SalesSection/>
				<ContentMarketingSection/>
				<BrandSection
					openItems={openItems}
					handleClick={handleClick}
				/>
			</Box>
		</Drawer>
	);
};

export default Sidebar;

const StrategySection = () => {
	const strategyItems = [
		{name: '9 Steps', link: '/', icon: <StepsIcon/>},
		{name: 'Goals', link: '/', icon: <GoalsIcon/>},
		{name: 'KPI’s', link: '/', icon: <KpiIcon/>},
		{name: 'AI Assistant', link: '/', icon: <AIIcon/>},
	];

	return (
		<List sx={{padding: 0}}>
			<Typography sx={{color: colors.white, marginBottom: '8px', fontWeight: 'bold'}}>
				Strategy
			</Typography>
			{strategyItems.map((item) => (
				<ListItem
					button
					key={item.name}
					sx={{
						borderRadius: '4px',
						display: 'flex',
						alignItems: 'center',
						'&:hover': {
							backgroundColor: colors.greyhover,
							color: colors.orange,
						},
						'& .MuiTypography-root': {
							color: 'inherit',
						},
					}}
				>
					<Box
						component='span'
						sx={{display: 'flex', alignItems: 'center'}}
					>
						{item.icon}
					</Box>
					<Link
						to={item.link}
						style={{
							textDecoration: 'none',
							marginLeft: '8px',
							flexGrow: 1,
							color: 'inherit',
						}}
					>
						<Typography
							sx={{
								fontSize: '14px',
								color: 'inherit',
							}}
						>
							{item.name}
						</Typography>
					</Link>
				</ListItem>
			))}
		</List>
	);
};

const BrandSection = ({openItems, handleClick}) => {
	const brandItems = [
		{
			name: 'Persona',
			icon: <PersonOutlined style={{fontSize: '16px'}}/>,
			subItems: [
				{name: 'Step by Step', icon: <AutoMode style={{fontSize: '15px'}}/>},
				{name: '1 Click Generation', icon: <AdsClick style={{fontSize: '15px'}}/>},
				{name: 'Analyzer', icon: <StepsIcon/>},
			],
		},
		{
			name: 'Brand',
			icon: <BrandIcon/>,
			subItems: [
				{name: 'Guidelines', icon: <SubjectOutlined style={{fontSize: '15px'}}/>},
				{name: 'Analyzer', icon: <AutoGraph style={{fontSize: '15px'}}/>},
			],
		},
	];

	return (
		<Box sx={{paddingBottom: '120px'}}>
			<Typography
				sx={{
					color: colors.white,
					marginBottom: '8px',
					fontWeight: 'bold',
					borderTop: `1px solid ${colors.darkGrayMain}`,
					paddingTop: '16px'
				}}
			>
				Brand
			</Typography>
			{brandItems.map((item) => (
				<React.Fragment key={item.name}>
					<Box
						onClick={() => handleClick(item.name)}
						sx={{
							borderRadius: '4px',
							padding: '8px 12px',
							cursor: 'pointer',
							color: colors.black,
							backgroundColor: colors.mainGreen,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: '10px',
						}}
					>
						<Box sx={{display: 'flex', alignItems: 'center', color: 'inherit'}}>
							{item.icon}
							<Typography sx={{fontWeight: '700', marginLeft: '8px', fontSize: '14px', color: 'inherit'}}>
								{item.name}
							</Typography>
						</Box>
						{openItems[item.name] ? <ExpandLess sx={{color: 'inherit'}}/> : <ExpandMore sx={{color: 'inherit'}}/>}
					</Box>
					<Collapse
						in={openItems[item.name]}
						timeout='auto'
						unmountOnExit
					>
						<List
							component='div'
							disablePadding
							sx={{padding: '8px 12px', backgroundColor: colors.greybg, borderRadius: '4px'}}
						>
							{item.subItems.map((subItem) => (
								<ListItem
									button
									key={subItem.name}
									sx={{
										borderRadius: '4px',
										'&:hover': {backgroundColor: colors.greyhover, color: colors.orange}
									}}
								>
									{subItem.icon}
									<Link
										to='/'
										style={{textDecoration: 'none', marginLeft: '8px', color: 'inherit'}}
									>
										<Typography sx={{fontSize: '14px', color: 'inherit'}}>{subItem.name}</Typography>
									</Link>
								</ListItem>
							))}
						</List>
					</Collapse>
				</React.Fragment>
			))}
		</Box>
	);
};

const FunnelSection = ({openItems, handleClick}) => {
	const funnelItems = [
		{name: 'Strategy', link: '/', icon: <StrategyIcon/>},
		{
			name: 'Ads',
			icon: <AdsIcon/>,
			subItems: [
				{name: 'Facebook', icon: <FacebookIcon/>},
				{name: 'Google', icon: <GoogleIcon/>},
				{name: 'Instagram', icon: <InstIcon/>},
				{name: 'LinkedIn', icon: <LinkedInIcon/>},
				{name: 'X', icon: <XIcon/>},
			],
		},
		{name: 'Lead Magnet', link: '/', icon: <LeadIcon/>},
		{name: 'E-Mail Sequence', link: '/', icon: <Email/>},
		{name: 'Landing Pages', link: '/', icon: <LandingIcon/>},
	];

	return (
		<>
			<Typography
				sx={{
					color: colors.white,
					marginBottom: '8px',
					fontWeight: 'bold',
					borderTop: `1px solid ${colors.darkGrayMain}`,
					paddingTop: '16px'
				}}
			>
				Funnel
			</Typography>
			{funnelItems.map((item) =>
				item.subItems ? (
					<React.Fragment key={item.name}>
						<Box
							onClick={() => handleClick(item.name)}
							sx={{
								borderRadius: '4px',
								padding: '8px 12px',
								color: colors.black,
								cursor: 'pointer',
								backgroundColor: colors.mainGreen,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<Box sx={{display: 'flex', alignItems: 'center', color: 'inherit'}}>
								{item.icon}
								<Typography
									sx={{
										fontWeight: '700',
										marginLeft: '8px',
										fontSize: '14px',
										color: 'inherit'
									}}
								>{item.name}</Typography>
							</Box>
							{openItems[item.name] ? <ExpandLess sx={{color: 'inherit'}}/> : <ExpandMore sx={{color: 'inherit'}}/>}
						</Box>
						<Collapse
							in={openItems[item.name]}
							timeout='auto'
							unmountOnExit
						>
							<List
								component='div'
								disablePadding
								sx={{padding: '8px 12px', backgroundColor: colors.greybg, borderRadius: '4px'}}
							>
								{item.subItems.map((subItem) => (
									<ListItem
										button
										key={subItem.name}
										sx={{
											borderRadius: '4px',
											'&:hover': {backgroundColor: colors.greyhover, color: colors.orange}
										}}
									>
										{subItem.icon}
										<Link
											to='/'
											style={{textDecoration: 'none', marginLeft: '8px', color: 'inherit'}}
										>
											<Typography sx={{fontSize: '14px', color: 'inherit'}}>{subItem.name}</Typography>
										</Link>
									</ListItem>
								))}
							</List>
						</Collapse>
					</React.Fragment>
				) : (
					<ListItem
						button
						key={item.name}
						sx={{borderRadius: '4px', '&:hover': {backgroundColor: colors.greyhover, color: colors.orange}}}
					>
						{item.icon}
						<Link
							to={item.link}
							style={{textDecoration: 'none', marginLeft: '8px', color: 'inherit'}}
						>
							<Typography sx={{color: 'inherit', fontSize: '14px'}}>{item.name}</Typography>
						</Link>
					</ListItem>
				)
			)}
		</>
	);
};

const SalesSection = () => {
	const salesItems = [
		{name: 'Campaigns', link: '/', icon: <CampaignIcon/>},
		{name: 'Sales Letter', link: '/', icon: <Sales/>},
		{name: 'Sales Presentations', link: '/', icon: <Presentation/>},
		{name: 'Discovery Calls', link: '/', icon: <Phone style={{fontSize: '15px'}}/>},
	];

	return (
		<>
			<Typography
				sx={{
					color: colors.white,
					marginBottom: '8px',
					fontWeight: 'bold',
					borderTop: `1px solid ${colors.darkGrayMain}`,
					paddingTop: '16px'
				}}
			>
				Sales
			</Typography>
			{salesItems.map((item) => (
				<ListItem
					button
					key={item.name}
					sx={{borderRadius: '4px', '&:hover': {backgroundColor: colors.greyhover, color: colors.orange}}}
				>
					{item.icon}
					<Link
						to={item.link}
						style={{textDecoration: 'none', marginLeft: '8px', color: 'inherit'}}
					>
						<Typography sx={{color: 'inherit', fontSize: '14px'}}>{item.name}</Typography>
					</Link>
				</ListItem>
			))}
		</>
	);
};

const ContentMarketingSection = () => {
	const contentItems = [
		{name: 'Editorial Plan', link: '/', icon: <StepsIcon/>},
		{name: 'Ideas', link: '/', icon: <IdeasIcon/>},
		{name: 'Articles', link: '/', icon: <ArticlesIcon/>},
		{name: 'Shortform Posts', link: '/', icon: <ShortformIcon/>},
		{name: 'Podcast', link: '/', icon: <Podcast/>},
		{name: 'YouTube', link: '/', icon: <YoutubeIcon/>},
		{name: 'Newsletter', link: '/', icon: <NewsIcon/>},
	];

	return (
		<>
			<Typography
				sx={{
					color: colors.white,
					marginBottom: '8px',
					fontWeight: 'bold',
					borderTop: `1px solid ${colors.darkGrayMain}`,
					paddingTop: '16px'
				}}
			>
				Content Marketing
			</Typography>
			{contentItems.map((item) => (
				<ListItem
					button
					key={item.name}
					sx={{borderRadius: '4px', '&:hover': {backgroundColor: colors.greyhover, color: colors.orange}}}
				>
					{item.icon}
					<Link
						to={item.link}
						style={{textDecoration: 'none', marginLeft: '8px', color: 'inherit'}}
					>
						<Typography sx={{color: 'inherit', fontSize: '14px'}}>{item.name}</Typography>
					</Link>
				</ListItem>
			))}
		</>
	);
};
