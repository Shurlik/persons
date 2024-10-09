import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import { Phone, AdsClick, AutoGraph, AutoMode, PersonOutlined, SubjectOutlined } from "@mui/icons-material";
import { CampaignIcon, Presentation, Sales, BrandIcon, ArticlesIcon, IdeasIcon, NewsIcon, Podcast, ShortformIcon, StepsIcon, YoutubeIcon, Email, FacebookIcon, GoogleIcon, InstIcon, LandingIcon, LeadIcon, LinkedInIcon, StrategyIcon, XIcon, AIIcon, GoalsIcon, KpiIcon, } from "../components/Icons";
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';

import { TrackChanges } from '@mui/icons-material';
export default [
	// {name: 'Home', href: '/persons', icon: PeopleAltIcon},
	// {name: 'Create Persona', href: '/create', icon: PersonAddIcon},
	// {name: 'Management', href: '/management', icon: ManageAccountsIcon},
	// {name: 'Forms', href: '/forms', icon: DynamicFormIcon},
	// {name: 'Articles', href: '/articles', icon: NewspaperIcon},
];

export const brandItems = [
	{
		name: 'Persona',
		icon: <PersonOutlined style={{ fontSize: '16px' }} />,
		subItems: [
			{ name: 'Create Persona', link: '/create', icon: <PersonAddIcon style={{ fontSize: '15px' }} />, disabled: false },
			{ name: '1 Click Generation', link: '/', icon: <AdsClick style={{ fontSize: '15px' }} />, disabled: true },
			{ name: 'Analyzer', link: '/', icon: <StepsIcon />, disabled: true },
			{ name: 'Management', link: '/management', icon: <ManageAccountsIcon sx={{fontSize: '15px'}} />, disabled: false },
		],
	},
	{
		name: 'Brand',
		icon: <BrandIcon />,
		subItems: [
			{ name: 'Guidelines', link: '/', icon: <SubjectOutlined style={{ fontSize: '15px' }} />, disabled: true },
			{ name: 'Analyzer', link: '/', icon: <AutoGraph style={{ fontSize: '15px' }} />, disabled: true },
		],
	},
];

export const contentItems = [
	{ name: 'Editorial Plan', link: '/', icon: <StepsIcon />, disabled: true },
	{ name: 'Ideas', link: '/', icon: <IdeasIcon />, disabled: true },
	{ name: 'Create Articles', link: '/forms', icon: <ArticlesIcon />, disabled: false },
	{ name: 'Shor-form Posts', link: '/', icon: <ShortformIcon />, disabled: true },
	{ name: 'Podcast', link: '/', icon: <Podcast />, disabled: true },
	{ name: 'YouTube', link: '/', icon: <YoutubeIcon />, disabled: true },
	{name: 'Newsletter', link: '/', icon: <NewsIcon/>, disabled: true},
	{
		name: 'Depot', link: '/articles', icon: <FormatIndentIncreaseIcon
			sx={{
				width: '18px', height: '18px'
			}}
		/>, disabled: false
	},
];

export const funnelItems = [
	{ name: 'Strategy', link: '/', icon: <StrategyIcon />, disabled: true },
	{
		name: 'Ads',
		icon: <TrackChanges sx={{ fontSize: '15px' }} />,
		subItems: [
			{ name: 'Facebook', link: '/', icon: <FacebookIcon />, disabled: true },
			{ name: 'Google', link: '/', icon: <GoogleIcon />, disabled: true },
			{ name: 'Instagram', link: '/', icon: <InstIcon />, disabled: true },
			{ name: 'LinkedIn', link: '/', icon: <LinkedInIcon />, disabled: true },
			{ name: 'X', link: '/', icon: <XIcon />, disabled: true },
		],
	},
	{ name: 'Lead Magnet', link: '/lead-magnet', icon: <LeadIcon />, disabled: true },
	{ name: 'E-Mail Sequence', link: '/email-sequence', icon: <Email />, disabled: true },
	{ name: 'Landing Pages', link: '/landing-pages', icon: <LandingIcon />, disabled: true },
];

export const salesItems = [
	{ name: 'Campaigns', link: '/', icon: <CampaignIcon />, disabled: true },
	{ name: 'Sales Letter', link: '/', icon: <Sales />, disabled: true },
	{ name: 'Sales Presentations', link: '/', icon: <Presentation />, disabled: true },
	{ name: 'Discovery Calls', link: '/', icon: <Phone style={{ fontSize: '15px' }} />, disabled: true },
];

export const strategyItems = [
	{ name: '9 Steps', link: '#', icon: <StepsIcon />, disabled: true },
	{ name: 'Goals', link: '#', icon: <GoalsIcon />, disabled: true },
	{ name: 'KPI’s', link: '#', icon: <KpiIcon />, disabled: true },
	{ name: 'AI Assistant', link: '#', icon: <AIIcon />, disabled: true },
];
