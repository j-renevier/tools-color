import { useState } from "react";
import { Color } from "../../util/color";

const RootPage = () => {


  function useState(initialValue:any) {
    let state = initialValue;
  
    function getState() {
      return state;
    }
  
    function setState(newValue:any) {
      state = newValue;
      notifyChange();
    }
  
    const listeners:any = [];
  
    function notifyChange() {
      listeners.forEach((listener:any) => listener(state));
    }
  
    function subscribe(listener:any) {
      listeners.push(listener);
    }
  
    function unsubscribe(listener:any) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  
    return [getState, setState, subscribe, unsubscribe];
  }
  
  // Exemple d'utilisation
  const [getColor, setColor, subscribeToColor, unsubscribeFromColor] = useState('red');
  
  // Fonction pour réagir aux changements de couleur
  function handleColorChange(newColor:any) {
    console.log('Color changed to:', newColor);
  }
  
  // S'abonner aux changements de couleur
  subscribeToColor(handleColorChange);
  
  console.log(); // red
  
  setColor('blue'); // Color changed to: blue
  console.log(getColor); // blue
  
  // Désabonner aux changements de couleur
  unsubscribeFromColor(handleColorChange);
  
  setColor('green'); // Pas de notification
  console.log(getColor); // green



  return (
    <div className="main">
      <header>
        <h1>Generate beautiful gradients</h1>
        <div>
          <h2>Parametres</h2>
          <div>
            <div>
              <label htmlFor="inputMainColor">Main color</label>
              <input type="color" id="inputMainColor"/>
              <h4>rgb: </h4>
              <h4>hsl: </h4>
              <h4>alpha: </h4>
            </div>
            <div>
              <div>
                <h3>RGB</h3>
                <label htmlFor="inputRed">Rouge</label>
                <input type="range" id="inputRed" name="red" min="0" max="255" step="1" value="0"/>
                
                <label htmlFor="inputGreen">Vert</label>
                <input type="range" id="inputGreen" name="green" min="0" max="255" step="1" value="0"/>
                
                <label htmlFor="inputBlue">Bleu</label>
                <input type="range" id="inputBlue" name="blue" min="0" max="255" step="1" value="0"/>
              </div>
              <div>
                <h3>HSL</h3>
                <label htmlFor="inputHue">Teinte</label>
                <input type="range" id="inputHue" name="hue" min="0" max="360" step="1" value="0"/>
                
                <label htmlFor="inputSaturation">Saturation</label>
                <input type="range" id="inputSaturation" name="saturation" min="0" max="100" step="1" value="0"/>
                
                <label htmlFor="inputLuminosity">Luminosité</label>
                <input type="range" id="inputLuminosity" name="luminosity" min="0" max="100" step="1" value="0"/>
              </div>
              <div>
                <h3>HSL</h3>
                <label htmlFor="inputAlpha">Alpha</label>
                <input type="range" id="inputAlpha" name="alpha" min="0" max="1" step="0.01" value="0"/>
              </div>
            </div>
            <div>
              <button className="button">Generate random main color</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default RootPage;