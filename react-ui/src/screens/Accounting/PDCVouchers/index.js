import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listPDCVoucher, addPDCVoucher, clearData } from './redux';
import InputForm from './InputForm';
import { listPDCDisbursementByStatus } from '../PDCDisbursements/redux';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, { reevalutateMessageStatus, reevalDependencyMsgStats } from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const PDCVouchers = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const isMounted = useRef(true);

  const { formDetails, tableDetails } = FormDetails();
  const { handleRequestResponse } = GeneralHelper();

  const { list: listData, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.accounting.PDCVouchers
  );

  const { 
    status: statusPDC,
    statusLevel: statusLevelPDC,
    statusMessage:  statusMessagePDC,
    action: actionPDC
  } = useSelector(state => state.accounting.PDCDisbursements)

  const { company, actions } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    dispatch(listPDCVoucher({ company, message })).then(() => {
      setLoading(false);
    });

    return function cleanup() {
      isMounted.current = false;
      dispatch(clearData());
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusPDC,
      statusMessage: statusMessagePDC,
      action: actionPDC, 
      statusLevel: statusLevelPDC,
      module: 'PDC Disbursments'
    })
  }, [actionPDC, statusMessagePDC, statusPDC, statusLevelPDC]);

  const handleAdd = () => {
    setFormTitle('Create PDC Voucher');
    setFormData(null);
    setLoading(true);
    dispatch(listPDCDisbursementByStatus({ status: 'Pending', message })).then((response) => {
      if (isMounted.current) {
        const onSuccess = () => {
          history.push(`${path}/new`);
          setLoading(false);
        };
        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      }
    });
  };

  const handleUpdate = (data) => {};

  const handleDelete = (data) => {};

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      company: {
        id: company,
      },
    };
    await dispatch(addPDCVoucher(payload)).then((response) => {
      setLoading(true);
      history.goBack();
      const onSuccess = () => {
        dispatch(listPDCVoucher({ company, message })).then(() => {
          setLoading(false);
        });
      };
      const onFail = () => {
        setLoading(false);
      };
      handleRequestResponse([response], onSuccess, onFail, '');
    });
    setFormData(null);
    return 1;
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
          }}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <InputForm
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
          }}
          formDetails={formDetails}
          formTable={tableDetails}
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
        <Row gutter={[16, 16]}>
          <Col span={20}>
            {actions.includes('create') && (
              <Button
                style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                icon={<PlusOutlined />}
                onClick={() => {
                  handleAdd();
                }}
                loading={loading}
              >
                Add
              </Button>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={listData}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={false}
                deleteEnabled={false}
              />
            )}
          </Col>
          <Modal
            visible={displayModal}
            onOk={() => {
              setDisplayModal(false);
              setSelectedData(null);
            }}
            onCancel={() => {
              setDisplayModal(false);
              setSelectedData(null);
            }}
            width={1000}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            {selectedData === null ? (
              <Skeleton />
            ) : (
              <Space direction="vertical" size={20} style={{ width: '100%' }}>
                <ItemDescription
                  title={`${selectedData.number} Details`}
                  selectedData={formDetails.processDisplayData(selectedData)}
                  formItems={formDetails.form_items}
                />
                <Text>{'Cheques: '}</Text>
                <Table
                  dataSource={selectedData?.disbursement?.cheques ?? []}
                  columns={tableDetails.renderTableColumns(tableDetails.fields)}
                  pagination={false}
                  locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                />
              </Space>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default PDCVouchers;
