// Xiujun's code 2011-07-04
// when we load the page, we then add the script element, first.
// then call checkLocalSite() to see if the element has loaded.
function scriptLoader() {
	var scr=document.createElement('script');
	scr.id = "_site_js";
	var theSrc = 'http://'+document.domain+'/site.'+document.domain+'.js';
	scr.setAttribute('src', theSrc);
	scr.setAttribute('type','text/javascript');
	scr.setAttribute('language','JavaScript');

	var scriptTag = document.getElementsByTagName('script')[0]; 
	scriptTag.parentNode.insertBefore(scr, scriptTag);
	timeOutID = setTimeout("checkLocalSite()", 200);
}

scriptLoader();
// this function will check to make sure that the site.localhost.js has loaded.
function checkLocalSite() {
		var _url = 'http://'+document.domain+'/site.'+document.domain+'.js';
		var obj = document.getElementById("_site_js");
		
		if(obj) {
			try {
				if(obj.src == _url) {
					timeOutID = setTimeout("checkGALoaded()", 200);
				}
			}
			catch(e) {
				timeOutID = setTimeout("checkLocalSite()", 200);
			}
		}
		else {
			timeOutID = setTimeout("checkLocalSite()", 200);	
		}
}

// then we'll then make sure that the ga.js has loaded.
// from there we instigate the PSTRK() call. Since we know it's all loaded.
function checkGALoaded() {
		var _url = 'http://'+document.domain+'/ga.js';
		var obj = document.getElementById("_site_ga");
		if(obj) {
			try {
				if(obj.src == _url) {
					pstrk = new PSTRK();
				}
			}
			catch(e) {
				timeOutID = setTimeout("checkGALoaded()", 200);
			}
		}
		else {
			timeOutID = setTimeout("checkGALoaded()", 200);	
		}
}

function PSTRK(){
function trkA(){
	var sCKN=(sDTy.search('net|fr')!=-1)?'netpromo':'promo';
	var sPCD=getCK(sCKN);
	var cd=null;
	if (dt.referrer&&(sPCD.search(/psi.*(google|yahoo|msn|ask|seoother)/gi)>-1||sPCD=='')){
	var aSEs=['google-q-g','yahoo-p-y','bing-q-b','yandex-text-x'];
	var aCys=['us','uk','de','es','fr','ca','it','ru','ua','be','mx','ar','br','no','nl','fi','co','au','sk','ro','pt','hu','dk','cz','cl','ve','si','se','pl','pe','nz'];
	var aCyKws = new Array();
	aCyKws[0]=['free poker','play poker','online poker'];
	aCyKws[1]=['free poker','online poker','play poker'];
	aCyKws[2]=['pocker','poker download','poker regeln'];
	aCyKws[3]=['gratis poker','internet poker','poker online'];
	aCyKws[4]=['au jouer poker','poker en ligne','poker gratuity'];
	aCyKws[5]=['online poker','play poker','free online poker'];
	aCyKws[6]=['online poker','poker download','poker online'];
	aCyKws[7]=['online poker','poker download','poker online'];
	aCyKws[8]=['online poker','poker download','poker online'];
	aCyKws[9]=['jouer poker','jeu poker','poker en ligne gratuity'];
	aCyKws[10]=['poker download','descargar poker','poker online'];
	aCyKws[11]=['download poker','descargar poker','jugar poker'];
	aCyKws[12]=['jogo de poker online','descargar poker','jogar poker'];
	aCyKws[13]=['gratis poker spill','texas holdem','poker regler'];
	aCyKws[14]=['gratis pokeren','pokeren','online poker'];
	aCyKws[15]=['pokeri pelit','texas holdem','ilmainen pokeri'];
	aCyKws[16]=['download poker','poker gratis','poker online'];
	aCyKws[17]=['poker online','free poker','free online poker'];
	aCyKws[18]=['poker online','hrat poker','pokerovy turnaj'];
	aCyKws[19]=['softver poker','turneu poker','joc de poker'];
	aCyKws[20]=['jogo de poker online','poker on line','regras poker'];
	aCyKws[21]=['ingyen poker','póker','online poker'];
	aCyKws[22]=['poker gratis','gratis poker','poker spil'];
	aCyKws[23]=['poker zdarma','pokerová herna','internet poker'];
	aCyKws[24]=['descargar poker','gratis poker','jugar poker'];
	aCyKws[25]=['descargar poker','download poker','poker online'];
	aCyKws[26]=['brezplacni poker','poker stran','poker pravila'];
	aCyKws[27]=['pokerturnering','gratis online poker','gratisturnering'];
	aCyKws[28]=['zasady gry w pokera','gry w pokera','texas holdem'];
	aCyKws[29]=['download poker','poker online','descargar poker'];
	aCyKws[30]=['online poker','poker online','free poker'];
	var ref=dt.referrer.toLowerCase().replace(/http:\/\/|https:\/\//,'');
	var refDn=ref.substring(0,ref.indexOf('/'));
	var bSEO,se,sCy,iCy,iKw,rSE;
	for (s=0; s<aSEs.length; s++){
		bSEO=false; se=aSEs[s].split('-');
		var rRefKw=new RegExp('\\b'+se[1]+'=.*','gi');
		if (refDn.indexOf(se[0])!=-1 && ref.search(rRefKw)>-1){
			sSE=se[2]; sRefMatch=ref.match(rRefKw);
			refKW=(sRefMatch[0].split('&'))[0].replace(se[1]+'=','').replace(/%20|\+/g,' ');
			if (refDn.search(/.google.com$|^search.yahoo.com|bing.com/gi)>-1 ){
				sCy='us'; iCy=0; bSEO=true;
			} else {
				for (i=0; i<aCys.length; i++){
					rSE=getSERX(sSE,true,aCys[i]);
					if (rSE && refDn.search(rSE)>-1){
					sCy=aCys[i]; iCy=i; bSEO=true;
					break;}
				}
			}
			if (!bSEO){
				rSE=getSERX(sSE,false,'');
				if (rSE && refDn.search(rSE)>-1){
				sCy='00'; iKw='0'; bSEO=true;
				}
			}
			if (bSEO){
				if (sCy!='00'){
					aCyKws[iCy].splice(0,0,'poker.*star','^poker$');
					aCyKws[iCy].splice(5,0,'.*');
					for (i=0; i<aCyKws[iCy].length; i++){
						var rKW=new RegExp(aCyKws[iCy][i],'gi'); 
						if (rKW && refKW.search(rKW)>-1){
						iKw=i+1;break;
						} 
					}
				}
				
			var lid;
			switch(sLID){
			case 'francais':lid='fr';break;
			case 'italiano':lid='it';break;
			case '':lid='00';break;
			default:lid=sLID;
			}

			cd='psio'+sSE+sCy+iKw+((typeof SiteID!='undefined')?SiteID:'000')+lid;
			break;
			}
		}
	}
	if (!bSEO){
		var aSMDnCds=["facebook","youtube","twitter","pokerpages"];
		for (var i=0,il=aSMDnCds.length;i<il;i++){
			if (refDn.indexOf(aSMDnCds[i]+'.')!=-1){
			cd="psi"+((sDTy.search('net')!=-1)?"net":"")+aSMDnCds[i];
			break;
			}
		}
	}
	if (cd) setCK(sCKN,cd,730,'/');
	}
	sPCD=getCK(sCKN);
	if (sPCD!='') _gaq.push([g[2],1,'AffCode',sPCD,1]);
}
function getSERX(sSE,CyListed,sCyID){
var rSE;
	switch(sSE){
	case 'g':rSE=(CyListed)?(new RegExp('google.*'+'\.'+sCyID+'$','gi')):(new RegExp('google\..*','gi'));break;
	case 'y':rSE=(CyListed)?(new RegExp(sCyID+'.search.yahoo.com','gi')):(new RegExp('\.search.yahoo.com','gi'));break;
	case 'x':rSE=(CyListed)?(new RegExp('yandex.*'+sCyID+'$','gi')):(new RegExp('yandex\..*','gi'));break;
	}
	return rSE;
}
function setCKUT(ut){
	_gaq.push([g[2],2,'UserType',ut,1]);
}
function segV(){
	if (pt){
	sVG=pt._getVisitorCustomVar(2);
	if (typeof sVG =='undefined') setCKUT('A');
	if (sVG=='A') setCKUT('B');
	var UID=getCK(aS[2]);
	if ((UID==1||UID==5)&&(sVG<'D')) setCKUT('D');
	if (((UID==4)||((UID>=1236)&&(UID<=1254))) && (sVG<'E')) setCKUT('E');
	if ((UID==8)&&(sVG<'F')) setCKUT('F');
	if ((UID==7)&&(sVG<'G')) setCKUT('G');
	}
}
function getOS(){
	var a=['Win','Mac','X11','Linux'],b=['Win','Mac','Unix','Linux'];
	for (var i=0,il=a.length;i<il;i++){
		if (navigator.appVersion.indexOf(a[i])!=-1){sOSID=b[i];break;}
	}
}
function trimUrl(url){
	var rTrimURL=new RegExp('^http://|^https://|#.*$|\\?.*$|^\s+|\s+$|'+sDn,'gi');
	var s=url.replace(rTrimURL,'').replace(/\//g,'!');
	return (s=='')?'!':s;
}
function getCK(sCKN){
	if (document.cookie.length>0){
		var iCKS=document.cookie.indexOf(sCKN+'=');
		if (iCKS!=-1){
			iCKS=iCKS+sCKN.length+1;
			var iCKE=document.cookie.indexOf(';',iCKS);
			if (iCKE==-1) iCKE=document.cookie.length;
			return unescape(document.cookie.substring(iCKS,iCKE));
		}
	}
	return '';
}
function setCK(n,v,e,p,d,s){
	var sCK=n+'='+escape(v)+'; ';
	if(e) sCK+='expires='+setExpr(e)+'; ';
	if(p) sCK+='path='+p+'; ';
	if(d) sCK+='domain='+d+'; ';
	if(s) sCK+='secure; ';
	document.cookie=sCK;
}
function setExpr(e){
    var today=new Date();
    var expr=new Date(today.getTime()+e*24*60*60*1000);
    return  expr.toGMTString();
}
function delCK(n){
	setCK(n,'',-1,'/',sDn);
}
function getLPID(){
	if (aML[iDTy]){
		var iLI=-1,il=aLs.length;
		if (sURI=='!'){sLID=aDL[iDTy];sPID=sURI;
		} else {
			var sFD=sURI.match(/^!\w+!?/).toString().replace(/!/g,'');
			for (i=0; i<il; i++){
				if (sFD==aLs[i]){
				iLI=i;sLID=sFD;sPID=(sURI.replace('!'+sFD,'')!='')?sURI.replace('!'+sFD,''):'!';
				break;}
			}
			if (iLI<0){sLID=aDL[iDTy];sPID=sURI;}
		}
	} else {
		sLID='';sPID=sURI;
	}
}
function sendTag(sTTy,sPTo,sOID,bF){
	var sTTag='',sLP=((sLID!='')?sLID+'/':'')+sPID+'/';
	switch(sTTy){
		case 'D':case 'T':sTTag='/PSTRK/'+sTTy+'/'+sLP+((sTTy=='D')?sOID:sPTo);_gaq.push([g[0],sTTag]);break;
		case 'C':sET=(bF)?'FlashCTR':'AnchorCTR';sTTag=sLP+sPTo;_gaq.push([g[1],sET,sTTag,sOID]);break;
		default:sET=sTTy;sTTag=sLP+sPTo;_gaq.push([g[1],sET,sTTag,sOID]);
	}
	if ((typeof GWOVars !='undefined') &&(GWOVars[0].search(sTTy)>-1)) sendGoal();
	if (sTTy=='D' && typeof convUrl !='undefined') setTimeout(setConvFrame,1500);
}
function sendGoal() {
	try {
	var gwoTracker=_gat._getTracker(GWOVars[1]);
	gwoTracker._trackPageview('/'+GWOVars[2]+'/goal');
	}catch(err){}
}
function trkFlash(sTTy,sPTo,sOID){
	sendTag(sTTy,sPTo,sOID,1);
	if (aSVs[0]&&(sTTy=='D')&&(sVG<'C')) setCKUT('C');
	if (sTTy=='D'){
		if (typeof sVID !='undefined' && sVID!="") setCK("vid",sVID,730,'/');
		if (aSVs[3]!='') window.location=aSVs[3];
		if ((aSVs[4]!='')&&(sPID.search(rDLP)<0)) rdtDL();
	}
}
function trkLink(link){
	var sTTy='',sPTo='',sOID='',sLHr=link.href;
	var sLIH=link.innerHTML.replace(/^\s+|\s+$/g,'');
	var sLHr=(sLHr.search(/^#/)<0)?sLHr:sURL;

	sTTy=((sLHr.search(rCExt)>0))?'D':((sLHr.search(rTN)>=0)?'T':'C');
	sPTo=(sTTy=='C')?trimUrl(sLHr):((sTTy=='T')?sLHr.replace(rTN,''):'');
	sOID=(sLIH.search(/^<img\s/i)>=0)?trimUrl(link.getElementsByTagName('img')[0].src):escape(sLIH.replace(/<[^<>]+>/g,'').substring(0,30));

	if (aSVs[0]&&(sTTy=='D')&&(sVG<'C')) setCKUT('C');
	sendTag(sTTy,sPTo,sOID,0);
	
	if ((sTTy=='D')&&(sPID.search(rDLP)<0)){
		if (typeof sVID !='undefined' && sVID!="") setCK("vid",sVID,730,'/');
		if (sOSID=='Mac' && sDTy!='ee') link.href=sLHr.replace(/\.exe/,'.pkg.zip'); 
		if (aSVs[4]!='') rdtDL();
	}
}
function rdtDL(){
	(aSVs[5]==0)?setTimeout("window.location='"+aSVs[4]+"'",2500):setTimeout("window.open('"+aSVs[4]+"')",2500);
}
function setRA(a){
var b=a.getAttribute('rel');
if ((/external/ig).test(b)) a.setAttribute('target','_blank');
}
function setLA(){
var dl=dt.links;
	for (var i=0,il=dl.length;i<il;i++){
		if ((!dl[i].onclick)||(dl[i].href.search(rCExt)>0)){
		dl[i].onclick=function(){trkLink(this);}
		}
		setRA(dl[i]);
	}
}
function getSVs(){
	aSVs[0]=aSegV[iDTy];aSVs[1]=aML[iDTy];aSVs[2]=aDL[iDTy];
	aSVs[3]='http://'+sDn+'/PokerStarsInstall'+aCTy[iDTy]+'.exe';
	aSVs[4]=(iDTy<7)?'http://'+sDn+'/'+((sLID==aDL[iDTy]||sLID=='')?'':sLID+'/')+'poker/download/':'';
	aSVs[5]=0;
	if (typeof strLocalDLUrl != 'undefined') aSVs[3]=strLocalDLUrl;
	if (typeof strLocalDest != 'undefined') aSVs[4]=strLocalDest;
	if (typeof LocalVars !='undefined'){
		for (var i=0,il=LocalVars.length;i<il;i++){
		aSVs[i+3]=LocalVars[i];
		}
	}
	if (sOSID=='Mac' && sDTy!='ee'){
	aSVs[3]=aSVs[3].replace(/\.exe/,'.pkg.zip');
	aSVs[4]=(aSVs[4]!='')?aSVs[4]+'mac/':'';
	}
	if (aML[iDTy]&&sLID==aDL[iDTy]) sGTag.push('/'+sLID+dt.location.pathname);
}
function getSG(){
	var rDn=new RegExp();
	for (var i=0,il=aRxDns.length;i<il;i++){
		rDn=(i<7)?RegExp(aS[1]+aRxDns[i],'i'):RegExp(aRxDns[i],'i');
		if (sDn.search(rDn)!=-1){
		iDTy=i;sDTy=aDTy[i];
		break;
		}
	}
}
function setGA(){
	_gaq.push(['_setLocalRemoteServerMode']);
	_gaq.push(function(){pt=_gat._getTracker(AccID);});
	_gaq.push(['_initData']);
}
function setConvFrame() {
	var convTag = document.createElement("div");
	convTag.innerHTML = '<iframe src="'+convUrl+'" style="display:none;border:none;width:1px;height:1px;" marginheight="0" marginwidth="0" frameborder="0"></iframe>';
	var fstDivTag = document.getElementsByTagName('div')[0]; 
	fstDivTag.parentNode.insertBefore(convTag, fstDivTag);
}
function setVID() {
	var bGACK = (getCK("__utma")!="") && (getCK("__utmc")!="");
	if(bGACK) {
		var aUTMA=getCK("__utma").split(".");
		sVID=aUTMA[1]+"."+aUTMA[5];
		if (typeof sVID !='undefined' && sVID!=""){
		_gaq.push([g[2],5,'vid',sVID,1]);
		setCK("vid","X."+sVID,730,'/');
		}
	}
}
function init(){
	setGA();
	getSG();
	getLPID();
	getOS();
	getSVs();
	setLA();
	trkA();
	if (aSVs[0]) segV();
	_gaq.push(function() {setVID();});
	_gaq.push(sGTag);
	delCK(aS[2]);
	delCK('gcl_id');
}
//Global Vars
var aLs=['bg','br','cz','da','de','ee','en','es','et','fi','fr','francais','gr','hr','hu','is','it','italiano','lt','lv','nl','no','pl','ro','ru','se','si','ua','uk','vn','zhs','zht'];
var aS=['\.pokerstars\.','^www\.pokerstars\.','__tempUTMID'],g=['_trackPageview','_trackEvent','_setCustomVar','_addOrganic'];
var aRxDns=['com','net','(bg|cz|es|hu|nl|pl|pt|si|se)','(de|fi|jp|tw)','it','fr','ee',aS[0]+'com',aS[0]+'net','.*'];
var aDTy=['com','net','coms','nets','it','fr','ee','subcom','subnet','other'],aCTy=['','PM','','PM','IT','FR','EE','','PM',''];
var aSegV=[1,0,0,0,0,0,0,0,0,0],aML=[1,1,0,0,1,1,1,0,0,0],aDL=['en','en','','','it','fr','ee','','',''];var rTN=new RegExp('^pokerstars://tournament/','gi');
var rCExt=new RegExp('pokerstarsinstall(.*)(\.exe|\.pkg\.zip|net\.dmg)','gi'); var rDLP=new RegExp('^!poker(!|!free-)download!($|mac!$)','i');
var dt=document,sURL=dt.URL.toLowerCase(),sDn=dt.domain.toLowerCase(),sURI=trimUrl(sURL),aSVs=[],sGTag=[g[0]],iDTy='',sDTy='',sOSID='',sLID='',sPID='',sVG,pt,sVID;
this.trkFlash=trkFlash;
init();
}