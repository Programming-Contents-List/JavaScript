import { Calculator } from "./Calculator.js";

const value_1 = document.querySelector(".value_1");
const value_2 = document.querySelector(".value_2");

const btn_Form = document.querySelector(".btn_Form");
const sign = document.querySelector(".sign");
const result = document.querySelector(".result");

//selected
btn_Form.addEventListener("click", (e) => {
  e.preventDefault();
  let target = e.target;
  let result_value = 0;
  const calculator = new Calculator(parseInt(value_1.value));//parseInt(value_1.value)
  // console.log(calculator.add(4))
  switch (target.className) {
    case 'plus':
      calculator.add(parseInt(value_2.value));
      result_value = calculator.result
      // console.log(calculator.result)
      // console.log(result_value)
      result.innerText = result_value;
      sign.innerText = '+'
      break;

    case 'min':
      calculator.subtract(parseInt(value_2.value));
      result_value = calculator.result
      result.innerText = result_value;
      sign.innerText = '-'
      break;

    case 'mul':
      calculator.multiply(parseInt(value_2.value));
      result_value = calculator.result
      result.innerText = result_value;
      sign.innerText = 'x'
      break;

    case 'divi':
      calculator.divide(parseInt(value_2.value));
      result_value = calculator.result
      result.innerText = result_value;
      sign.innerText = '/'
      break;

    case 'reset':
      calculator.clear(parseInt(value_2.value));
      sign.innerText = ''
      result.innerText = '';
      value_1.value = 0;
      value_2.value = 0;
      break;
  }
})
