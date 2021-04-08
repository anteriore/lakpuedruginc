import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';
import TableDisplay from '../../../components/TableDisplay';
import { listS, addS, updateS, deleteS, clearData } from './redux';
import { listCategory, clearData as clearC } from '../GroupsCategories/redux';
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
  const { handleRequestResponse } = GeneralHelper()

  const {list, statusMessage, action, status, statusLevel} = useSelector((state) => state.maintenance.salesReps);
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
      datatype: 'boolean',
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
    form_name: 'salesRep',
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
        type: 'boolean',
        initialValue: true,
        rules: [{ required: true, message: 'Please provide a valid status' }],
      },
      {
        label: 'Category',
        name: 'productCategory',
        type: 'select',
        choices: categories,
        rules: [{ required: true, message: 'Please select category' }],
      },
      {
        label: 'Region Codes',
        name: 'regionCode',
        type: 'select',
        selectName: 'code',
        choices: regionCodes,
        rules: [{ required: true, message: 'Please select region code' }],
      },
    ],
  };

  useEffect(() => {
    reevalutateMessageStatus({status, action,statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

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
    dispatch(listCategory()).then((response1) => {
      dispatch(listRegionCode({ company, message })).then((response2) => {
          const onSuccess = () => {
            setDisplayForm(true);
          }
          const onFail = () => {
            handleCancelButton()
          }
          handleRequestResponse([response1, response2], onSuccess, onFail, '');
      });
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Depot');
    setFormMode('edit');
    const formData = {
      ...data,
      productCategory: data?.productCategory?.id,
      regionCode: data?.regionCode?.id,
    };
    setFormData(formData);
    dispatch(listCategory()).then((response1) => {
      dispatch(listRegionCode({ company, message })).then((response2) => {
        const onSuccess = () => {
          setDisplayForm(true);
        }
        const onFail = () => {
          handleCancelButton()
        }
        handleRequestResponse([response1, response2], onSuccess, onFail, '');
      });
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteS(data.id)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        dispatch(listS({ company, message })).then(() => {
          setLoading(false);
        });
      }
      const onFail = () => {
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleRetrieve = () => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = async (data) => {
    setLoading(true);
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

      await dispatch(updateS(payload)).then((response) => {
        const onSuccess = () => {
          dispatch(listS({ company, message })).then(() => {
            setLoading(false);
            setDisplayForm(false);
            setFormData(null);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      })
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
      await dispatch(addS(payload)).then((response) => {
        const onSuccess = () => {
          dispatch(listS({ company, message })).then(() => {
            setLoading(false);
            setDisplayForm(false);
            setFormData(null);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      })
    }

    return 1
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
              loading={loading}
              onClick={(e) => {
                handleAdd();
              }}
            >
              Add
            </Button>
          )}
          {loading ? (
            <Skeleton />
          ) : (
            <TableDisplay
              columns={columns}
              data={list}
              handleRetrieve={handleRetrieve}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              updateEnabled={actions.includes('update')}
              deleteEnabled={actions.includes('delete')}
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
