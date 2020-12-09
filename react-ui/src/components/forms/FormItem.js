import React from 'react';
import {Form, Select, Input, InputNumber, DatePicker} from 'antd';

const {Item} = Form;
const {TextArea} = Input;

const FormItem = ({item}) => {
  if (item.type === 'select' || item.type === 'selectSearch') {
    if (typeof item.selectName === 'undefined') {
      item.selectName = 'name'
    }
    return (
      <Item label={item.label} name={item.name} rules={item.rules}>
        <Select optionFilterProp="children" showSearch={item.type === 'selectSearch' ? true : false} style={{textAlign: 'left'}} placeholder={item.placeholder}>
          {item.choices.map((choice) => (
            <Select.Option key={choice.id} value={choice.id}>{choice[item.selectName]}</Select.Option>
          ))}
        </Select>
      </Item>
    );
  }

  if (item.type === 'number') {
    return (
      <Item label={item.label} name={item.name} wrapperCol={{
        span: 2,
        offset: 2
      }}>
        <InputNumber style={{width: '10rem'}} min={1} max={50} placeholder={item.placeholder} />
      </Item>
    );
  }
  
  if (item.type === 'date') {
    return (
      <Item label={item.label} name={item.name} rules={item.rules} wrapperCol={{ span: 4, offset: 2 }}>
        <DatePicker style={{ float: 'left', width: '25rem' }} />
      </Item>
    );
  }

  if(item.type === 'textarea'){
    return(
      <Item label={item.label} name={item.name} rules={item.rules}>
        <TextArea rows={3} maxLength={200} placeholder={item.placeholder} />
      </Item>
    )
  }
  
  return (
    <Item label={item.label} name={item.name} rules={item.rules}>
      <Input disabled={item.type === 'readOnly' ? true : false} placeholder={item.placeholder} />
    </Item>
  );
}


export default FormItem;