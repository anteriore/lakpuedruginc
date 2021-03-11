import PurchaseVouchers from '../../screens/Accounting/PurchaseVouchers';
import VoucherPayables from '../../screens/Accounting/VoucherPayables';
import AccountTitles from '../../screens/Accounting/AccountTitles';
import CashReceiptVouchers from '../../screens/Accounting/CashReceiptVouchers';
import ChequePrintings from '../../screens/Accounting/ChequePrintings';
import ChequeDisbursements from '../../screens/Accounting/ChequeDisbursements';
import PDCDisbursements from '../../screens/Accounting/PDCDisbursements';
import PDCVouchers from '../../screens/Accounting/PDCVouchers';
import JournalVouchers from '../../screens/Accounting/JournalVouchers';

export const routes = [
  {
    title: 'Purchase Vouchers',
    path: '/purchase-vouchers',
    component: PurchaseVouchers,
  },
  {
    title: 'Journal Vouchers',
    path: '/journal-vouchers',
    component: JournalVouchers,
  },
  {
    title: 'Vouchers Payables',
    path: '/vouchers-payables',
    component: VoucherPayables,
  },
  {
    title: 'Account Titles',
    path: '/account-titles',
    component: AccountTitles,
  },
  {
    title: 'Cheque Printings',
    path: '/cheque-printings',
    component: ChequePrintings,
  },
  {
    title: 'Cheque Disbursement Vouchers',
    path: '/cheque-disbursement-vouchers',
    component: ChequeDisbursements,
  },
  {
    title: 'Credit Memos',
    path: '/credit-memos',
    component: null,
  },
  {
    title: 'Debit Memos',
    path: '/debit-memos',
    component: null,
  },
  {
    title: 'Cash Receipt Vouchers',
    path: '/cash-receipt-vouchers',
    component: CashReceiptVouchers,
  },
  {
    title: 'PDC Disbursements',
    path: '/pdc-disbursements',
    component: PDCDisbursements,
  },
  {
    title: 'PDC Vouchers',
    path: '/pdc-vouchers',
    component: PDCVouchers,
  },
];
