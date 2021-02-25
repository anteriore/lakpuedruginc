import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import FormDetails, { columns } from './data';
import TableDisplay from '../../../components/TableDisplay';
import { listItemByType, addI, deleteI, clearData } from '../../Maintenance/Items/redux';
import { listIT, clearData as clearIT } from '../../Maintenance/ItemTypes/redux';
import { listUnit } from '../../Maintenance/Units/redux';
import SimpleForm from '../../../components/forms/FormModal';

const { Title } = Typography;

const EngineeringItems = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { formDetails } = FormDetails();

  const { company, actions } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenance.items.list);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listItemByType({ type: 'ENG', message })).then(() => {
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
      dispatch(listItemByType({ type: 'ENG', message }));
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
        dispatch(listItemByType({ type: 'ENG', message }));
      });
    } else if (formMode === 'add') {
      dispatch(addI(payload)).then(() => {
        dispatch(listItemByType({ type: 'ENG', message }));
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
          {actions.includes('create') && (
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              onClick={(e) => {
                handleAdd();
              }}
            >
              Add
            </Button>
          )}
          <TableDisplay
            columns={columns}
            data={data}
            handleRetrieve={handleRetrieve}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            updateEnabled={actions.includes('update')}
            deleteEnabled={actions.includes('delete')}
          />
        </Col>
        {displayForm && (
          <SimpleForm
            visible={displayForm}
            title={formTitle}
            onSubmit={onSubmit}
            values={formData}
            onCancel={handleCancelButton}
            formDetails={formDetails}
          />
        )}
      </Row>
    </>
  );
};

export default EngineeringItems;
