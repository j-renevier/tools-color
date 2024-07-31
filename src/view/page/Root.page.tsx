import { useEffect, useState } from "react";
import color, { Color, TColor } from "../../util/Color";
import Plus from "../../assets/media/icon/plus";
import Minus from "../../assets/media/icon/minus";

interface ColorValue {
  value: number | string;
  setValue: (v: number | string) => void;
}

interface IValues {
  red: ColorValue;
  green: ColorValue;
  blue: ColorValue;
  hue: ColorValue;
  saturation: ColorValue;
  light: ColorValue;
  alpha: ColorValue;
  hexa: ColorValue;
  rgbaStringCSS: ColorValue;
}

const RootPage = () => {

  let root = document.documentElement
  const [values, setValues] = useState<IValues>({
    red: { value: color.red.get, setValue: (v: IValues['red']['value']) => setValues((prev: IValues) => ({ ...prev, red: { value: v, setValue: prev.red.setValue } })) },
    green: { value: color.green.get, setValue: (v: IValues['blue']['value']) => setValues((prev: IValues) => ({ ...prev, green: { value: v, setValue: prev.green.setValue } })) },
    blue: { value: color.blue.get, setValue: (v: IValues['green']['value']) => setValues((prev: IValues) => ({ ...prev, blue: { value: v, setValue: prev.blue.setValue } })) },
    hue: { value: color.hue.get, setValue: (v: IValues['hue']['value']) => setValues((prev: IValues) => ({ ...prev, hue: { value: v, setValue: prev.hue.setValue } })) },
    saturation: { value: color.saturation.get, setValue: (v: IValues['saturation']['value']) => setValues((prev: IValues) => ({ ...prev, saturation: { value: v, setValue: prev.saturation.setValue } })) },
    light: { value: color.light.get, setValue: (v: IValues['light']['value']) => setValues((prev: IValues) => ({ ...prev, light: { value: v, setValue: prev.light.setValue } })) },
    alpha: { value: color.alpha.get, setValue: (v: IValues['alpha']['value']) => setValues((prev: IValues) => ({ ...prev, alpha: { value: v, setValue: prev.alpha.setValue } })) },
    hexa: { value: color.hexa, setValue: (v: IValues['hexa']['value']) => setValues((prev: IValues) => ({ ...prev, hexa: { value: v, setValue: prev.hexa.setValue } })) },
    rgbaStringCSS: { value: color.rgbaStringCSS, setValue: (v: IValues['rgbaStringCSS']['value']) => setValues((prev: IValues) => ({ ...prev, rgbaStringCSS: { value: v, setValue: prev.rgbaStringCSS.setValue } })) }
  });

  const updateCssValues = () => {
    root.style.setProperty('--color-main-red', values.red.value.toString())
    root.style.setProperty('--color-main-green', values.green.value.toString())
    root.style.setProperty('--color-main-blue', values.blue.value.toString())
    root.style.setProperty('--color-main-hue', values.hue.value.toString())
    root.style.setProperty('--color-main-saturation', values.saturation.value.toString() + '%')
    root.style.setProperty('--color-main-light', values.light.value.toString() + '%')
    root.style.setProperty('--color-main-alpha', values.alpha.value.toString())
  }

  useEffect(()=> {
    updateCssValues()
  })

  const updateValues = () => {
    Object.entries(values).forEach(([key, colorValue]) => {
      if (colorValue && colorValue.setValue) {
        colorValue.setValue(color[key as keyof typeof color].get);
      }
    });
    updateCssValues()
  }


  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.target as HTMLInputElement;
    const colorName = button.name as keyof Color
    const valuesName = button.name as keyof typeof values
    if (colorName in values) {
      const currentValue = values[valuesName];
      if (typeof currentValue === 'number') {
        color[colorName] = currentValue - 1;
        updateValues();
      }
    }
  }

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = event.target as HTMLInputElement;
    const colorName = button.name as keyof Color
    const valuesName = button.name as keyof typeof values
    if (colorName in values) {
      const currentValue = values[valuesName];
      if (typeof currentValue === 'number') {
        color[colorName] = currentValue + 1;
        updateValues();
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== ''){
      const name = event.target.name as keyof Color
      color[name] = Number(event.target.value)
      updateValues()
    }
  }
  
  const handleChangeInputTypeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    color.hexa = event.target.value
    updateValues()
  }

  const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if(event.key === "Backspace" && input.value.length === 1){
      event.preventDefault();
      input.value = ''
    }
  }

  return (
    <div className="main">
      <header>
        <h1>Generate beautiful gradients</h1>
        <div>
          <h2>Parametres</h2>
          <div>
            <div>
              <h3>Couleur principale</h3>
              <div className="main_color">
                <label className="main_color color_picker" >
                  <input type="color" id="main_color color_picker" value={values.hexa.value} onChange={(event)=>handleChangeInputTypeColor(event)}/>
                </label>
                <div className="main_color static_value">
                  <h4 className="color_model">RGB:</h4>
                  <h4 className="color_model_value">{values.red.value}, {values.green.value}, {values.blue.value}</h4>
                  <h4 className="color_model">HSL:</h4>
                  <h4 className="color_model_value">{values.hue.value}, {values.saturation.value}, {values.light.value}</h4>
                  <h4 className="color_model">Alpha:</h4>
                  <h4 className="color_model_value">{values.alpha.value}</h4>
                </div>
              </div>
            </div>

            <div className="number_picker">
              <div>
                <h3>RGB</h3> 
                <label htmlFor="inputNumberRed" className="param red">
                  <h4 className="value_name">Rouge</h4>
                  <div className="value red">
                    <button className="button decrement" onClick={(event)=>handleDecrement(event)} name="red"><Minus/></button>
                    <input type="number" className="color_picker number_picker red" id="inputNumberRed" name="red" min="0" minLength={0} max="255" step="1" onKeyDown={(event)=>handleKeyDown(event)}  value={values.red.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="button increment" onClick={(event)=>handleIncrement(event)} name="red"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker red gradient-border" id="inputRangeRed" name="red" min="0" max="255" step="1"  value={values.red.value} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">255</button>
                </label>
                
                <label htmlFor="inputNumberGreen" className="param green">
                  <h4 className="value_name">Vert</h4>
                  <div className="value green">
                    <button className="button increment" name="green"><Minus/></button>
                    <input type="number" className="color_picker number_picker green" id="inputNumberGreen" name="green" min="0" max="255" step="1"  value={values.green.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="green"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker green" id="inputRangeGreen" name="green" min="0" max="255" step="1"  value={values.green.value} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">255</button>
                </label>
                
                <label htmlFor="inputNumberBlue" className="param blue">
                  <h4 className="value_name">Bleu</h4>
                  <div className="value blue">
                    <button className="button increment" name="blue"><Minus/></button>
                    <input type="number" className="color_picker number_picker blue" id="inputNumberBlue" name="blue" min="0" max="255" step="1"  value={values.blue.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="blue"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker blue" id="inputRangeBlue" name="blue" min="0" max="255" step="1"  value={values.blue.value} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">255</button>
                </label>
              </div>
              <div>
                <h3>HSL</h3>
                <label htmlFor="inputHue" className="param hue">
                  <h4 className="value_name">Teinte</h4>
                  <div className="value hue">
                    <button className="button increment" name="hue"><Minus/></button>
                    <input type="number" className="color_picker number_picker hue" id="inputNumberHue" name="hue" min="0" max="360" step="1"  value={values.hue.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="hue"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker hue" id="inputRangeHue" name="hue" min="0" max="360" step="1"  value={values.hue.value} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">360</button>
                </label>
                
                <label htmlFor="inputSaturation" className="param saturation">
                  <h4 className="value_name">Saturation</h4>
                  <div className="value saturation">
                    <button className="button increment" name="saturation"><Minus/></button>
                    <input type="number" className="color_picker number_picker saturation" id="inputNumberSaturation" name="saturation" min="0" max="100" step="1"  value={values.saturation.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="saturation"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker saturation" id="inputRangeSaturation" name="saturation" min="0" max="100" step="1"  value={values.saturation.value} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">100</button>
                </label>
                
                <label htmlFor="inputLight" className="param light">
                  <h4 className="value_name">Luminosité</h4>
                  <div className="value light">
                    <button className="button increment" name="light"><Minus/></button>
                    <input type="number" className="color_picker number_picker light" id="inputNumberLight" name="light" min="0" max="100" step="1"  value={values.light.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="light"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker light" id="inputRangeLight" name="light" min="0" max="100" step="1"  value={values.light.value} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">100</button>
                </label>
              </div>
              <div>
                <h3>Alpha</h3>
                <label htmlFor="inputAlpha" className="param alpha">
                  <h4 className="value_name">Alpha</h4>
                  <div className="value alpha">
                    <button className="button increment" name="alpha"><Minus/></button>
                    <input type="number" className="color_picker number_picker alpha" id="inputNumberAlpha" name="alpha" min="0" max="1" step="0.01"  value={values.alpha.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="alpha"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker alpha" id="inputRangeAlpha" name="alpha" min="0" max="1" step="0.01"  value={values.alpha.value} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">1</button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default RootPage;






  // const [red, setRed] = useState(color.red.get);
  // const [green, setGreen] = useState(color.green.get);
  // const [blue, setBlue] = useState(color.blue.get);
  // const [hue, setHue] = useState(color.hue.get);
  // const [saturation, setSaturation] = useState(color.saturation.get);
  // const [light, setLight] = useState(color.light.get);
  // const [alpha, setAlpha] = useState(color.alpha.get);
  // const [hexa, setHexa] = useState(color.hexa);
  // const [rgbaStringCSS, setRgbaStringCSS] = useState(color.rgbaStringCSS);


    // const changeColor1 = (newValue: number, name: string) => {
  //   switch(name){
  //     case 'red': 
  //       color.red = newValue;
  //       setRed(() => newValue);
  //       setHue(() => color.hue.get);
  //       setSaturation(() => color.saturation.get);
  //       setLight(() => color.light.get);
  //       setHexa(() => color.hexa);
  //       setRgbaStringCSS(() => color.rgbaStringCSS);
  //       root.style.setProperty('--color-main-red', red.toString());
  //       root.style.setProperty('--color-main-hue', hue.toString());
  //       root.style.setProperty('--color-main-saturation', saturation.toString());
  //       root.style.setProperty('--color-main-light', light.toString());
  //       break;
  //     case 'green': 
  //       color.green = newValue;
  //       setGreen(() => newValue);
  //       setHue(() => color.hue.get);
  //       setSaturation(() => color.saturation.get);
  //       setLight(() => color.light.get);
  //       setHexa(() => color.hexa);
  //       setRgbaStringCSS(() => color.rgbaStringCSS);
  //       root.style.setProperty('--color-main-green', green.toString());
  //       root.style.setProperty('--color-main-hue', hue.toString());
  //       root.style.setProperty('--color-main-saturation', saturation.toString());
  //       root.style.setProperty('--color-main-light', light.toString());
  //       break;
  //     case 'blue': 
  //       color.blue = newValue;
  //       setBlue(() => newValue);
  //       setHue(() => color.hue.get);
  //       setSaturation(() => color.saturation.get);
  //       setLight(() => color.light.get);
  //       setHexa(() => color.hexa);
  //       setRgbaStringCSS(() => color.rgbaStringCSS);
  //       root.style.setProperty('--color-main-blue', blue.toString());
  //       root.style.setProperty('--color-main-hue', hue.toString());
  //       root.style.setProperty('--color-main-saturation', saturation.toString());
  //       root.style.setProperty('--color-main-light', light.toString());
  //       break;
  //     case 'hue': 
  //       color.hue = newValue;
  //       setHue(()=> newValue);
  //       setRed(() => color.red.get);
  //       setGreen(() => color.green.get);
  //       setBlue(() => color.blue.get);
  //       setHexa(() => color.hexa);
  //       setRgbaStringCSS(() => color.rgbaStringCSS);
  //       root.style.setProperty('--color-main-hue', hue.toString());
  //       root.style.setProperty('--color-main-red', red.toString());
  //       root.style.setProperty('--color-main-green', green.toString());
  //       root.style.setProperty('--color-main-blue', blue.toString());
  //       break;
  //     case 'saturation': 
  //       color.saturation = newValue;
  //       setSaturation(() => newValue);
  //       setRed(() => color.red.get);
  //       setGreen(() => color.green.get);
  //       setBlue(() => color.blue.get);
  //       setHexa(() => color.hexa);
  //       setRgbaStringCSS(() => color.rgbaStringCSS);
  //       root.style.setProperty('--color-main-saturation', saturation.toString() + '%');
  //       root.style.setProperty('--color-main-red', red.toString());
  //       root.style.setProperty('--color-main-green', green.toString());
  //       root.style.setProperty('--color-main-blue', blue.toString());
  //       break;
  //     case 'light': 
  //       color.light = newValue;
  //       setLight(() => newValue);
  //       setRed(() => color.red.get);
  //       setGreen(() => color.green.get);
  //       setBlue(() => color.blue.get);
  //       setHexa(() => color.hexa);
  //       setRgbaStringCSS(() => color.rgbaStringCSS);
  //       root.style.setProperty('--color-main-light', light.toString() + '%');
  //       root.style.setProperty('--color-main-red', red.toString());
  //       root.style.setProperty('--color-main-green', green.toString());
  //       root.style.setProperty('--color-main-blue', blue.toString());
  //       break;
  //     case 'alpha': 
  //       color.alpha = newValue;
  //       setAlpha(() => newValue);
  //       setRgbaStringCSS(() => color.rgbaStringCSS);
  //       root.style.setProperty('--color-main-alpha', alpha.toString());
  //       break;
  //     default: 
  //       null;
  //   }
  // }