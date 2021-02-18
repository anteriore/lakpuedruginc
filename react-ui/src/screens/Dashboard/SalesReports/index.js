import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Divider,
  Typography, 
  Button,
  Select,
  Space,
  Table,
  DatePicker,
  Modal,
  message,  
} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import { listS, clearData as clearSalesReps } from '../../Maintenance/SalesReps/redux';
import { listI, clearData as clearItems } from '../../Maintenance/Items/redux';
import { listPD, clearData as clearDivision } from '../../Maintenance/ProductDivisions/redux';
import { listPC, clearData as clearCategory } from '../../Maintenance/ProductCategories/redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';

const { Title, Text } = Typography;

const SalesReports = (props) => {
    
  const { company } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false)
  const [reportDetails, setReportDetails] = useState({})

  const salesReps = useSelector((state) => state.maintenance.salesReps.list);
  const items = useSelector((state) => state.maintenance.items.list);
  const categories = useSelector((state) => state.maintenance.productCategories.list);
  const divisions = useSelector((state) => state.maintenance.productDivisions.list);
  const depots = useSelector((state) => state.maintenance.depots.list);
  

  useEffect(() => {
    let isCancelled = false;
    dispatch(listS({ company, message })).then(() => {
      dispatch(listI({ company, message })).then(() => {
        dispatch(listPD({ company, message })).then(() => {
          dispatch(listPC({ company, message })).then(() => {
            dispatch(listDepot({ company, message })).then(() => {
            setLoading(false);

              if (isCancelled) {
                dispatch(clearSalesReps());
                dispatch(clearItems());
                dispatch(clearDivision());
                dispatch(clearCategory());
                dispatch(clearDepot());
              }
            })
          })
        })
      })
    });

    return function cleanup() {
      dispatch(clearSalesReps());
      dispatch(clearItems());
      dispatch(clearDivision());
      dispatch(clearCategory());
      dispatch(clearDepot());
      setReportDetails({});
      isCancelled = true;
    };
  }, [dispatch, company]);

  const columns = {
    general: [
      {
        title: 'Sales Rep Code',
        dataIndex: 'srCode',
        key: 'srCode',
        render: () => (
            <Select 
              style={{width: '95%'}} 
              placeholder={"Select Sales Rep"}
              onChange={(e) => {
                const salesRepData = salesReps.find((item) => item.id === e)
                setReportDetails({
                  ...reportDetails,
                  salesRep: salesRepData,
                })
              }}
            >
                {salesReps.map((salesRep) => {
                  return (
                    <Select.Option value={salesRep.id}>{`[${salesRep.code}] ${salesRep.name}`}</Select.Option>
                  )
                })}
            </Select>
        )
      },
      {
        title: 'Division',
        dataIndex: 'division',
        key: 'division',
        render: () => "ALL"
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: () => "ALL"
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
            <Button
                icon={<FileTextOutlined />}
                onClick={() => {
                  setDisplayModal(true)
                }}
            >
                View Report
            </Button>
        )
      },
    ],
    salesRep: [
      {
        title: 'Sales Rep Code',
        dataIndex: 'srCode',
        key: 'srCode',
        render: () => (
            <Select 
              style={{width: '95%'}} 
              placeholder={"Select Sales Rep"}
              onChange={(e) => {
                const salesRepData = salesReps.find((item) => item.id === e)
                setReportDetails({
                  ...reportDetails,
                  salesRep: salesRepData,
                })
              }}
            >
                {salesReps.map((salesRep) => {
                  return (
                    <Select.Option value={salesRep.id}>{`[${salesRep.code}] ${salesRep.name}`}</Select.Option>
                  )
                })}
            </Select>
        )
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
            <Button
                icon={<FileTextOutlined />}
                onClick={() => {
                  setDisplayModal(true)
                }}
            >
                View Report
            </Button>
        )
      },
    ],
    itemProduct: [
      {
        title: 'Item Code',
        dataIndex: 'item',
        key: 'item',
        render: () => (
            <Select 
              style={{width: '95%'}} 
              placeholder={"Select Item"}
              onChange={(e) => {
                const itemData = items.find((item) => item.id === e)
                setReportDetails({
                  ...reportDetails,
                  item: itemData,
                })
              }}
            >
                {items.map((item) => {
                  return (
                    <Select.Option value={item.id}>{`[${item.code}] ${item.name}`}</Select.Option>
                  )
                })}
            </Select>
        )
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
            <Button
                icon={<FileTextOutlined />}
                onClick={() => {
                  setDisplayModal(true)
                }}
            >
                View Report
            </Button>
        )
      },],
    itemCategory: [
      {
        title: 'Division',
        dataIndex: 'division',
        key: 'division',
        render: () => (
          <Select 
            style={{width: '95%'}} 
            placeholder={"Select Division"}
            onChange={(e) => {
              const divisionData = divisions.find((item) => item.id === e)
              setReportDetails({
                ...reportDetails,
                division: divisionData,
              })
            }}
          >
              {divisions.map((division) => {
                return (
                  <Select.Option value={division.id}>{`[${division.code}] ${division.title}`}</Select.Option>
                )
              })}
          </Select>
        )
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: () => (
          <Select 
            style={{width: '95%'}} 
            placeholder={"Select Category"}
            onChange={(e) => {
              const categoryData = categories.find((item) => item.id === e)
              setReportDetails({
                ...reportDetails,
                category: categoryData,
              })
            }}
          >
              {categories.map((category) => {
                return (
                  <Select.Option value={category.id}>{`[${category.code}] ${category.title}`}</Select.Option>
                )
              })}
          </Select>
      )
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
            <Button
                icon={<FileTextOutlined />}
                onClick={() => {
                  setDisplayModal(true)
                }}
            >
                View Report
            </Button>
        )
      },]
    
};

  return (
    <Switch>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {props.title}
            </Title>
            
          </Col>
        </Row>
        {!loading && <Row>
          <Space direction="vertical" size={10} style={{ width: '100%' }}>
            <Divider orientation="left">
              General Sales Report
            </Divider>
            <Table
              dataSource={[{}]}
              columns={columns.general}
              pagination={false}
            />
            <Divider orientation="left">
              Sales Rep Client Report
            </Divider>
            <Table
              dataSource={[{}]}
              columns={columns.salesRep}
              pagination={false}
            />
            <Divider orientation="left">
              Item Sales Report (By Product)
            </Divider>
            <Table
              dataSource={[{}]}
              columns={columns.itemProduct}
              pagination={false}
            />
            <Divider orientation="left">
              Item Sales Report (By Category/Division)
            </Divider>
            <Table
              dataSource={[{}]}
              columns={columns.itemCategory}
              pagination={false}
            />
          </Space>
        </Row>}
        {displayModal && <Modal
          visible={displayModal}
          cancelText="Cancel"
          okText="Generate Report"
          title={"Report Details"}
          onCancel={() => setDisplayModal(false)}
          onOk={() => {
            console.log(reportDetails)
          }}
          afterClose={() => {
          }}
        >
          <Space size={12} direction={"vertical"} style={{width: '100%'}}>
            <Text>Select Depot: </Text>
            <Select
              showSearch
              placeholder={"Select Depot"}
              optionFilterProp="children"
              style={{width: '100%'}}
              onChange={(e) => {
                const depotData = depots.find((item) => item.id === e)
                setReportDetails({
                  ...reportDetails,
                  depot: depotData,
                })
              }}
            >
              {depots.map((choice) => (
                <Select.Option key={choice.id} value={choice.id}>
                  {`[${choice.code}] ${choice.name}`}
                </Select.Option>
              ))}
            </Select>
            <Text>Select Date Range: </Text>
            <DatePicker.RangePicker
              onChange={(e) => {
                if(e !== null){
                  setReportDetails({
                    ...reportDetails,
                    dateRange: e
                  })
                }
                else if(reportDetails.hasOwnProperty("dateRange")){
                  var reportDetailsTemp = {
                    ...reportDetails
                  }
                  delete reportDetailsTemp.dateRange
                  setReportDetails(reportDetailsTemp)
                }
              }}
            />
          </Space>
        </Modal>}
      </Route>
    </Switch>
  );
};

export default SalesReports;
