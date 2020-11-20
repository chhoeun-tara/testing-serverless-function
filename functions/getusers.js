const axios = require('axios');

exports.handler = function (event, context, callback) {

    const { API_URL, API_CLIENT_ID, API_CLIENT_SECRET } = process.env;

    // const API_URL = 'https://api.github.com/users';
    // const API_CLIENT_ID = 'a79809603c35bc59cafa';
    // const API_CLIENT_SECRET = '05be48fb6163396095674ade81fbebca88d2a160';

    const URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secrets=${API_CLIENT_SECRET}`;

    //Send user response
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(body)
        });
    }

    //Perform API call
    const getUser = () => {
        axios.get(URL)
            .then(res => send(res.data))
            .catch(err => send(err));
    }

    //Make sure method is GET
    if (event.httpMethod === 'GET') {
        //Run function
        getUser();
    }
}