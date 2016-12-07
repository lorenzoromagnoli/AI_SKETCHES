var age, race, gender;



Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90,
    upload_name: 'userPhoto'
});

Webcam.attach('#my_camera');

function take_snapshot() {
    // take snapshot and get image data
    Webcam.snap(function(data_uri) {
        Webcam.upload(data_uri, '/api/photo', function(code, text) {
            // Upload complete!
            // 'code' will be the HTTP response code from the server, e.g. 200
            // 'text' will be the raw response content
            console.log(text);
            playSound(text);
            //var obj=JSON.parse(text);
            // //var p=obj[0].attribute;
            // faces=obj.length;
            // age=p.age.value;
            // race=p.race.value;
            // gender=p.gender.value;
            // //console.log(p.age.value);
            // //console.log(p.race.value);
            // //console.log(p.gender.value);
            // $('.faces').html(faces.toString());
            // $('.age').html(age.toString());
            // $('.gender').html(gender);
            // $('.race').html(race);
            // $('#response').html(text)
        });

        // display results in page
        document.getElementById('results').innerHTML =
            '<img src="' + data_uri + '"/>';
    });


}

function playSound(url) {
    console.log(url)

    //load the audio file for tofu
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', url);
    audioElement.setAttribute('autoplay', 'autoplay');
    audioElement.load()
    console.log('loading that wonderful food')

    audioElement.addEventListener("load", function() {
        audioElement.play();
        console.log('playing that wonderful food')
    }, true);
}
