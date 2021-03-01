import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { tableHeader, formDetails } from './data';
import { getFGList, createFG, deleteFG, updateFG, clearData } from './redux';
import { listUnit, clearData as clearUnit } from '../Units/redux';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';

const { Title } = Typography;

const FinishedGoods = (props) => {
  const { company, title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [formValues, setFormValues] = useState('');
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [mode, setMode] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { list, statusMessage, action } = useSelector((state) => state.maintenance.finishedGoods);
  const { unitList } = useSelector((state) => state.maintenance.units);

  useEffect(() => {
    let isCancelled = false;
    dispatch(getFGList({ company, message })).then(() => {
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearUnit());
      isCancelled = true;
    };
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

  useEffect(() => {
    const newForm = tempFormDetails;
    newForm.form_items.forEach((form) => {
      if (form.name === 'unit') {
        unitList.forEach((unit) => {
          const { id, code } = unit;
          form.choices.push({ id, name: code });
        });
      }

      form.choices = _.uniqBy(form.choices, 'id');
    });
    setTempFormDetails(newForm);
  }, [unitList, tempFormDetails]);

  const handleAddButton = () => {
    setModalTitle('Add Finished Good');
    setMode('add');
    dispatch(listUnit()).then(() => {
      setIsOpenForm(!isOpenForm);
    });
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Finished Good');
    setMode('edit');
    setFormValues({
      ...row,
      unit: row.unit !== null ? row.unit.id : 1,
    });
    dispatch(listUnit()).then(() => {
      setIsOpenForm(!isOpenForm);
    });
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteFG(row))
      .then(() => {
        dispatch(getFGList());
      })
      .catch((err) => {
        message.error(`Something went wrong! Error: ${err}`);
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
      newValues.unit = { id: values.unit };

      dispatch(updateFG(newValues)).then(() => {
        dispatch(getFGList());
      });
    } else if (mode === 'add') {
      const newValues = values;
      newValues.unit = { id: values.unit };
      dispatch(createFG(newValues)).then(() => {
        dispatch(getFGList());
      });
    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  };

  return (
    <Row gutter={[8, 24]}>
      <Col style={styles.headerPage} span={20}>
        <Title level={3}>{title}</Title>
        {actions.includes('create') && (
          <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
            Add
          </Button>
        )}
      </Col>
      <Col span={20}>
        <TableDisplay
          columns={tableHeader}
          data={list}
          handleUpdate={handleEditButton}
          handleDelete={handleDeleteButton}
          updateEnabled={actions.includes('update')}
          deleteEnabled={actions.includes('delete')}
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

export default FinishedGoods;

const styles = {
  headerPage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};
