import { Callback, Frac, Hue, IHSL, IHSLA, IRGB, IRGBA, isIHSL, isIHSLA, isIRGB, isIRGBA, Octet, Perc, TFrac, TOctet } from "./colorType";
import { ErrorMessage } from "./ErrorMessage";

// 0, 0, 0 = 0, 0, 0
// 255, 255, 255 = 0, 0, 100
// 255, 0, 255 =  300, 100, 50
// 0, 255, 0  = 120, 100, 50

export class Color {
  private _red: Octet = new Octet(0);
  private _green: Octet = new Octet(0);
  private _blue: Octet = new Octet(0);
  private _hue: Hue = new Hue(0);
  private _saturation: Perc = new Perc(0);
  private _light: Perc = new Perc(0);
  private _alpha: Frac = new Frac(1);

  private _numberOfColors: number = 3;
  private _mainColorPosition: number = 1;
  private _interval: Frac = new Frac(1);

  // private _analogColors: Color[] ;
  // private _polygonColors: Color[];
  // private _polyhedronColors: Color[];
  // private _complementaryTwiceColors: Color[];
  // private _complementaryDivideColors: Color[];
  // private _complementaryColors: Color[];

  public set numberOfColors(value: number) {
    if (value < 1) return 
    if (value > 100 ) return 
    this._numberOfColors = value 
  }
  public get numberOfColors(): number {
    return this._numberOfColors;
  }
  
  public set mainColorPosition(value: number) {
    if (value < 1) return 
    if (value > 100 ) return 
    this._mainColorPosition = value 
  }
  public get mainColorPosition(): number {
    return this._mainColorPosition;
  } 

  public set interval(value: number) {
    this._interval = new Frac(value);
  }

  public get interval(): Frac {
    return this._interval;
  }



  public calcAnalogColors(): Color[] {
    let analogColors: Color[] = [];
    for (let i = 0; i < this._numberOfColors; i++) {
      let hsl: IHSL = {
        h: new Hue(this._hue.get + i * 30).get,
        s: this._saturation.get,
        l: this._light.get
      };
      analogColors.push(new Color(hsl));
    }
    return analogColors;
  }

  public get analogColors(): Color[] {
    return this.calcAnalogColors();
  }






  constructor(color?: string | IRGB | IRGBA | IHSL | IHSLA ) {
    if (!color){
      return 
    }
    try {
      if (typeof color === 'string'){
        color = color.toLowerCase().trim().replaceAll(' ', '');

        if (color.slice(0,4) === "rgba"){
          let value = color.slice(5, -1).split(',');
          this._red = new Octet(parseInt(value[0]));
          this._green = new Octet(parseInt(value[1]));
          this._blue = new Octet(parseInt(value[2]));
          this.updateHsl();
          this._alpha = new Frac(parseInt(value[3]));

        } else if (color.slice(0,4) === "hsla"){
          let value = color.slice(5, -1).split(',');
          this._hue = new Hue(parseInt(value[0]));
          this._saturation = new Perc(parseInt(value[1]));
          this._light = new Perc(parseInt(value[2]));
          this.updateRgb()
          this._alpha = new Frac(parseInt(value[3]));
        } else if (color.slice(0,3) === "rgb"){
          let value = color.slice(4, -1).split(',');
          this._red = new Octet(parseInt(value[0]));
          this._green = new Octet(parseInt(value[1]));
          this._blue = new Octet(parseInt(value[2]));
          this.updateHsl();
        } else if (color.slice(0,3) === "hsl"){
          let value = color.slice(4, -1).split(',');
          this._hue = new Hue(parseInt(value[0]));
          this._saturation = new Perc(parseInt(value[1]));
          this._light = new Perc(parseInt(value[2]));
          this.updateRgb()
        } else if (color.slice(0,1) === "#"){
          let value = color.slice(1);
          this._red = new Octet(value.slice(0,2));
          this._green = new Octet(value.slice(2,4));
          this._blue = new Octet(value.slice(4,6));
          this.updateHsl();
        }
      } else if (isIRGBA(color)) {
        this._red = this.toOctet(color.r);
        this._green = this.toOctet(color.g);
        this._blue = this.toOctet(color.b);
        this.updateHsl();
        this._alpha = this.toFrac(color.a);
      } else if (isIRGB(color)) {
        this._red = this.toOctet(color.r);
        this._green = this.toOctet(color.g);
        this._blue = this.toOctet(color.b);
        this.updateHsl();
      } else if (isIHSLA(color)){
        this._hue = this.toHue(color.h);
        this._saturation = this.toPerc(color.s);
        this._light = this.toPerc(color.l);
        this.updateRgb()
      } else if (isIHSL(color)){
        this._hue = this.toHue(color.h);
        this._saturation = this.toPerc(color.s);
        this._light = this.toPerc(color.l);
        this.updateRgb()
      } else {
        throw new Error('Invalid value type');
      }
    } catch (error) {
      throw new Error('Invalid value type');
    }
	}

  public get this(): this {
    return this;
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

  public get hue(): Hue {
    return this._hue;
  }
  
  public get saturation(): Perc {
    return this._saturation;
  }

  public get light(): Perc {
    return this._light;
  }

  public get alpha(): Frac {
    return this._alpha;
  }

  public get rgba():{red: Octet, green: Octet, blue: Octet, alpha: Frac}{
    return {red: this._red, green: this._green, blue: this._blue, alpha: this._alpha};
  }

  public get rgbaString():string{
    return `${this._red.get}, ${this._green.get}, ${this._blue.get}, ${this._alpha.get}`;
  }

  public get rgbaStringCSS():string{
    return `rgba(${this._red.get}, ${this._green.get}, ${this._blue.get}, ${this._alpha.get})`;
  }

  public get rgb():{red: Octet, green: Octet, blue: Octet}{
    return {red: this._red, green: this._green, blue: this._blue};
  }

  public get rgbString():string{
    return `${this._red.get}, ${this._green.get}, ${this._blue.get}`;
  }

  public get rgbStringCSS():string{
    return `rgb(${this._red.get}, ${this._green.get}, ${this._blue.get})`;
  }

  public get hslString():string{
    return `${this._hue.get}, ${this._saturation.get}, ${this._light.get}`;
  }

  public get hslStringCSS():string{
    return `hsl(${this._hue.get}, ${this._saturation.get}, ${this._light.get})`;
  }

  public get hexa():string{
    return `#${this.dec2Hexa(this._red.get)}${this.dec2Hexa(this._green.get)}${this.dec2Hexa(this._blue.get)}`;
  }

  public set red(value: Octet|number) {
    try {
      if (value instanceof Octet) {
        if (value.get !== this._red.get) {
          this._red = value;
        } else {
          return;
        }
      } else if (typeof value === 'number') {
        if (value !== this._red.get) {
          this._red.set = value;
        } else {
          return;
        }
      } else {
        ErrorMessage.error(ErrorMessage.colorSetRedInvalidType, typeof value)
      }
      this.updateHsl();
    } catch (error:unknown) {
      ErrorMessage.error(ErrorMessage.colorSetRed, error)
    }
  }

  public set green(value: Octet|number) {
    try {
      if (value instanceof Octet) {
        if (value.get !== this._green.get) {
          this._green = value;
        } else {
          return;
        }
      } else if (typeof value === 'number') {
        if (value !== this._green.get) {
          this._green.set = value;
        } else {
          return;
        }
      } else {
        ErrorMessage.error(ErrorMessage.colorSetGreenInvalidType, typeof value)
      }
      this.updateHsl();
    } catch (error:unknown) {
      ErrorMessage.error(ErrorMessage.colorSetGreen, error)
    }
  }

  public set blue(value: Octet|number) {
    try {
      if (value instanceof Octet) {
        if (value.get !== this._blue.get) {
          this._blue = value;
        } else {
          return;
        }
      } else if (typeof value === 'number') {
        if (value !== this._blue.get) {
          this._blue.set = value;
        } else {
          return;
        }
      } else {
        ErrorMessage.error(ErrorMessage.colorSetBlueInvalidType, typeof value)
      }
      this.updateHsl();
    } catch (error:unknown) {
      ErrorMessage.error(ErrorMessage.colorSetBlue, error)
    }
  }

  public set hue(value: Hue | number) {
    try {
      if (value instanceof Hue) {
        if (value.get !== this._hue.get) {
          this._hue = value;
        } else {
          return;
        }
      } else if (typeof value === 'number') {
        if (value !== this._hue.get) {
          this.hue.set = value;
        } else {
          return;
        }
      } else {
        ErrorMessage.error(ErrorMessage.colorSetHueInvalidType, typeof value)
      }
      this.updateRgb()
    } catch (error:unknown) {
      ErrorMessage.error(ErrorMessage.colorSetHue, error)
    }
  }

  public set saturation(value: Perc|number) {
    try {
      if (value instanceof Perc) {
        if (value.get !== this._saturation.get) {
          this._saturation = value;
        } else {
          return;
        }
      } else if (typeof value === 'number') {
        if (value !== this._saturation.get) {
          this._saturation.set = value;
        } else {
          return;
        }
      } else {
        ErrorMessage.error(ErrorMessage.colorSetSaturationInvalidType, typeof value)
      }
      this.updateRgb()
    } catch (error:unknown) {
      ErrorMessage.error(ErrorMessage.colorSetSaturation, error)
    }
  }

  public set light(value: Perc|number) {
    try {
      if (value instanceof Perc) {
        if (value.get !== this._light.get) {
          this._light = value;
        } else {
          return;
        }
      } else if (typeof value === 'number') {
        if (value !== this._light.get) {
          this._light.set = value;
        } else {
          return;
        }
      } else {
        ErrorMessage.error(ErrorMessage.colorSetLightInvalidType, typeof value)
      }
      this.updateRgb()
    } catch (error:unknown) {
      ErrorMessage.error(ErrorMessage.colorSetLight, error)
    }
  }

  public set alpha(value: Frac|number) {
    try {
      if (value instanceof Frac) {
        if (value.get !== this._alpha.get) {
          this._alpha = value;
        } else {
          return;
        }
      } else if (typeof value === 'number') {
        if (value !== this._alpha.get) {
          this._alpha.set = value;
        } else {
          return;
        }
      } else {
        ErrorMessage.error(ErrorMessage.colorSetAlpha, typeof value)
      }
    } catch (error:unknown) {
      ErrorMessage.error(ErrorMessage.colorSetAlpha, error)
    }
  }

  public set hexa(value: string) {
    try {
      if (value.slice(0,1) === "#"){
        let hexa = value.slice(1);
        this._red = new Octet(hexa.slice(0,2));
        this._green = new Octet(hexa.slice(2,4));
        this._blue = new Octet(hexa.slice(4,6));
        this.updateHsl();
      } else {
        ErrorMessage.error(ErrorMessage.colorSetHexaInvalidType, typeof value)
      }
    } catch (error:unknown) {
      ErrorMessage.error(ErrorMessage.colorSetHexa, error)
    }
  }

  public rgbToHsl (red: Octet, green: Octet, blue: Octet): {hue: Hue, saturation: Perc, light:Perc} {
    const r = red.get / 255 
    const g = green.get / 255 
    const b = blue.get / 255 

    const max: number = Math.max(r, g, b)
    const min: number = Math.min(r, g, b)
    const delta: number = max - min
    const l = (1 / 2) * (max + min)
    const s = (l === 0 || l === 1)? 0 : delta / (1 - Math.abs( 2*l - 1))
    const h = Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b,) * 180 / Math.PI

    // console.log(red.get, green.get, blue.get , '-' , h, s*100, l*100)
    return {hue: new Hue(Math.round(h)), saturation: new Perc(Math.round(s * 100)), light: new Perc(Math.round(l * 100))};
  }

  private updateHsl () {
    const hsl = this.rgbToHsl(this._red, this._green, this._blue);
    this._hue = hsl.hue
    this._saturation = hsl.saturation
    this._light = hsl.light
  }

  private hslToRgb(hue: Hue, saturation: Perc, light: Perc):{ red: Octet, green: Octet, blue: Octet } {
    const h = hue.get 
    const s = saturation.get / 100
    const l = light.get / 100

    const C = (1 - Math.abs(2 * l - 1)) * s;
    const H = h / 60;
    const X = C * (1 - Math.abs(H % 2 - 1));
    const m = l - C / 2;
    let rgb: {r: number, g: number, b: number}= {r : 0, g:0, b: 0}

    if (H < 1) { 
      rgb = {r : (C + m), g:( X + m), b: (0 + m)}
    } else if (H < 2) { 
      rgb = {r : (X + m), g:( C + m), b: (0 + m)}
    } else if (H < 3) { 
      rgb = {r : (0 + m), g:( C + m), b: (X + m)}
    } else if (H < 4) {
      rgb = {r : (0 + m), g:( X + m), b: (C + m)}
    } else if (H < 5) {
      rgb = {r : (X + m), g:( 0 + m), b: (C + m)}
    } else if (H <= 6) { 
      rgb = {r : (C + m), g:( 0 + m), b: (X + m)}
    }

    // console.log(hue.get, saturation.get, light.get , '-' , rgb.r*255, rgb.g*255, rgb.b*255)
    return { red: new Octet(Math.round(rgb.r*255)), green: new Octet(Math.round(rgb.g*255)), blue: new Octet(Math.round(rgb.b*255))}
  }

  private updateRgb () {
    const rgb = this.hslToRgb(this._hue, this._saturation, this._light);
    this._red = rgb.red
    this._green = rgb.green
    this._blue = rgb.blue
  }

  // private rgbToLight(r: Octet, g: Octet, b: Octet): Perc {
  //   const rNorm = r.get / 255;
  //   const gNorm = g.get / 255;
  //   const bNorm = b.get / 255;
  
  //   const max = Math.max(rNorm, gNorm, bNorm);
  //   const min = Math.min(rNorm, gNorm, bNorm);
  //   let light = (max + min) / 2;
  //   light = light > 1? 1: light
  
  //   return new Perc(light * 100);
  // }
  
  // private rgbToSaturation(r: Octet, g: Octet, b: Octet): Perc {
  //   const L = this.rgbToLight(r, g, b).get / 100;
  //   const rNorm = r.get / 255;
  //   const gNorm = g.get / 255;
  //   const bNorm = b.get / 255;

  //   const max = Math.max(rNorm, gNorm, bNorm);
  //   const min = Math.min(rNorm, gNorm, bNorm);
  //   const delta = max - min;

  //   let saturation: number;

  //   if (L === 0 || L === 1) {
  //     saturation = 0;
  //   } else {
  //     saturation = delta / (1 - Math.abs(2 * L - 1));
  //     saturation = saturation > 1? 1: saturation
  //   }
  //   return new Perc(saturation * 100);
  // }

  // private rgbToHue (r: Octet, g: Octet, b: Octet): Hue {
  //   return new Hue(Math.round(Math.atan2( Math.sqrt(3) * (g.get - b.get), 2 * r.get - g.get - b.get,) * 180 / Math.PI));
  // }

  // private rgbToHsl (r: Octet, g: Octet, b: Octet): {hue: Hue, saturation: Perc, light:Perc} {
  //   const hue = this.rgbToHue(r,g,b);
  //   const saturation = this.rgbToSaturation(r,g,b);
  //   const light = this.rgbToLight(r,g,b);
  //   return {hue: hue, saturation: saturation, light: light};
  // }

  // private rgbToHsl (r: Octet, g: Octet, b: Octet): {hue: Hue, saturation: Perc, light:Perc} {
  //   let v = Math.max(r.get / 255, g.get / 255, b.get / 255), c = v - Math.min(r.get / 255, g.get / 255, b.get / 255), f = (1 - Math.abs(v + v - c - 1)); 
    
  //   let h = c && ((v === (r.get / 255))? ((g.get / 255) - (b.get / 255))/c : ((v === (g.get / 255)) ? 2+((b.get / 255) - (r.get / 255)) / c: 4 + ((r.get / 255) - (g.get / 255))/c)); 
  
  //   return{hue: new Hue(Math.round(60*(h<0?h+6:h))), saturation: new Perc(f ? Math.round((c / f) * 100) : 0), light: new Perc(Math.round(((v + v -c)/2) * 100))}
  // }

  // private hslToRgb(h: Hue, s: Perc, l: Perc):{ red: Octet, green: Octet, blue: Octet } {
  //   let a = s.get / 100 * Math.min(l.get / 100 , 1 - l.get / 100);
  //   let f = (n:number, k = (n + h.get / 100 / 30) % 12) => l.get / 100 - a * Math.max(Math.min(k-3, 9-k, 1), -1);
    
  //   return { red: new Octet(Math.round(f(0) * 255)) , green: new Octet(Math.round(f(8) * 255)), blue: new Octet(Math.round(f(4) * 255)) };
  // }
  

  // private hslToRgb(h: Hue, s: Perc, l: Perc):{ red: Octet, green: Octet, blue: Octet } {
  //   const C = (1 - Math.abs(2 * l.get / 100 - 1)) * s.get / 100;
  //   const hPrime = h.get / 60;
  //   const X = C * (1 - Math.abs(hPrime % 2 - 1));
  //   const m = l.get / 100 - C / 2;
  
  //   const withLight = (r: number, g: number, b: number) => {
  //     return {
  //       red: new Octet(Math.round((r + m) * 255)),
  //       green: new Octet(Math.round((g + m) * 255)),
  //       blue: new Octet(Math.round((b + m) * 255))
  //     };
  //   };
  
  //   if (hPrime >= 0 && hPrime < 1) {
  //     return withLight(C, X, 0);
  //   } else if (hPrime >= 1 && hPrime < 2) {
  //     return withLight(X, C, 0);
  //   } else if (hPrime >= 2 && hPrime < 3) {
  //     return withLight(0, C, X);
  //   } else if (hPrime >= 3 && hPrime < 4) {
  //     return withLight(0, X, C);
  //   } else if (hPrime >= 4 && hPrime < 5) {
  //     return withLight(X, 0, C);
  //   } else if (hPrime >= 5 && hPrime < 6) {
  //     return withLight(C, 0, X);
  //   }
  
  //   throw new Error('Invalid hue value');
  // }

  
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
        return new Frac(value.get / 100)
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
        return new Perc(value.get * 100)
      } else if (typeof value === 'string') {
        return new Perc(value);
      }
      return new Perc(value);
    } catch (error) {
      throw new Error('Invalid value type');
    }
  }

  public dec2Hexa (value:number):string {
    return value.toString(16).toUpperCase().padStart(2, '0');
  }

  public hexa2String (value:number):string {
    return value.toString(16);
  }
  
  public string2Hexa (value:string):number {
    return parseInt(value, 16);
  }

}

// public listenRed(callback: Callback): Octet {
//   const currentValue = this._red;
//   this.addObserver('red', callback);
//   callback(currentValue);
//   return currentValue;
// }

// private observers: { [key: string]: Callback[] } = {
//   red: [],
//   green: [],
//   blue: [],
//   hue: [],
//   saturation: [],
//   light: [],
//   alpha: []
// };

// public addObserver(property: string, callback: Callback): void {
//   if (this.observers[property]) {
//     this.observers[property].push(callback);
//   } else {
//     throw new Error(`No such property to observe: ${property}`);
//   }
// }

// private notify(property: string, value: any): void {
//   if (this.observers[property]) {
//     this.observers[property].forEach(callback => callback(value));
//   }
// }

// private colorUpdated(): void {
//   this.notify('red', this._red.get);
//   this.notify('green', this._green.get);
//   this.notify('blue', this._blue.get);
//   this.notify('hue', this._hue.get);
//   this.notify('saturation', this._saturation.get);
//   this.notify('light', this._light.get);
//   this.notify('alpha', this._alpha.get);
// }




const color:Color =  new Color({r: 255, g: 0, b: 0})
export type TColor = Color;
export default color

