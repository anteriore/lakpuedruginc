import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listPDCVoucher, addPDCVoucher, clearData } from './redux';
import InputForm from './InputForm';
import { listPDCDisbursementByStatus } from '../PDCDisbursements/redux';
//import ItemDescription from '../../../components/ItemDescription';

const { Title, Text } = Typography;

const PDCVouchers = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const { formDetails, tableDetails } = FormDetails();

  const listData = useSelector((state) => state.accounting.PDCVouchers.list);

  const { company } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listPDCVoucher({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create PDC Voucher');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listPDCDisbursementByStatus({ status: "Pending", message })).then(() => {
      history.push(`${path}/new`);
      setLoading(false);
    })
  };

  const handleUpdate = (data) => {};

  const handleDelete = (data) => {};

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      company: {
        id: company,
      },
      disbursement: {
        id: data.disbursement,
      },
    };
    if (formMode === 'edit') {
      payload.id = formData.id;
      dispatch(addPDCVoucher(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listPDCVoucher({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully updated ${data.number}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to update ${data.number}`);
        }
      });
    } else if (formMode === 'add') {
      dispatch(addPDCVoucher(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listPDCVoucher({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${response.payload.data.number}`);
          });
        } else {
          setLoading(false);
          message.error(
            `Unable to create PDC Voucher. Please double check the provided information.`
          );
        }
      });
    }
    setFormData(null);
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
            {/*selectedData === null ? (
              <Skeleton />
            ) : (
              <Space direction="vertical" size={20} style={{ width: '100%' }}>
                <ItemDescription
                  title={`${selectedData.pisNo} Details`}
                  selectedData={selectedData}
                  formItems={formDetails.form_items}
                />
                <Text>{'Issued Items: '}</Text>
                <Table
                  dataSource={
                    selectedData[tableDetails.name] !== null &&
                    typeof selectedData[tableDetails.name] !== 'undefined'
                      ? selectedData[tableDetails.name]
                      : []
                  }
                  columns={tableDetails.renderTableColumns(tableDetails.fields)}
                  pagination={false}
                  locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                />
                {selectedData.status === 'Pending' && ( // add approval permissions here
                <>
                  <Text>{'Actions: '}</Text>
                  <Space>
                    <Popconfirm
                      title="Would you like to perform this action?"
                      icon={<QuestionCircleOutlined />}
                      onConfirm={(e) => {
                        handleCancel(selectedData)
                      }}
                      onCancel={(e) => {
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        style={{ marginRight: '1%' }}
                        icon={<CloseOutlined />}
                        onClick={(e) => {
                        }}
                        type="primary"
                        danger
                      >
                        Cancel
                      </Button>
                    </Popconfirm>
                  </Space>
                </>
              )}
              </Space>
                      )*/}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default PDCVouchers;
