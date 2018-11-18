const rp = require('request-promise');
const fs = require("fs");

// envars
const TRAINING_KEY = process.env.TRAINING_KEY;
const PREDICTION_KEY = process.env.PREDICTION_KEY;
const PROJECT_ID = process.env.PROJECT_ID;

// load tags
const tags = JSON.parse(fs.readFileSync('build/tags.json'));

// 1. get list of files @TODO: get from kagal
const files = [
    '62_RescUAV_12917_Philipsburg.tif_none.jpg',
    '609_RescUAV_12917_Philipsburg.tif_none.jpg',
    '608_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '607_RescUAV_12917_Philipsburg.tif_destroyed.jpg',
    '606_RescUAV_12917_Philipsburg.tif_none.jpg',
    '604_RescUAV_12917_Philipsburg.tif_partial.jpg',
    '603_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '602_RescUAV_12917_Philipsburg.tif_none.jpg',
    '601_RescUAV_12917_Philipsburg.tif_none.jpg',
    '600_RescUAV_12917_Philipsburg.tif_none.jpg',
    '599_RescUAV_12917_Philipsburg.tif_none.jpg',
    '598_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '597_RescUAV_12917_Philipsburg.tif_partial.jpg',
    '596_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '595_RescUAV_12917_Philipsburg.tif_none.jpg',
    '594_RescUAV_12917_Philipsburg.tif_none.jpg',
    '593_RescUAV_12917_Philipsburg.tif_none.jpg',
    '592_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '591_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '590_RescUAV_12917_Philipsburg.tif_partial.jpg',
    '589_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '583_RescUAV_12917_Philipsburg.tif_partial.jpg',
    '582_RescUAV_12917_Philipsburg.tif_unknown.jpg',
    '578_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '577_RescUAV_12917_Philipsburg.tif_partial.jpg',
    '576_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '576_RescUAV_12917_Philipsburg.tif_significant',
    '575_RescUAV_12917_Philipsburg.tif_none.jpg',
    '574_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '573_RescUAV_12917_Philipsburg.tif_none.jpg',
    '572_RescUAV_12917_Philipsburg.tif_partial.jpg',
    '566_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '565_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '564_RescUAV_12917_Philipsburg.tif_destroyed.jpg',
    '55_RescUAV_12917_Philipsburg.tif_significant.jpg',
    '530_RescUAV_12917_Philipsburg.tif_partial.jpg',
    '524_RescUAV_12917_Philipsburg.tif_destroyed.jpg',
    '520_RescUAV_12917_Philipsburg.tif_destroyed.jpg',
    '517_RescUAV_12917_Philipsburg.tif_destroyed.jpg',
    '512_RescUAV_12917_Philipsburg.tif_destroyed.jpg',
    '503_RescUAV_12917_Philipsburg.tif_destroyed.jpg',
    '49_RescUAV_12917_Philipsburg.tif_none.jpg',
    '499_RescUAV_12917_Philipsburg.tif_none.jpg',
    '496_RescUAV_12917_Philipsburg.tif_none.jpg',
    '451_RescUAV_12917_Philipsburg.tif_partial.jpg'
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


    