import React, { useState } from 'react';
import { Row, Col, Popconfirm, message, Modal, Table, Typography, Button } from 'antd';
import { 
    EditOutlined,
    DeleteOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";

import InputForm from './InputForm'

const { Title } = Typography;

const PurchaseRequests = (props) => {
    const [loading, setLoading] = useState(false)
    const [defaultpageSize, setDefaultPageSize] = useState(6)
    const [pageSize, setPageSize] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataCount, setDataCount] = useState(0)
    const [range, setRange] = useState([1,6])
    const [offset, setOffset] = useState(0)
    const [sorter, setSorter] = useState(null)
    const [filters, setFilters] = useState(null)
    const [searchText, setSearchText] = useState(null)
    const [displayModal, setDisplayModal] = useState(false)
    const [displayData, setDisplayData] = useState(null)

    //dummy data
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
        },
        {
            title: 'Date Needed',
            dataIndex: 'dateNeeded',
            key: 'dateNeeded',   
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
    
    const [data, setData] = useState([
        {
            'id':'1',
            'number': 'aaaaa',
            'date':'aaaaaa',
            'dateNeeded':'aaaaaa',
            'department':'aaaaaa',
            'status':'aaaaaa'
        },
        {
            'id':'2',
            'number': 'aaaaa',
            'date':'aaaaaa',
            'dateNeeded':'aaaaaa',
            'department':'aaaaaa',
            'status':'aaaaaa'
        },
        {
            'id':'3',
            'number': 'aaaaa',
            'date':'aaaaaa',
            'dateNeeded':'aaaaaa',
            'department':'aaaaaa',
            'status':'aaaaaa'
        }
    ])

    const { path } = useRouteMatch();
    const history = useHistory();
    
    const confirm = (e) => {
        e.stopPropagation();
        message.warning("Successfully deleted")
    }

    const renderColumns = () => {
        var filteredColumn = columns.slice()
        const editColumn = [
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
                            <Popconfirm
                                title="Would you like to delete this?"
                                onConfirm={confirm}
                                onCancel={(e) => {
                                    e.stopPropagation();
                                }}
                                okText="Yes"
                                cancelText="No"
                            >
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
                            </Popconfirm>
                        </div>
                    );                                      
                }
            }
        ]
       
          filteredColumn = filteredColumn.concat(editColumn)
        
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

    const renderModal = (record, rowIndex) => {
        console.log("Row " + rowIndex + record)
        setDisplayData(record)
        setDisplayModal(true)
    }

    const closeModal = () => {
        setDisplayModal(false)
        setDisplayData(null)
    }

    return (
        <Switch>
            <Route path={path + "/new"}>
                <InputForm title={"New Purchase Request"}/>
            </Route>
            <Route path={path + "/:id"}>
                <InputForm title={"Edit Purchase Request"}/>
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
                        columns={renderColumns()} 
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
                                    onClick: () => {
                                        renderModal(record, rowIndex)
                                    },
                                };
                        }}
                        onChange={handleTableChange}
                    />
                    </Col>
                </Row>
                <Modal
                    title={ displayData !== null ? ("PRF Number " + displayData.number) : ("Data") }
                    visible={displayModal}
                    onOk={closeModal}
                    onCancel={closeModal}
                    width={1000}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
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
    }

}