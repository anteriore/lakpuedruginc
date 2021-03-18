import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton, Space, Modal, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import InputForm from './InputForm';
import GeneralHelper from '../../../helpers/general-helper';
import ItemDescription from '../../../components/ItemDescription';

import { listCashReceiptVoucher, addCashReceiptVoucher, clearData } from './redux';
import { listBankAccount, clearData as clearBankAccount } from '../../Maintenance/BankAccounts/redux';
import { listAccountTitles, clearData as clearAccountTitles } from '../AccountTitles/redux';
import { listVoucherByCompanyAndStatus, clearData as clearVouchers } from '../Vouchers/redux';
import { listD as listDepartment, listA as listArea, clearData as clearDeptArea } from '../../Maintenance/DepartmentArea/redux';
import { listG as listGroup, clearData as clearGroupCat } from '../../Maintenance/GroupsCategories/redux';

const { Title, Text } = Typography;

const CashReceiptVouchers = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { company, title, actions } = props;

  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const { formDetails, tableDetails } = FormDetails();

  const { handleRequestResponse } = GeneralHelper();

  const data = useSelector((state) => state.accounting.cashReceiptVouchers.list);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(listCashReceiptVoucher()).then(() => {
      setLoading(false);
    });

    return function cleanup() {
      dispatch(clearData());
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Cash Receipt Voucher');
    setFormMode('add');
    setFormData(null);
    dispatch(listBankAccount({message})).then((response1) => {
      dispatch(listAccountTitles({ company, message })).then((response2) => {
        dispatch(listDepartment({ company, message })).then((response3) => {
          dispatch(listArea({ company, message })).then((response4) => {
            dispatch(listGroup({ company, message })).then((response5) => {
              dispatch(listVoucherByCompanyAndStatus({ company, status: 'Completed' })).then((response6) => {
                const onSuccess = () => {
                  history.push(`${path}/new`);
                };
                handleRequestResponse([response1, response2, response3, response4, response5, response6], onSuccess, null, '');
              })
            })
          })
        })
      })
    })
  };

  const handleUpdate = (data) => {
  };

  const handleDelete = (data) => {
  };

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const processSubmitPayload = (data) => {
    const accountTitles = []
    data.accountTitles.forEach((item) => {
      accountTitles.push({
        accountTitle: {
          id: item.accountTitle.id,
          type: item.accountTitle.type
        },
        department: {id: item.department.id},
        group: {id: item.group.id },
        area: {id: item.area.id },
        amount: item?.credit ?? item.debit
      })
    })

    return {
      ...data,
      accountTitles,
      company: {
        id: company
      },
      bankAccount: {
        id: data.bankAccount
      },
      preparedBy: {
        id: user.id
      },
      voucher: data.variation === 'Adjustment' ? {
        ...data.voucher[0]
      } : null
    }
  }

  const onSubmit = (data) => {
    const payload = processSubmitPayload(data)
    console.log(payload)
    dispatch(addCashReceiptVoucher(payload)).then((response) => {
      setLoading(true);
      
      const onSuccess = () => {
        dispatch(listCashReceiptVoucher()).then(() => {
          setLoading(false);
          history.goBack();
          message.success(`Successfully added Cash Receipt Voucher for ${response.payload.data.number}`);
        });
      };

      const onFail = () => {
        setLoading(false);
        message.error(
          `Unable to add Cash Receipt Voucher. Please double check the provided information.`
        );
      }

      handleRequestResponse([response], onSuccess, onFail, '');
    });
    setFormData(null);
  };

  //for data display
  const renderTableColumns = (fields) => {
    const columns = [];
    fields.forEach((field) => {
      if (typeof field.render === 'undefined' || field.render === null) {
        field.render = (object) => {console.log(object); return object[field.name]};
      }
      if(field.name !== 'credit' && field.name !== 'debit'){
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => {console.log(object); return field.render(object[field.name])},
        });
      }
      else {
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => {console.log('amount', object); console.log(field); return field.render({[object.accountTitle.type.toLowerCase()]: object['amount']})},
        });
      }
    });

    return columns;
  }

  return (
    <Switch>
      <Route path={`${path}/new`}>
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
              {title}
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
              >
                Add
              </Button>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={data}
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
                  selectedData={selectedData}
                  formItems={selectedData.variation === 'Adjustment' ? ( 
                      formDetails.form_items.concat(formDetails.voucher_fields).concat({
                        label: 'Voucher',
                        name: 'voucher',
                        render: (object) => object?.number
                      })
                    ) : (
                      formDetails.form_items
                  )}
                />
                <Text>{'Account Title Entries: '}</Text>
                <Table
                  dataSource={selectedData.accountTitles}
                  columns={renderTableColumns(formDetails.account_titles.fields)}
                  pagination={false}
                />
              </Space>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default CashReceiptVouchers;
