function mouse_tracking(event) {
  console.log(`pageX : ${event.pageX} pageY : ${event.pageY}`)
  console.log(`clientX : ${event.clientX} clientY : ${event.clientY}`)
}
window.addEventListener('mousemove', mouse_tracking)

