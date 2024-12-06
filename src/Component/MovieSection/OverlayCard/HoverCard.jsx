import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToWatchList } from '../../../Redux/WatchListSlice';
import Snackbar from '@mui/material/Snackbar';
import { createPortal } from 'react-dom';
import { Alert } from '@mui/material';
import OverlayCard from './OverlayCard';
import './HoverCard.css'

export default function HoverCard({ movie }) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.watchList);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('info');  // "warning" or "info"
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

  const addMovieToWatchListHandler = () => {
    // Function to generate random time
    const getRandomTimeLeft = () => {
      const hours = Math.floor(Math.random() * 3) + 1; // Random hours between 1 and 3
      const minutes = Math.floor(Math.random() * 60); // Random minutes between 0 and 59
      return `${hours}h ${minutes}m left`;
    };

    const movieToAdd = {
      id: movie.id,
      name: movie.title,
      timeLeft: getRandomTimeLeft(),
      img: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
    };

    const found = movies.some((data) => data.id === movieToAdd.id);

    // Check if the movie is already added
    if (found) {
      setSnackbarMessage('Movie already added to your watchlist!');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    }
    // Check if the watchlist is already full (>= 5 movies)
    else if (movies.length >= 5) {
      setSnackbarMessage('You can only add up to 5 movies to your watchlist.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    }
    else {
      // Add movie to watchlist if not exceeding 5
      dispatch(addMovieToWatchList(movieToAdd));
    }
  };

  React.useEffect(() => {
    // Check user login status from localStorage
    const userLoginStatus = localStorage.getItem('isUserLoggedIn');
    if (userLoginStatus === 'true') {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, []);

  const shortOverview = movie.overview.substring(0, 110);
  let releaseDate = '';
  if (movie.release_date) {
    releaseDate = movie.release_date.substring(0, 4);
  } else {
    releaseDate = movie.first_air_date.substring(0, 4);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const language = movie.original_language;

  return (
    <>
      <Card className="overlay-card-content">
        <div>
          <CardMedia
            component="img"
            height={150}
            image={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.name}
            className='hoverImg'
          />
          <CardActions>
            <Button onClick={handleOpen} fullWidth variant="contained" className='hoverButton'>
              <PlayArrowIcon /> Watch Now
            </Button>
            <div>
              <Button
                variant="outlined"
                disabled={isUserLoggedIn ? false : true}
                sx={{ color: '#fff' }}
                onClick={addMovieToWatchListHandler}
              >
                <AddIcon />
              </Button>
            </div>
          </CardActions>
          <CardContent>
            <Typography gutterBottom variant="body1" component="div" color="#fff">
              {releaseDate} • {language.toUpperCase()} • {movie.adult ? '18+' : '16+'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#8690a8' }}>
              {shortOverview}...
            </Typography>
          </CardContent>
        </div>
      </Card>

      {open && <OverlayCard movie={movie} releaseDate={releaseDate} open={open} handleClose={handleClose} />}

      {/* Render the Snackbar using a Portal */}
      {createPortal(
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',  // Position the Snackbar at the top-right
          }}
        >
          <Alert
            severity={snackbarSeverity}
            onClose={() => setSnackbarOpen(false)}
            sx={{
              backgroundColor: snackbarSeverity === 'warning' ? '#ff9800' : '#4caf50', // Orange for warnings, Green for success
              color: '#000', // Dark text color for contrast
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>,
        document.body  // Render the Snackbar at the body level
      )}
    </>
  );
}

