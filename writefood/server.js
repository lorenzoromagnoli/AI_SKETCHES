var express = require('express');
var app = express();


var language = require('@google-cloud/language')({
  projectId: 'foodProcessor',
  keyFilename: 'auth/foodProcessor-91d2941e7062.json'
});



// set the view engine to ejs

app.set('views', __dirname + '/app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/scripts', express.static(__dirname + '/node_modules/browserchannel/dist/'));
app.use('/scripts', express.static(__dirname + '/node_modules/share/webclient/'));

// public folder to store assets
app.use(express.static(__dirname + '/app'));



// routes for app
app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/(:id)', function(req, res) {
  res.render('index.html');
});

app.post('/understand', function (req, res) {
  sentence=req.query.sentence;
  console.log(sentence);
  language.annotate(sentence, callback);

  function callback(err, entities, apiResponse) {
    if (err){
      res.send(err);
      console.log(err);
    }
    else{
      res.send(entities);
    }
  }
})

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);
