import React, { Component } from 'react'

export class Dropdown extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        console.log(this.props.value)
        return (
            <div>
            <select value = {this.props.value} onChange={this.props.handlePlanets} >
                {
                    this.props.planets.map(planet => {
                        return (<option value={planet.name}> {planet.name} </option>)
                    })
                }
            </select>

            
            
        </div>
        )
    }
}

export default Dropdown

