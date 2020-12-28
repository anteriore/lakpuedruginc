import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import GeneralStyles from '../../../data/styles/styles.general';
import SimpleForm from '../../../components/forms/FormModal';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import { listProductionArea } from '../ProductionArea/redux';
import { listProcedure, createProcedure, updateProcedure, deleteProcedure } from './redux';
import { formatProcedurePayload } from './helper';

const { Title } = Typography;

const Procedures = (props) => {
  const { title } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { productionAreaList } = useSelector((state) => state.maintenance.productionArea);
  const { procedureList, action, statusMessage } = useSelector(
    (state) => state.maintenance.procedures
  );

  useEffect(() => {
    dispatch(listProcedure());
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

  useEffect(() => {
    const newForm = tempFormDetails;
    newForm.form_items.forEach((form) => {
      if (form.name === 'procedureArea') {
        productionAreaList.forEach((productionArea) => {
          const { id, code } = productionArea;
          form.choices.push({ id, name: code });
        });
      }

      form.choices = _.uniqBy(form.choices, 'id');
    });
    setTempFormDetails(newForm);
  }, [productionAreaList, tempFormDetails]);

  const handleAddButton = () => {
    setModalTitle('Add New Zip Code');
    setMode('add');
    dispatch(listProductionArea()).then(() => {
      setIsOpenForm(!isOpenForm);
    });
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Zip Code');
    setMode('edit');
    dispatch(listProductionArea()).then(() => {
      setFormValues({
        ...row,
        procedureArea: row.procedureArea.id,
      });
      setIsOpenForm(!isOpenForm);
    });
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteProcedure(row))
      .then(() => {
        dispatch(listProcedure());
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
      const newValues = formatProcedurePayload(values, productionAreaList);
      newValues.id = currentID;
      dispatch(updateProcedure(newValues)).then(() => {
        dispatch(listProcedure());
      });
    } else if (mode === 'add') {
      dispatch(createProcedure(formatProcedurePayload(values, productionAreaList))).then(() => {
        dispatch(listProcedure());
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
          data={procedureList}
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

export default Procedures;
