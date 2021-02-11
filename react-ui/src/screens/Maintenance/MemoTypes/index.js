import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';
import { tableHeader, formDetails } from './data';
import { listMemo, createMemo, updateMemo, deleteMemo, clearData } from './redux';

const { Title } = Typography;

const MemoTypes = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { memoList, action, statusMessage } = useSelector((state) => state.maintenance.memoTypes);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listMemo({ message })).then(() => {
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
    setModalTitle('Add New Memo Type');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Memo Type');
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteMemo(row))
      .then(() => {
        dispatch(listMemo({ message }));
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

      dispatch(updateMemo(newValues)).then(() => {
        dispatch(listMemo({ message }));
      });
    } else if (mode === 'add') {
      dispatch(createMemo(values)).then(() => {
        dispatch(listMemo({ message }));
      });
    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  };

  return (
    <Row gutter={[8, 24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title>{title}</Title>
        {actions.includes("create") &&
        <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
          Add
        </Button>}
      </Col>
      <Col span={20}>
        <TableDisplay
          columns={tableHeader}
          data={memoList}
          handleUpdate={handleEditButton}
          handleDelete={handleDeleteButton}
          updateEnabled={actions.includes("update")}
          deleteEnabled={actions.includes("delete")}
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

export default MemoTypes;
