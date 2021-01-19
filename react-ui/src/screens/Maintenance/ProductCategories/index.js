import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { listPC, addPC, deletePC, clearData } from './redux';
import { listPD, clearData as clearPD } from '../ProductDivisions/redux';
import SimpleForm from '../../../components/forms/FormModal';

const { Title } = Typography;

const Depots = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { company, actions } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenance.productCategories.list);
  const divisions = useSelector((state) => state.maintenance.productDivisions.list);

  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      datatype: 'string',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      datatype: 'string',
    },
    {
      title: 'Division',
      dataIndex: 'productDivision',
      key: 'productDivision',
      name: 'title',
      datatype: 'object',
    },
  ];

  const formDetail = {
    form_name: 'productcategories',
    form_items: [
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid code' }],
        placeholder: 'Product Category code',
      },
      {
        label: 'Title',
        name: 'title',
        rules: [{ required: true, message: 'Please provide a valid title' }],
        placeholder: 'Product Category name',
      },
      {
        label: 'Description',
        name: 'description',
        rules: [{ required: true, message: 'Please provide a valid description' }],
        placeholder: 'Product Category description',
      },
      {
        label: 'Division',
        name: 'division',
        type: 'select',
        selectName: 'title',
        choices: divisions,
      },
    ],
  };

  useEffect(() => {
    let isCancelled = false;
    dispatch(listPC({ company, message })).then(() => {
      dispatch(listPD({ company, message })).then(() => {
        setLoading(false);
        if (isCancelled) {
          dispatch(clearData());
        }
      });
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearPD());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Add Depot');
    setFormMode('add');
    setFormData(null);
    dispatch(listPD({ company, message })).then((response) => {
      setDisplayForm(true);
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Depot');
    setFormMode('edit');
    const formData = {
      ...data,
      division: data.productDivision.id,
    };
    setFormData(formData);
    dispatch(listPD({ company, message })).then((response) => {
      setDisplayForm(true);
    });
  };

  const handleDelete = (data) => {
    dispatch(deletePC(data.id)).then((response) => {
      setLoading(true);
      dispatch(listPC({ company, message })).then(() => {
        setLoading(false);
      });
      message.success(`Successfully deleted Product Category ${data.code}`);
    });
  };

  const handleRetrieve = (data) => {};

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
        productDivision: {
          id: values.division,
        },
      };

      dispatch(addPC(payload)).then(() => {
        setLoading(true);
        dispatch(listPC({ company, message })).then(() => {
          setLoading(false);
        });
      });
    } else if (formMode === 'add') {
      const payload = {
        ...values,
        company: {
          id: company,
        },
        productDivision: {
          id: values.division,
        },
      };
      dispatch(addPC(payload)).then(() => {
        setLoading(true);
        dispatch(listPC({ company, message })).then(() => {
          setLoading(false);
        });
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
              updateEnabled={actions.includes("update")}
              deleteEnabled={actions.includes("delete")}
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
