import React, { Suspense } from 'react'; // React core imports
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Routing imports
import CssBaseline from '@mui/material/CssBaseline'; // Resetting CSS styles
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Theme-related imports
import CircularProgress from '@mui/material/CircularProgress'; // Loader for lazy-loaded components
import HomePage from './Component/HomePage'; // Home page component
import './App.css'
import Subscription from './Component/Subscription/Subscription';

// Lazy-loaded components for better performance
const Login = React.lazy(() => import('./Component/Login/LoginWrapper'));
const Search = React.lazy(() => import('./Component/Search/Search'));

// Define a dark theme using Material-UI's ThemeProvider
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


// Main App Component
export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Normalize and reset browser CSS */}
      <BrowserRouter>
        {/* Suspense component displays fallback UI while lazy components load */}
        <Suspense
          fallback={
            <div className='loader'>
              <CircularProgress /> {/* Loading spinner */}
            </div>
          }
        >
          <Routes>
            {/* Define application routes */}
            <Route path="/" element={<HomePage />} /> {/* Home page route */}
            <Route path="/search" element={<Search />} /> {/* Search page route */}
            <Route path="/login" element={<Login />} /> {/* Login page route */}
            <Route path="/subscription" element={<Subscription />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
