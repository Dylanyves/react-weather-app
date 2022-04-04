import React, { useState, useEffect } from 'react'
import Search from './components/Search.js'
import './App.scss';

function App() {
  const [city, setCity] = useState('London')
  const [info, setInfo] = useState()
  const [error, setError] = useState()

  const key = process.env.REACT_APP_WEATHER_API_KEY
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`

  const getDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const today = new Date()
    const date = `${days[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`

    return date
  }

  useEffect(() => {
    fetch(api)
      .then(res => {
        if (!res.ok){
          throw Error('could not fetch the data')
        } 
        return res.json()
      })
      .then(data => {
        setInfo(data)
        setError(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
      })
  }, [city])  


  return (
    <div className="app">
      <Search setCity={setCity} error={error}/> 

      {info && <h1 className='city'>{info.name}, {info.sys.country}</h1>}
      <h5 className='date'>{getDate()}</h5>
      <div>
        {info && <h4 className='temperature'>{info.main.temp}° <span className='unit'>C</span></h4>}
        {info && <p>{info.weather[0].description}</p>}
        <div className='additional-info-container'>
          {info && <span>Pressure: {info.main.pressure}</span>}
          {info && <span>Humidity: {info.main.humidity}%</span>}
          {info && <span>Wind: {info.wind.speed}km/h</span>}
        </div>
      </div>
    </div>
  );
}

export default App;
