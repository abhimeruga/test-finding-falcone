import React, { Component } from 'react'
import './Radio.styles.scss'
export class Radio extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            total_time : 0,
            vehicles : props.vehicles,
            dummyVehicles : props.vehicles,
        }
    }

    planets = []
    triggerInputChange = (e) => {
        let dummyVehicles = this.state.dummyVehicles;
        let time_value = 0;
        dummyVehicles = dummyVehicles.map(vehicle=>{
            if(vehicle.name === e.target.value && vehicle.total_no > 0) {
                vehicle.total_no = vehicle.total_no - 1;
                time_value = (vehicle.max_distance / (vehicle.speed))
                this.planets.push(vehicle.name)
                this.props.calculate(time_value, this.planets)
            }
            return vehicle
        })

        this.setState (()=>{
            return {
                ...this.state, vehicles : dummyVehicles
            }
        }) 
    }
    
    render() {
    return (
        <div>
            {
                this.state.vehicles.map(vehicle => {
                    return (
                    <div className= {`${vehicle.total_no === 0 ? 'disable' : ''} radio`} >
                        <input key={vehicle.name} 
                            className="button"  
                            disabled={ vehicle.total_no === 0} 
                            type= "radio" name = {this.props.name}
                            value = {vehicle.name} 
                            onChange={(e)=>{  
                                this.triggerInputChange(e)
                        }}/> 
                        <label> {vehicle.name} ({vehicle.total_no})</label>
                    </div>
                    )
                })
            }
            
        </div>
    )
    }
}

export default Radio
