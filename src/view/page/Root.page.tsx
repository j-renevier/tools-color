import { useEffect, useState } from "react";
import color, { Color } from "../../util/Color";
import Plus from "../../assets/media/icon/plus";
import Minus from "../../assets/media/icon/minus";
import { ErrorMessage } from "../../util/ErrorMessage";
import { Octet } from "../../util/colorType";

const mainColorStyle = (color:string) => {
  return {
    background: color
  }
}

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

  
  const [red, setRed] = useState(color.red.get);
  const [green, setGreen] = useState(color.green.get);
  const [blue, setBlue] = useState(color.blue.get);
  const [hue, setHue] = useState(color.hue.get);
  const [saturation, setSaturation] = useState(color.saturation.get);
  const [light, setLight] = useState(color.light.get);
  const [alpha, setAlpha] = useState(color.alpha.get);
  const [hexa, setHexa] = useState(color.hexa);
  const [rgbaStringCSS, setRgbaStringCSS] = useState(color.rgbaStringCSS);

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

  const [values, setValues]: Array<IValues, (v: IValues) => void> = useState({
    red: { value: color.red.get, setValue: (v: typeof values.red.value) => setValues((prev: typeof values) => ({ ...prev, red: { value: v, setValue: prev.red.setValue } })) },
    green: { value: color.green.get, setValue: (v: typeof values.green.value) => setValues((prev: typeof values) => ({ ...prev, green: { value: v, setValue: prev.green.setValue } })) },
    blue: { value: color.blue.get, setValue: (v: typeof values.blue.value) => setValues((prev: typeof values) => ({ ...prev, blue: { value: v, setValue: prev.blue.setValue } })) },
    hue: { value: color.hue.get, setValue: (v: typeof values.hue.value) => setValues((prev: typeof values) => ({ ...prev, hue: { value: v, setValue: prev.hue.setValue } })) },
    saturation: { value: color.saturation.get, setValue: (v: typeof values.saturation.value) => setValues((prev: typeof values) => ({ ...prev, saturation: { value: v, setValue: prev.saturation.setValue } })) },
    light: { value: color.light.get, setValue: (v: typeof values.light.value) => setValues((prev: typeof values) => ({ ...prev, light: { value: v, setValue: prev.light.setValue } })) },
    alpha: { value: color.alpha.get, setValue: (v: typeof values.alpha.value) => setValues((prev: typeof values) => ({ ...prev, alpha: { value: v, setValue: prev.alpha.setValue } })) },
    hexa: { value: color.hexa, setValue: (v: typeof values.hexa.value) => setValues((prev: typeof values) => ({ ...prev, hexa: { value: v, setValue: prev.hexa.setValue } })) },
    rgbaStringCSS: { value: color.rgbaStringCSS, setValue: (v: typeof values.rgbaStringCSS.value) => setValues((prev: typeof values) => ({ ...prev, rgbaStringCSS: { value: v, setValue: prev.rgbaStringCSS.setValue } })) }
  });

  let root = document.documentElement
  values.

  useEffect(()=> {
    root.style.setProperty('--color-main-red', red.toString())
    root.style.setProperty('--color-main-green', green.toString())
    root.style.setProperty('--color-main-blue', blue.toString())
    root.style.setProperty('--color-main-hue', hue.toString())
    root.style.setProperty('--color-main-saturation', saturation.toString() + '%')
    root.style.setProperty('--color-main-light', light.toString() + '%')
    root.style.setProperty('--color-main-alpha', alpha.toString())
  })

  const changeColor = (newValue: number, name: string) => {
    switch(name){
      case 'red': 
        color.red = newValue;
        setRed(() => newValue);
        setHue(() => color.hue.get);
        setSaturation(() => color.saturation.get);
        setLight(() => color.light.get);
        setHexa(() => color.hexa);
        setRgbaStringCSS(() => color.rgbaStringCSS);
        root.style.setProperty('--color-main-red', red.toString());
        root.style.setProperty('--color-main-hue', hue.toString());
        root.style.setProperty('--color-main-saturation', saturation.toString());
        root.style.setProperty('--color-main-light', light.toString());
        break;
      case 'green': 
        color.green = newValue;
        setGreen(() => newValue);
        setHue(() => color.hue.get);
        setSaturation(() => color.saturation.get);
        setLight(() => color.light.get);
        setHexa(() => color.hexa);
        setRgbaStringCSS(() => color.rgbaStringCSS);
        root.style.setProperty('--color-main-green', green.toString());
        root.style.setProperty('--color-main-hue', hue.toString());
        root.style.setProperty('--color-main-saturation', saturation.toString());
        root.style.setProperty('--color-main-light', light.toString());
        break;
      case 'blue': 
        color.blue = newValue;
        setBlue(() => newValue);
        setHue(() => color.hue.get);
        setSaturation(() => color.saturation.get);
        setLight(() => color.light.get);
        setHexa(() => color.hexa);
        setRgbaStringCSS(() => color.rgbaStringCSS);
        root.style.setProperty('--color-main-blue', blue.toString());
        root.style.setProperty('--color-main-hue', hue.toString());
        root.style.setProperty('--color-main-saturation', saturation.toString());
        root.style.setProperty('--color-main-light', light.toString());
        break;
      case 'hue': 
        color.hue = newValue;
        setHue(()=> newValue);
        setRed(() => color.red.get);
        setGreen(() => color.green.get);
        setBlue(() => color.blue.get);
        setHexa(() => color.hexa);
        setRgbaStringCSS(() => color.rgbaStringCSS);
        root.style.setProperty('--color-main-hue', hue.toString());
        root.style.setProperty('--color-main-red', red.toString());
        root.style.setProperty('--color-main-green', green.toString());
        root.style.setProperty('--color-main-blue', blue.toString());
        break;
      case 'saturation': 
        color.saturation = newValue;
        setSaturation(() => newValue);
        setRed(() => color.red.get);
        setGreen(() => color.green.get);
        setBlue(() => color.blue.get);
        setHexa(() => color.hexa);
        setRgbaStringCSS(() => color.rgbaStringCSS);
        root.style.setProperty('--color-main-saturation', saturation.toString() + '%');
        root.style.setProperty('--color-main-red', red.toString());
        root.style.setProperty('--color-main-green', green.toString());
        root.style.setProperty('--color-main-blue', blue.toString());
        break;
      case 'light': 
        color.light = newValue;
        setLight(() => newValue);
        setRed(() => color.red.get);
        setGreen(() => color.green.get);
        setBlue(() => color.blue.get);
        setHexa(() => color.hexa);
        setRgbaStringCSS(() => color.rgbaStringCSS);
        root.style.setProperty('--color-main-light', light.toString() + '%');
        root.style.setProperty('--color-main-red', red.toString());
        root.style.setProperty('--color-main-green', green.toString());
        root.style.setProperty('--color-main-blue', blue.toString());
        break;
      case 'alpha': 
        color.alpha = newValue;
        setAlpha(() => newValue);
        setRgbaStringCSS(() => color.rgbaStringCSS);
        root.style.setProperty('--color-main-alpha', alpha.toString());
        break;
      default: 
        null;
    }
  }

  const [red, setRed] = useState(color.red.get);
  const handleIncrement = (event: React.ChangeEvent<HTMLInputElement>) => {

    value = usestate with the name: event.target.name

    changeColor(( value + 1), event.target.name)
    
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== ''){
      changeColor(Number(event.target.value), event.target.name)
    }
  }



  


  const handleKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if(event.key === "Backspace" && input.value.length === 1){
      event.preventDefault();
      input.value = ''
    }
  }

  const handleChangeInputColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    color.hexa = event.target.value
    setHexa(() => event.target.value);
    setRed(() => color.red.get);
    setGreen(() => color.green.get);
    setBlue(() => color.blue.get);
    setHue(() => color.hue.get);
    setSaturation(() => color.saturation.get);
    setLight(() => color.light.get);
    setRgbaStringCSS(() => color.rgbaStringCSS);
    root.style.setProperty('--color-main-red', red.toString())
    root.style.setProperty('--color-main-green', green.toString())
    root.style.setProperty('--color-main-blue', blue.toString())
    root.style.setProperty('--color-main-hue', hue.toString() + '%')
    root.style.setProperty('--color-main-saturation', saturation.toString() + '%')
    root.style.setProperty('--color-main-light', light.toString())
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
                <label className="main_color color_picker"  style={{background: rgbaStringCSS}}>
                  <input type="color" id="main_color color_picker" value={hexa} onChange={(event)=>handleChangeInputColor(event)}/>
                </label>
                <div className="main_color static_value">
                  <h4 className="color_model">RGB:</h4>
                  <h4 className="color_model_value">{red}, {green}, {blue}</h4>
                  <h4 className="color_model">HSL:</h4>
                  <h4 className="color_model_value">{hue}, {saturation}, {light}</h4>
                  <h4 className="color_model">Alpha:</h4>
                  <h4 className="color_model_value">{alpha}</h4>
                </div>
              </div>
            </div>

            <div className="number_picker">
              <div>
                <h3>RGB</h3> 
                <label htmlFor="inputNumberRed" className="param red">
                  <h4 className="value_name">Rouge</h4>
                  <div className="value red">
                    <button className="button increment" name="red"><Minus/></button>
                    <input type="number" className="color_picker number_picker red" id="inputNumberRed" name="red" min="0" minLength={0} max="255" step="1" onKeyDown={(event)=>handleKeyDown(event)}  value={red} onChange={(event)=>{handleChange(event)}}/>
                    <button className="button decrement" name="red"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker red gradient-border" id="inputRangeRed" name="red" min="0" max="255" step="1"  value={red} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">255</button>
                </label>
                
                <label htmlFor="inputNumberGreen" className="param green">
                  <h4 className="value_name">Vert</h4>
                  <div className="value green">
                    <button className="button increment" name="green"><Minus/></button>
                    <input type="number" className="color_picker number_picker green" id="inputNumberGreen" name="green" min="0" max="255" step="1"  value={green} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="green"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker green" id="inputRangeGreen" name="green" min="0" max="255" step="1"  value={green} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">255</button>
                </label>
                
                <label htmlFor="inputNumberBlue" className="param blue">
                  <h4 className="value_name">Bleu</h4>
                  <div className="value blue">
                    <button className="button increment" name="blue"><Minus/></button>
                    <input type="number" className="color_picker number_picker blue" id="inputNumberBlue" name="blue" min="0" max="255" step="1"  value={blue} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="blue"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker blue" id="inputRangeBlue" name="blue" min="0" max="255" step="1"  value={blue} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">255</button>
                </label>
              </div>
              <div>
                <h3>HSL</h3>
                <label htmlFor="inputHue" className="param hue">
                  <h4 className="value_name">Teinte</h4>
                  <div className="value hue">
                    <button className="button increment" name="hue"><Minus/></button>
                    <input type="number" className="color_picker number_picker hue" id="inputNumberHue" name="hue" min="0" max="360" step="1"  value={hue} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="hue"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker hue" id="inputRangeHue" name="hue" min="0" max="360" step="1"  value={hue} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">360</button>
                </label>
                
                <label htmlFor="inputSaturation" className="param saturation">
                  <h4 className="value_name">Saturation</h4>
                  <div className="value saturation">
                    <button className="button increment" name="saturation"><Minus/></button>
                    <input type="number" className="color_picker number_picker saturation" id="inputNumberSaturation" name="saturation" min="0" max="100" step="1"  value={saturation} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="saturation"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker saturation" id="inputRangeSaturation" name="saturation" min="0" max="100" step="1"  value={saturation} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">100</button>
                </label>
                
                <label htmlFor="inputLight" className="param light">
                  <h4 className="value_name">Luminosité</h4>
                  <div className="value light">
                    <button className="button increment" name="light"><Minus/></button>
                    <input type="number" className="color_picker number_picker light" id="inputNumberLight" name="light" min="0" max="100" step="1"  value={light} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="light"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker light" id="inputRangeLight" name="light" min="0" max="100" step="1"  value={light} onChange={(event)=>{handleChange(event)}}/>
                  <button className="max button">100</button>
                </label>
              </div>
              <div>
                <h3>Alpha</h3>
                <label htmlFor="inputAlpha" className="param alpha">
                  <h4 className="value_name">Alpha</h4>
                  <div className="value alpha">
                    <button className="button increment" name="alpha"><Minus/></button>
                    <input type="number" className="color_picker number_picker alpha" id="inputNumberAlpha" name="alpha" min="0" max="1" step="0.01"  value={alpha} onChange={(event)=>{handleChange(event)}} onKeyDown={(event)=>handleKeyDown(event)}/>
                    <button className="button decrement" name="alpha"><Plus/></button>
                  </div>
                  <button className="min button">0</button>
                  <input type="range" className="color_picker range_picker alpha" id="inputRangeAlpha" name="alpha" min="0" max="1" step="0.01"  value={alpha} onChange={(event)=>{handleChange(event)}}/>
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