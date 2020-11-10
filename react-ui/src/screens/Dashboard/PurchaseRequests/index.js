import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Typography, Button, Modal, Skeleton, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getPR, listPR, deletePR, resetItemData } from './redux';
import InputForm from './InputForm';
import TableDisplay from '../../../components/TableDisplay';

const { Title } = Typography;

const PurchaseRequests = (props) => {
  const [loadingItem, setLoadingItem] = useState(false);

  const [displayModal, setDisplayModal] = useState(false);
  const [displayData, setDisplayData] = useState(null);

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
      datatype: 'string',
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
    dispatch(listPR({ company }));

    return function cleanup() {
      dispatch(resetItemData());
    };
  }, [dispatch, company]);

  useEffect(() => {
    setDisplayData(itemData);
    setLoadingItem(false);
  }, [itemData]);

  const closeModal = () => {
    setDisplayModal(false);
    setDisplayData(null);
  };

  const handleUpdate = (data) => {
    history.push(`${path}/${data.id}`);
  };

  const handleDelete = (data) => {
    dispatch(deletePR(data.id)).then((response) => {
      dispatch(listPR({ company }));
      message.success(`Successfully deleted Purchase Request ${data.number}`);
    });
  };
  const handleRetrieve = (data) => {
    setLoadingItem(true);
    dispatch(getPR({ id: data.id }));
    setDisplayModal(true);
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
          <Col span={20}>
            <TableDisplay
              columns={columns}
              data={data}
              handleRetrieve={handleRetrieve}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </Col>
        </Row>
        <Modal
          title="Purchase Request"
          visible={displayModal}
          onOk={closeModal}
          onCancel={closeModal}
          width={1000}
        >
          {loadingItem ? (
            <Skeleton />
          ) : (
            <>
              <p>Number: {displayData !== null ? displayData.number : ''}</p>
              <p>
                Date:{' '}
                {displayData !== null
                  ? moment(new Date(displayData.date)).format('DD/MM/YYYY')
                  : ''}
              </p>
              <p>
                Date Needed:{' '}
                {displayData !== null
                  ? moment(new Date(displayData.dateNeeded)).format('DD/MM/YYYY')
                  : ''}
              </p>
              <p>
                Department:{' '}
                {displayData !== null && displayData.department !== null
                  ? displayData.department
                  : ''}
              </p>
              <p>Status: {displayData !== null ? displayData.status : ''}</p>
              <Table
                dataSource={displayData !== null ? displayData.requestedItems : []}
                columns={itemColumns}
                pagination={false}
                locale={{ emptyText: <Empty description="No Item Seleted." /> }}
              />
              <p>Remarks: {displayData !== null ? displayData.remarks : ''}</p>
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default PurchaseRequests;
