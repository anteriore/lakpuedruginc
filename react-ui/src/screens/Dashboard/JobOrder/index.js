import React, { useEffect, useState, useCallback } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Button, Row, Col, Typography, Skeleton, Modal, Descriptions } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import GeneralStyles from '../../../data/styles/styles.general';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { tableHeader } from './data';
import { listJobOrders, clearData, createJobOrder } from './redux';
import statusDialogue from '../../../components/StatusDialogue';
import { listEmployees, clearData as clearDataEmployees } from '../Employees/redux';
import { listMoInventories, clearData as clearDataMO } from '../../RND/MOInventory/redux';
import { listProcedure, clearData as clearDataProcedure } from '../../Maintenance/Procedures/redux';
import FormScreen from '../../../components/forms/FormScreen';
import { formatEmployeePayload } from './helpers';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const JobOrder = (props) => {
  const { title, company } = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { formDetails, tableDetails } = FormDetails();
  const [modalDisplay, setModalDisplay] = useState(false);
  const [selectedJobOrder, setSelectedJobOrder] = useState(null);
  const { jobOrderList, action, statusMessage, status, statusLevel } = useSelector(
    (state) => state.dashboard.jobOrders
  );
  const moList = useSelector(
    (state) => state.rnd.moInventories.moInventoryList
  );

  const {
    action: actionMO,
    statusMessage: statusMessageMO,
    status: statusMO,
    statusLevel: statusLevelMO,
  } = useSelector((state) => state.rnd.moInventories);

  const {
    action: actionEmployee,
    status: statusEmployee,
    statusMessage: statusMessageEmployee,
    statusLevel: statusLevelEmployee,
  } = useSelector((state) => state.dashboard.employees);

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
    reevalutateMessageStatus({status, action,statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    let isCancelled = false;
    setContentLoading(true);
    dispatch(listJobOrders())
      .then(unwrapResult)
      .then(() => {
        if (isCancelled) {
          dispatch(clearData());
        }
        setContentLoading(false);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      })
      .finally(() => {
        setContentLoading(false);
      })

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDataEmployees());
      dispatch(clearDataMO());
      dispatch(clearDataProcedure());
      isCancelled = true;
    };
  }, [dispatch]);

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(listEmployees()).then((dataEmployee) => {
      dispatch(listMoInventories(company)).then((dataMO) => {
        dispatch(listProcedure()).then((dataProcedure) => {
          const promiseList = [dataEmployee, dataMO, dataProcedure];
          const promiseResult = _.some(promiseList, (o) => {
            return o.type.split(/[/?]/g)[1] === 'rejected';
          });

          if (!promiseResult) {
            const promiseValues = _.some(promiseList, (o) => {
              return o.payload.status !== 200 && o.payload.data.length === 0;
            });
            if (!promiseValues) {
              history.push(`${path}/new`);
            }
            setContentLoading(false);
          } else {
            const { payload } = _.find(promiseList, (o) => o.type.split(/[/?]/g)[1] === 'rejected');
            pushErrorPage(payload.status);
          }
        });
      });
    });
  };

  const handleRetrieve = (value) => {
    setSelectedJobOrder(value);
    setModalDisplay(true);
  };

  const onSubmit = async (values) => {
    setContentLoading(true);
    values.moType = moList.find((item) => item.id === values.moNumber)?.type
    await dispatch(createJobOrder(formatEmployeePayload(values))).then(() => {
      history.goBack();
      dispatch(listJobOrders()).then(() => {
        setContentLoading(false);
      });
    });
    return 1
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <FormScreen
          title="Create Job Order"
          onSubmit={onSubmit}
          onCancel={() => history.goBack()}
          values={null}
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route>
        <Row gutter={[8, 24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>{title}</Title>
            <Button
              loading={contentLoading}
              icon={<PlusOutlined />}
              onClick={() => handleAddButton()}
            >
              Add
            </Button>
          </Col>
          <Col span={20}>
            {contentLoading ? (
              <Skeleton />
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
        <Modal
          title="Job Order Details"
          visible={modalDisplay}
          onOk={() => {
            setModalDisplay(false);
            setSelectedJobOrder(null);
          }}
          onCancel={() => {
            setModalDisplay(false);
            setSelectedJobOrder(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {selectedJobOrder === null ? (
            <Skeleton />
          ) : (
            <>
              <Descriptions
                bordered
                title={`JobOrder ${selectedJobOrder.employee?.firstName ?? ''} 
                    ${selectedJobOrder.employee?.lastName ?? ''} - 
                    [${selectedJobOrder.procedure?.procedureArea?.code ?? ''}]
                    ${selectedJobOrder.procedure?.code ?? ''}`}
                size="default"
                layout="vertical"
              >
                <Descriptions.Item label="MO Inventory">
                  {selectedJobOrder.moInventory?.id ?? ''}
                </Descriptions.Item>
                <Descriptions.Item label="Date Created">
                  {moment(new Date(selectedJobOrder.date)).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Employee">
                  {`${selectedJobOrder.employee?.firstName ?? ''} 
                    ${selectedJobOrder.employee?.middleName ?? ''} 
                    ${selectedJobOrder.employee?.lastName ?? ''}`}
                </Descriptions.Item>
                <Descriptions.Item label="Procedure">
                  {`[${selectedJobOrder.procedure?.code ?? ''}] ${
                    selectedJobOrder.procedure?.name ?? ''
                  }`}
                </Descriptions.Item>
                <Descriptions.Item label="Procedure Area">
                  {selectedJobOrder.procedure?.procedureArea?.code ?? ''}
                </Descriptions.Item>
                <Descriptions.Item label="Output">{selectedJobOrder.output}</Descriptions.Item>
                <Descriptions.Item label="Number of Hours">
                  {selectedJobOrder.numberOfHours}
                </Descriptions.Item>
                <Descriptions.Item label="Time In">
                  {moment(new Date(selectedJobOrder.timeIn)).format('LT')}
                </Descriptions.Item>
                <Descriptions.Item label="Time Out">
                  {moment(new Date(selectedJobOrder.timeOut)).format('LT')}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default JobOrder;
