import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { listItemWithoutEng, addI, updateI, deleteI, clearData } from './redux';
import { listIT, clearData as clearIT } from '../ItemTypes/redux';
import { listUnit } from '../Units/redux';
import SimpleForm from '../../../components/forms/FormModal';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const Items = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);
  const { company, actions } = props;
  const dispatch = useDispatch();
  const { list, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.maintenance.items
  );
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
        tooltip:
          'Items of type "Engineering Materials" could be found in the Engineering Items module',
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
    let isCancelled = false;
    dispatch(listItemWithoutEng({ company, message })).then(() => {
      setContentLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearIT());
      isCancelled = true;
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({
      status,
      action,
      statusMessage,
      statusLevel,
    });
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Add Item');
    setFormMode('add');
    setFormData(null);
    dispatch(listIT({ company, message })).then((response) => {
      dispatch(listUnit({ message })).then((response) => {
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
      dispatch(listUnit({ message })).then((response) => {
        setDisplayForm(true);
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteI(data.id)).then((response) => {
      dispatch(listItemWithoutEng({ company, message }));
    });
  };

  const handleRetrieve = (data) => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = async (values) => {
    setContentLoading(true);
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

      await dispatch(updateI(payload)).then(() => {
        dispatch(listItemWithoutEng({ company, message }));
        setContentLoading(false);
      });
    } else if (formMode === 'add') {
      await dispatch(addI(payload)).then(() => {
        dispatch(listItemWithoutEng({ company, message }));
        setContentLoading(false);
      });
    }

    setDisplayForm(false);
    setFormData(null);
    return 1;
  };

  return (
    <Row gutter={[8, 24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title level={3} style={{ float: 'left' }}>
          {props.title}
        </Title>
        {actions.includes('create') && (
          <Button
            style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
            icon={<PlusOutlined />}
            loading={contentLoading}
            onClick={(e) => {
              handleAdd();
            }}
          >
            Add
          </Button>
        )}
      </Col>
      <Col span={20}>
        {contentLoading ? (
          <Skeleton />
        ) : (
          <TableDisplay
            columns={columns}
            data={list}
            handleRetrieve={handleRetrieve}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            updateEnabled={false}
            deleteEnabled={false}
          />
        )}
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
  );
};

export default Items;
