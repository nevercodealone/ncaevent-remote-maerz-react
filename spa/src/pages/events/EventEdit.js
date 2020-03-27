import React, { useState } from "react";
import events from "../../events.json";
import { Form } from "react-bootstrap";

const EventForm = ({ event }) => {
  const [title, setTitle] = useState(event.title);
  const [url, setUrl] = useState(event.url || "");

  return (
    <Form>
      <h2>{title}</h2>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={title}
          onChange={evt => setTitle(evt.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Url</Form.Label>
        <Form.Control
          name="url"
          value={url}
          onChange={evt => setUrl(evt.target.value)}
        ></Form.Control>
      </Form.Group>
    </Form>
  );
};
const EventEdit = ({ eventId }) => {
  const foundEvents = events.filter(e => e.id == eventId);
  const event = foundEvents.length ? foundEvents[0] : null;

  return <div>{event && <EventForm event={event} />}</div>;
};

export default EventEdit;
