/* User class */

var  models = require('./models.js');
var UserUrlAction = require('./userUrlAction.js');

var User = function(ip,cb) {
  this.ip=ip;
  models.User.findById(ip, function(err, u) {
    if (!u) { //If there is no user with that ip in DB
      u = new models.User({_id: ip,sessions: []});
      u.sessions.push(new models.Session({urlActions: []}));
      u.save(function(){cb();});
    }
    else cb();
  });
}

User.prototype = {
  ip:'',
  userUrlActions: {}, //UrlActions - UA created when user opens a webpage
  sessionTimeout: null, //timeOut to create new Session
    
  //When user opens the new page
  urlActionStarted: function(url,browser,resW,resH,cb){
    if (this.sessionTimeout) {clearTimeout(this.sessionTimeout);console.log('timeout cleared');} // Clears the new session timeout
    var that=this;
    var uua=new UserUrlAction(url,browser,resW,resH,function(urlId){
      
      cb(urlId); //pass the unique urlAction value immediately
      
      models.User.findById(that.ip, function(err, u) {//save new UrlAction
        u.sessions[u.sessions.length - 1].urlActions.push(urlId);
        u.markModified('sessions');
        u.save();
      });
      
      GLOBAL.utilities.htmlToImg(url, resW, resH, urlId, "jpg",function(){});//make a screenshot
      
      that.userUrlActions[urlId]=uua;
    });
  },
  
  //On every user action
  urlActionAddAction:function(urlId,action,cb){
    var a;
    if (action.key) a = new models.Action({
      type: action.action,
      key: action.key
    });
    else a = new models.Action({
      type: action.action,
      x: action.x,
      y: action.y
    });
          
    this.userUrlActions[urlId].actions.push(a);
  },
  
  //When user leaves the page
  urlActionEnded: function(urlId,cb){
    var that=this;
    
    this.userUrlActions[urlId].saveActions(function(){ //Save last time and delete the UserUrlAction from hash
      delete that.userUrlActions[urlId];
    });
    
    this.sessionTimeout = setTimeout(function() { //Set the timeout to close the session and create and new one
      if(Object.keys(that.userUrlActions).length==0){ //If it's was the last closed page - no pages of the site are opened
        models.User.findById(that.ip, function(err, u) {
          u.sessions.push(new models.Session({urlActions: []}));
          u.markModified('sessions'); //mongoose specifics
          u.save(function(){
            cb(that.ip);
          });
        });
      }
    }, 10000);
  }
  
  
};

module.exports = User;