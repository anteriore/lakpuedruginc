import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton, message } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import InputForm from './InputForm';
import TableDisplay from '../../../components/TableDisplay';
import { listProduct, createProduct, updateProduct } from './redux';
import { tableHeader } from './data';

const { Title } = Typography;

const Product = (props) => {
  const { title, company } = props;
  const { path } = useRouteMatch();
  const [contentLoading, setContenctLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.maintenance.products);

  useEffect(() => {
    dispatch(listProduct(company)).then(() => {
      setContenctLoading(false);
    });
  }, [dispatch, company]);

  const handleUpdate = (values) => {
    history.push(`${path}/${values.id}/edit`);
  };

  const handleDelete = (row) => {
    console.log("Delete Product APi is currently not available", row)
  };

  const onCreate = (values) => {
    values.company = {id: company};
    dispatch(createProduct(values)).then(() => {
      dispatch(listProduct(company));
    });
  };

  const onUpdate = (values) => {
    values.company = {id: company};
    dispatch(updateProduct(values)).then(() => {
      dispatch(listProduct(company));
    });
  };


  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Product" onSubmit={onCreate} />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <InputForm title="Edit Product" onSubmit={onUpdate} />
      </Route>
      <Route path={path}>
        {contentLoading ? (
          <Skeleton />
        ) : (
          <Row gutter={[8, 24]}>
            <Col style={styles.headerPage} span={20}>
              <Title level={3}>{title}</Title>
              <Button icon={<PlusOutlined />} onClick={() => history.push(`${path}/new`)}>
                Add
              </Button>
            </Col>
            <Col span={20}>
              <TableDisplay
                columns={tableHeader}
                data={productList}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                deleteEnabled={false}
              />
            </Col>
          </Row>
        )}
      </Route>
    </Switch>
  );
};

export default Product;

const styles = {
  headerPage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterArea: {
    display: 'flex',
    flexDirection: 'row',
  },
};
