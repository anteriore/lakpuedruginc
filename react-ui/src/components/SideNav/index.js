import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  ProfileOutlined,
  UserOutlined,
  ExperimentOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
} from '@ant-design/icons';

class SideNav extends Component {
  render() {
    const { location } = this.props;
    const current = `/${location.pathname.split('/')[1]}`;

    return (
      <Menu selectedKeys={[current]}>
        <Menu.Item key="/dashboard" icon={<ProfileOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/maintenance" icon={<ProfileOutlined />}>
          <Link to="/maintenance">Maintenance</Link>
        </Menu.Item>
        <Menu.Item key="/users" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="/accounting" icon={<UserOutlined />}>
          <Link to="/accounting">Accounting</Link>
        </Menu.Item>
        <Menu.Item key="/sales" icon={<UserOutlined />}>
          <Link to="/sales">Sales</Link>
        </Menu.Item>
        {/*<Menu.Item key="/mmd" icon={<ProfileOutlined />}>
          <Link to="/mmd">MMD</Link>
    </Menu.Item>*/}
        {/*<Menu.Item key="/rnd" icon={<ExperimentOutlined />}>
          <Link to="/rnd">R&D</Link>
    </Menu.Item>*/}
        <Menu.Item key="/purchasing" icon={<ShoppingCartOutlined />}>
          <Link to="/purchasing">Purchasing</Link>
        </Menu.Item>
        {/*<Menu.Item key="/costing" icon={<TagsOutlined />}>
          <Link to="/costing">Costing</Link>
  </Menu.Item>*/}
      </Menu>
    );
  }
}

export default SideNav;
