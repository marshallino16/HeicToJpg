/* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
const addLight = function(color, amount){
  let cc = parseInt(color,16) + amount;
  let c = (cc > 255) ? 255 : (cc);
  c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
}

/* const hexToRGB = (color) => {
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  let colorRGB = [color.substring(0,2)]
} */

/* Aclara un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
const lighten = (color, amount)=> {
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  amount = parseInt((255*amount)/100);
  return color = `#${addLight(color.substring(0,2), amount)}${addLight(color.substring(2,4), amount)}${addLight(color.substring(4,6), amount)}`;
}

/* Resta el porcentaje indicado a un color (RR, GG o BB) hexadecimal para oscurecerlo */
const subtractLight = function(color, amount){
  let cc = parseInt(color,16) - amount;
  let c = (cc < 0) ? 0 : (cc);
  c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
  return c;
}

/* Oscurece un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
const darken = (color, amount) =>{
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  amount = parseInt((255*amount)/100);
  return color = `#${subtractLight(color.substring(0,2), amount)}${subtractLight(color.substring(2,4), amount)}${subtractLight(color.substring(4,6), amount)}`;
}


export default {
    lighten,
    darken
}