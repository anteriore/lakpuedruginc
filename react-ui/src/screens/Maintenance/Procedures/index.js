import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Typography, Col, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import GeneralStyles from '../../../data/styles/styles.general';
import SimpleForm from '../../../components/forms/FormModal';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import { listProductionArea, clearData as clearProductionArea } from '../ProductionArea/redux';
import {
  listProcedure,
  createProcedure,
  updateProcedure,
  deleteProcedure,
  clearData,
} from './redux';
import { formatProcedurePayload } from './helper';

const { Title } = Typography;

const Procedures = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { list: productionAreaList } = useSelector((state) => state.maintenance.productionArea);
  const { procedureList, action, statusMessage } = useSelector(
    (state) => state.maintenance.procedures
  );

  useEffect(() => {
    let isCancelled = false;
    dispatch(listProcedure({ message })).then(() => {
      setLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearProductionArea());
      isCancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (action !== 'get' && action !== '') {
      if (action === 'pending') {
        message.info(statusMessage);
      } else if (action === 'error') {
        message.error(statusMessage);
      } else {
        message.success(statusMessage);
      }
    }
  }, [statusMessage, action]);

  useEffect(() => {
    const newForm = tempFormDetails;
    newForm.form_items.forEach((form) => {
      if (form.name === 'procedureArea') {
        productionAreaList.forEach((productionArea) => {
          const { id, code } = productionArea;
          form.choices.push({ id, name: code });
        });
      }

      form.choices = _.uniqBy(form.choices, 'id');
    });
    setTempFormDetails(newForm);
  }, [productionAreaList, tempFormDetails]);

  const handleAddButton = () => {
    setModalTitle('Add New Procedure');
    setMode('add');
    dispatch(listProductionArea({ message })).then(() => {
      setIsOpenForm(!isOpenForm);
    });
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Procedure');
    setMode('edit');
    dispatch(listProductionArea({ message })).then(() => {
      setFormValues({
        ...row,
        procedureArea: row.procedureArea.id,
      });
      setIsOpenForm(!isOpenForm);
    });
  };

  const handleDeleteButton = (row) => {
    setLoading(true)
    dispatch(deleteProcedure(row))
      .then(() => {
        dispatch(listProcedure({ message })).then(() => {
          setLoading(false)
        });
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  };

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('');
  };

  const onSubmit = (values) => {
    setLoading(true)
    if (mode === 'edit') {
      const newValues = formatProcedurePayload(values, productionAreaList);
      newValues.id = currentID;
      dispatch(updateProcedure(newValues)).then(() => {
        dispatch(listProcedure({ message })).then(() => {
          setLoading(false)
        });
      });
    } else if (mode === 'add') {
      dispatch(createProcedure(formatProcedurePayload(values, productionAreaList))).then(() => {
        dispatch(listProcedure({ message })).then(() => {
          setLoading(false)
        });;
      });
    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  };

  return (
    <Row gutter={[8, 24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title>{title}</Title>
        {actions.includes('create') && (
          <Button loading={loading} icon={<PlusOutlined />} onClick={() => handleAddButton()}>
            Add
          </Button>
        )}
      </Col>
      <Col span={20}>
        {loading ? <Skeleton/> : 
          <TableDisplay
            columns={tableHeader}
            data={procedureList}
            handleUpdate={handleEditButton}
            handleDelete={handleDeleteButton}
            updateEnabled={actions.includes('update')}
            deleteEnabled={actions.includes('delete')}
          />
        }
      </Col>
      <SimpleForm
        visible={isOpenForm}
        title={modalTitle}
        onSubmit={onSubmit}
        values={formValues}
        onCancel={handleCancelButton}
        formDetails={formDetails}
      />
    </Row>
  );
};

export default Procedures;
