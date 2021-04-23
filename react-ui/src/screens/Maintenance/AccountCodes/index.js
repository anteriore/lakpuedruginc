import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { listAC, addAC, updateAC, deleteAC, clearData } from './redux';
import SimpleForm from '../../../components/forms/FormModal';
import { columns, formDetail } from './data';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const AccountCodes = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { company, title, actions } = props;
  const dispatch = useDispatch();
  const { handleRequestResponse } = GeneralHelper();

  const { list: data, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.maintenance.accountCodes
  );

  useEffect(() => {
    let isCancelled = false;
    dispatch(listAC()).then(() => {
      setLoading(false);

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
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Add Account Code');
    setFormMode('add');
    setFormData(null);
    setDisplayForm(true);
  };

  const handleUpdate = (val) => {
    setFormTitle('Edit Account Code');
    setFormMode('edit');
    setDisplayForm(true);
    setFormData(val);
  };

  const handleDelete = (val) => {
    const { id } = val;
    setLoading(true);
    dispatch(deleteAC(id)).then(() => {
      dispatch(listAC()).then(() => {
        setLoading(false);
      });
    });
  };

  const handleRetrieve = () => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = async (values) => {
    setLoading(true);
    if (formMode === 'edit') {
      const payload = {
        ...values,
        id: formData.id,
        company: {
          id: company,
        },
      };

      await dispatch(updateAC(payload)).then((response) => {
        const onSuccess = () => {
          dispatch(listAC()).then(() => {
            setDisplayForm(false);
            setFormData(null);
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (formMode === 'add') {
      const payload = {
        ...values,
        company: {
          id: company,
        },
      };
      await dispatch(addAC(payload)).then((response) => {
        const onSuccess = () => {
          dispatch(listAC()).then(() => {
            setDisplayForm(false);
            setFormData(null);
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }
    return 1;
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
          {actions.includes('create') && (
            <Button
              loading={loading}
              style={{ float: 'right', marginRight: '0.7%' }}
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

export default AccountCodes;
