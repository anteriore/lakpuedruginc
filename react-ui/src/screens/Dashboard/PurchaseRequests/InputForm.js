/* eslint-disable no-redeclare */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  message,
  Modal,
  Table,
  Empty,
  Skeleton,
  Checkbox,
  Select,
} from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { getPR, listPR, addPR, resetItemData } from './redux';
import { listD } from '../../Maintenance/DepartmentArea/redux';
import { listI } from '../../Maintenance/Items/redux';

const { Title } = Typography;
const dateFormat = 'YYYY/MM/DD';

const InputForm = (props) => {
  const [displayModal, setDisplayModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingItems, setLoadingItems] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    number: null,
    date: null,
    dateNeeded: null,
    department: null,
    remarks: null,
    requestedBy: null,
    status: null,
    requestedItems: [],
  });

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (object) => object.name,
    },
    {
      title: 'Unit of Measurement',
      dataIndex: 'unit',
      key: 'unit',
      render: (object) => object.name,
    },
    /*
        {
            title: 'Current Stocks',
            dataIndex: 'stocks',
            key: 'stocks',   
        },
        {
            title: 'Pending PR',
            dataIndex: 'purchase_request',
            key: 'purchase_request',   
        },
        {
            title: 'Pending PO',
            dataIndex: 'purchase_order',
            key: 'purchase_order',   
        },
        {
            title: 'Quarantined',
            dataIndex: 'quarantined',
            key: 'quarantined',   
        }
        */
  ];

  const data = useSelector((state) => state.dashboard.purchaseRequests.itemData);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const itemsList = useSelector((state) => state.maintenance.items.list);

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(listD({ company: props.company })).then((response) => {
      if (typeof id !== 'undefined' && id != null) {
        dispatch(getPR({ id })).then((response) => {
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return function cleanup() {
      dispatch(resetItemData());
    };
  }, [dispatch, id, props.company]);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const onItemSelect = (data, isSelected) => {
    if (isSelected) {
      var selectedItems = formData.requestedItems.slice();
      selectedItems.push(data);
      setFormData({
        ...formData,
        requestedItems: selectedItems,
      });
    } else {
      var selectedItems = formData.requestedItems.slice();
      selectedItems.pop(data);
      setFormData({
        ...formData,
        requestedItems: selectedItems,
      });
    }
    //
  };

  const onFinish = (values) => {
    // save data to database
    const requestedItems = formData.requestedItems.slice();

    for (const [index, value] of requestedItems.entries()) {
      requestedItems[index] = {
        item: requestedItems[index],
        quantityRequested: values.requestedItems.undefined[value.id],
        unit: value.unit,
      };
    }

    const data = {
      ...values,
      id: formData.id,
      number: null,
      department: {
        id: values.department,
      },
      date: `${values.date.format('YYYY-MM-DD')}T${values.date.format('HH:mm:ss')}`,
      dateNeeded: `${values.dateNeeded.format('YYYY-MM-DD')}T${values.dateNeeded.format(
        'HH:mm:ss'
      )}`,
      requestedBy: {
        id: 1,
      },
      company: {
        id: props.company,
      },
      requestedItems,
    };

    dispatch(addPR(data)).then((response) => {
      if (response.payload.status === 200) {
        message.success('Successfully saved');
        dispatch(listPR({ company: props.company }));
        history.goBack();
      } else {
        message.error('Something went wrong. Unable to add item.');
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // message.error(errorInfo)
  };

  const renderColumns = (field) => {
    let filteredColumn = columns.slice();
    const inputColumn = [
      {
        title: 'Quantity Requested',
        key: 'quantityRequested',
        render: (row) => {
          return (
            <Form.Item
              {...field}
              name={[field.name, row.id]}
              fieldKey={[field.fieldKey, row.id]}
              rules={[{ required: true }]}
              initialValue={row.quantityRequested}
            >
              <InputNumber min={1} />
            </Form.Item>
          );
        },
      },
    ];

    filteredColumn = filteredColumn.concat(inputColumn);

    return filteredColumn;
  };

  const renderItemColumns = () => {
    let filteredColumn = [
      {
        key: 'select',
        render: (row) => {
          return (
            <Checkbox
              onChange={(e) => {
                onItemSelect(row, e.target.checked);
              }}
              checked={!!formData.requestedItems.some((item) => item.id === row.id)}
            />
          );
        },
      },
    ];

    const inputColumn = columns.slice();

    filteredColumn = filteredColumn.concat(inputColumn);

    return filteredColumn;
  };

  const selectItems = () => {
    setDisplayModal(true);
    setLoadingItems(true);
    dispatch(listI()).then((response) => {
      setLoadingItems(false);
    });
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <>
      <Row>
        <Title level={3}>{props.title}</Title>
      </Row>
      <Row>
        <Col span={20}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <Form
              {...styles.layout}
              name="form"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                number: formData.number || 'AUTOGENERATED UPON CREATION.',
                date: moment(new Date(formData.date)) || moment(),
                dateNeeded: moment(new Date(formData.dateNeeded)) || moment(),
                department: formData.department !== null && formData.department.id,
                remarks: formData.remarks,
              }}
            >
              <Form.Item label="PRF Number" name="number">
                <Input disabled />
              </Form.Item>

              <Form.Item label="PRF Date" name="date" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} style={styles.datePicker} />
              </Form.Item>

              <Form.Item label="Date Needed" name="dateNeeded" rules={[{ required: true }]}>
                <DatePicker format={dateFormat} style={styles.datePicker} />
              </Form.Item>

              <Form.Item label="Department" name="department" rules={[{ required: true }]}>
                <Select>
                  {departments.map((department) => (
                    <Select.Option value={department.id}>{department.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.List label="Requested Items" name="requestedItems" rules={[{ required: true }]}>
                {(fields, { errors }) => (
                  <Col span={20} offset={1}>
                    <Table
                      dataSource={formData.requestedItems}
                      columns={renderColumns(fields)}
                      pagination={false}
                      locale={{ emptyText: <Empty description="No Item Seleted." /> }}
                    />
                    <Form.ErrorList errors={errors} />
                  </Col>
                )}
              </Form.List>
              <Form.Item style={styles.tailLayout}>
                <Button
                  onClick={() => {
                    selectItems();
                  }}
                  style={{ width: '40%', float: 'right' }}
                >
                  Select/Remove item(s)
                </Button>
              </Form.Item>

              <Form.Item label="Remarks" name="remarks">
                <Input.TextArea />
              </Form.Item>
              <div style={styles.tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  style={{ marginRight: '3%' }}
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Col>
      </Row>

      <Modal
        title="Select Items"
        visible={displayModal}
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={closeModal}
        onCancel={closeModal}
        width={1000}
      >
        {isLoadingItems ? (
          <Skeleton />
        ) : (
          <Table
            dataSource={itemsList !== null ? itemsList : []}
            columns={renderItemColumns()}
            pagination={false}
          />
        )}
      </Modal>
    </>
  );
};

export default InputForm;

const styles = {
  layout: {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 15,
    },
  },
  tailLayout: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '87.5%',
  },
  datePicker: {
    float: 'left',
  },
};
