/*Utilites module*/

var exec = require('child_process').exec;
var phantomScript=require('./phantomScript.js');
var models = require('../models/models.js');

var Utilities = function() {}

//Makes a screenshot of a webpage
Utilities.prototype.htmlToImg = function(href, width, height, outputName, ext, cb) {
  var execString = "'" + GLOBAL.config.wkhtmltoimgPath + "'";
  //if (isJSdisabled) execString += " --disable-javascript ";
  execString += ' --cookie wkhtml \'f\' '; //--javascript-delay 2000 ';
  execString += " --disable-smart-width " /*--zoom 1 --quality " + quality*/
  + " --height " + height + " --width " + width + " " + href + " " + GLOBAL.config.screenshotsPath + outputName + "." + ext;

    //====== recalc for windows
    execString = "\"" + GLOBAL.config.wkhtmltoimgPath + "\"";
    //if (isJSdisabled) execString += " --disable-javascript ";
    execString += ' --cookie wkhtml -f '; //--javascript-delay 2000 ';
    execString += " --disable-smart-width " /*--zoom 1 --quality " + quality*/
        + " --height " + height + " --width " + width + " " + href + " " + GLOBAL.config.screenshotsPath + outputName + "." + ext;

  console.log(execString);

  exec(execString, function(err, stdout, stderr) {
    console.log('htmlToImg error: ' + err);
    cb();
  });
}

//Get webpages left margin that changes while page resizing
Utilities.prototype.getLeftMargin=function(url,resW,cb) {
  models.SiteInfo.findOne({_id: url}, function(err, siteInfo) {
    if (siteInfo) { // If there is a record in db already
      var leftMargin = (resW - siteInfo.centralWidth) / 2;
      if(!leftMargin) leftMargin=0;
      cb(leftMargin);
    }
    else { // else we need to find the fixed size element using phantomScript
      phantomScript(url, function(elWidth) {

          var info = new models.SiteInfo({_id: url,centralWidth: elWidth });
        var leftMargin = (resW - elWidth) / 2;
        if(!leftMargin) leftMargin=0;
        info.save();
        cb(leftMargin);
      });
    }
  });
}

module.exports = Utilities;