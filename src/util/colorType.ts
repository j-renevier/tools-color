type octet = number;
type octet = number;
type octet = number;

class Octet {
  private _value: octet;

  constructor(value: any) {
    this._value = this.validate(value);
  }

  private validate(value: number|string): octet {
    const HexaRegex = /^[0-9A-Fa-f]{2}$/;
    if (typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 255) {
      return value;
    } else if (typeof value === 'string' && HexaRegex.test(value)){
      this.validate(parseInt(value, 16))
    }
    throw new Error('Invalid octet value: Must be an integer between 0 and 255');
  }

  public get octet(): octet {
    return this._value;
  }

  public set octet(newValue: number) {
    this._value = this.validate(newValue);
  }
}





const isValidPercentage = (value: any):boolean => {
  return typeof value === 'number' && value >= 0 && value <= 100;
};

const isValidfract = (value: any):boolean => {
  return typeof value === 'number' && value >= 0 && value <= 1;
};


const hexa2String = (value:number):string => {
  return value.toString(16);
}

const string2Hexa = (value:string):number => {
  return parseInt(value, 16);
}