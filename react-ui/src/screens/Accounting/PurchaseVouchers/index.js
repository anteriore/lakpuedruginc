import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Row, Typography, Col, Button, Skeleton, Modal, Descriptions, Space, Table } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import { PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import {tableHeader, tableHeaderAccounts} from './data';
import { clearData, listPurchaseVouchers, createPurchaseVouchers, approvePurchaseVoucher, rejectPurchaseVoucher } from './redux';
import { listRRByNoPV, clearData as clearRR } from '../../Dashboard/ReceivingReceipts/redux';
import { listVendor, clearData as clearVendor } from '../../Maintenance/Vendors/redux';
import { listAccountTitles, clearData as clearAC } from '../AccountTitles/redux';
import { listD, listA, clearData as clearDeptArea } from '../../Maintenance/DepartmentArea/redux';
import { listGroupByCompany, clearData as clearGroupCat } from '../../Maintenance/GroupsCategories/redux'
import { useDispatch, useSelector } from 'react-redux';
import InputForm from './InputForm';
import GeneralHelper, { reevalutateMessageStatus } from '../../../helpers/general-helper';
import moment from 'moment'
import _ from 'lodash';
import PVHelper from './helper';

const { Title } = Typography;

// const { RangePicker } = DatePicker

const PurchaseVouchers = (props) => {
	const { title, company, actions } = props;
	const { path } = useRouteMatch();
	const dispatch = useDispatch();
	const history = useHistory();
	const { handleRequestResponse } = GeneralHelper();
	const { formatPVPayload } = PVHelper();

	const [contentLoading, setContentLoading] = useState(false);
	const [displayModal, setDisplayModal] = useState(false);
	const [purchaseVoucher, setPurchaseVoucher] = useState(null);
	const isMounted = useRef(true);

	const { id: userId } = useSelector(state => state.auth.user)
	const { list, status, action, statusMessage, statusLevel } = useSelector((state) => state.accounting.purchaseVouchers);

	const performCleanup = useCallback(() => {
		dispatch(clearData());
		dispatch(clearAC());
		dispatch(clearDeptArea());
		dispatch(clearRR());
		dispatch(clearGroupCat());
		dispatch(clearVendor());
	},[dispatch]);

	useEffect(() => {
		reevalutateMessageStatus({status, action,statusMessage, statusLevel})
	}, [status, action, statusMessage, statusLevel]);

	useEffect(() => {
		setContentLoading(true);

		dispatch(listPurchaseVouchers({company})).then((data) => {
			setContentLoading(false);
		})

		return function cleanup() {
			isMounted.current = false
			performCleanup()
		}
	}, [company, dispatch, performCleanup]);

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
		dispatch(listRRByNoPV({company})).then(() => {
			dispatch(listVendor({company})).then((dataVendor) => {
				dispatch(listAccountTitles()).then((dataAC) => { 
					dispatch(listA({company})).then((dataA) => {
						dispatch(listD({company})).then((dataD) => {
							dispatch(listGroupByCompany({company})).then((dataG) => {
								if(isMounted.current){
									const dataList = [dataVendor, dataAC, dataA, dataD, dataG];
									handleRequestResponse(dataList, () => onSuccess('add'), onFail, '/accounting')
								}
							})
						})
					})
				})
			})
		})
	}

	// const handleRangedChanged = (value) => {
	// 	console.log("Report feature is still not included in this system version")
	// }

	const handleRetrieve = (value) => {
		setPurchaseVoucher(value)
		setDisplayModal(true);
	}

	const handleApprovePV = () => {
		setContentLoading(true);
		dispatch(approvePurchaseVoucher({ pvId: purchaseVoucher.id, user: userId })).then(() => {
			dispatch(listPurchaseVouchers({company}));
			setContentLoading(false);
			setDisplayModal(false);
		})
	}

	const handleRejectPV = () => {
		setContentLoading(true);
		dispatch(rejectPurchaseVoucher({ pvId: purchaseVoucher.id, user: userId })).then(() => {
			dispatch(listPurchaseVouchers({company}));
			setContentLoading(false);
			setDisplayModal(false);
		})
	}

	const handleClearDetails = () => {
		setDisplayModal(false);
		setPurchaseVoucher(null);
	}

	const onCreate = async (data) => {
		setContentLoading(true);
		const payload = formatPVPayload(data.values, data.addedAccounts, userId, company)
		await dispatch(createPurchaseVouchers(payload)).then((response) => {
			const onSuccess = () => {
			  history.goBack();
			  dispatch(listPurchaseVouchers({company})).then(() => {
				setContentLoading(false);
			  });
			}
			const onFail = () => {
				setContentLoading(false);
			}
	  
			handleRequestResponse([response], onSuccess, onFail, '');
		});
		return 1
	}

	return (
		<Switch>
			<Route path={`${path}/new`}>
				<InputForm title="New Purchase Voucher" onSubmit={onCreate} />
			</Route>
			<Route path={`${path}`}>
				<Row gutter={[8, 24]}>
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
					{/* <Col style={GeneralStyles.reportsArea} span={20}>
						{contentLoading ? <Skeleton/> : (
							<Space size="middle">
								<RangePicker onChange={handleRangedChanged} format="MM/DD/YYYY" />
								<Button>
									Generate Report
								</Button>
							</Space>
						)}
					</Col> */}
					<Col span={20}>
						{contentLoading ? <Skeleton/> : (
							<TableDisplay
								columns={tableHeader}
								data={list}
								deleteEnabled={false}
								updateEnabled={false}
								handleRetrieve={handleRetrieve}
							/>
						)}
					</Col>
				</Row>
				<Modal
					title="Purchase Vouchers"
					visible={displayModal}
					onOk={handleClearDetails}
					onCancel={handleClearDetails}
					width={1500}
					cancelButtonProps={{ style: {display: 'none'}}}
				>
					{ purchaseVoucher === null ? <Skeleton/> : (
						<Row gutter={[8,8]}>
							<Col span={13}>
								<Descriptions layout="vertical" size="small" bordered>
									<Descriptions.Item label="Number">
										{purchaseVoucher?.number ?? ""}
									</Descriptions.Item>
									<Descriptions.Item label="RR Number">
										{purchaseVoucher?.rrNumber ?? ""}
									</Descriptions.Item>
									<Descriptions.Item label="Payee Code">
										{purchaseVoucher?.vendor?.code ?? ""}
									</Descriptions.Item>
									<Descriptions.Item label="PJV Date">
										{moment(new Date(purchaseVoucher.date)).format('DD/MM/YYYY')}
									</Descriptions.Item>
									<Descriptions.Item label="Receiving Receipt Date">
										{moment(new Date(purchaseVoucher.rrDate)).format('DD/MM/YYYY')}
									</Descriptions.Item>
									<Descriptions.Item label="Payee Name">
										{purchaseVoucher?.vendor?.fullName ?? ""}
									</Descriptions.Item>
									<Descriptions.Item label="SI #">
										{purchaseVoucher?.siNumber ?? ""}
									</Descriptions.Item>
									<Descriptions.Item label="DR #">
										{purchaseVoucher?.drNumber ?? ""}
									</Descriptions.Item>
									<Descriptions.Item label="PO #">
										{purchaseVoucher?.poNumber ?? ""}
									</Descriptions.Item>
									<Descriptions.Item label="Remarks">
										{purchaseVoucher?.remarks ?? ""}
									</Descriptions.Item>
								</Descriptions>
								<Space style={{ marginTop: '2%' }} size="middle">
									{_.toLower(purchaseVoucher.status) === 'pending' && (
										<>
											<Button
												style={{ backgroundColor: '#3fc380', marginRight: '1%' }}
												icon={<CheckOutlined />}
												onClick={handleApprovePV}
												loading={contentLoading}
												type="primary"
											>
												Approve
											</Button>
											<Button
												style={{ marginRight: '1%' }}
												icon={<CloseOutlined />}
												onClick={handleRejectPV}
												loading={contentLoading}
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
									dataSource={purchaseVoucher?.accountTitles ?? null}
									pagination={false}
								/>
								<Descriptions>
										<Descriptions.Item label="Total Debit Amount">
											{purchaseVoucher?.totalDebitAmount ?? ""}
										</Descriptions.Item>
										<Descriptions.Item label="Total Credit Amount">
											{purchaseVoucher?.totalCreditAmount ?? ""}
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

export default PurchaseVouchers;