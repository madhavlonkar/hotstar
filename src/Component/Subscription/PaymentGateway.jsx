import { Alert, Button, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './PaymentGateway.css'
import { createPortal } from 'react-dom';

function RazorpayPayment() {
    const navigate = useNavigate();

    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const handlePayment = () => {
        const options = {
            key: "rzp_test_wquKp1Dkyy2Nck",
            amount: 14900,
            currency: "INR",
            name: "Hotstar Subscription",
            description: "3 Months Super Plan",
            image: "https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg",
            handler: function (response) {
                setSnackbarOpen(true)
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            },
            prefill: {
                name: "Madhav Lonkar",
                email: "madhavlonkar2@gmail.com",
                contact: "9370548600",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response) {
            alert(`Payment failed! Reason: ${response.error.reason}`);
        });
    };

    return (
        <>
            <div>
                <Button variant='contained' fullWidth className="continue-button" onClick={handlePayment}>Continue With Super <NavigateNextIcon /></Button>
            </div>

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
                        severity='success'
                        onClose={() => setSnackbarOpen(false)}
                        sx={{backgroundColor:'green'}}
                    >
                        Payment Successful!Thank You
                    </Alert>
                </Snackbar>,
                document.body  // Render the Snackbar at the body level
            )}</>
    );
}

export default RazorpayPayment;

