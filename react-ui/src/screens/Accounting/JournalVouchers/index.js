import React, { useCallback, useEffect, useState } from 'react';
import { Row, Typography, Col, Button, Skeleton, Modal, Descriptions, Space, DatePicker, Table, message } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import {tableHeader, tableHeaderAccounts} from './data';
import { useDispatch, useSelector } from 'react-redux';
import { listJournalVouchers, createJournalVouchers,approveJournalVouchers, rejectJournalVouchers, clearData } from './redux';
import { listVoucherByCompany, clearData as clearVouchers } from '../Vouchers/redux';
import { listVendor, clearData as clearVendor } from '../../Maintenance/Vendors/redux';
import { listAccountTitles, clearData as clearAC } from '../AccountTitles/redux';
import { listD, listA, clearData as clearDeptArea } from '../../Maintenance/DepartmentArea/redux';
import { listG, clearData as clearGroupCat } from '../../Maintenance/GroupsCategories/redux'
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';
import moment from 'moment';
import _ from "lodash";
import InputForm from './InputForm';
import JVHelper from './helper';

const { Title } = Typography;

const { RangePicker } = DatePicker

const JournalVouchers = (props) => {
  const { title, company, actions } = props;
  const {path} = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const { formatJVPaload } = JVHelper()
  const { handleRequestResponse } = GeneralHelper();

  const [contentLoading, setContentLoading] = useState(false);
  const [journalVoucher, setJournalVoucher] = useState(null);
  const [displayModal, setDisplayModal] = useState(false)

  const { id: userId } = useSelector(state => state.auth.user)
  const {list, status, action, statusMessage, statusLevel} = useSelector((state) => state.accounting.journalVouchers);

  useEffect(() => {
		reevalutateMessageStatus({status, action,statusMessage, statusLevel})
	}, [status, action, statusMessage, statusLevel]);

  useEffect(() => {
    let isCancelled = false;
    setContentLoading(true);

    dispatch(listJournalVouchers({company})).then(() => {
      setContentLoading(false);
      if(isCancelled){
        dispatch(clearData());
      }
    });

    return function clearUp() {
      dispatch(clearData());
      dispatch(clearVouchers());
      dispatch(clearAC());
			dispatch(clearDeptArea());
			dispatch(clearGroupCat());
			dispatch(clearVendor());
      
      isCancelled = true;
    }
  }, [company, dispatch]);

  const onSuccess = useCallback((method) => {
		if ( method === "add" ){
			history.push(`${path}/new`);
		} 

		setContentLoading(false);
	},[history, path])

	const onFail = useCallback(() => {
		history.goBack();
		setContentLoading(false);
	},[history])

  const handleAddButton = () => {
    setContentLoading(true);
    dispatch(listVoucherByCompany({company})).then((dataVoucher) => {
      dispatch(listVendor({company})).then((dataVendor) => {
				dispatch(listAccountTitles()).then((dataAC) => { 
					dispatch(listA({company})).then((dataA) => {
						dispatch(listD({company})).then((dataD) => {
							dispatch(listG({company})).then((dataG) => {
								const dataList = [dataVoucher,dataVendor, dataAC, dataA, dataD, dataG];
								handleRequestResponse(dataList, () => onSuccess('add'), onFail, '/accounting')
							})
						})
					})
				})
			})
    })
  }

  const handleRangedChanged = () => {

  }

  const handleApproveJV = () => {
    dispatch(approveJournalVouchers({jvId: journalVoucher.id, user: userId})).then(() => {
      dispatch(listJournalVouchers({company}));
      setDisplayModal(false);
    })
  }

  const handleRejectJV = () => {
    dispatch(rejectJournalVouchers({jvId: journalVoucher.id, user: userId})).then(() => {
      dispatch(listJournalVouchers({company}));
      setDisplayModal(false);
    })
  }

  const handleRetrieve = (value) => {
    setJournalVoucher(value)
    setDisplayModal(true)
  }

  const handleClearDetails = () => {
		setDisplayModal(false);
		setJournalVoucher(null);
	}

  const onCreate = async (payload) => {
    setContentLoading(true)
    await dispatch(createJournalVouchers(formatJVPaload(payload.values, 
      payload.addedAccounts, userId, company))).then((dataCreateJV) => {
      if (dataCreateJV.type.split('/')[1] === 'rejected') {
        message.warning(dataCreateJV?.payload?.data?.message ?? "Please double check your input data")
      } else{
        dispatch(listJournalVouchers({company})).then(() => {
					setContentLoading(false);
				}).catch(() => {
					setContentLoading(false);
				});
				payload.redirect();
			}
		}).catch(() => {
			setContentLoading(false);
    });
  }

  return (
    <Switch>
      <Route path={`${path}/new`}>
        <InputForm title="New Journal Voucher" onSubmit={onCreate}/>
      </Route>
      <Route path={`${path}`}>
        <Row gutter={[8,24]}>
          <Col style={GeneralStyles.headerPage} span={20}>
            <Title>
              {title}
            </Title>
            {actions.includes('create') && (
              <Button
                icon={<PlusOutlined/>}
                loading={contentLoading}
                onClick={handleAddButton}
              >
                Add
              </Button>
            )}
          </Col>
          <Col style={GeneralStyles.reportsArea} span={20}>
						{contentLoading ? <Skeleton/> : (
							<Space size="middle">
								<RangePicker onChange={handleRangedChanged} format="MM/DD/YYYY" />
								<Button>
									Generate Report
								</Button>
                <Button>
                  Journal Report 
                </Button>
							</Space>
						)}
					</Col>
          <Col span={20}>
            {contentLoading ? <Skeleton/> : 
              <TableDisplay
                columns={tableHeader}
                data={list}
                deleteEnabled={false}
                updateEnabled={false}
                handleRetrieve={handleRetrieve}
              />
            }
          </Col>
        </Row>
        <Modal
          title="Journal Vouchers"
          visible={displayModal}
          onOk={handleClearDetails}
          onCancel={handleClearDetails}
          width={1500}
          cancelButtonProps={{ style: {display: 'none'}}}
        >
          { journalVoucher === null ? <Skeleton/> : (
            <Row gutter={[8,8]}>
              <Col span={13}>
                <Descriptions layout="vertical" size="small" bordered>
                  <Descriptions.Item label="Number">
                    {journalVoucher?.number ?? ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="RR Number">
                    {journalVoucher?.rrNumber ?? ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="Payee Code">
                    {journalVoucher?.vendor?.code ?? ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="PJV Date">
                    {moment(new Date(journalVoucher.date)).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Receiving Receipt Date">
                    {moment(new Date(journalVoucher.rrDate)).format('DD/MM/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Payee Name">
                    {journalVoucher?.vendor?.fullName ?? ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="SI #">
                    {journalVoucher?.siNumber ?? ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="DR #">
                    {journalVoucher?.drNumber ?? ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="PO #">
                    {journalVoucher?.poNumber ?? ""}
                  </Descriptions.Item>
                  <Descriptions.Item label="Remarks">
                    {journalVoucher?.remarks ?? ""}
                  </Descriptions.Item>
                </Descriptions>
                <Space style={{ marginTop: '2%' }} size="middle">
                  {_.toLower(journalVoucher.status) === 'pending' && (
                    <>
                      <Button
                        style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
                        icon={<CheckOutlined />}
                        onClick={handleApproveJV}
                        type="primary"
                      >
                        Approve
                      </Button>
                      <Button
                        style={{ marginRight: '1%' }}
                        icon={<CloseOutlined />}
                        onClick={handleRejectJV}
                        type="primary"
                        danger
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </Space>
              </Col>
              <Col span={11}>
                <Table
                  size="small"
                  columns={tableHeaderAccounts}
                  dataSource={journalVoucher?.accountTitles ?? null}
                  pagination={false}
                />
                <Descriptions>
                    <Descriptions.Item label="Total Debit Amount">
                      {journalVoucher?.totalDebitAmount ?? ""}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Credit Amount">
                      {journalVoucher?.totalCreditAmount ?? ""}
                    </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          )}
        </Modal>
      </Route>
    </Switch>
  )
}

export default JournalVouchers;