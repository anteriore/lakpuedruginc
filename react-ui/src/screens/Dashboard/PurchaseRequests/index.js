import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Table, Typography, Button, Modal, Skeleton, Empty } from 'antd';
import { 
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { get, list, resetItemData } from './redux'
import InputForm from './InputForm'
import moment from 'moment';

const { Title } = Typography;

const PurchaseRequests = (props) => {
    const [loading, setLoading] = useState(false)
    const [loadingItem, setLoadingItem] = useState(false)
    const [defaultpageSize, setDefaultPageSize] = useState(6)
    const [pageSize, setPageSize] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataCount, setDataCount] = useState(0)
    const [range, setRange] = useState([1,6])
    const [offset, setOffset] = useState(0)
    const [sorter, setSorter] = useState(null)
    const [filters, setFilters] = useState(null)
    const [searchText, setSearchText] = useState(null)

    const [displayModal, setDisplayModal] = useState(false);
    const [displayData, setDisplayData] = useState(null);

    const [columns, setColumns] = useState([
        {
            title: 'PRF Number',
            dataIndex: 'number',
            key: 'number',   
        },
        {
            title: 'PRF Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => moment(new Date(text)).format("DD/MM/YYYY")   
        },
        {
            title: 'Date Needed',
            dataIndex: 'dateNeeded',
            key: 'dateNeeded',
            render: (text) => moment(new Date(text)).format("DD/MM/YYYY")    
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',   
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',   
        }
    ])

    const [itemColumns, setItemColumns] = useState([
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',   
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
        },
        {
            title: 'Current Stocks',
            dataIndex: 'stocks',
            key: 'stocks',   
        }
    ])
    
    const data = useSelector(state => state.dashboard.purchaseRequests.listData)
    const itemData = useSelector(state => state.dashboard.purchaseRequests.itemData)

    const company = props.company
    const { path } = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch(); 
    
    useEffect(() => {
        dispatch(list({company: company}))
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
                                    console.log("Edit") 
                                    console.log(row)
                                    history.push(path + "/" + row.id)
                                }}
                            >
                                Edit
                            </Button>
                            <Button 
                                icon={<DeleteOutlined />} 
                                type="text" 
                                onClick={(e)=>{ 
                                    e.stopPropagation(); 
                                    console.log("Delete") 
                                    console.log(row)
                                }} 
                            >
                                Delete
                            </Button>
                        </div>
                    );                                      
                }
            }
        ]
       
          filteredColumn = filteredColumn.concat(editpart)
        
        return(filteredColumn)
    }

    const onChangePage = (page, pageSize) => {
        if(loading == false){
            setCurrentPage(page)
        }    
    }

    const onChangePageSize = (currentPage, newPageSize) => {
        if(pageSize !== newPageSize && loading == false){
            setPageSize(newPageSize)
            setCurrentPage(1)
            setOffset(0)               
            getTableData()
        }   
    }

    const onChangeRange = (total, newRange) => {  

        if(range[0] !== newRange[0] || range[1] !== newRange[1] ){
            var offset = newRange[0]-1        
            setRange(newRange)                      
            getTableData()
        }
    }

    const getTableData = () => {
        /*
        setLoading(true)
        var controllerText = `?limit=${pageSize}&offset=${offset}`

        if(searchText !== null){         
            controllerText = controllerText + `&search=${searchText}`
        }

        if(filters !== null){
            controllerText = controllerText + filters
        }

        if(sorter !== null){
            controllerText = controllerText + sorter
        }     
        
        props.getData(API_URL, controllerText) 
        */

       console.log("Getting Data from backend")    

    }

    const handleTableChange = (pagination, filters, newSorter) => {
        handleSorter(newSorter)     
    };
  
    const handleSorter = (newSorter) => {
  
        if(sorter !== newSorter && sorter !== null){
          if(newSorter.order === 'ascend'){
              setSorter(`&ordering=${newSorter.columnKey}`)
              getTableData()
          }else if(newSorter.order === 'descend'){
              setSorter(`&ordering=-${newSorter.columnKey}`)
              getTableData()
          }
          else if(sorter.order === undefined){
              setSorter(null)
          }      
        }
  
    }

    const viewPurchaseRequest = (key) => {
        setLoadingItem(true)
        dispatch(get({id: key}))
        setDisplayModal(true)
    }

    const closeModal = () => {
        setDisplayModal(false)
        setDisplayData(null)
    }

    return (
            <Switch>
                <Route path={path + "/new"}>
                    <InputForm title={"New Purchase Request"} resetItemData={resetItemData}/>
                </Route>
                <Route path={path + "/:id"}>
                    <InputForm title={"Edit Purchase Request"} get={get} resetItemData={resetItemData}/>
                </Route>
                <Route path={path}>
                    <Row>
                        <Col span={20}>
                            <Title level={3}  style={{ "float": "left" }}>{props.title}</Title>
                            <Button 
                                style={{ "float": "right" , marginRight: "1%"}} 
                                icon={<PlusOutlined />}
                                onClick={(e) => { 
                                    console.log(history)
                                    history.push(path + "/new")
                                }}
                            >
                                Add
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                        <Table
                            loading={loading}
                            dataSource={data}
                            columns={columnfilter()} 
                            sorter={true}
                            pagination={ {
                                onChange: (page, pageSize) => { onChangePage(page, pageSize) },
                                showTotal: (total, range)	=> { onChangeRange(total, range) },   
                                onShowSizeChange:(current, size)=>{ onChangePageSize(current, size) },  
                                current: currentPage,                               
                                showQuickJumper:true,                              
                                defaultPageSize: defaultpageSize,
                                pageSizeOptions:[defaultpageSize, '20', '50', '100'],
                                showSizeChanger:true,
                                total:dataCount }
                            }
                            onRow={(record, rowIndex) => {
                                    return {                             
                                        onClick: () => {viewPurchaseRequest(record.id)}, // click row
                                    };
                            }}
                            onChange={handleTableChange}
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
                        {loadingItem ? (
                            <Skeleton />
                        )
                        : (
                            <>
                            <p>Number: {displayData !== null ? (displayData.number) : ("")}</p>
                            <p>Date: {displayData !== null ? (moment(new Date(displayData.date)).format("DD/MM/YYYY") ) : ("")}</p>
                            <p>Date Needed: {displayData !== null ? (moment(new Date(displayData.dateNeeded)).format("DD/MM/YYYY") ) : ("")}</p>
                            <p>Department: {displayData !== null ? (displayData.department) : ("")}</p>
                            <p>Status: {displayData !== null ? (displayData.status) : ("")}</p>
                            <Table
                                dataSource={displayData !== null ? (displayData.requestedItems) : ([])}
                                columns={itemColumns}
                                pagination={false}
                                locale={{emptyText: <Empty description={"No Item Seleted."}/>}} 
                            />
                            <p>Remarks: {displayData !== null ? (displayData.remarks) : ("")}</p>
                            </>
                        )}
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