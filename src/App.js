import React, {useState, useEffect} from 'react';
import './App.css';
import CalendarUI from './components/CalendarUI';
import Calendar from './components/Calendar';
import ShareContext from './util/ShareContext';
import {getData} from './util/airtableApi'


function App() {

  const [data, setData] = useState({shares:{}, isFetched: false});

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
    }}>
      <div className="App">
        <Calendar />
      </div>
    </ShareContext.Provider>
  );
}

export default App;
