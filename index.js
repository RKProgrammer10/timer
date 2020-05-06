//INTISATIONS
let inputHour = document.getElementById('hour');
let inputMins = document.getElementById('mins');
let inputDay = document.getElementById('day')
let btn = document.getElementById('startAlarm');
let inputName = document.getElementById('name');
let content = document.getElementById("content");
let alarmDiv = document.getElementById('alarmDiv');
let cdBtn = document.getElementById("cdBtn");

//SET VALIRABLE FOR THE SELECT BOXES
let showHours = "";
let showMins = "";

//SETTING VALUES TO THE SELECT BOXES
for (let i = 1; i <= 12; i++) {
  showHours += `<option value='${i}'>${i}</option>`
}
for (let i = 0; i <= 60; i++) {
  showMins += `<option value='${i}'>${i}</option>`
}

//SHOWING VALUES IN THE SELECT BOXES
inputHour.innerHTML = showHours;
inputMins.innerHTML = showMins;

//ADDING EVENT LISTENER TO BUTTON
btn.addEventListener("click", ()=> {
  let value = 13;
  if (day.value == "PM") {
    Array.from(inputHour).forEach((e)=> {
      e.value = value;
      value += 1;
    });
  } else {
    value = 1;
    Array.from(inputHour).forEach((e)=> {
      e.value = value;
      value += 1;
    });
  }
});


//ENTERING DATA TO THE LOCALSTORAGE
btn.addEventListener("click", ()=> {
  alarmTimings = localStorage.getItem("alarmTimings");
  if (alarmTimings === null) {
    timingList = [];
  } else {
    timingList = JSON.parse(alarmTimings);
  }
  let data = {
    name: inputName.value,
    time: `${inputHour.value}:${inputMins.value}:${day.value}`,
    matter: content.value,
    onORoff: "checked"
  };
  timingList.push(data);
  localStorage.setItem("alarmTimings", JSON.stringify(timingList));
  showAlarms();
});

let checkedList = [];

//SHOW ALARMS ON DISPLAY
function showAlarms () {
  let alarmHtml = "";
  alarmTimings = localStorage.getItem("alarmTimings");
  if (alarmTimings === null) {
    timingList = [];
  } else {
    try {
      timingList = JSON.parse(alarmTimings);
    }catch(error) {
      console.log(alarmTimings);
    }
  }
  let ids;
  timingList.forEach((element, index)=> {
    ids = element['name'];
    alarmHtml += ` <tr>
    <th scope="row">
    ${index+1}</th>
    <td>
    <a type="button" class="text-dark">
    ${element['name']}
    </a>
    </td>
    <td>${element['time']}</td>
    <td>
    <div class="custom-control custom-switch">
    <input type="checkbox" ${element['onORoff']} class="custom-control-input" id="${ids}">
    <label class="custom-control-label" for="${ids}"></label>
    </div>
    </td>
    <td>
    <button class="btn bg-danger text-white form-control" id="delBtn${index+1}"> <svg class="bi bi-x" width="1.3em" height="1.3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd" />
    <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd" />
    </svg></button>
    </td>
    </tr>`;
  });
  alarmDiv.innerHTML = alarmHtml;
  changeOnOff();
  timingList.forEach((e, i)=> {
    let delBtns = document.getElementById(`delBtn${i+1}`);
    delBtns.addEventListener("click", ()=> {
      timingList.splice(i, 1);
      localStorage.setItem("alarmTimings", JSON.stringify(timingList));
      showAlarms();
    });
  });
}
showAlarms();
//CREATING TIME CHECK FUNCTION FOR THE PROJECT
function checkTime() {
  alarmTimings = localStorage.getItem("alarmTimings");
  //GETTING DAY TIME FROM THE SYSTEM
  let time = new Date();
  let sysHour = time.getHours();
  let sysMin = time.getMinutes();
  let sysSec = time.getSeconds();
  let sysDay;
  if (sysHour > 12) {
    sysDay = "PM";
  } else {
    sysDay = "AM";
  }
  let checkTimeVar = `${sysHour}:${sysMin}:${sysDay}`;
  if (alarmTimings === null) {
    timingList = [];
  } else {
    try {
      timingList = JSON.parse(alarmTimings);
    }catch(error) {
      console.log(error);
    }
  }

  timingList.forEach((element)=> {
    let toggleBtn = document.getElementById(element['name']);
    if (toggleBtn.checked) {
      if (element['time'] == checkTimeVar) {
        let audio = new Audio('./media/alarm.ogg');
        audio.play();
        toggleBtn.style.backgroundColor = "red";
      }
    }
  });
}
function insert(index, data) {
  alarmTimings = localStorage.getItem("alarmTimings");
  if (alarmTimings === null) {
    timingList = [];
  } else {
    try {
      timingList = JSON.parse(alarmTimings);
    }catch(error) {
      console.log(error);
    }
  }
  timingList[index] = data;
  localStorage.setItem("alarmTimings", JSON.stringify(timingList));
  showAlarms();
}

function changeOnOff() {
  alarmTimings = localStorage.getItem("alarmTimings");
  if (alarmTimings === null) {
    timingList = [];
  } else {
    try {
      timingList = JSON.parse(alarmTimings);
    }catch(error) {
      console.log(error);
    }
  }
  timingList.forEach((element, index)=> {
    let toggleBtn = document.querySelector(`#${element['name']}`);
    try {
      toggleBtn.addEventListener("change", ()=> {
        if (toggleBtn.checked) {
          let data = {
            name: element['name'],
            time: element['time'],
            matter: element['matter'],
            onORoff: "checked"
          };
          insert(index, data);
          console.log("checked");
        } else {
          let data = {
            name: element['name'],
            time: element['time'],
            matter: element['matter'],
            onORoff: ""
          };
          insert(index, data);
          console.log("unchecked");
        }
        localStorage.setItem("alarmTimings", JSON.stringify(timingList));
      });
    }catch(error) {
      console.log(error);
    }
  });
}