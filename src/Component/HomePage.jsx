import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material'; // Material-UI for layout and styling
import Sidebar from './Sidebar/Sidebar'; // Sidebar component
import ImageCarousel from './Carousel/ImageCarousel'; // Carousel for featured movies
import MovieSection from './MovieSection/MovieSection'; // Component for different movie categories
import ContinueWatchingMovieSection from './MovieSection/ContinueWatching/ContinueWatchingMovieSection'; // Continue Watching section
import './HomePage.css'; // Import the CSS file

function HomePage() {
    const categories = ['Latest Releases', 'Top Rated', 'TV Shows']; // List of categories for MovieSection

    const theme = useTheme(); // Material-UI theme for responsive design
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); // Check if the screen size is large

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // State to track login status
    const [userDetails, setUserDetails] = useState({}); // State to store logged-in user details

    useEffect(() => {
        // Check user login status from localStorage
        const userLoginStatus = localStorage.getItem('isUserLoggedIn');
        if (userLoginStatus === 'true') {
            const loggedInUser = localStorage.getItem('userData');
            const userJSON = JSON.parse(loggedInUser); // Parse user data from JSON
            setUserDetails(userJSON);
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, []);

    return (
        <Grid container className="homePageContainer">
            {/* Sidebar */}
            <Grid 
                item 
                xs={12} 
                md={0.3} 
                className="sidebarGrid"
            >
                <Sidebar />
            </Grid>

            {/* Main Content Area */}
            <Grid 
                item 
                xs={12} 
                md={11.7} 
                className="mainContentGrid"
            >
                {/* Featured Movies Carousel */}
                <ImageCarousel />

                {/* Continue Watching Section - Displayed if the user is logged in */}
                {isUserLoggedIn && (
                    <div style={{
                        paddingLeft: isLargeScreen ? '10px' : '0px',
                        paddingBottom: '20px'
                    }}>
                        <ContinueWatchingMovieSection username={userDetails.userName} />
                    </div>
                )}

                {/* Movie Categories */}
                {categories.map((category, index) => (
                    <MovieSection key={index} category={category} />
                ))}
            </Grid>
        </Grid>
    );
}

export default HomePage;
