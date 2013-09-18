var models = require('../models/models.js')

exports.index = function(req, res){
  res.render('user', { title: 'userPage' })
};

exports.admin = function(req, res){
  res.render('admin', { title: 'Admin' })
};

exports.view1 = function(req, res){
  res.render('view1', { title: 'view1' })
};

exports.view2 = function(req, res){    
    res.render('view2', { title: 'view2'})
};

//TODO: this must be lazy
//It's a data about sessions,users, etc. for Retro mode.
exports.getDataToTable=function(req,res){
    var newObj=[];
    var timeout;
  models.User.find({},function(err,users){
      for(var u in users){
          for (var s in users[u].sessions){
              for(var ua in users[u].sessions[s].urlActions){
                  var id=users[u].sessions[s].urlActions[ua];
                  (function(u,s,id,idUrlAct,arr,users){
                  models.UrlAction.findById(idUrlAct,function(err,urlAct){
                    if(!urlAct) return;
                      
                      var obj={};
                          obj.ip=users[u]._id;
                          obj.sessionId=users[u].sessions[s]._id;
                          obj.urlActionId=urlAct._id;
                          if(urlAct.actions.length!=0)
                            obj.startTime=urlAct.actions[0].date;
                          obj.browser=urlAct.browser;
                          obj.url=urlAct.url;
                          obj.resolutionW=urlAct.resolutionW;
                          obj.resolutionH=urlAct.resolutionH;
                          obj.actionsCount=urlAct.actions.length;
                          newObj.push(obj);
                      
                      //arr[id]=urlAct;
                      clearTimeout(timeout);
                      timeout=setTimeout(function(){
                          
                          //console.log(require('sys').inspect(newObj));
                          res.send(newObj);
                      },1000);
                  });
                  })(u,s,ua,id,users[u].sessions[s].urlActions,users);
              }
          }
      }
  });
  console.log('smth get');
};

exports.view3 = function(req, res){
  res.render('view3', { title: 'view3' })
};

exports.view4 = function(req, res){
  res.render('view4', { title: 'view4'})
};

exports.view5 = function(req, res){
  res.render('view5', { title: 'view5'})
};

exports.view6 = function(req, res){
  res.render('view6', { title: 'view6'})
};

exports.page1 = function(req, res){
  res.render('page1', { title: 'page1', })
};

exports.page2 = function(req, res){
  res.render('page2', { title: 'page2', })
};