import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, Space, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listChequeDisbursement, addChequeDisbursement, clearData } from './redux';
import {
  listChequePrintingByCompanyAndStatus,
  clearData as clearChequePrinting,
} from '../ChequePrintings/redux';
import { listAccountTitles, clearData as clearAccountTitles } from '../AccountTitles/redux';
import {
  listD as listDepartment,
  listA as listArea,
  clearData as clearDeptArea,
} from '../../Maintenance/DepartmentArea/redux';
import {
  listGroupByCompany,
  clearData as clearGroupCat,
} from '../../Maintenance/GroupsCategories/redux';
import InputForm from './InputForm';
import ItemDescription from '../../../components/ItemDescription';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title, Text } = Typography;

const ChequeDisbursements = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const isMounted = useRef(true);

  const { list: listData, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.accounting.chequeDisbursements
  );

  const { company, actions } = props;
  const { formDetails } = FormDetails();

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    dispatch(listChequeDisbursement({ company, message })).then(() => {
      setLoading(false);
    });

    return function cleanup() {
      isMounted.current = false;
      dispatch(clearData());
      dispatch(clearDeptArea());
      dispatch(clearGroupCat());
      dispatch(clearChequePrinting());
      dispatch(clearAccountTitles());
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Create Cheque Disbursement Voucher');
    setFormData(null);
    setLoading(true);
    dispatch(listChequePrintingByCompanyAndStatus({ company, status: 'Approved' })).then(
      (response1) => {
        dispatch(listAccountTitles({ company, message })).then((response2) => {
          dispatch(listDepartment({ company, message })).then((response3) => {
            dispatch(listArea({ company, message })).then((response4) => {
              dispatch(listGroupByCompany({ company })).then((response5) => {
                if (isMounted.current) {
                  const onSuccess = () => {
                    history.push(`${path}/new`);
                    setLoading(false);
                  };
                  const onFail = () => {
                    setLoading(false);
                  };
                  handleRequestResponse(
                    [response1, response2, response3, response4, response5],
                    onSuccess,
                    onFail,
                    ''
                  );
                }
              });
            });
          });
        });
      }
    );
  };

  const handleUpdate = (data) => {};

  const handleDelete = (data) => {};

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

  const processSubmitPayload = (data) => {
    const accountTitles = [];
    data.accountTitles.forEach((item) => {
      accountTitles.push({
        accountTitle: {
          id: item.accountTitle.id,
          type: item.accountTitle.type,
        },
        department: { id: item.department.id },
        group: { id: item.group.id },
        area: { id: item.area.id },
        amount: item?.credit ?? item.debit,
      });
    });

    return {
      ...data,
      accountTitles,
      company: {
        id: company,
      },
    };
  };

  const onSubmit = async (data) => {
    const payload = processSubmitPayload(data);

    await dispatch(addChequeDisbursement(payload)).then((response) => {
      setLoading(true);
      history.goBack();
      const onSuccess = () => {
        dispatch(listChequeDisbursement({ company, message })).then(() => {
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

  // for data display
  const renderTableColumns = (fields) => {
    const columns = [];
    fields.forEach((field) => {
      if (typeof field.render === 'undefined' || field.render === null) {
        field.render = (object) => object[field.name];
      }
      if (field.name !== 'credit' && field.name !== 'debit') {
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) => field.render(object[field.name]),
        });
      } else {
        columns.push({
          title: field.label,
          key: field.name,
          render: (object) =>
            field.render({ [object.accountTitle.type.toLowerCase()]: object.amount }),
        });
      }
    });

    return columns;
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
          // formTable={tableDetails}
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
                  title={`${selectedData.chequePrinting.number} Details`}
                  selectedData={{
                    ...selectedData,
                    ...selectedData.chequePrinting,
                  }}
                  formItems={formDetails.form_items}
                />
                <Text>{'Account Title Entries: '}</Text>
                <Table
                  dataSource={selectedData.accountTitles}
                  columns={renderTableColumns(
                    formDetails.form_items.find((item) => item.name === 'accountTitles').fields
                  )}
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

export default ChequeDisbursements;
