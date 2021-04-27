import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/FormModal';
import { tableHeader, formDetails } from './data';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';

import { listCluster, createCluster, updateCluster, deleteCluster, clearData } from './redux';

const { Title } = Typography;

const ClusterCodes = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { list: clusterList, action, statusMessage, status, statusLevel } = useSelector(
    (state) => state.maintenance.clusterCode
  );

  useEffect(() => {
    let isCancelled = false;
    dispatch(listCluster()).then(() => {
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
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  const handleAddButton = () => {
    setModalTitle('Add New Cluster');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Cluster');
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  };

  const handleDeleteButton = (row) => {
    setLoading(true);
    dispatch(deleteCluster(row)).then(() => {
      dispatch(listCluster()).then(() => {
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

      await dispatch(updateCluster(newValues)).then(() => {
        dispatch(listCluster()).then(() => {
          setLoading(false);
        });
      });
    } else if (mode === 'add') {
      await dispatch(createCluster(values)).then(() => {
        dispatch(listCluster()).then(() => {
          setLoading(false);
        });
      });
    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
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
            data={clusterList}
            handleUpdate={handleEditButton}
            handleDelete={handleDeleteButton}
            updateEnabled={false}
            deleteEnabled={false}
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

export default ClusterCodes;
