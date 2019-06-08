import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import ShareContext from '../util/ShareContext'
// import {getData} from '../util/airtableApi'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction' 

import './main.css' // webpack must be configured to do this

function CalendarUI(){
    // const shareContextObj = useContext(ShareContext)
    
    // useEffect( () => {
    //     let shares;
    //     async function fetchShares(){
    //         shares = await getData();
    //         shareContextObj.updateShares(shares);
    //         console.log(shareContextObj.shares)
    //     }
    //     fetchShares();
    // }, [shareContextObj]);

    // useEffect( ()=>{
    //     console.log('from Calender UI sharesContext',shareContextObj.shares);
    // })
    return (
        <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            header={{
                left:'prev',
                center:'title',
                right:'next'
            }}
            weekends={true}
            events={[
                { title: 'event 1', date: '2019-06-02' },
                { title: 'event 2', date: '2019-06-04' }
            ]}
        />
    );
}
export default CalendarUI;