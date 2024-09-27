import React, {useState} from 'react';
import useSWR from "swr";
import {getArticles} from "../services/airtable";
import {Box, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {colors} from "../assets/styles/colors";
import Loader from "../components/Loader";
import FormattedTextDisplayArticle from "../components/FormattedTextDisplayArticle";
import moment from "moment";

const ArticlesPage = () => {
	const {data = [], error, isLoading, mutate} = useSWR('/cos/articles', () => getArticles());

	const localStyles = {
		alignItems: "center", // Вместо alignVertical
		borderRadius: '.4rem',
		padding: '.6rem 0',
		color: colors.mainGreen,
		transition: '.5s',
		'&:hover': {
			backgroundColor: colors.backgroundMain,
			color: colors.orange
		},
		'&.Mui-selected': {
			backgroundColor: colors.backgroundMain,
			color: colors.orange,
			// paddingLeft: '.8rem',
			'&:hover': {
				backgroundColor: colors.backgroundMain, // Сохраняем белый фон при наведении на выбранный элемент
			},
		},
	};



	const [selected, setSelected] = useState(null);


	if (!data?.articles) {
		return <Loader/>;
	}
	data.articles.forEach(e => {
		console.log(e.fields["Article Image"])
		}
	)

	const articles = data.articles.map(d => ({
		id: d.id,
		title: d.fields['Blog Title'],
		content: d.fields['AI Final Output (Blogpost)'],
		image: d.fields["Article Image"],
		created: d.fields["Created Time"]
	}));

	return (
		<Container>
			<nav aria-label='main mailbox folders'>
				<List
					sx={{
						// backgroundColor: colors.background,
						borderRadius: '1rem',
						height: '100%'
					}}
				>
					{articles.sort((a, b) => {
						return moment(a.created) - moment(b.created);
					}).map((article, index) => (
						<Box key={article.title + index}>
					<ListItem
						disablePadding
					>
						<ListItemButton
							sx={localStyles}
							selected={article.id === selected?.id}
							onClick={() => setSelected(article)}
						>
							<ListItemText
								primary={article.title}
								sx={{
									'& .MuiListItemText-primary': {
										fontSize: '1.5rem',
										color: 'inherit', // Задайте нужный цвет
									}
								}}
							/>
						</ListItemButton>
					</ListItem>
					<Divider
						color={colors.darkGrey42}
						variant={'middle'}
					/>
				</Box>
				))}
			</List>
		</nav>
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
					{!!selected?.image && <Box
						sx={{
							flexShrink: 0,
							// flexGrow: 2,
							width: '15rem',
							overflow: 'hidden',
							borderRadius: '2rem'
						}}
					>
						<Box
							component={'img'}
							alt={'img'}
							src={selected?.image[0]?.url}
							sx={{width: '100%', height: '100%', objectFit: 'cover',}}
						/>
					</Box>}
				</Box>
				<FormattedTextDisplayArticle>{selected?.content}</FormattedTextDisplayArticle>
			</Box>
		</Box>
	</Drawer>
</Container>
)
	;
};

export default ArticlesPage;
