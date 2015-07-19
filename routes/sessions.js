var Session = require ('../models/session.js');
var exec = require('child_process').exec;
    var busboy = require('connect-busboy');


/*exports.findAll = function(req, res){

};
*/
exports.save = function(req, res){
    Session.save(req.body, handleDatabaseResponse(req, res));
};

exports.findById = function(req, res){
    console.log('I came here');
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
    res.send("Connection Pass");
};

exports.findByUser = function(req, res){
    // var url = "C:\\Users\\npasumarthy\\Documents\\Visual Studio 2013\\Projects\\AngelHack\\AngelHack\\bin\\Debug\\AngelHack.exe";
    var url = "C:\\Users\\npasumarthy\\Documents\\Projects\\AngelHackServer\\executable\\AngelHack.exe";
    url = url.replace(/ /g, '\\ ');

    exec(url, function(err, data) {
        if(err) {
            console.log("Error: ", err);
            res.status(500).send(err)
        }
        console.log("Data", data);
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
