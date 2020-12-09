import React, {useState, useContext}  from 'react';
import {
  Form,
  InputNumber
} from 'antd';

const EditableContext = React.createContext();

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
  const form = useContext(EditableContext);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      handleSave(values, record)
    } catch (errInfo) {}
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
            inputRef  
            onChange={save}
            min={minLimit} 
            max={maxLimit} 
            precision={precisionEnabled ? precision : 0}
            formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        ) : (
          <InputNumber 
            inputRef  
            min={minLimit} 
            onChange={save}
            precision={precisionEnabled ? precision : 0}
            formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        ) }
        
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};