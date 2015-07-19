var Session = require ('../models/session.js');
var exec = require('child_process').exec;

/*exports.findAll = function(req, res){

};
*/
exports.save = function(req, res){
    Session.save(req.body, handleDatabaseResponse(req, res));
};

exports.findById = function(req, res){
    Session.findById(req.params.id, handleDatabaseResponse(req, res));
};

exports.findByUser = function(req, res){
    var temp = "C:\\Users\\npasumarthy\\Documents\\Visual Studio 2013\\Projects\\AngelHack\\AngelHack\\bin\\Debug\\AngelHack.exe";
    var url = "C:\\Users\\npasumarthy\\Documents\\Projects\\AngelHackServer\\executable\\AngelHack.exe";

    exec(url, function(err, data) {
        console.log("Data", data);
        console.log("Error", err);
        res.send("Done Tanu");
    });
};

exports.updateSession = function(req, res){
    var pathElements = req.path.split('/').splice(1);
    var sessionId = pathElements[1];
    res.send(req.path);
};

var handleDatabaseResponse = function(req, res){
    return function(err, data){
        console.log(JSON.stringify(data));
        if(err){
            res.send(500, err);
        }else {
            res.json(data);
        }
    };
};
