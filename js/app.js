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
console.log(dataSettings)
function getTimerTime(settings){
  var temp = settings["timer"]["seconds"]%60
  if (temp < 10){
    temp = "0" + temp;
  }
  return Math.floor(settings["timer"]["seconds"]/60) + ":" + temp;
}
function getSpeakerTime(settings){
  var temp = settings["timer"]["speaker"]%60
  if (temp < 10){
    temp = "0" + temp;
  }
  return Math.floor(settings["timer"]["speaker"]/60) + ":" + temp;
}
function incrementTimer(settings){
  if (settings["settings"]["timerBehaviour"] == "bleed"){
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
  value = value | false
  if (value != false){
    settings["timer"]["seconds"] = value
  }
  else{
    var temp = $("#committee-time-input").val().split(":");
    settings["timer"]["seconds"] = 60*temp[0]+Number(temp[1]);
  }
  $("#committee-time-input").val("");
  return settings;
}
function setSpeakerTime(settings){
  return settings;
}
function toggleTimer(settings){
  settings["timer"]["on"] = !(settings["timer"]["on"]);
  return settings;
}
function renderTimers(settings){
  $("#committee-timer").html(getTimerTime(settings));
  $("#speaker-timer").html(getSpeakerTime(settings));
}
function addSpeaker(speakers, list){
  speakers[list].push({"name": $("#input-" + list).val(), "style": "none"});
  renderSpeakers(speakers, list);
}
function strikeSpeaker(list, id){
  speakers[list][id]["style"] = "strike";
  renderSpeakers(speakers, list);
}
function removeSpeaker(list, id){
  speakers[list].splice(id,1);
  renderSpeakers(speakers, list);
}
function renderSpeakers(speakers,list){
  $("#table-" + list).html("");
  for(i = 0; i < speakers[list].length; i++){
    style = "";
    if (speakers[list][i]["style"] == "strike"){
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
function updateScroll(){
  var element = document.getElementById("view-fixed");
  element.scrollTop = element.scrollHeight;
}

$("#timer-time-toggle").click(function(){
  dataSettings = toggleTimer(dataSettings);
});
$("#timer-time-stop").click(function(){
  dataSettings = setTimerTime(dataSettings,0);
  renderTimers(dataSettings);
});
$("#committee-time-add").click(function(){
  dataSettings = setTimerTime(dataSettings);
  renderTimers(dataSettings);
});
$("#committee-time-input").keyup(function(event){
  if(event.keyCode == 13){
    $("#time-add").click();
  }
});
$("#add-primary").click(function(){
  addSpeaker(speakers, "primary");
  $("#input-primary").val("");
  updateScroll();
});
$("#add-secondary").click(function(){
  addSpeaker(speakers, "secondary");
  $("#input-secondary").val("");
  updateScroll();
});
$("#add-caucas").click(function(){
  addSpeaker(speakers, "caucas");
  $("#input-caucas").val("");
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
$("#clear-primary").click(function(){
  $("#table-primary").html('<tr><td>0</td><td>Add speakers to get started!<td class="text-right"></td></tr>');
});
$("#clear-secondary").click(function(){
  $("#table-secondary").html('<tr><td>0</td><td>Add speakers to get started!<td class="text-right"></td></tr>');
});
$("#clear-caucas").click(function(){
  $("#table-caucas").html('<tr><td>0</td><td>Add speakers to get started!<td class="text-right"></td></tr>');
});
window.setInterval(function(){
 if (dataSettings["timer"]["on"]){
   dataSettings = incrementTimer(dataSettings);
   renderTimers(dataSettings);
 }
}, 1000);
console.log(dataSettings)
