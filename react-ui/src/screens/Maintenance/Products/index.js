import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Row, Col, Typography, Button, Skeleton, message } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import TableDisplay from '../../../components/TableDisplay';
import { listProduct, createProduct, updateProduct, clearData } from './redux';
import { clearData as clearDepots, listDepot } from '../Depots/redux';
import { clearData as clearClassification, listClassification} from '../Classification/redux';
import { clearData as clearCategories, listPC } from '../ProductCategories/redux';
import { clearData as clearDivisions, listPD } from '../ProductDivisions/redux';
import { clearData as clearUnits, listUnit } from '../Units/redux';
import { clearData as clearFinishedGoods, getFGList } from '../FinishedGoods/redux';
import FormDetails ,{ tableHeader } from './data';
import GeneralHelper from '../../../helpers/general-helper';
import FormScreen from '../../../components/forms/FormScreen';
import { formatInitialValue, formatPayload } from './helper';
import { reevalutateMessageStatus } from '../../../helpers/general-helper';

const { Title } = Typography;

const Product = (props) => {
  const { title, company, actions } = props;
  const { path } = useRouteMatch();
  const { handleRequestResponse } = GeneralHelper();
  const { formDetails } = FormDetails();

  const [contentLoading, setContentLoading] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formData, setFormData] = useState(null);
  const isMounted = useRef(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const { productList, statusMessage, action, status, statusLevel } = useSelector((state) => state.maintenance.products);

  useEffect(() => {
    reevalutateMessageStatus({status, action, statusMessage, statusLevel})
  }, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    dispatch(listProduct({ company, message })).then(() => {
      if(isMounted.current){
        setContentLoading(false);
      }
    });

    return function cleanup() {
      isMounted.current = false
      dispatch(clearData());
      dispatch(clearDepots());
      dispatch(clearClassification());
      dispatch(clearCategories());
      dispatch(clearDivisions());
      dispatch(clearUnits());
      dispatch(clearFinishedGoods());
    };
  }, [dispatch, company]);

  const onSuccess = useCallback((method, id) => {
    if(isMounted.current){
      if ( method === "add" ){
        history.push(`${path}/new`);
      } 

      if (method === 'edit'){
        history.push(`${path}/${id}/edit`);
      }
      setContentLoading(false);
    }
	},[history, path]);

  const handleAddButton = () => {
    setFormTitle('Create Product');
    setContentLoading(true);
    dispatch(getFGList()).then((dataFG) => {
      dispatch(listDepot(company)).then((dataDepot) => {
        dispatch(listClassification()).then((dataClassification) => {
          dispatch(listPC()).then((dataPC) => {
            dispatch(listPD()).then((dataPD) => {
              dispatch(listUnit()).then((dataUnit) => {
                const dataList = [dataFG, dataDepot, dataClassification, dataPD, dataUnit, dataPC];
                handleRequestResponse(dataList, () => onSuccess('add'), () => console.log("Failed"), '/maintenance')
                setContentLoading(false);
              })
            })
          })
        })
      })
    })
  }

  const handleUpdate = (values) => {
    setFormTitle(`Edit Product - ${values.id}`);
    setContentLoading(true);
    setFormData(formatInitialValue(values));
    dispatch(getFGList()).then((dataFG) => {
      dispatch(listDepot(company)).then((dataDepot) => {
        dispatch(listClassification()).then((dataClassification) => {
          dispatch(listPC()).then((dataPC) => {
            dispatch(listPD()).then((dataPD) => {
              dispatch(listUnit()).then((dataUnit) => {
                dispatch(listUnit()).then((dataUnit) => {
                  const dataList = [dataFG, dataDepot, dataClassification, dataPD, dataUnit, dataPC];
                  handleRequestResponse(dataList, () => onSuccess('edit', values.id), () => console.log("Failed"), '/maintenance')
                  setContentLoading(false);
                })
              })
            })
          })
        })
      })
    })
  };

  /*const handleDelete = (row) => {
    setContentLoading(true)
    dispatch(deleteProduct(row)).then(() => {
      dispatch(listProduct({ company, message }));
    })
    setContentLoading(false);
  };*/

  const onCreate = async (values) => {
    values.company = { id: company };
    setContentLoading(true)
    await dispatch(createProduct(formatPayload(values))).then((response) => {
      const onSuccess = () => {
        history.goBack();
        dispatch(listProduct({ company, message })).then(() => {
          setContentLoading(false);
        });
      }
      const onFail = () => {
        setContentLoading(false);
      }

      handleRequestResponse([response], onSuccess, onFail, '');
    });
    return 1
  };

  const onUpdate = async (values) => {
    values.company = { id: company };
    values.id = formData.id;
    setContentLoading(true);
    await dispatch(updateProduct(formatPayload(values))).then((response) => {
      const onSuccess = () => {
        history.goBack();
        dispatch(listProduct({ company, message })).then(() => {
          setContentLoading(false);
        });
      }
      const onFail = () => {
        setContentLoading(false);
      }

      handleRequestResponse([response], onSuccess, onFail, '');
    });
    return 1
  };

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <FormScreen
          title={formTitle}
          onSubmit={onCreate}
          values={formData}
          onCancel={() => {
            setFormData(null)
          }}
          formDetails={formDetails}
        />
      </Route>
      <Route path={`${path}/:id/edit`}>
        <FormScreen
          title={formTitle}
          onSubmit={onUpdate}
          values={formData}
          onCancel={() => {
            setFormData(null)
          }}
          formDetails={formDetails}
        />
      </Route>
      <Route path={path}>
        <Row gutter={[8, 24]}>
          <Col style={styles.headerPage} span={20}>
            <Title level={3}>{title}</Title>
            {actions.includes('create') && (
              <Button loading={contentLoading} icon={<PlusOutlined />} onClick={handleAddButton}>
                Add
              </Button>
            )}
          </Col>
          <Col span={20}>
            { contentLoading ? <Skeleton/> : 
              <TableDisplay
                columns={tableHeader}
                data={productList}
                handleUpdate={handleUpdate}
                updateEnabled={actions.includes('update')}
                deleteEnabled={false}
              />
            }
          </Col>
        </Row>
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
