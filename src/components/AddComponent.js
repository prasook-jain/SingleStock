import React, {useState} from 'react'
import './AddComponent.css'
function AddComponent(props){

    const [shareValue, setShareValue] = useState(props.shareValue)

    const handleClick = (event) => {
        props.submit(shareValue)
        event.preventDefault()
    }
    const handleChange = (event) => {
        let value = Number(event.target.value)
        console.log(typeof value)
        if(value){
            setShareValue(value)
        } else {
            setShareValue(0)
        }
        event.preventDefault()
    }
    return(
        <form onSubmit={handleClick} className="box-add-component">
            <div className="box-add-input">
                <legend name="shareValue">Edit Shares</legend>
                <input
                    type="number"
                    name="shareValue"
                    value={shareValue?shareValue:''}
                    onChange={handleChange}
                    placeholder={shareValue}
                />
            </div>
            <div className="box-add-button box-button" onClick={handleClick}>Submit</div>
        </form>
    )
}

export default AddComponent