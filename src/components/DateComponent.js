import React, {useState, useEffect, useContext} from 'react'
import ShareContext from '../util/ShareContext'
import dateFn from 'date-fns'
import './DateComponent.css'
import '../util/airtableApi'
function DateComponent(props){

    let shareContextObject = useContext(ShareContext)
    let [share, setShare] = useState({})
    let [date, setDate] = useState(props.date)

    useEffect( () => {
        if(Object.keys(shareContextObject.shares).length){
            let key = dateFn.format(date,'YYYY-MM-DD')
            let value = shareContextObject.shares[key]
            if( value ){
                setShare(value)
            } else {
                setShare({})
            }
        }
    }, [shareContextObject, share, date])

    useEffect( ()=> {
        setDate(props.date)
    }, [props.date] )

    const deleteShare = (event) => {

        // shareContextObject.updateShare()
        event.preventDefault()
    }

    return(
        <div className={"box "+(props.isMonth?"":"opaque")}>
            {Object.values(share).length?<div className="box-close-button" onClick={deleteShare}>x</div>:""}
            <div className="box-date">{date.getDate()}</div>
            {Object.values(share).length?<div className="box-share">${share.open}</div>:""}
        </div>
    )
}

export default DateComponent;