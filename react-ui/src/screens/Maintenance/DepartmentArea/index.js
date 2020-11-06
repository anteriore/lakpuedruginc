import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Typography, Button, Modal, Skeleton, Empty, message } from 'antd';
import {
    PlusOutlined
} from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay'
import { listD, listA } from './redux'

const { Title } = Typography;

const DepartmentArea = (props) => {
    const [loading, setLoading] = useState(false)
    const [loadingItem, setLoadingItem] = useState(false)

    const [displayModal, setDisplayModal] = useState(false);
    const [displayData, setDisplayData] = useState(null);

    const [deptColumns, setDeptColumns] = useState([
        {
            title: 'Dept. Code',
            dataIndex: 'code',
            key: 'code',
            datatype: "string"
        },
        {
            title: 'Dept. Name',
            dataIndex: 'name',
            key: 'name',
            datatype: "string"  
        }
    ])

    const [areaColumns, setAreaColumns] = useState([
        {
            title: 'Area Code',
            dataIndex: 'code',
            key: 'code',
            datatype: "string"
        },
        {
            title: 'Area Name',
            dataIndex: 'name',
            key: 'name',
            datatype: "string"  
        }
    ])

    const company = props.company
    const { path } = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();
    const deptData = useSelector(state => state.maintenance.departmentArea.deptList) 
    const areaData = useSelector(state => state.maintenance.departmentArea.areaList) 

    useEffect(() => {
        dispatch(listD({company: company}))
        dispatch(listA({company: company}))
    }, [])

    const handleUpdate = (data) => {

    }

    const handleDelete = (data) => {

    }
    const handleRetrieve = (data) => {
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Title level={3}  style={{ "float": "left" }}>{props.title}</Title>
                    
                </Col>
            </Row>
            <Row gutter={[16,16]}>
                <Col span={10}>
                <Title level={5}  style={{ "float": "left" }}>Departments</Title>
                <Button 
                    style={{ "float": "right" , marginRight: "0.7%" , marginBottom: "1%"}} 
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                    }}
                >
                    Add
                </Button>
                <TableDisplay
                    columns={deptColumns} 
                    data={deptData} 
                    handleRetrieve={handleRetrieve}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
                </Col>
                <Col span={10}>
                <Title level={5}  style={{ "float": "left" }}>Areas</Title>
                <Button 
                    style={{ "float": "right" , marginRight: "0.7%" , marginBottom: "1%"}} 
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                    }}
                >
                    Add
                </Button>
                <TableDisplay
                    columns={areaColumns} 
                    data={areaData} 
                    handleRetrieve={handleRetrieve}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
                </Col>
            </Row>
        </>
    )
}

export default DepartmentArea