import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Select, Skeleton, Popconfirm, message } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { listG, addG, deleteG, listC, addC, deleteC, clearData } from './redux';
import SimpleForm from '../../../components/forms/FormModal';

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
  const groupData = useSelector((state) => state.maintenance.groupsCategories.groupList);

  const formDetailG = {
    form_name: 'groups',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid group name' }],
        placeholder: 'Group name',
      },
    ],
  };

  const formDetailC = {
    form_name: 'categories',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid category name' }],
        placeholder: 'Category name',
      },
    ],
  };

  const { company, title } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    var isCancelled = false
    dispatch(listG({ company, message })).then((response) => {
      setLoading(false);
      if(isCancelled) {
        dispatch(clearData());
      }
    });
    dispatch(listC({ company, message }));
    return () => {
      setselectedCategory(null);
      setselectedGroup(null);
      dispatch(clearData());
      isCancelled = true
    };
  }, [dispatch, company]);

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
    dispatch(deleteG(data.id)).then((response) => {
      if (response.payload.status === 200) {
        message.success(`Successfully deleted Group ${data.name}`);
        dispatch(listG({ company, message })).then(() => {
          setLoading(false);
          setselectedGroup(null);
        });
      } else {
        message.error(`Unable to delete Group ${data.name}`);
        setLoading(false);
      }
    });
  };

  const handleAddC = () => {
    setFormTitle('Add Category');
    setFormMode('add');
    setFormDataC(null);
    dispatch(listG({ company, message })).then((response) => {
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
    dispatch(deleteC(data.id)).then((response) => {
      if (response.payload.status === 200) {
        message.success(`Successfully deleted Category ${data.name}`);
        dispatch(listG({ company, message })).then(() => {
          setLoading(false);
          setselectedCategory(null);
        });
      } else {
        message.error(`Unable to delete Category ${data.name}`);
        setLoading(false);
      }
    });
  };

  const handleCancelButton = () => {
    setDisplayFormG(false);
    setDisplayFormC(false);
    setFormDataG(null);
    setFormDataC(null);
  };

  const onSubmitG = (data) => {
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

      dispatch(addG(payload)).then((response) => {
        if (response.payload.status === 200) {
          message.success(`Successfully updated ${data.name}`);
          setselectedGroup(response.payload.data);
          dispatch(listG({ company, message })).then(() => {
            setLoading(false);
            setselectedCategory(null);
          });
        } else {
          message.error(`Unable to update ${data.name}`);
          setLoading(false);
        }
      });
    } else if (formMode === 'add') {
      const payload = {
        ...data,
        company: {
          id: company,
        },
      };

      dispatch(addG(payload)).then((response) => {
        if (response.payload.status === 200) {
          message.success(`Successfully added ${data.name}`);
          setselectedGroup(response.payload.data);
          dispatch(listG({ company, message })).then(() => {
            setLoading(false);
            setselectedCategory(null);
          });
        } else {
          message.error(`Unable to add ${data.name}`);
          setLoading(false);
        }
      });
    }

    setDisplayFormG(false);
    setFormDataG(null);
  };

  const onSubmitC = (data) => {
    setLoading(true);
    if (formMode === 'edit') {
      const payload = {
        ...data,
        id: formDataC.id,
        company: {
          id: company,
        },
      };

      dispatch(addC(payload)).then((response) => {
        if (response.payload.status === 200) {
          message.success(`Successfully updated ${data.name}`);
          dispatch(listG({ company, message })).then((response) => {
            const group = response.payload.data.find((group) => group.id === selectedGroup.id);
            const category = group.categories.find(
              (category) => category.id === selectedCategory.id
            );
            setselectedGroup(group);
            setselectedCategory(category);
            setLoading(false);
          });
        } else {
          message.error(`Unable to update ${data.name}`);
          setLoading(false);
        }
      });
    } else if (formMode === 'add') {
      const payload = {
        ...data,
        company: {
          id: company,
        },
      };
      dispatch(addC(payload)).then((response) => {
        if (response.payload.status === 200) {
          message.success(`Successfully added ${data.name}`);
          setselectedCategory(response.payload.data);
          const categories = selectedGroup.categories.map((i) => ({ ...i }));
          const temp_workaround = {
            ...selectedGroup,
            categories,
          };
          temp_workaround.categories.push(response.payload.data);
          dispatch(addG(temp_workaround)).then(() => {
            dispatch(listG({ company, message })).then((response) => {
              const group = response.payload.data.find((group) => group.id === selectedGroup.id);
              setselectedGroup(group);
              setLoading(false);
            });
          });
        } else {
          message.error(`Unable to add ${data.name}`);
          setLoading(false);
        }
      });
    }

    setDisplayFormC(false);
    setFormDataC(null);
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
            <Button
              style={{ marginLeft: 'auto', width: '30%', marginBottom: '2%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                handleAddG();
              }}
            >
              Add Group
            </Button>
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

                <Button
                  style={{ width: '30%' }}
                  icon={<EditOutlined />}
                  onClick={() => {
                    handleUpdateG(selectedGroup);
                  }}
                >
                  Rename
                </Button>
              </div>
            )}
          </Col>
          <Col span={10} style={{ display: 'flex', flexDirection: 'column' }}>
            {selectedGroup !== null && (
              <>
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
                <Button
                  style={{ width: '30%', marginLeft: '2%' }}
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    handleDeleteC(selectedCategory);
                  }}
                >
                  Delete
                </Button>
                <Button
                  style={{ width: '30%' }}
                  icon={<EditOutlined />}
                  onClick={() => {
                    handleUpdateC(selectedCategory);
                  }}
                >
                  Rename
                </Button>
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
