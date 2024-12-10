import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { Typography, Grid, Stack } from '@mui/material';
import './OverlayCard.css'; // Import the CSS file

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '650px',
};

export default function OverlayCard({ movie, releaseDate, open, handleClose }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="modal-container">
                   
                    <Grid container spacing={2}>
                        {/* Movie Image */}
                        <Grid item xs={12}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                alt={movie.name}
                                className="modal-image"
                            />
                        </Grid>
                        {/* Movie Title and Info */}
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" className="modal-title">
                                {releaseDate} • {movie.original_language.toUpperCase()} •
                                <button className="UAbutton">U/A {movie.adult ? '18+' : '16+'}</button> •
                                {movie.vote_average} <StarsRoundedIcon className="icon" /> •
                                {movie.media_type ? movie.media_type.charAt(0).toUpperCase() + movie.media_type.slice(1) : 'Series'}
                                <MovieCreationRoundedIcon className="icon" />
                            </Typography>
                        </Grid>
                        {/* Movie Overview */}
                        <Grid item xs={12}>
                            <Typography id="modal-modal-description" className="modal-description">
                                {movie.overview}{movie.overview}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
