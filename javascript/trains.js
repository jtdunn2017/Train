
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
// Debug
console.log("Database initialized");
//====== capture submit button ====
$("#addTrain").on("click", function (event) {
  // Don't refresh the page!
  event.preventDefault();
  

  //  Capture new train info.
  var trainName = $("#trainName").val().trim(); //Trim unecessary spaces
  var trainDestination = $("#trainDestination").val().trim();
  var trainFrequency = $("#trainFrequency").val().trim();
  var trainNextArrival = $("#trainNext").val().trim();

  // Debug
  console.log("screen inputs captured");
  console.log("Name: " + trainName);
  console.log("Dest: " + trainDestination);
  console.log("Freq: " + trainFrequency);
  console.log("Next Train: " + trainNextArrival);
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
    nextArrival: trainNextArrival
  });


// Debug
  console.log("Name: " + trainName);
  console.log("Dest: " + trainDestination);
  console.log("Freq: " + trainFrequency);
  console.log("Next Train: " + trainNextArrival);

  // Alert
  alert("Train schedule added");

  // Initialize screen variables
  $("#trainName").val("");
  $("#trainDestination").val("");
  $("#trainFrequency").val("");
  $("#trainNext").val("");


});
// Update htnl
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
 var newTrainName=childSnapshot.val().name;
 var newDestination=childSnapshot.val().dest;
 var newFrequency=childSnapshot.val().frequency;
 var newArrival=childSnapshot.val().nextArrival;
  

  console.log("Snapshot Info: " + childSnapshot.Val());
  //calculations needed
  var nextArrivalFormatted = moment(childSnapshot.val().trainNextArrival, "hh:mm").subtract(1, "days");
  console.log("Next arrival: " + moment(nextArrivalFormatted).format("hh:mm"));
  var timeDiff = moment().diff(moment(nextArrivalFormatted), "minutes");
  console.log("Difference in time: " + timeDiff);
  var remainder = timeDiff % childSnapshot.val().frequency;
  console.log("Remainder: " + remainder);
  var trainWaitTime = childSnapshot.val().frequency - remainder;
  console.log("Time till Train: " + trainWaitFormatted);
  var trainWaitFormatted = moment().add(trainWait, "minutes");
  console.log("Time till Train: " + trainWaitFormatted);
  

  // Add each train's data into the table
  $("#trainDetails").append("<tr><td>" + newTrainName + "</td><td>" + newDestination + "</td><td>" +
    newFrequency + "</td><td>" + moment(newArricval).format("hh:mm") + "</td><td>" + trainWaitFormatted + "</td></tr>");
});

