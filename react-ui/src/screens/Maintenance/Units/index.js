import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Typography,
  Col,
  Button,
  Table,
  Modal,
  message
} from 'antd';
import GeneralStyles from '../../../datas/styles/styles.general';
import { tableHeader, formDetails } from '../../../datas/Units';
import FilteredColumns from '../../../components/TableDisplay/FilteredColumns';
import TableSearch from '../../../components/TableDisplay/TableSearch';
import SimpleForm from '../../../components/forms/SimpleForm';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { listUnit, createUnit, updateUnit, deleteUnit } from './redux';

const { Title } = Typography;
const {confirm} = Modal;

const Units = (props) => {
  const {company} = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const dispatch = useDispatch();
  const {
    unitList,
    action,
    statusMessage
  } = useSelector(state => state.maintenance.units );

  useEffect(() => {
    dispatch(listUnit({company}));
  }, [dispatch, company]);

  useEffect(() => {
    if (action !== 'get' && action !== ''){
      message.success(statusMessage);
    }
  }, [statusMessage, action]);

  const handleAddButton = () => {
    setModalTitle("Add New Unit");
    setMode('add');
    setIsOpenForm(!isOpenForm);
  }

  const handleEditButton = (row) => {
    setCurrentID(row.id)
    setModalTitle("Edit Unit");
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
            dispatch(deleteUnit(row)).then(() => {
              dispatch(listUnit());
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

  const onSubmit = (values) => {
    if(mode === 'edit'){
      let newValues = values;
      newValues.id = currentID;

      dispatch(updateUnit(newValues)).then(() => {
        dispatch(listUnit());
      });
    }else if( mode === 'add' ){
      dispatch(createUnit(values)).then(() => {
        dispatch(listUnit());
      });

    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  }

  return (
    <Row gutter={[8,24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title>
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
          dataSource={unitList}
          columns={FilteredColumns(TableSearch(tableHeader), handleEditButton, handleDeleteButton)}
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

export default Units;
