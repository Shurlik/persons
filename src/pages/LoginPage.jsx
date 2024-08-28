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

		// Анимация текста
		timeline.fromTo(textRef2.current, {opacity: 0, duration: 3.5, ease: 'expo.out'}, {
				opacity: 1,
				duration: 1,
				ease: 'power2.in'
			}, )
			.fromTo(titleRef.current, {opacity: 0, duration: 3.5, ease: 'expo.out'}, {
				opacity: 1,
				duration: 1,
				ease: 'power2.in'
			}, ">.1")
			.fromTo(chars, {
					opacity: 0,
					duration: .1,
					ease: "power2.out"
				}, {
					opacity: 1,
					stagger: 0.1,
					// duration: .05,
					ease: "power2.out"
				},
				">.1")
			.fromTo(textRef.current, {opacity: 0, duration: 4.5, ease: 'expo.out'}, {
				opacity: 1,
				duration: 1,
				ease: 'power2.in'
			},
				">-1")
		;
	}, []);


	const cardImageStyle = {borderRadius: '16px', boxShadow: `0 0  10px 3px ${colors.mainGreen}`};


	return (
		<Box
			sx={{
				backgroundColor: '#000',
				height: '100%',
				display: 'flex',
				// justifyContent: 'space-between',
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
				sx={{color: colors.white, fontSize:'6rem'}}
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
				ref={textUnderRef}
				variant={'p'}
				sx={{fontWeight: 'normal', fontSize: '1rem', letterSpacing: 5, color: colors.mainGreen, marginBottom: '3rem', marginTop: '-1rem'}}
			>
				{'SUPREME   AI   MARKETING'.split('').map((word, index) => (
					<span
						key={index}
						style={{display: 'inline-block', marginRight: '0.25em'}}
					>
    {word}
  </span>
				))}

			</Typography>
			<Box
				sx={{textAlign: 'center'}}
			>
				<Button
					ref={textRef}
					onClick={openLogin}
					variant='outlined'
					endIcon={<LoginIcon/>}
					sx={{
						borderRadius: '.5rem',
						marginTop: '2rem',
						color: colors.mainGreen,
						transition: '.2s',
						border:`2px solid ${colors.mainGreen}`,
						fontWeight: 'bold',
						fontSize: '1.5rem',
						minWidth: '10rem',
						'&:hover': {
							// border:`2px solid ${colors.red}`,
							backgroundColor: colors.mainGreen,
							color: colors.black
						}
					}}
				>
					Login
				</Button>
			</Box>
		</Box>
	);
};

export default LoginPage;
