import React, {useContext, useState, useEffect} from 'react'

import HighchartsReact from 'highcharts-react-official'

import ShareContext from '../util/ShareContext'
import Highcharts from 'highcharts/highstock'

function CustomChart(props){
    let shareContextObject = useContext(ShareContext)

    let [data, setData] = useState([])
    let [startDate, setStartDate] = useState(shareContextObject.startDate)
    let [endDate, setEndDate] = useState(shareContextObject.endDate)

    let options = {
        // plotOptions: {
            // connectNulls: true, //may be useful when passed null in data in future
            // series: {
                // animation: true
            //     pointStart: startDate,
            //     pointInterval: 24 * 3600 * 1000
            // }
        // },
        xAxis:{
            type: 'datetime',
            minRange: 31 * 24 * 3600 * 1000,
            min: startDate.getTime(),
            max: endDate.getTime(),
            tickInterval: 24 * 3600 * 1000
        },
        title: {
            text: '$TSLA Stock Price'
        },
        rangeSelector:{
            enabled: false,
            inputEnabled: false,
        },
        series: [{
            name: '$TSLA',
            data: data,
            tooltip: {
                valueDecimals: 2
            },
            pointStart: startDate.getTime(),
            // pointInterval: 24 * 3600 * 1000
        }],
        navigator: {
            enabled: false
        },
        scrollbar:{
            enabled: false
        }
    }

    useEffect(()=>{
        setStartDate(shareContextObject.startDate)
        setEndDate(shareContextObject.endDate)

        let isInRange = false;
        let newData = []
        for(let i=0; i<props.data.length; i++){
            let elem = props.data[i]
            
            if(elem[0] >= shareContextObject.startDate.getTime() && !isInRange){
                isInRange = true;
            }
            if(isInRange){
                newData.push(elem)
            }
            if(elem[0] >= shareContextObject.endDate.getTime()){
                isInRange = false;
                break;
            }
        }

        setData(newData)
        
    },[ shareContextObject.startDate, shareContextObject.endDate, props.data ])

    return(
        <div className="graph">
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={options}
            />
        </div>
    )
}

export default CustomChart;