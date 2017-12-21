
//Initialize Firebase 
console.log("just accessed the javascript file");
var config = {
  apiKey: "AIzaSyCGRXvD88P3ZcGPBE4mgYjK-zMGZ3FNTtE",
  authDomain: "train-schedules-5b28f.firebaseapp.com",
  databaseURL: "https://train-schedules-5b28f.firebaseio.com",
  projectId: "train-schedules-5b28f",
  storageBucket: "train-schedules-5b28f.appspot.com",
  messagingSenderId: "486424654375"
};
firebase.initializeApp(config);
var database = firebase.database();

console.log("Database initialized");
//====== capture submit button ====
$("#addTrain").on("click", function (childSnapshot, prevChildKey) {
  // Don't refresh the page!
  console.log("Snapshot Info: " + childSnapshot);

  //  Capture new train info.
  var trainName = $("#trainName").val().trim(); //Trim unecessary spaces
  var trainDestination = $("#trainDestination").val().trim();
  var trainFrequency = $("#trainFrequency").val().trim();
  var trainNext = $("#trainNext").val().trim();
  console.log("screen inputs captured");
  console.log("Name: " + trainName);
  console.log("Dest: " + trainDestination);
  console.log("Freq: " + trainFrequency);
  console.log("Next Train: " + trainNext);
  // Store new train info object
  /*  var newTrain = {
      name: trainName,
      dest: trainDestination,
      frequency: trainFrequency,
      nextTime: trainNext 

    };*/

  // Write new entry to database
  database.ref().push({
    name: trainName,
    dest: trainDestination,
    frequency: trainFrequency,
    nextTime: trainNext
  });



  console.log("Name: " + newTrain.trainName);
  console.log("Dest: " + newTrain.trainDestination);
  console.log("Freq: " + newTrain.trainFrequency);
  console.log("Next Train: " + newTrain.trainNext);

  // Alert
  alert("Train schedule added");

  // Initialize screen variables
  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#trainFrequency").val("");
  $("#trainNext").val("");


});
database.ref().on("child_added", function (childSnapshot) {
  //calculations needed
  var trainNextFormatted = moment(childSnapshot.val().trainNext, "hh:mm").subtract(1, "days");
  var timeDiff = moment().diff(moment(trainNextFormatted), "minutes");
  console.log("Difference in time: " + timeDiff);
  var remainder = timeDiff % childSnapshot.val().frequency;
  console.log("Remainder: " + remainder);
  var trainWaitFormatted = childSnapshot.val().frequency - remainder;
  console.log("Time till Train: " + trainWaitFormatted);
  var nextTimeFormatted = moment().add(trainWait, "minutes");
  console.log("Next arrival: " + moment(nexttimeFormatted).format("hh:mm"));

  // Add each train's data into the table
  $("#trainDetails").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().trainDestination + "</td><td>" +
    childSnapshot.val().trainFrequency + "</td><td>" + moment(trainNext).format("hh:mm") + "</td><td>" + trainWait + "</td></tr>");
});

