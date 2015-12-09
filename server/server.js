var loopback      = require('loopback');
var boot          = require('loopback-boot');
var compression   = require('compression');
var cacheControl  = require('express-cache-response-directive');
var path          = require('path');

var app = module.exports = loopback();

// request pre-processing middleware
app.use(compression({ filter: shouldCompress }));

//filter out non-compressable calls
function shouldCompress(req, res) {

  if(typeof req.originalUrl === 'string'){
    if(req.originalUrl.indexOf("api") > -1) {
      return false;
    }
    if(req.originalUrl.indexOf("png") > -1) {
      return false;
    }
    if(req.originalUrl.indexOf("jpg") > -1) {
      return false;
    }
    if(req.originalUrl.indexOf("gif") > -1) {
      return false;
    }
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(cacheControl());

app.get('/', function(req, res, next) {
	res.cacheControl('public', { maxAge: 3600 });
});

// boot scripts mount components like REST API
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:

var staticPath = null;

if (process.env.NODE_ENV !== 'production') {
  staticPath = path.resolve(__dirname, '../client/src/');
  console.log("Running app in development mode");
} else {
  staticPath = path.resolve(__dirname, '../client/dist/');
  console.log("Running app in production mode");
}

app.use(loopback.static(staticPath));

// any other routes:
app.all('/*', function(req, res) {
    res.sendFile(staticPath + '/index.html');
});

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

if (require.main === module){
  app.start();
}
