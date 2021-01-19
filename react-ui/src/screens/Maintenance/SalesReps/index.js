import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { listS, addS, deleteS, clearData } from './redux';
import { listC, clearData as clearC } from '../GroupsCategories/redux';
import { listRegionCode, clearData as clearRegionCode } from '../RegionCodes/redux';
import SimpleForm from '../../../components/forms/FormModal';

const { Title } = Typography;

const SalesReps = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { company, actions } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenance.salesReps.list);
  const categories = useSelector((state) => state.maintenance.groupsCategories.categoryList);
  const regionCodes = useSelector((state) => state.maintenance.regionCodes.regionCodeList);

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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      datatype: 'string',
    },
    {
      title: 'Category',
      dataIndex: 'productCategory',
      key: 'productCategory',
      datatype: 'object',
    },
    {
      title: 'Region Code',
      dataIndex: 'regionCode',
      key: 'regionCode',
      name: 'code',
      datatype: 'object',
    },
  ];

  const formDetail = {
    form_name: 'depot',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid name' }],
        placeholder: 'Name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid code' }],
        placeholder: 'Code',
      },
      {
        label: 'Status',
        name: 'status',
        rules: [{ required: true, message: 'Please provide a valid status' }],
        placeholder: 'Status',
      },
      {
        label: 'Category',
        name: 'productCategory',
        type: 'select',
        choices: categories,
        rules: [{ required: true }],
      },
      {
        label: 'Region Codes',
        name: 'regionCode',
        type: 'select',
        selectName: 'code',
        choices: regionCodes,
        rules: [{ required: true }],
      },
    ],
  };

  useEffect(() => {
    let isCancelled = false;
    dispatch(listS({ company, message })).then(() => {
      setLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearC());
      dispatch(clearRegionCode());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Add Depot');
    setFormMode('add');
    setFormData(null);
    dispatch(listC({ company, message })).then(() => {
      dispatch(listRegionCode({ company, message })).then(() => {
        setDisplayForm(true);
      });
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Depot');
    setFormMode('edit');
    const formData = {
      ...data,
      productCategory: data.productCategory.id,
      regionCode: data.regionCode.id,
    };
    setFormData(formData);
    dispatch(listC({ company, message })).then(() => {
      dispatch(listRegionCode({ company, message })).then(() => {
        setDisplayForm(true);
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteS(data.id)).then((response) => {
      setLoading(true);
      if (response.payload.status === 200) {
        message.success(`Successfully deleted ${data.name}`);
        dispatch(listS({ company, message })).then(() => {
          setLoading(false);
        });
      } else {
        message.success(`Unable to delete ${data.name}`);
        setLoading(false);
      }
    });
  };

  const handleRetrieve = () => {};

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
        productCategory: {
          id: data.productCategory,
        },
        regionCode: {
          id: data.regionCode,
        },
      };

      dispatch(addS(payload)).then((response) => {
        if (response.payload.status === 200) {
          message.success(`Successfully updated ${data.name}`);
          dispatch(listS({ company, message })).then(() => {
            setLoading(false);
          });
        } else {
          message.success(`Unable to update ${data.name}`);
          setLoading(false);
        }
      });
    } else if (formMode === 'add') {
      const payload = {
        ...data,
        company: {
          id: company,
        },
        productCategory: {
          id: data.productCategory,
        },
        regionCode: {
          id: data.regionCode,
        },
      };
      dispatch(addS(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          message.success(`Successfully added ${data.name}`);
          dispatch(listS({ company, message })).then(() => {
            setLoading(false);
          });
        } else {
          message.success(`Unable to added ${data.name}`);
          setLoading(false);
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

export default SalesReps;
