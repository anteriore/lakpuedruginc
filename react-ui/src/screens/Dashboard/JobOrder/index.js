import React, { useEffect, useState, useCallback } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Button, Row, Col, Typography, Skeleton, Modal, Descriptions } from 'antd';
import GeneralStyles from '../../../data/styles/styles.general';
import { PlusOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails ,{ tableHeader } from './data';
import { listJobOrders, clearData } from './redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import statusDialogue from '../../../components/StatusDialogue';
import { listEmployees, clearData as clearDataEmployees } from '../Employees/redux/';
import { listMoInventories, clearData as clearDataMO } from '../../RND/MOInventory/redux';
import { listProductionArea, clearData as clearDataProdArea } from '../../Maintenance/ProductionArea/redux';
import { listProcedure, clearData as clearDataProcedure } from '../../Maintenance/Procedures/redux';
import _ from 'lodash';
import FormScreen from '../../../components/forms/FormScreen';

const { Title } = Typography;

const JobOrder = (props) => {
  const {title, company} = props; 
  const {path} = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { formDetails, tableDetails } = FormDetails();
  
  const { jobOrderList, action, statusMessage, status, statusLevel } = useSelector(state => state.dashboard.jobOrders)
  
  const { 
    action: actionMO, 
    statusMessage: statusMessageMO, 
    status: statusMO,
    statusLevel: statusLevelMO
  } = useSelector(state => state.rnd.moInventories);

  const {
    action: actionEmployee, 
    status: statusEmployee,
    statusMessage: statusMessageEmployee,
    statusLevel: statusLevelEmployee
  } = useSelector(state => state.dashboard.employees);

  const [contentLoading, setContentLoading] = useState(false);

  const pushErrorPage = useCallback(
    (statusCode) => {
      history.push({
        pathname: `/error/${statusCode === 400 || statusCode === 404 ? 403 : statusCode}`,
        state: {
          moduleList: '/dashboard',
        },
      });
    },
    [history]
  );

  useEffect(() => {
    if (statusMO !== 'loading') {
      if (actionMO === 'fetch' && statusLevelMO === 'warning') {
        statusDialogue(
          {
            statusLevel: statusLevelMO,
            modalContent: {
              title: `${_.capitalize(statusLevelMO)} - (MO Inventories)`,
              content: statusMessageMO,
            },
          },
          'modal'
        );
      }
    }
  }, [actionMO, statusMessageMO, statusMO, statusLevelMO]);

  useEffect(() => {
    if (statusEmployee !== 'loading') {
      if (actionEmployee === 'fetch' && statusLevelEmployee === 'warning') {
        statusDialogue(
          {
            statusLevel: statusLevelEmployee,
            modalContent: {
              title: `${_.capitalize(statusLevelEmployee)} - (Employees)`,
              content: statusMessageEmployee,
            },
          },
          'modal'
        );
      }
    }
  }, [actionEmployee, statusMessageEmployee, statusEmployee, statusLevelEmployee]);

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
    dispatch(listJobOrders()).then(unwrapResult).then(() => {
      if(isCancelled){
        dispatch(clearData());
      }
    }).catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError)
    });

    setContentLoading(false);
    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDataEmployees());
      dispatch(clearDataMO());
      dispatch(clearDataProcedure());
      dispatch(clearDataProdArea());
      isCancelled = true;
    }

  },[dispatch]);

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(listEmployees()).then((dataEmployee) => {
      dispatch(listMoInventories(company)).then((dataMO) => {
        dispatch(listProductionArea()).then((dataPA) => {
          dispatch(listProcedure()).then((dataProcedure) => {
            const promiseList = [dataEmployee, dataMO, dataPA, dataProcedure];
            const promiseResult = _.some(promiseList, (o) => {
              return o.type.split(/[/?]/g)[1] === 'rejected';
            })
  
            if(!promiseResult) {
              const promiseValues = _.some(promiseList, (o) => {
                return o.payload.status !== 200 && o.payload.data.length === 0;
              })
              if(!promiseValues) {
                history.push(`${path}/new`);
              }
              setContentLoading(false);
            } else {
              const { payload } = _.find(promiseList, (o) => o.type.split(/[/?]/g)[1] === 'rejected');
              pushErrorPage(payload.status);
            }  
          })
        })
      })
    })
  }

  const handleRetrieve = () => {

  }

  const onSubmit = () => {

  }

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <FormScreen
          title="Create Job Order"
          onSubmit={onSubmit}
          values={null}
          formDetails={
            formDetails
          }
          formTable={tableDetails}
        />
      </Route>
      <Route>
        <Row gutter={[8,24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>
              {title}
            </Title>
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
                data={jobOrderList}
                updateEnabled={false}
                deleteEnabled={false}
                handleRetrieve={handleRetrieve}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  )
}

export default JobOrder;