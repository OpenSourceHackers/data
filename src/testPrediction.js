const rp = require('request-promise');

// envars
const TRAINING_KEY = process.env.TRAINING_KEY;
const PREDICTION_KEY = process.env.PREDICTION_KEY;
const PROJECT_ID = process.env.PROJECT_ID;
const ITERATION_ID = process.env.ITERATION_ID;

// 1. get list of test files
const files = [
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-none-test.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-partial-test.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-significant-test.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-significant-test2.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-significant-test3.jpg',
];

files.forEach((file) => {
    const options = {
        method: 'POST',
        uri: `https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Training/projects/${PROJECT_ID}/quicktest/url?iterationId=${ITERATION_ID}`,
        headers: {
            'Training-Key': TRAINING_KEY
        },
        body: {
            url: file
        },
        json: true
    };

    rp(options)
        .then((response) => {
            console.log(file, response.predictions.map((item) => ( `${item.tagName}:${item.probability * 100}%` )).join(', '));
        })
        .catch((error) => {
            console.log(error);
        });
});
