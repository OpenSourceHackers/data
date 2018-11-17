const fs = require("fs");
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const data = fs.readFileSync('TestSet_1.geojson');
const json = JSON.parse(data).features;

const bulk = [];

json.forEach((item) => {
    bulk.push({ index: { _index: 'testset1b', _id: item.properties.OBJECTID, _type: 'mytype' }})
    bulk.push({ geometry: item.geometry.coordinates[0][0] });
  });

// console.log(bulk.slice(0,10))
client.bulk({ body: bulk.slice(0,10) })
  .then((result) => console.log(result))
  .catch((error) => console.log(error))
