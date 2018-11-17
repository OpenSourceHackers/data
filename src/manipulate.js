const fs = require("fs");

const data = fs.readFileSync('TraininigDataset.geojson');
const json = JSON.parse(data).features;

fs.writeFileSync('test.json', JSON.stringify(json.slice(1,20)));
