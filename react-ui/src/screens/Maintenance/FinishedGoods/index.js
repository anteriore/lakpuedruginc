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
} from 'antd';
import { 
  PlusOutlined,
} from '@ant-design/icons';
import { tableHeader, dataFG } from '../../../datas/FinishedGoods'
import FilteredColumns from '../../../components/FilteredColumns';
import FinishedGoodsForm from '../../../components/forms/FinishedGoodsForm';

const { Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const FinishedGoods = (props) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [formValues, setFormValues] = useState(null);
  const [mode, setMode] = useState('')

  const handleAddButton = () => {
    setIsOpenForm(!isOpenForm);
    setModalTitle("Add Finished Good");
    setMode('add');
  }

  const handleEditButton = (row) => {
    setIsOpenForm(!isOpenForm);
    setModalTitle("Edit Finished Good");
    setMode('edit');
    setFormValues(row);
  }

  const handleDeleteButton = (row) => {
    console.log("Deleting Row",row);
  }

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues(null)
  }

  const onSubmit = (values) => {
    if(mode === 'edit'){
      // insert dispatch
      console.log('Updating Finished goods', values);
      setFormValues(null);
      setIsOpenForm(!isOpenForm);
    }else if( mode === 'add' ){
      // insert dispatch
      setIsOpenForm(!isOpenForm);
      console.log('Adding Finished goods', values);
    }
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
      <Col style={styles.filterArea} span={10}>
        <Space size="large">
          <Search  placeholder="Search FG Name"/>
          <RangePicker/>
        </Space>
      </Col>
      <Col span={20}>
        <Table
          dataSource={dataFG}
          columns={FilteredColumns(tableHeader, handleEditButton, handleDeleteButton)}
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
  },
  filterArea: {
    display: 'flex',
    flexDirection: 'row',
  }
}