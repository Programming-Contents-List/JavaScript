const btn = document.querySelector('#btn');
const arrow = () => console.log("Hello Arrow");
const arrow_0 = () => { console.log("Hello arrow_@@") }

btn.addEventListener('click', arrow);
btn.addEventListener('click', arrow_0);

const add0 = (a, b) => a + b;
const add1 = (a, b) => { a + b }; 