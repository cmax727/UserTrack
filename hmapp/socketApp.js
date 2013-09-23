var User=require('./models/user.js');
var Admin=require('./models/admin.js');

var users = {}; //users hash {ip:userObject}
var admin; // admin object
var adminSocket;

module.exports = function(app) {
  var io = require('socket.io').listen(app);
  
  // On any connection - user or admin
  io.sockets.on('connection', function(socket) {
    var ip = socket.handshake.address.address;
    var port = socket.handshake.address.port;
    
    console.log("New connection from " + ip + ":" + port);
    
    socket.on('userConnected', function(data) {
      var user=users[ip];
      var urlId;
      
      //When user opens a page, new urlAction is created
      if(!user){ //If there is no online user with this IP
        user = new User(ip,function(){
          users[ip]=user;
          user.urlActionStarted(data.url,data.browser,data.resolutionW,data.resolutionH,function(urlID){
            urlId=urlID;
          });
        });
      }
      else{
        user.urlActionStarted(data.url, data.browser, data.resolutionW, data.resolutionH, function(urlID) {
          urlId = urlID;
        });
      }
      
      socket.on('userAction', function(action) {
        if(!urlId) return; //Have not connected yet        
        if(admin && urlId==admin.trackedUserUrlId) //if user tracked
          adminSocket.emit('userAction',action); //send action to admin screen
          
        //if watching online global heatmap
        if(admin && admin.globalTrackingType && user.userUrlActions[urlId].url==admin.url && admin.globalTrackingType==action.action){
          if(!user.userUrlActions[urlId].leftMargin){ //if there is no need in convertion send as-is
            adminSocket.emit('userAction', action);
          }
          else{ //convert coordinates
            var offset = action.x - user.userUrlActions[urlId].leftMargin;
            offset = offset + admin.leftMargin;
            var a = {
              action: action.action,
              x: offset,
              y: action.y
            }
            adminSocket.emit('userAction', a);//send
          }
        }
        
        //Saving to DB
        console.log(action);
        user.urlActionAddAction(urlId, action);
      });
      
      socket.on('disconnect', OnUserDisconnect);
      
      function OnUserDisconnect(){
        if (!user || !urlId) //If page is closed before the initialization repeat again later
          setTimeout(OnUserDisconnect,1000);
        else
          user.urlActionEnded(urlId, function() {
            user=null;
            delete users[ip];
          });
      }
      
    });
    
    socket.on('adminConnected', function() {
      admin=new Admin();
      adminSocket= socket;
      
      socket.on('adminWantsOnlineUserList', function(cb) {
        var userList = [];
        for (var i in users) {
          for(var k in users[i].userUrlActions){
            var urlact = users[i].userUrlActions[k];
      
            userList.push({
              ip: users[i].ip,
              urlId:urlact.urlId,
              url: urlact.url,
              rW: urlact.resW,
              rH: urlact.resH,
              browser: urlact.browser
            });
          }
        }
      
        cb(userList); //send to admin via cb
      });
      
      socket.on('adminWantsToTrack', function(urlId) {
        admin.trackedUserUrlId=urlId;
        admin.imageToAdmin(urlId,function(link){ //send image
          adminSocket.emit('imageToAdminSent', link);
        });
      });
      
      socket.on('adminWantsAnImage', function(urlId) {
        admin.imageToAdmin(urlId,function(link){
          adminSocket.emit('imageToAdminSent', link);
        });
      });
      
      socket.on('adminWantsToRetro', function(urlId){
        admin.startRetro(urlId,function(action){
          adminSocket.emit('userAction', action); //on every action do this
        },function(){
          adminSocket.emit('theEnd'); //When all actions are sent do that
        });
      });
      
      socket.on('adminWantsToStopRetro',function(){
        admin.stopRetro();
      });
      
      socket.on('adminWantsUrlsList', function(cb) {
        admin.getUrlsListFromSI(function(list){
          cb(list);
        });
      });
      
      socket.on('adminWantsToGlobalLiveHeatmap',function(type,url,resW,resH){
        admin.startGlobalLiveHeatmap(type,url,resW,resH,function(link){
          adminSocket.emit('imageToAdminSent', link);
        });
      });
      
      socket.on('adminWantsToRetroGlobalMoves', function(type, url, resW, resH, startDate, endDate, cb) {
        admin.startGlobalRetroHeatmap(type,url,resW,resH,startDate,endDate,function(arr,link){
          adminSocket.emit('imageToAdminSent', link);
          cb(arr);
        });
      });
      
      socket.on('disconnect', function() {
        admin=null;
        adminSocket=null;
      });
      
    });
  });
};