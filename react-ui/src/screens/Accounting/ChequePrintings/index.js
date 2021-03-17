import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Empty, Popconfirm, message } from 'antd';
import { PlusOutlined, QuestionCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import {
  listChequePrinting,
  addChequePrinting,
  clearData,
  approveChequePrinting,
  rejectChequePrinting
} from './redux';
import { listVendor, clearData as clearVendor } from '../../Maintenance/Vendors/redux';
import { listBankAccount, clearData as clearBankAccount } from '../../Maintenance/BankAccounts/redux';
import FormScreen from '../../../components/forms/FormScreen';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const ChequePrintings = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const listData = useSelector((state) => state.accounting.chequePrintings.list);
  const user = useSelector((state) => state.auth.user);

  const { company } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listChequePrinting({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearVendor());
      dispatch(clearBankAccount());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Cheque Printing');
    setFormData(null);
    setLoading(true);
    dispatch(listVendor({ company, message })).then((response) => {
      dispatch(listBankAccount({ company, message })).then((response1) => {
        const onSuccess = () => {
          history.push(`${path}/new`);
          setLoading(false);
        }
        handleRequestResponse([response, response1], onSuccess, null, '');
      })
    });
  };

  const handleUpdate = (data) => {};

  const handleDelete = (data) => {
  };

  const handleApprove = (data) => {
    setLoading(true)
    dispatch(approveChequePrinting({ id: data.id, user: user.id })).then(() => {
      setDisplayModal(false);
      setSelectedData(null);
      dispatch(listChequePrinting({ company, message })).then(() => {
        setLoading(false)
      });
    });

  }

  const handleReject = (data) => {
    setLoading(true)
    dispatch(rejectChequePrinting({ id: data.id, user: user.id })).then(() => {
      setDisplayModal(false);
      setSelectedData(null);
      dispatch(listChequePrinting({ company, message })).then(() => {
        setLoading(false)
      });
    });

  }

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      vendor: {
        id: data.vendor
      },
      bankAccount: {
        id: data.bankAccount
      },
      company: {
        id: company
      },
    }
    dispatch(addChequePrinting(payload)).then((response) => {
      setLoading(true);
      
      const onSuccess = () => {
        dispatch(listChequePrinting({ company, message })).then(() => {
          setLoading(false);
          history.goBack();
          message.success(`Successfully added ${response.payload.data.number}`);
        });
      };

      const onFail = () => {
        setLoading(false);
        message.error(
          `Unable to create Cheque Printing. Please double check the provided information.`
        );

      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
    setFormData(null);
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <FormScreen
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
        <FormScreen
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
          {<Modal
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
                  selectedData={selectedData}
                  formItems={formDetails.form_items}
                />
                <Text>{'Voucher Payables: '}</Text>
                <Table
                  dataSource={selectedData[tableDetails.name]}
                  columns={tableDetails.renderTableColumns(tableDetails.fields)}
                  pagination={false}
                  locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                />
                
                {(selectedData.status === 'Pending' && // add approval permissions here
                  <>
                    <Text>{'Actions: '}</Text>
                    <Space>
                      <Popconfirm
                        title="Would you like to perform this action?"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={(e) => {
                          handleApprove(selectedData);
                        }}
                        onCancel={(e) => {
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
                          icon={<CheckOutlined />}
                          type="primary"
                        >
                          Approve
                        </Button>
                      </Popconfirm>
                      
                      <Popconfirm
                        title="Would you like to perform this action?"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={(e) => {
                          handleReject(selectedData);
                        }}
                        onCancel={(e) => {
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button
                          style={{ marginRight: '1%' }}
                          icon={<CloseOutlined />}
                          type="primary"
                          danger
                        >
                          Reject
                        </Button>
                      </Popconfirm>
                    </Space>
                  </>
                )}
              </Space>
            )}
          </Modal>}
        </Row>
      </Route>
    </Switch>
  );
};

export default ChequePrintings;
