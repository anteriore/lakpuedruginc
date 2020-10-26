import React, { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Container from '../../components/container/';
import ModulesGrid from '../../components/ModulesGrid';
import PurchaseRequests from './PurchaseRequests/';
import PurchaseRequestsRMPM from './PurchaseRequestsRMPM/';
import ReceivingReceipts from './ReceivingReceipts/';
import ApprovedReceipts from './ApprovedReceipts/';

const { TabPane } = Tabs;

const Dashboard = (props) => {
    const { path } = useRouteMatch();
    const [title, setTitle] = useState("Dashboard");
    const [modules, setModules] = useState([
        {
            title: "Purchase Requests RM/PM",
            path: "/purchase/rmpm",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Purchase Requests Non-RM/PM",
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
            component: PurchaseRequestsRMPM
        },
        {
            title: "Inventory",
            path: "inventory",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Material Issuance Slips",
            path: "material/issueance",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Material Receiving Slips",
            path: "material/receiving",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Inventory Movement Slips",
            path: "inventory/movement",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Product Movements",
            path: "product/movement",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Product Inventory",
            path: "product/inventory",
            component: PurchaseRequestsRMPM
        },
        {
            title: "FG-IS",
            path: "fgis",
            component: PurchaseRequestsRMPM
        },
        {
            title: "FG-RS",
            path: "fgrs",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Depot Inventory",
            path: "depot",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Employee",
            path: "employee",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Job Order",
            path: "joborder",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Engineering Items",
            path: "engineering/items",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Engineering Inventory",
            path: "engineering/inventory",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Account Summary Reports",
            path: "account/summary",
            component: PurchaseRequestsRMPM
        },
        {
            title: "Sales Reports",
            path: "sales",
            component: PurchaseRequestsRMPM
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
                            {title}
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