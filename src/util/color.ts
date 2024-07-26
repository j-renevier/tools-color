import { Frac, Hue, IHSL, IRGB, isIHSL, isIRGB, Octet, Perc, TFrac, TOctet } from "./colorType";

export class Color {
  private _red: Octet = new Octet(255);
  private _green: Octet = new Octet(255);
  private _blue: Octet = new Octet(255);
  private _alpha: Frac = new Frac(1);

  constructor(color: string | IRGB | IHSL) {
    console.log("Constructor color", color)
    try {
      if (typeof color === 'string'){
        color = color.toLowerCase().trim().replaceAll(' ', '');

        if (color.slice(0,4) === "rgba"){
          let value = color.slice(5, -1).split(',');
          this._red = new Octet(parseInt(value[0]));
          this._green = new Octet(parseInt(value[1]));
          this._blue = new Octet(parseInt(value[2]));
          this._alpha = new Frac(parseInt(value[3]));

        } else if (color.slice(0,4) === "hsla"){
          let value = color.slice(5, -1).split(',');
          const h = new Hue(parseInt(value[0]));
          const s = new Perc(parseInt(value[1]));
          const l = new Perc(parseInt(value[2]));
          const rgb = this.hslToRgb(h, s, l);
          this._red = rgb.red;
          this._green = rgb.green;
          this._blue = rgb.blue;
          this._alpha = new Frac(parseInt(value[3]));
        } else if (color.slice(0,3) === "rgb"){
          let value = color.slice(4, -1).split(',');
          this._red = new Octet(parseInt(value[0]));
          this._green = new Octet(parseInt(value[1]));
          this._blue = new Octet(parseInt(value[2]));
        } else if (color.slice(0,3) === "hsl"){
          let value = color.slice(4, -1).split(',');
          const h = new Hue(parseInt(value[0]));
          const s = new Perc(parseInt(value[1]));
          const l = new Perc(parseInt(value[2]));
          const rgb = this.hslToRgb(h, s, l);
          this._red = rgb.red;
          this._green = rgb.green;
          this._blue = rgb.blue;
        } else if (color.slice(0,1) === "#"){
          let value = color.slice(1);
          this._red = new Octet(value.slice(0,2));
          this._green = new Octet(value.slice(2,4));
          this._blue = new Octet(value.slice(4,6));
        }
      } else if (isIRGB(color)) {
        this._red = this.toOctet(color.r);
        this._green = this.toOctet(color.g);
        this._blue = this.toOctet(color.b);
        this._alpha = color.a !== undefined ? this.toFrac(color.a) : new Frac(1);
      } else if (isIHSL(color)){
        const h = this.toHue(color.h);
        const s = this.toPerc(color.s);
        const l = this.toPerc(color.l);
        const rgb = this.hslToRgb(h, s, l);
        this._red = rgb.red;
        this._green = rgb.green;
        this._blue = rgb.blue;
        this._alpha = color.a !== undefined ? this.toFrac(color.a) : new Frac(1);
      } else {
        throw new Error('Invalid value type');
      }
    } catch (error) {
      throw new Error('Invalid value type');
    }
	}

  public get red(): Octet {
    return this._red;
  }

  public get green(): Octet {
    return this._green;
  }

  public get blue(): Octet {
    return this._blue;
  }

  public get alpha(): Frac {
    return this._alpha;
  }

  public get rgba():{red: Octet, green: Octet, blue: Octet, alpha: Frac}{
    return {red: this._red, green: this._green, blue: this._blue, alpha: this._alpha};
  }

  public get rgbaString():string{
    return `${this._red.octet}, ${this._green.octet}, ${this._blue.octet}, ${this._alpha.frac}`;
  }

  public get rgbaStringCSS():string{
    return `rgba(${this._red.octet}, ${this._green.octet}, ${this._blue.octet}, ${this._alpha.frac})`;
  }

  public get rgb():{red: Octet, green: Octet, blue: Octet}{
    return {red: this._red, green: this._green, blue: this._blue};
  }

  public get rgbString():string{
    return `${this._red.octet}, ${this._green.octet}, ${this._blue.octet}`;
  }

  public get rgbStringCSS():string{
    return `rgb(${this._red.octet}, ${this._green.octet}, ${this._blue.octet})`;
  }

  // Optionally, add setter methods if needed
  public set red(value: Octet) {
    this._red = value;
  }

  public set green(value: Octet) {
    this._green = value;
  }

  public set blue(value: Octet) {
    this._blue = value;
  }

  public set alpha(value: Frac) {
    this._alpha = value;
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

  private hslToRgb(h: Hue, s: Perc, l: Perc):{ red: Octet, green: Octet, blue: Octet } {
    const C = (1 - Math.abs(2 * l.perc / 100 - 1)) * s.perc / 100;
    const hPrime = h.hue / 60;
    const X = C * (1 - Math.abs(hPrime % 2 - 1));
    const m = l.perc / 100 - C / 2;
  
    const withLight = (r: number, g: number, b: number) => {
      return {
        red: new Octet(Math.round((r + m) * 255)),
        green: new Octet(Math.round((g + m) * 255)),
        blue: new Octet(Math.round((b + m) * 255))
      };
    };
  
    if (hPrime >= 0 && hPrime < 1) {
      return withLight(C, X, 0);
    } else if (hPrime >= 1 && hPrime < 2) {
      return withLight(X, C, 0);
    } else if (hPrime >= 2 && hPrime < 3) {
      return withLight(0, C, X);
    } else if (hPrime >= 3 && hPrime < 4) {
      return withLight(0, X, C);
    } else if (hPrime >= 4 && hPrime < 5) {
      return withLight(X, 0, C);
    } else if (hPrime >= 5 && hPrime < 6) {
      return withLight(C, 0, X);
    }
  
    throw new Error('Invalid hue value');
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


