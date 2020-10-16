import React, { Component } from 'react'

export class DefaultProps extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <button>
                {this.props.buttonLabel}    
            </button>
            
        )
    }
}

export default DefaultProps

DefaultProps.defaultProps = {
    buttonLabel : "submit"
}
