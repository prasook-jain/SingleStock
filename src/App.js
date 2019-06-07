import React, {useState} from 'react';
import './App.css';
import CalendarUI from './components/CalendarUI';
import Calendar from './components/Calendar';
import ShareContext from './util/ShareContext';


function App() {

  const [share, setShare] = useState([]);

  return (
    <ShareContext.Provider value={{
      shares : share,
      updateShares : (shares)=>{
          setShare({
            share: shares
          })
      },
    }}>
      <div className="App">
        <div className="left-panel">
          <CalendarUI />
        </div>
        <Calendar />
      </div>
    </ShareContext.Provider>
  );
}

export default App;
