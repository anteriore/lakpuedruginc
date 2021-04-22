import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';

import { listDepotByCompany, addDepot, updateDepot, deleteDepot, clearData } from './redux';
import { listA, clearData as clearArea } from '../DepartmentArea/redux';

const { Title } = Typography;

const Depots = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { company, actions } = props;
  const { list: data, statusMessage, action, status, statusLevel } = useSelector((state) => state.maintenance.depots);
  const areas = useSelector((state) => state.maintenance.departmentArea.areaList);

  const dispatch = useDispatch();
  const { handleRequestResponse } = GeneralHelper()

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
      name: 'name',
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
        rules: [{ required: true, message: 'Please select an Area' }],
      },
    ],
  };

  useEffect(() => {
    let isCancelled = false;
    dispatch(listDepotByCompany({ company })).then((response) => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearArea());
      isCancelled = true;
    };
  }, [dispatch, company]);
  
  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Add Depot');
    setFormMode('add');
    setFormData(null);
    dispatch(listA({ company })).then((response) => {
      const onSuccess = () => {
        setDisplayForm(true);
      }
      const onFail = () => {}
      handleRequestResponse([response], onSuccess, onFail, '');
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
      const onSuccess = () => {
        setDisplayForm(true);
      }
      const onFail = () => {}
      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteDepot(data.id)).then((response) => {
      setLoading(true);
      const onSuccess = () => {
        dispatch(listDepotByCompany({ company })).then(() => {
          setLoading(false);
        });
      }
      const onFail = () => {
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleRetrieve = (data) => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = async (data) => {
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

      await dispatch(updateDepot(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          dispatch(listDepotByCompany({ company })).then(() => {
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
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
      await dispatch(addDepot(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          dispatch(listDepotByCompany({ company })).then(() => {
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }

    setDisplayForm(false);
    setFormData(null);
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
              data={data}
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

export default Depots;
