import React, { useState } from 'react';
import { Row, Col, Tabs, Typography } from 'antd';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { routes as MaintenanceRoutes } from '../../navigation/maintenance';
import Container from '../../components/container/';
import ModulesGrid from '../../components/ModulesGrid';

const { TabPane } = Tabs;
const { Title } = Typography

function callback(key) {
    console.log(key);
}

const Maintenance = (props) => {
    const { path } = useRouteMatch();
    const [title, setTitle] = useState("Maintenance");
    const [modules, setModules] = useState(MaintenanceRoutes);

    const renderRoutes = () => {
        var routes = []
        
        modules.forEach((module, i) => {
			let ComponentTag = module.component;
			routes.push(
				<Route key={i} path={path + module.path}>
					<Container location={{pathname: path + module.path}}>
						<ComponentTag title={module.title}/>
					</Container>
				</Route>
			)
        })

        return routes
    }

    return (
        <Switch>
            <Route exact path={path}>
                <Container location={{pathname: path}}>
                    <Row>
                        <Title level={3}>{title}</Title>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Tabs defaultActiveKey="1" onChange={console.log("Change Tab")}>
                                <TabPane tab="Lakpue Drug Inc." key="1">
                                    <ModulesGrid company="LDI" modules={modules}/>
                                </TabPane>
                                <TabPane tab="La Croesus Pharma Inc." key="2">
                                    <ModulesGrid company="LCP" modules={modules}/>
                                </TabPane>
                                <TabPane tab="Fanfreluche Enterprises Inc." key="3">
                                    <ModulesGrid company="FEI" modules={modules}/>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </Route>
            {renderRoutes()}
        </Switch>
    )
}

export default Maintenance