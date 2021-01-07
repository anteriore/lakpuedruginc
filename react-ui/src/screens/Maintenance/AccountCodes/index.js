import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import TableDisplay from '../../../components/TableDisplay';
import { listAC, addAC, deleteAC, clearData } from './redux';
import SimpleForm from '../../../components/forms/FormModal';
import { columns, formDetail } from './data';

const { Title } = Typography;

const AccountCodes = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { company, title } = props;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.maintenance.accountCodes.list);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listAC({ company, message })).then(() => {
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
    const { id, code } = val;
    dispatch(deleteAC(id)).then(() => {
      dispatch(listAC({ company, message }));
      message.success(`Successfully deleted Account Code ${code}`);
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

      dispatch(addAC(payload)).then(() => {
        dispatch(listAC({ company, message }));
      });
    } else if (formMode === 'add') {
      const payload = {
        ...values,
        company: {
          id: company,
        },
      };
      dispatch(addAC(payload)).then(() => {
        dispatch(listAC({ company, message }));
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
