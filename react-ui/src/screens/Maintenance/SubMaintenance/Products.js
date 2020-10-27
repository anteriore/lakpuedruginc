import React, {useState} from 'react';
import { 
  Row, 
  Col, 
  Typography, 
  Button, 
  Input,
  DatePicker,
  Space,
  Table
} from 'antd';
import {Switch, Route, useRouteMatch, useHistory} from 'react-router-dom';
import { 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const Product = (props) => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const [columns, setColumns] = useState([
      {
          title: 'Lot #',
          dataIndex: 'id',
          key: 'id',  
      },
      {
          title: 'FG Code',
          dataIndex: 'fg_code',
          key: 'fg_code',
          align: 'center'   
      },
      {
          title: 'FG Name',
          dataIndex: 'fg_name',
          key: 'fg_name',
          align: 'center'  
      },
      {
          title: 'Expiry',
          dataIndex: 'expiration_date',
          key: 'expiration_date',
          align: 'center'
      }
  ]);

  const [data, setData] = useState([
    {
        'id':'1',
        'fg_code': "12313123",
        'fg_name':'tune',
        'expiration_date':'1-19-2020'
    },
    {
      'id':'2',
      'fg_code': "21313123",
      'fg_name':'milk',
      'expiration_date':'1-19-2020'
    },
    {
      'id':'3',
      'fg_code': "12313123",
      'fg_name': 'cola',
      'expiration_date':'1-19-2020'
    }
  ])

  const columnFilter = () => {
    var filteredColumn = columns.slice();
    const actionColumn = [
      {
        title:'Actions',                   
        render: row => {
            return (
              <div style={styles.crudColumn}>
                <Button 
                  icon={<EditOutlined />} 
                  type="text" 
                  onClick={(e)=>{
                    history.push(path + "/" + row.id)
                  }}
                >
                  Edit
                </Button>
                <Button 
                  icon={<DeleteOutlined />} 
                  type="text" 
                  onClick={(e)=>{ 
                    
                  }} 
                >
                  Delete
                </Button>
            </div>
          );                                      
        },
        align: 'center'
      }
    ]

    filteredColumn = filteredColumn.concat(actionColumn)

    return filteredColumn; 
  }

  return (
    <Switch>
      <Route path={path}>
        <Row gutter={[8,24]}>
          <Col style={styles.headerPage} span={20}>
            <Title level={3}>
              {props.title}
            </Title>
            <Button
              icon={ <PlusOutlined/> }
            >
              Add
            </Button>
          </Col>
          <Col style={styles.filterArea} span={10}>
            <Space size="large">
              <Search  placeholder="Search Product Name"/>
              <RangePicker/>
            </Space>
          </Col>
          <Col span={20}>
            <Table
              dataSource={data}
              columns={columnFilter()}
            />
          </Col>
        </Row>
      </Route>
    </Switch>
  )
}

export default Product;

const styles = {
  headerPage:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  filterArea: {
    display: 'flex',
    flexDirection: 'row',
  }
}