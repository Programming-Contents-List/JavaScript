function delay(name) {
  //random time
  const ms = Math.floor(Math.random() * 11) * 1000
  console.log(`start ${name}!! delivery need ${ms / 1000}second`)
  return setTimeout(() => console.log(`${name} is Arrived! ${ms}`), ms);
}
delay('delivery1')
delay('delivery2')
delay('delivery3')
