const addAlarmBtn = document.querySelector("button"),
alarmInputs = document.querySelector(".alarm-inputs");

let alarmTime, isAlarmSet,
alarmSound = new Audio("./sound.mp3");

let timerRef = document.getElementById("current-time");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const secInput = document.getElementById("secInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];

let alarmIndex = 0;
let initialHour = 0,
  initialMinute = 0;

// Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

// String value of current active alarm 
var alarmString = null;

//Search for value in object:
// Function looks for an object inside the alarmsArray array, where the value of the key equal to the “parameter”
//  passed to the function is equal to the “value” passed to the function.
// If it finds a match, the function sets exists to true, assigns the
//  matching object to the variable alarmObject and assigns the index of that object in the alarmsArray array to objIndex.
const searchObject = (parameter, value) => {
    let alarmObject,
      objIndex,
      exists = false;
    alarmsArray.forEach((alarm, index) => {
      if (alarm[parameter] == value) {
        exists = true;
        alarmObject = alarm;
        objIndex = index;
        return false;
      }
    });
    return [exists, alarmObject, objIndex];
  };


// Display Time
function displayTimer() {
    let date = new Date();
    // let hours = appendZero(date.getHours()),
    //     minutes = appendZero(date.getMinutes()),
    //     seconds = appendZero(date.getSeconds());
    let [hours, minutes, seconds] = [
      appendZero(date.getHours()),
      appendZero(date.getMinutes()),
      appendZero(date.getSeconds())
    ];
  
    //Display time
    timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;
  
    //Alarm
    alarmsArray.forEach((alarm, index) => {
      if (alarm.isActive) {
        if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
          alarmSound.play();
          alarmSound.loop = true;
        //   if(alert("Alarm at "+alarm.alarmHour+":"+alarm.alarmMinute+"!")){
        //     let checkbox = document.querySelector('onoff');
        //     console.log(checkbox);
        //   }
        }
 
      }
    });
  }

// Function to collect the inputs from hour and minute
const inputCheck = (inputValue) => {
    inputValue = parseInt(inputValue);
    if (inputValue < 10) {
        inputValue = appendZero(inputValue);
    }
    console.log(inputValue);
    return inputValue;
};

hourInput.addEventListener("input", () => {
hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
minuteInput.value = inputCheck(minuteInput.value);
});

//Create active-alarm div

const createAlarm = (alarmObj) => {
    //Keys from object
    const { id, alarmHour, alarmMinute } = alarmObj;
    //Alarm div
    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;
  
    //checkbox
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.select("class", "onoff");
    checkbox.addEventListener("click", (e) => {
      if (e.target.checked) {
        startAlarm(e);
        window.alert('Alarm On!');
      } else {
        stopAlarm(e);
        window.alert('Alarm Off!');
      }
    });
    alarmDiv.appendChild(checkbox);

    //Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e));
    alarmDiv.appendChild(deleteButton);

    activeAlarms.appendChild(alarmDiv);
  };


// Set Alarm
// adds an event listener to a button element, setAlarm, so that when the button is clicked,
// an alarm is created and added to the alarmsArray
setAlarm.addEventListener("click", (event) => {
    // 1.
    alarmIndex += 1;

    event.preventDefault();

    // 2.alarmObject
    let alarmObj = {};
    alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
    alarmObj.alarmHour = hourInput.value;
    alarmObj.alarmMinute = minuteInput.value;
    alarmObj.isActive = false;

    console.log(alarmObj);
    // 3.
    alarmsArray.push(alarmObj);
    console.log(alarmsArray)
    console.log(alarmIndex)
    // 4.
    createAlarm(alarmObj);

    // 5.
    // hourInput.value = appendZero(initialHour);
    // minuteInput.value = appendZero(initialMinute);
  });

//Start Alarm
const startAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      alarmsArray[index].isActive = true;
    }
};

//Stop alarm
const stopAlarm = (e) => {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      alarmsArray[index].isActive = false;
      alarmSound.pause();
    }
};

//delete alarm
const deleteAlarm = (e) => {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = searchObject("id", searchId);
    if (exists) {
      e.target.parentElement.parentElement.remove();
      alarmsArray.splice(index, 1);
    }
};
  
window.onload = () => {
    setInterval(displayTimer, 1000);
    initialHour = 0;
    initialMinute = 0;
    alarmIndex = 0;
    alarmsArray = [];
    hourInput.value = appendZero(initialHour);
    minuteInput.value = appendZero(initialMinute);
};

// ****** Code Ends Here *******







// // To render current time on the screen
// // We created two functions :
// // getTimeString(), generates time string for the provided hours, mins, secs & zone
// // renderTime(), displays current time on screen.

// // Function to convert time to string value
// const getTimeString = ({ hours, minutes, seconds, zone }) => {
//     if (minutes / 10 < 1) {
//       minutes = "0" + minutes;
//     }
//     if (seconds / 10 < 1) {
//       seconds = "0" + seconds;
//     }
//     return `${hours}:${minutes}:${seconds} ${zone}`;
// };
  
// // Function to display current time on screen
// const renderTime = () => {
//     var currentTime = document.getElementById("current-time");
//     const currentDate = new Date();
//     var hours = currentDate.getHours();
//     var minutes = currentDate.getMinutes();
//     var seconds = currentDate.getSeconds();
//     var zone = hours >= 12 ? "PM" : "AM";
//     if (hours > 12) {
//         hours = hours % 12;
//     }
//     const timeString = getTimeString({ hours, minutes, seconds, zone });
//     currentTime.innerHTML = timeString;

//     console.log("Time:", timeString)
//     console.log("Alarm:", alarmString)

//     if (alarmString == timeString) {
//         ringtone.play();
//         ringtone.loop = true;
//     }
// };

// // Update time every second
// setInterval(renderTime, 1000);

// // Handle Create Alarm submit
// const handleSubmit = (event) => {
//     // Prevent default action of reloading the page
//     event.preventDefault();
//     const { hour, sec, min, zone } = document.forms[0];
//     alarmString = getTimeString({
//       hours: hour.value,
//       seconds: sec.value,
//       minutes: min.value,
//       zone: zone.value
//     });
//     // console.log(alarmString);
//     // Reset form after submit
//     document.forms[0].reset();
// };

// function setAlarm() {
//     if (isAlarmSet) {
//         alarmTime = "";
//         ringtone.pause();
//         alarmInputs.classList.remove("disable");
//         addAlarmBtn.innerText = "Set Alarm";
//         return isAlarmSet = false;
//     }
//     isAlarmSet = true;
//     let time = alarmString;
//     alarmTime = time;
//     alarmInputs.classList.add("disable");
//     addAlarmBtn.innerText = "Clear Alarm";
// }

// document.forms[0].addEventListener("submit", handleSubmit);
// addAlarmBtn.addEventListener("click", setAlarm);