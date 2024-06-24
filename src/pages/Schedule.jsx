import React, { useState } from 'react'
import { Select, MenuItem } from '@mui/material'
import SchedulePicker from '../features/schedules/SchedulePicker'
import ScheduleTable from '../features/schedules/ScheduleTable'

export default function Schedule() {

  const [query, setQuery] = useState('');

  return (
    <div>
      <h1>Schedule</h1>
      <SchedulePicker onQuery={setQuery} />
      <hr></hr>
      { query && 
      <ScheduleTable query={query}/>
      }
          
    </div>

  )
}
