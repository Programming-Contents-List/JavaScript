function handleKeydown(event) {
  console.log(event.keyCode);
  console.log(event.key);
}
window.addEventListener('keydown', handleKeydown);