import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';


const Layout = ({children}) => (
<Container>
    <Breadcrumb>
      <Breadcrumb.Item>Events</Breadcrumb.Item>
    </Breadcrumb>
    {children}
</Container>
)

export default Layout