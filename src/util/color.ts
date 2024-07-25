import { Frac, Hue, IHSL, IRGB, isIHSL, isIRGB, Octet, Perc, TFrac, TOctet } from "./colorType";

class Color {
  private red: Octet = new Octet(255);
  private green: Octet = new Octet(255);
  private blue: Octet = new Octet(255);
  private alpha: Frac = new Frac(1);

  constructor(color: string | IRGB | IHSL) {
    try {
      if (typeof color === 'string'){
        color = color.toLowerCase().trim().replaceAll(' ', ''); 
        if (color.slice(4) === "rgba"){
          let value = color.slice(5, -1).split(',');
          this.red = this.toOctet(value[0]);
          this.green = this.toOctet(value[1]);
          this.blue = this.toOctet(value[2]);
          this.alpha = this.toFrac(value[3]);
        } else if (color.slice(4) === "hsla"){
          let value = color.slice(5, -1).split(',');
          const h = this.toHue(value[0]);
          const s = this.toPerc(value[1]);
          const l = this.toPerc(value[2]);
          const rgb = this.hslToRgb(h, s, l);
          this.red = rgb.red;
          this.green = rgb.green;
          this.blue = rgb.blue;
          this.alpha = this.toFrac(value[3]);
        } else if (color.slice(3) === "rgb"){
          let value = color.slice(5, -1).split(',');
          this.red = this.toOctet(value[0]);
          this.green = this.toOctet(value[1]);
          this.blue = this.toOctet(value[2]);
        } else if (color.slice(3) === "hsl"){
          let value = color.slice(5, -1).split(',');
          const h = this.toHue(value[0]);
          const s = this.toPerc(value[1]);
          const l = this.toPerc(value[2]);
          const rgb = this.hslToRgb(h, s, l);
          this.red = rgb.red;
          this.green = rgb.green;
          this.blue = rgb.blue;
        } else if (color.slice(1) === "#"){
          this.red = this.toOctet(color.slice(1, 3));
          this.green = this.toOctet(color.slice(3, 5));
          this.blue = this.toOctet(color.slice(5, 7));
          this.alpha = color.slice(7,9)? this.toFrac(color.slice(7,9)): new Frac(1);
        }
      } else if (isIRGB(color)) {
        this.red = this.toOctet(color.r);
        this.green = this.toOctet(color.g);
        this.blue = this.toOctet(color.b);
        this.alpha = color.a !== undefined ? this.toFrac(color.a) : new Frac(1);
      } else if (isIHSL(color)){
        const h = this.toHue(color.h);
        const s = this.toPerc(color.s);
        const l = this.toPerc(color.l);
        const rgb = this.hslToRgb(h, s, l);
        this.red = rgb.red;
        this.green = rgb.green;
        this.blue = rgb.blue;
        this.alpha = color.a !== undefined ? this.toFrac(color.a) : new Frac(1);
      } else {
        throw new Error('Invalid value type');
      }
    } catch (error) {
      throw new Error('Invalid value type');
    }
    
	}

  private rgbToLightness (r: Octet, g: Octet, b: Octet): Perc {
    return new Perc(1/2 * (Math.max(r.octet, g.octet, b.octet) + Math.min(r.octet, g.octet, b.octet)))
  }

  private rgbToSaturation (r: Octet, g: Octet, b: Octet): Perc {
    const L = this.rgbToLightness(r,g,b);
    const max = Math.max(r.octet, g.octet, b.octet);
    const min = Math.min(r.octet, g.octet, b.octet);

    if (L.perc === 0 || L.perc === 1) {
      return new Perc(0)
    } else {
      return new Perc((max - min)/(1 - Math.abs(2 * L.perc - 1)))
    }
  };

  private rgbToHue (r: Octet, g: Octet, b: Octet): Hue {
    return new Hue(Math.round(Math.atan2( Math.sqrt(3) * (g.octet - b.octet), 2 * r.octet - g.octet - b.octet,) * 180 / Math.PI));
  }

  private rgbToHsl (r: Octet, g: Octet, b: Octet): {h: Hue, s: Perc, l:Perc} {
    const lightness = this.rgbToLightness(r,g,b);
    const saturation = this.rgbToSaturation(r,g,b);
    const hue = this.rgbToHue(r,g,b);
    return {h: hue, s: saturation, l: lightness};
  }

  private hslToRgb (h: Hue, s: Perc ,l: Perc):{red: Octet, green: Octet, blue: Octet} {
    const C = (1 - Math.abs(2 * l.perc - 1)) * s.perc;
    const hPrime = h.hue / 60;
    const X = C * (1 - Math.abs(hPrime % 2 - 1));
    const m = l.perc - C/2;
    const withLight = (r: number, g: number, b: number) => {
      return {red: new Octet(r + m), green: new Octet(g + m), blue: new Octet(b + m)};
    }
    if (hPrime <= 1) { return withLight(C, X,0); } else
      if (hPrime <= 2) { return withLight(X, C,0); } else
      if (hPrime <= 3) { return withLight(0, C, X); } else
      if (hPrime <= 4) { return withLight(0, X, C); } else
      if (hPrime <= 5) { return withLight(X,0, C); } else
      if (hPrime <= 6) { return withLight(C,0, X); }
    throw new Error('Invalid value type');
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

  private toHue(value: any): Hue{
    try {
      if (value instanceof Hue){
        return value
      }
      return new Hue(value);
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


  private toPerc(value: any): Perc{
    try {
      if (value instanceof Perc){
        return value
      } else if (value instanceof Frac){
        return new Perc(value.frac * 100)
      } else if (typeof value === 'string') {
        return new Perc(value);
      }
      return new Perc(value);
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


