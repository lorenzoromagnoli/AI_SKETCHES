var express = require('express');
var multer = require('multer');
var fs = require('fs');


var vision = require('@google-cloud/vision')({
    projectId: 'image-to-recipe',
    keyFilename: 'auth/Image_to_recipe_f07606bd92d1.json'
});


var request = require("request");


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

// vision.detectFaces('./public/uploads/portrait.jpg', function(err, faces) {
//   //console.log(faces);
// });


var fpp = require('face-plus-plus');
fs = require('fs');
fpp.setServer('cn');
fpp.setApiKey('0ef14fa726ce34d820c5a44e57fef470');
fpp.setApiSecret('4Y9YXOMSDvqu1Ompn9NSpNwWQFHs1hYD');



var readFood = function(callback) {

    vision.detectLabels('./public/uploads/userPhoto.jpg', {
        verbose: true
    }, function(err, labels) {
        //console.log(labels);
        var desc = labels[0].desc;
        //console.log(desc);
        callback(desc);
    });

}

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
                console.log(res.face.length);
                callback(JSON.stringify(res.face));
            } catch (e) {
                console.log("there is no face");
                console.log(e);
                callback("there is no face");
            }
        }

    });
}


var getId = function(key, callback) {

    var options = {
        method: 'GET',
        url: 'http://www.freesound.org/apiv2/search/text/',
        qs: {
            query: key
        },
        headers: {
            authorization: 'Token 9bE1W4G33uOMoCJGQE4ilrbXY1GXhP4vkvCavVnR'
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        //var id=body.results[0].id;
        var result = JSON.parse(body);
        //console.log(result);

        var seed = Math.floor(Math.random() * result.results.length);
        var id = result.results[seed].id;
        callback(id);

        //console.log(id);
    });

}

var getSound = function(id, callback) {

    var options = {
        method: 'GET',
        url: 'http://www.freesound.org/apiv2/sounds/' + id + '/',
        headers: {
            'postman-token': '8276026c-6f2c-b0b4-fe22-6e94449c3801',
            'cache-control': 'no-cache',
            authorization: 'Token 9bE1W4G33uOMoCJGQE4ilrbXY1GXhP4vkvCavVnR'
        }
    };

    request(options, function(error, response, body) {
        if (error) throw new Error(error);
        var result = JSON.parse(body);
        var prev = result.previews['preview-lq-ogg'];
        //console.log(prev);
        callback(prev);
    });

}



app.post('/api/photo', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
            console.log(err);
        } else {
            readFood(function(label) {
                console.log("what you see is ",label);
                getId(label, function(soundId) {
                    console.log("the id is ",soundId);
                    getSound(soundId, function(soundPrev) {
                        console.log("Here you can hear the sound", soundPrev);
                        res.end(soundPrev);
                    });
                });
            });
        }
    });
});
