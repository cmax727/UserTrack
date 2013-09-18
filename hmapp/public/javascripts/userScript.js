function socketStart(connectionString){
  if(document.cookie.indexOf('wkhtml')!=-1) return;
 
  var tracked=false;
  var socket = io.connect(connectionString);
  
  socket.on('connect', function() {
    socket.emit('userConnected',{browser:navigator.userAgent,url:window.location.href,resolutionW:$(document).width(),resolutionH:$(document).height()});
    
    $(document).mousemove(function(e) {
        socket.emit('userAction', {
          action:'m',
          x:e.pageX,
          y:e.pageY 
        });
    });

    $(document).click(function(e) {
        socket.emit('userAction', {
          action:'c',
          x: e.pageX,
          y: e.pageY
        });
    });
    
    $(window).keydown(function(e) {
        socket.emit('userAction', {
          action:'k',
          key:e.which
        });
    });
  });
}