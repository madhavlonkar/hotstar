import React, { useEffect, useState } from 'react';
import { TextField, InputAdornment, IconButton, Container, Typography, Box } from '@mui/material';
import getData from '../APIWrapper/Axios';
import Movie from '../MovieSection/MovieWrapper/Movie';
import Sidebar from '../Sidebar/Sidebar';
import SearchIcon from '@mui/icons-material/Search';
import './Search.css'

function SearchPage() {
    // State variables
    const [movies, setMovies] = useState([]); // All movies fetched from the API
    const [filteredMovies, setFilteredMovies] = useState([]); // Filtered movies based on search input
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state


    // Fetch trending movies on component mount
    useEffect(() => {
        async function fetchMovies() {
            try {
                const data = await getData(process.env.REACT_APP_TRENDING_MOVIES);
                setMovies(data.results);
                setFilteredMovies(data.results);
                setLoading(false);
            } catch (fetchError) {
                setError(fetchError.message);
                setLoading(false);
            }
        }

        fetchMovies();
    }, []);

    // Filter movies based on search input
    const handleSearchInput = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery)
        );
        setFilteredMovies(filtered);
    };

    // Determine content to render
    let content;

    if (loading) {
        content = <Typography>Loading...</Typography>;
    } else if (error) {
        content = (
            <Typography
                className="errorMessage"
            >
                Error: {error}
            </Typography>
        );
    } else if (filteredMovies.length > 0) {
        content = filteredMovies.map((movie) => (
            <Box key={movie.id}>
                <Movie movie={movie} />
            </Box>
        ));
    } else {
        content = (
            <Typography
                className="errorMessage"
            >
                No movies found.
            </Typography>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ marginLeft: { xs: 0, sm: '70px' } }} className='containerPadding'>
            {/* Sidebar Component */}
            <Box
                sx={{
                    width: { xs: '100%', sm: '20%' },
                    marginBottom: { xs: 2, sm: 0 },
                }}

                className='paddingRight'
            >
                <Sidebar />
            </Box>

            {/* Main Content Area */}
            <Box
                sx={{
                    width: { xs: '100%', sm: '80%' },
                    padding: '10px',
                    marginTop: 5,
                }}
            >
                {/* Search Bar */}
                <TextField
                    id="search-movies-input"
                    fullWidth
                    placeholder="Movies, shows and more"
                    variant="outlined"
                    onChange={handleSearchInput}
                    className="searchInput"
                    sx={{
                        width: { xs: '100%', lg: '197%' },
                        paddingLeft: { xs: '8px', sm: '10px' },
                        paddingRight: { xs: '8px', sm: '10px' },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton aria-label="search movies">
                                    <SearchIcon sx={{ color: '#8F98B2' }} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Heading */}
                <Typography variant="h5" className="trendingTitle">
                    Trending in India
                </Typography>

                {/* Movie Grid */}
                <Box
                    className='gridContainer'
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)', // 1 card per row on small screens
                            sm: 'repeat(3, 1fr)', // 3 cards per row on medium screens
                            md: 'repeat(7, 1fr)', // 7 cards per row on large screens
                        },
                        gap: { xs: 2, sm: 2 },
                        marginTop: 2,
                        paddingLeft: { xs: '30px', sm: '10px' },
                        paddingRight: { xs: '20px', sm: '10px' },
                    }}
                >
                    {content}
                </Box>


            </Box>
        </Container>
    );
}

export default SearchPage;
