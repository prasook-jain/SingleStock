import React, {useState, useContext, useEffect} from 'react'
import dateFn from 'date-fns'

import ShareContext from '../util/ShareContext'
import DateComponent from './DateComponent'

import './Calendar.css'

//Helper function to overcome different timezone `new Date(year, month, date)` and `new Date('YYYY-MM-DD')`
const toLocalString = (year, month, date=1) => {
    return dateFn.format(new Date(year, month, date), 'YYYY-MM-DD')
}
//find all dates in current month
const getDates = (month, year) => {
    let startDate = new Date(toLocalString(year, month, 1))
    let startDay = startDate.getDay()
    let totalDay = dateFn.getDaysInMonth(startDate);
    let tempDate;
    let arr = []
    for(let i=startDay; i>0; i--){
        tempDate = new Date(toLocalString(year, month, 1));
        tempDate.setDate(startDate.getDate() - i)
        arr.push(tempDate)
    }
    for(let i=0; i < totalDay; i++ ){
        tempDate = new Date(toLocalString(year, month, 1));
        tempDate.setDate(startDate.getDate() + i)
        arr.push(tempDate)
    }
    for(let i=totalDay; i<42-startDay; i++){
        tempDate = new Date(toLocalString(year, month, 1));
        tempDate.setDate(startDate.getDate() + i)
        arr.push(tempDate)
    }
    return arr;
}

function Calendar(){

    const shareContextObject = useContext(ShareContext)

    //States
    let [month, setMonth] = useState(shareContextObject.startDate.getMonth())
    let [year, setYear] = useState(dateFn.getYear(shareContextObject.startDate))
    let [dates, setDates] = useState(getDates(month, year))
    let [isPopUp, setPopUp] = useState(false)


    // create Weeks div
    let daysArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    let WeeksDiv = []
    daysArr.forEach((day)=>{
        WeeksDiv.push(<div key={WeeksDiv.length} className="week-header"><span>{day}</span></div>);
    });

    //Effective on change of month from right-panel
    useEffect(()=>{
        let newMonth = shareContextObject.startDate.getMonth()
        let newYear = dateFn.getYear(shareContextObject.startDate)
        setMonth(newMonth)
        setYear(newYear)
        setDates(getDates(newMonth,newYear))
    },[shareContextObject.startDate])

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
        let tempStartDate = new Date(toLocalString(year, month, 1))
        tempStartDate.setMonth(tempStartDate.getMonth() + towards)

        //update the context
        shareContextObject.updateStartDate(tempStartDate)
        // console.log(dateFn.getDaysInMonth(tempStartDate))
        // console.log(toLocalString(dateFn.getYear(tempStartDate),tempStartDate.getMonth(),dateFn.getDaysInMonth(tempStartDate)))
        let tempEndDate = new Date(toLocalString(dateFn.getYear(tempStartDate),tempStartDate.getMonth(),dateFn.getDaysInMonth(tempStartDate)));
        shareContextObject.updateEndDate(tempEndDate)
        // console.log('(From Calender click) start Date : ', tempStartDate)
        // console.log('(From Calender click) end Date : ', tempEndDate)
        let newMonth = tempStartDate.getMonth()
        let newYear = dateFn.getYear(tempStartDate)
        let newDates = getDates(newMonth, newYear)

        //update current component state
        setMonth(newMonth)
        setYear(newYear)
        setDates(newDates)

        event.preventDefault()
    }

    return(
        <div className="calendar-container">
            <div className="calendar-toolbar">
                <div className="toolbar-button left" onClick={(e) => {clickNav(e,-1)}} >{`<`}</div>
                <div className="month">{dateFn.format(new Date(toLocalString(year, month, 1)), 'MMM YYYY')}</div>
                <div className="toolbar-button right" onClick={(e) => {clickNav(e,1)}} >{`>`}</div>
            </div>
            {WeeksDiv}
            {createDateComponents()}
        </div>
    )
};

export default Calendar;