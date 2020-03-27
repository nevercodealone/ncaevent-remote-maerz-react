import React from "react";
import events from "../../events.json";

const EventEdit = ({ eventId }) => {
  const foundEvents = events.filter(e => e.id == eventId);
  const event = foundEvents.length ? foundEvents[0] : null;

  return <div>{event && <h2 key={event.id}>{event.title}</h2>}</div>;
};

export default EventEdit;
