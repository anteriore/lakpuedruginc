import { useSelector } from 'react-redux';
import _ from 'lodash';

const JVHelper = () => {
  const { list: listVoucher } = useSelector((state) => state.accounting.vouchers);

  const formatJVPaload = (values, requestedAccounts, user, company) => {
    const formattedAccounts = [];
    const selectedVoucher = _.find(listVoucher, (o) => o.id === values.voucher);

    console.log(selectedVoucher, 'Voucher Selected');

    if (requestedAccounts.length !== 0) {
      requestedAccounts.forEach((o) => {
        formattedAccounts.push({
          accountTitle: o.accountTitle,
          department: { id: o.department.id },
          group: { id: o.group.id },
          area: { id: o.area.id },
          amount: o?.accountTitle?.type === 'Debit' ? o.debit : o.credit,
        });
      });
    }

    return {
      type: 'JV',
      date: values.date,
      vendor: values?.vendor !== undefined ? { id: values.vendor } : values.vendor,
      voucher:
        values?.voucher !== undefined
          ? { id: selectedVoucher.id, type: selectedVoucher.type }
          : values.voucher,
      rrNumber: values.rrNumber,
      rrDate: typeof values.rrDate === 'string' ? new Date(values.rrDate) : values.rrDate,
      siNumber: values.siNumber,
      drNumber: values.drNumber,
      poNumber: values.poNumber,
      preparedBy: { id: user },
      adjustment: values.adjustment,
      remarks: values.remarks,
      accountTitles: formattedAccounts,
      company: { id: company },
    };
  };

  return { formatJVPaload };
};

export default JVHelper;
