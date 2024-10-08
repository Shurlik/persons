import React, {useState} from "react";
import {Box, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {colors} from "../assets/styles/colors";
import officeGirl from "../assets/images/cartoon-office-girl.png";
import DropMenu from "./DropMenu";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import officeBoy from "../assets/images/cartoon-office-boy.png";
import {LINK} from "../services/variables";
import {useNavigate} from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

const ArticlesList = ({
	                     articles,
	                     handleDeleteArticle,
	                     listArticlesToDelete,
	                     setListArticleToDelete,
	                     disabled,
	                      setSelected
                     }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [id, setId] = useState(null);
	const open = Boolean(anchorEl);


	const handleClick = (event, id) => {
		setAnchorEl(event.currentTarget);
		setId(id);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setId(null);
	};

	const onSelectChange = (checked, userId) => {
		if (checked) {
			listArticlesToDelete.push(userId);
			setListArticleToDelete([...listArticlesToDelete]);
		} else {
			const filtered = listArticlesToDelete.filter(p => {
				return p !== userId;
			});
			setListArticleToDelete([...filtered]);
		}
	};

	const editHandler = () => {

	};

	const downloadHandler = () => {
	};

	const deleteHandler = () => {
		setAnchorEl(null);
		handleDeleteArticle(id);
		setId(null);
	};


	const MENU_DATA = [
		{title: 'Edit', icon: DriveFileRenameOutlineIcon, fn: editHandler},
		{title: 'Download', icon: DownloadIcon, fn: downloadHandler},
		{title: 'Delete', icon: DeleteOutlinedIcon, fn: deleteHandler, color: colors.red},
	];

	const checkAllHandler = () => {
		articles.forEach(p => listArticlesToDelete.push(p.id));
		setListArticleToDelete([...listArticlesToDelete]);
	};

	const clearAllHandler = () => {
		setListArticleToDelete([]);
	};


	const onMainSelectChange = (event) => {
		event.target.checked ? checkAllHandler() : clearAllHandler();
	};

	return (
		<TableContainer
			sx={{backgroundColor: colors.background, borderRadius: '1.5rem', padding: '2rem'}}
		>
			<Table
				aria-label='simple table'
			>
				<TableHead>
					<TableRow>
						<TableCell padding={'checkbox'}
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						> <Checkbox
							disabled={disabled}
							sx={{
								color: colors.white,
								'&.Mui-checked': {
									color: colors.white,
								},
							}}
							// checked={true}
							checked={!!listArticlesToDelete.length}

							onChange={onMainSelectChange}
						/></TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Title</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Owner</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						>Action</TableCell>
						<TableCell
							sx={{borderBottom: `1px solid ${colors.grey3}`}}
						></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{/*=======*/}
					{articles.map((article) => (
						<TableRow
							key={article.id}
						>
							<TableCell  padding={'checkbox'}>
								<Checkbox
									disabled={disabled}
									sx={{
										color: colors.white,
										'&.Mui-checked': {
											color: colors.white,
										},
									}}
									checked={listArticlesToDelete.includes(article.id)}
									onChange={(event) => onSelectChange(event.target.checked, article.id)}
								/>
							</TableCell>
							<TableCell
								// onClick={() => userDetailsHandler(user.id)}
							>
									<Box>{article?.title}</Box>
							</TableCell>



							<TableCell>
								{article?.user?.name}
							</TableCell>
							<TableCell>
								<Button
									disabled={disabled}
									onClick={() => setSelected(article)}
									variant={'outlined'}
									color={'secondary'}
								>View Article
								</Button>
							</TableCell>
							<TableCell>
								<MoreVertIcon
									disabled={disabled}
									onClick={(event) => handleClick(event, article.id)}
									sx={{
										cursor: 'pointer'
									}}
								/></TableCell>

						</TableRow>
					))}
				</TableBody>
			</Table>
			<DropMenu
				disabled={disabled}
				onClose={handleClose}
				open={open}
				data={MENU_DATA}
				anchorEl={anchorEl}
			/>
		</TableContainer>
	);
};

export default ArticlesList;
