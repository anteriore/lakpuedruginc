import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import FormDetails, { columns } from './data';
import TableDisplay from '../../../components/TableDisplay';
import { listItemByType, addI, updateI, deleteI, clearData } from '../../Maintenance/Items/redux';
import { listIT, clearData as clearIT } from '../../Maintenance/ItemTypes/redux';
import { listUnit } from '../../Maintenance/Units/redux';
import SimpleForm from '../../../components/forms/FormModal';
import GeneralHelper, {
  reevalutateMessageStatus,
  reevalDependencyMsgStats,
} from '../../../helpers/general-helper';

const { Title } = Typography;

const EngineeringItems = (props) => {
  const { handleRequestResponse } = GeneralHelper();
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { formDetails } = FormDetails();

  const { company, actions } = props;
  const dispatch = useDispatch();
  const { list, status, statusLevel, statusMessage, action } = useSelector(
    (state) => state.maintenance.items
  );
  const {
    status: statusUnit,
    statusLevel: statusLevelUnit,
    statusMessage: statusMessageUnit,
    action: actionUnit,
  } = useSelector((state) => state.maintenance.units);
  const {
    status: statusIT,
    statusLevel: statusLevelIT,
    statusMessage: statusMessageIT,
    action: actionIT,
  } = useSelector((state) => state.maintenance.itemTypes);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearIT());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listItemByType({ type: 'ENG', message })).then(() => {
      if (isMounted.current) {
        setLoading(false);
      }
    });

    return function cleanup() {
      isMounted.current = false;
      performCleanup();
    };
  }, [dispatch, company, performCleanup]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusUnit,
      statusMessage: statusMessageUnit,
      action: actionUnit,
      statusLevel: statusLevelUnit,
      module: 'Units',
    });
  }, [actionUnit, statusMessageUnit, statusUnit, statusLevelUnit]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusIT,
      statusMessage: statusMessageIT,
      action: actionIT,
      statusLevel: statusLevelIT,
      module: 'Item Types',
    });
  }, [actionIT, statusMessageIT, statusIT, statusLevelIT]);

  const handleAdd = () => {
    setFormTitle('Add Item');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listIT({ company, message })).then((resp1) => {
      dispatch(listUnit({ message })).then((resp2) => {
        const onSuccess = () => {
          setFormData({
            type: resp1.payload.data.find((item) => item.code === 'ENG').id,
          });
          setDisplayForm(true);
          setLoading(false);
        };

        const onFailed = () => {
          setLoading(false);
        };
        handleRequestResponse([resp1, resp2], onSuccess, onFailed, '');
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
    setLoading(true);
    dispatch(listIT({ company, message })).then((resp1) => {
      dispatch(listUnit({ message })).then((resp2) => {
        const onSuccess = () => {
          setDisplayForm(true);
          setLoading(false);
        };

        const onFailed = () => {
          setLoading(false);
        };
        handleRequestResponse([resp1, resp2], onSuccess, onFailed, '');
      });
    });
  };

  const handleDelete = (data) => {
    setLoading(true);
    dispatch(deleteI(data.id)).then((response) => {
      const onSuccess = () => {
        dispatch(listItemByType({ type: 'ENG', message })).then(() => {
          setLoading(false);
        });
      };

      const onFailed = () => {
        setLoading(false);
      };
      handleRequestResponse([response], onSuccess, onFailed, '');
    });
  };

  const handleRetrieve = (data) => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = async (values) => {
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

      await dispatch(updateI(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          dispatch(listItemByType({ type: 'ENG', message })).then(() => {
            setLoading(false);
          });
        };

        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (formMode === 'add') {
      await dispatch(addI(payload)).then((response) => {
        const onSuccess = () => {
          dispatch(listItemByType({ type: 'ENG', message })).then(() => {
            setLoading(false);
          });
        };

        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }

    setDisplayForm(false);
    setFormData(null);
    return 1;
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
            formDetails={formDetails}
          />
        )}
      </Row>
    </>
  );
};

export default EngineeringItems;
