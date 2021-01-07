import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Table,
  Typography,
  Button,
  Modal,
  Skeleton,
  Empty,
  Descriptions,
  Space,
  message,
} from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getPR, listPR, deletePR, approvePR, rejectPR, clearData } from './redux';
import { listD, clearData as clearDepartment } from '../../Maintenance/DepartmentArea/redux';
import { clearData as clearItem } from '../../Maintenance/Items/redux';
import InputForm from './InputForm';
import TableDisplay from '../../../components/TableDisplay';

const { Title, Text } = Typography;

const PurchaseRequests = (props) => {
  const [loading, setLoading] = useState(true);
  const [loadingItem, setLoadingItem] = useState(true);

  const [displayModal, setDisplayModal] = useState(false);
  const [displayData, setDisplayData] = useState(null);

  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);

  const columns = [
    {
      title: 'PRF Number',
      dataIndex: 'number',
      key: 'number',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'PRF Date',
      dataIndex: 'date',
      key: 'date',
      datatype: 'date',
    },
    {
      title: 'Date Needed',
      dataIndex: 'dateNeeded',
      key: 'dateNeeded',
      datatype: 'date',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: departments,
      filterKey: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      datatype: 'string',
    },
  ];

  const itemColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (object) => object.name,
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
      render: (object) => object.name,
    },
    {
      title: 'Current Stocks',
      dataIndex: 'stocks',
      key: 'stocks',
    },
    {
      title: 'Quantity Requested',
      dataIndex: 'quantityRequested',
      key: 'quantityRequested',
    },
  ];

  const data = useSelector((state) => state.dashboard.purchaseRequests.listData);
  const itemData = useSelector((state) => state.dashboard.purchaseRequests.itemData);

  const { company } = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listPR({ company, message })).then(() => {
      dispatch(listD({ company, message })).then(() => {
        setLoading(false);
        if (isCancelled) {
          dispatch(clearData());
        }
      });
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearItem());
      dispatch(clearDepartment());
      isCancelled = true;
    };
  }, [dispatch, company]);

  useEffect(() => {
    setDisplayData(itemData);
  }, [itemData]);

  const closeModal = () => {
    setDisplayModal(false);
    setDisplayData(null);
    setLoadingItem(true);
  };

  const handleUpdate = (data) => {
    history.push(`${path}/${data.id}`);
  };

  const handleDelete = (data) => {
    setLoading(true);
    dispatch(deletePR(data.id)).then(() => {
      dispatch(listPR({ company, message })).then(() => {
        setLoading(false);
        message.success(`Successfully deleted Purchase Request ${data.number}`);
      });
    });
  };
  const handleRetrieve = (data) => {
    setLoadingItem(true);
    dispatch(getPR({ id: data.id })).then(() => {
      setLoadingItem(false);
      setDisplayModal(true);
    });
  };

  const handleApprove = (data) => {
    dispatch(approvePR({ id: data.id })).then(() => {
      closeModal();
      dispatch(listPR({ company, message })).then(() => {});
    });
  };

  const handleReject = (data) => {
    dispatch(rejectPR({ id: data.id })).then(() => {
      closeModal();
      dispatch(listPR({ company, message })).then(() => {});
    });
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Purchase Request" company={company} />
      </Route>
      <Route path={`${path}/:id`}>
        <InputForm title="Edit Purchase Request" company={company} />
      </Route>
      <Route path={path}>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {props.title}
            </Title>
            <Button
              style={{ float: 'right', marginRight: '1%' }}
              icon={<PlusOutlined />}
              onClick={(e) => {
                history.push(`${path}/new`);
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Skeleton />
          ) : (
            <Col span={20}>
              <TableDisplay
                columns={columns}
                data={data}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            </Col>
          )}
        </Row>
        <Modal
          title="Purchase Request"
          visible={displayModal}
          onOk={closeModal}
          onCancel={closeModal}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {loadingItem ? (
            <Skeleton />
          ) : (
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Descriptions bordered size="default" layout="vertical">
                <Descriptions.Item label="Number">
                  {displayData !== null ? displayData.number : 'No data'}
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                  {displayData !== null
                    ? moment(new Date(displayData.date)).format('DD/MM/YYYY')
                    : 'No data'}
                </Descriptions.Item>
                <Descriptions.Item label="Date Needed">
                  {displayData !== null
                    ? moment(new Date(displayData.dateNeeded)).format('DD/MM/YYYY')
                    : 'No data'}
                </Descriptions.Item>
                <Descriptions.Item label="Department">
                  {displayData !== null && displayData.department !== null
                    ? displayData.department.name
                    : 'No data'}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {displayData !== null ? displayData.status : ''}
                </Descriptions.Item>
                <Descriptions.Item label="Remarks">
                  {displayData !== null ? displayData.remarks : ''}
                </Descriptions.Item>
              </Descriptions>
              <Text>{'Requested Items: '}</Text>
              <Table
                dataSource={displayData !== null ? displayData.requestedItems : []}
                columns={itemColumns}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Seleted." /> }}
              />
              {displayData.status === 'Pending' && ( // add approval permissions here
                <>
                  <Text>{'Actions: '}</Text>
                  <Space>
                    <Button
                      style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
                      icon={<CheckOutlined />}
                      onClick={(e) => {
                        handleApprove(displayData);
                      }}
                      type="primary"
                    >
                      Approve
                    </Button>
                    <Button
                      style={{ marginRight: '1%' }}
                      icon={<CloseOutlined />}
                      onClick={(e) => {
                        handleReject(displayData);
                      }}
                      type="primary"
                      danger
                    >
                      Reject
                    </Button>
                  </Space>
                </>
              )}
            </Space>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default PurchaseRequests;
