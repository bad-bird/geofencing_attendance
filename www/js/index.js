
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    
    onDeviceReady: function() {
        this.receivedEvent('employee');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.employee_module');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);



        var monthly_attendance = [1,2,3,4]; //1st, 2nd, 3rd, 4th
        var element = document.getElementById('trainer_attendance_calendar');
        var settings = {type: 'attendance'};
        caleandar(element, monthly_attendance, settings);

        document.getElementById('markTrainerAttendance').addEventListener('click', markTrainerAttendance);

        function degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
        }

        function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
            var earthRadiusKm = 6371;

            var dLat = degreesToRadians(lat2-lat1);
            var dLon = degreesToRadians(lon2-lon1);

            lat1 = degreesToRadians(lat1);
            lat2 = degreesToRadians(lat2);

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            return earthRadiusKm * c;
        }

        function markTrainerAttendance() {
            // Training Location Coordinates
            var trainingLoc_lat = 17.48;
            var trainingLoc_lon = 78.37;

            var onSuccess = function(position) {
                console.log('Latitude: '          + position.coords.latitude          + '\n' +
                    'Longitude: '         + position.coords.longitude         + '\n' +
                    'Altitude: '          + position.coords.altitude          + '\n' +
                    'Accuracy: '          + position.coords.accuracy          + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                    'Heading: '           + position.coords.heading           + '\n' +
                    'Speed: '             + position.coords.speed             + '\n' +
                    'Timestamp: '         + position.timestamp                + '\n');

                var difference = distanceInKmBetweenEarthCoordinates(trainingLoc_lat, trainingLoc_lon, position.coords.latitude, position.coords.longitude);
                if(difference > 1000) {
                    alert('You are not in your current Training Location.');
                }
                else {
                    alert("Your attendance is marked.");
                    var parentElement = document.getElementById('trainer_attendance_calendar');
                    var todayElement = parentElement.querySelector('.today .cld-number');
                    todayElement.className += " presentDay";
                }
            };



            var onError = function(error) {
                switch(error.code) {
                    case 1:
                    alert("Please turn on your location to mark attendance.")
                    break;
                    case 2:
                    alert("Please make sure your device has Network connectivity.")
                    case 3:
                    alert("Request timeout. Please try again.")
                }
            };

            var options = {enableHighAccuracy: true};

            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        }

    }
};

app.initialize();

