console.log("contact!!==")

//여기서 함수로 작성했지만 화살표기법으로 변수에 바로 담아 낼 수도 있다.
const newPrint = new Promise((res) => { res("res"); })
newPrint.then(console.log('print'));
newPrint.then(console.log)
newPrint.then(function (success) { console.log(`NEW!success => ${success}`) })