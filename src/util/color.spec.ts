import { Color } from "./color";
import { Frac, Hue, Octet, Perc } from "./colorType";

function runTests() {
  const tests: any = [
    { input: '#FF00FF', description: '18 Hexadecimal string 1' },
    { input: '#00FF00', description: '19 Hexadecimal string 2' },
    { input: 'rgb(255, 0, 255)', description: '21 rgb string 1' },
    { input: 'rgB( 0, 255  , 0  )', description: '22 rgb string 2' },
    { input: 'rgba(255, 0, 255, 0.7)', description: '24 rgba string 1' },
    { input: 'rgBa( 0, 255  , 0  , 1)', description: '25 rga string 2' },
    { input: 'hsl(300, 100, 50)', description: '27 hsl string 1' },
    { input: 'hsl(120, 100, 50)', description: '28 hsl string 2' },
    { input: 'hsla(300, 100, 50, 0.7)', description: '30 hsla string 1' },
    { input: 'hsla(120, 100, 50 , 1)', description: '31 rga string 2' },
    { input: { r: 255, g: 0, b: 255}, description: '1 IRGB object with numeric values 1' },
    { input: { r: 0, g: 255, b: 0}, description: '4 IRGB object with string 2' },
    { input: { r: 255, g: 0, b: 255, a: 0.7}, description: '7 IRGBa object with numeric values 1' },
    { input: { r: 0, g: 255, b: 0, a: 0.7}, description: '9 IRGBa object with string 2' },
    { input: { r: new Octet(255), g: new Octet(0), b: new Octet(255), a: new Frac(0.7) }, description: '11 IRGB object with Octet and Frac instances' },
    { input: { h: 300, s: 100, l: 50}, description: '12 IHSL object with numeric values 1' },
    { input: { h: 120, s: 100, l: 50}, description: '14 IHSL object with string 2' },
    { input: { h: 300, s: 100, l: 50, a: 0.7}, description: '15 IHSLa object with numeric values 1' },
    { input: { h: 120, s: 100, l: 50, a: 0.7}, description: '16 IHSLa object with string 2' },
    { input: { h: new Hue(300), s: new Perc(100), l: new Perc(50), a: new Frac(0.7) }, description: '17 IHSL object with Octet and Frac instances' },
  ];

  tests.forEach((test:any) => {
    try {
      const color = new Color(test.input);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`FAIL: ${test.description} - ${error.message}`);
      } else {
        console.error(`FAIL: ${test.description} - Unknown error`);
      }
    }
  });
}

runTests();