function printImmediately(print) {
  print();
}

printImmediately(() => { console.log('hello') });