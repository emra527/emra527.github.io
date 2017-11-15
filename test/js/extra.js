function medFunction(){
  checkMedName();
  checkMedTime();
  checkMedNumber();
  checkMedReminder();

  if(checkMedNumber() && checkMedName() && checkMedReminder() && checkMedTime()){
    window.location.href='index.html'
  }
}

function eventFunction(){
  checkEventDate();
  checkEventStartTime();
  checkEventEndTime();
  checkEventReminder();
  checkEventDescription();

  if(checkEventDate() && checkEventStartTime() && checkEventEndTime() && checkEventReminder() && checkEventDescription()){
    window.location.href='index.html'
  }
}


function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  var email = $('input[id=username]').val();
  var password = $('input[id=passWord]').val();
  if (validateEmail(email)) {
    if(password!=''){
      window.location.href='index.html'
    }
    else{
      document.getElementById('passwordError').innerText="Required";
      document.getElementById('passwordError').style.color="red";
    }
  } else {
      if(password==''){
        document.getElementById('passwordError').innerText="Required";
        document.getElementById('passwordError').style.color="red";
        document.getElementById('usernameError').innerText="Required";
        document.getElementById('usernameError').style.color="red";
        return false;
      }
      else{
        document.getElementById('usernameError').innerText="Required";
        document.getElementById('usernameError').style.color="red";
        document.getElementById('passwordError').innerText="";
        return false;
      }

  }

}
function checkEventDate(){
  if(document.getElementById('inputDate3').value=='' || !document.getElementById('inputDate3').value.length){
      document.getElementById('eventDateError').innerText="Required";
      document.getElementById('eventDateError').style.color="red";
      return false
  }
  else{
    document.getElementById('eventDateError').innerText="";
    return true
  }
}

function checkEventStartTime(){
  if(document.getElementById('timepicker1').value=='' || !document.getElementById('timepicker1').value.length){
      document.getElementById('eventTimeError').innerText="Required";
      document.getElementById('eventTimeError').style.color="red";
      return false
  }
  else{
    document.getElementById('eventTimeError').innerText="";
    return true
  }
}

function checkEventEndTime(){
  if(document.getElementById('timepicker2').value=='' || !document.getElementById('timepicker2').value.length){
      document.getElementById('eventTimeError2').innerText="Required";
      document.getElementById('eventTimeError2').style.color="red";
      return false
  }
  else{
    document.getElementById('eventTimeError2').innerText="";
    return true
  }
}

function checkEventReminder(){
  if(document.getElementById('eventReminders3').value=='' || !document.getElementById('eventReminders3').value.length){
      document.getElementById('eventReminderError').innerText="Required";
      document.getElementById('eventReminderError').style.color="red";
      return false
  }
  else{
    document.getElementById('eventReminderError').innerText="";
    return true
  }
}

function checkEventDescription(){
  if(document.getElementById('eventDescription').value=='' || !document.getElementById('eventDescription').value.length){
      document.getElementById('eventDescriptionError').innerText="Required";
      document.getElementById('eventDescriptionError').style.color="red";
      return false
  }
  else{
    document.getElementById('eventDescriptionError').innerText="";
    return true
  }
}

function checkMedNumber(){
  if(document.getElementById('amount3').value=='' || !document.getElementById('amount3').value.length){
      document.getElementById('medAmountError').innerText="Required";
      document.getElementById('medAmountError').style.color="red";
      return false
  }
  else{
    document.getElementById('medAmountError').innerText="";
    return true
  }
}

function checkMedName(){
  if(document.getElementById('nameMedicine3').value=='' || !document.getElementById('nameMedicine3').value.length){
      document.getElementById('medNameError').innerText="Required";
      document.getElementById('medNameError').style.color="red";
      return false
  }
  else{
    document.getElementById('medNameError').innerText="";
    return true
  }
}

function checkMedTime(){
  if(document.getElementById('inputTime3').value=='' || !document.getElementById('inputTime3').value.length){
      document.getElementById('medTimeError').innerText="Required";
      document.getElementById('medTimeError').style.color="red";
      return false
  }
  else{
    document.getElementById('medTimeError').innerText="";
    return true
  }

}

function checkMedReminder(){
  if(document.getElementById('reminders3').value=='' || !document.getElementById('reminders3').value.length){
      document.getElementById('medReminderError').innerText="Required";
      document.getElementById('medReminderError').style.color="red";
      return false
  }
  else{
    document.getElementById('medReminderError').innerText="";
    return true
  }
}

//$("#validate").bind("click", validate);
