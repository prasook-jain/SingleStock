import React, {useContext, useState, useEffect} from 'react'
import dateFn from 'date-fns'

import HighchartsReact from 'highcharts-react-official'

import ShareContext from '../util/ShareContext'
import Highcharts from 'highcharts/highstock'

function CustomChart(props){
    let shareContextObject = useContext(ShareContext)

    let [data, setData] = useState([])

    let [startDate, setStartDate] = useState(shareContextObject.startDate)
    let [endDate, setEndDate] = useState(shareContextObject.endDate)
    let [yMax, setYMax] = useState(1000)
    let [yMin, setYMin ] = useState(0)

    let options = {
        // plotOptions: {
            // connectNulls: true, //may be useful when passed null in data in future
            // series: {
            //     animation: true
            //     pointStart: startDate,
            //     pointInterval: 24 * 3600 * 1000
        //     }
        // },
        yAxis:{
            type: 'number',
            min: yMin-10,
            max: yMax+10,
            // tickInterval: 10
        },
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
            // tooltip: {
            //     valueDecimals: 2
            // },
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
        console.log('CustomChart cycle')
        setStartDate(shareContextObject.startDate)

        let tempEndDate = shareContextObject.endDate

        if(tempEndDate.getTime() < shareContextObject.startDate){
            // console.log('Case Valid')
            tempEndDate = dateFn.lastDayOfMonth(shareContextObject.startDate)
        }
        setEndDate(tempEndDate)
        
        let isInRange = false
        let newData = []
        let tempObj
        let minValue = Infinity
        let maxValue = -Infinity

        for(let i=0; i<props.data.length; i++){
            let elem = props.data[i]
            
            if(elem[0] >= shareContextObject.startDate.getTime() && !isInRange){
                isInRange = true
            }
            if(isInRange){

                minValue = Math.min(minValue, elem[1])
                maxValue = Math.max(maxValue, elem[1])

                tempObj = {
                    x:elem[0],
                    y:elem[1],
                }
                
                if(typeof shareContextObject.maxProfitDate !== "string" 
                    && shareContextObject.maxProfitDate.getTime() === elem[0]
                ){
                    // console.log('Inside selection Max: ', shareContextObject.maxProfitDate)
                    tempObj.color = "#00FF00"
                    tempObj.marker = {
                        enabled : true,
                        symbol: 'circle',
                        radius: 5,
                        fillcolor: "#00FF00" 
                    }
                }
                else if(typeof shareContextObject.minProfitDate !== "string"
                    && shareContextObject.minProfitDate.getTime() === elem[0]
                ){
                    // console.log('Inside selection Min: ', shareContextObject.minProfitDate)
                    tempObj.color = "#FF0000"
                    tempObj.marker = {
                        enabled : true,
                        symbol: 'circle',
                        radius: 5,
                        fillcolor: "#0000FF" 
                    }
                } else {
                    tempObj.marker = {
                        enabled : false
                    }
                }
                newData.push(tempObj)
            }
            if(elem[0] >= tempEndDate){
                isInRange = false
                break
            }
        }
        console.log('max date : ', shareContextObject.maxProfitDate)
        console.log('min date : ', shareContextObject.minProfitDate)
        // console.log('props data: ', props.data)
        // console.log('new Data : ',newData)
        setData(newData)
        setYMin(minValue)
        setYMax(maxValue)
    },[
        shareContextObject.minProfitDate,
        shareContextObject.maxProfitDate,
        shareContextObject.startDate,
        shareContextObject.endDate,
        props.data
    ])

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