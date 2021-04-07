import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Select, Skeleton, Popconfirm } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { 
  listGroupByCompany, 
  createGroup, 
  updateGroup, 
  deleteGroup, 
  listCategory, 
  createCategory, 
  updateCategory, 
  deleteCategory, 
  clearData 
} from './redux';
import SimpleForm from '../../../components/forms/FormModal';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';
import { formDetailC, formDetailG } from './data';

const { Title } = Typography;
const { Option } = Select;

const GroupsCategories = (props) => {
  const [loading, setLoading] = useState(true);
  const [displayFormG, setDisplayFormG] = useState(false);
  const [displayFormC, setDisplayFormC] = useState(false);

  const [selectedCategory, setselectedCategory] = useState(null);
  const [selectedGroup, setselectedGroup] = useState(null);

  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formDataG, setFormDataG] = useState(null);
  const [formDataC, setFormDataC] = useState(null);

  const { groupList: groupData, statusMessage, action, status, statusLevel } = useSelector((state) => state.maintenance.groupsCategories);

  const { handleRequestResponse } = GeneralHelper()

  const { company, title, actions } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listGroupByCompany({ company })).then(() => {
      dispatch(listCategory()).then(() => {
        setLoading(false);
        if (isCancelled) {
          dispatch(clearData());
        }
      })
    });
    return () => {
      setselectedCategory(null);
      setselectedGroup(null);
      dispatch(clearData());
      isCancelled = true;
    };
  }, [dispatch, company]);

  useEffect(() => {
    if (selectedGroup !== null) {
      const group = groupData.find((group) => group.id === selectedGroup.id);
      setselectedGroup(group);
    }
  }, [groupData, selectedGroup]);

  
  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  const handleAddG = () => {
    setFormTitle('Add Group');
    setFormMode('add');
    setFormDataG(null);
    setDisplayFormG(true);
    setDisplayFormC(false);
  };

  const handleUpdateG = (data) => {
    setFormTitle('Edit Group');
    setFormMode('edit');
    setDisplayFormG(true);
    setDisplayFormC(false);
    setFormDataG(data);
  };

  const handleDeleteG = (data) => {
    setLoading(true);
    dispatch(deleteGroup(data.id)).then((response) => {
      const onSuccess = () => {
        setselectedGroup(null);
        setselectedCategory(null);
        dispatch(listGroupByCompany({ company })).then(() => {
          dispatch(listCategory()).then(() => {
            setLoading(false);
          });
        });
      }
      const onFail = () => {
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleAddC = () => {
    setFormTitle('Add Category');
    setFormMode('add');
    setFormDataC(null);
    dispatch(listGroupByCompany({ company })).then(() => {
      setDisplayFormC(true);
    });
    setDisplayFormG(false);
  };

  const handleUpdateC = (data) => {
    setFormTitle('Edit Category');
    setFormMode('edit');
    setDisplayFormG(false);
    setDisplayFormC(true);
    setFormDataC(data);
  };

  const handleDeleteC = (data) => {
    setLoading(true);
    dispatch(deleteCategory(data.id)).then((response) => {
      const onSuccess = () => {
        dispatch(listGroupByCompany({ company })).then(() => {
          dispatch(listCategory()).then(() => {
            setLoading(false);
            setselectedCategory(null);
          });
        });
      }
      const onFail = () => {
        setLoading(false);
      }
      handleRequestResponse([response], onSuccess, onFail, '');
    });
  };

  const handleCancelButton = () => {
    setDisplayFormG(false);
    setDisplayFormC(false);
    setFormDataG(null);
    setFormDataC(null);
  };

  const onSubmitG = async (data) => {
    setLoading(true);
    if (formMode === 'edit') {
      const payload = {
        ...data,
        id: formDataG.id,
        company: {
          id: company,
        },
        categories: selectedGroup.categories,
      };

      await dispatch(updateGroup(payload)).then((response) => {
        const onSuccess = () => {
          setselectedGroup(null);
          dispatch(listGroupByCompany({ company, })).then(() => {
            setselectedCategory(null);
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (formMode === 'add') {
      const payload = {
        ...data,
        company: {
          id: company,
        },
      };

      await dispatch(createGroup(payload)).then((response) => {
        const onSuccess = () => {
          setselectedGroup(null);
          dispatch(listGroupByCompany({ company })).then(() => {
            setselectedCategory(null);
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }

    setDisplayFormG(false);
    setFormDataG(null);
    return 1
  };

  const onSubmitC = async (data) => {
    setLoading(true);
    if (formMode === 'edit') {
      const payload = {
        ...data,
        id: formDataC.id,
        company: {
          id: company,
        },
      };

      await dispatch(updateCategory(payload)).then((response) => {
        const onSuccess = () => {
          dispatch(listGroupByCompany({ company })).then((response) => {
            const group = response.payload.data.find((group) => group.id === selectedGroup.id);
            const category = group.categories.find(
              (category) => category.id === selectedCategory.id
            );
            setselectedGroup(group);
            setselectedCategory(category);
            setLoading(false);
          });
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (formMode === 'add') {
      const payload = {
        ...data,
        company: {
          id: company,
        },
      };
      await dispatch(createCategory(payload)).then((response) => {
        const onSuccess = () => {
          setselectedCategory(response.payload.data);
          const categories = selectedGroup.categories.map((i) => ({ ...i }));
          const temp_workaround = {
            ...selectedGroup,
            categories,
          };
          temp_workaround.categories.push(response.payload.data);
          dispatch(createGroup(temp_workaround)).then(() => {
            dispatch(listGroupByCompany({ company })).then((response) => {
              const group = response.payload.data.find((group) => group.id === selectedGroup.id);
              setselectedGroup(group);
              setLoading(false);
            });
          });
        }
        const onFail = () => {
          setLoading(false);
        }
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }

    setDisplayFormC(false);
    setFormDataC(null);
    return 1
  };

  function onSelectGroup(value) {
    const group = groupData.find((group) => group.id === value);
    setselectedGroup(group);
    setselectedCategory(null);
  }

  function onSelectCategory(value) {
    const category = selectedGroup.categories.find((category) => category.id === value);
    setselectedCategory(category);
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={3} style={{ float: 'left' }}>
            {title}
          </Title>
        </Col>
      </Row>

      {loading ? (
        <Skeleton />
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={10} style={{ display: 'flex', flexDirection: 'column' }}>
            {actions.includes('create') && (
              <Button
                style={{ marginLeft: 'auto', width: '30%', marginBottom: '2%' }}
                icon={<PlusOutlined />}
                onClick={() => {
                  handleAddG();
                }}
              >
                Add Group
              </Button>
            )}
            <Select
              placeholder="Select a group"
              onChange={onSelectGroup}
              value={selectedGroup !== null ? selectedGroup.id : null}
            >
              {groupData.map((group) => (
                <Option value={group.id}>{group.name}</Option>
              ))}
            </Select>

            {selectedGroup !== null && (
              <div style={{ display: 'flex', flexFlow: 'row-reverse', marginTop: '2%' }}>
                {actions.includes('delete') && (
                  <Popconfirm
                    title="Would you like to delete this item?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => {
                      handleDeleteG(selectedGroup);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button style={{ width: '30%', marginLeft: '2%' }} icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>
                )}

                {actions.includes('update') && (
                  <Button
                    style={{ width: '30%' }}
                    icon={<EditOutlined />}
                    onClick={() => {
                      handleUpdateG(selectedGroup);
                    }}
                  >
                    Rename
                  </Button>
                )}
              </div>
            )}
          </Col>
          <Col span={10} style={{ display: 'flex', flexDirection: 'column' }}>
            {selectedGroup !== null && (
              <>
                {actions.includes('create') !== -1 && (
                  <Button
                    style={{ marginLeft: 'auto', width: '30%', marginBottom: '2%' }}
                    icon={<PlusOutlined />}
                    onClick={() => {
                      // message.error(`Add category is not yet implemented`);
                      handleAddC();
                    }}
                  >
                    Add Category
                  </Button>
                )}
                <Select
                  placeholder="Select a category"
                  onChange={onSelectCategory}
                  value={selectedCategory !== null ? selectedCategory.id : null}
                >
                  {selectedGroup.categories !== null &&
                    selectedGroup.categories.map((category) => (
                      <Option value={category.id}>{category.name}</Option>
                    ))}
                </Select>
              </>
            )}

            {selectedCategory !== null && (
              <div style={{ display: 'flex', flexFlow: 'row-reverse', marginTop: '2%' }}>
                {actions.includes('delete') && (
                  <Popconfirm
                    title="Would you like to delete this item?"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => {
                      handleDeleteC(selectedCategory);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button style={{ width: '30%', marginLeft: '2%' }} icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>
                )}
                {actions.includes('update') && (
                  <Button
                    style={{ width: '30%' }}
                    icon={<EditOutlined />}
                    onClick={() => {
                      handleUpdateC(selectedCategory);
                    }}
                  >
                    Rename
                  </Button>
                )}
              </div>
            )}
          </Col>
          <SimpleForm
            visible={displayFormG}
            title={formTitle}
            onSubmit={onSubmitG}
            values={formDataG}
            onCancel={handleCancelButton}
            formDetails={formDetailG}
          />
          <SimpleForm
            visible={displayFormC}
            title={formTitle}
            onSubmit={onSubmitC}
            values={formDataC}
            onCancel={handleCancelButton}
            formDetails={formDetailC}
          />
        </Row>
      )}
    </>
  );
};

export default GroupsCategories;
