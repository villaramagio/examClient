import React, {useState} from 'react'
import { Button, Modal } from 'reactstrap'


const Events = ({ events, loading}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      {
        events.map(event  => (
          <tr key={event.id}>
            <td>
              {event.eventName}
            </td>
            <td>
              {event.eventDateTo}
            </td>
            <td>
              {event.eventDateFrom}
            </td>
            <td>
            <Button variant="primary" onClick={handleShow}>Tag</Button>
            </td>
          </tr>
        ))
      }      
    </>
  );
};
export default Events