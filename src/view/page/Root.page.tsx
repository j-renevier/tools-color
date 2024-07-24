const RootPage = () => {

  const x = 11; 
  const y = 0xB; 
  const z = 'B'; 
  console.log(x, typeof x, x.toString(16), typeof x.toString(16))
  console.log(y, typeof y, y.toString(16), typeof y.toString(16))
  console.log(y + x )
 
  console.log(z, typeof z, parseInt(z, 16)+ x)



  return (
    <div className="main">
      <header>
        <h1>Generate beautiful gradients</h1>
        <div>
          <h2>Parametres</h2>
          <div>
            <div>
              <label htmlFor="inputMainColor">Select main color</label>
              <input type="color" id="inputMainColor"/>
            </div>
            <div id="picker" className="colorPicker"></div>
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