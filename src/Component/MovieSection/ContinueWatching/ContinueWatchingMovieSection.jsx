import { Grid } from '@mui/material';
import React from 'react';
import ContinueWatchingMovieCard from './ContinueWatchingMovieCard';
import { useSelector } from 'react-redux';
import './ContinueWatchingMovieSection.css'; // Import the CSS file

const ContinueWatchingMovieSection = ({ username }) => {
    const movies = useSelector(state => state.watchList);

    return (
        <>
            <p className="continueWatchingTitle">
                Continue Watching For {username}
            </p>
            <div className="movieGridContainer">
                <Grid
                    container
                    spacing={2}
                    justifyContent="left"
                    alignItems="center"
                >
                    {movies.map(movie => (
                        <Grid item xs={12} sm={3} md={2.2} key={movie.id}>
                            <ContinueWatchingMovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default ContinueWatchingMovieSection;
