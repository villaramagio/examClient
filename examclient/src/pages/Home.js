import React, {useState, useRef} from 'react'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import axios from 'axios';



function Home({Home, error}){
 const [eventName, setEventName] = useState('');
 const [eventDateFrom, setEventDateFrom] = useState('');
 const [eventDateTo, setEventDateTo] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const errorRef = useRef();
 const createdBy = sessionStorage.getItem("id");

 async function AddEvent(name,dateFrom,dateTo){
    const response = await fetch('http://localhost:3005/events/createEvent', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name,createdBy,dateFrom,dateTo
        })
    })
    const data = await response.json().then((data) => {
        if(data.statusCode == 401){
            setErrorMessage(data.message)
        }
         else{
            alert("Event Created!");
         }
    })
    }
    const Handler = e => {
        e.preventDefault();
        AddEvent(eventName, eventDateFrom,eventDateTo);
    }

    return(
        <div className="Content">
            <div className="Header">
                <div className="Layer">
                    Events
                </div>
            </div>
            <div className="Body">
                <ul className="Events">
                    <li>
                        <span className="Event">Event</span>
                        <span className="Date">13/01/2023</span>
                        <span className="Action">&#10007;</span>
                    </li>
                </ul>
                <div className="AddEvent">
                    <Form className='addEvent-form' onSubmit={Handler}>
                        <h1 className="font-weight-bold">Login</h1>
                        <FormGroup>
                            <Input className="eventName" onChange={(e) => setEventName(e.target.value)} value={eventName} text="text" placeholder="New Event"/>
                        </FormGroup>
                        <FormGroup>
                            <Input className="eventDateFrom" onChange={(e) => setEventDateFrom(e.target.value)} value={eventDateFrom} type="date" placeholder="Date of Event Start"/>
                        </FormGroup>
                        <FormGroup>
                            <Input className="eventDateTo" onChange={(e) => setEventDateTo(e.target.value)} value={eventDateTo} type="date" placeholder="Date of Event Start"/>
                        </FormGroup>
                        <Button type='submit' className='btn-lg btn-dark btn-block'>Add Event</Button>
                    </Form>
                </div>
            </div>
        </div>    
    )
}

export default Home