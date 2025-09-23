var data = {

  Name: "SooYoung"

  , Age: "27"

}

var person = JSON.stringify(data);

var oPerson = JSON.parse(person);

//output

alert(person);

/* Output: "{"Name":"SooYoung","Age":"29"}" */

alert(oPerson);

/* Output: Object */