import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';
import { tableHeader, formDetails } from './data';
import {
  listBankAccount,
  createBankAccount,
  updateBankAccount,
  deleteBankAccount,
  clearData,
} from './redux';

const { Title } = Typography;

const BankAccounts = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { bankAccountList, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.maintenance.bankAccount
  );
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listBankAccount({ message })).then(() => {
      setLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  const handleAddButton = () => {
    setModalTitle('Add New Bank Account');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Bank Account');
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  };

  const handleDeleteButton = (row) => {
    setLoading(true);
    dispatch(deleteBankAccount(row)).then(() => {
      dispatch(listBankAccount({ message })).then(() => {
        setLoading(false);
      });
    });
  };

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('');
  };

  const onSubmit = async (values) => {
    setLoading(true);
    if (mode === 'edit') {
      const newValues = values;
      newValues.id = currentID;

      await dispatch(updateBankAccount(newValues)).then((response) => {
        const onSuccess = () => {
          dispatch(listBankAccount({ message })).then(() => {
            setLoading(false);
            setFormValues('');
            setIsOpenForm(!isOpenForm);
          });
        };
        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (mode === 'add') {
      await dispatch(createBankAccount(values)).then((response) => {
        const onSuccess = () => {
          dispatch(listBankAccount({ message })).then(() => {
            setLoading(false);
            setFormValues('');
            setIsOpenForm(!isOpenForm);
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
    <Row gutter={[8, 24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title>{title}</Title>
        {actions.includes('create') && (
          <Button loading={loading} icon={<PlusOutlined />} onClick={() => handleAddButton()}>
            Add
          </Button>
        )}
      </Col>
      <Col span={20}>
        {loading ? (
          <Skeleton />
        ) : (
          <TableDisplay
            columns={tableHeader}
            data={bankAccountList}
            handleUpdate={handleEditButton}
            handleDelete={handleDeleteButton}
            updateEnabled={actions.includes('update')}
            deleteEnabled={actions.includes('delete')}
          />
        )}
      </Col>
      <SimpleForm
        visible={isOpenForm}
        title={modalTitle}
        onSubmit={onSubmit}
        values={formValues}
        onCancel={handleCancelButton}
        formDetails={formDetails}
      />
    </Row>
  );
};

export default BankAccounts;
