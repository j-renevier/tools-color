import { useEffect, useState } from "react";
import color, { Color, TColor } from "../../util/color";
import Plus from "../../assets/media/icon/plus";
import Minus from "../../assets/media/icon/minus";
import CercleChromatique from "../component/CercleChromatique";

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
  numberOfColors: ColorValue; 
  mainColorPosition: ColorValue; 
  interval: ColorValue; 
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
    numberOfColors: { value: color.numberOfColors, setValue: (v: IValues['numberOfColors']['value']) => setValues((prev: IValues) => ({ ...prev, numberOfColors: { value: v, setValue: prev.numberOfColors.setValue } })) },
    mainColorPosition: { value: color.mainColorPosition, setValue: (v: IValues['mainColorPosition']['value']) => setValues((prev: IValues) => ({ ...prev, mainColorPosition: { value: v, setValue: prev.mainColorPosition.setValue } })) },
    interval: { value: color.interval.get, setValue: (v: IValues['interval']['value']) => setValues((prev: IValues) => ({ ...prev, interval: { value: v, setValue: prev.interval.setValue } })) },
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
    root.style.setProperty('--ligh-color-text',  (Number(values.light.value) > 60? '0' : '100%'))
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


  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value:string) => {
    const colorName = value as keyof Color
    const valuesName = value as keyof typeof values
    const currentValue = values[valuesName].value;
    if (typeof currentValue === 'number') {
      color[colorName] = currentValue - 1;
      if(['numberOfColors', 'mainColorPosition', 'interval'].includes(colorName)){
        values[colorName].setValue(color[colorName]);
      } else {
        updateValues()
      }
    }
  }

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value:string) => {
    const colorName = value as keyof Color
    const valuesName = value as keyof typeof values
    const currentValue = values[valuesName].value;
    if (typeof currentValue === 'number') {
      color[colorName] = currentValue + 1;
      if(['numberOfColors', 'mainColorPosition', 'interval'].includes(colorName)){
        values[colorName].setValue(color[colorName]);
      } else {
        updateValues()
      }
    }
  }

  const handleCrement = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value:string, step:number) => {
    const colorName = value as keyof Color
    const valuesName = value as keyof typeof values
    const currentValue = values[valuesName].value;
    if (typeof currentValue === 'number') {
      color[colorName] = currentValue + step;
      console.log(color[colorName])
      if(['numberOfColors', 'mainColorPosition', 'interval'].includes(colorName)){
        console.log(values[colorName].value)
        values[colorName].setValue(color[colorName].get);
        console.log(values[colorName].value)
      } else {
        updateValues()
      }
    }
  }

  const handleDecrementAlpha = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const colorName = 'alpha' as keyof Color
    const valuesName = 'alpha' as keyof typeof values
    const currentValue = values[valuesName].value;
    if (typeof currentValue === 'number') {
      color[colorName] = currentValue - 0.01;
      updateValues()
    }
  }

  const handleIncrementAlpha = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const colorName = 'alpha' as keyof Color
    const valuesName = 'alpha' as keyof typeof values
    const currentValue = values[valuesName].value;
    if (typeof currentValue === 'number') {
      color[colorName] = currentValue + 0.01;
      updateValues()
    }
  }

  const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, valueName:string, value:number) => {
    const colorName = valueName as keyof Color
    color[colorName] = value;
    if(['numberOfColors', 'mainColorPosition'].includes(colorName)){
      values[colorName].setValue(color[colorName]);
    } else if(['interval'].includes(colorName)){
      values[colorName].setValue(color[colorName].get);
    } else {
      updateValues()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== ''){
      const name = event.target.name as keyof Color
      color[name] = Number(event.target.value)
      if(['numberOfColors', 'mainColorPosition'].includes(name)){
        values[name].setValue(color[name]);
      } else if(['interval'].includes(name)){
        values[name].setValue(color[name].get);
      }else {
        updateValues()
      }
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
    <div>
      <h1>Generate beautiful gradients</h1>
      <div className="parametre">
        <h2>Parametres</h2>
        <div>
          <div className="main_color">
            <h3>Couleur principale</h3>
            <div className="main_color-container">
              <label className="main_color-content color_picker" >
                <input type="color" id="main_color-content color_picker" value={values.hexa.value} onChange={(event)=>handleChangeInputTypeColor(event)}/>
                <div className="main_color-content static_value">
                  <h4 className="color_model">RGB:</h4>
                  <h4 className="color_model_value">{values.red.value}, {values.green.value}, {values.blue.value}</h4>
                  <h4 className="color_model">HSL:</h4>
                  <h4 className="color_model_value">{values.hue.value}, {values.saturation.value}, {values.light.value}</h4>
                  <h4 className="color_model">Alpha:</h4>
                  <h4 className="color_model_value">{values.alpha.value}</h4>
                </div>
              </label>
              
              <div className="main_color-content number_picker">
                <div className="color-mode">
                  <h3>RGB</h3> 
                  <label htmlFor="inputNumberRed" className="param red">
                    <div className="value_name">
                      <h4>Rouge</h4>
                    </div>
                    <div className="value red">
                      <button className="button decrement" onClick={(event)=>handleDecrement(event, 'red')}><Minus/></button>
                      <input type="number" className="color_picker number_picker red" id="inputNumberRed" name="red" min="0" minLength={0} max="255" step="1" onKeyDown={(event)=>handleKeyDown(event)}  value={values.red.value} onChange={(event)=>{handleChange(event)}}/>
                      <button className="button increment" onClick={(event)=>handleIncrement(event, 'red')}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'red', 0)}>0</button>
                    <input type="range" className="color_picker range_picker red" id="inputRangeRed" name="red" min="0" max="255" step="1"  value={values.red.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="max button" onClick={(event)=>handleReset(event, 'red', 255)}>255</button>
                  </label>
                  
                  <label htmlFor="inputNumberGreen" className="param green">
                    <div className="value_name">
                      <h4>Vert</h4>
                    </div>
                    <div className="value green">
                      <button className="button decrement" onClick={(event)=>handleDecrement(event, 'green')}><Minus/></button>
                      <input type="number" className="color_picker number_picker green" id="inputNumberGreen" name="green" min="0" max="255" step="1"  value={values.green.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                      <button className="button increment" onClick={(event)=>handleIncrement(event, 'green')}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'green', 0)}>0</button>
                    <input type="range" className="color_picker range_picker green" id="inputRangeGreen" name="green" min="0" max="255" step="1"  value={values.green.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="max button" onClick={(event)=>handleReset(event, 'green', 255)}>255</button>
                  </label>
                  
                  <label htmlFor="inputNumberBlue" className="param blue">
                    <div className="value_name">
                      <h4>Bleu</h4>
                    </div>
                    <div className="value blue">
                      <button className="button decrement" onClick={(event)=>handleDecrement(event, 'blue')}><Minus/></button>
                      <input type="number" className="color_picker number_picker blue" id="inputNumberBlue" name="blue" min="0" max="255" step="1"  value={values.blue.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                      <button className="button increment" onClick={(event)=>handleIncrement(event, 'blue')}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'blue', 0)}>0</button>
                    <input type="range" className="color_picker range_picker blue" id="inputRangeBlue" name="blue" min="0" max="255" step="1"  value={values.blue.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="max button" onClick={(event)=>handleReset(event, 'blue', 255)}>255</button>
                  </label>
                </div>
                <div className="color-mode">
                  <h3>HSL</h3>
                  <label htmlFor="inputHue" className="param hue">
                    <div className="value_name">
                      <h4>Teinte</h4>
                    </div>
                    <div className="value hue">
                      <button className="button decrement" onClick={(event)=>handleDecrement(event, 'hue')}><Minus/></button>
                      <input type="number" className="color_picker number_picker hue" id="inputNumberHue" name="hue" min="0" max="360" step="1"  value={values.hue.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                      <button className="button increment" onClick={(event)=>handleIncrement(event, 'hue')}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'hue', 0)}>0</button>
                    <input type="range" className="color_picker range_picker hue" id="inputRangeHue" name="hue" min="0" max="360" step="1"  value={values.hue.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="max button" onClick={(event)=>handleReset(event, 'hue', 359)}>360</button>
                  </label>
                  
                  <label htmlFor="inputSaturation" className="param saturation">
                    <div className="value_name">
                      <h4>Saturation</h4>
                    </div>
                    <div className="value saturation">
                      <button className="button decrement" onClick={(event)=>handleDecrement(event, 'saturation')}><Minus/></button>
                      <input type="number" className="color_picker number_picker saturation" id="inputNumberSaturation" name="saturation" min="0" max="100" step="1"  value={values.saturation.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                      <button className="button increment" onClick={(event)=>handleIncrement(event, 'saturation')}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'saturation', 0)}>0</button>
                    <input type="range" className="color_picker range_picker saturation" id="inputRangeSaturation" name="saturation" min="0" max="100" step="1"  value={values.saturation.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="max button" onClick={(event)=>handleReset(event, 'saturation', 100)}>100</button>
                  </label>
                  
                  <label htmlFor="inputLight" className="param light">
                    <div className="value_name">
                      <h4>Luminosité</h4>
                    </div>
                    <div className="value light">
                      <button className="button decrement" onClick={(event)=>handleDecrement(event, 'light')}><Minus/></button>
                      <input type="number" className="color_picker number_picker light" id="inputNumberLight" name="light" min="0" max="100" step="1"  value={values.light.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                      <button className="button increment" onClick={(event)=>handleIncrement(event, 'light')}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'light', 0)}>0</button>
                    <input type="range" className="color_picker range_picker light" id="inputRangeLight" name="light" min="0" max="100" step="1"  value={values.light.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="max button" onClick={(event)=>handleReset(event, 'light', 100)}>100</button>
                  </label>
                </div>

                <div className="color-mode">
                  <h3>Alpha</h3>
                  <label htmlFor="inputAlpha" className="param alpha">
                    <div className="value_name">
                      <h4>Alpha</h4>
                    </div>
                    <div className="value alpha">
                      <button className="button decrement" onClick={(event)=>handleDecrementAlpha(event)}><Minus/></button>
                      <input type="number" className="color_picker number_picker light" id="inputNumberLight" name="light" min="0" max="1" step="0.01"  value={values.alpha.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                      <button className="button increment" onClick={(event)=>handleIncrementAlpha(event)}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'alpha', 0)}>0</button>
                    <input type="range" className="color_picker range_picker alpha" id="inputRangeAlpha" name="alpha" min="0" max="1" step="0.01"  value={values.alpha.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="max button" onClick={(event)=>handleReset(event, 'alpha', 1)}>1</button>
                  </label>
                </div>
              </div>
              <div className="main_color-content color_wheel">
                <CercleChromatique colors={[color, new Color({r: 255, g: 0, b: 0}), new Color({r: 0, g: 0, b: 0})]}/>
              </div>
              <div className="main_color-content color_gradient">
                <div className="parametre_gradient">
                  <label htmlFor="numberOfColors" className="param numberOfColors">
                    <div className="value_name_numbers">
                      <h4>Nombre de couleurs</h4>
                    </div>
                    <div className="value numberOfColors">
                      <button className="button decrement" onClick={(event)=>handleDecrement(event, 'numberOfColors')}><Minus/></button>
                      <input type="number" className="color_picker number_picker numberOfColors" id="inputNumberNumberOfColors" name="numberOfColors" min="2" minLength={1} step="1" onKeyDown={(event)=>handleKeyDown(event)}  value={values.numberOfColors.value} onChange={(event)=>{handleChange(event)}}/>
                      <button className="button increment" onClick={(event)=>handleIncrement(event, 'numberOfColors')}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'numberOfColors', 2)}>2</button>
                    <input type="range" className="color_picker range_picker numberOfColors" id="inputRangeNumberOfColors" name="numberOfColors" min="2" step="1"  value={values.numberOfColors.value} onChange={(event)=>{handleChange(event)}}/>
                    {/* <button className="max button" onClick={(event)=>handleReset(event, 'numberOfColors', 10)}>10</button> */}
                  </label>

                  <label htmlFor="mainColorPosition" className="param mainColorPosition">
                    <div className="value_name_numbers">
                      <h4>Position de la couleur principale</h4>
                    </div>
                    <div className="value mainColorPosition">
                      <button className="button decrement" onClick={(event)=>handleDecrement(event, 'mainColorPosition')}><Minus/></button>
                      <input type="number" className="color_picker number_picker mainColorPosition" id="inputNumberMainColorPosition" name="mainColorPosition" min="1" minLength={1} step="1" onKeyDown={(event)=>handleKeyDown(event)}  value={values.mainColorPosition.value} onChange={(event)=>{handleChange(event)}}/>
                      <button className="button increment" onClick={(event)=>handleIncrement(event, 'mainColorPosition')}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'mainColorPosition', 1)}>1</button>
                    <input type="range" className="color_picker range_picker mainColorPosition" id="inputRangeMainColorPosition" name="mainColorPosition" min="1" step="1"  value={values.mainColorPosition.value} onChange={(event)=>{handleChange(event)}}/>
                    {/* <button className="max button" onClick={(event)=>handleReset(event, 'mainColorPosition', 10)}>10</button> */}
                  </label>

                  <label htmlFor="interval" className="param interval">
                    <div className="value_name_numbers">
                      <h4>Ecartement</h4>
                    </div>
                    <div className="value interval">
                      <button className="button decrement" onClick={(event)=>handleCrement(event, 'interval', -0.01)}><Minus/></button>
                      <input type="number" className="color_picker number_picker light" id="inputNumberLight" name="interval" min="0" max="1" step="0.01"  value={values.interval.value} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                      <button className="button increment" onClick={(event)=>handleCrement(event, 'interval', 0.01)}><Plus/></button>
                    </div>
                    <button className="min button" onClick={(event)=>handleReset(event, 'interval', 0)}>0</button>
                    <input type="range" className="color_picker range_picker interval" id="inputRangeInterval" name="interval" min="0" max="1" step="0.01"  value={values.interval.value} onChange={(event)=>{handleChange(event)}}/>
                    <button className="max button" onClick={(event)=>handleReset(event, 'interval', 1)}>1</button>
                  </label>

                  
                </div>


                {/*<div className="complementary">
                  <ul>
                    {color.complementaryColors.map((color, index) => (
                      <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
                        {color.rgbaStringCSS}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="complementary_divide">
                  <ul>
                    {color.complementaryDivideColors.map((color, index) => (
                      <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
                        {color.rgbaStringCSS}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="complementary_twice">
                  <ul>
                    {color.complementaryTwiceColors.map((color, index) => (
                      <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
                        {color.rgbaStringCSS}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="polyhedron">
                  <ul>
                    {color.polyhedronColors.map((color, index) => (
                      <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
                        {color.rgbaStringCSS}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="polygon">
                  <ul>
                    {color.polygonColors.map((color, index) => (
                      <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
                        {color.rgbaStringCSS}
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div className="analog">
                  <ul className="display_gradient">
                    {color.analogColors.map((color, index) => (
                      <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
                        <span>{color.rgbaStringCSS}</span>
                        <span>{color.hslStringCSS}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="show_gradient" style={{ 
                      background: `linear-gradient(90deg,${color.analogColors.map(c => c.rgbaStringCSS).join(', ')})`
                    }}>
                  </div>
                </div>
                <div className="complementary">
                  <ul className="display_gradient">
                    {color.complementaryColors.map((color, index) => (
                      <li key={index} style={{ backgroundColor: color.rgbaStringCSS }}>
                        <span>{color.rgbaStringCSS}</span>
                        <span>{color.hslStringCSS}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="show_gradient" style={{ 
                      background: `linear-gradient(90deg,${color.complementaryColors.map(c => c.rgbaStringCSS).join(', ')})`
                    }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootPage;



