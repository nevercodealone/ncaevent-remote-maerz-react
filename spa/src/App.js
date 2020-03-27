import React from "react";
import { Col, Row, ListGroup, Button } from "react-bootstrap";
import Layout from "./Layout";

const events = [{ title: "test1" }, { title: "test2" }, { title: "test3" }];

const App = () => (
  <Layout>
    <h2>Events!</h2>
    <ListGroup>
      {events.map(event => (
        <ListGroup.Item action href="">
          {event.title}
        </ListGroup.Item>
      ))}
    </ListGroup>
    <Button>Create a new Event</Button>
  </Layout>
);

export default App;
