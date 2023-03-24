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

});