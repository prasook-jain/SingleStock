import React, {useContext, useEffect} from 'react'
import './Calendar.css'
import ShareContext from '../util/ShareContext'
import {getData} from '../util/airtableApi'

function Calendar(){
    // let sharesContextObject = useContext(SharesContext)
    // console.log(sharesContextObject)
    let sharesContextObject = useContext(ShareContext)

    useEffect(()=>{
        console.log('from another component', sharesContextObject.shares)
    },[sharesContextObject])

    return(
        <div className="calendar-container">
            <div className="toolbar">
                <div className="left"></div>
                <div className="month"></div>
                <div className="right"></div>
            </div>
        </div>
    );
};

export default Calendar;