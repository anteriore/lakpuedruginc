import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton, Descriptions, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import FormDetails, { columns } from './data';

import TableDisplay from '../../../components/TableDisplay';
import FormScreen from '../../../components/forms/FormScreen';
import GeneralHelper from '../../../helpers/general-helper';

import { listCashReceiptVoucher, clearData } from './redux';
import { listBankAccount, clearData as clearBankAccount } from '../../Maintenance/BankAccounts/redux';
import { listAccountTitles, clearData as clearAccountTitles } from '../AccountTitles/redux';
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
  const { formDetails } = FormDetails();

  const { handleRequestResponse } = GeneralHelper();

  const data = useSelector((state) => state.accounting.cashReceiptVouchers.list);

  useEffect(() => {
    dispatch(listCashReceiptVoucher({ company, message })).then(() => {
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
              const onSuccess = () => {
                history.push(`${path}/new`);
              };
              handleRequestResponse([response1, response2, response3, response4, response5], onSuccess, null, '');
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
    //setSelectedData(data);
    //setDisplayModal(true);
  };

  const onSubmit = (data) => {
    setFormData(null);
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
          }}
          formDetails={formDetails}
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
                updateEnabled={actions.includes('update')}
                deleteEnabled={actions.includes('delete')}
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
              <>
                <Descriptions
                  bordered
                  title={`${selectedData.number} Details`}
                  size="default"
                  layout="vertical"
                >
                  {formDetails.form_items.map((item) => {
                    if (!item.writeOnly) {
                      if (item.type === 'select') {
                        const itemData = selectedData[item.name];
                        return (
                          <Descriptions.Item label={item.label}>
                            {itemData[item.selectName]}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'date') {
                        return (
                          <Descriptions.Item label={item.label}>
                            {moment(new Date(selectedData[item.name])).format('DD/MM/YYYY')}
                          </Descriptions.Item>
                        );
                      }
                      if (item.type === 'list') {
                        return null;
                      }

                      return (
                        <Descriptions.Item label={item.label}>
                          {selectedData[item.name]}
                        </Descriptions.Item>
                      );
                    }

                    return null;
                  })}
                </Descriptions>
              </>
            )}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default CashReceiptVouchers;
