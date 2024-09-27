// src/components/Login.js
import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {useAuth} from '../contexts/AuthContext';
import {useNavigate} from 'react-router-dom';
import {Box, Button, Typography} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import DialogLogin from "../components/DialogLogin";
import {colors} from "../assets/styles/colors";
import Logo from "../assets/images/kivi-logo.png";
import {TextPlugin} from "gsap/TextPlugin"

const LoginPage = () => {
	const {login} = useAuth();
	const navigate = useNavigate();
	const [showLogin, setShowLogin] = useState(false);
	const textRef = useRef(null);
	const textRef2 = useRef(null);
	const titleRef = useRef(null);
	const textUnderRef = useRef(null);

	const handleSubmit = async (username, password) => {
		try {
			await login(username, password);
			navigate('/');
		} catch (err) {
			console.log({err});
		}
	};

	function openLogin() {
		setShowLogin(true);
	}

	function hideLogin() {
		setShowLogin(false);
	}

	useEffect(() => {
		const timeline = gsap.timeline();
		const chars = textUnderRef.current.children;
		gsap.registerPlugin(TextPlugin)

		// Анимация текста
		timeline.fromTo(textRef2.current, {opacity: 0,}, {
			opacity: 1,
			duration: 1,
			ease: 'power2.in'
		},)
			.fromTo(titleRef.current, {opacity: 0}, {
				opacity: 1,
				duration: 1,
				ease: 'power2.in'
			}, ">-1")
			.fromTo('#texttest', {}, {duration: 1, text: 'SUPREME AI MARKETING', ease: "none", delimiter: "1"})
			.fromTo(textRef.current, {opacity: 0}, {
					opacity: 1,
					duration: .5,
					ease: 'power2.in'
				},
				">-1.5")
		;
	}, []);

	const cardImageStyle = {borderRadius: '16px', boxShadow: `0 0  10px 3px ${colors.mainGreen}`};


	return (
		<Box
			sx={{
				backgroundColor: colors.backgroundMain,
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				padding: '10rem'
			}}
		>
			<DialogLogin
				isOpen={showLogin}
				onClose={hideLogin}
				onSubmit={handleSubmit}
			/>
			<Typography
				ref={textRef2}
				variant={'h2'}
				sx={{color: colors.white, fontSize: '6rem'}}
			>
				Welcome to
			</Typography>
			<Box
				ref={titleRef}
				component={'img'}
				alt={'logo'}
				src={Logo}
				sx={{maxWidth: '30rem'}}
			/>
			<Typography
				id={'texttest'}
				ref={textUnderRef}
				variant={'p'}
				sx={{
					height: '2rem',
					fontWeight: 'normal',
					fontSize: '1rem',
					letterSpacing: 5,
					color: colors.mainGreen,
					marginBottom: '3rem',
					marginTop: '-1rem'
				}}
			>
			</Typography>
			<Box
				sx={{textAlign: 'center'}}
			>
				<Button
					ref={textRef}
					onClick={openLogin}
					variant='contained'
					endIcon={<LoginIcon/>}
					color='primary'
					sx={{
						width: '8rem'
					}}
				>
					Login
				</Button>
			</Box>
		</Box>
	);
};

export default LoginPage;
