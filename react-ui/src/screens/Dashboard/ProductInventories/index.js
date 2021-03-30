import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Skeleton, Button, Modal, Space, Select, message } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import Report from '../../../components/Report';

import { columns, reportColumns } from './data';
import { listProductInventory, listProductInventoryByDepot, clearData } from './redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';

const { Title, Text } = Typography;

const ProductInventories = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const { company } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const listData = useSelector((state) => state.dashboard.productInventories.list);
  const depots = useSelector((state) => state.maintenance.depots.list);
  const companies = useSelector((state) => state.company.companyList);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listProductInventory({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
        dispatch(clearDepot());
        setSelectedDepot(null);
      }
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleUpdate = (data) => {};

  const handleDelete = (data) => {};

  const handleRetrieve = (data) => {};

  const handleReport = () => {
    dispatch(listDepot({ company, message })).then(() => {
      setDisplayModal(true);
    });
  };

  const renderReportDetails = () => {
    return (
      <>
        <Row>
          <Col span={12} style={{ display: 'flex' }}>
            <Title level={5}>Report: Depot Inventory Report</Title>
          </Col>
          <Col span={12} style={{ display: 'flex' }}>
            <Title level={5}>{`Depot: ${
              selectedDepot !== null ? selectedDepot.name : 'all'
            }`}</Title>
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
  };

  return (
    <Switch>
      <Route exact path={`${path}/report`}>
        <Report data={listData} columns={reportColumns} renderReportDetails={renderReportDetails} />
      </Route>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {props.title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            {loading ? (
              <Skeleton />
            ) : (
              <>
                <Button
                  style={{ float: 'right', marginBottom: '1%' }}
                  icon={<FileTextOutlined />}
                  onClick={() => {
                    handleReport();
                  }}
                  loading={loading}
                >
                  View Report
                </Button>
                <TableDisplay
                  columns={columns}
                  data={listData}
                  handleRetrieve={handleRetrieve}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  updateEnabled={false}
                  deleteEnabled={false}
                />
              </>
            )}
          </Col>
          {displayModal && (
            <Modal
              visible={displayModal}
              cancelText="Cancel"
              okText="Generate Report"
              title="Report Details"
              onCancel={() => {
                setDisplayModal(false)
                setLoading(false)

                //TODO: Cancel dispatch onCancel
              }}
              onOk={() => {
                setLoading(true)
                if (selectedDepot !== null) {
                  dispatch(listProductInventoryByDepot({ depot: selectedDepot.id, message })).then(
                    () => {
                      setLoading(false)
                      history.push(`${path}/report`);
                    }
                  );
                } 
                else {
                  setLoading(false)
                  history.push(`${path}/report`);
                }
              }}
              okButtonProps={{ loading: loading }}
              afterClose={() => {
                setSelectedDepot(null);
              }}
            >
              <Space size={12} direction="vertical" style={{ width: '100%' }}>
                <Text>Select Depot: </Text>
                <Select
                  showSearch
                  placeholder="Select Depot"
                  optionFilterProp="children"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    const depotData = depots.find((item) => item.id === e);
                    setSelectedDepot(depotData);
                  }}
                >
                  {depots.map((choice) => (
                    <Select.Option key={choice.id} value={choice.id}>
                      {`[${choice.code}] ${choice.name}`}
                    </Select.Option>
                  ))}
                </Select>
              </Space>
            </Modal>
          )}
        </Row>
      </Route>
    </Switch>
  );
};

export default ProductInventories;
