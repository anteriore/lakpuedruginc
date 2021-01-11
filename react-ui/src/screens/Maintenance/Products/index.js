import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Skeleton, message } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import InputForm from './InputForm';
import TableDisplay from '../../../components/TableDisplay';
import { listProduct, createProduct, updateProduct, deleteProduct, clearData } from './redux';
import { clearData as clearDepots } from '../Depots/redux';
import { clearData as clearClassification } from '../Classification/redux';
import { clearData as clearCategories } from '../ProductCategories/redux';
import { clearData as clearDivisions } from '../ProductDivisions/redux';
import { clearData as clearUnits } from '../Units/redux';
import { clearData as clearFinishedGoods } from '../FinishedGoods/redux';
import { tableHeader } from './data';

const { Title } = Typography;

const Product = (props) => {
  const { title, company } = props;
  const { path } = useRouteMatch();
  const [contentLoading, setContenctLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { productList, action, statusMessage } = useSelector((state) => state.maintenance.products);

  useEffect(() => {
    let isCancelled = false;
    dispatch(listProduct({ company, message })).then(() => {
      setContenctLoading(false);
      if (isCancelled) {
        dispatch(clearData());
      }
    });

    return function cleanup() {
      dispatch(clearData());
      dispatch(clearDepots());
      dispatch(clearClassification());
      dispatch(clearCategories());
      dispatch(clearDivisions());
      dispatch(clearUnits());
      dispatch(clearFinishedGoods());
      isCancelled = true;
    };
  }, [dispatch, company]);

  useEffect(() => {
    if (action !== 'get' && action !== '') {
      if (action === 'pending') {
        message.info(statusMessage);
      } else if (action === 'error') {
        message.error(statusMessage);
      } else {
        message.success(statusMessage);
      }
    }
  }, [statusMessage, action]);

  const handleUpdate = (values) => {
    history.push(`${path}/${values.id}/edit`);
  };

  const handleDelete = (row) => {
    dispatch(deleteProduct(row))
      .then(() => {
        dispatch(listProduct({ company, message }));
      })
      .catch((err) => {
        message.error(`Something went wrong! details: ${err}`);
      });
  };

  const onCreate = (values) => {
    values.company = { id: company };
    dispatch(createProduct(values)).then(() => {
      dispatch(listProduct({ company, message }));
    });
  };

  const onUpdate = (values) => {
    values.company = { id: company };
    dispatch(updateProduct(values)).then(() => {
      dispatch(listProduct({ company, message }));
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
                deleteEnabled
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
