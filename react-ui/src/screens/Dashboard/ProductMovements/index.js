import React from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import { Row, Col, Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import FormDetails ,{ tableHeader } from './data';
import FormScreen from '../../../components/forms/FormScreen';

const { Title } = Typography;

const ProductMovements = (props) => {
  const { company, title } = props;
  const { path } = useRouteMatch();
  const { tableDetails, formDetails } = FormDetails();
  const history = useHistory();

  const handleAddButton = () => {
    history.push(`${path}/new`);
  }

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <FormScreen
          title="New Product Movement"
          formDetails={formDetails}
          formTable={tableDetails}
        />
      </Route>
      <Route path={`${path}`}>
        <Row>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>
              {title}
            </Title>
            <Button
              onClick={() => handleAddButton()}
              icon={<PlusOutlined/>}
              primary
            > 
              Add
            </Button>
          </Col>
          <Col span={20}> 
            <TableDisplay
              columns={tableHeader}
              data={null}
              deleteEnabled={false}
              updateEnabled={false}
            />
          </Col>
        </Row>
      </Route>
    </Switch>
  )
}

export default ProductMovements;