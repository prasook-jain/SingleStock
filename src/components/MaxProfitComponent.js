import React, {useState, useEffect} from 'react'
import dateFn from 'date-fns'


//Helper function to find Max (DS-Algo)
const findMax = (startDate, endDate, data)=>{
    let startPush = false
    let startIndex = -1;
    let considerShares = [];
    
    for(let i=0; i<data.length; i++){
        let elem = data[i]
        if(elem[0]===startDate.getTime()){
            startPush = true;
            startIndex = i;
        }
        if(startPush){
            considerShares.push(elem[1])
        }
        if(elem[0]===endDate.getTime()){
            startPush = false;
            break;
        }
    }

    // int maxProfit(vector<int>& prices) {
    if(considerShares.length === 0){
        return [0,0,0];
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
    return [maxProfit, maxIndex, minIndex];
}


function MaxProfitComponent(props){

    //States
    // let [initialProfit, initialMaxIndex, initialMinIndex] = findMax(props.startDate, props.endDate, props.data);
    const [maxProfit, setMaxProfit] = useState(0)
    const [profitBuyDate, setProfitBuyDate] = useState('')
    const [profitSaleDate, setProfitSaleDate] = useState('')

    useEffect(()=>{
        let startDate = props.startDate
        let endDate = props.endDate
        let data = props.data

        let [maxProfit, maxIndex, minIndex] = findMax(startDate, endDate, data);
        
        
        setMaxProfit(maxProfit*10) //As in instruction said only 10 share and once
        if(maxIndex !== minIndex){
            setProfitBuyDate(new Date(data[minIndex][0]))
            setProfitSaleDate(new Date(data[maxIndex][0]))
        }

    }, [props.endDate, props.startDate, props.data])

    return(
        <div className="max-profit">
            <p>Max Profit : {maxProfit}</p>
            <p>Buy Date: {profitBuyDate?dateFn.format(profitBuyDate,'DD-MMM-YYYY'):"Input Date"}</p>
            <p>Sale Date : {profitSaleDate?dateFn.format(profitSaleDate,'DD-MMM-YYYY'):"Input Date"}</p>
        </div>
    )
}

export default MaxProfitComponent