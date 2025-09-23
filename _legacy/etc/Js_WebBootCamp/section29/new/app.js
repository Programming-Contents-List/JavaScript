// function Color(r, g, b) {
//   this.r = r;
//   this.g = g;
//   this.b = b;
//   this.rgb = function () {
//     const { r, g, b } = this;
//     return `${r}, ${g}, ${b}`;
//   }
//   console.log(this);
// }

function Color(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;

}

Color.prototype.rgb = function () {
  const { r, g, b } = this;
  return `${r}, ${g}, ${b}`;
}


const color1 = new Color(20, 40, 20);