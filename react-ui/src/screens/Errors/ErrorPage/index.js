import React from 'react';
import {Result, Button} from 'antd';
import {Link, useHistory, useParams} from 'react-router-dom';
import { API_401, API_500 } from '../../../data/constants/response-message.constant';

const ErrorPage = () => {
  const { errorCode } = useParams();
  const history = useHistory(); 
  const checkErrorCode = (val) => {
    if(val === 401){
      return 403;
    }else{
      return val;
    }
  }

  const linkRoute = (val) => {
    if(val === 401){
      return (
        <Button type="primary"><Link to="/login">Return to login</Link></Button>
      )
    }else{
      return (
        <Button type="primary"><Link to={`${history.location.state.moduleList}`}>Return to previous list page</Link></Button>
      )
    }
  }

  return(
    <>
      <Result
         status={checkErrorCode(errorCode)}
         title={checkErrorCode(errorCode)}
         subTitle={errorCode === 401 ? API_401 : API_500}
         extra={linkRoute(errorCode)}
      />
    </>
  )
}

export default ErrorPage;