import React, { useCallback, useEffect, useState } from 'react';
import { Row, Typography, Col, Button, Skeleton, Modal, Descriptions, Space, DatePicker, Table } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import {tableHeader, tableHeaderAccounts} from './data';
import { clearData, listPurchaseVouchers, createPurchaseVouchers, approvePurchaseVoucher } from './redux';
import { listRRByNoPV, clearData as clearRR } from '../../Dashboard/ReceivingReceipts/redux';
import { listVendor, clearData as clearVendor } from '../../Maintenance/Vendors/redux';
import { listAccountTitles, clearData as clearAC } from '../AccountTitles/redux';
import { listD, listA, clearData as clearDeptArea } from '../../Maintenance/DepartmentArea/redux';
import { listG, clearData as clearGroupCat } from '../../Maintenance/GroupsCategories/redux'
import { useDispatch, useSelector } from 'react-redux';
import InputForm from './InputForm';
import statusDialogue from '../../../components/StatusDialogue';
import GeneralHelper from '../../../helpers/general-helper';
import moment from 'moment'
import _ from 'lodash';
import PVHelper from './helper';

const { Title } = Typography;

const { RangePicker } = DatePicker

const PurchaseVouchers = (props) => {
	const { title, company } = props;
	const { path } = useRouteMatch();
	const dispatch = useDispatch();
	const history = useHistory();
	const { handleRequestResponse } = GeneralHelper();
	const { formatPVPayload } = PVHelper();

	const [contentLoading, setContentLoading] = useState(false);
	const [displayModal, setDisplayModal] = useState(false);
	const [purchaseVoucher, setPurchaseVoucher] = useState(null);

	const { id: userId } = useSelector(state => state.auth.user)
	const { list, status, action, statusMessage, statusLevel } = useSelector((state) => state.accounting.purchaseVouchers);
	// const { 
	// 	status: statusRR, 
	// 	statusMessage: statusMessageRR, 
	// 	statusLevel: statusLevelRR, 
	// 	action: actionRR
	// } = useSelector((state) => state.dashboard.receivingReceipts)

	// useEffect(() => {
  //   if (statusRR !== 'loading') {
  //     if (actionRR === 'fetch' && statusLevelRR === 'warning') {
  //       statusDialogue(
  //         {
  //           statusLevel: statusLevelRR,
  //           modalContent: {
  //             title: `${_.capitalize(statusLevelRR)} - (Receiving Receipts)`,
  //             content: statusMessageRR,
  //           },
  //         },
  //         'modal'
  //       );
  //     }
  //   }
  // }, [actionRR, statusMessageRR, statusRR, statusLevelRR]);

	useEffect(() => {
		if (status !== 'loading') {
			if (action === 'fetch' && statusLevel !== 'success') {
				statusDialogue({ statusMessage, statusLevel }, 'message');
			}

			if (action !== 'fetch') {
				statusDialogue({ statusMessage, statusLevel }, 'message');
			}
		}
	}, [status, action, statusMessage, statusLevel]);

	useEffect(() => {
		let isCancelled = false;
		setContentLoading(true);

		dispatch(listPurchaseVouchers(company)).then((data) => {
			setContentLoading(false);
			if(isCancelled) {
				dispatch(clearData());
				dispatch(clearAC());
				dispatch(clearDeptArea());
				dispatch(clearRR());
				dispatch(clearGroupCat());
				dispatch(clearVendor());
			}
		})

		return function clearUp() {
			dispatch(clearData());
			isCancelled = true
		}
	}, [company, dispatch]);

	const onSuccess = useCallback((method) => {
		if ( method === "add" ){
			history.push(`${path}/new`);
		} 

		if ( method === 'edit' ) {

		}

		setContentLoading(false);
	},[history, path])

	const onFail = useCallback(() => {
		console.log("Failing")
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
							dispatch(listG({company})).then((dataG) => {
								const dataList = [dataVendor, dataAC, dataA, dataD, dataG];
								handleRequestResponse(dataList, () => onSuccess('add'), onFail, '/accounting')
							})
						})
					})
				})
			})
		})
	}

	const handleRangedChanged = (value) => {
		console.log(value)
	}

	const handleRetrieve = (value) => {
		setPurchaseVoucher(value)
		setDisplayModal(true);
	}

	const handleApprovePV = () => {
		dispatch(approvePurchaseVoucher({ pvId: purchaseVoucher.id, user: userId })).then(() => {
			dispatch(listPurchaseVouchers(company));
			setDisplayModal(false);
		})
	}

	const handleClearDetails = () => {
		setDisplayModal(false);
		setPurchaseVoucher(null);
	}

	const onCreate = (payload) => {
		dispatch(createPurchaseVouchers(formatPVPayload(payload.values, payload.addedAccounts, userId, company))).then(() => {
			dispatch(listPurchaseVouchers(company));
		})
	}

	const onUpdate = (payload) => {
		console.log(payload);
	}

	return (
		<Switch>
			<Route path={`${path}/new`}>
				<InputForm title="New Purchase Voucher" onSubmit={onCreate} />
			</Route>
			<Route path={`${path}/:id/edit`}>
				<InputForm title="Update Purchase Voucher" onSubmit={onUpdate}/>
			</Route>
			<Route path={`${path}`}>
				<Row gutter={[8, 24]}>
					<Col style={GeneralStyles.headerPage} span={20}>
						<Title>
							{title}
						</Title>
						<Button
							icon={<PlusOutlined/>}
							loading={contentLoading}
							onClick={handleAddButton}
						>
							Add
						</Button>
					</Col>
					<Col style={GeneralStyles.reportsArea} span={20}>
						{contentLoading ? <Skeleton/> : (
							<Space size="middle">
								<RangePicker onChange={handleRangedChanged} format="MM/DD/YYYY" />
								<Button>
									Generate Report
								</Button>
							</Space>
						)}
					</Col>
					<Col span={20}>
						{contentLoading ? <Skeleton/> : (
							<TableDisplay
								columns={tableHeader}
								data={list}
								deleteEnabled={false}
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
												type="primary"
											>
												Approve
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