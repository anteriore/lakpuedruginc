import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import GeneralStyles from '../../../data/styles/styles.general';
import SimpleForm from '../../../components/forms/FormModal';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import { listProvinceCode, clearData as clearProvinceCode } from '../ProvinceCode/redux';
import { listRegionCode, clearData as clearRegionCode } from '../RegionCodes/redux';
import { listZipCode, createZipCode, updateZipCode, deleteZipCode, clearData } from './redux';
import { formatZipPayload } from './helper';

const { Title } = Typography;

const ZipCodes = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const { provinceCodeList } = useSelector((state) => state.maintenance.provinceCodes);
  const { regionCodeList } = useSelector((state) => state.maintenance.regionCodes);
  const { zipCodeList, action, statusMessage } = useSelector((state) => state.maintenance.zipCodes);
  const dispatch = useDispatch();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listZipCode({ message })).then(() => {
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearProvinceCode());
      dispatch(clearRegionCode());
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
      if (form.name === 'regionCode') {
        regionCodeList.forEach((regionCode) => {
          const { id, code, area } = regionCode;
          form.choices.push({ id, code, area });
        });
      }

      if (form.name === 'provinceCode') {
        provinceCodeList.forEach((provinceCode) => {
          const { id, code, area } = provinceCode;
          form.choices.push({ id, code, area });
        });
      }

      form.choices = _.uniqBy(form.choices, 'id');
    });
    setTempFormDetails(newForm);
  }, [regionCodeList, provinceCodeList, tempFormDetails]);

  const handleAddButton = () => {
    setModalTitle('Add New Zip Code');
    setMode('add');
    dispatch(listRegionCode({ message })).then(() => {
      dispatch(listProvinceCode({ message })).then(() => {
        setIsOpenForm(!isOpenForm);
      });
    });
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Zip Code');
    setMode('edit');
    dispatch(listRegionCode({ message })).then(() => {
      dispatch(listProvinceCode({ message }))
        .then(() => {
          setFormValues({
            ...row,
            provinceCode: row.provinceCode.id,
            regionCode: row.regionCode.id,
          });
        })
        .then(() => {
          setIsOpenForm(!isOpenForm);
        });
    });
  };

  const handleDeleteButton = (row) => {
    dispatch(deleteZipCode(row))
      .then(() => {
        dispatch(listZipCode({ message }));
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
    if (mode === 'edit') {
      const newValues = formatZipPayload(values, provinceCodeList, regionCodeList);
      newValues.id = currentID;
      dispatch(updateZipCode(newValues)).then(() => {
        dispatch(listZipCode({ message }));
      });
    } else if (mode === 'add') {
      dispatch(createZipCode(formatZipPayload(values, provinceCodeList, regionCodeList))).then(
        () => {
          dispatch(listZipCode({ message }));
        }
      );
    }
    setFormValues('');
    setIsOpenForm(!isOpenForm);
  };

  return (
    <Row gutter={[8, 24]}>
      <Col style={GeneralStyles.headerPage} span={20}>
        <Title>{title}</Title>
        {actions.includes('create') && (
          <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
            Add
          </Button>
        )}
      </Col>
      <Col span={20}>
        <TableDisplay
          columns={tableHeader}
          data={zipCodeList}
          handleUpdate={handleEditButton}
          handleDelete={handleDeleteButton}
          updateEnabled={actions.includes('update')}
          deleteEnabled={actions.includes('delete')}
        />
      </Col>
      <SimpleForm
        visible={isOpenForm}
        title={modalTitle}
        onSubmit={onSubmit}
        values={formValues}
        onCancel={handleCancelButton}
        formDetails={tempFormDetails}
      />
    </Row>
  );
};

export default ZipCodes;
