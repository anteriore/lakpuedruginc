import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { tableHeader, formDetails } from './data';
import { getFGList, createFG, deleteFG, updateFG, clearData } from './redux';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const FinishedGoods = (props) => {
  const { company, title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [formValues, setFormValues] = useState('');
  const [contentLoading, setContentLoading] = useState(true);
  const [mode, setMode] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { list, statusMessage, action, status, statusLevel } = useSelector((state) => state.maintenance.finishedGoods);

  useEffect(() => {
    let isCancelled = false;
    dispatch(getFGList({ company, message })).then(() => {
      setContentLoading(false);

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
    reevalutateMessageStatus({status,action,statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  const handleAddButton = () => {
    setModalTitle('Add Finished Good');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Finished Good');
    setMode('edit');
    setFormValues({
      ...row
    });
    setIsOpenForm(!isOpenForm);
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
    setContentLoading(true)
    if (mode === 'edit') {
      const newValues = values;
      newValues.id = currentID;

      dispatch(updateFG(newValues)).then(() => {
        dispatch(getFGList());
        setContentLoading(false)
      });
    } else if (mode === 'add') {
      const newValues = values;
      dispatch(createFG(newValues)).then(() => {
        dispatch(getFGList());
        setContentLoading(false)
      });
    }
    handleCancelButton()
  };

  return (
    <Row gutter={[8, 24]}>
      <Col style={styles.headerPage} span={20}>
        <Title level={3}>{title}</Title>
        {actions.includes('create') && (
          <Button icon={<PlusOutlined />} loading={contentLoading} onClick={() => handleAddButton()}>
            Add
          </Button>
        )}
      </Col>
      <Col span={20}>
        {contentLoading ? <Skeleton/> : 
          <TableDisplay
            columns={tableHeader}
            data={list}
            handleUpdate={handleEditButton}
            handleDelete={handleDeleteButton}
            updateEnabled={actions.includes('update')}
            deleteEnabled={actions.includes('delete')}
          />
        }        
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
