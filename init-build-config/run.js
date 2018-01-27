var config = require('./index');

var argv = require('minimist')(process.argv.slice(2));

config.init(argv);
