function initMap() {
    var uluru = { lat: 46.878619, lng: -96.785535 };
    window.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: uluru
    });
}

function handleFiles(files) {
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
    markMap(lines);
}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}

function markMap(results) {
    for (var i = 0; i < results.length; i++) {
        var latitude = results[i][0];
        var longitude = results[i][1];
        var lux = parseInt(results[i][2]);
        var latLng = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
            position: latLng,
            icon: getCircle(lux),
            map: window.map
        });
    }
}

function getCircle(lux) {
    if (lux > 100000) {
        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            strokeColor: '#ff00bf',
            fillColor: '#ff00bf',
            fillOpacity: 1,
            strokeWeight: 1
        }
    }
    else if (lux > 80000) {
        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            strokeColor: '#ff0000',
            fillColor: '#ff0000',
            fillOpacity: 1,
            strokeWeight: 1
        }
    }
    else if (lux > 60000) {
        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            strokeColor: '#ff8300',
            fillColor: '#ff8300',
            fillOpacity: 1,
            strokeWeight: 1
        }
    }
    else if (lux > 40000) {
        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            strokeColor: '#ffe100',
            fillColor: '#ffe100',
            fillOpacity: 1,
            strokeWeight: 1
        }
    }
    else if (lux > 20000) {
        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            strokeColor: '#d0ff00',
            fillColor: '#d0ff00',
            fillOpacity: 1,
            strokeWeight: 1
        }
    }
    else {
        var circle = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            strokeColor: '#6aff00',
            fillColor: '#6aff00',
            fillOpacity: 1,
            strokeWeight: 1
        }
    }

    return circle;
}