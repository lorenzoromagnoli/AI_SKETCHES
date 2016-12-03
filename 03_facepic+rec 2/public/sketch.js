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
            $('#response').html(text)
        });

        // display results in page
        document.getElementById('results').innerHTML =
            '<img src="' + data_uri + '"/>';
    });


}
