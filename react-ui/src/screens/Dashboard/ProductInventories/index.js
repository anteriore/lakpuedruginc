import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Typography, Skeleton, Button, Modal, Space, Select, message } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import TableDisplay from '../../../components/TableDisplay';
import Report from '../../../components/Report';
import GeneralHelper, { reevalutateMessageStatus, reevalDependencyMsgStats } from '../../../helpers/general-helper';
import { columns, reportColumns } from './data';
import { listProductInventory, listProductInventoryByDepot, clearData } from './redux';
import { listDepot, clearData as clearDepot } from '../../Maintenance/Depots/redux';

const { Title, Text } = Typography;

const ProductInventories = (props) => {
  const { handleRequestResponse } = GeneralHelper();
  const [loading, setLoading] = useState(true);
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const { company } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { list, status, statusMessage, statusLevel, action } = useSelector((state) => state.dashboard.productInventories);
  const { 
    list: depotList, statusMessage: statusMessageDepot,  
    status: statusDepot, statusLevel: statusLevelDepot,
    action: actionDepot
  } = useSelector((state) => state.maintenance.depots);
  const companies = useSelector((state) => state.company.companyList);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearDepot());
  },[dispatch])

  useEffect(() => {
    dispatch(listProductInventory({ company })).then(() => {
      if (isMounted.current){
        setLoading(false);
        setSelectedDepot(null);
      } else {
        setLoading(false);
        setSelectedDepot(null);
        performCleanup();
      }
    });

    return function cleanup() {
      isMounted.current = false;
    };
  }, [dispatch, company, performCleanup]);

  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDepot,
      statusMessage: statusMessageDepot,
      action: actionDepot, 
      statusLevel: statusLevelDepot,
      module: "Depot"
    });
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot]);

  const handleUpdate = () => {};

  const handleDelete = () => {};

  const handleRetrieve = () => {};

  const handleReport = () => {
    dispatch(listDepot({ company, message })).then((response) => {
      const onSuccess = () => {
        setDisplayModal(true);
      };

      handleRequestResponse([response], onSuccess, '','');
    });
  };

  const onGenerateReport = () => {
    setLoading(true)
    if (selectedDepot !== null) {
      dispatch(listProductInventoryByDepot({ depot: selectedDepot.id, 
      message })).then((response) => {
          const onSuccess = () => {
            setLoading(false)
            history.push(`${path}/report`);  
          };

          const onFail = () => {
            setLoading(false);
          }
    
          handleRequestResponse([response], onSuccess, onFail,'');
        }
      );
    } 
    else {
      setLoading(false)
      history.push(`${path}/report`);
    }
  }

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
        <Report data={list} columns={reportColumns} renderReportDetails={renderReportDetails} />
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
                  data={list}
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
              onOk={onGenerateReport}
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
                    const depotData = depotList.find((item) => item.id === e);
                    setSelectedDepot(depotData);
                  }}
                >
                  {depotList.map((choice) => (
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
