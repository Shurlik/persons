import {colors} from "../styles/colors";

const dataGrid = {
	styleOverrides: {
		root: {
			backgroundColor: colors.background,
			borderRadius: '1.5rem',
			border: 'none',
			'& .MuiDataGrid-columnHeaders': {
				backgroundColor: colors.background,
				color: colors.white,
				fontSize: '1.3rem',
				fontWeight: 700,
			},
			'& .MuiDataGrid-columnHeader': {
				backgroundColor: colors.orange,
				color: colors.white,
				fontSize: '1.2rem',
				fontWeight: 700,
			},
			'& .MuiDataGrid-cell': {
				borderBottom: `1px solid ${colors.grey3}`,
				color: colors.white,
				whiteSpace: 'normal',
				wordWrap: 'break-word',

				fontSize: '1.1rem',
				fontWeight: 500,
				'&:focus': {
					outline: 'none', // Убираем стандартный фокус
					border: `2px solid ${colors.orange}`, // Устанавливаем нужный цвет бордера
				},
			},
			'& .MuiDataGrid-container--top':{
				backgroundColor: colors.mainGreen,
			},
			'& .MuiDataGrid-row': {

				'&:hover': {
					backgroundColor: `${colors.grey3}30`,
				},
			},
			'& .MuiCheckbox-root': {
				color: colors.white,
				'&.Mui-checked': {
					color: colors.white,
				},
			},
			'& .MuiDataGrid-columnSeparator': {
				display: 'none',
			},
			'& .MuiDataGrid-selectedRowCount': {
				color: colors.mainGreen,
			},
			'& .MuiDataGrid-menuIcon': {
				color: colors.white,
			},
			'& .MuiDataGrid-toolbarContainer': {
				padding: '2rem',
			},
			'& .MuiTablePagination-root': {
				color: colors.white,
			},
			'& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
				color: colors.mainGreen,
			},
			'& .MuiTablePagination-select': {
				color: colors.orange,
			},
			'& .MuiTablePagination-actions': {
				color: colors.mainGreen,
			},
		},
	},
	defaultProps: {
		// disableColumnMenu: true,
		// disableColumnFilter: true,
		// disableColumnSelector: true,
		// disableDensitySelector: true,
		// disableExtendRowFullWidth: true,
	},
};

export default dataGrid;
