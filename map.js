function initMap() {
    var uluru = { lat: -25.363, lng: 131.044 };
    window.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
}

function handleFiles(files) {
    console.log("in handleFiles()");
    if (window.FileReader) {
        getAsText(files[0]);
    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function getAsText(fileToRead) {
    var reader = new FileReader();
    // Read file into memory as UTF-8      
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
}

function loadHandler(event) {
    var csv = event.target.result;
    processData(csv);
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        var tarr = [];
        for (var j = 0; j < data.length; j++) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }
    console.log(lines);
    markMap(lines);
}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}

function markMap(results) {
    console.log("inMarkMaps")
    console.log(results.length)
    for (var i = 0; i < results.length; i++) {
        var latitude = results[i][0];
        var longitude = results[i][1];
        var lux = results[0][2];
        var latLng = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position: latLng,
            map: window.map
        });
    }
}