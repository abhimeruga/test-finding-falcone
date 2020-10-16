import React from 'react'
import './input.styles.scss'

function Input({handleChangeInput, label, props}) {
    return (
        <div className="input-div">
            <input className="input" {...props} onChange= {handleChangeInput} />
            <label className="input-label"> {label} </label>
        </div>
    )
}

export default Input
