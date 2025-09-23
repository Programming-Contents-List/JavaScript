# create Object 
* code
```
const person = {
  name: 'Max'
};

const newPerson = {
  ...person,
  age: 28
};
```

* console's result
```
console.log(`newPersonInformation => `);  
console.log(newPerson); //{name: 'Max', age: 28}
```