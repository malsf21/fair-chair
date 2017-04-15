/*
  Fair Chair App Javascript
  To: any readers/maintainers
  Hi there, I'm Matt, the dude who wrote the original code for this application. A fair warning: this is awfully coded. This was my attempt at blending functional programming with pure JS, which was a bad idea. I've tried my best to comment the code here so that it makes sense, but please don't kill me.
*/

// This is the main object that stores all the information used in Fair Chair. This program is designed that, theoretically, one could substitue in any form of a properly formatted "dataSettings" file and the program would work.
var dataSettings = {
  "settings":{
    "timerBehaviour": "bleed"
  },
  "committee":{

  },
  "timer": {
    "on": false,
    "seconds": 0,
    "speaker": 0
  },
  "speakers": {
    "primary": [

    ],
    "secondary": [

    ],
    "caucas": [

    ]
  }
}

// This next block is my attempt at functional, pseudo-encapsulated programming. The function names are relatively self-evident, but I'll comment important blocks of code that might not make sense.
function getTimerTime(settings){
  if (settings["timer"]["seconds"] === 0){ // If time = 0, the math doesn't work. Custom set.
    return "0:00"
  }
  else{
    var temp = settings["timer"]["seconds"]%60 // temp is the seconds portion
    if (temp < 10){
      temp = "0" + temp; // checks for 09 versus 9
    }
    return Math.floor(settings["timer"]["seconds"]/60) + ":" + temp; // settings["timer"]["seconds"]/60 is the minutes portion
  }
}
function getSpeakerTime(settings){ // refer to above code, it works very similarly
  if (settings["timer"]["speaker"] === 0){
    return "0:00"
  }
  else{
    var temp = settings["timer"]["speaker"]%60
    if (temp < 10){
      temp = "0" + temp;
    }
    return Math.floor(settings["timer"]["speaker"]/60) + ":" + temp;
  }
}
function incrementTimer(settings){
  // This is a poorly coded timer incrementer.
  if (settings["settings"]["timerBehaviour"] == "bleed"){ // the bleed timer behaviour means that if the speaker time is 0, the committee time will still tick down, and vice versa. I might add another behaviour sooner or later.
    if (settings["timer"]["seconds"] != 0){
      settings["timer"]["seconds"] = settings["timer"]["seconds"] - 1;
    }
    if (settings["timer"]["speaker"] != 0){
      settings["timer"]["speaker"] = settings["timer"]["speaker"] - 1;
    }
  }
  return settings;
}
function setTimerTime(settings, value){
  // this sets the committee timer to a specific value
  if (value === 0){ // 0 checker
    settings["timer"]["seconds"] = 0;
  }
  else{
    value = value | false // this is an optional check statement: if value doesn't exist, it means that i'm taking the input from the app. if it does, it's because i'm hard setting the value. i'll consider recoding this statement since it's poorly designed.
    if (value != false){
      settings["timer"]["seconds"] = value
    }
    else{
      var temp = $("#committee-time-input").val().split(":");
      settings["timer"]["seconds"] = 60*temp[0]+Number(temp[1]);
    }
  }
  $("#committee-time-input").val("");
  return settings;
}
function setSpeakerTime(settings, value){
  // refer to above code
  if (value === 0){
    settings["timer"]["speaker"] = 0;
  }
  else{
    value = value | false
    if (value != false){
      settings["timer"]["speaker"] = value
    }
    else{
      var temp = $("#speaker-time-input").val().split(":");
      settings["timer"]["speaker"] = 60*temp[0]+Number(temp[1]);
    }
  }
  $("#speaker-time-input").val("");
  return settings;
}
function toggleTimer(settings){
  // pauses and unpauses the timer
  settings["timer"]["on"] = !(settings["timer"]["on"]);
  return settings;
}
function renderTimers(settings){
  // renders the timers
  $("#committee-timer").html(getTimerTime(settings));
  $("#speaker-timer").html(getSpeakerTime(settings));
}
function addSpeaker(settings, list){
  // adds a speaker to the appropriate list
  speakers = settings["speakers"]
  speakers[list].push({"name": $("#input-" + list).val(), "style": "none"});
  return settings;
}
function strikeSpeaker(list, id){
  // this is one of the few non encapsulated functions, since i couldn't figure out how to do it.
  speakers = dataSettings["speakers"]
  speakers[list][id]["style"] = "strike";
  renderSpeakers(dataSettings, list);
}
function removeSpeaker(list, id){
  // refer to above
  speakers = dataSettings["speakers"]
  speakers[list].splice(id,1);
  renderSpeakers(dataSettings, list);
}
function clearSpeakers(settings, list){
  // clears speaker list
  speakers = settings["speakers"]
  speakers[list] = []
  return settings
}
function renderSpeakers(settings,list){
  // render function. basically just .html() a template with variables sprinkled in
  speakers = settings["speakers"]
  $("#table-" + list).html("");
  if (speakers[list].length === 0){ // if there's nothing in the list, adds a little notice
    /*
      <tr>
        <td>
          0
        </td>
        <td>
          Add speakers to get started!
        </td>
        <td class="text-right">
        </td>
      </tr>
    */
    $("#table-" + list).html('<tr><td>0</td><td>Add speakers to get started!<td class="text-right"></td></tr>');
  }
  else{
    for(i = 0; i < speakers[list].length; i++){
      style = "";
      if (speakers[list][i]["style"] == "strike"){ // checks for strike through
        style = " style='text-decoration: line-through;'";
      }
      /*
      <tr>
        <td' + style + '>
          ' + (i + 1) + '
        </td>
        <td' + style + '>
          ' + speakers[list][i]["name"] + '
        </td>
        <td class="text-right">
          <button class="btn btn-success" onclick="strikeSpeaker(\''+ list +'\', '+ i +')"><span class="fa fa-check"></span></button>
          <button class="btn btn-danger" onclick="removeSpeaker(\''+ list +'\', '+ i +')"><span class="fa fa-remove"></span></button>
        </td>
      </tr>
      */
      $("#table-" + list).append('<tr><td' + style + '>' + (i + 1) + '</td><td' + style + '>' + speakers[list][i]["name"] + '</td><td class="text-right"><button class="btn btn-success" onclick="strikeSpeaker(\''+ list +'\', '+ i +')"><span class="fa fa-check"></span></button><button class="btn btn-danger" onclick="removeSpeaker(\''+ list +'\', '+ i +')"><span class="fa fa-remove"></span></button></td></tr>'
      );
    }
  }
}
function updateScroll(){
  // updates the scroll so that it's at the top of the list. might become an option in the future
  var element = document.getElementById("view-fixed");
  element.scrollTop = element.scrollHeight;
}

// These next few functions just attach each button on the page to a function. Relatively self-explanatory
$("#timer-time-toggle").click(function(){
  dataSettings = toggleTimer(dataSettings);
});
$("#timer-time-stop").click(function(){
  dataSettings = setTimerTime(dataSettings,0);
  dataSettings = setSpeakerTime(dataSettings,0);
  dataSettings["timer"]["on"] = false;
  renderTimers(dataSettings);
});
$("#committee-time-add").click(function(){
  dataSettings = setTimerTime(dataSettings);
  renderTimers(dataSettings);
});
// keyCode 13 is the enter key. This associates the enter key with clicking the respective input button.
$("#committee-time-input").keyup(function(event){
  if(event.keyCode == 13){
    $("#committee-time-add").click();
  }
});
$("#speaker-time-add").click(function(){
  dataSettings = setSpeakerTime(dataSettings);
  renderTimers(dataSettings);
});
$("#speaker-time-input").keyup(function(event){
  if(event.keyCode == 13){
    $("#speaker-time-add").click();
  }
});
$("#add-primary").click(function(){
  dataSettings = addSpeaker(dataSettings, "primary");
  $("#input-primary").val("");
  renderSpeakers(dataSettings, "primary");
  updateScroll();
});
$("#add-secondary").click(function(){
  dataSettings = addSpeaker(dataSettings, "secondary");
  $("#input-secondary").val("");
  renderSpeakers(dataSettings, "secondary");
  updateScroll();
});
$("#add-caucas").click(function(){
  dataSettings = addSpeaker(dataSettings, "caucas");
  $("#input-caucas").val("");
  renderSpeakers(dataSettings, "caucas");
  updateScroll();
});
$("#input-primary").keyup(function(event){
  if(event.keyCode == 13){
    $("#add-primary").click();
  }
});
$("#input-secondary").keyup(function(event){
  if(event.keyCode == 13){
    $("#add-secondary").click();
  }
});
$("#input-caucas").keyup(function(event){
  if(event.keyCode == 13){
    $("#add-caucas").click();
  }
});
$("#clear-primary").click(function(){
  dataSettings = clearSpeakers(dataSettings, "primary");
  renderSpeakers(dataSettings, "primary");
});
$("#clear-secondary").click(function(){
  dataSettings = clearSpeakers(dataSettings, "secondary");
  renderSpeakers(dataSettings, "secondary");
});
$("#clear-caucas").click(function(){
  dataSettings = clearSpeakers(dataSettings, "caucas");
  renderSpeakers(dataSettings, "caucas");
});
// This renders the timer every second. Pretty inefficient, I know.
window.setInterval(function(){
 if (dataSettings["timer"]["on"]){
   dataSettings = incrementTimer(dataSettings);
   renderTimers(dataSettings);
 }
}, 1000);
