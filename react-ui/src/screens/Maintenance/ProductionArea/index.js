import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Typography, Col, Button, message, Skeleton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import GeneralStyles from '../../../data/styles/styles.general';
import SimpleForm from '../../../components/forms/FormModal';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import {
  listProductionArea,
  createProductionArea,
  updateProductionArea,
  deleteProductionArea,
  clearData,
} from './redux';

const { Title } = Typography;

const ProductionArea = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { productionAreaList, action, statusMessage } = useSelector(
    (state) => state.maintenance.productionArea
  );

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    dispatch(listProductionArea({ message })).then(() => {
      setLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
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

  const handleAddButton = () => {
    setModalTitle('Add New Production Area');
    setMode('add');
    setIsOpenForm(!isOpenForm);
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Production Area');
    setMode('edit');
    setFormValues(row);
    setIsOpenForm(!isOpenForm);
  };

  const handleDeleteButton = (row) => {
    setLoading(true);
    dispatch(deleteProductionArea(row))
      .then(() => {
        dispatch(listProductionArea({ message })).then(() => {
          setLoading(false);
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
    setLoading(true);
    if (mode === 'edit') {
      const newValues = values;
      newValues.id = currentID;

      dispatch(updateProductionArea(newValues)).then(() => {
        dispatch(listProductionArea({ message })).then(() => {
          setLoading(false)
        });
      });
    } else if (mode === 'add') {
      dispatch(createProductionArea(values)).then(() => {
        dispatch(listProductionArea({ message })).then(() => {
          setLoading(false);
        });
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
        { loading ? <Skeleton/> : 
          <TableDisplay
            columns={tableHeader}
            data={productionAreaList}
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

export default ProductionArea;
