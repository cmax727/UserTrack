//Admin class. Contains admin values and functions for tracking 

var fs=require('fs');
var  models = require('./models.js');

var Admin = function() {
  
}

Admin.prototype = {
  trackedUserUrlId: '', //UrlActionId tracked UrlAction
  retroTimeouts : [], // Timeouts array is used to stop retro. (iterating and clearing every timeout)
  retroStopCommand : null,
  resW:'', //Resolution of admin image
  resH:'',
  url:'',
  globalTrackingType:'c', // 'c' - click, 'm' - move.
  leftMargin:'', //leftMargin of a fixed size element on admin image
  
  //Creates a link from a urlId
  imageToAdmin:function(urlId,cb){
    var link = GLOBAL.config.shortScreenshotsPath + urlId + '.jpg';
    cb(link);
  },
  
  // Starts a retro - imitating user actions (view2). cbAct - callback on every action. cbEnd - on end.
  startRetro: function(urlId,cbAct,cbEnd) {
    this.retroStopCommand=null;
    var that=this;
    models.UrlAction.findById(urlId, function(err, urlAct) {
        if(err) return;

        var firstActTime = 0;
        if ( urlAct.actions[0]) {
            firstActTime = urlAct.actions[0].date.getTime();
        } // Time of the first aciton

      
      //Counters to know when all the actions are visualized
      var counter = 0;
      var counter2 = 0;
  
      for (var a in urlAct.actions) {
        var act = urlAct.actions[a];
        var date = urlAct.actions[a].date;
        if (!date) break;
        counter++;
        var timeStamp = date.getTime(); // timestamp of the action in milliseconds
  
        var offset = timeStamp - firstActTime; // Count the interval between the first action and this action
        (function(act) {
          if (that.stopCommand) return;
          var t = setTimeout(function() { // Setting timeout. The action event will fire in the counted interval time
            if (that.stopCommand) return;
            var action = {
              action: act.type,
              x: act.x,
              y: act.y
            };
            cbAct(action); // action callback 
            counter2++;
            if (counter2 >= counter) cbEnd(); // If all actions are processed fire the cbEnd
  
          }, offset);
          that.retroTimeouts.push(t); // Push the timeout in array to be able to stop it later
        })(act);
      }
    });
  },
  
  stopRetro: function(){
    this.retroStopCommand=true;
    for(var i in this.retroTimeouts){
      clearTimeout(this.retroTimeouts[i]);
    }
  },
  
  //Get the list of urls from Site Info collection
  getUrlsListFromSI : function(cb){
    models.SiteInfo.find({}, function(err, sites) {
      cb(sites);
    });
  },
  
  // Starts the online heatmap of all users realtime (view3 - type 'm' and view4 - type 'c')
  startGlobalLiveHeatmap: function(type,url,resW,resH,cb){
    var that=this;
    
    GLOBAL.utilities.getLeftMargin(url,resW,function(value){ //Count the left margin of the fixed size element on admin image 
      that.leftMargin=value;
    });
    
    that.resW = resW;
    that.resH = resH;
    that.url = url;
    that.globalTrackingType = type; //'m' or 'c'
    
    makeAdminImage(url,resW,resH,function(newUrl){ // And in the end make and send the image to admin
      that.imageToAdmin(newUrl,function(link){cb(link);});
    });
  },
  
  // Displays retro heatmap of all users in submitted date interval (view3 - type 'm' and view4 - type 'c')
  startGlobalRetroHeatmap: function(type, url, resW, resH, startDate, endDate, cb){
    var that=this;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var query = {'actions.date': {'$gte': startDate,'$lte': endDate},'url': url,'actions.type': type};
    var arr = [];
    
        
    models.UrlAction.find(query, function(err, urlActions) {
      if (urlActions.length == 0) { cb(null); return; }
      GLOBAL.utilities.getLeftMargin(url, resW, function(value) {
        that.leftMargin = value;
              
        models.SiteInfo.findOne({ _id:url}, function(err, siteInfo) { // Needed for convertion
          for (var i in urlActions) {
            for (var k in urlActions[i].actions) {
              if (urlActions[i].actions[k].date > startDate && urlActions[i].actions[k].date < endDate && urlActions[i].actions[k].type == type) {
      
                if(!siteInfo.centralWidth) { //If webpage contains fixed size element that doesn't resize while webpages resizing
                  arr.push({x: urlActions[i].actions[k].x,y: urlActions[i].actions[k].y});
                }
                else{ //Converting coordinates
                  var userLeftMargin = (urlActions[i].resolutionW - siteInfo.centralWidth) / 2
                  var userOffset = urlActions[i].actions[k].x - userLeftMargin;
                  var offset = userOffset + that.leftMargin;
                  arr.push({x: offset,y: urlActions[i].actions[k].y});
                }
              }
      
              //If done
              if (i == urlActions.length - 1 && k == urlActions[i].actions.length - 1) {
                makeAdminImage(url, resW, resH, function(newUrl) {
                  that.imageToAdmin(newUrl, function(link) {
                    cb(arr,link);
                  });
                });
              }
            }
          }
        });
        
      });  
    });
  }
};

//Private func that creates the image for admin or gets the image from the folder if it already exists. passes the name of the file to cb
function makeAdminImage(url,resW,resH,cb){
  var that = this;
  var newUrl = url;
  while (newUrl.indexOf('/') != -1) newUrl = newUrl.replace('/', '_'); //pretty name
  newUrl = newUrl + '_' + resW + '_' + resH;
  
  fs.stat(GLOBAL.config.screenshotsPath + newUrl + '.jpg', function(err, stat) {
    if (err == null) { //if file exists
      cb(newUrl);
    }
    else {
      GLOBAL.utilities.htmlToImg(url, resW, resH, newUrl, "jpg", function() {
        cb(newUrl);
      });
    }
  });
}

module.exports = Admin;