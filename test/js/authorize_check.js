//Check to see if the app is authorized in user's Google account
var clientId = '778372626385-j7c6vomqimpqkc8l1q0vqfqcum6g2d13.apps.googleusercontent.com';
var apiKey = 'AIzaSyDsRHcDIgf0WZxvupyGyvZmtNSA6Car9ms';
var scopes = 'https://www.googleapis.com/auth/calendar';

//Load the Google API client
gapi.load('client', function() {
  console.log('gapi.client loaded.');
});

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
    //Check if app is authorized
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
        addButton.style.visibility = 'visible';
        //load the calendar client library
        gapi.client.load('calendar', 'v3', function() {
            console.log("Calendar library loaded.");
        });
    } else {
        //App is not authorized
        //Open the error dialog box
        $("#dialog").dialog("open");
    }
}

//Jquery dialog box
$(function() {
    $("#dialog-login").dialog({
        autoOpen: false,
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
            "Login using Google account": function() {
                $(this).dialog("close");
            }
        }
    });
});
