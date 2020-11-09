import React, { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Typography, 
  Button,
  message
} from 'antd';
import { 
  PlusOutlined,
} from '@ant-design/icons';
import { tableHeader, formDetails } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { getFGList, createFG, deleteFG, updateFG } from './redux';
import TableDisplay from '../../../components/TableDisplay';
import SimpleForm from '../../../components/forms/SimpleForm';

const { Title } = Typography;

const FinishedGoods = (props) => {
  const { company } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [formValues, setFormValues] = useState('');
  const [mode, setMode] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const {
    list,
    statusMessage,
    action
  } = useSelector(state => state.maintenance.finishedGoods )

  useEffect(() => {
    dispatch(getFGList({company}));
  }, [dispatch, company]);

  useEffect(() => {
    if (action !== 'get' && action !== ''){
      message.success(statusMessage);
    }
  }, [statusMessage, action])

  const handleAddButton = () => {
    setModalTitle("Add Finished Good");
    setMode('add');
    setIsOpenForm(!isOpenForm);
  }

  const handleEditButton = (row) => {
    setCurrentID(row.id)
    setModalTitle("Edit Finished Good");
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  }

  const handleDeleteButton = (row) => {
    dispatch(deleteFG(row)).then(() => {
      message.success(statusMessage);
      dispatch(getFGList());
    }).catch((err) => {
      message.error(`Something went wrong! Error: ${err}`);
    });
  }

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('')
  }

  const onSubmit = (values) => {
    if(mode === 'edit'){
      let newValues = values;
      newValues.id = currentID;

      dispatch(updateFG(newValues)).then(() => {
        dispatch(getFGList());
      })
    }else if( mode === 'add' ){
      dispatch(createFG(values)).then(() => {
        dispatch(getFGList());
      });

    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  } 

  return (
    <Row gutter={[8,24]}>
      <Col style={styles.headerPage} span={20}>
        <Title level={3}>
          {props.title}
        </Title>
        <Button
          icon={ <PlusOutlined/> }
          onClick={() => handleAddButton()}
        >
          Add
        </Button>
      </Col>
      <Col span={20}>
        <TableDisplay 
          columns={tableHeader}
          data={list}
          handleUpdate={handleEditButton}
          handleDelete={handleDeleteButton} />
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

export default FinishedGoods;

const styles = {
  headerPage:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}