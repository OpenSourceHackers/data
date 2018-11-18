const rp = require('request-promise');
const fs = require("fs");

// envars
const TRAINING_KEY = process.env.TRAINING_KEY;
const PREDICTION_KEY = process.env.PREDICTION_KEY;
const PROJECT_ID = '33f10f0e-0c55-4666-a441-8b82ad297db3';

// load tags
const tags = JSON.parse(fs.readFileSync('build/tags.json'));

// 1. get list of files @TODO: get from kagal
const files = [
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-none1.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-none2.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-none3.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-none4.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-none5.jpg',

    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-partial1.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-partial2.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-partial3.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-partial4.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-partial5.jpg',

    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-significant1.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-significant2.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-significant3.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-significant4.jpg',
    'https://github.com/OpenSourceHackers/data/raw/master/img/NLRC_14917_Dr-significant5.jpg',
];

// 2. extract category from file name
let images = [];
files.forEach((file) => {
    let match = file.match(/-(significant|partial|destroyed|none|unknown)[0-9]\.+/);
    if (!match) {
        console.log('NO MATCH FOR: ', file);
    }

    if (match) {
        match = match[1];

        images.push({
            'url': file,
            'tagIds': [tags.find((item) => item.name === match).id],
            // 'regions': [{'tagId': '{tagId}','left': 119.0,'top': 94.0,'width': 240.0,'height': 140.0}]
        });

        console.log(file, match);
    }
});

// 3. send to azure for training
const options = {
    method: 'POST',
    uri: `https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Training/projects/${PROJECT_ID}/images/urls`,
    headers: {
        'Training-Key': TRAINING_KEY
    },
    body: {
        'images': images,
        // 'tagIds': ['{tagId}']
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
