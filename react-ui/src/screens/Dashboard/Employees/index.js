import React, { useEffect } from 'react';
import { Button, Row, Col, Typography, Skeleton, Modal, Descriptions } from 'antd';
import GeneralStyles from '../../../data/styles/styles.general';
import { PlusOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';
import { clearData, listEmployees } from './redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import statusDialogue from '../../../components/StatusDialogue';

const { Title } = Typography;

const Employees = (props) => {
  const {title, company} = props;
  const dispatch = useDispatch();
  const { employeeList, action, statusMessage, status, statusLevel } = useSelector((state) => state.dashboard.employees);
  
  useEffect(() => {
    if (status !== 'loading') {
      if (action === 'fetch' && statusLevel !== 'success') {
        statusDialogue({ statusMessage, statusLevel }, 'message');
      }

      if (action !== 'fetch') {
        statusDialogue({ statusMessage, statusLevel }, 'message');
      }
    }
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listEmployees(company)).then(unwrapResult).then(() => {
      if(isCancelled){
        dispatch(clearData());
      }
    }).catch((rejectedValueOrSeriealizedError) => {
      console.log(rejectedValueOrSeriealizedError);
    });

    return function cleanup() {
      dispatch(clearData());

      isCancelled = true;
    }
  },[dispatch, company ])

  const handleAddButton = () => {

  };

  const handleDeleteButton = () => {

  }

  return (
    <Row gutter={[8,24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title>{title}</Title>
        <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
          Add
        </Button>
      </Col>
      <Col span={20}>
        <TableDisplay
           columns={tableHeader}
           data={employeeList}
           handleDelete={handleDeleteButton}
           updateEnabled={false}
           deleteEnabled={true}
        />
      </Col>
    </Row>
  )
}

export default Employees;