import React, {useEffect, useState} from 'react';
import { 
  Row, 
  Col, 
  Skeleton,
  Typography, 
  Button,
  Modal,
  Space,
  Table,
  Empty,
  message,  
} from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { listMaterialReevaluations, clearData } from './redux';
import TableDisplay from '../../../components/TableDisplay';
import { tableHeader } from './data';

const {Title} = Typography;

const MaterialReevaluations = (props) => {
  const {company, title} = props;
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const [contentLoading, setContentLoading] = useState(true);
  
  const { materialReevaluationsList: matReevList } = useSelector(state => state.dashboard.materialReevaluations)

  useEffect(() => {
    let isCancelled = false;
    dispatch(listMaterialReevaluations({company})).then(() => {
      setContentLoading(false);
      if(isCancelled){
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      isCancelled = true;
    }
  },[dispatch, company])

  return (
    <Switch>
      <Route exact path={`${path}/new`}>

      </Route>
      <Route>
        <Row>
          <Col span={20}>
            <Title level={3} style={{ float: 'left' }}>
              {title}
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={20}>
          <Button
              style={{ float: 'right', marginRight: '0.7%', marginBottom: '1%' }}
              icon={<PlusOutlined />}
              loading={contentLoading}
            >
              Add
            </Button>
            {contentLoading ? (
              <Skeleton/>
            ) : (
              <TableDisplay
                columns={tableHeader}
                data={matReevList}
                deleteEnabled={false}
                updateEnabled={false}
              />
            )}
          </Col>
        </Row>
      </Route>
    </Switch>
  )
} 

export default MaterialReevaluations;