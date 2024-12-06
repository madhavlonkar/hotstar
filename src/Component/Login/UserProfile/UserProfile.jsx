import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from '../../Sidebar/Sidebar';
import Avatars from './Avatars';
import ContinueWatchingMovieSection from '../../MovieSection/ContinueWatching/ContinueWatchingMovieSection';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMediaQuery, useTheme } from '@mui/material';
import './UserProfile.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userDetails, handleLogout }) => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    const navigate = useNavigate();

    return (
        <div className="profileBackground">
            <Sidebar />
            <Container maxWidth="xxl">
                <Box sx={{
                    marginLeft: { sm: '0px', md: '20px' }
                }} className='profileBoxPadding'>

                    <Grid container spacing={3} sx={{ paddingTop: 2, paddingBottom: 4 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" className="profileTitle">
                                <span className='SubTagline'>Subscribe to enjoy Disney + Hotstar <ArrowForwardIosIcon sx={{ color: 'goldenrod' }} /></span>
                            </Typography>
                            <Typography variant="h6" className="profileTitle">
                                {userDetails.fullName}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6} container justifyContent={isLargeScreen ? 'flex-end' : 'flex-start'} spacing={2}>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    className="profileButton subscribeButton"
                                    onClick={()=>{navigate('/subscription')}}
                                >
                                    Subscribe
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    className="profileButton helpButton"
                                >
                                    <HelpOutlineOutlinedIcon sx={{ marginRight: 1 }} /> Help & Support
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handleLogout}
                                    variant="contained"
                                    className="profileButton logoutButton"
                                >
                                    <LogoutOutlinedIcon sx={{ marginRight: 1 }} /> Log Out
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <hr />

                    <Grid container spacing={3} sx={{ paddingTop: 3 }}>
                        <Grid item xs={6} sm={6}>
                            <Typography variant="h6" className="profileSubtitle">
                                Profiles
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} container justifyContent="flex-end">
                            <Typography variant="h6" className="editButton">
                                <EditIcon fontSize="small" sx={{ marginRight: 1 }} /> Edit
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ marginTop: 3 }}>
                        <Grid item xs={12}>
                            <Avatars fullName={userDetails.fullName} />
                        </Grid>
                    </Grid>
                    <div className="continueWatchingSection">
                        <ContinueWatchingMovieSection username={userDetails.userName} />
                    </div>
                </Box>
            </Container>
        </div>
    );
};

export default UserProfile;
