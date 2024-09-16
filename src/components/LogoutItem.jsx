import React from 'react';
import LinkCustom from "./LinkCustom";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutItem = ({onClick}) => {
	return (
		<LinkCustom
			Icon={LogoutIcon}
			name={'Logout'}
			to={'#'}
			onClick={onClick}
		/>
	);
};

export default LogoutItem;
