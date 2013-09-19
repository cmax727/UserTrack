var config = {}

module.exports = function(env){
  //mongoose.connect('mongodb://localhost/heatmap');
  
  config.screenshotsPath=__dirname+ "/public/screenshots/";
  config.shortScreenshotsPath="/screenshots/";
  config.port=8080;
  config.wkhtmltoimgPath=__dirname+"/utilities/wkhtmltoimage-amd64";
  config.phantomPath=__dirname+'/utilities/phantomjs64/bin/phantomjs';
  config.phantomCookiePath=__dirname+'/utilities/phantomjs64/bin/cookies.txt';
    
  if(env=='development'){
    //config.wkhtmltoimgPath=__dirname+"/utilities/wkhtmltoimage";
    config.connectionString='mongodb://mounir:mounir@ds033457.mongolab.com:33457/moomap';
    config.socketConnectionString='http://localhost';  //Connections string in the userscript
    //config.phantomPath=__dirname+'/utilities/phantomjs86/bin/phantomjs';
    //config.phantomCookiePath=__dirname+'/utilities/phantomjs86/bin/cookies.txt';
  }
  
  else if(env=='production'){
    config.connectionString='mongodb://mounir:mounir@ds033457.mongolab.com:33457/moomap';
    config.socketConnectionString='http://hmapp-mstrig.dotcloud.com/'; //Connections string in the userscript
    
  }
  else{
    throw new Error('no env set');
  }
  
  return config;
};