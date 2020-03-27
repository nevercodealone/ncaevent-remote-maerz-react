import React from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import { Link } from "@reach/router";

const Layout = ({ children }) => (
  <Container>
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/events" }}>
        Events
      </Breadcrumb.Item>
    </Breadcrumb>

    {children}
  </Container>
);

export default Layout;
