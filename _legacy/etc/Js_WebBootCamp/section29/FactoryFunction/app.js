function hex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgb(r, g, b) {
  return `${r}, ${g}, ${b}`;
}

function makeColor(r, g, b) {
  const color = {};
  color.r = r;
  color.g = g;
  color.b = b;
  color.rgb = () => {
    return `${r}, ${g}, ${b}`;
  }
  return color;
}

const firstColor = makeColor(33, 255, 150);
firstColor.rgb();