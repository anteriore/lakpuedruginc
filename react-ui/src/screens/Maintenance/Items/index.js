import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { listI, addI, deleteI, clearData } from './redux';
import { listIT, clearData as clearIT } from '../ItemTypes/redux';
import { listUnit } from '../Units/redux';
import SimpleForm from '../../../components/forms/FormModal';

const { Title } = Typography;

const ItemTypes = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { company } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenance.items.list);
  const types = useSelector((state) => state.maintenance.itemTypes.list);
  const units = useSelector((state) => state.maintenance.units.unitList);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      datatype: 'string',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      datatype: 'object',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      datatype: 'object',
    },
  ];

  const formDetail = {
    form_name: 'itemtypes',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid item name' }],
        placeholder: 'Item name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid item code' }],
        placeholder: 'Item code',
      },
      {
        label: 'Type',
        name: 'type',
        type: 'select',
        choices: types,
      },
      {
        label: 'Unit',
        name: 'unit',
        type: 'select',
        choices: units,
      },
    ],
  };

  useEffect(() => {
    var isCancelled = false
    dispatch(listI({ company, message })).then(() => {
      if(isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearIT());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Add Item');
    setFormMode('add');
    setFormData(null);
    dispatch(listIT({ company, message })).then((response) => {
      dispatch(listUnit({message})).then((response) => {
        setDisplayForm(true);
      });
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Item');
    setFormMode('edit');
    const formData = {
      ...data,
      unit: data.unit.id,
      type: data.type.id,
    };
    setFormData(formData);
    dispatch(listIT({ company, message })).then((response) => {
      dispatch(listUnit({message})).then((response) => {
        setDisplayForm(true);
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteI(data.id)).then((response) => {
      dispatch(listI({ company, message }));
      message.success(`Successfully deleted Item ${data.name}`);
    });
  };

  const handleRetrieve = (data) => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = (values) => {
    const payload = {
      ...values,
      company: {
        id: company,
      },
      type: {
        id: values.type,
      },
      unit: {
        id: values.unit,
      },
    };
    if (formMode === 'edit') {
      payload.id = formData.id;

      dispatch(addI(payload)).then(() => {
        dispatch(listI({ company, message }));
      });
    } else if (formMode === 'add') {
      dispatch(addI(payload)).then(() => {
        dispatch(listI({ company, message }));
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
            {props.title}
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={20}>
          <Button
            style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
            icon={<PlusOutlined />}
            onClick={(e) => {
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
        {displayForm && (
          <SimpleForm
            visible={displayForm}
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetail}
          />
        )}
      </Row>
    </>
  );
};

export default ItemTypes;
