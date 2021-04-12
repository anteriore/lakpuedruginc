import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';
import { tableHeader, formDetails } from './data';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';
import {
  createInstitution,
  deleteInstitution,
  listInstitution,
  updateInstitution,
  clearData,
} from './redux';

const { Title } = Typography;

const InstitutionalCodes = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { handleRequestResponse } = GeneralHelper()

  const { institutionList, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.maintenance.institutionalCodes
  );

  useEffect(() => {
    let isCancelled = false;
    dispatch(listInstitution({ message })).then(() => {
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
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

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
    setLoading(true)
    dispatch(deleteInstitution(row))
      .then(() => {
        dispatch(listInstitution({ message })).then(() => {
          setLoading(false);
        });
      })
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

      await dispatch(updateInstitution(newValues)).then((response) => {
        const onSuccess = () => {
          dispatch(listInstitution({ message })).then(() => {
            setFormValues('');
            setIsOpenForm(!isOpenForm);
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
  
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (mode === 'add') {
      await dispatch(createInstitution(values)).then((response) => {
        const onSuccess = () => {
          dispatch(listInstitution({ message })).then(() => {
            setFormValues('');
            setIsOpenForm(!isOpenForm);
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
  
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }
    return 1
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
        { loading ? <Skeleton/> : 
          <TableDisplay
            columns={tableHeader}
            data={institutionList}
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

export default InstitutionalCodes;
