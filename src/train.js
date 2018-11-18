const rp = require('request-promise');

const TRAINING_KEY = process.env.TRAINING_KEY;
const PREDICTION_KEY = process.env.PREDICTION_KEY;
const PROJECT_ID = process.env.PROJECT_ID;

const options = {
    method: 'POST',
    uri: `https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Training/projects/${PROJECT_ID}/train`,
    headers: {
        'Training-Key': TRAINING_KEY
    },
    json: true
};

rp(options)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
