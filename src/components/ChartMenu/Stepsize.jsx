import React from "react";
import Select from 'react-select'
import "./Stepsize.css"

const options = [
  { value: 'd', label: 'Day' },
  { value: 'w', label: 'Week' },
  { value: 'm', label: 'Month' }
]

const Stepsize = (props) => {
  
  return (
    <Select options={options} 
    className="StepSelect"
    defaultValue={options[0]}
    onChange={props.setStep}
    theme={(theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
      ...theme.colors,
        text: 'red',
        neutral0: 'white',
        primary25: '#B2D4FF',
        primary: '#2684FF',
        neutral90: 'green'
      },
    })} />
  )
}

export default Stepsize