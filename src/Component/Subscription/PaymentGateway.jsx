import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './PaymentGateway.css'

function RazorpayPayment() {
    const navigate = useNavigate();

    const handlePayment = () => {
        const options = {
            key: "rzp_test_wquKp1Dkyy2Nck", 
            amount: 14900,
            currency: "INR",
            name: "Hotstar Subscription", 
            description: "3 Months Super Plan",
            image: "https://img.hotstar.com/image/upload/v1656431456/web-images/logo-d-plus.svg", 
            handler: function (response) {
                alert(`Payment successful`);
                navigate('/login'); 
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
        <div>
            <Button variant='contained' fullWidth className="continue-button" onClick={handlePayment}>Continue With Super <NavigateNextIcon /></Button>
        </div>
    );
}

export default RazorpayPayment;
