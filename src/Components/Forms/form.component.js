import React, { Component } from 'react'
import Input from '../Input/input.component'

export class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             firstName: '',
             lastName: '',
             middleName: '',
             surName:'',
             course :  {
                 angular:false,
                 vue: false,
                 react: true,
                 node: false
             },
             versions: ['1','2','3','4']      
        }
    }

    handleChange = (e) => {
        this.setState({
            ...this.state, [e.target.name] : e.target.value
        })
    }
    radioChange = (e) =>{
        let obj = {};
        obj = Object.assign(this.state.course);
        obj[e.target.value] = e.target.checked;    
        this.setState({...this.state, course:obj})
    }

    handleSelect = (e) => {
        this.setState({versions : e.target.value})
    }
    render() {
        return (
            <div>
                < Input 
                    type="text"  
                    name = "firstName" 
                    label = "First Name"
                    value={this.state.firstName} 
                    handleChangeInput={this.handleChange}/>
                <input type="radio" name= "radioGroup" value="angular" checked={this.state.course.angular} onChange = {this.radioChange}/> angular <br/>
                <input type="radio" name= "radioGroup" value="vue" checked={this.state.course.vue} onChange = {this.radioChange}/> angular <br/>
                <input type="radio" name= "radioGroup" value="react" checked={this.state.course.react} onChange = {this.radioChange}/>angular <br/>
                <input type="radio" name= "radioGroup" value="node" checked={this.state.course.node} onChange = {this.radioChange}/>angular <br/>

                <select value={this.state.versions[1]} onChange={this.handleSelect}>
                    {
                        this.state.versions.map(version=>{
                            return (<option name = {version} value={version} >{version} </option>)
                        })
                    }
                </select>
            </div>
        )
    }
}

export default Form
