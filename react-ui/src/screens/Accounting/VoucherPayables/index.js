import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';

import {
  listVoucherPayableByCompany,
  addVoucherPayable,
  clearData,
} from './redux';
import { listAccountTitles, clearData as clearAccountTitles } from '../AccountTitles/redux';
import { listD as listDepartment, listA as listArea, clearData as clearDeptArea } from '../../Maintenance/DepartmentArea/redux';
import { listG as listGroup, clearData as clearGroupCat } from '../../Maintenance/GroupsCategories/redux'
import { listVendor, clearData as clearVendor } from '../../Maintenance/Vendors/redux'

import InputForm from './InputForm';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const VoucherPayables = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const listData = useSelector((state) => state.accounting.voucherPayables.list);

  const { company } = props;
  const { formDetails, tableDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listVoucherPayableByCompany({ company, message })).then(() => {
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
    setFormTitle('Create Voucher Payable');
    setFormData(null);
    setLoading(true);
    dispatch(listAccountTitles({ company, message })).then((response1) => {
      dispatch(listDepartment({ company, message })).then((response2) => {
        dispatch(listArea({ company, message })).then((response3) => {
          dispatch(listGroup({ company, message })).then((response4) => {
              dispatch(listVendor({ company, message })).then((response5) => {
                const onSuccess = () => {
                  history.push(`${path}/new`);
                  setLoading(false);
                };
                handleRequestResponse([response1, response2, response3, response4], onSuccess, null, '');
            })
          })
        })
      })
    })
  };

  const handleUpdate = (data) => {};

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
    let voucher = null
    let vouchers = null
    switch(data.variation){
      case "1 Voucher": 
        [voucher] = data.vouchers
        break;
      case "Multiple PJV": 
        vouchers = data.vouchers
        break;
      case "Multiple JV":
        vouchers = data.vouchers
        break;
      default:
        break;

    }

    return {
      ...data,
      accountTitles,
      company: {
        id: company
      },
      voucher: voucher,
      vouchers: vouchers,
      vendor: (data?.vendor ?? null) !== null ? 
        ({
          id: data.vendor
        }) : null
    }
  }

  const onSubmit = (data) => {
    const payload = processSubmitPayload(data)
    dispatch(addVoucherPayable(payload)).then((response) => {
      setLoading(true);
      
      const onSuccess = () => {
        dispatch(listVoucherPayableByCompany({ company, message })).then(() => {
          setLoading(false);
          history.goBack();
          message.success(`Successfully added Voucher Payable ${response.payload.data.number}`);
        });
      };

      const onFail = () => {
        setLoading(false);
        message.error(
          `Unable to add Voucher Payable. Please double check the provided information.`
        );
      }

      handleRequestResponse([response], onSuccess, onFail, '');
    });
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
              </Space>
            )}
          </Modal>}
        </Row>
      </Route>
    </Switch>
  );
};

export default VoucherPayables;
