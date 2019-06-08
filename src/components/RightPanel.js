import React, {useContext, useState, useEffect} from 'react'
import CustomChart from './CustomChart'
import ShareContext from '../util/ShareContext'
import MaxProfitComponent from './MaxProfitComponent'
import SelectDateComponent from './SelectDateComponent'
import dateFn from 'date-fns'

function RightPanel(props){

    //Context
    let shareContextObject = useContext(ShareContext)
    let initialStartDate = new Date(shareContextObject.year,shareContextObject.month, 1)
    let initialEndDate = new Date(shareContextObject.year,shareContextObject.month, 15)
    
    //States
    const [startDate, setStartDate] = useState(initialStartDate)
    const [endDate, setEndDate] = useState(initialEndDate)
    const [data, setData] = useState([]);

    useEffect(()=>{
        let tempData = []
        if(Object.keys(shareContextObject.shares).length){

            let keys = Object.keys(shareContextObject.shares)
            //Sorting for highchart
            keys = keys.sort((ldate, rdate)=>{
                if(shareContextObject.shares[ldate].date >shareContextObject.shares[rdate].date) return 1;
                if(shareContextObject.shares[ldate].date <shareContextObject.shares[rdate].date) return -1;
                return 0;
            })
            for(let key of keys){
                tempData.push([shareContextObject.shares[key].date.getTime(),shareContextObject.shares[key].open])
            }
            console.log('TempData : ',tempData)
            setData(tempData)
        }
    },[shareContextObject])

    const changeStartDate = (newDate)=>{
        //Only change of calendar to start position 
        shareContextObject.updateMonth(newDate.getMonth())
        shareContextObject.updateYear(dateFn.getYear(newDate))
        setStartDate(newDate)
    }

    const changeEndDate = (newDate)=>{
        setEndDate(newDate)
    }

    return(
        <div className="right-panel">
            <MaxProfitComponent endDate={endDate} startDate={startDate} data={data}/>
            <CustomChart endDate={endDate} startDate={startDate} data={data}/>
            <SelectDateComponent
                startDate={startDate}
                changeStartDate={changeStartDate}
                endDate={endDate}
                changeEndDate={changeEndDate}
            />
        </div>
    )
}

export default RightPanel