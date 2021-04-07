import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Typography, Col, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { tableHeader, formDetails } from './data';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';
import { listMemo, createMemo, updateMemo, deleteMemo, clearData } from './redux';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const MemoTypes = (props) => {
  const { title, actions } = props;
  const dispatch = useDispatch();
  const { handleRequestResponse } = GeneralHelper()

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const { list: memoList, statusMessage, action, status, statusLevel } = useSelector((state) => state.maintenance.memoTypes);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listMemo({ message })).then(() => {
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
    setLoading(true);
    dispatch(deleteMemo(row))
      .then(() => {
        dispatch(listMemo({ message })).then(() => {
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

      await dispatch(updateMemo(newValues)).then((response) => {
        const onSuccess = () => {
          dispatch(listMemo({ message })).then(() => {
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
      await dispatch(createMemo(values)).then((response) => {
        const onSuccess = () => {
          dispatch(listMemo({ message })).then(() => {
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
        {loading ? <Skeleton/> : 
          <TableDisplay
            columns={tableHeader}
            data={memoList}
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

export default MemoTypes;
