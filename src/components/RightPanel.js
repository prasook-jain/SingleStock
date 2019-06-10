import React, {useContext, useState, useEffect} from 'react'

import ShareContext from '../util/ShareContext'

import MaxProfitComponent from './MaxProfitComponent'
import CustomChart from './CustomChart'
import SelectDateComponent from './SelectDateComponent'

function RightPanel(props){

    //Context
    let shareContextObject = useContext(ShareContext)
    
    //States
    const [data, setData] = useState([]);

    useEffect(()=>{
        let tempData = []

        if(Object.keys(shareContextObject.shares).length){

            let keys = Object.keys(shareContextObject.shares)
            //Sorting for highchart
            keys = keys.sort((ldate, rdate)=>{
                if(shareContextObject.shares[ldate].date > shareContextObject.shares[rdate].date) return 1;
                if(shareContextObject.shares[ldate].date < shareContextObject.shares[rdate].date) return -1;
                return 0;
            })
            for(let key of keys){
                tempData.push([shareContextObject.shares[key].date.getTime(),shareContextObject.shares[key].open])
            }
            // console.log('(Right Panel) TempData : ',tempData)
            setData(tempData)
        }
    },[shareContextObject.shares])

    return(
        <div className="right-panel">
            <MaxProfitComponent data={data}/>
            <CustomChart data={data}/>
            <SelectDateComponent />
        </div>
    )
}

export default RightPanel