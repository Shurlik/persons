import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, Container} from "@mui/material";
import OutputsTextField from "../OutputsTextField";
import ToggleEdit from "../services/ToggleEdit";
import {useNavigate} from "react-router-dom";
import Loader from "../Loader";
import {toast} from "react-toastify";
import {addOffer, addStep, updateOffer} from "../../services/offers";
import FullPageLoader from "../FullPageLoader";

const OfferResult = ({result, setResult, loading, formData, setLoading, steps, setSteps, offerId}) => {
	const resultBoxRef = useRef(null);
	const [edit, setEdit] = useState(false);
	const [saving, setSaving] = useState(false);

	const navigate = useNavigate();

	const saveHandler = async () => {
		setLoading(true);
		setSaving(true);
		try {
			let offer = null;

			if (!offerId) {
				offer = await addOffer({title: formData.offer});
				if (!offer) {
					toast.error('No offer was created');
					return;
				}
			}
			const values = result.split('The Modules')[1];
			let count = 1;
			for (const v of values.split('==========')) {
				const title = v.split('##########')[0];

				const data = {
					OfferM: offerId ? [offerId] : [offer.id],
					offerId: offerId ? offerId : offer.id,
					title,
					steps: count,
					content: v.split('##########')[1],
				};
				await addStep(data);
				count += 1;
			}
			await updateOffer(offerId ? offerId : offer.id, {
				"tailored training concept": result.split('The Modules')[0],
				title: formData.title
			});
			navigate(`/offers`, {replace: true});
			setLoading(false);
			setSaving(false);
		} catch (e) {
			console.log('error: ', e);
			setLoading(false);
			setSaving(false);
		}
		setLoading(false);
		setSaving(false);
	};

	useEffect(() => {
		if (resultBoxRef.current) {
			resultBoxRef.current.scrollTop = resultBoxRef.current.scrollHeight;
		}
	}, [result]);

	const previousStepHandler = () => {
		setResult('');
		setSteps(null);
		setTimeout(() => setSteps(steps - 1), 400);
	};

	return (
		<Container sx={{position: 'relative'}}>
			{!!result ? <><OutputsTextField
				ref={resultBoxRef}
				editable={edit}
				value={result}
				title={'Final result'}
				loading={loading}
				onChange={(event) => setResult(event.target.value)}
				noBorder
			/>
				<ToggleEdit
					isEdit={edit}
					onClick={() => setEdit(old => !old)}
				/>
			</> : <Loader/>}
			{!loading && <Box
				sx={{
					marginTop: '3rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '2rem'
				}}
			>
				<Button
					onClick={saveHandler}
					variant='contained'
					color='primary'
					fullWidth
				>
					Submit
				</Button>
				<Button
					onClick={previousStepHandler}
					variant='outlined'
					color='primary'
					fullWidth
				>
					Return
				</Button>
			</Box>}
			{saving && <FullPageLoader/>}
		</Container>
	)
		;
};

export default OfferResult;
