// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [weather, setWheater] = useState({});
  const [locations, setLocations] = useState('goa');
  const [photoes, setPhotoes] = useState([])
  const [background, setBackground] = useState([])
  useEffect(() => { ifClicked(); }, [])

  const APP_ID = '187e609234bc47213e5eb8daa54b4c81'

  function ifClicked() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locations}&appid=${APP_ID}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res === 404) {
            return alert('unknown location')
          }
          alert('please enter correct place')
          throw new Error("error occured")
        }
      }).then((object) => {
        setWheater(object);
      })
      .catch((error) => console.log(error))


    const PHOTOES_APP_ID = 'SDfzDVUxurgc9V_ZAW1XRPggu2-e_tawvhfy3_GDo2I'

    fetch(`https://api.unsplash.com/search/photos?query=${locations}&client_id=${PHOTOES_APP_ID}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("error occured");
        }
      }).then((data) => {
        setPhotoes(data?.results[1]?.urls?.raw);
        setBackground(data?.results[2]?.urls?.raw)
      })
      .catch((error) => console.log(error));
  }

  return (
    <div style={{ backgroundImage : `url(${background})` ,backgroundSize : '100% 100%', height : '100vh'  }}>
      <box className='input_div' >
        <h1 className='h1'>Weather App</h1>
        <div className='input_div'>
          <input
            className="input_tag"
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
          />
          <button className="btn" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="temp">
          <img className="img" src={photoes} alt={locations} />
          <p>Current Temparature: {weather?.main?.temp}</p>
          <p>Minimum Temparature: {weather?.main?.temp_min}</p>
          <p>Maximum Temparature: {weather?.main?.temp_max}</p>
          <p>Visibility : {weather?.visibility}</p>
          <p>logitude : {weather?.coord?.lon}</p>
          <p>latitude : {weather?.coord?.lat}</p>
          <p>Wind Speed : {weather?.wind?.speed}</p>
        </div>
      </box>
    </div>
  );
}

export default App; 
