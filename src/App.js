import React, {useState, useEffect} from 'react';
import './App.css';
import Calendar from './components/Calendar';
import ShareContext from './util/ShareContext';
import getData from './util/airtableAPI'


function App() {

  const [data, setData] = useState({shares:{}, isFetched: false});
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(2019)

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
      month: month,
      updateMonth : (month)=>{
        setMonth(month)
      },
      year: year,
      updateYear : (year)=>{
        setYear(year)
      },
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
