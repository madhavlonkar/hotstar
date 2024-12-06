import React, { useEffect, useRef, useState } from 'react';
import './Movie.css';
import HoverCard from '../OverlayCard/HoverCard';
import CircularProgress from '@mui/material/CircularProgress';

function Movies({ movie }) {
    const [isVisible, setIsVisible] = useState(false); // Tracks if the component is visible in the viewport
    const componentRef = useRef(null); // Reference for the element to observe

    useEffect(() => {
        // Intersection Observer callback
        const handleIntersection = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true); // Mark component as visible when in viewport
            }
        };

        // Create and set up an IntersectionObserver
        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // Observe visibility relative to the viewport
            threshold: 0.1 // Trigger when 10% of the element is in view
        });

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            // Clean up the observer when the component unmounts
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, []);

    return (
        <div key={movie.id} className="ImgDiv" ref={componentRef}>
            {isVisible ? (
                <>
                    <img
                        className="images"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                        onLoad={()=>{console.log('IMG LOADED')}}
                    />
                    <div className="overlay">
                        <HoverCard movie={movie} />
                    </div>
                </>
            ) : (
                <div className="placeholder"><CircularProgress /></div> // Placeholder before visibility
            )}
        </div>
    );
}

export default Movies;
