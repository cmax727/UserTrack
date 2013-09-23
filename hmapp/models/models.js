/* Mongodb models file */

var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var userSchema = new mongoose.Schema({
    _id : String,
    sessions: [sessionSchema]
});

var sessionSchema = new Schema({
    urlActions: [ObjectId]
});

// Every time user opens a new page new urlAction is created
var urlActionsSchema = new Schema({
    url: String,
    browser: String,
    resolutionW:Number,
    resolutionH:Number,
    actions: [actionSchema]
});

var actionSchema = new Schema({
    _id:String,
    type: String,
    x:Number,
    y:Number,
    key:Number,
    date : {type: Date, default: Date.now}
});

// Site infos. It is need to list available urls to track. 
// Another usage is: centralWidth value is used to convert coordinates in different resolutions
var siteInfoSchema = new Schema({
  _id:String,
  centralWidth:Number
});

exports.User=mongoose.model('User', userSchema);
exports.Session=mongoose.model('Session',sessionSchema);
exports.UrlAction=mongoose.model('UrlAction',urlActionsSchema);
exports.Action=mongoose.model('Action',actionSchema);
exports.SiteInfo=mongoose.model('SiteInfo',siteInfoSchema);