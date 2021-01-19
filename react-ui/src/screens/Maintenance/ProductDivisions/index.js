import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { listPD, addPD, deletePD, clearData } from './redux';
import SimpleForm from '../../../components/forms/FormModal';

const { Title } = Typography;

const ProductDivisions = (props) => {
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
  ];

  const formDetail = {
    form_name: 'productdivision',
    form_items: [
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid product division code' }],
        placeholder: 'Product division code',
      },
      {
        label: 'Title',
        name: 'title',
        rules: [{ required: true, message: 'Please provide a valid title' }],
        placeholder: 'title',
      },
      {
        label: 'Description',
        name: 'description',
        rules: [{ required: true, message: 'Please provide a valid description' }],
        placeholder: 'Description',
      },
    ],
  };

  const { company, title, actions } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenance.productDivisions.list);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listPD({ company, message })).then(() => {
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
    setFormTitle('Add Product Division');
    setFormMode('add');
    setFormData(null);
    setDisplayForm(true);
  };

  const handleUpdate = (val) => {
    setFormTitle('Edit Product Division');
    setFormMode('edit');
    setDisplayForm(true);
    setFormData(val);
  };

  const handleDelete = (val) => {
    const { id, code } = val;
    dispatch(deletePD(id)).then(() => {
      dispatch(listPD({ company, message }));
      message.success(`Successfully deleted Product Division ${code}`);
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

      dispatch(addPD(payload)).then(() => {
        dispatch(listPD({ company, message }));
      });
    } else if (formMode === 'add') {
      const payload = {
        ...values,
        company: {
          id: company,
        },
      };
      dispatch(addPD(payload)).then(() => {
        dispatch(listPD({ company, message }));
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
            updateEnabled={actions.includes("update")}
            deleteEnabled={actions.includes("delete")}
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

export default ProductDivisions;
