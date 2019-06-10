import React, {useState, useEffect, useContext} from 'react'
import dateFn from 'date-fns'

import ShareContext from '../util/ShareContext'
import { createData, updateData, deleteData } from '../util/airtableAPI'
import AddComponent from './AddComponent'

import './DateComponent.css'

function DateComponent(props){

    let shareContextObject = useContext(ShareContext)
    
    //States
    let [share, setShare] = useState({})
    let [date, setDate] = useState(props.date)
    let [showAdd, setShowAdd] = useState(false)

    useEffect( () => {
        if(Object.keys(shareContextObject.shares).length){
            let key = dateFn.format(date,'YYYY-MM-DD')
            let value = shareContextObject.shares[key]
            if( value ){
                setShare(value)
            } else {
                setShare({})
            }
        }
    }, [shareContextObject.shares, date])

    useEffect( ()=> {
        setDate(props.date)
    }, [props.date] )

    const toggleAdd = (event) => {
        if(!props.isPopUp){
            setShowAdd(!showAdd)
            props.changePopUp()
        }
        event.preventDefault()
    }

    let queryDate = dateFn.format(date, 'YYYY-MM-DD')

    const createDataAysnc = async (value) => {
        let status = true
        let tempShareDate = shareContextObject.shares;
        try{
            const newData = await createData(queryDate, value)
            setShare(newData)
            shareContextObject.updateShares({
                ...shareContextObject.shares,
                [queryDate]:newData
            })
        } catch(err){
            setShare({})
            shareContextObject.updateShares({
                ...tempShareDate,
            })
            status = false
            console.log('Error in createShares fn -> createDataAysnc : ',err)
        }
        return status
    }

    const updateDataAysnc = async (value) => {
        let status = true
        let tempShareDate = shareContextObject.shares;
        try{
            const isUpdate = await updateData(share, value)
            if(isUpdate){
                let modifiedData = {
                    ...share,
                    open: value
                }
                setShare(modifiedData)
                shareContextObject.updateShares({
                    ...shareContextObject.shares,
                    [queryDate]:modifiedData
                })
            }
        } catch(err){
            setShare(share)
            shareContextObject.updateShares({
                ...tempShareDate,
            })
            status = false
            console.log('Error in updateShares fn -> updateDataAysnc : ',err)
        }
        return status
    }

    const deleteDataAysnc = async (value) => {
        let status = true
        const tempShareDate = shareContextObject.shares;
        try{
            const isDeleted = await deleteData(share, value)
            if(isDeleted){
                setShare({})
                let tempShares = shareContextObject.shares;
                delete tempShares[queryDate]
                shareContextObject.updateShares({
                    ...tempShares
                })
            }
        } catch(err){
            setShare(share)
            shareContextObject.updateShares({
                ...tempShareDate,
            })
            status = false
            console.log('Error in updateShares fn -> deleteDataAysnc : ',err)
        }
        return status
    }


    const updateShare = (value) => {
        value = Number(value.toFixed(2))
        if(Object.values(share).length){
            if(value !== share.open){
                 console.log('update Data', updateDataAysnc(value))
            }
        } else {
            console.log('create Data', createDataAysnc(value))
        }

        if(props.isPopUp){
            setShowAdd(!showAdd)
            props.changePopUp()
        }
    }
    
    const deleteShare = (event) => {

        console.log('delete Data', deleteDataAysnc(share))
        event.preventDefault()
    }

    return(
        <div className={"box "+(props.isMonth?"":"opaque ")+(date.getTime()===shareContextObject.startDate.getTime()?"start-date ":"")+(date.getTime()===shareContextObject.endDate.getTime()?"end-date ":"")}>
            {Object.values(share).length?<div className="box-close-button" onClick={deleteShare}>x</div>:""}
            <div className="box-date" onClick={toggleAdd}>
                {date.getDate()}
            </div>
            <div className="box-share box-button" onClick={toggleAdd}>
                {Object.values(share).length? ('$'+share.open): 'Add'}
            </div>
            { showAdd
                ?<AddComponent 
                    closePopUp={toggleAdd} 
                    shareValue={Object.values(share).length? share.open: 0}
                    submit={updateShare}
                />
                :""
            }
        </div>
    )
}

export default DateComponent;