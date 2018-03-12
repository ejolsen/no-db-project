import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(){
    super();

    this.state = {
      temp: '',
      totalWX: '',
      windSP: '',
      windDir: '',
      skyCond: '' ,
      humid: '',
      date_time: '',
      wxLOG: []
    }

    this.handleClick = this.handleClick.bind(this)

  }

  handleClick(){
    axios.get('http://api.openweathermap.org/data/2.5/weather?id=5780026&appid=50c6f5fac3af19b46f811c53c4cacdfc')
      .then(res => {
        let temp = Math.round((res.data.main.temp-273.15)*9/5+32)
        let windSP = Math.round(res.data.wind.speed* 2.2369);
        let windDir = res.data.wind.deg;
        let skyCond= res.data.weather[0].description;
        let humid= res.data.main.humidity;
        let date_time = new Date()

            this.setState({
                totalWX:res.data,
                temp:temp,
                windSP: windSP,
                windDir: windDir,
                skyCond: skyCond ,
                humid: humid,
                date_time:date_time
            })

            axios.put(`/api/weather/${date_time}/${temp}/${skyCond}`).then(res=>{
              this.setState ({
                wxLOG:res.data
              })
            })
      })
  }

  deleteLog(id){
    axios.delete(`/api/weather/${ id }`).then( results => {
      this.setState({ wxLOG: results.data});
    }
  )}
    
   


  render() {
    const mainTemp= this.state.temp
    const mainWindSP= this.state.windSP
    const mainWindDir= this.state.windDir
    const mainSky= this.state.skyCond
    const mainHumid= this.state.humid
    const weatherList = this.state.wxLOG.map((wX, i) => {
      return ( 
       <div> 
        
        <div>Date: {wX.date_time}<button className='deleteButton' onClick={ () => this.deleteLog(wX.id)}>
         Delete Log</button></div>
        <div>Sky Condition: {wX.skyCond}</div>         
        <div>Temperature: {wX.temp}</div> 
        <div className="lastLogLine">Comments:</div>
        </div>
      )
    })

    return (
      <div>
      
      <header className='headContain'>
        <div className='title'>Provo Weather App</div>
        <button className='temp-button' onClick={this.handleClick}>Get Current Weather</button>
      </header>
      
      <div className='mainContainer'>
        <div className='sky-title'>Current Weather Conditions</div>
        {mainSky?<div className='sky-display'>{mainSky}</div>:null}
        <div className='temp-title'>Temperature</div>
        {mainTemp?<div className='temp-display'>{mainTemp}°F</div>:null}
        <div className='wind-title'>Wind</div>
        {mainWindSP && mainWindDir?<div className='wind-display'>
        <div>Speed: {mainWindSP} mph</div>
        <div>Direction: {mainWindDir}°</div>
        </div>:null}
        <div className='humid-title'>Humidity</div>
        {mainHumid?<div className='humid-display'>{mainHumid}%</div>:null}
      </div>

      <footer className='myFoot'>
        <div className='weatherList-title'>Weather Log:
         </div>
        <div className='weatherList'>{weatherList}</div>
     </footer>
      
      </div>
      
    );
  }
}

export default App;
