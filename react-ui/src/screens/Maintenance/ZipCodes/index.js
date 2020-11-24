import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import GeneralStyles from '../../../datas/styles/styles.general';
import SimpleForm from '../../../components/forms/FormModal';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader, formDetails } from './data';
import { listProvinceCode } from '../ProvinceCode/redux';
import { listRegionCode } from '../RegionCodes/redux';
import { listZipCode, createZipCode, updateZipCode, deleteZipCode } from './redux';
import { formatZipPayload } from './helper';

const { Title } = Typography;

const ZipCodes = (props) => {
  const { title } = props;
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
    dispatch(listZipCode());
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
          const { id, code } = regionCode;
          form.choices.push({ id, name: code });
        });
      }

      if (form.name === 'provinceCode') {
        provinceCodeList.forEach((provinceCode) => {
          const { id, code } = provinceCode;
          form.choices.push({ id, name: code });
        });
      }

      form.choices = _.uniqBy(form.choices, 'id');
    });
    setTempFormDetails(newForm);
  }, [regionCodeList, provinceCodeList, tempFormDetails]);

  const handleAddButton = () => {
    setModalTitle('Add New Zip Code');
    setMode('add');
    dispatch(listRegionCode()).then(() => {
      dispatch(listProvinceCode()).then(() => {
        setIsOpenForm(!isOpenForm);
      });
    });
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Zip Code');
    setMode('edit');
    dispatch(listRegionCode()).then(() => {
      dispatch(listProvinceCode())
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
        dispatch(listZipCode());
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
        dispatch(listZipCode());
      });
    } else if (mode === 'add') {
      dispatch(createZipCode(formatZipPayload(values, provinceCodeList, regionCodeList))).then(
        () => {
          dispatch(listZipCode());
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
        <Button icon={<PlusOutlined />} onClick={() => handleAddButton()}>
          Add
        </Button>
      </Col>
      <Col span={20}>
        <TableDisplay
          columns={tableHeader}
          data={zipCodeList}
          handleUpdate={handleEditButton}
          handleDelete={handleDeleteButton}
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
