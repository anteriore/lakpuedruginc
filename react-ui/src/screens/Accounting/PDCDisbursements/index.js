import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import FormDetails, { columns } from './data/'

import TableDisplay from '../../../components/TableDisplay';
import FormScreen from '../../../components/forms/FormScreen';

import { listPDCDisbursement, addPDCDisbursement, deletePDCDisbursement } from './redux';
import { listVendor, clearData as clearVendor } from '../../Maintenance/Vendors/redux';

const { Title } = Typography;

const PDCDisbursements = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path } = useRouteMatch();
  const { company, title } = props;
  
  const [displayForm, setDisplayForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formMode, setFormMode] = useState('');
  const [formData, setFormData] = useState(null);
  const { formDetails } = FormDetails()
  
  const data = useSelector((state) => state.accounting.PDCDisbursements.list);

  useEffect(() => {
    dispatch(listPDCDisbursement({ company }));
  }, [dispatch, company]);

  const handleAdd = () => {
    setFormTitle('Create PDC Disbursement');
    setFormMode('add');
    setFormData(null);
    dispatch(listVendor({ company })).then(() => {
      history.push(`${path}/new`);
    });
  };

  const handleUpdate = (val) => {
  };

  const handleDelete = (val) => {
  };

  const handleRetrieve = () => {};

  const handleCancelButton = () => {
    setDisplayForm(false);
    setFormData(null);
  };

  const onSubmit = (data) => {
    
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
            <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              onClick={() => {
                handleAdd();
              }}
            >
              Add
            </Button>
            <TableDisplay
              columns={columns}
              data={data}
              handleRetrieve={handleRetrieve}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </Col>
        </Row>
      </Route>
    </Switch>
  );
};

export default PDCDisbursements;
