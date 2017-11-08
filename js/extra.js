document.getElementById('testform').onsubmit= function(e){
     e.preventDefault();
}

$("#the-form").submit(function(){
  return false;
});
