import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Form, Empty, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import {
  listChequeDisbursement,
  addChequeDisbursement,
  clearData,
} from './redux';
import { listChequePrinting } from '../ChequePrintings/redux';
import { listAccountTitles } from '../AccountTitles/redux';
import { listD as listDepartment, listA as listArea, clearData as clearDeptArea } from '../../Maintenance/DepartmentArea/redux';
import { listG as listGroup, clearData as clearGroupCat } from '../../Maintenance/GroupsCategories/redux'
import InputForm from './InputForm';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const ChequeDisbursements = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const listData = useSelector((state) => state.accounting.chequeDisbursements.list);

  const { company } = props;
  const { formDetails, accountingDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listChequeDisbursement({ company, message })).then(() => {
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
    setFormTitle('Create Cheque Disbursement Voucher');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listChequePrinting({ company, message })).then(() => {
      dispatch(listAccountTitles({ company, message })).then(() => {
        dispatch(listDepartment({ company, message })).then(() => {
          dispatch(listArea({ company, message })).then(() => {
            dispatch(listGroup({ company, message })).then(() => {
              history.push(`${path}/new`);
              setLoading(false);
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

    return {
      ...data,
      accountTitles,
      company: {
        id: company
      }
    }
  }

  const onSubmit = (data) => {
    const payload = processSubmitPayload(data)
    console.log(payload)
    dispatch(addChequeDisbursement(payload)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        dispatch(listChequeDisbursement({ company, message })).then(() => {
          setLoading(false);
          history.goBack();
          message.success(`Successfully added Cheque disbursement for ${response.payload.data.chequePrinting.number}`);
        });
      } else {
        setLoading(false);
        message.error(
          `Unable to add Cheque disbursement. Please double check the provided information.`
        );
      }
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
          formTable={accountingDetails}
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
          //formTable={tableDetails}
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
                {/*<Text>{'Voucher Payables: '}</Text>
                <Table
                  dataSource={selectedData[tableDetails.name]}
                  columns={tableDetails.renderTableColumns(tableDetails.fields)}
                  pagination={false}
                  locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                />*/}
              </Space>
            )}
          </Modal>}
        </Row>
      </Route>
    </Switch>
  );
};

export default ChequeDisbursements;
