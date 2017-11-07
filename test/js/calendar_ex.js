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
  window.setTimeout(checkAuth,100);
}

/* API function to check whether the app is authorized. */
function checkAuth() {
  console.log("Inside checkAuth ...");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
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
          gapi.client.load('calendar', 'v3', function(){
            console.log("Calendar library loaded.");
          });
    } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
}


/* Event handler that deals with clicking on the Authorize button.*/
function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false},
                        handleAuthResult);
    return false;
}
