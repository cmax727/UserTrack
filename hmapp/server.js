/* This is the main running file */
/* config.js - configuration file. Stays in globals when loaded */
/* package.json - contains info about the project, authors, about npm dependencies */
/* supervisord.conf - file needed for Supervisord (processes control system). Restarts the server if it crashes */
/* dotcloud.yml is required for dotcloud hosting (project type and project folder) */
/* socketApp.js is the core of the project,it that ontains all socket interoperations with admin and users*/
/* utilities folder - contains utilities.js file: different helpers. Also contains binaries: */
/* Phantomjs for websites scrapping and DOM analyzing. Wkhtltoimage for webpages screenshoting*/
/* phantomScript.js is a script that analyze the webpage and finds the biggest fixed size element (more info inside the file)*/

var express = require('express');    
var app = module.exports = express.createServer();
GLOBAL.config = require('./config.js')(app.settings.env);
var Utilities=require('./utilities/utilities.js');
GLOBAL.utilities = new Utilities(); 
var routes = require('./routes/routes.js');
var mongoose=require('mongoose');

mongoose.connect(GLOBAL.config.connectionString);

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.register('.ejs', require ('ejs'));
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  console.log('development');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  console.log('production');
});

// Variables and functions available from templates
app.helpers({
  socketConnectionString: GLOBAL.config.socketConnectionString
});

app.get('/', routes.admin);
app.get('/admin',routes.admin);
app.get('/view1',routes.view1);
app.get('/view2',routes.view2);
app.get('/view3',routes.view3);
app.get('/view4',routes.view4);
app.get('/view5',routes.view5);
app.get('/view6',routes.view6);
app.get('/getDataInJson',routes.getDataToTable);

app.get('/page1',routes.page1);
app.get('/page2',routes.page2);

var port = GLOBAL.config.port;

app.listen(port, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  console.log("http://127.0.0.1:"+app.address().port);
});

require('./socketApp.js')(app); //The entry point to the socketApp

