import React, { useCallback, useEffect, useState } from 'react';
import { Row, Typography, Col, Button, Skeleton, Modal, Descriptions, Space, DatePicker, Table } from 'antd';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import GeneralStyles from '../../../data/styles/styles.general';
import { PlusOutlined, CheckOutlined, CloseOutlined, PrinterOutlined } from '@ant-design/icons';
import TableDisplay from '../../../components/TableDisplay';
import {tableHeader, tableHeaderAccounts} from './data';
import { clearData, listPurchaseVouchers } from './redux';
import { useDispatch, useSelector } from 'react-redux';
import statusDialogue from '../../../components/StatusDialogue';
import GeneralHelper from '../../../helpers/general-helper';
import moment from 'moment'
import _ from 'lodash';

const { Title } = Typography;

const { RangePicker } = DatePicker

const PurchaseVouchers = (props) => {
	const { title, company, actions} = props;
	const { path } = useRouteMatch();
	const dispatch = useDispatch();
	const history = useHistory();
	const { handleRequestResponse } = GeneralHelper();

	const [contentLoading, setContentLoading] = useState(false);
	const [displayModal, setDisplayModal] = useState(false);
	const [purchaseVoucher, setPurchaseVoucher] = useState(null);

	const { list, status, action, statusMessage, statusLevel } = useSelector((state) => state.accounting.purchaseVouchers)

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
			}
		})

		return function clearUp() {
			dispatch(clearData());
			isCancelled = true
		}
	}, [company, dispatch]);

	const handleRangedChanged = (value) => {
		console.log(value)
	}

	const handleRetrieve = (value) => {
		setPurchaseVoucher(value)
		setDisplayModal(true);
	}

	const handleClearDetails = () => {
		setDisplayModal(false);
		setPurchaseVoucher(null);
	}

	return (
		<Switch>
			<Route path={`${path}/new`}>

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
												type="primary"
											>
												Approve
											</Button>
											<Button
												style={{ marginRight: '1%' }}
												icon={<CloseOutlined />}
												type="primary"
												danger
											>
												Reject
											</Button>
										</>
									)}
									<Button
										icon={<PrinterOutlined/>}
										type="primary"
									>
										Print PJV
									</Button>
								</Space>
							</Col>
							<Col>
								<Table
									size="small"
									columns={ tableHeaderAccounts }
									dataSource={purchaseVoucher?.accountTitles ?? null}
									pagination={false}
								/>
							</Col>
						</Row>
					)}
				</Modal>
			</Route>
		</Switch>
	)
}

export default PurchaseVouchers;