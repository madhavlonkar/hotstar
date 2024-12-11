import { Stack, Grid } from '@mui/material';
import React, { useEffect, useState, useRef, Suspense } from 'react';
import getData from '../APIWrapper/Axios';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import './MovieSection.css'


const Movies = React.lazy(() => import('./MovieWrapper/Movie'));

const LeftScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background-color: transparent;
  height: 370px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-image 0.3s;

  &:hover {
    background-image: linear-gradient(90deg, #020024 25%, transparent 100%);
  }

  @media (max-width: 600px) {
    height: 200px; /* Adjust height for smaller screens */
  }
`;

const RightScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background-color: transparent;
  height: 370px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-image 0.3s;

  &:hover {
    background-image: linear-gradient(90deg, transparent 0%, #020024 100%);
  }

  @media (max-width: 600px) {
    height: 200px; /* Adjust height for smaller screens */
  }
`;

const MoviesSection = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const movieContainerRef = useRef(null);

  const [isComponentVisible, setComponentVisible] = useState(false);

  const componentRef = useRef(null); // Ref for the element to observe

  const handleIntersection = (entries) => {
    const [entry] = entries;

    if (entry.isIntersecting) {
      setComponentVisible(true); // Set to true when the component is in the viewport
    }
  };



  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    let url = '';
    if (category === 'Latest Releases') {
      url = process.env.REACT_APP_LATEST_RELEASES_URL;
    } else if (category === 'Top Rated') {
      url = process.env.REACT_APP_TOP_RATED_URL;
    } else if (category === 'TV Shows') {
      url = process.env.REACT_APP_TV_SHOWS_URL;
    }

    if (!url) {
      setError('Invalid category selected.');
      setLoading(false);
      return;
    }

    try {
      const data = await getData(url);
      console.log(data)
      setMovies(data.results);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      threshold: 0.1, // Trigger when 10% of the component is in view
    });

    if (componentRef.current) {
      observer.observe(componentRef.current); // Observe the target element
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isComponentVisible) {
      fetchMovies(); // Fetch movies only when the component is visible
    }
  }, [isComponentVisible, category]); // Also depend on category to refetch if it changes ```javascript




  const scrollLeft = () => {
    const scrollAmount = window.innerWidth <= 600 ? 200 : 1890; // Adjust scroll amount for smaller screens
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({
        top: 0,
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    const scrollAmount = window.innerWidth <= 600 ? 200 : 1890; // Adjust scroll amount for smaller screens
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <p className='category-title'>{category}</p>
      <div className="movie-section-wrapper" >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          className="grid-container"
        >
          <LeftScrollButton onClick={scrollLeft} className='left-scroll-button'>
            <ArrowBackIosOutlinedIcon />
          </LeftScrollButton>

          <Grid item xs={12} ref={componentRef}>
            <Stack

              ref={movieContainerRef}
              direction="row"
              spacing={2}
              className="movie-container"
            >
              {loading && <p><CircularProgress /></p>}
              {error && <p>Error loading movies: {error}</p>}

              {isComponentVisible && (

                <Suspense fallback={<div><CircularProgress /></div>}>

                  {!loading && !error && movies.map((movie) => (
                    <Movies key={movie.id} movie={movie} />
                  ))}

                </Suspense>

              )}

            </Stack>
          </Grid>

          <RightScrollButton onClick={scrollRight} className='right-scroll-button'>
            <ArrowForwardIosOutlinedIcon />
          </RightScrollButton>
        </Grid>
      </div>
    </>
  );
};

export default MoviesSection;
