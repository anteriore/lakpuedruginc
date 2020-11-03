import React, { useState } from 'react';
import { Row, Col, Tabs, Typography } from 'antd';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Container from '../../components/container/';
import ModulesGrid from '../../components/ModulesGrid';
import PurchaseRequests from './PurchaseRequests/';
import ReceivingReceipts from './ReceivingReceipts/';
import ApprovedReceipts from './ApprovedReceipts/';

const { TabPane } = Tabs;
const { Title } = Typography;

const Dashboard = (props) => {
    const { path } = useRouteMatch();
    const [title, setTitle] = useState("Dashboard");
    const [modules, setModules] = useState([
        {
            title: "Purchase Requests",
            path: "/purchase",
            component: PurchaseRequests
        },
        {
            title: "Receiving Receipts",
            path: "/receiving",
            component: ReceivingReceipts
        },
        {
            title: "Approved Receipts",
            path: "/approved",
            component: ApprovedReceipts
        },
        {
            title: "Material Re-evaluations",
            path: "material/reevaluation",
            component: PurchaseRequests
        },
        {
            title: "Inventory",
            path: "inventory",
            component: PurchaseRequests
        },
        {
            title: "Material Issuance Slips",
            path: "material/issueance",
            component: PurchaseRequests
        },
        {
            title: "Material Receiving Slips",
            path: "material/receiving",
            component: PurchaseRequests
        },
        {
            title: "Inventory Movement Slips",
            path: "inventory/movement",
            component: PurchaseRequests
        },
        {
            title: "Product Movements",
            path: "product/movement",
            component: PurchaseRequests
        },
        {
            title: "Product Inventory",
            path: "product/inventory",
            component: PurchaseRequests
        },
        {
            title: "FG-IS",
            path: "fgis",
            component: PurchaseRequests
        },
        {
            title: "FG-RS",
            path: "fgrs",
            component: PurchaseRequests
        },
        {
            title: "Depot Inventory",
            path: "depot",
            component: PurchaseRequests
        },
        {
            title: "Employee",
            path: "employee",
            component: PurchaseRequests
        },
        {
            title: "Job Order",
            path: "joborder",
            component: PurchaseRequests
        },
        {
            title: "Engineering Items",
            path: "engineering/items",
            component: PurchaseRequests
        },
        {
            title: "Engineering Inventory",
            path: "engineering/inventory",
            component: PurchaseRequests
        },
        {
            title: "Account Summary Reports",
            path: "account/summary",
            component: PurchaseRequests
        },
        {
            title: "Sales Reports",
            path: "sales",
            component: PurchaseRequests
        }
    ])
    
    const renderRoutes = () => {
        var routes = []

        for(var i = 0; i < modules.length; i++){
            var ComponentTag = modules[i].component
            routes.push(
                <Route path={path + modules[i].path}>
                    <Container location={{pathname: path + modules[i].path}}>
                        <ComponentTag title={modules[i].title}/>
                    </Container>
                </Route>
            )
            
        }

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

export default Dashboard