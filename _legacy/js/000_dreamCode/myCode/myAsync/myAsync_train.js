async function foo() {
  console.log('hello');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('world');
  console.log('hello again');
}

foo();
console.log('goodbye');