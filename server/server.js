var loopback      = require('loopback');
var boot          = require('loopback-boot');
var cacheManifest = require('connect-cache-manifest');

var app = module.exports = loopback();

/*
app.use(cacheManifest({
  manifestPath: '/application.manifest',
  cdn: ['http://yui.yahooapis.com/pure/0.5.0/pure-min.css'],
  files: [{
    file: __dirname + '/public/js/foo.js',
    path: '/js/foo.js'
  }, {
    dir: __dirname + '/public/css',
    prefix: '/css/'
  }, {
    dir: __dirname + '/views',
    prefix: '/html/',
    ignore: function(x) { return /\.bak$/.test(x); },
    replace: function(x) { return x.replace(/\.jade$/, '.html'); }
  }],
  networks: ['*'],
  fallbacks: []
}));
*/

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
