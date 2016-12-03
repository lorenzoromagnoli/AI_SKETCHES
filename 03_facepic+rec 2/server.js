var express = require('express');
var multer = require('multer');
var fs = require('fs');

var app = express();
var server = app.listen(3000);
app.use(express.static('public'));


var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single('userPhoto');



console.log("Running");


var fpp = require('face-plus-plus');
fs = require('fs');
fpp.setServer('cn');
fpp.setApiKey('0ef14fa726ce34d820c5a44e57fef470');
fpp.setApiSecret('4Y9YXOMSDvqu1Ompn9NSpNwWQFHs1hYD');


var analyzeImage = function(callback) {

    var parameters = {
        attribute: 'gender,age',
        img: {
            value: fs.readFileSync('./public/uploads/userPhoto.jpg'),
            meta: {
                filename: 'portrait.jpg'
            }
        }
    };

    fpp.post('detection/detect', parameters, function(err, res) {
        if (err) {
            console.log('there was an error');
            console.log(err);
            callback(err);
        } else {
            console.log('thinking');
            try {
                console.log(res.face[0].attribute);
                callback(JSON.stringify(res.face[0].attribute));
            } catch (e) {
                console.log("there is no face");
                console.log(e);
                callback("there is no face");
            }
        }

    });
}


app.post('/api/photo', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
            console.log(err);
        } else {
            analyzeImage(function(returnValue){
              res.end(returnValue);
            });
        }
    });
});
