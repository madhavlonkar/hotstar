import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, Grid, Alert, useMediaQuery, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Snackbar } from '@mui/material';
import QR from '../../../Assets/img/QR.png';
import { useSelector } from 'react-redux';
import './LoginModal.css';  // Import the CSS file
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    width: { xs: '90%', sm: 1000 }, // Responsive width, kept here
    p: { xs: 2, sm: 5 }, // Padding, kept here
};

export default function LoginModal(props) {


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };



    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState();

    const userData = useSelector(state => state.userData);

    // Use Material-UI's useMediaQuery to detect small screens
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = userData.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            const userJSON = JSON.stringify(user);
            localStorage.setItem('userData', userJSON);
            localStorage.setItem('isUserLoggedIn', true);
            props.handleLogin(true);
            handleClose();
        } else {
            setSnackbarOpen(true)
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                className="loginButton" // Use the CSS class
                onClick={handleOpen}
            >
                Login
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style} className="modalBox">

                    <Stack direction={'row'} justifyContent={'end'}>
                        <CloseIcon className='btnClose' onClick={handleClose}></CloseIcon>
                    </Stack>

                    <Typography id="modal-modal-title" variant="h5" className="modalTitle">
                        Login or sign up to continue
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" className="modalSubTitle">
                        Scan QR code or enter phone number to login
                    </Typography>
                    <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                        {/* QR Code Section */}
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            className={`qrCodeSection ${isSmallScreen ? 'none' : ''}`}
                        >
                            <div className="qrCodeContainer">
                                <img src={QR} alt="QR Code" height={200} width={200} />
                                <p className="qrTextBold">Use Camera App to Scan QR</p>
                                <p className="qrTextMuted">
                                    Click on the link generated to redirect to Disney+ Hotstar mobile app
                                </p>
                            </div>
                        </Grid>

                        {/* Login Form Section */}

                        <Grid item xs={12} sm={6} className="formSection">
                            <form onSubmit={handleSubmit} className="formContainer">

                                <TextField
                                    type='email'
                                    fullWidth
                                    margin="normal"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {/* <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                /> */}
                                <FormControl fullWidth margin="normal" variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff className='Visibility' /> : <Visibility className='Visibility' />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <Stack direction="row" spacing={2} className="buttonGroup">

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className='btnLogin'
                                        size="large"
                                    >
                                        Login
                                    </Button>
                                </Stack>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>




            {createPortal(
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',  // Position the Snackbar at the top-right
                    }}
                >
                    <Alert
                        severity={'error'}
                        onClose={() => setSnackbarOpen(false)}
                        className='snackBar'
                    >
                        Incorrect username or password! Please try again......
                    </Alert>
                </Snackbar>,
                document.body  // Render the Snackbar at the body level
            )}

        </div>
    );
}
