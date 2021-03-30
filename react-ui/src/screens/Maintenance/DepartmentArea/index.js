import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';
import TableDisplay from '../../../components/TableDisplay';
import { listD, addD, updateD,deleteD, listA, addA, updateA,deleteA, clearData } from './redux';
import SimpleForm from '../../../components/forms/FormModal';

const { Title } = Typography;

const DepartmentArea = (props) => {
  const [displayFormD, setDisplayFormD] = useState(false);
  const [displayFormA, setDisplayFormA] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formDataA, setFormDataA] = useState(null);
  const [formDataD, setFormDataD] = useState(null);
  const [loading, setLoading] = useState(true);

  const deptColumns = [
    {
      title: 'Dept. Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Dept. Name',
      dataIndex: 'name',
      key: 'name',
      datatype: 'string',
    },
  ];

  const tableName = 'department-areas';

  const areaColumns = [
    {
      title: 'Area Code',
      dataIndex: 'code',
      key: 'code',
      datatype: 'string',
    },
    {
      title: 'Area Name',
      dataIndex: 'name',
      key: 'name',
      datatype: 'string',
    },
  ];

  const formDetailD = {
    form_name: 'departments',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid department name' }],
        placeholder: 'Department name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid department code' }],
        placeholder: 'Department code',
      },
    ],
  };

  const formDetailA = {
    form_name: 'areas',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid area name' }],
        placeholder: 'Area name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid area code' }],
        placeholder: 'Area code',
      },
    ],
  };

  const { company, title, actions } = props;
  const dispatch = useDispatch();
  const {
    areaList: areaData, 
    deptList: deptData,
    statusMessage, action,
    statusLevel, status
  } = useSelector((state) => state.maintenance.departmentArea);


  useEffect(() => {
    let isCancelled = false;
    dispatch(listD({ company })).then(() => {
      dispatch(listA({ company })).then(() => {
        setLoading(false)
        if (isCancelled) {
          dispatch(clearData());
        }
      });
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({status, action,statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  const handleAddD = () => {
    setFormTitle('Add Department');
    setFormMode('add');
    setFormDataD(null);
    setDisplayFormD(true);
    setDisplayFormA(false);
  };

  const handleUpdateD = (data) => {
    setFormTitle('Edit Department');
    setFormMode('edit');
    setDisplayFormD(true);
    setDisplayFormA(false);
    setFormDataD(data);
  };

  const handleDeleteD = (data) => {
    setLoading(true)
    dispatch(deleteD(data.id)).then(() => {
      dispatch(listD({ company }));
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };

  const handleAddA = () => {
    setFormTitle('Add Area');
    setFormMode('add');
    setFormDataA(null);
    setDisplayFormD(false);
    setDisplayFormA(true);
  };

  const handleUpdateA = (data) => {
    setFormTitle('Edit Area');
    setFormMode('edit');
    setDisplayFormD(false);
    setDisplayFormA(true);
    setFormDataA(data);
  };

  const handleDeleteA = (data) => {
    setLoading(true)
    dispatch(deleteA(data.id)).then(() => {
      dispatch(listA({ company }));
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };
  const handleRetrieve = () => {};

  const handleCancelButton = () => {
    setDisplayFormD(false);
    setDisplayFormA(false);
    setFormDataA(null);
    setFormDataD(null);
  };

  const onSubmitD = (values) => {
    setLoading(true);
    if (formMode === 'edit') {
      const payload = {
        ...values,
        id: formDataD.id,
        company: {
          id: company,
        },
      };

      dispatch(updateD(payload)).then(() => {
        dispatch(listD({ company }));
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    } else if (formMode === 'add') {
      const payload = {
        ...values,
        company: {
          id: company,
        },
      };
      dispatch(addD(payload)).then(() => {
        dispatch(listD({ company }));
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }

    setDisplayFormD(false);
    setDisplayFormA(false);
    setFormDataA(null);
    setFormDataD(null);
  };

  const onSubmitA = (values) => {
    setLoading(true);
    if (formMode === 'edit') {
      const payload = {
        ...values,
        id: formDataA.id,
        company: {
          id: company,
        },
      };

      dispatch(updateA(payload)).then(() => {
        dispatch(listA({ company }));
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    } else if (formMode === 'add') {
      const payload = {
        ...values,
        company: {
          id: company,
        },
      };
      dispatch(addA(payload)).then(() => {
        dispatch(listA({ company }));
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }

    setDisplayFormD(false);
    setDisplayFormA(false);
    setFormDataA(null);
    setFormDataD(null);
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
        <Col span={12}>
          <Title level={5} style={{ float: 'left' }}>
            Departments
          </Title>
          {actions.includes('create') && (
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              loading={loading}
              onClick={() => {
                handleAddD();
              }}
            >
              Add
            </Button>
          )}
          {loading ? <Skeleton/> : 
            <TableDisplay
              name={tableName}
              columns={deptColumns}
              data={deptData}
              handleRetrieve={handleRetrieve}
              handleUpdate={handleUpdateD}
              handleDelete={handleDeleteD}
              pagination={{ size: 'small' }}
              updateEnabled={actions.includes('update')}
              deleteEnabled={actions.includes('delete')}
            />
          }
        </Col>
        <Col span={12}>
          <Title level={5} style={{ float: 'left' }}>
            Areas
          </Title>
          {actions.includes('create') && (
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              loading={loading}
              onClick={() => {
                handleAddA();
              }}
            >
              Add
            </Button>
          )}
          {loading ? <Skeleton/> : 
            <TableDisplay
              name={tableName}
              columns={areaColumns}
              data={areaData}
              handleRetrieve={handleRetrieve}
              handleUpdate={handleUpdateA}
              handleDelete={handleDeleteA}
              pagination={{ size: 'small' }}
              updateEnabled={actions.includes('update')}
              deleteEnabled={actions.includes('delete')}
            />}
        </Col>
        <SimpleForm
          visible={displayFormD}
          title={formTitle}
          onSubmit={onSubmitD}
          values={formDataD}
          onCancel={handleCancelButton}
          formDetails={formDetailD}
        />
        <SimpleForm
          visible={displayFormA}
          title={formTitle}
          onSubmit={onSubmitA}
          values={formDataA}
          onCancel={handleCancelButton}
          formDetails={formDetailA}
        />
      </Row>
    </>
  );
};

export default DepartmentArea;
