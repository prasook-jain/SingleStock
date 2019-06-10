import React, {useState, useEffect} from 'react'

import ShareContext from './util/ShareContext'
import getData from './util/airtableAPI'

import Calendar from './components/Calendar'
import RightPanel from './components/RightPanel'

import './App.css'

function App() {

  const [data, setData] = useState({shares:{}, isFetched: false})
  const [startDate, setStartDate] = useState(new Date('2019-01-01'))
  const [endDate, setEndDate] = useState(new Date('2019-01-31'))

  // Fetch Data for first time when App component mount
  useEffect( () => {
    const fetchShares = async ()=> {
      try{
        const shares = await getData();
        setData({shares:shares, isFetched: true})
      } catch(err){
        console.log('Inside App useEffect : ',err)
        setData({shares:[], isFetched: false})
      }
    }

    if(!data.isFetched){
      console.log('FetchShares called',fetchShares())
    }
  })

  return (
    <ShareContext.Provider value={{
      shares : data.shares,
      updateShares : (shares)=>{
          setData({
            shares: shares,
          })
      },
      startDate: startDate,
      updateStartDate : (newDate) => {
        setStartDate(newDate)
      },
      endDate: endDate,
      updateEndDate : (newDate) => {
        setEndDate(newDate)
      }
    }}>
      <div className="App">
        <div className="left-panel">
          <Calendar />
        </div>
        <RightPanel />
      </div>
    </ShareContext.Provider>
  );
}

export default App;
