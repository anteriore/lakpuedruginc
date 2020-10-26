import React, { Component } from 'react';
import { Row, Col, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export class Header extends Component {

    handleMenuClick(e) {
        console.log('click', e);
    }

    render() {

        const menu = (
            <Menu onClick={this.handleMenuClick}>
              <Menu.Item key="1">
                Logout
              </Menu.Item>
            </Menu>
          );

        return (
            <Row>
                <Col span={4}>
                    Lakpue Drug Inc.
                </Col>
                <Col span={12}>
                </Col>
                <Col span={8}>
                    <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />} style={{"float":"right", "padding": "1%"}}>
                        First Name Last Name
                    </Dropdown.Button>
                </Col>
            </Row>
        )
    }
}

export default Header