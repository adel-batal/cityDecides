function randomColor(brightness) {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  return 'rgba(' + x + ',' + y + ',' + z + ', 0.6)';
}
/* `rgba('${x}, ${y}, ${z}, 0.6)` */

export default randomColor;
