import React, {useState, useEffect} from 'react';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GeneralStyles from '../../../datas/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/SimpleForm';
import { tableHeader, formDetails} from './data'
import { listCluster, createCluster, updateCluster, deleteCluster } from './redux';
import { useDispatch, useSelector } from 'react-redux';

const {Title} = Typography;

const ClusterCodes = (props) => {
  const {title} = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const { clusterList, action, statusMessage } = useSelector((state) => state.maintenance.clusterCode);

  useEffect(() => {
    dispatch(listCluster())
  },[dispatch]);

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
    setModalTitle('Add New Cluster');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  }

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Cluster');
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  }

  const handleDeleteButton = (row) => {
    dispatch(deleteCluster(row))
      .then(() => {
        dispatch(listCluster());
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  }

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('');
  }

  const onSubmit = (values) => {
    if (mode === 'edit') {
      const newValues = values;
      newValues.id = currentID;

      dispatch(updateCluster(newValues)).then(() => {
        dispatch(listCluster());
      });
    } else if (mode === 'add') {
      dispatch(createCluster(values)).then(() => {
        dispatch(listCluster());
      });
    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  }

  return(
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
          data={clusterList}
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
  )
}

export default ClusterCodes;