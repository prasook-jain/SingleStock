import React, {useState, useEffect, useContext} from 'react'
import dateFn from 'date-fns'
import ShareContext from '../util/ShareContext'
import './MaxProfitComponent.css'

//Helper function to find Max (DS-Algo)
const findMax = (startDate, endDate, data)=>{
    let isInRange = false
    let startIndex = -1;
    let considerShares = [];
    console.log('Inside findMax fn',startDate, endDate, data)
    for(let i=0; i<data.length; i++){
        let elem = data[i]
        
        if(elem[0] >= startDate.getTime() && !isInRange){
            isInRange = true;
            startIndex = i;
        }
        if(isInRange){
            considerShares.push(elem[1])
        }
        if(elem[0] >= endDate.getTime()){
            isInRange = false;
            break;
        }
    }

    if(considerShares.length <= 1){
        return [0,0,0, -1];
    }

    let maxProfit = 0;
    let minPrice = considerShares[0];
    let maxIndex = 0;
    let minIndex = 0;
    let currMinIndex = 0;

    for(let i=1; i<considerShares.length; i++){
        if(maxProfit < considerShares[i]-minPrice){
            maxProfit = considerShares[i]-minPrice
            maxIndex = i;
            minIndex = currMinIndex;
        }
        if(minPrice > considerShares[i]){
            minPrice = considerShares[i]
            currMinIndex = i
        }
    }
    maxIndex += startIndex
    minIndex += startIndex
    if(maxIndex === minIndex){
        return [maxProfit, maxIndex, minIndex, -2]
    }
    return [maxProfit, maxIndex, minIndex, 1];
}


function MaxProfitComponent(props){

    let shareContextObject = useContext(ShareContext)

    //States
    const [maxProfit, setMaxProfit] = useState(0)
    const [profitBuyDate, setProfitBuyDate] = useState('No share values')
    const [profitSaleDate, setProfitSaleDate] = useState('No share values')

    useEffect(()=>{
        let startDate = shareContextObject.startDate
        let endDate = shareContextObject.endDate
        let data = props.data
        console.log('when props.data changes ', startDate.getDate(), endDate.getDate(), props.data)
        let [maxProfit, maxIndex, minIndex, msgStatus] = findMax(startDate, endDate, data);
        console.log('after findMax calculation', maxProfit, maxIndex, minIndex)
        
        setMaxProfit(maxProfit*10) //As in instruction said only 10 share and once
        if(msgStatus === 1){
            setProfitBuyDate(new Date(data[minIndex][0]))
            setProfitSaleDate(new Date(data[maxIndex][0]))
        } else if(msgStatus === -2){
            // console.log('(Inside Max Profit) : data.length', data.length)
            setProfitBuyDate('No Possible Profit')
            setProfitSaleDate('No Possible Profit')
        } else {
            setProfitBuyDate('No share values')
            setProfitSaleDate('No share values')
        }

    }, [shareContextObject.startDate, shareContextObject.endDate, props.data])

    return(
        <div className="max-profit">
            <p className="row-info"> 
                <span className="label">Max Profit :</span>
                <span className="result"> {maxProfit.toFixed(2)}</span>
            </p>
            <p className="row-info">
                <span className="label">Buy Date :</span>
                <span className="result"> {typeof profitBuyDate!=='string'?dateFn.format(profitBuyDate,'DD-MMM-YYYY'):profitBuyDate}</span>
            </p>
            <p className="row-info">
                <span className="label">Sale Date :</span>
                <span className="result"> {typeof profitSaleDate!=='string'?dateFn.format(profitSaleDate,'DD-MMM-YYYY'):profitSaleDate}</span>
            </p>
        </div>
    )
}

export default MaxProfitComponent