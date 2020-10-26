import React, { useState } from 'react';
import { Row, Col, Tabs, Table, Typography } from 'antd';
import { 
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

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
            'number': 'aaaaa',
            'date':'aaaaaa',
            'dateNeeded':'aaaaaa',
            'department':'aaaaaa',
            'status':'aaaaaa'
        },
        {
            'number': 'aaaaa',
            'date':'aaaaaa',
            'dateNeeded':'aaaaaa',
            'department':'aaaaaa',
            'status':'aaaaaa'
        },
        {
            'number': 'aaaaa',
            'date':'aaaaaa',
            'dateNeeded':'aaaaaa',
            'department':'aaaaaa',
            'status':'aaaaaa'
        }
    ])

    const columnfilter = () => {
        var filteredColumn = columns.slice()
        const editpart = [
            {
                title:'',                   
                render: row => {
                    return (
                        <div style={styles.crudColumn}>
                            <div onClick={(e)=>{ console.log("Edit") }} style={styles.crudButton}>
                                <EditOutlined />
                            </div>
                            <div onClick={(e)=>{ console.log("Delete") }} style={styles.crudButton}>
                                <DeleteOutlined />
                            </div>
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
        <div>
            <Row><Title level={3}>{props.title}</Title></Row>
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
                                onClick: () => {console.log("CLICK")}, // click row
                            };
                    }}
                    onChange={handleTableChange}
                />
                </Col>
            </Row>
        </div>
    )
}

export default PurchaseRequests

const styles = {
    crudColumn: {
        display: "flex",
        flexDirection: "row"
    },
    crudButton: {
        marginLeft: "15%",
    }

}