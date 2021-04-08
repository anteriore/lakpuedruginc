import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { listMaterialReevaluations, clearData, createMaterialReevaluations } from './redux';
import TableDisplay from '../../../components/TableDisplay';
import { modalColumns, tableHeader } from './data';
import InputForm from './InputForm';
import { listApprovedReceipts, clearData as clearAR } from '../ApprovedReceipts/redux';
import GeneralHelper from '../../../helpers/general-helper';
import { formatPayload } from './helpers';
import { reevalutateMessageStatus } from '../../../helpers/general-helper'
import ItemDescription from '../../../components/ItemDescription';

const { Title } = Typography;

const MaterialReevaluations = (props) => {
  const { company, title, actions } = props;
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const [contentLoading, setContentLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [matReev, setMatReev] = useState(null);
  const { handleRequestResponse } = GeneralHelper();
  const {
    materialReevaluationsList: matReevList,
    status,
    action,
    statusMessage,
    statusLevel,
  } = useSelector((state) => state.dashboard.materialReevaluations);
  const { list: ARList } = useSelector((state) => state.dashboard.approvedReceipts);
  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearAR());
  },[dispatch])

  const onSuccess = useCallback(() => {
    history.push(`${path}/new`);
  }, [history, path]);

  const onFailed = useCallback(() => {
    history.goBack();
		setContentLoading(false);
  }, [history]);

  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    dispatch(listMaterialReevaluations(company))
    .then(() => {
      if (isMounted.current) {
        setContentLoading(false);
      } else {
        performCleanup()
      }
    })
    return function cleanup() {
      isMounted.current = false
    };
  }, [dispatch, company, performCleanup]);

  const handleAddButton = () => {
    setContentLoading(true)
    dispatch(listApprovedReceipts({company})).then((dataAR) => {
      handleRequestResponse([dataAR], onSuccess, onFailed, '/material-reevaluations');
      setContentLoading(false);
    }).catch(() => {
      setContentLoading(false);
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setMatReev(data);
  };

  const onCreate = (value) => {
    setContentLoading(true);
    const payload = formatPayload(value, ARList, company);
    dispatch(createMaterialReevaluations(payload)).then((dataMR) => {
      dispatch(listMaterialReevaluations(company)).then((dataListMR) => {
        handleRequestResponse([dataMR, dataListMR], null, onFailed, '/material-reevaluations');
        setContentLoading(false);
      });
    });
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <InputForm title="New Material Reevaluations" onSubmit={onCreate} />
      </Route>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            {actions.includes('create') && (
              <Button
                style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                icon={<PlusOutlined />}
                loading={contentLoading}
                onClick={() => handleAddButton()}
              >
                Add
              </Button>
            )}
            {contentLoading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={matReevList}
                handleRetrieve={handleRetrieve}
                deleteEnabled={false}
                updateEnabled={false}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Material Reevaluation Details"
          visible={displayModal}
          onOk={() => {
            setDisplayModal(false);
            setMatReev(null);
          }}
          onCancel={() => {
            setDisplayModal(false);
            setMatReev(null);
          }}
          width={1000}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          {matReev === null ? (
            <Skeleton />
          ) : (
            <>
              <ItemDescription
                title="Material Reevaluation Details"
                selectedData={matReev}
                formItems={modalColumns}
              />
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default MaterialReevaluations;
