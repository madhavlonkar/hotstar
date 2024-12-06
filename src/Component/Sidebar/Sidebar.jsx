import React, { useState } from 'react';
import { CSidebar, CSidebarHeader, CSidebarNav, CNavItem } from '@coreui/react'; // CoreUI components
import CIcon from '@coreui/icons-react';
import {
    cilUser,
    cilSearch,
    cilHome,
    cilTv,
    cilMovie,
    cilAmericanFootball,
    cilApplications
} from '@coreui/icons'; // CoreUI icons
import { Drawer, IconButton } from '@mui/material'; // Material-UI components for Drawer and IconButton
import { Menu as MenuIcon } from '@mui/icons-material'; // Material-UI menu icon
import { useTheme, useMediaQuery } from '@mui/material'; // Material-UI theme utilities
import { useNavigate } from 'react-router-dom'; // React Router navigation
import styles from './Sidebar.module.css'; // Import the CSS module

const Sidebar = () => {
    const [openDrawer, setOpenDrawer] = useState(false); // State to manage Drawer visibility
    const theme = useTheme(); // Access Material-UI theme
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Check if the screen size is small
    const navigate = useNavigate(); // React Router navigation hook

    // Function to toggle the Drawer
    const toggleDrawer = (open) => {
        setOpenDrawer(open);
    };

    // Sidebar content shared between Sidebar and Drawer
    const sidebarContent = (
        <>
            <CSidebarHeader />
            <div className={styles.centeredContent}>
                <img
                    src="https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg"
                    height={40}
                    width={50}
                    alt="LOGO"
                />
            </div>
            <div className={styles.subscribeContainer}>
                <button className={styles.subscribeButton}>Subscribe</button>
            </div>
            <CSidebarNav className={`${styles.navItems}`} style={{ color: 'white' }}>
                <CNavItem onClick={() => navigate('/login')} href='#' style={{ color: 'white' }}>
                    <CIcon customClassName="nav-icon" icon={cilUser} style={{ color: 'white' }} /> My Space
                </CNavItem>
                <CNavItem onClick={() => navigate('/search')} href='#' style={{ color: 'white' }}>
                    <CIcon customClassName="nav-icon" icon={cilSearch} style={{ color: 'white' }} /> Search
                </CNavItem>
                <CNavItem onClick={() => navigate('/')} href='#' style={{ color: 'white' }}>
                    <CIcon customClassName="nav-icon" icon={cilHome} style={{ color: 'white' }} /> Home
                </CNavItem>
                <CNavItem onClick={() => navigate('/')} href='#' style={{ color: 'white' }}>
                    <CIcon customClassName="nav-icon" icon={cilTv} style={{ color: 'white' }} /> TV
                </CNavItem>
                <CNavItem onClick={() => navigate('/')} href='#' style={{ color: 'white' }}>
                    <CIcon customClassName="nav-icon" icon={cilMovie} style={{ color: 'white' }} /> Movies
                </CNavItem>
                <CNavItem onClick={() => navigate('/')} href='#' style={{ color: 'white' }}>
                    <CIcon customClassName="nav-icon" icon={cilAmericanFootball} style={{ color: 'white' }} /> Sports
                </CNavItem>
                <CNavItem onClick={() => navigate('/')} href='#' style={{ color: 'white' }}>
                    <CIcon customClassName="nav-icon" icon={cilApplications} style={{ color: 'white' }} /> Category
                </CNavItem>
            </CSidebarNav>
        </>
    );

    return (
        <div>
            {/* Sidebar for large screens */}
            {!isSmallScreen ? (
                <CSidebar className={styles.sidebar} unfoldable colorScheme="dark" position="fixed">
                    {sidebarContent}
                </CSidebar>
            ) : (
                // Drawer for small screens
                <Drawer
                    open={openDrawer}
                    onClose={() => toggleDrawer(false)}
                    anchor="left"
                >
                    <div className={styles.sidebarContentWrapper}>{sidebarContent}</div>
                </Drawer>
            )}

            {/* Menu Icon for toggling Drawer on small screens */}
            {isSmallScreen && (
                <IconButton
                    color="primary"
                    onClick={() => toggleDrawer(true)}
                    className={`${styles.iconButton} ${styles.iconButtonWrapper}`}
                >
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton>
            )}
        </div>
    );
};

export default Sidebar;
