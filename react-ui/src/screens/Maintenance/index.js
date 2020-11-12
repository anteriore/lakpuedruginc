import React, { useState } from 'react';
import { Row, Col, Tabs, Typography } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { routes as MaintenanceRoutes } from '../../navigation/maintenance';
import Container from '../../components/container';
import ModulesGrid from '../../components/ModulesGrid';

const { TabPane } = Tabs;
const { Title } = Typography;

const Maintenance = () => {
  const { path } = useRouteMatch();
  const [company, setCompany] = useState(1);

  const handleChangeTab = (id) => {
    setCompany(id);
  };

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Container location={{ pathname: path }}>
            <Row>
              <Title level={3}>Maintenance</Title>
            </Row>
            <Row>
              <Col span={24}>
                <Tabs defaultActiveKey="1" onChange={handleChangeTab}>
                  <TabPane tab="Lakpue Drug Inc." key="1">
                    <ModulesGrid company="LDI" modules={MaintenanceRoutes} />
                  </TabPane>
                  <TabPane tab="La Croesus Pharma Inc." key="2">
                    <ModulesGrid company="LCP" modules={MaintenanceRoutes} />
                  </TabPane>
                  <TabPane tab="Fanfreluche Enterprises Inc." key="3">
                    <ModulesGrid company="FEI" modules={MaintenanceRoutes} />
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </Route>
        {MaintenanceRoutes.map((module) =>
          <Route path={path + module.path}>
            <Container location={{ pathname: path + module.path }}>
              <module.component title={module.title} company={company} />
            </Container>
          </Route>
        )}
      </Switch>
    </>
  );
};

export default Maintenance;
