function delay(name) {
  //random time
  const ms = Math.floor(Math.random() * 11) * 1000
  console.log(`start ${name}!! delivery need ${ms / 1000}second`)
  return setTimeout(() => console.log(`${name} is Arrived! ${ms}`), ms);
}

//res가 완료, await이 완료 될때 까지
let time = 0;
function checkTime() {
  time += 1;
  console.log(time);
  if (time === 10) { console.log("stop"); stop(); }
}
let isTime = setInterval(checkTime, 1000);
function stop() { clearInterval(isTime) }


delay('delivery1')
delay('delivery2')
delay('delivery3')
