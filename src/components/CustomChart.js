import React, {useContext, useState, useEffect} from 'react'
import ShareContext from '../util/ShareContext'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

function CustomChart(props){
    let shareContextObject = useContext(ShareContext)

    let [data, setData] = useState([[(new Date(2019, 6, 1)).getTime(),1],
        [(new Date(2019, 6, 2)).getTime(),2],
        [(new Date(2019, 6, 3)).getTime(),3],
        [(new Date(2019, 6, 4)).getTime(),4],
        [(new Date(2019, 6, 5)).getTime(),3],
        [(new Date(2019, 6, 6)).getTime(),6]
    ])

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const options = {
        plotOptions: {
            series: {
                pointStart: props.endDate,
            }
        },
        xAxis: {
            type: 'datetime'
        },
        showNavigator: true,
        title: {
            text: '$TSLA Stock Price'
        },
        series: [
          {
            name: '$TSLA',
            data: data,
            tooltip: {
                valueDecimals: 2
            }
          }
        ]
    };
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