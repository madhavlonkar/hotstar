import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Sidebar from '../Sidebar/Sidebar';
import LoginModal from './LoginPrompt/LoginModal';
import './LoginPage.css'; // Import the CSS file

const LoginPage = ({ handleLogin }) => {
    return (
        <Container maxWidth="xxl">
            <Sidebar />
            <Box>

                <Grid container justifyContent="flex-end" spacing={2} sx={{ paddingTop: 5, marginBottom: 5 }}>
                    <Grid item>
                        <Button variant="contained" className="helpButton">
                            <HelpOutlineOutlinedIcon sx={{ marginRight: 1 }} /> Help & Support
                        </Button>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center">
                    <img
                        src="https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/feature/myspace/my_space_login_in.png"
                        alt="Login Illustration"
                        className="pageImage"
                    />
                </Grid>

                <Grid container justifyContent="center" sx={{ marginTop: 5 }}>
                    <Typography variant="h4" className="pageTitle">
                        Login to Disney + Hotstar
                    </Typography>
                </Grid>

                <Grid container justifyContent="center">
                    <Typography variant="body1" className="pageSubtitle">
                        Start watching from where you left off, personalize for kids and more
                    </Typography>
                </Grid>

                <Grid container justifyContent="center" className="loginModalSection">
                    <LoginModal handleLogin={handleLogin} />
                </Grid>
            </Box>
        </Container>
    );
};

export default LoginPage;
