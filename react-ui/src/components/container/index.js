import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Drawer, Descriptions, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Header from '../Header';
import SideNav from '../SideNav';

const Container = (props) => {
  const { location, children } = props;
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const [displayDrawer, setDisplayDrawer] = useState(false);

  return (
    <div>
      <Header setDisplayDrawer={setDisplayDrawer} />
      <Row>
        <Col span={4}>
          <SideNav location={location} />
        </Col>

        <Col span={20} style={{ padding: '1%' }}>
          {children}
          <Drawer
            width="50%"
            placement="right"
            closable={false}
            onClose={() => {
              setDisplayDrawer(false);
            }}
            visible={displayDrawer}
          >
            <>
              <Descriptions
                bordered
                title={`${user.firstName} ${user.lastName}`}
                size="default"
                layout="vertical"
                extra={
                  <Row gutter={[8, 8]}>
                    <Col>
                      <Button
                        icon={<EditOutlined />}
                        onClick={(e) => {
                          history.push('/account');
                        }}
                      >
                        Edit Account
                      </Button>
                    </Col>
                  </Row>
                }
              >
                <Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
                <Descriptions.Item label="Middle Initial">{user.middleInitial}</Descriptions.Item>
                <Descriptions.Item label="Email Address">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Company">{user.company.name}</Descriptions.Item>
                <Descriptions.Item label="Department">{user.department.name}</Descriptions.Item>
                <Descriptions.Item label="Employee Type">{user.employeeType}</Descriptions.Item>
              </Descriptions>
            </>
          </Drawer>
        </Col>
      </Row>
    </div>
  );
};

Container.propTypes = {
  noHeader: PropTypes.bool,
  customHeader: PropTypes.node,
  children: PropTypes.node,
};

Container.defaultProps = {
  noHeader: false,
  customHeader: null,
  children: null,
};

export default Container;
