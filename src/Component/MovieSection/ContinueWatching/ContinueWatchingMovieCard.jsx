import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ProgressBar from './ProgressBar';
import './ContinueWatchingMovieCard.css'; // Import the CSS file

export default function ContinueWatchingMovieCard({ movie }) {
    return (
        <Card className="cardRoot">
            <CardActionArea>
                <CardMedia
                    component="img"
                    className="cardImage"
                    image={movie.img}
                    alt={movie.name}
                />
                <ProgressBar />
                <CardContent className="cardContent">
                    <Typography gutterBottom variant="h6" component="div" className="movieTitle">
                        {movie.name}
                    </Typography>
                    <Typography variant="body2" className="timeLeft">
                        {movie.timeLeft}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
