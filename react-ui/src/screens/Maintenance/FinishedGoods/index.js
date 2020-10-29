import React, { useState } from 'react';
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
  const [formValues, setFormValues] = useState('');
  const [mode, setMode] = useState('')

  const handleAddButton = () => {
    setModalTitle("Add Finished Good");
    setMode('add');
    setIsOpenForm(!isOpenForm);
  }

  const handleEditButton = (row) => {
    setModalTitle("Edit Finished Good");
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  }

  const handleDeleteButton = (row) => {
    console.log("Deleting Row",row);
  }

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('')
  }

  const onSubmit = (values) => {
    if(mode === 'edit'){
      // insert dispatch
      console.log('Updating Finished goods', values);
    }else if( mode === 'add' ){
      // insert dispatch
      console.log('Adding Finished goods', values);
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