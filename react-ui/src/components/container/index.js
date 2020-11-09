import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';

import Header from '../Header'
import SideNav from '../SideNav'

const Container = props => {

    return (
        <div>
            <Header/>
            <Row>
                <Col span={4}>
                    <SideNav location={props.location}/>
                </Col>
                
                <Col span={20} style={{"padding":"1%"}}>
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
