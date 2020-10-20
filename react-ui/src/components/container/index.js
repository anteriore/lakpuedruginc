import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';

import Header from '../Header'
import SideNav from '../SideNav'

const Container = props => {

    const renderHeader = () => {
        if (props.noHeader) {
            return null
        }

        if (props.customHeader) {
            return props.customHeader
        }

        return <Header isLogo={props.isLogo} />
    }

    return (
        <div>
            <Header/>
            <Row>
                <Col span={4}>
                    <SideNav location={props.location}/>
                </Col>
                
                <Col span={20}>
                    {props.children}
                </Col>
            </Row>
        </div>
    )
}

Container.propTypes = {
    noHeader: PropTypes.bool,
    customHeader: PropTypes.node,
    children: PropTypes.node,
}

Container.defaultProps = {
    noHeader: false,
    customHeader: null,
    children: null,
}

export default Container
