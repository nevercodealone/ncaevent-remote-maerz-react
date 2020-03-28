import React, { useState } from "react";
import Layout from "./Layout";
import EventIndex from "./pages/events/EventIndex";
import { Router, Redirect } from "@reach/router";
import EventEdit from "./pages/events/EventEdit";
import initialEvents from "./events.json";

const App = () => {
  const [events, setEvents] = useState(initialEvents);

  function createNewEvent() {
    const maxId = Math.max(...events.map(e => e.id));

    const event = {
      id: maxId + 1,
      title: "new event"
    };
    const newEvents = [...events, event];
    setEvents(newEvents);
  }

  return (
    <Layout>
      <Router>
        <Redirect from="/" to="/events" noThrow />
        <EventIndex path="/events" events={events} onNew={createNewEvent} />
        <EventEdit
          path="/events/:eventId"
          events={events}
          onSubmit={events => setEvents(events)}
        />
      </Router>
    </Layout>
  );
};

export default App;
