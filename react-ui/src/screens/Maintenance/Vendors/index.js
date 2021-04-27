import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Row, Col, Typography, Button, message, Skeleton, Descriptions, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import FormDetails, { columns } from './data';
import { listVendor, addVendor, getVendor, updateVendor, deleteVendor, clearData } from './redux';
import { listD, listA, clearData as clearA } from '../DepartmentArea/redux';
import { listGroupByCompany, clearData as clearG } from '../GroupsCategories/redux';
import FormScreen from '../../../components/forms/FormScreen';
import GeneralHelper, {
  reevalutateMessageStatus,
  reevalDependencyMsgStats,
} from '../../../helpers/general-helper';

const { Title } = Typography;

const Vendors = (props) => {
  const { formDetails } = FormDetails();
  const { handleRequestResponse } = GeneralHelper();

  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayData, setDisplayData] = useState(null);

  const { company, title, actions } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { status, action, statusMessage, statusLevel, list } = useSelector(
    (state) => state.maintenance.vendors
  );
  const {
    status: statusDA,
    action: actionDA,
    statusMessage: statusMessageDA,
    statusLevel: statusLevelDA,
  } = useSelector((state) => state.maintenance.departmentArea);

  const {
    status: statusGC,
    action: actionGC,
    statusMessage: statusMessageGC,
    statusLevel: statusLevelGC,
  } = useSelector((state) => state.maintenance.groupsCategories);

  const isMounted = useRef(true);

  const performCleanup = useCallback(() => {
    dispatch(clearData());
    dispatch(clearA());
    dispatch(clearG());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listVendor({ company, message })).then(() => {
      if (isMounted.current) {
        setFormData(null);
        setLoading(false);
      }
    });

    return function cleanup() {
      isMounted.current = false;
      performCleanup();
    };
  }, [dispatch, company, performCleanup]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusDA,
      statusMessage: statusMessageDA,
      action: actionDA,
      statusLevel: statusLevelDA,
      module: title,
    });
  }, [actionDA, statusMessageDA, statusDA, statusLevelDA, title]);

  useEffect(() => {
    reevalDependencyMsgStats({
      status: statusGC,
      statusMessage: statusMessageGC,
      action: actionGC,
      statusLevel: statusLevelGC,
      module: title,
    });
  }, [actionGC, statusMessageGC, statusGC, statusLevelGC, title]);

  const handleAdd = () => {
    setFormTitle('Add Vendor');
    setFormMode('add');
    setFormData(null);
    setLoading(true);
    dispatch(listA({ company, message })).then((resp1) => {
      dispatch(listD({ company, message })).then((resp2) => {
        dispatch(listGroupByCompany({ company })).then((resp3) => {
          if (isMounted.current) {
            const onSuccess = () => {
              history.push(`${path}/new`);
              setLoading(false);
            };
            const onFail = () => {
              setLoading(false);
            };
            handleRequestResponse([resp1, resp2, resp3], onSuccess, onFail, '');
          }
        });
      });
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Vendor');
    setFormMode('edit');
    const vendorData = list.find((vendor) => vendor.id === data.id);
    const formData = {
      ...vendorData,
      department: vendorData.department !== null ? vendorData.department.id : null,
      area: vendorData.area !== null ? vendorData.area.id : null,
      group: vendorData.group !== null ? vendorData.group.id : null,
    };
    setFormData(formData);
    dispatch(listA({ company, message })).then((resp1) => {
      dispatch(listD({ company, message })).then((resp2) => {
        dispatch(listGroupByCompany({ company })).then((resp3) => {
          if (isMounted.current) {
            const onSuccess = () => {
              history.push(`${path}/new`);
              setLoading(false);
            };
            const onFail = () => {
              setLoading(false);
            };
            handleRequestResponse([resp1, resp2, resp3], onSuccess, onFail, '');
          }
        });
      });
    });
  };

  const handleDelete = (data) => {
    setLoading(true);
    dispatch(deleteVendor(data.id)).then((response) => {
      const onSuccess = () => {
        dispatch(listVendor({ company, message })).then(() => {
          setLoading(false);
        });
      };
      const onFail = () => {
        setLoading(false);
      };

      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setLoadingItem(true);
    dispatch(getVendor({ id: data.id })).then((response) => {
      setDisplayData(response.payload.data);
      setLoadingItem(false);
    });
  };

  const closeModal = () => {
    setDisplayModal(false);
    setLoadingItem(true);
    setDisplayData(null);
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = async (data) => {
    if (formMode === 'edit') {
      const payload = {
        ...data,
        id: formData.id,
        company: {
          id: company,
        },
        department: {
          id: data.department,
        },
        area: {
          id: data.area,
        },
        group: {
          id: data.group,
        },
      };

      await dispatch(updateVendor(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          history.goBack();
          dispatch(listVendor({ company, message })).then(() => {
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };

        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (formMode === 'add') {
      const payload = {
        ...data,
        company: {
          id: company,
        },
        department: {
          id: data.department,
        },
        area: {
          id: data.area,
        },
        group: {
          id: data.group,
        },
      };
      await dispatch(addVendor(payload)).then((response) => {
        setLoading(true);
        const onSuccess = () => {
          history.goBack();
          dispatch(listVendor({ company, message })).then(() => {
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
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={handleCancelButton}
          formDetails={formDetails}
        />
      </Route>
      <Route path={`${path}/:id`}>
        <FormScreen
          title={formTitle}
          onSubmit={onSubmit}
          values={formData}
          onCancel={handleCancelButton}
          formDetails={formDetails}
        />
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
                loading={loading}
                onClick={(e) => {
                  handleAdd();
                }}
              >
                Add
              </Button>
            )}
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={list}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                updateEnabled={false}
                deleteEnabled={false}
              />
            )}
          </Col>
        </Row>
        <Modal
          title="Vendor Details"
          visible={displayModal}
          onOk={closeModal}
          onCancel={closeModal}
          width={1000}
        >
          {loadingItem ? (
            <Skeleton />
          ) : (
            <>
              <Descriptions bordered title={displayData.name} size="default">
                {formDetails.form_items.map((item) => {
                  if (item.type === 'select') {
                    const itemData = displayData[item.name];
                    if (itemData !== null) {
                      return (
                        <Descriptions.Item label={item.label}>
                          {itemData[item.selectName]}
                        </Descriptions.Item>
                      );
                    }

                    return <Descriptions.Item label={item.label} />;
                  }
                  if (item.type === 'list' || item.type === 'listSelect') {
                    return '';
                  }

                  return (
                    <Descriptions.Item label={item.label}>
                      {displayData[item.name]}
                    </Descriptions.Item>
                  );
                })}
              </Descriptions>
            </>
          )}
        </Modal>
      </Route>
    </Switch>
  );
};

export default Vendors;
