import React from 'react';
import { Row, Col } from 'antd';

import Container from '../../components/container/';

const Dashboard = (props) => {
    return (
        <Container location={props.location}>
            <Row>
                Dashboard
            </Row>
            <Row>
                Tabs
            </Row>
        </Container>
    )
}

export default Dashboard