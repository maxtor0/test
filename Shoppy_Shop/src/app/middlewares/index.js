const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const middlewares = {};

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        middlewares[file.substring(0, file.length-3)] = require(path.join(__dirname, file));
    });

module.exports = middlewares;
