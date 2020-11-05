import React, { useEffect, useState } from 'react';
import { 
  Row, 
  Col, 
  Typography, 
  Button, 
  Input,
  DatePicker,
  Space,
  Table,
  Modal,
  message
} from 'antd';
import { 
  PlusOutlined,
} from '@ant-design/icons';
import { tableHeader } from '../../../datas/FinishedGoods'
import FilteredColumns from '../../../components/TableDisplay/FilteredColumns';
import TableSearch from '../../../components/TableDisplay/TableSearch';
import FinishedGoodsForm from '../../../components/forms/FinishedGoodsForm';
import { useDispatch, useSelector } from 'react-redux';
import { getFGList, createFG, deleteFG, updateFG } from './redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;
const { confirm } = Modal;

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
  }, [dispatch]);

  useEffect(() => {
    if (action !== 'get' && action !== ''){
      console.log(action)
      message.success(statusMessage);
    }
  }, [statusMessage])

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
    confirm({
      title: 'Do you want to delete this item?',
      icon: <ExclamationCircleOutlined />,
      content: `Item with id of (${row.id}) and name of (${row.name})  will be deleted.`,
      onOk() {
        return new Promise((resolve) => {
          setTimeout(() => {
            dispatch(deleteFG(row)).then(() => {
              dispatch(getFGList());
              resolve();
            });
          }, 1000);
        }).catch(() => message.error("Oops! something went wrong."));
      },
      onCancel() {},
    });
  }

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('')
  }

  const onSearch = (value) => {
    console.log(value)
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

  console.log();

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
        <Table
          dataSource={list}
          columns={FilteredColumns(TableSearch(tableHeader), handleEditButton, handleDeleteButton)}
        />
      </Col>
      <FinishedGoodsForm 
        visible={isOpenForm} 
        title={modalTitle} 
        onSubmit={onSubmit} 
        values={formValues} 
        onCancel={handleCancelButton} 
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