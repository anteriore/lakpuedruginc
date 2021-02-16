import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Typography, Skeleton, Modal, Descriptions } from 'antd';
import GeneralStyles from '../../../data/styles/styles.general';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import { clearData, listEmployees, createEmployee, deleteEmployee } from './redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import statusDialogue from '../../../components/StatusDialogue';
import InputForm from './InputForm';
import moment from 'moment';

const { Title } = Typography;

const Employees = (props) => {
  const {title, company} = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { employeeList, action, statusMessage, status, statusLevel } = useSelector((state) => state.dashboard.employees);

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);

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
    setContentLoading(true);
    dispatch(listEmployees(company)).then(unwrapResult).then(() => {
      if(isCancelled){
        dispatch(clearData());
      }
    }).catch((rejectedValueOrSeriealizedError) => {
      console.log(rejectedValueOrSeriealizedError);
    });

    setContentLoading(false);
    return function cleanup() {
      dispatch(clearData());

      isCancelled = true;
    }
  },[dispatch, company ])

  const handleAddButton = () => {
    history.push(`${path}/new`);
  };

  const handleDeleteButton = (value) => {
    setContentLoading(true)
    dispatch(deleteEmployee(value)).then(() => {
      dispatch(listEmployees(company)).then(() => {
        setContentLoading(false);
      })
    })
  }

  const handleRetrieve = (value) => {
    setDisplayModal(true);
    setSelectedEmployee(value)
  }

  const onCreate = (values) => {
    setContentLoading(true);
    dispatch(createEmployee(values)).then(() => {
      dispatch(listEmployees(company)).then(() => {
        setContentLoading(false);
      })
    })
  }

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm onSubmit={onCreate} title="Create New Employee" />
      </Route>
      <Route>
        <Row gutter={[8,24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            <Button loading={contentLoading} icon={<PlusOutlined />} onClick={() => handleAddButton()}>
              Add
            </Button>
          </Col>
          <Col span={20}>
            { contentLoading ? (
              <Skeleton/>
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={employeeList}
                handleDelete={handleDeleteButton}
                updateEnabled={false}
                deleteEnabled={true}
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Sales Order Details"
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setSelectedEmployee(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setSelectedEmployee(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {selectedEmployee === null ? (
            <Skeleton />
          ) : (
            <>
              <Descriptions
                bordered
                title={`Employee ${selectedEmployee.number}`}
                size="default"
                layout="vertical"
              >
                {formDetails.form_items.map((item) => {
                  if (!item.writeOnly) {
                    if (item.type === 'select') {
                      const itemData = selectedEmployee[item.name];
                      return (
                        <Descriptions.Item key={item.name} label={item.label}>
                          {typeof itemData === 'object' ? itemData.code : itemData}
                        </Descriptions.Item>
                      );
                    }

                    if (item.type === 'date') {
                      return (
                        <Descriptions.Item key={item.name} label={item.label}>
                          {moment(new Date(selectedEmployee[item.name])).format('DD/MM/YYYY')}
                        </Descriptions.Item>
                      );
                    }

                    return (
                      <Descriptions.Item key={item.name} label={item.label}>
                        {typeof selectedEmployee[item.name] === 'object' && selectedEmployee[item.name] !== null
                          ? selectedEmployee[item.name].code
                          : selectedEmployee[item.name].toString()}
                      </Descriptions.Item>
                    );
                  }

                  return null;
                })}
              </Descriptions>
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  )
}

export default Employees;