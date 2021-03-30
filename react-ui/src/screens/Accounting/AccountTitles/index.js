import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Typography, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listAccountTitles, listAccountTitlesByType, addAccountTitle, clearData } from './redux';
import FormScreen from '../../../components/forms/FormScreen';

const { Title } = Typography;

const AccountTitles = (props) => {
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const { formDetails } = FormDetails();

  const listData = useSelector((state) => state.accounting.accountTitles.list);

  const { company, actions } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listAccountTitles({ company, message })).then(() => {
      setLoading(false);

      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create Account Title');
    setFormMode('add');
    setFormData(null);
    //setLoading(true);
    dispatch(clearData())
    history.push(`${path}/new`);
    //setLoading(false);
  };

  const handleUpdate = (data) => {
    setFormTitle('Update Account Title');
    setFormMode('edit');
    setFormData({
      ...data,
      parent: data?.parent?.id ?? null
    });
    setLoading(true);
    dispatch(clearData())
    dispatch(listAccountTitlesByType({ type: data.type})).then(() => {
      history.push(`${path}/${data.id}`);
      setLoading(false);
    })
  };

  const handleDelete = (data) => {};

  const handleRetrieve = (data) => {};

  const onSubmit = (data) => {
    const parent = listData.find((item) => item.id === data.parent)
    console.log(parent)
    const payload = {
      ...data,
      parent: parent ?? null,
      level: (parent?.level ?? 0) + 1
    };
    if (formMode === 'edit') {
      payload.id = formData.id;
      dispatch(addAccountTitle(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listAccountTitles({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully updated ${data.title}`);
          });
        } else {
          setLoading(false);
          message.error(`Unable to update ${data.number}`);
        }
      });
    } else if (formMode === 'add') {
      dispatch(addAccountTitle(payload)).then((response) => {
        setLoading(true);
        if (response.payload.status === 200) {
          dispatch(listAccountTitles({ company, message })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${response.payload.data.title}`);
          });
        } else {
          setLoading(false);
          message.error(
            `Unable to create Account Title. Please double check the provided information.`
          );
        }
      });
    }
    setFormData(null);
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
