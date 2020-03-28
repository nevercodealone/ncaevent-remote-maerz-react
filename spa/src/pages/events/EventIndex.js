import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "@reach/router";

const EventIndex = ({ events, onNew }) => {
  return (
    <div>
      <h2>Events!</h2>
      <ListGroup>
        {events.map(event => (
          <ListGroup.Item
            action
            as={Link}
            to={`/events/${event.id}`}
            key={event.id}
          >
            {event.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button onClick={onNew}>Create a new Event</Button>
    </div>
  );
};

export default EventIndex;
