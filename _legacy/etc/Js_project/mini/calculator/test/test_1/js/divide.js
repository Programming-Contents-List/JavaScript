export function divide(number) {
  if (number !== 0) {
    this.result /= number;
  } else {
    console.log("Error: Division by zero is not allowed.");
  }
}