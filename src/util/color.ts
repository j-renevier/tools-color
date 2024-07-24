import { Frac, Hue, IHSL, IRGB, isIHSL, isIRGB, Octet, Perc, TFrac, TOctet } from "./colorType";

const hexa2String = (value:number):string => {
  return value.toString(16);
}

const string2Hexa = (value:string):number => {
  return parseInt(value, 16);
}

function rgbToHsl(r: number, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}





class Color {
  private red: Octet = new Octet(255);
  private green: Octet = new Octet(255);
  private blue: Octet = new Octet(255);
  private alpha: Frac = new Frac(1);

  constructor(color: string | IRGB | IHSL) {
    try {
      if (typeof color === 'string'){

      } else if (isIRGB(color)) {
        this.red = this.toOctet(color.r);
        this.green = this.toOctet(color.g);
        this.blue = this.toOctet(color.b);
        this.alpha = color.a !== undefined ? this.toFrac(color.a) : new Frac(1);
  
      } else if (isIHSL(color)){
  
      } else {
        throw new Error('Invalid value type');
      }
    } catch (error) {

    }
    
	}

   
  private toOctet(value: any): Octet{
    try {
      if (value instanceof Octet){
        return value
      }
      return new Octet(value);
    } catch (error) {
      throw new Error('Invalid value type');
    }
  }

  private toFrac(value: any): Frac{
    try {
      if (value instanceof Frac){
        return value
      } else if (value instanceof Perc){
        return new Frac(value.perc / 100)
      } else if (typeof value === 'string') {
        return new Frac(value);
      }
      return new Frac(value);
    } catch (error) {
      throw new Error('Invalid value type');
    }
  }
}


const hexa2String = (value:number):string => {
  return value.toString(16);
}

const string2Hexa = (value:string):number => {
  return parseInt(value, 16);
}


