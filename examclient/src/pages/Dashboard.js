import React, {useState, useEffect} from 'react'
import { Table } from 'reactstrap'
import axios from 'axios'
import Events from './Events'

function Dashboard(){
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem("id")

  useEffect(() =>{
    const fetchEvents = async() =>{
      setLoading(true);
      const url = 'http://localhost:3005/events/getEventCreatedBy/' + userId;
      const res = await axios.get(url);
      setEvents(res.data)
      setLoading(false);
    }

    fetchEvents();
  }, []);

  return(
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              Event Name
            </th>
            <th>
              Date To
            </th>
            <th>
              Date From
            </th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <Events events={events} loading={loading}/>
        </tbody>
        
        
      </Table>
    </div>
    
  ) 
}

export default Dashboard