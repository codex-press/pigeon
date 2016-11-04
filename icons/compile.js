#! /usr/local/bin/node

let fs = require('fs');

let data = {};
fs.readdirSync('.').map(filename => {
  if (/\.svg$/.test(filename))
    data[filename.slice(0,-4)] = fs.readFileSync(filename, {encoding: 'utf-8'});
});

fs.writeFileSync(
  './birds.js',
  `export default ${JSON.stringify(data, undefined, 2)}`
);

