import React, { useState, useEffect } from 'react';
import { Row, Typography, Col, Button, message, Skeleton } from 'antd';
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
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const ZipCodes = (props) => {
  const { title, actions } = props;
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [mode, setMode] = useState('');
  const [tempFormDetails, setTempFormDetails] = useState(_.clone(formDetails));
  const [formValues, setFormValues] = useState('');
  const [currentID, setCurrentID] = useState('');
  const [loading, setLoading] = useState(true);
  const { provinceCodeList } = useSelector((state) => state.maintenance.provinceCodes);
  const { regionCodeList } = useSelector((state) => state.maintenance.regionCodes);
  const { zipCodeList, statusMessage, action, status, statusLevel } = useSelector(
    (state) => state.maintenance.zipCodes
  );
  const dispatch = useDispatch();
  const { handleRequestResponse } = GeneralHelper();

  useEffect(() => {
    let isCancelled = false;
    dispatch(listZipCode({ message })).then(() => {
      setLoading(false);
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
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

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
    dispatch(listRegionCode({ message })).then((response1) => {
      dispatch(listProvinceCode({ message })).then((response2) => {
        const onSuccess = () => {
          setIsOpenForm(!isOpenForm);
        };
        const onFail = () => {
          handleCancelButton();
        };
        handleRequestResponse([response1, response2], onSuccess, onFail, '');
      });
    });
  };

  const handleEditButton = (row) => {
    setCurrentID(row.id);
    setModalTitle('Edit Zip Code');
    setMode('edit');
    setFormValues({
      ...row,
      provinceCode: row.provinceCode.id,
      regionCode: row.regionCode.id,
    });
    dispatch(listRegionCode({ message })).then((response1) => {
      dispatch(listProvinceCode({ message })).then((response2) => {
        const onSuccess = () => {
          setIsOpenForm(!isOpenForm);
        };
        const onFail = () => {
          handleCancelButton();
        };
        handleRequestResponse([response1, response2], onSuccess, onFail, '');
      });
    });
  };

  const handleDeleteButton = (row) => {
    setLoading(true);
    dispatch(deleteZipCode(row)).then(() => {
      dispatch(listZipCode({ message })).then(() => {
        setLoading(false);
      });
    });
  };

  const handleCancelButton = () => {
    setIsOpenForm(!isOpenForm);
    setFormValues('');
  };

  const onSubmit = async (values) => {
    setLoading(true);
    if (mode === 'edit') {
      const newValues = formatZipPayload(values, provinceCodeList, regionCodeList);
      newValues.id = currentID;
      await dispatch(updateZipCode(newValues)).then((response) => {
        const onSuccess = () => {
          dispatch(listZipCode({ message })).then(() => {
            setFormValues('');
            setIsOpenForm(!isOpenForm);
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    } else if (mode === 'add') {
      await dispatch(
        createZipCode(formatZipPayload(values, provinceCodeList, regionCodeList))
      ).then((response) => {
        const onSuccess = () => {
          dispatch(listZipCode({ message })).then(() => {
            setFormValues('');
            setIsOpenForm(!isOpenForm);
            setLoading(false);
          });
        };
        const onFail = () => {
          setLoading(false);
        };
        handleRequestResponse([response], onSuccess, onFail, '');
      });
    }
    return 1;
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
        {loading ? (
          <Skeleton />
        ) : (
          <TableDisplay
            columns={tableHeader}
            data={zipCodeList}
            handleUpdate={handleEditButton}
            handleDelete={handleDeleteButton}
            updateEnabled={false}
            deleteEnabled={false}
          />
        )}
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
