import React from 'react';
import { Row, Col, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { updateAuthState } from '../../redux/auth';

const Header = () => {
  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      dispatch(
        updateAuthState({
          signedIn: false,
          token: '',
          expired: false,
        })
      );
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Row>
      <Col span={4}>Lakpue Drug Inc.</Col>
      <Col span={12} />
      <Col span={8}>
        <Dropdown.Button
          overlay={menu}
          placement="bottomCenter"
          icon={<UserOutlined />}
          style={{ float: 'right', padding: '1%' }}
        >
          First Name Last Name
        </Dropdown.Button>
      </Col>
    </Row>
  );
};

export default Header;
