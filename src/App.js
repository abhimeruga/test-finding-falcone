import React, { Component } from 'react'
import Dropdown from './Components/Dropdown/Dropdown.component'
import Radio from './Components/Radio/Radio.component'
import './App.css'
import axios from 'axios'

export class App extends Component {
constructor(props) {
  super(props)

  this.state = {
     planets : [],
     vehicles : [],
     destinations : {
      dest_1 : '',
      dest_2 : '',
      dest_3 : '',
      dest_4 : ''
    },
    value:'select',
    totalTime : 0,
    countTime : 0,
    vehiclesPost: []
  }
}

planetPosts = [];
  componentDidMount() {
    fetch('https://findfalcone.herokuapp.com/planets')
    .then(res=> res.json())
    .then((result)=>{
      console.log(result);
      this.setState(()=> ({
        planets: result
      })) 
    })
    .catch((e)=>{console.log(e)})

    fetch('https://findfalcone.herokuapp.com/vehicles')
    .then(res=> res.json())
    .then((result)=>{
      console.log(result);
      this.setState(()=> ({
        vehicles: result
      })) 
    })
    .catch((e)=>{console.log(e)})

  }

  handlePlanets = (e) => {
    if (this.state.planets.length > 2){
      const filterPlanets = this.state.planets.filter(planet => {
        this.planetPosts.push(planet.name)
        return(
            (planet.name !== e.target.value)
          )
        })
        this.setState({
          planets: filterPlanets
        })
        
    }
   
  }

  setStateDropdownDes1 = (e) => {
    const value = e.target.value
    this.handlePlanets(e)
    this.setState(
      {
       destinations : {...this.state.destinations, dest_1:value}
      }
     )
  }
  setStateDropdownDes2 = (e) => {
    const value = e.target.value
    this.handlePlanets(e)
    this.setState(
      {
       destinations : {...this.state.destinations, dest_2:value}
      }
     )
  }
  setStateDropdownDes3 = (e) => {
    const value = e.target.value
    this.handlePlanets(e)
    this.setState(
      {
       destinations : {...this.state.destinations, dest_3:value}
      }
     )
  }
  setStateDropdownDes4 = (e) => {
    const value = e.target.value
    this.handlePlanets(e)
    this.setState(
      {
       destinations : {...this.state.destinations, dest_4:value}
      }
     )
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  calculate  = (time, planets) => {
    this.setState({...this.state, totalTime: this.state.totalTime + parseInt(time)},
    
      ()=>{
        console.log(time, this.state)
      })
      this.setState((state) =>({
        countTime : state.countTime + 1
      }))
      this.setState({
        vehiclesPost : planets
      })
  }
  findFalcone = () => {
    axios.post('https://findfalcone.herokuapp.com/token',{})
    .then(result => {
      axios.post('https://findfalcone.herokuapp.com/find', {
        token: result,
        planet_names : this.planetPosts,
        vehicle_names : this.state.vehiclesPost
      })
      .then(res=>console.log(res))
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <h1>Finding Falcone!</h1>
      <div className="main">
      <div className="destination">
          <div className="dropdown">
            <h4>Destination 1</h4>
              <Dropdown 
                value={this.state.destinations.dest_1} 
                planets = {this.state.planets} 
                handlePlanets = {(e)=>{ this.setStateDropdownDes1(e) }}/>
          </div>
          <div className="radio">
              {this.state.destinations.dest_1 && 
              <Radio 
                name="dest1" 
                vehicles = {this.state.vehicles}
                calculate = {this.calculate} />}
          </div>
        </div>

        <div className="destination">
          <div className="dropdown">
          <h4>Destination 2</h4>
              <Dropdown 
                value={this.state.destinations.dest_2} 
                planets = {this.state.planets} 
                handlePlanets = {(e)=>{ this.setStateDropdownDes2(e) }}/> 
          </div>
          <div className="radio">
          {this.state.destinations.dest_2 && 
              <Radio 
                name="dest2" 
                vehicles = {this.state.vehicles} 
                calculate = {this.calculate} />}
          </div>
        </div>

        <div className="destination">
          <div className="dropdown">
          <h4>Destination 3</h4>
              <Dropdown 
                value={this.state.destinations.dest_3} 
                planets = {this.state.planets} 
                handlePlanets = {(e)=>{ this.setStateDropdownDes3(e) }}/> 
          </div>

          <div className="radio">
          {this.state.destinations.dest_3 && 
              <Radio 
                name="dest3" 
                vehicles = {this.state.vehicles} 
                calculate = {this.calculate} />}
          </div>
        </div>

        <div className="destination">
          <div className="dropdown">
          <h4>Destination 4</h4>
              <Dropdown 
                value={this.state.destinations.dest_4} 
                planets = {this.state.planets} 
                handlePlanets = {(e)=>{ this.setStateDropdownDes4(e) }}/> 
          </div>
          <div className="radio">
          {this.state.destinations.dest_4 && 
              <Radio 
                name="dest4" 
                vehicles = {this.state.vehicles} 
                calculate = {this.calculate} />}
          </div>
        </div>  
        <div className="destination time">
          Time Taken : {this.state.totalTime}
        </div>
      </div>   

      <div>
        {
          this.state.countTime >= 4  && 
          <button onClick={this.findFalcone}>
            Find Falcone!            
          </button>
        }
            
      </div>
       
    </div>
  </div>
    )
  }
}

export default App
