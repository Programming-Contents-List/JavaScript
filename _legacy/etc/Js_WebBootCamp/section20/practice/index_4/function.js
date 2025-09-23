function returnDay(days) {
  if (days !== 0 && !(days < 0) && !(days > 7)) {
    switch (days) {
      case 1: console.log("Monday"); return "Monday";
      case 2: console.log("Tuesday"); return "Tuesday";;
      case 3: console.log("Wednesday"); return "Wednesday";;
      case 4: console.log("Thursday"); return "Thursday";;
      case 5: console.log("Friday"); return "Friday";;
      case 6: console.log("Saturday"); return "Saturday";;
      case 7: console.log("Sunday"); return "Sunday";;
    }
  } else {
    console.log(null);
    return null;
  }
}

returnDay(1) // "Monday"
returnDay(7) // "Sunday"
returnDay(4) // "Thursday"
returnDay(0) // null
returnDay(-1) // null
returnDay(8) // null