class Color {
  constructor(r, g, b, name) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.name = name;
    // console.log("constructor");
    // console.log(r, g, b);
  }
  greet() {
    return `Hello From A Color!! ${this.name}`
  }
}

const c1 = new Color(32, 56, 78, 'idk');