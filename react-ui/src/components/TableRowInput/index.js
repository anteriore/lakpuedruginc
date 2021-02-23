import React, { useState, useContext, useRef, useEffect } from 'react';
import { Form, InputNumber } from 'antd';

const EditableContext = React.createContext(null);

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  limit,
  maxLimit,
  minLimit,
  precisionEnabled,
  precision,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      handleSave({ ...record, ...values });
      return values;
    } catch (errInfo) {
      return errInfo;
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {limit ? (
          <InputNumber
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            min={minLimit}
            max={maxLimit}
            precision={precisionEnabled ? precision : 0}
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        ) : (
          <InputNumber
            ref={inputRef}
            min={minLimit}
            onBlur={save}
            onPressEnter={save}
            precision={precisionEnabled ? precision : 0}
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        )}
      </Form.Item>
    ) : (
      <div
        aria-hidden="true"
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
