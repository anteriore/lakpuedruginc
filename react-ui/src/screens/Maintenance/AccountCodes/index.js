import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { listAC, addAC, deleteAC } from './redux';
import SimpleForm from '../../../components/forms/SimpleForm';

const { Title } = Typography;

const AccountCodes = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      datatype: 'string',
    },
  ];

  const formDetail = {
    form_name: 'accountcodes',
    form_items: [
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid account code' }],
        placeholder: 'Account code',
      },
      {
        label: 'Description',
        name: 'description',
        rules: [{ required: true, message: 'Please provide a valid description' }],
        placeholder: 'Description',
      },
    ],
  };

  const { company, title } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenance.accountCodes.list);

  useEffect(() => {
    dispatch(listAC({ company }));
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Add Account Code');
    setFormMode('add');
    setFormData(null);
    setDisplayForm(true);
  };

  const handleUpdate = (val) => {
    setFormTitle('Edit Account Code');
    setFormMode('edit');
    setDisplayForm(true);
    setFormData(val);
  };

  const handleDelete = (val) => {
    const { id } = val;
    dispatch(deleteAC(id)).then(() => {
      dispatch(listAC({ company }));
      message.success(`Successfully deleted Account Code ${data.name}`);
    });
  };

  const handleRetrieve = () => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = (values) => {
    if (formMode === 'edit') {
      const payload = {
        ...values,
        id: formData.id,
        company: {
          id: company,
        },
      };

      dispatch(addAC(payload)).then(() => {
        dispatch(listAC({ company }));
      });
    } else if (formMode === 'add') {
      const payload = {
        ...values,
        company: {
          id: company,
        },
      };
      dispatch(addAC(payload)).then(() => {
        dispatch(listAC({ company }));
      });
    }

    setDisplayForm(false);
    setFormData(null);
  };

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={3} style={{ float: 'left' }}>
            {title}
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
          >
            Add
          </Button>
          <TableDisplay
            columns={columns}
            data={data}
            handleRetrieve={handleRetrieve}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        </Col>
        <SimpleForm
          visible={displayForm}
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={handleCancelButton}
          formDetails={formDetail}
        />
      </Row>
    </>
  );
};

export default AccountCodes;
