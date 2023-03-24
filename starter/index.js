$(document).ready(function () {

    // Get the current date and time and display it on the page
    let current = moment().format("dddd Do MMMM, YYYY");
    $("#currentDay").text(current);

    // making an array so we can store the time 
    let hrs = [];

    // Loop through the hours from 9am to 5pm and then format them
    for (let i = 9; i <= 17; i++) {
        let hour = (i < 12 ? i + "am" : (i === 12 ? i + "pm" : (i - 12) + "pm"));
        hrs.push(hour);
    }

    
    for (let i = 9; i <= 17; i++) {
        let hour = (i < 12 ? i + "am" : (i === 12 ? i + "pm" : (i - 12) + "pm"));
        hrs.push(hour);
    };

    // Declaring a variable to store the timeout for the save message
    let timeout;
    // making a save message element

    let saveMessage = $("<p>").addClass("message").text("Activity saved!");

    // looping thro hours and creating blocks for each hour

 hrs.forEach((hour, index) => {
    // Creating timeblock element
    let timeBlock = $("<div>").addClass("time-block row");
    // Creating hour element
    let hourElement = $("<div>").addClass("hour col-2").text(hour);
    // Creating input element for the schedule
    let scheduleInput = $("<input>")
        .addClass("scheduleInput col-8")
        .attr("id", `input-${index}`);
         // Set a unique id for each input

          // Declaring a variable to store current activity in local storage
        let currentActivity = `inputActivity${index}`;
        // Getting stored schedule for this hour
        let storedSchedule = localStorage.getItem(currentActivity);

        // checking to see if there is a schedule stored
        if (storedSchedule) {
            // Splitting the stored schedule into its parts
            let splitActivity = storedSchedule.split("<>");
            // check if the schedule is from today
            if (splitActivity[1] === current) {
    
             // setting value of schedule input to the stored activity
                scheduleInput.val(splitActivity[0]);
            } else {
                // if  stored schedule is not from today, remove it from local storage
                localStorage.removeItem(currentActivity);
            }
        }

  // making a save button element
  let saveButton = $("<button>")
  .addClass("saveBtn col-2")
  .html("<i class='fas fa-save'></i>");

// When the save button is clicked it will save the current schedule to local storage
saveButton.click(function () {

  localStorage.setItem(
      currentActivity,
      scheduleInput.val() + "<>" + current
  );

  // If there is a previous timeout, clear it
  if (timeout != null) {
      clearTimeout(timeout);
  } else {
      // if there is no previous timeout then add a save message
      $(".jumbotron").append(saveMessage);
  }

  // setting a 3 second timeout for save message to disappear 
  timeout = setTimeout(function () {
      saveMessage.remove();
      timeout = null;
  }, 3000);
});

timeBlock.append(hourElement).append(scheduleInput).append(saveButton);

$(".container").append(timeBlock);

});

// check if the hour is in the past present or future and assign a class
for (let i = 0; i < hrs.length; i++) {

// starts at 0 so +9 (0 + 9) so that it represents 9am
let eachtimeBlock = moment().hour(i + 9);
// input-${i} corresponds with the unique id of each element 
let currentIndex = $(`#input-${i}`);

if (moment().isBefore(eachtimeBlock)) {
  currentIndex.addClass("future");
} else if (moment().isAfter(eachtimeBlock)) {
  currentIndex.addClass("past");
} else {
  currentIndex.addClass("present");
}
}
});