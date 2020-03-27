import React, { useState } from "react";
import events from "../../events.json";
import { Form } from "react-bootstrap";

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const EventForm = ({ event }) => {
  const [title, setTitle] = useState(event.title);
  const [url, setUrl] = useState(event.url || "");
  const [isUrlValid, setIsUrlValid] = useState(validateUrl(event.url || ""));

  function validateUrl(possiblyAnUrl) {
    return URL_REGEX.test(possiblyAnUrl);
  }

  function setValidatedUrl(url) {
    setUrl(url);
    setIsUrlValid(validateUrl(url));
  }
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
      <Form.Group controlId="url">
        <Form.Label>
          Url {url} {isUrlValid ? 1 : 0}
        </Form.Label>
        <Form.Control
          name="url"
          value={url}
          isInvalid={!isUrlValid}
          isValid={isUrlValid}
          onChange={evt => setValidatedUrl(evt.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          That URL seems invalid
        </Form.Control.Feedback>
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
