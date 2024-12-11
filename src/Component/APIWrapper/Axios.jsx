import axios from 'axios';

async function getData(userUrl) {
    const options = {
        method: 'GET',
        url: userUrl,
        params: { language: 'en-US' },
        headers: {
            accept: 'application/json',
            Authorization: process.env.REACT_APP_API_TOKEN
        }
    };

    try {
        // Add a delay of 2 seconds (2000 milliseconds)
        // await new Promise(resolve => setTimeout(resolve, 200));

        const res = await axios.request(options);
        return res.data;

    } catch (error) {
        return error;
    }
}

export default getData;