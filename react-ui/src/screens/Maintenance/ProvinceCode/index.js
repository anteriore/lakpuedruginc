import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import SimpleForm from '../../../components/forms/FormModal';
import TableDisplay from '../../../components/TableDisplay';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';
import { tableHeader, formDetails } from './data';
import {
  listProvinceCode,
  createProvinceCode,
  updateProvinceCode,
  deleteProvinceCode,
  clearData,
} from './redux';

const { Title } = Typography;

const ProvinceCode = (props) => {
  const { company, title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [loading, setLoading] = useState(true);
  const { provinceCodeList, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.maintenance.provinceCodes
  );
  const dispatch = useDispatch();
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listProvinceCode({ company, message })).then(() => {
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

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

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
    setLoading(true);
    dispatch(deleteProvinceCode(row)).then(() => {
      dispatch(listProvinceCode({ message })).then(() => {
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

      await dispatch(updateProvinceCode(newValues)).then((response) => {
        const onSuccess = () => {
          dispatch(listProvinceCode({ message })).then(() => {
            setFormValues('');
            setIsOpenForm(!isOpenForm);
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (mode === 'add') {
      await dispatch(createProvinceCode(values)).then((response) => {
        const onSuccess = () => {
          dispatch(listProvinceCode({ message })).then(() => {
            setFormValues('');
            setIsOpenForm(!isOpenForm);
            setLoading(false);
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
            data={provinceCodeList}
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

export default ProvinceCode;
