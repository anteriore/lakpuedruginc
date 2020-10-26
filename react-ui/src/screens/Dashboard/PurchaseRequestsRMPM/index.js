import React, { useState } from 'react';
import { Row, Col, Tabs, Table, Typography } from 'antd';
import { 
    EditOutlined
} from '@ant-design/icons';

const PurchaseRequestsRMPM = (props) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [defaultpageSize, setDefaultPageSize] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    const [dataCount, setDataCount] = useState(0)
    const [range, setRange] = useState([1,6])
    const [columns, setColumns] = useState([
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name > b.name,    
            //...this.getColumnSearchProps('name'),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',   
            render: row =>{
              var editItem = row                     
              return(
                <Typography.Text ellipsis={true} style={{width:'10em', wordWrap: 'break-word'}}>
                    {editItem}
                </Typography.Text>
                )
            }   
        },
    ])

    const columnfilter = () => {
        var filteredColumn = columns.slice()
        const editpart = [
            {
                title:'Edit',                   
                render: row => {
                    return (
                      <div onClick={(e)=>{ console.log("CLICK") }}>
                          <EditOutlined />
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

    const onChangeRange = (total, range) =>{  

        if(range[0] !== range[0] || range[1] !== range[1] ){
            var offset = range[0]-1        
            this.setState({range:range})                      
            this.getTableData(this.state.pageSize,offset,this.state.sorter,this.state.filters,this.state.searchText)
        }
    }

    return (
        <div>
            <Row>{props.title}</Row>
            <Row>
                {/*<Table
                    loading={loading}
                    dataSource={data}
                    columns={columnfilter()} 
                    sorter={true}
                    pagination={ {
                        onChange: (page, pageSize) => { onChangePage(page, pageSize) },
                        showTotal: (total, range)	=> {this.onChangeRange(total, range)},   
                        onShowSizeChange:(current, size)=>{this.onChangePageSize(current, size)},  
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
                    onChange={this.handleTableChange}
                />*/}
                *Table here*
            </Row>
        </div>
    )
}

export default PurchaseRequestsRMPM