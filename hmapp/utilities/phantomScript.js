/* Script module determining fixed part of a page. */
/* Passes this part's size in callback if the page changes it's left and right margins while resizing it*/
/* Passes nothing if the page changes only the right margin */
/* The algorithm builds the DOM path from the 'body' element to the deepest in two different resolutions  */
/* Then it compares these paths from the deepest, finds the first two elements that differ in size   */
/* The previous element to these is fixed in size in different resolutions. bingo */
/* This value is used to convert coordinates in different resolutions */

var phantom = require('phantom');
var result;

module.exports = function(url,cb) {  
  
  //Two different resolutions (widths)
  var resW=1366;
  var resW2=1600;
  var resH=768;

  //phantom.create({binary:GLOBAL.config.phantomPath}, '--phantomPath='+GLOBAL.config.phantomPath,'--cookies-file='+GLOBAL.config.phantomCookiePath,function(ph) {
  phantom.create({binary:GLOBAL.config.phantomPath}, '--cookies-file='+GLOBAL.config.phantomCookiePath,function(ph) {
    ph.createPage(function(page) {
      page.set('viewportSize', {width: resW,height: resH});
      page.set('onConsoleMessage', function (msg) {console.log('eval mess: ' + msg);});
      page.open(url, function(status) {
        //Build arrays for the first res
        page.evaluate(buildDOMHierachy, function(domHierachy1) {
          ph.createPage(function(page2) {
            page2.set('viewportSize', { width: resW2, height: resH});
            page2.open(url, function(status) {
              //Build arrays for the second res
              page2.evaluate(buildDOMHierachy, function(domHierachy2) {
                
                //Compare two different resolution arrays and find the fixed width element
                var min = domHierachy1.hierArr.length;
                if (domHierachy2.hierArr.length < domHierachy1.hierArr.length) min = domHierachy2.hierArr.length;
                
                for (var i = 0; i < min; i++) {
                  if (domHierachy1.hierArr[i] != domHierachy2.hierArr[i]) {
                    if (i == 0) throw new Error('DOM PhantomJS domHierachy can\'t be null');
                    result = i-1;
                    break;
                  }
                }

                //If the left value doesn't change, then we don't need to think about coordinates conversion 
                if(domHierachy1.leftArr[result]==domHierachy2.leftArr[result]){
                  cb();
                }
                //Else pass the unchanging element width
                else{
                  cb(domHierachy1.hierArr[result]);
                }
                
                //memory release
                page.release();
                page2.release();
                ph.exit();
              });
            });
          });
        });
      });
    });
  });
};

// Finds the deepest element in the DOM and returns the object with
// two arrays: 
// array-path with sizes of the elements in that longest DOM. This array will be used to find the biggest fixed size element
// array-path with 'left' value of the elements. This array will be used to determine if the left margin is resizing while resizing the webpage

function buildDOMHierachy() {
  console.log('cookie:'+document.cookie);
  
  var domHierachy = [];
  var domLeft = [];
  var levels = 0;
  var deepest;

  //Find deepest element
  $('body').find('*').each(function() {
    if (!this.firstChild || this.firstChild.nodeType !== 1) {
      var levelsFromThis = $(this).parentsUntil('body').length;
      if (levelsFromThis > levels) {
        levels = levelsFromThis;
        deepest = this;
      }
    }
  });

  //Build two DOM path arrays from deepest to body. One array - element widths, other - element "lefts"
  var el = $(deepest);
  domHierachy.push(el.width());
  domLeft.push(el.position().left);
  try {
    while (el.get(0).tagName != 'body') {
      el = el.parent();
      domHierachy.push(el.width());
      domLeft.push(el.position().left);
    }
  }
  catch (e) {
    console.log(e);
  }

  return {
    hierArr: domHierachy,
    leftArr: domLeft
  };
};