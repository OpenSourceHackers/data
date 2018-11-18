const rp = require('request-promise');
const fs = require("fs");

// envars
const TRAINING_KEY = process.env.TRAINING_KEY;
const PROJECT_ID = '33f10f0e-0c55-4666-a441-8b82ad297db3';

// get tags
const options = {
    method: 'GET',
    uri: `https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Training/projects/${PROJECT_ID}/tags`,
    headers: {
        'Training-Key': TRAINING_KEY
    }
};

rp(options)
    .then((response) => {
        console.log(response);
        fs.writeFileSync('build/tags.json', response);
    })
    .catch((error) => {
        console.log(error);
    });
