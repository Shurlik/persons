import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {AdsClick, AutoGraph, PersonOutlined, Phone, SubjectOutlined, TrackChanges} from "@mui/icons-material";
import {
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
	YoutubeIcon,
	PinterestIcon
} from "../components/Icons";
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PostAddIcon from '@mui/icons-material/PostAdd';

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
		icon: <PersonOutlined style={{fontSize: '16px'}}/>,
		subItems: [
			{name: 'Create Persona', link: '/create', icon: <PersonAddIcon style={{fontSize: '15px'}}/>, disabled: false},
			{name: '1 Click Generation', link: '/', icon: <AdsClick style={{fontSize: '15px'}}/>, disabled: true},
			{name: 'Analyzer', link: '/', icon: <StepsIcon/>, disabled: true},
			{name: 'Management', link: '/management', icon: <ManageAccountsIcon sx={{fontSize: '15px'}}/>, disabled: false},
		],
	},
	{
		name: 'Brand',
		icon: <BrandIcon/>,
		subItems: [
			{name: 'Guidelines', link: '/', icon: <SubjectOutlined style={{fontSize: '15px'}}/>, disabled: true},
			{name: 'Analyzer', link: '/', icon: <AutoGraph style={{fontSize: '15px'}}/>, disabled: true},
		],
	},
];

export const contentItems = [
	{name: 'Editorial Plan', link: '/', icon: <StepsIcon/>, disabled: true},
	{name: 'Ideas', link: '/', icon: <IdeasIcon/>, disabled: true},
	{name: 'Create Articles', link: '/forms', icon: <ArticlesIcon/>, disabled: false},
	{name: 'Short-form Posts', link: '/shorts', icon: <ShortformIcon/>, disabled: false},
	{name: 'Podcast', link: '/', icon: <Podcast/>, disabled: true},
	{name: 'YouTube', link: '/', icon: <YoutubeIcon/>, disabled: true},
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
	{name: 'Strategy', link: '/', icon: <StrategyIcon/>, disabled: true},
	{
		name: 'Ads',
		icon: <TrackChanges sx={{fontSize: '15px'}}/>,
		subItems: [
			{name: 'Create Ad', link: '/ads/create', icon: <PostAddIcon sx={{width: '16px', height: '16px'}}/>, disabled: false},
			{name: 'Facebook', link: '/ads/facebook', icon: <FacebookIcon/>, disabled: false},
			{name: 'Google', link: '/ads/google', icon: <GoogleIcon/>, disabled: false},
			{name: 'Instagram', link: '/ads/instagram', icon: <InstIcon/>, disabled: false},
			{name: 'LinkedIn', link: '/ads/linkedin', icon: <LinkedInIcon/>, disabled: false},
			{name: 'X', link: '/ads/x', icon: <XIcon/>, disabled: false},
			{name: 'Pinterest', link: '/ads/pinterest', icon: <PinterestIcon/>, disabled: false},
		],
	},
	{name: 'Offers', link: '/offers', icon: <LocalOfferIcon sx={{width: '16px', height: '16px'}}/>, disabled: false},
	{name: 'Lead Magnet', link: '/', icon: <LeadIcon/>, disabled: true},
	{name: 'E-Mail Sequence', link: '/', icon: <Email/>, disabled: true},
	{name: 'Landing Pages', link: '/', icon: <LandingIcon/>, disabled: true},
];

export const salesItems = [
	{name: 'Campaigns', link: '/', icon: <CampaignIcon/>, disabled: true},
	{name: 'Sales Letter', link: '/', icon: <Sales/>, disabled: true},
	{name: 'Sales Presentations', link: '/', icon: <Presentation/>, disabled: true},
	{name: 'Discovery Calls', link: '/', icon: <Phone style={{fontSize: '15px'}}/>, disabled: true},
];

export const strategyItems = [
	{name: '9 Steps', link: '#', icon: <StepsIcon/>, disabled: true},
	{name: 'Goals', link: '#', icon: <GoalsIcon/>, disabled: true},
	{name: 'KPI’s', link: '#', icon: <KpiIcon/>, disabled: true},
	{name: 'AI Assistant', link: '#', icon: <AIIcon/>, disabled: true},
];
