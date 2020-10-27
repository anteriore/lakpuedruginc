import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Typography, Form, Input, Button, DatePicker, message, Modal, Table, Empty } from 'antd';

import { login } from '../../redux/auth'

const Login = (props) => {

    const { Title } = Typography;
    const dispatch = useDispatch(); 

    const onFinish = (values) => {
        dispatch(login(values))
    }

    return (
        <>
        <Row>
            <Col span={2}>
                <Title level={4}>Login</Title>
            </Col>
        </Row>
        <Row>
            <Col span={20}>
            <Form 
                {...styles.layout}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password/>
                </Form.Item>
                <div style={styles.tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </div>
            </Form>
            </Col>
        </Row>
        </>
    )
}

export default Login

const styles = {
    layout: {
        labelCol: { 
            span: 2 
        },
        wrapperCol: { 
            span: 4 
        },
    },
    tailLayout: {
        display: "flex",
        flexDirection: "row-reverse",
        width: "25%"
        
    }
}