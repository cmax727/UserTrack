//UserUrlAction class - the logical unit: created when user opens new page. Contains actions,browser info,res etc.

var  models = require('./models.js');

var UserUrlAction = function(url,browser,resW,resH,cb) {
  this.url= url;this.resW=resW;this.resH=resH;this.browser= browser;
  var ua = new models.UrlAction({url: url,resolutionW: resW,resolutionH: resH,browser: browser, actions: [] });
  var that=this;
  ua.save(function(){ // When user opens new page the UrlAction with all the info is saved in DB
    // Set interval to save users actions
    that.savingActionsInterval = setInterval(function() { that.saveActions(); }, 5000); // save actions every 5 second
    that.urlId=ua._id;
    cb(ua._id); //pass the UrlId
  });
  
  //Count the left margin of the fixed size element on user webpage
  GLOBAL.utilities.getLeftMargin(url,resW,function(value){
    that.leftMargin=value;
  });
}

UserUrlAction.prototype = {
  savingActionsInterval: null,
  url:'',
  browser:'',
  resW:'',
  resH:'',
  actions:[],
  urlId:'',
  leftMargin:'',
  
  //Save user actions to db
  saveActions: function(cb) {
    if(this.actions.length==0) {if(cb) cb(); return;}
    var that=this;
    models.UrlAction.findById(that.urlId,function(err,ua){
      console.log(ua.actions.length+'|'+that.actions.length);
      ua.actions.push.apply(ua.actions, that.actions);
      console.log(ua.actions.length);
      ua.markModified('actions'); //This is needed due to mongoose specifics
      ua.save(function(){
        that.actions=[];
        if(cb) cb();
      });
    });
  }
}

module.exports = UserUrlAction;