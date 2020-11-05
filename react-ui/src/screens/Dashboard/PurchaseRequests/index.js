import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Table, Typography, Button, Modal, Skeleton, Empty, Popconfirm, message } from 'antd';
import { 
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getPR, listPR, deletePR, resetItemData } from './redux'
import InputForm from './InputForm'
import TableDisplay from '../../../components/TableDisplay'

const { Title } = Typography;

const PurchaseRequests = (props) => {
    const [loading, setLoading] = useState(false)
    const [loadingItem, setLoadingItem] = useState(false)

    const [displayModal, setDisplayModal] = useState(false);
    const [displayData, setDisplayData] = useState(null);

    const [columns, setColumns] = useState([
        {
            title: 'PRF Number',
            dataIndex: 'number',
            key: 'number',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.number - b.number 
        },
        {
            title: 'PRF Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => moment(new Date(text)).format("DD/MM/YYYY"),
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.date - b.date    
        },
        {
            title: 'Date Needed',
            dataIndex: 'dateNeeded',
            key: 'dateNeeded',
            render: (text) => moment(new Date(text)).format("DD/MM/YYYY"),
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.dateNeeded - b.dateNeeded       
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',   
            render: (object) => object != null ? (object.name) : (''),
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.department - b.department    
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.status - b.status       
        }
    ])

    const [itemColumns, setItemColumns] = useState([
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (object) => object.name    
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',   
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',   
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            render: (object) => object.name    
        },
        {
            title: 'Current Stocks',
            dataIndex: 'stocks',
            key: 'stocks',   
        },
        {
            title: 'Quantity Requested',
            dataIndex: 'quantityRequested',
            key: 'quantityRequested',   
        }
    ])
    
    const data = useSelector(state => state.dashboard.purchaseRequests.listData)
    const itemData = useSelector(state => state.dashboard.purchaseRequests.itemData)

    const company = props.company
    const { path } = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch(); 
    
    useEffect(() => {

        dispatch(listPR({company: company}))

        return function cleanup() {
            dispatch(resetItemData())
        };
    }, [])

    useEffect(() => {
        setDisplayData(itemData)
        setLoadingItem(false)
    }, [itemData])

    const columnfilter = () => {
        var filteredColumn = columns.slice()
        const editpart = [
            {
                title:'',                   
                render: row => {
                    return (
                        <div style={styles.crudColumn}>
                            <Button 
                                icon={<EditOutlined />} 
                                type="text" 
                                onClick={(e)=>{ 
                                    e.stopPropagation();
                                    history.push(path + "/" + row.id)
                                }}
                            >
                                Edit
                            </Button>
                            <Popconfirm
                                title="Would you like to delete this item?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                onConfirm={(e) => {
                                    e.stopPropagation() 
                                    dispatch(deletePR(row.id))
                                        .then((response) => {
                                            dispatch(listPR({company: company}))
                                            message.success("Successfully deleted Purchase Request " + row.number)
                                        })

                                }}
                                onCancel={(e) => {
                                    e.stopPropagation()
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button 
                                    icon={<DeleteOutlined />} 
                                    type="text" 
                                    onClick={(e)=>{ 
                                        e.stopPropagation()
                                    }} 
                                >
                                    Delete
                                </Button>
                            </Popconfirm>
                        </div>
                    );                                      
                }
            }
        ]
       
          filteredColumn = filteredColumn.concat(editpart)
        
        return(filteredColumn)
    }

    const viewPurchaseRequest = (key) => {
    }

    const closeModal = () => {
        setDisplayModal(false)
        setDisplayData(null)
    }

    const handleUpdate = (data) => {
        history.push(path + "/" + data.id)

    }

    const handleDelete = (data) => {
        dispatch(deletePR(data.id))
            .then((response) => {
                dispatch(listPR({company: company}))
                message.success("Successfully deleted Purchase Request " + data.number)
            })

    }
    const handleRetrieve = (data) => {
        setLoadingItem(true)
        dispatch(getPR({id: data.id}))
        setDisplayModal(true)
    }

    return (
            <Switch>
                <Route path={path + "/new"}>
                    <InputForm title={"New Purchase Request"} company={company}/>
                </Route>
                <Route path={path + "/:id"}>
                    <InputForm title={"Edit Purchase Request"} company={company}/>
                </Route>
                <Route path={path}>
                    <Row>
                        <Col span={20}>
                            <Title level={3}  style={{ "float": "left" }}>{props.title}</Title>
                            <Button 
                                style={{ "float": "right" , marginRight: "1%"}} 
                                icon={<PlusOutlined />}
                                onClick={(e) => {
                                    history.push(path + "/new")
                                }}
                            >
                                Add
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                        <TableDisplay
                            columns={columns} 
                            data={data} 
                            handleRetrieve={handleRetrieve}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                        />
                        </Col>
                    </Row>
                    <Modal
                        title={ "Purchase Request" }
                        visible={displayModal}
                        onOk={closeModal}
                        onCancel={closeModal}
                        width={1000}
                        >
                        {
                            loadingItem ? (
                                <Skeleton />
                            )
                            : (
                                <>
                                <p>Number: {displayData !== null ? (displayData.number) : ("")}</p>
                                <p>Date: {displayData !== null ? (moment(new Date(displayData.date)).format("DD/MM/YYYY") ) : ("")}</p>
                                <p>Date Needed: {displayData !== null ? (moment(new Date(displayData.dateNeeded)).format("DD/MM/YYYY") ) : ("")}</p>
                                <p>Department: {displayData !== null && displayData.department !== null ? (displayData.department.id) : ("")}</p>
                                <p>Status: {displayData !== null ? (displayData.status) : ("")}</p>
                                <Table
                                    dataSource={displayData !== null ? (displayData.requestedItems) : ([])}
                                    columns={itemColumns}
                                    pagination={false}
                                    locale={{emptyText: <Empty description={"No Item Seleted."}/>}} 
                                />
                                <p>Remarks: {displayData !== null ? (displayData.remarks) : ("")}</p>
                                </>
                            )
                        }
                    </Modal>
                </Route>
            </Switch>
    )
}

export default PurchaseRequests

const styles = {
    crudColumn: {
        display: "flex",
        flexDirection: "row"
    },
    tailLayout: {
        display: "flex",
        flexDirection: "row-reverse",
        width: "87.5%"
        
    }
}