import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Typography, Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listAccountTitles, listAccountTitlesByType, addAccountTitle, clearData } from './redux';
import FormScreen from '../../../components/forms/FormScreen';
//import ItemDescription from '../../../components/ItemDescription';

const { Title, Text } = Typography;

const AccountTitles = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const { formDetails } = FormDetails();

  const listData = useSelector((state) => state.accounting.accountTitles.list);

  const { company } = props;

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

  const handleRetrieve = (data) => {
    setSelectedData(data);
    setDisplayModal(true);
  };

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
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={listData}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                deleteEnabled={false}
              />
            )}
          </Col>
          <Modal
            visible={displayModal}
            onOk={() => {
              setDisplayModal(false);
              setSelectedData(null);
            }}
            onCancel={() => {
              setDisplayModal(false);
              setSelectedData(null);
            }}
            width={1000}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            {/*selectedData === null ? (
              <Skeleton />
            ) : (
              <Space direction="vertical" size={20} style={{ width: '100%' }}>
                <ItemDescription
                  title={`${selectedData.pisNo} Details`}
                  selectedData={selectedData}
                  formItems={formDetails.form_items}
                />
                <Text>{'Issued Items: '}</Text>
                <Table
                  dataSource={
                    selectedData[tableDetails.name] !== null &&
                    typeof selectedData[tableDetails.name] !== 'undefined'
                      ? selectedData[tableDetails.name]
                      : []
                  }
                  columns={tableDetails.renderTableColumns(tableDetails.fields)}
                  pagination={false}
                  locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                />
                {selectedData.status === 'Pending' && ( // add approval permissions here
                <>
                  <Text>{'Actions: '}</Text>
                  <Space>
                    <Popconfirm
                      title="Would you like to perform this action?"
                      icon={<QuestionCircleOutlined />}
                      onConfirm={(e) => {
                        handleCancel(selectedData)
                      }}
                      onCancel={(e) => {
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        style={{ marginRight: '1%' }}
                        icon={<CloseOutlined />}
                        onClick={(e) => {
                        }}
                        type="primary"
                        danger
                      >
                        Cancel
                      </Button>
                    </Popconfirm>
                  </Space>
                </>
              )}
              </Space>
                      )*/}
          </Modal>
        </Row>
      </Route>
    </Switch>
  );
};

export default AccountTitles;
