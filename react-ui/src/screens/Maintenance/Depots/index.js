import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { listDepot, addDepot, deleteDepot } from './redux';
import { listA } from '../DepartmentArea/redux';
import SimpleForm from '../../../components/forms/SimpleForm';

const { Title } = Typography;

const Depots = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { company } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenance.depots.list);
  const areas = useSelector((state) => state.maintenance.departmentArea.areaList);

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
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      datatype: 'string',
      render: (object) => object.name,
      sorter: (a, b) => a.area.name.localeCompare(b.area.name),
    },
  ];

  const formDetail = {
    form_name: 'depot',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid name' }],
        placeholder: 'Depot name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid code' }],
        placeholder: 'Depot code',
      },
      {
        label: 'Area',
        name: 'area',
        type: 'select',
        choices: areas,
        rules: [{ required: true }],
      },
    ],
  };

  useEffect(() => {
    dispatch(listDepot({ company })).then((response) => {
      setLoading(false)
    });
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Add Depot');
    setFormMode('add');
    setFormData(null);
    dispatch(listA({ company })).then((response) => {
      setDisplayForm(true);
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Depot');
    setFormMode('edit');
    const formData = {
      ...data,
      area: data.area.id,
    };
    setFormData(formData);
    dispatch(listA({ company })).then((response) => {
      setDisplayForm(true);
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteDepot(data.id)).then((response) => {
      setLoading(true);
      if(response.payload.status === 200){
        dispatch(listDepot({ company })).then(() => {
          setLoading(false);
          message.success(`Successfully deleted ${data.name}`);
        })
      }
      else {
        setLoading(false);
        message.error(`Unable to delete ${data.name}`);
      }
    });
  };

  const handleRetrieve = (data) => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = (data) => {
    if (formMode === 'edit') {
      const payload = {
        ...data,
        id: formData.id,
        company: {
          id: company,
        },
        area: {
          id: data.area,
        },
      };

      dispatch(addDepot(payload)).then((response) => {
        setLoading(true);
        if(response.payload.status === 200){
          dispatch(listDepot({ company })).then(() => {
            setLoading(false);
            message.success(`Successfully updated ${data.name}`);
          })
        }
        else {
          setLoading(false);
          message.error(`Unable to update ${data.name}`);
        }
      });
    } else if (formMode === 'add') {
      const payload = {
        ...data,
        company: {
          id: company,
        },
        area: {
          id: data.area,
        },
      };
      dispatch(addDepot(payload)).then((response) => {
        setLoading(true);
        if(response.payload.status === 200){
          dispatch(listDepot({ company })).then(() => {
            setLoading(false);
            message.success(`Successfully added ${data.name}`);
          })
        }
        else {
          setLoading(false);
          message.error(`Unable to add ${data.name}`);
        }
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
          {loading ? (
            <Skeleton />
          ) : (
            <TableDisplay
              columns={columns}
              data={data}
              handleRetrieve={handleRetrieve}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
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
    </>
  );
};

export default Depots;
