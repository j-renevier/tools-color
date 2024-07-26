export type TOctet = number;
export type TPerc = number;
export type TFrac = number;
export type THue = number;

export class Octet {
  private value: TOctet;

  constructor(value?: number|string) {
    this.value = this.validate(value);
  }

  private validate(value: number|string|undefined): TOctet {
    if (typeof value === 'undefined'){
      return 0;
    }
    const HexaRegex = /^[0-9A-Fa-f]{2}$/;
    if (typeof value === 'number' && value >= 0 && value <= 255) {
      return value;
    } else if (typeof value === 'string' && HexaRegex.test(value)){
      return this.validate(parseInt(value, 16))
    }
    throw new Error('Invalid octet value: Must be an integer between 0 and 255');
  }

  public isOctet(value: number|string): boolean {
    const HexaRegex = /^[0-9A-Fa-f]{2}$/;
    if (typeof value === 'number' && value >= 0 && value <= 255) {
      return true;
    } else if (typeof value === 'string' && HexaRegex.test(value)){
      this.validate(parseInt(value, 16))
    }
    return false;
  }

  public get octet(): TOctet {
    return this.value;
  }

  public set octet(newValue: number|string) {
    this.value = this.validate(newValue);
  }
}

export class Perc {
  private value: TPerc;

  constructor(value?: any) {
    this.value = this.validate(value);
  }

  private validate(value: number): TPerc {
    if (typeof value === 'number' && value >= 0 && value <= 100) {
      return value;
    } else if (typeof value === 'string'){
      this.validate(parseInt(value, 10))
    }
    throw new Error('Invalid perc value: Must be an integer between 0 and 100');
  }

  public isPerc(value: number): boolean {
    if (typeof value === 'number' && value >= 0 && value <= 100) {
      return true;
    }
    return false;
  }

  public get perc(): TPerc {
    return this.value;
  }

  public set perc(newValue: number) {
    this.value = this.validate(newValue);
  }
}

export class Frac {
  private value: TFrac;

  constructor(value?: any) {
    this.value = this.validate(value);
  }

  private validate(value: number): TFrac {
    if (typeof value === 'number' && value >= 0 && value <= 1) {
      return value;
    } else if (typeof value === 'string'){
      this.validate(parseInt(value, 1))
    }
    throw new Error('Invalid perc value: Must be an integer between 0 and 1');
  }

  public isFrac(value: number): boolean {
    if (typeof value === 'number' && value >= 0 && value <= 1) {
      return true;
    }
    return false;
  }

  public get frac(): TFrac {
    return this.value;
  }

  public set frac(newValue: number) {
    this.value = this.validate(newValue);
  }
}

export class Hue {
  private value: THue;

  constructor(value: any) {
    this.value = this.validate(value);
  }

  private validate(value: number): THue {
    if (typeof value === 'number' && value >= 0 && value <= 360) {
      return value;
    }
    throw new Error('Invalid perc value: Must be an integer between 0 and 1');
  }

  public isFrac(value: any): boolean {
    if (typeof value === 'number' && value >= 0 && value <= 1) {
      return true;
    }
    return false;
  }

  public get hue(): THue {
    return this.value;
  }

  public set hue(newValue: number) {
    this.value = this.validate(newValue);
  }
}

export interface IRGB {
  r: Octet | number | string , 
  g: Octet | number | string , 
  b: Octet | number | string ,  
  a: Frac | Perc | number | string | undefined,
}

export function isIRGB(value: any): value is IRGB {
  return 'r' in value && 'g' in value && 'b' in value;
}

export interface IHSL {
  h: Hue | number | string , 
  s: Frac | Perc | number | string , 
  l: Frac | Perc | number | string ,  
  a: Frac | Perc | number | string | undefined,
}

export function isIHSL(value: any): value is IHSL {
  return 'h' in value && 's' in value && 'l' in value;
}