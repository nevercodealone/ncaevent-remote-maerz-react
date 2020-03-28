import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { navigate } from "@reach/router";

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const EventForm = ({ event, onSubmit }) => {
  const [title, setTitle] = useState(event.title);
  const [url, setUrl] = useState(event.url || "");
  const [isUrlValid, setIsUrlValid] = useState(validateUrl(event.url || ""));
  const [startDate, setStartDate] = useState(
    event.startDate ? new Date(event.startDate) : new Date()
  );

  const [endDate, setEndDate] = useState(
    event.endDate ? new Date(event.endDate) : new Date()
  );

  function validateUrl(possiblyAnUrl) {
    return URL_REGEX.test(possiblyAnUrl);
  }

  function setValidatedUrl(url) {
    setUrl(url);
    setIsUrlValid(validateUrl(url));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    onSubmit({
      title,
      url,
      startDate,
      endDate
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
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
      <Form.Group controlId="startDate">
        <Form.Label>Start Date</Form.Label>
        <br />
        <Form.Control
          type="text"
          name="startDate"
          as={DatePicker}
          selected={startDate}
          onChange={setStartDate}
        />
      </Form.Group>
      <Form.Group controlId="endDate">
        <Form.Label>End Date</Form.Label>
        <br />
        <Form.Control
          type="text"
          name="endDate"
          as={DatePicker}
          selected={endDate}
          onChange={setEndDate}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
const EventEdit = ({ events, eventId, onSubmit }) => {
  const foundEvents = events.filter(e => e.id == eventId);
  const event = foundEvents.length ? foundEvents[0] : null;

  function submit(submittedEvent) {
    Object.keys(submittedEvent).forEach(
      key => (event[key] = submittedEvent[key])
    );
    onSubmit(events);
    navigate("/events");
  }

  return <div>{event && <EventForm event={event} onSubmit={submit} />}</div>;
};

export default EventEdit;
