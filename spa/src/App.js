import React, { useState } from "react";
import Layout from "./Layout";
import EventIndex from "./pages/events/EventIndex";
import { Router, Redirect } from "@reach/router";
import EventEdit from "./pages/events/EventEdit";
import initialEvents from "./events.json";

const App = () => {
  const [events, setEvents] = useState(initialEvents);
  return (
    <Layout>
      <Router>
        <Redirect from="/" to="/events" noThrow />
        <EventIndex path="/events" events={events} />
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
