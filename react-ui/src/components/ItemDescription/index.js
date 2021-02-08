import React from 'react';
import {
  Descriptions,
} from 'antd';
import moment from 'moment';

const ItemDescription = (props) => {
  const { title, selectedData, formItems } = props

  return (
    <Descriptions
      bordered
      title={title}
      size="default"
      layout="vertical"
    >
      {formItems.map((item) => {
        if (!item.writeOnly) {
          if(selectedData[item.name] === null && item.toggle){
            return null
          }
          else if (item.type === 'select' || item.type === 'selectSearch') {
            const itemData = selectedData[item.name];
            return (
              <Descriptions.Item label={item.label}>
                {itemData[item.selectName]}
              </Descriptions.Item>
            );
          }
          else if(item.type === 'selectTable') {
            return (
              <Descriptions.Item label={item.label}>
                {item.toString(selectedData[item.name])}
              </Descriptions.Item>
            );
          }
          else if (item.type === 'date') {
            return (
              <Descriptions.Item label={item.label}>
                {moment(new Date(selectedData[item.name])).format('DD/MM/YYYY')}
              </Descriptions.Item>
            );
          }
          else if (item.type === 'list') {
            return null;
          }
          else {
            return (
              <Descriptions.Item label={item.label}>
                {selectedData[item.name]}
              </Descriptions.Item>
            );
          }
        }
        else {
          return null;
        }

      })}
    </Descriptions>
  );
};

export default ItemDescription;
