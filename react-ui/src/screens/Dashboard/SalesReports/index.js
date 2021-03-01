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
  Skeleton,
} from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import Report from '../../../components/Report';
import GeneralHelper from '../../../helpers/general-helper';
import { reportColumns } from './data';

import { listS, clearData as clearSalesReps } from '../../Maintenance/SalesReps/redux';
import { listItemReportSummaryByProduct } from '../../Maintenance/Items/redux';
import { listProduct, clearData as clearProducts } from '../../Maintenance/Products/redux';
import { listPD, clearData as clearDivision } from '../../Maintenance/ProductDivisions/redux';
import { listPC, clearData as clearCategory } from '../../Maintenance/ProductCategories/redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';
import { listClientBySalesRep } from '../../Maintenance/Clients/redux';

const { Title, Text } = Typography;

const SalesReports = (props) => {
  const { company } = props;
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [reportType, setReportType] = useState(null);
  const [reportData, setReportData] = useState();
  const [reportDetails, setReportDetails] = useState({});

  const salesReps = useSelector((state) => state.maintenance.salesReps.list);
  const products = useSelector((state) => state.maintenance.products.productList);
  const categories = useSelector((state) => state.maintenance.productCategories.list);
  const divisions = useSelector((state) => state.maintenance.productDivisions.list);
  const depots = useSelector((state) => state.maintenance.depots.list);
  const companies = useSelector((state) => state.company.companyList);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listS({ company, message })).then(() => {
      dispatch(listProduct({ company, message })).then(() => {
        dispatch(listPD({ company, message })).then(() => {
          dispatch(listPC({ company, message })).then(() => {
            dispatch(listDepot({ company, message })).then(() => {
              setLoading(false);

              if (isCancelled) {
                dispatch(clearSalesReps());
                dispatch(clearProducts());
                dispatch(clearDivision());
                dispatch(clearCategory());
                dispatch(clearDepot());
              }
            });
          });
        });
      });
    });

    return function cleanup() {
      dispatch(clearSalesReps());
      dispatch(clearProducts());
      dispatch(clearDivision());
      dispatch(clearCategory());
      dispatch(clearDepot());
      setReportDetails({});
      setReportType(null);
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
            style={{ width: '95%' }}
            placeholder="Select Sales Rep"
            onChange={(e) => {
              // const salesRepData = salesReps.find((item) => item.id === e)
              setReportDetails({
                ...reportDetails,
                salesRep: e,
              });
            }}
          >
            {salesReps.map((salesRep) => {
              return (
                <Select.Option
                  value={salesRep.id}
                >{`[${salesRep.code}] ${salesRep.name}`}</Select.Option>
              );
            })}
          </Select>
        ),
      },
      {
        title: 'Division',
        dataIndex: 'division',
        key: 'division',
        render: () => 'ALL',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: () => 'ALL',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
          <Button
            icon={<FileTextOutlined />}
            onClick={() => {
              generateReport('general');
            }}
          >
            View Report
          </Button>
        ),
      },
    ],
    salesRep: [
      {
        title: 'Sales Rep Code',
        dataIndex: 'srCode',
        key: 'srCode',
        render: () => (
          <Select
            showSearch
            optionFilterProp="children"
            style={{ width: '95%' }}
            placeholder="Select Sales Rep"
            onChange={(e) => {
              // const salesRepData = salesReps.find((item) => item.id === e)
              setReportDetails({
                ...reportDetails,
                salesRep: e,
              });
            }}
          >
            {salesReps.map((salesRep) => {
              return (
                <Select.Option
                  value={salesRep.id}
                >{`[${salesRep.code}] ${salesRep.name}`}</Select.Option>
              );
            })}
          </Select>
        ),
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
          <Button
            icon={<FileTextOutlined />}
            onClick={() => {
              generateReport('salesRep');
            }}
          >
            View Report
          </Button>
        ),
      },
    ],
    itemProduct: [
      {
        title: 'Item Code',
        dataIndex: 'item',
        key: 'item',
        render: () => (
          <Select
            showSearch
            optionFilterProp="children"
            style={{ width: '95%' }}
            placeholder="Select Product"
            onChange={(e) => {
              // const itemData = items.find((item) => item.id === e)
              setReportDetails({
                ...reportDetails,
                product: e,
              });
            }}
          >
            {products.map((item) => {
              return (
                <Select.Option
                  value={item.id}
                >{`[${item.finishedGood.code}] ${item.finishedGood.name}`}</Select.Option>
              );
            })}
          </Select>
        ),
      },
      {
        title: 'Depot',
        dataIndex: 'depot',
        key: 'depot',
        render: () => (
          <Select
            showSearch
            optionFilterProp="children"
            style={{ width: '95%' }}
            placeholder="Select Depot"
            onChange={(e) => {
              // const itemData = items.find((item) => item.id === e)
              setReportDetails({
                ...reportDetails,
                depot: e,
              });
            }}
          >
            {depots.map((item) => {
              return <Select.Option value={item.id}>{`[${item.code}] ${item.name}`}</Select.Option>;
            })}
          </Select>
        ),
      },
      {
        title: 'Date Range',
        dataIndex: 'dateRange',
        key: 'dateRange',
        render: () => (
          <DatePicker.RangePicker
            onChange={(e) => {
              if (e !== null) {
                setReportDetails({
                  ...reportDetails,
                  dateRange: e,
                });
              } else if (reportDetails.hasOwnProperty('dateRange')) {
                const reportDetailsTemp = {
                  ...reportDetails,
                };
                delete reportDetailsTemp.dateRange;
                setReportDetails(reportDetailsTemp);
              }
            }}
          />
        ),
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
          <Button
            icon={<FileTextOutlined />}
            onClick={() => {
              generateReport('itemProduct');
            }}
          >
            View Report
          </Button>
        ),
      },
    ],
    itemCategory: [
      {
        title: 'Division',
        dataIndex: 'division',
        key: 'division',
        render: () => (
          <Select
            style={{ width: '95%' }}
            placeholder="Select Division"
            onChange={(e) => {
              // const divisionData = divisions.find((item) => item.id === e)
              setReportDetails({
                ...reportDetails,
                division: e,
              });
            }}
          >
            {divisions.map((division) => {
              return (
                <Select.Option
                  value={division.id}
                >{`[${division.code}] ${division.title}`}</Select.Option>
              );
            })}
          </Select>
        ),
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: () => (
          <Select
            style={{ width: '95%' }}
            placeholder="Select Category"
            onChange={(e) => {
              // const categoryData = categories.find((item) => item.id === e)
              setReportDetails({
                ...reportDetails,
                category: e,
              });
            }}
          >
            {categories.map((category) => {
              return (
                <Select.Option
                  value={category.id}
                >{`[${category.code}] ${category.title}`}</Select.Option>
              );
            })}
          </Select>
        ),
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: () => (
          <Button
            icon={<FileTextOutlined />}
            onClick={() => {
              generateReport('itemCategory');
            }}
          >
            View Report
          </Button>
        ),
      },
    ],
  };

  // header for the report
  const renderReportDetails = () => {
    switch (reportType) {
      case 'general':
        return (
          <>
            <Row>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>Report: General Sales Report</Title>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>{`Company: ${
                  companies.find((companyData) => companyData.id === company).name
                }`}</Title>
              </Col>
            </Row>
          </>
        );
      case 'salesRep':
        return (
          <>
            <Row>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>Report: Sales Rep Client Report</Title>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>{`Company: ${
                  companies.find((companyData) => companyData.id === company).name
                }`}</Title>
              </Col>
            </Row>
          </>
        );
      case 'itemProduct':
        return (
          <>
            <Row>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>Report: Item Sales Report</Title>
              </Col>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>{`Dates: ${reportDetails?.dateRange[0].format(
                  'DD/MM/YYYY'
                )} - ${reportDetails?.dateRange[1].format('DD/MM/YYYY')}`}</Title>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>{`Company: ${
                  companies.find((companyData) => companyData.id === company).name
                }`}</Title>
              </Col>
            </Row>
          </>
        );
      case 'itemCategories':
        return (
          <>
            <Row>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>Report: Item Sales Report</Title>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ display: 'flex' }}>
                <Title level={5}>{`Company: ${
                  companies.find((companyData) => companyData.id === company).name
                }`}</Title>
              </Col>
            </Row>
          </>
        );
      default:
        break;
    }
  };

  const generateReport = (type) => {
    setReportType(type);
    switch (type) {
      case 'general':
        break;
      case 'salesRep':
        dispatch(listClientBySalesRep({ ...reportDetails, company })).then((response) => {
          const onSuccess = () => {
            setReportData(response.payload.data);
            history.push(`${path}/report`);
          };
          handleRequestResponse([response], onSuccess, null, '');
        });
        break;
      case 'itemProduct':
        dispatch(listItemReportSummaryByProduct({ ...reportDetails, company })).then((response) => {
          const productData = products.find((item) => item.id === reportDetails?.product);
          const onSuccess = () => {
            setReportData([
              {
                ...response.payload.data,
                product: productData,
              },
            ]);
            history.push(`${path}/report`);
          };
          handleRequestResponse([response], onSuccess, null, '');
        });
        break;
      case 'itemCategories':
        break;
      default:
        break;
    }
  };

  return (
    <Switch>
      <Route exact path={`${path}/report`}>
        <Report
          data={reportData}
          columns={reportColumns[reportType]}
          renderReportDetails={renderReportDetails}
        />
      </Route>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {props.title}
            </Title>
          </Col>
        </Row>
        {loading ? (
          <Skeleton />
        ) : (
          <Row>
            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              <Divider orientation="left">General Sales Report</Divider>
              <Table dataSource={[{}]} columns={columns.general} pagination={false} />
              <Divider orientation="left">Sales Rep Client Report</Divider>
              <Table dataSource={[{}]} columns={columns.salesRep} pagination={false} />
              <Divider orientation="left">Item Sales Report (By Product)</Divider>
              <Table dataSource={[{}]} columns={columns.itemProduct} pagination={false} />
              <Divider orientation="left">Item Sales Report (By Category/Division)</Divider>
              <Table dataSource={[{}]} columns={columns.itemCategory} pagination={false} />
            </Space>
          </Row>
        )}
        {displayModal && (
          <Modal
            visible={displayModal}
            cancelText="Cancel"
            okText="Generate Report"
            title="Report Details"
            onCancel={() => {
              setReportType(null);
              setDisplayModal(false);
            }}
            onOk={() => {
              generateReport(reportType);
            }}
            afterClose={() => {}}
          >
            <Space size={12} direction="vertical" style={{ width: '100%' }}>
              <Text>Select Depot: </Text>
              <Select
                showSearch
                placeholder="Select Depot"
                optionFilterProp="children"
                style={{ width: '100%' }}
                onChange={(e) => {
                  // const depotData = depots.find((item) => item.id === e)
                  setReportDetails({
                    ...reportDetails,
                    depot: e,
                  });
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
                  if (e !== null) {
                    setReportDetails({
                      ...reportDetails,
                      dateRange: e,
                    });
                  } else if (reportDetails.hasOwnProperty('dateRange')) {
                    const reportDetailsTemp = {
                      ...reportDetails,
                    };
                    delete reportDetailsTemp.dateRange;
                    setReportDetails(reportDetailsTemp);
                  }
                }}
              />
            </Space>
          </Modal>
        )}
      </Route>
    </Switch>
  );
};

export default SalesReports;
