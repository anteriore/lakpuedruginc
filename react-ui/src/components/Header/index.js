import React from 'react';
import { Row, Col, Dropdown, Menu, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { updateAuthState } from '../../redux/auth';

const { Text } = Typography;

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
    <Row style={styles.Header}>
      <Col span={4}>
        <Text style={styles.Title}>Lakpue Drug Inc.</Text>
      </Col>
      <Col span={12} />
      <Col span={8}>
        <Dropdown.Button
          overlay={menu}
          placement="bottomCenter"
          icon={<UserOutlined />}
          style={{ float: 'right', padding: '1%' }}
        >
          {user !== null && `${user.firstName} ${user.lastName}`}
        </Dropdown.Button>
      </Col>
    </Row>
  );
};

export default Header;

const styles = {
  Header: {
    backgroundColor: '#3E4966',
    height: '20%',
  },
  Title: {
    fontSize: '1.6vw',
    color: '#FFFFFF',
    padding: '1%',
    float: 'left',
    marginLeft: '5%',
  },
};
