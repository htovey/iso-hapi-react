var Hapi = require('hapi'),
    Path = require('path');

require('node-jsx').install();

var server = module.exports = new Hapi.Server();
server.connection({ port: 4000 });

server.views({
  engines: {
    hbs: require('handlebars')
  },
  path: Path.join(__dirname, '../views'),
  helpersPath: Path.join(__dirname, '../views/helpers'),
})

server.register([
  {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
      }]
    }
  }
], function (err) {
  if (err) {
    throw err;
  }

  server.route(require('./routes'));

  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
});
