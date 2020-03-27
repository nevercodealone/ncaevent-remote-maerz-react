import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "@reach/router";
import events from "../../events.json";

const EventIndex = () => (
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
    <Button>Create a new Event</Button>
  </div>
);

export default EventIndex;
