import React, {useContext, useState, useEffect} from 'react'
import ShareContext from '../util/ShareContext'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

function CustomChart(props){
    let shareContextObject = useContext(ShareContext)

    let [data, setData] = useState([])
    let [startDate, setStartDate] = useState(shareContextObject.startDate)
    let [endDate, setEndDate] = useState(shareContextObject.endDate)
    let options ={
        plotOptions: {
            series: {
                pointStart: startDate,
                // pointInterval: 24 * 3600 * 1000
            }
        },
        xAxis: {
            type: 'datetime'
        },
        title: {
            text: '$TSLA Stock Price'
        },
        rangeSelector:{
            allButtonsEnabled: true,
            buttons: [{
                type: 'all',
                text: 'All'
            }],
            // selected: 0,
            inputEnabled: false
        },
        series: [
          {
            name: '$TSLA',
            data: data,
            tooltip: {
                valueDecimals: 2
            }
          }
        ],
        navigator: {
            enabled: false
            // adaptToUpdatedData: false,
            // series: {
            //     data: data
            // }
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

    // useEffect(()=>{
    //     // options.plotOptions.series.pointStart = shareContextObject.startDate
    // })

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