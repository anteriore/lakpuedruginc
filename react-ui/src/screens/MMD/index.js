/* eslint-disable no-unused-vars, no-console, no-plusplus */
import React, { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const MMD = (props) => {
  const { path } = useRouteMatch();
  const [title, setTitle] = useState('MMD');
  const [modules, setModules] = useState([]);

  const renderRoutes = () => {
    const routes = [];

    for (let i = 0; i < modules.length; i++) {
      const ComponentTag = modules[i].component;
      routes.push(
        <Route path={path + modules[i].path}>
          <Container location={{ pathname: path + modules[i].path }}>
            <ComponentTag title={modules[i].title} />
          </Container>
        </Route>
      );
    }

    return routes;
  };

  return (
    <Switch>
      <Route exact path={path}>
        <Container location={{ pathname: path }}>
          <Row>{title}</Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey="1" onChange={console.log('Change Tab')}>
                <TabPane tab="Lakpue Drug Inc." key="1">
                  <ModulesGrid company="LDI" modules={modules} />
                </TabPane>
                <TabPane tab="La Croesus Pharma Inc." key="2">
                  <ModulesGrid company="LCP" modules={modules} />
                </TabPane>
                <TabPane tab="Fanfreluche Enterprises Inc." key="3">
                  <ModulesGrid company="FEI" modules={modules} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Route>
      {renderRoutes()}
    </Switch>
  );
};

export default MMD;
