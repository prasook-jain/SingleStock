import React, {useState, useEffect, useContext} from 'react'
import dateFn from 'date-fns'

import ShareContext from '../util/ShareContext'

import './SelectDateComponent.css'

function SelectDateComponent(props){
    
    let sharesContextObject = useContext(ShareContext)

    //State
    const [startDate, setStartDate] = useState(sharesContextObject.startDate)
    const [endDate, setEndDate] = useState(sharesContextObject.endDate)

    useEffect(()=>{
        setStartDate(sharesContextObject.startDate)
        setEndDate(sharesContextObject.endDate)
    }, [sharesContextObject.startDate, sharesContextObject.endDate])

    const changeEndDate = (event) => {
        // console.log('changeSaleDate raw data : ', event.target.value)
        
        let newEndDate = new Date(event.target.value);
        
        if( newEndDate.getTime() > startDate.getTime() ) {
            setEndDate(newEndDate)
            sharesContextObject.updateEndDate(newEndDate)
        } else {
            console.log("Can't possible date change, invalid check range again")
        }
        event.preventDefault()
    }

    const changeStartDate = (event) => {
    
        // console.log('changeBuyDate raw data : ', event.target.value)
        
        let newStartDate = new Date(event.target.value)
        
        if( newStartDate.getTime() < endDate.getTime() ) {
            setStartDate(newStartDate)
            sharesContextObject.updateStartDate(newStartDate)
        } else {
            console.log("Can't possible date change, invalid check range again")
        }
        event.preventDefault()
    }

    return(
        <div className="sale-buy-date">
            <div className="row-info">
                <span className="label">Add Start Date : </span>
                <input type="date" value={dateFn.format(startDate, 'YYYY-MM-DD')} onChange={changeStartDate} />
            </div>
            <div className="row-info">
                <span className="label">Add End Date : </span>
                <input type="date" value={dateFn.format(endDate, 'YYYY-MM-DD')} onChange={changeEndDate} />
            </div>
        </div>
    )
}

export default SelectDateComponent