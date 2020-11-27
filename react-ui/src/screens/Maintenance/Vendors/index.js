import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton, Descriptions, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import { columns } from './data'
import { listVendor, addVendor, getVendor, deleteVendor } from './redux';
import { listD, listA } from '../DepartmentArea/redux';
import { listG } from '../GroupsCategories/redux';
import FormScreen from '../../../components/forms/FormScreen';

const { Title } = Typography;

const Vendors = (props) => {
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const [loadingItem, setLoadingItem] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayData, setDisplayData] = useState(null);

  const { company } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const vendors = useSelector((state) => state.maintenance.vendors.list);
  const areas = useSelector((state) => state.maintenance.departmentArea.areaList);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const groups = useSelector((state) => state.maintenance.groupsCategories.groupList);

  const formDetails = {
    form_name: 'vendor',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid name' }],
        placeholder: 'Name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid code' }],
        placeholder: 'Code',
      },
      {
        label: 'Full Name',
        name: 'fullName',
        rules: [{ required: true, message: 'Please provide a valid full name' }],
        placeholder: 'Full Name',
      },
      {
        label: 'Address',
        name: 'address',
        rules: [{ required: true, message: 'Please provide a valid address' }],
        placeholder: 'Address',
      },
      {
        label: 'Contact Person',
        name: 'contactPerson',
        rules: [{ required: true, message: 'Please provide a valid contact person' }],
        placeholder: 'Contact Person',
      },
      {
        label: 'Phone Number',
        name: 'phoneNumber',
        rules: [{ required: true, message: 'Please provide a valid phone number' }],
        placeholder: 'Phone Number',
      },
      {
        label: 'Terms',
        name: 'terms',
        type: 'number',
        rules: [{ required: true, message: 'Please provide valid Terms' }],
        placeholder: 'Terms',
      },
      {
        label: 'TIN',
        name: 'tin',
        rules: [{ required: true, message: 'Please provide a valid TIN' }],
        placeholder: 'TIN',
      },
      {
        label: 'VAT',
        name: 'vat',
        rules: [{ required: true, message: 'Please provide a valid VAT' }],
        placeholder: 'VAT',
      },
      {
        label: 'Area',
        name: 'area',
        type: 'select',
        selectName: 'name',
        choices: areas,
        rules: [{ required: true }],
      },
      {
        label: 'Department',
        name: 'department',
        type: 'select',
        selectName: 'name',
        choices: departments,
        rules: [{ required: true }],
      },
      {
        label: 'Group',
        name: 'group',
        type: 'select',
        selectName: 'name',
        choices: groups,
        rules: [{ required: true }],
      },
    ],
  };

  

  useEffect(() => {
    dispatch(listVendor({ company })).then((response) => {
      setFormData(null);
      setLoading(false)
    });
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Add Vendor');
    setFormMode('add');
    setFormData(null);
    dispatch(listA({ company })).then(() => {
      dispatch(listD({ company })).then(() => {
        dispatch(listG({ company })).then(() => {
          history.push(`${path}/new`);
        })
      })
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Vendor');
    setFormMode('edit');
    var vendorData = vendors.find(vendor => vendor.id === data.id)
    const formData = {
      ...vendorData,
      department: vendorData.department !== null ? vendorData.department.id : null,
      area: vendorData.area !== null ? vendorData.area.id : null,
      group: vendorData.group !== null ? vendorData.group.id : null,
    };
    console.log(formData)
    setFormData(formData);
    dispatch(listA({ company })).then(() => {
      dispatch(listD({ company })).then(() => {
        dispatch(listG({ company })).then(() => {
        history.push(`${path}/${data.id}`);
        })
      })
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteVendor(data.id)).then((response) => {
      setLoading(true);
      if(response.payload.status === 200){
        dispatch(listVendor({ company })).then(() => {
          setLoading(false);
          message.success(`Successfully deleted ${data.name}`);
        })
      }
      else {
        setLoading(false);
        message.error(`Unable to delete ${data.name}`);
      }
    });
  };

  const handleRetrieve = (data) => {
    setDisplayModal(true);
    setLoadingItem(true);
    dispatch(getVendor({ id: data.id })).then((response) => {
      setDisplayData(response.payload.data)
      setLoadingItem(false);
    })
  };
  
  const closeModal = () => {
    setDisplayModal(false);
    setLoadingItem(true);
    setDisplayData(null);
  };

  const handleCancelButton = () => {
    setFormData(null);
  };

  const onSubmit = (data) => {
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

      dispatch(addVendor(payload)).then((response) => {
        setLoading(true);
        if(response.payload.status === 200){
          dispatch(listVendor({ company })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully updated ${data.name}`);
          })
        }
        else {
          setLoading(false);
          message.error(`Unable to update ${data.name}`);
        }
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
      dispatch(addVendor(payload)).then((response) => {
        setLoading(true);
        if(response.payload.status === 200){
          dispatch(listVendor({ company })).then(() => {
            setLoading(false);
            history.goBack();
            message.success(`Successfully added ${data.name}`);
          })
        }
        else {
          setLoading(false);
          message.error(`Unable to add ${data.name}`);
        }
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
            {props.title}
          </Title>
        </Col>
      </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              onClick={(e) => {
                handleAdd();
              }}
            >
              Add
            </Button>
            {loading ? (
              <Skeleton />
            ) : (
              <TableDisplay
                columns={columns}
                data={vendors}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
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
            <Descriptions
              bordered
              title={displayData.name}
              size="default"
            >
              {formDetails.form_items.map((item) => {
                if(item.type === 'select'){
                  const itemData = displayData[item.name]
                  if(itemData !== null){
                    return <Descriptions.Item label={item.label}>{itemData[item.selectName]}</Descriptions.Item>
                  }
                  else {
                    return <Descriptions.Item label={item.label}></Descriptions.Item>
                  }
                }
                else if(item.type === 'list' || item.type === 'listSelect'){
                  return ''
                }
                else {
                  return <Descriptions.Item label={item.label}>{displayData[item.name]}</Descriptions.Item>
                }
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
