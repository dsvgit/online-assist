var fs = require('fs');
var _ = require('lodash');
var TEMPLATE_PATH = require('./constants').TEMPLATE_PATH;
var DIST_PATH = require('./constants').DIST_PATH;

var defaultConfig = {
  'apiHost': 'http://localhost:3000'
};

function init(_options) {
  var options = _.assign({}, defaultConfig, _options);

  console.log('START init config');
  try {
    // when config file already exists -> do nothing, else -> create new one in catch block.
    fs.accessSync(DIST_PATH);
    console.log('Config file "' + DIST_PATH + '" exists and will be used.');
  } catch (e) {
    console.log('Config file "' + DIST_PATH + '" does NOT exists and will be created.')
    fs.readFile(TEMPLATE_PATH, 'utf-8', function (err, data) { // copy file and set default configs
      var compiled = _.template(data);
      var toWrite = compiled(options);

      fs.writeFile(DIST_PATH, toWrite);
    });
  }
}

module.exports.init = init;
