import React, {useState, useContext} from 'react'
import DateComponent from './DateComponent'
import dateFn from 'date-fns'

import ShareContext from '../util/ShareContext'

import './Calendar.css'

//find all dates in current month
const getDates = (month, year) => {
    let startDate = new Date(year, month, 1)
    let startDay = startDate.getDay()
    let totalDay = dateFn.getDaysInMonth(startDate);
    let tempDate;
    let arr = []
    for(let i=startDay; i>0; i--){
        tempDate = new Date(year, month, 1);
        tempDate.setDate(startDate.getDate() - i)
        arr.push(tempDate)
    }
    for(let i=0; i < totalDay; i++ ){
        tempDate = new Date(year, month, 1);
        tempDate.setDate(startDate.getDate() + i)
        arr.push(tempDate)
    }
    for(let i=totalDay; i<42-startDay; i++){
        tempDate = new Date(year, month, 1);
        tempDate.setDate(startDate.getDate() + i)
        arr.push(tempDate)
    }
    return arr;
}

function Calendar(){

    const shareContextObject = useContext(ShareContext)

    //States
    let [month, setMonth] = useState(shareContextObject.month)
    let [year, setYear] = useState(shareContextObject.year)
    let [dates, setDates] = useState(getDates(month, year))
    let [isPopUp, setPopUp] = useState(false)


    // create Weeks div
    let daysArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    let WeeksDiv = []
    daysArr.forEach((day)=>{
        WeeksDiv.push(<div key={WeeksDiv.length} className="week-header"><span>{day}</span></div>);
    });

    const changePopUp = () => {
        setPopUp(!isPopUp)
    }

    // create Date Component
    const createDateComponents = () => {
        let DatesDiv = []
        dates.forEach((date)=>{
            //Converting date into shares key format
            DatesDiv.push(<DateComponent
                date = {date}
                isMonth = {date.getMonth() === month}
                key = {dateFn.format(date,'YYYY-MM-DD')}
                isPopUp = {isPopUp}
                changePopUp = {changePopUp}
            />)
        })
        return DatesDiv;
    }

    const clickNav = (event, towards) => {

        // Not using reference just using local variable to save future value.
        // Using it to change other states
        let tempDate = new Date(year, month, 1);
        tempDate.setMonth(tempDate.getMonth() + towards)
        let newMonth = tempDate.getMonth();
        let newYear = dateFn.getYear(tempDate)    
        //update the context
        shareContextObject.updateYear(newYear)
        shareContextObject.updateMonth(newMonth)

        let newDates = getDates(newMonth, newYear)
        
        //update current component state
        setMonth(newMonth)
        setYear(newYear)
        setDates(newDates)

    }

    return(
        <div className="calendar-container">
            <div className="calendar-toolbar">
                <div className="toolbar-button left" onClick={(e) => {clickNav(e,-1)}} >{`<`}</div>
                <div className="month">{dateFn.format(new Date(year, month, 1), 'MMM YYYY')}</div>
                <div className="toolbar-button right" onClick={(e) => {clickNav(e,1)}} >{`>`}</div>
            </div>
            {WeeksDiv}
            {createDateComponents()}
        </div>
    )
};

export default Calendar;