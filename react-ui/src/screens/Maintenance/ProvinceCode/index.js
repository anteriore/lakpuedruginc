import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../datas/styles/styles.general';
import SimpleForm from '../../../components/forms/SimpleForm';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import {
  listProvinceCode,
  createProvinceCode,
  updateProvinceCode,
  deleteProvinceCode,
} from './redux';

const { Title } = Typography;

const ProvinceCode = (props) => {
  const { company, title } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const { provinceCodeList, action, statusMessage } = useSelector(
    (state) => state.maintenance.provinceCodes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProvinceCode({ company }));
  }, [dispatch, company]);

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
    setModalTitle('Add New Province Code');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Province Code');
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteProvinceCode(row))
      .then(() => {
        dispatch(listProvinceCode());
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

      dispatch(updateProvinceCode(newValues)).then(() => {
        dispatch(listProvinceCode());
      });
    } else if (mode === 'add') {
      dispatch(createProvinceCode(values)).then(() => {
        dispatch(listProvinceCode());
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
          data={provinceCodeList}
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

export default ProvinceCode;
