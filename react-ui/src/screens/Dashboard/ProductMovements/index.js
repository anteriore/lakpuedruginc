import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import { Row, Col, Typography, Button, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';
import {useDispatch, useSelector } from 'react-redux';
import { listProductMovements, clearData } from './redux';
import { unwrapResult } from '@reduxjs/toolkit';
import InputForm from './InputForm';
import statusDialogue from '../../../components/StatusDialogue';
import { clearData as clearDepot, tempListDepot } from '../../Maintenance/Depots/redux';
import { clearData as clearPI, tempListProductInventory } from '../../Maintenance/redux/productInventory'; 
import _ from 'lodash';

const { Title } = Typography;

const ProductMovements = (props) => {
  const { company, title } = props;
  const { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const [contentLoading, setContentLoading] = useState(true)

  const { productMovementList, action, statusMessage, status, statusLevel } = useSelector((state) => state.dashboard.productMovements);

  const {
    action: actionDepot,
    statusMessage: statusMessageDepot,
    status: statusDepot,
    statusLevel: statusLevelDepot,
  } = useSelector((state) => state.maintenance.depots);

  const {
    action: actionPI,
    statusMessage: statusMessagePI,
    status: statusPI,
    statusLevel: statusLevelPI,
  } = useSelector((state) => state.maintenance.productInventory);

  const pushErrorPage = useCallback(
    (statusCode) => {
      history.push({
        pathname: `/error/${statusCode === 400 || statusCode === 404 ? 403 : statusCode}`,
        state: {
          moduleList: '/sales',
        },
      });
    },
    [history]
  );

  useEffect(() => {
    if (status !== 'loading') {
      if (action === 'fetch' && statusLevel !== 'success') {
        statusDialogue({statusMessage, statusLevel}, 'message');
      }

      if (action !== 'fetch') {
        statusDialogue({statusMessage, statusLevel}, 'message');
      }
    }
  },[status, action, statusMessage, statusLevel]);

  useEffect(() => {
    if (statusPI !== 'loading') {
      if (actionPI === 'fetch' && statusLevelPI === 'warning') {
        statusDialogue(
          {
            statusLevel: statusLevelPI,
            modalContent: {
              title: `${_.capitalize(statusLevelPI)} - (Product Inventory)`,
              content: statusMessagePI,
            },
          },
          'modal'
        );
      }
    }
  }, [actionPI, statusMessagePI, statusPI, statusLevelPI]);

  useEffect(() => {
    if (statusDepot !== 'loading') {
      if (actionDepot === 'fetch' && statusLevelDepot === 'warning') {
        statusDialogue(
          {
            statusLevel: statusLevelDepot,
            modalContent: {
              title: `${_.capitalize(statusLevelDepot)} - (Depot)`,
              content: statusMessageDepot,
            },
          },
          'modal'
        );
      }
    }
  }, [actionDepot, statusMessageDepot, statusDepot, statusLevelDepot]);

  useEffect(() => {
    let isCancelled = false;
    setContentLoading(true);
    dispatch(listProductMovements(company)).then(unwrapResult).then(() => {
      if(isCancelled) {
        dispatch(clearData());
      }
    }).catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError);
    });

    setContentLoading(false);
    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepot());
      dispatch(clearPI());
      
      isCancelled = true;
    }
  }, [dispatch, company]);

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(tempListDepot(company)).then((dataDepot) => {
      dispatch(tempListProductInventory()).then((dataPI) => {
        const promiseList = [dataDepot, dataPI];
        const promiseResult = _.some(promiseList, (o) => {
          return o.type.split(/[/?]/g)[1] === 'rejected';
        });

        if(!promiseResult) {
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
      })
    })
    history.push(`${path}/new`);
  }

  const onCreate = () => {

  }

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Product Movement" onSubmit={onCreate} company={company}/>
      </Route>
      <Route path={`${path}`}>
        <Row>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>
              {title}
            </Title>
            <Button
              loading={contentLoading}
              onClick={() => handleAddButton()}
              icon={<PlusOutlined/>}
              primary
            > 
              Add
            </Button>
          </Col>
          <Col span={20}>
            {contentLoading ? (
              <Skeleton/>
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={productMovementList}
                deleteEnabled={false}
                updateEnabled={false}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  )
}

export default ProductMovements;