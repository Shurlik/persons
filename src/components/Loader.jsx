import {Container} from "@mui/material";
import CircularProgress, {
} from '@mui/material/CircularProgress';

const Loader = ({props}) => {
	return (
		<Container sx={{textAlign: 'center', padding: '3rem'}}>
			<svg
				width={0}
				height={0}
			>
				<defs>
					<linearGradient
						id="my_gradient"
						x1="0%"
						y1="0%"
						x2="0%"
						y2="100%"
					>
						<stop
							offset="0%"
							stopColor="#231E39"
						/>
						<stop
							offset="100%"
							stopColor="#B3B8CD"
						/>
					</linearGradient>
				</defs>
			</svg>
			<CircularProgress sx={{'svg circle': {stroke: 'url(#my_gradient)'}}}/>
		</Container>
	);
};

export default Loader;
