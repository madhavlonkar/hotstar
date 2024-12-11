import React from 'react';
import './Movie.css';
import HoverCard from '../OverlayCard/HoverCard';

function Movies({ movie }) {
    return (
        <div key={movie.id} className="ImgDiv" >

            <img
                className="images"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
                onLoad={() => { console.log('IMG LOADED') }}
            />
            <div className="overlay">
                <HoverCard movie={movie} />
            </div>

        </div>
    );
}

export default Movies;
