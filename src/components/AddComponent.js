import React, {useState} from 'react'

import './AddComponent.css'

function AddComponent(props){

    const [shareValue, setShareValue] = useState(props.shareValue)

    const handleSubmit= (event) => {
        props.submit(Number(shareValue.toFixed(2)))
        event.preventDefault()
    }
    const handleChange = (event) => {
        let value = Number(event.target.value)
        // console.log(typeof value)
        if(value){
            setShareValue(value)
        } else {
            setShareValue(0)
        }
        event.preventDefault()
    }

    const handleClose = (event) => {
        console.log('Inside handle Close')
        props.closePopUp(event)
        event.preventDefault()
    }
    return(
        <form onSubmit={handleSubmit} className="box-add-component">
            <div className="box-add-input">
                <legend name="shareValue">Edit Shares</legend>
                <input
                    type="number"
                    name="shareValue"
                    steps="0.00001"
                    min="0"
                    value={shareValue?shareValue:''}
                    onChange={handleChange}
                    placeholder={shareValue}
                />
            </div>
            <div className="box-add-button box-button" onClick={handleSubmit}>Submit</div>
            <div className="box-add-close-button" onClick={handleClose}>
                x
            </div>
        </form>
    )
}

export default AddComponent