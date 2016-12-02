Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
});

Webcam.attach('#my_camera');

function take_snapshot() {
    // take snapshot and get image data
    Webcam.snap(function(data_uri) {
        Webcam.upload(data_uri, 'localhost:3000', function(code, text) {
            // Upload complete!
            // 'code' will be the HTTP response code from the server, e.g. 200
            // 'text' will be the raw response content
        });

        // display results in page
        document.getElementById('results').innerHTML =
            '<img src="' + data_uri + '"/>';
    });


}
