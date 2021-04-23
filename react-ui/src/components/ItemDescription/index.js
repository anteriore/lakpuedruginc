import React from 'react';
import { Descriptions } from 'antd';
import moment from 'moment';

const ItemDescription = (props) => {
  const { title, selectedData, formItems } = props;

  return (
    <Descriptions bordered title={title} size="default" layout="vertical">
      {formItems.map((item) => {
        if (!item.writeOnly) {
          if (selectedData[item.name] === null && item.toggle) {
            return null;
          }
          if (item.type === 'select' || item.type === 'selectSearch') {
            if (typeof item.render === 'undefined') {
              item.render = (object) => object?.[item?.selectName] ?? null;
            }
            return (
              <Descriptions.Item label={item.label}>
                {item.render(selectedData[item.name])}
              </Descriptions.Item>
            );
          }
          if (item.type === 'selectTable') {
            return (
              <Descriptions.Item label={item.label}>
                {item.toString(selectedData[item.name])}
              </Descriptions.Item>
            );
          }
          if (item.type === 'date') {
            return (
              <Descriptions.Item label={item.label}>
                {moment(new Date(selectedData[item.name])).format('DD/MM/YYYY')}
              </Descriptions.Item>
            );
          }
          if (item.type === 'list') {
            return null;
          }
          if (typeof item.render === 'function') {
            return (
              <Descriptions.Item label={item.label}>
                {item.render(selectedData[item.name])}
              </Descriptions.Item>
            );
          }
          if (item.type === 'listTable') {
            return null;
          }

          return (
            <Descriptions.Item label={item.label}>{selectedData[item.name]}</Descriptions.Item>
          );
        }

        return null;
      })}
    </Descriptions>
  );
};

export default ItemDescription;
