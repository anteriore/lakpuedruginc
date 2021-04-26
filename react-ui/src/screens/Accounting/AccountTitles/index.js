import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Skeleton, Typography, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import {
  listAccountTitles,
  listAccountTitlesByType,
  createAccountTitle,
  updateAccountTitle,
  clearData,
} from './redux';
import FormScreen from '../../../components/forms/FormScreen';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const AccountTitles = (props) => {
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const { formDetails } = FormDetails();
  const isMounted = useRef(true);

  const { list: listData, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.accounting.accountTitles
  );

  const { company, actions } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    dispatch(listAccountTitles({ company, message })).then(() => {
      setLoading(false);
    });

    return function cleanup() {
      isMounted.current = false;
      dispatch(clearData());
    };
  }, [dispatch, company]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  const handleAdd = () => {
    setFormTitle('Create Account Title');
    setFormMode('add');
    setFormData(null);
    dispatch(clearData());
    history.push(`${path}/new`);
  };

  const handleUpdate = (data) => {
    setFormTitle('Update Account Title');
    setFormMode('edit');
    setFormData({
      ...data,
      parent: data?.parent?.id ?? null,
    });
    setLoading(true);
    dispatch(clearData());
    dispatch(listAccountTitlesByType({ type: data.type })).then((response) => {
      if (isMounted) {
        const onSuccess = () => {
          history.push(`${path}/${data.id}`);
          setLoading(false);
        };
        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      }
    });
  };

  const handleDelete = (data) => {};

  const handleRetrieve = (data) => {};

  const onSubmit = async (data) => {
    const parent = listData.find((item) => item.id === data.parent);
    const payload = {
      ...data,
      parent: parent ?? null,
      level: (parent?.level ?? 0) + 1,
    };
    if (formMode === 'edit') {
      payload.id = formData.id;
      await dispatch(updateAccountTitle(payload)).then((response) => {
        setLoading(true);
        history.goBack();
        const onSuccess = () => {
          dispatch(listAccountTitles({ company, message })).then(() => {
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (formMode === 'add') {
      await dispatch(createAccountTitle(payload)).then((response) => {
        setLoading(true);
        history.goBack();
        const onSuccess = () => {
          dispatch(listAccountTitles({ company, message })).then(() => {
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }
    setFormData(null);
    return 1;
  };

  return (
    <Switch>
      <Route exact path={`${path}/new`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
            setLoading(true);
            dispatch(listAccountTitles({ company, message })).then(() => {
              setLoading(false);
            });
          }}
          formDetails={formDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={() => {
            setFormData(null);
            setLoading(true);
            dispatch(listAccountTitles({ company, message })).then(() => {
              setLoading(false);
            });
          }}
          formDetails={formDetails}
        />
      </Route>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {props.title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            {actions.includes('create') && (
              <Button
                style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
                icon={<PlusOutlined />}
                onClick={() => {
                  handleAdd();
                }}
                loading={loading}
              >
                Add
              </Button>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={listData}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={actions.includes('update')}
                deleteEnabled={false}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  );
};

export default AccountTitles;
