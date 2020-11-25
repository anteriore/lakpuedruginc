import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

import TableDisplay from '../../../components/TableDisplay';
import { columns } from './data/'
import { listClient, addClient, deleteClient } from './redux';
import { listCluster } from '../ClusterCodes/redux';
import { listInstitution } from '../InstitutionalCodes/redux';
import { listS } from '../SalesReps/redux';
import FormScreen from '../../../components/forms/FormScreen';

const { Title } = Typography;

const Clients = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);

  const { company } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const clients = useSelector((state) => state.maintenance.clients.list);
  const clusterCodes = useSelector((state) => state.maintenance.clusterCode.clusterList);
  const salesReps = useSelector((state) => state.maintenance.salesReps.list);
  const institionalCodes = useSelector((state) => state.maintenance.institutionalCodes.institutionList);

  const formDetails = {
    form_name: 'client',
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
        label: 'Business Address',
        name: 'businessAddress',
        rules: [{ required: true, message: 'Please provide a valid address' }],
        placeholder: 'Business Address',
      },
      {
        label: 'Delivery Address',
        name: 'deliveryAddress',
        rules: [{ required: true, message: 'Please provide a valid address' }],
        placeholder: 'Delivery Address',
      },
      {
        label: 'Line of Business',
        name: 'lineOfBusiness',
        rules: [{ required: true, message: 'Please provide a valid line of business' }],
        placeholder: 'Line of Business',
      },
      {
        label: 'Telephone Numbers',
        name: 'telephoneNumbers',
        rules: [{ required: true, message: 'Please provide valid Telephone Numbers' }],
        placeholder: 'Telephone Numbers',
      },
      {
        label: 'Years in Business',
        name: 'yearsInBusiness',
        type: 'number',
        rules: [{ required: true, message: 'Please provide a valid Years in Business' }],
        placeholder: 'Years in Business',
      },
      {
        label: 'Proprietor',
        name: 'proprietor',
        rules: [{ required: true, message: 'Please provide a valid proprietor' }],
        placeholder: 'Proprietor',
      },
      {
        label: 'TIN',
        name: 'tin',
        rules: [{ required: true, message: 'Please provide a valid TIN' }],
        placeholder: 'TIN',
      },
      {
        label: 'Terms',
        name: 'terms',
        type: 'number',
        rules: [{ required: true, message: 'Please provide valid Terms' }],
        placeholder: 'Terms',
      },
      {
        label: 'Max Credit Limit',
        name: 'maxCreditLimit',
        type: 'number',
        rules: [{ required: true, message: 'Please provide a valid Max Credit Limit' }],
        placeholder: 'Max Credit Limit',
      },
      {
        label: 'Sales Representative',
        name: 'salesRep',
        type: 'select',
        choices: salesReps,
        rules: [{ required: true }],
      },
      {
        label: 'Cluster',
        name: 'clusterCode',
        type: 'select',
        selectName: 'code',
        choices: clusterCodes,
        rules: [{ required: true }],
      },
      {
        label: 'Institutional Codes',
        name: 'institutionalCode',
        type: 'select',
        selectName: 'code',
        choices: institionalCodes,
        rules: [{ required: true }],
      },
      {
        label: 'Discount',
        name: 'discount',
        type: 'number',
        rules: [{ required: true, message: 'Please provide a valid Discount' }],
        placeholder: 'Discount',
      },
    ],
  };

  

  useEffect(() => {
    dispatch(listClient({ company })).then((response) => {
      setFormData(null);
      setLoading(false)
    });
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Add Client');
    setFormMode('add');
    setFormData(null);
    dispatch(listCluster({ company })).then(() => {
      dispatch(listInstitution({ company })).then(() => {
        dispatch(listS({ company })).then(() => {
      history.push(`${path}/new`);
        })
      })
    });
  };

  const handleUpdate = (data) => {
    setFormTitle('Edit Client');
    setFormMode('edit');
    var clientData = clients.find(client => client.id === data.id)
    const formData = {
      ...clientData,
      salesRep: clientData.salesRep !== null ? clientData.salesRep.id : null,
      clusterCode: clientData.clusterCode !== null ? clientData.clusterCode.id : null,
      institutionalCode: clientData.institutionalCode !== null ? clientData.institutionalCode.id : null,
    };
    console.log(formData)
    setFormData(formData);
    dispatch(listCluster({ company })).then(() => {
      dispatch(listInstitution({ company })).then(() => {
        dispatch(listS({ company })).then(() => {
        history.push(`${path}/${data.id}`);
        })
      })
    });
  };

  const handleDelete = (data) => {
    dispatch(deleteClient(data.id)).then((response) => {
      setLoading(true);
      if(response.payload.status === 200){
        dispatch(listClient({ company })).then(() => {
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

  const handleRetrieve = (data) => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
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
        salesRep: {
          id: data.salesRep,
        },
        clusterCode: {
          id: data.clusterCode,
        },
        institutionalCode: {
          id: data.institutionalCode,
        },
      };

      dispatch(addClient(payload)).then((response) => {
        setLoading(true);
        if(response.payload.status === 200){
          dispatch(listClient({ company })).then(() => {
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
        salesRep: {
          id: data.salesRep,
        },
        clusterCode: {
          id: data.clusterCode,
        },
        institutionalCode: {
          id: data.institutionalCode,
        },
      };
      console.log(payload)
      dispatch(addClient(payload)).then((response) => {
        setLoading(true);
        if(response.payload.status === 200){
          dispatch(listClient({ company })).then(() => {
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

    setDisplayForm(false);
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
                data={clients}
                handleRetrieve={handleRetrieve}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  );
};

export default Clients;
