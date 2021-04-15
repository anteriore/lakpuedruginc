import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { listIT, addIT, deleteIT, updateIT,clearData } from './redux';
import SimpleForm from '../../../components/forms/FormModal';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const ItemTypes = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [contentLoading, setContentLoading] = useState(true);

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
  ];

  const formDetail = {
    form_name: 'itemtypes',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid item type name' }],
        placeholder: 'Item type name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid item type code' }],
        placeholder: 'Item type code',
      },
    ],
  };

  const { company, title, actions } = props;
  const dispatch = useDispatch();
  const {list, statusMessage, action, status, statusLevel} = useSelector((state) => state.maintenance.itemTypes);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listIT({ company, message })).then(() => {
      setContentLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({
      status, action, statusMessage, statusLevel
    })
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Add Item Type');
    setFormMode('add');
    setFormData(null);
    setDisplayForm(true);
  };

  const handleUpdate = (val) => {
    setFormTitle('Edit Item Type');
    setFormMode('edit');
    setDisplayForm(true);
    setFormData(val);
  };

  const handleDelete = (val) => {
    const { id } = val;
    dispatch(deleteIT(id)).then(() => {
      dispatch(listIT({ company, message }));
    });
  };

  const handleRetrieve = () => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = async (values) => {
    setContentLoading(true);
    if (formMode === 'edit') {
      const payload = {
        ...values,
        id: formData.id,
        company: {
          id: company,
        },
      };

      await dispatch(updateIT(payload)).then(() => {
        dispatch(listIT({ company, message }));
        setContentLoading(false);
      });
    } else if (formMode === 'add') {
      const payload = {
        ...values,
        company: {
          id: company,
        },
      };
      await dispatch(addIT(payload)).then(() => {
        dispatch(listIT({ company, message }));
        setContentLoading(false);
      });
    }

    handleCancelButton();
    return 1
  };

  return (
      <Row gutter={[8, 24]}>
        <Col style={GeneralStyles.headerPage} span={20}>
          <Title level={3}>
            {title}
          </Title>
          {actions.includes('create') && (
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              loading={contentLoading}
              onClick={() => {
                handleAdd();
              }}
            >
              Add
            </Button>
          )}
        </Col>
        <Col span={20}>
          {contentLoading ? <Skeleton/> : 
            <TableDisplay
              columns={columns}
              data={list}
              handleRetrieve={handleRetrieve}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              updateEnabled={actions.includes('update')}
              deleteEnabled={actions.includes('delete')}
            />
          }
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
  );
};

export default ItemTypes;
