import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../datas/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/SimpleForm';
import { tableHeader, formDetails } from './data';
import { createInstitution, deleteInstitution, listInstitution, updateInstitution } from './redux';

const { Title } = Typography;

const InstitutionalCodes = (props) => {
  const { title } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { institutionList, action, statusMessage } = useSelector(
    (state) => state.maintenance.institutionalCodes
  );

  useEffect(() => {
    dispatch(listInstitution());
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
    setModalTitle('Add New Institution');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Unit');
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteInstitution(row))
      .then(() => {
        dispatch(listInstitution());
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

      dispatch(updateInstitution(newValues)).then(() => {
        dispatch(listInstitution());
      });
    } else if (mode === 'add') {
      dispatch(createInstitution(values)).then(() => {
        dispatch(listInstitution());
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
          data={institutionList}
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

export default InstitutionalCodes;
