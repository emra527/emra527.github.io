/* Filename: calendar_ex.js
Author: Eni Mustafaraj
Date: 03/02/2015
Purpose: Show how to connect to Google Calendar API and perform an
operation of event creation.
*/
/* PART 1: This part is more or less lifted as is from Google APIs documentation
and examples. I have made slight changes to the handleAuthResult function,
in order to toggle on/off the visibility of two buttons of the user interface.
*/
// Global variables, the values come from the Developer Console
// Put your OWN clientID and apiKey
var clientId = '778372626385-j7c6vomqimpqkc8l1q0vqfqcum6g2d13.apps.googleusercontent.com';
var apiKey = 'AIzaSyDsRHcDIgf0WZxvupyGyvZmtNSA6Car9ms';
var scopes = 'https://www.googleapis.com/auth/calendar';


/* Function invoked when the client javascript library is loaded */
function handleClientLoad() {
    console.log("Inside handleClientLoad ...");
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 100);
}

/* API function to check whether the app is authorized. */
function checkAuth() {
    console.log("Inside checkAuth ...");
    gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: true
        },
        handleAuthResult);
}

/* Invoked by different functions to handle the result of authentication checks.*/
var authData;

function handleAuthResult(authResult) {
    console.log("Inside handleAuthResult ...");
    authData = authResult;
    var authorizeButton = document.getElementById('authorize-button');
    var addButton = document.getElementById('addToCalendar');
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
        addButton.style.visibility = 'visible';
        //load the calendar client library
        gapi.client.load('calendar', 'v3', function() {
            console.log("Calendar library loaded.");
        });
    } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
    }
}


/* Event handler that deals with clicking on the Authorize button.*/
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: clientId,
            scope: scopes,
            immediate: false
        },
        handleAuthResult);
    return false;
}

/* End of PART 1 - Authentication Process. */

/* Start of PART 2 - dealing with events from the user interface and
performing API calls. */


var addButton = document.getElementById('addToCalendar');
addButton.onclick = function() {
    var userChoices = getUserInput();
    console.log(userChoices);
    if (userChoices)
        createEvent(userChoices);
}

//Input fields test button
var testButton = document.getElementById('testInputFields');
testButton.onclick = function() {
    var userChoices = getUserInput();
    console.log(userChoices);
    if (userChoices)
        createEvent(userChoices);
}

function getUserInput() {

    var dateStart = document.getElementById("dateStart").value;
    var dateEnd = document.getElementById("dateEnd").value;
    var timeStart = document.getElementById("timeStart").value;
    var timeEnd = document.getElementById("timeEnd").value;
    var eventDesc = document.querySelector("#event").value;

    // check input values, they should not be empty
    if (dateStart == "" || dateEnd == "" || timeStart == "" || timeEnd == "" || eventDesc == "") {
        alert("All your input fields should have a meaningful value.");
        return
    } else return {
        'dateStart': dateStart,
        'dateEnd': dateEnd,
        'startTime': timeStart,
        'endTime': timeEnd,
        'eventTitle': eventDesc
    }
}

// Make an API call to create an event.  Give feedback to user.
function createEvent(eventData) {
    var startDateString = eventData.dateStart + " " + eventData.startTime;
    var endDateString = eventData.dateEnd + " " + eventData.endTime;

    console.log(startDateString);
    console.log(endDateString);

    // First create resource that will be send to server.
    var resource = {
        "summary": eventData.eventTitle,
        "start": {
            "dateTime": new Date(startDateString).toISOString()
        },
        "end": {
            "dateTime": new Date(endDateString).toISOString()
        }
    };

    // create the request
    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': resource
    });

    // execute the request and do something with response
    request.execute(function(resp) {
        console.log(resp);
        alert(resp.message);
    });

    //Date string conversion override
    //Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    if (!Date.prototype.toISOString) {
        (function() {

            function pad(number) {
                if (number < 10) {
                    return '0' + number;
                }
                return number;
            }

            Date.prototype.toISOString = function() {
                return this.getUTCFullYear() +
                    '-' + pad(this.getUTCMonth() + 1) +
                    '-' + pad(this.getUTCDate()) +
                    'T' + pad(this.getUTCHours()) +
                    ':' + pad(this.getUTCMinutes()) +
                    ':' + pad(this.getUTCSeconds()) +
                    '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
                    'Z';
            };

        }());
    }
}
