import React from "react";
import Layout from "./Layout";
import EventIndex from "./pages/events/EventIndex";
import { Router, Redirect } from "@reach/router";
import EventEdit from "./pages/events/EventEdit";

const App = () => (
  <Layout>
    <Router>
      <Redirect from="/" to="/events" noThrow />
      <EventIndex path="/events" />
      <EventEdit path="/events/:eventId" />
    </Router>
  </Layout>
);

export default App;
