import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';
import { tableHeader, formDetails } from './data';
import { listBankAccount, createBankAccount, updateBankAccount, deleteBankAccount, clearData } from './redux';

const { Title } = Typography;

const BankAccounts = (props) => {
  const { title } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { bankAccountList, action, statusMessage } = useSelector(
    (state) => state.maintenance.bankAccount
  );

  useEffect(() => {
    var isCancelled = false
    dispatch(listBankAccount()).then(() => {
      if(isCancelled) {
        dispatch(clearData());
      }
    })
    
    return function cleanup() {
      dispatch(clearData());
      isCancelled = true
    };
  }, [dispatch]);

  useEffect(() => {
    if (action !== 'get' && action !== '') {
      if (action === 'pending') {
        message.info(statusMessage);
      } else if (action === 'error') {
        message.error(statusMessage);
      } else {
        message.success(statusMessage);
      }
    }
  }, [statusMessage, action]);

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
    dispatch(deleteBankAccount(row))
      .then(() => {
        dispatch(listBankAccount());
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  };

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('');
  };

  const onSubmit = (values) => {
    if (mode === 'edit') {
      const newValues = values;
      newValues.id = currentID;

      dispatch(updateBankAccount(newValues)).then(() => {
        dispatch(listBankAccount());
      });
    } else if (mode === 'add') {
      dispatch(createBankAccount(values)).then(() => {
        dispatch(listBankAccount());
      });
    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  };

  return (
    <Row gutter={[8, 24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title>{title}</Title>
        <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
          Add
        </Button>
      </Col>
      <Col span={20}>
        <TableDisplay
          columns={tableHeader}
          data={bankAccountList}
          handleUpdate={handleEditButton}
          handleDelete={handleDeleteButton}
        />
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
