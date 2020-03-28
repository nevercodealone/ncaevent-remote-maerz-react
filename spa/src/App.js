import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import EventIndex from "./pages/events/EventIndex";
import { Router, Redirect } from "@reach/router";
import EventEdit from "./pages/events/EventEdit";
import Axios from "./axios";

const App = () => {
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    const { data } = await Axios.get("/events");
    setEvents(data);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

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
