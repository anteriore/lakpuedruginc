import React, { useState } from 'react';
import { Row, Col, Tabs, Table, Typography, Button } from 'antd';
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
                                        onClick: () => {console.log("Row")}, // click row
                                    };
                            }}
                            onChange={handleTableChange}
                        />
                        </Col>
                    </Row>
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