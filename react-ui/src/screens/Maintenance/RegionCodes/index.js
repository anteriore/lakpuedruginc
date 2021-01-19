import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import SimpleForm from '../../../components/forms/FormModal';
import {
  listRegionCode,
  createRegionCode,
  updateRegionCode,
  deleteRegionCode,
  clearData,
} from './redux';

const { Title } = Typography;

const RegionCodes = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { regionCodeList, action, statusMessage } = useSelector(
    (state) => state.maintenance.regionCodes
  );

  useEffect(() => {
    let isCancelled = false;
    dispatch(listRegionCode({ message })).then(() => {
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
    setModalTitle('Add New Region');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Region Code');
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteRegionCode(row))
      .then(() => {
        dispatch(listRegionCode({ message }));
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

      dispatch(updateRegionCode(newValues)).then(() => {
        dispatch(listRegionCode({ message }));
      });
    } else if (mode === 'add') {
      dispatch(createRegionCode(values)).then(() => {
        dispatch(listRegionCode({ message }));
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
          data={regionCodeList}
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

export default RegionCodes;
