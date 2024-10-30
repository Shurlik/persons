
import React, {useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import {DataGrid, GridActionsCellItem} from "@mui/x-data-grid";
import {paginationModel} from "../utils/helpers";
import moment from "moment/moment";
import useSWR from "swr";
import PageHeader from "../components/PageHeader";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {colors} from "../assets/styles/colors";
import {toast} from "react-toastify";
import FullPageLoader from "../components/FullPageLoader";
import {useNavigate} from "react-router-dom";
import {getOffers} from "../services/offers";
import DrawerOfferContentDisplay from "../components/Offers/DrawerOfferContentDisplay";

const OffersPage = () => {
	const {data = [], error, isLoading, mutate} = useSWR(`/offers`, () => getOffers());
	const [selected, setSelected] = useState(null);
	const [listToDelete, setListToDelete] = useState([]);
	const [loading, setLoading] = React.useState(false);

	const navigate = useNavigate();

	const columns = [
		// {field: 'title', headerName: 'Title', flex: 2},
		{field: 'offer', headerName: 'Title', flex: 5},
		{
			flex: 1,
			field: 'view',
			type: 'actions',
			headerName: 'View',
			getActions: (params) => [
				<GridActionsCellItem
					icon={<RemoveRedEyeIcon sx={{color: colors.orange}}/>}
					label='Action'
					onClick={(event) => {
						event.stopPropagation(); // Предотвращаем выделение строки
						const record = data?.find(d => d.id === params.id);
						setSelected(record);
					}}
				/>
			],
		},
		{
			field: 'created',
			headerName: 'Created at',
			flex: 1
		},
		{
			field: 'updated',
			headerName: 'Updated at',
			flex: 1
		},
	];

	const rows = data?.map((a, index) => ({
		id: a.id,
		offer: `${a?.title}`,
		updated: moment(a.created).format('YYYY-MM-DD'),
		created: moment(a.created).format('YYYY-MM-DD'),

	}));

	const handleSelectionChange = (data) => {
		setListToDelete([...data]);
	};

	const groupDeleteHandler = async () => {
		if (!listToDelete?.length) {
			return;
		}
		if (window.confirm("Are you sure you want to delete this Articles?")) {
			setLoading(true);
			try {
				for (const id of listToDelete) {
					// await deleteShorts(id);
				}
				await mutate();
				toast.success('Deleted successfully!');
				setListToDelete([]);
				setLoading(false);
			} catch (e) {
				toast.error('Something goes wrong');
				console.log('Article del error: ', e);
			} finally {
				setLoading(false);
			}
		}
	};

	const createHandler = () => navigate('/offers/create');

	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<PageHeader header={`Offers`}/>
				{listToDelete.length > 0 && <Button
					variant={'contained'}
					color={'primary'}
					onClick={groupDeleteHandler}
				>Delete selected</Button>}
				<Button
					variant={'contained'}
					color={'primary'}
					onClick={createHandler}
				>{`Create Offer`}</Button>
			</Box>
			<DataGrid
				disableColumnFilter
				rowSelectionModel={listToDelete}
				rows={rows}
				columns={columns}
				initialState={{pagination: {paginationModel}}}
				pageSizeOptions={[10, 20]}
				checkboxSelection
				// sx={{marginTop: '3rem'}}
				rowHeight={75}
				disableColumnSelector
				disableRowSelectionOnClick
				onRowSelectionModelChange={(newSelection) => {
					handleSelectionChange(newSelection);
				}}
			/>
			{/*</Box>*/}
			<DrawerOfferContentDisplay offer {...{selected, setSelected}} />
			{(loading || isLoading) && <FullPageLoader/>}
		</Container>
	);
};

export default OffersPage;