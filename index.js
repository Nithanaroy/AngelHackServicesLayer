var http = require('http'),
    express = require('express'),
    session = require('./routes/sessions');
    var busboy = require('connect-busboy');

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(busboy()); 

app.get('/', function(req, res){
   res.send('Let\'s create some awesome product experience'); 
});

app.get('/sessions', session.findByUser);
app.post('/sessions/:id', session.findById);
app.put('/sessions/:id/*', session.updateSession);
app.post('/sessions', session.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server just started its ride! ' + app.get('port'));
});
