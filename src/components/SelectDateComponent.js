import React, {useState} from 'react'
import dateFn from 'date-fns'

function SelectDateComponent(props){
    
    //State
    const [endDate, setEndDate] = useState(dateFn.format(props.endDate, 'YYYY-MM-DD'))
    const [startDate, setStartDate] = useState(dateFn.format(props.startDate, 'YYYY-MM-DD'))

    const changeEndDate = (event) => {
        console.log('changeSaleDate raw data : ', event.target.value)
        if((new Date(event.target.value)).getTime() > (new Date(startDate)).getTime()) {
            setEndDate(event.target.value)
            props.changeEndDate(new Date(event.target.value))
        } else {
            console.log((new Date(event.target.value)).getTime(),startDate);
        }
        event.preventDefault()
    }

    const changeStartDate = (event) => {
    
        console.log('changeBuyDate raw data : ', event.target.value)
        setStartDate(event.target.value)
        props.changeStartDate(new Date(event.target.value))
        event.preventDefault()
    }

    return(
        <div className="sale-buy-date">
            <div>
                <span className="start-date">Add Start Date</span>
                <input type="date" value={startDate} onChange={changeStartDate} />
            </div>
            <div>
                <span className="end-date">Add End Date</span>
                <input type="date" value={dateFn.format(endDate, 'YYYY-MM-DD')} onChange={changeEndDate} />
            </div>
        </div>
    )
}

export default SelectDateComponent