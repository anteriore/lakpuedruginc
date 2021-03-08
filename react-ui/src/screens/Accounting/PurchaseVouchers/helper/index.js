import { useSelector } from 'react-redux';
import _ from 'lodash';

const PVHelper = () => {
  const { list: listAccounts } = useSelector(state => state.accounting.accountTitles);
  const { deptList, areaList } = useSelector(state => state.maintenance.departmentArea);
  const { groupList } = useSelector(state => state.maintenance.groupsCategories);
  const { list: listRR } = useSelector(state => state.dashboard.receivingReceipts);
  
  const formatAccountData = (values, lastValue) => {
    return {
      key: lastValue?.key !== undefined ? lastValue.key + 1 : 1,
      accountTitle: _.find(listAccounts, (o) => o.id === values?.accountTitles),
      department: _.find(deptList, (o) => o.id === values?.department),
      area: _.find(areaList, (o) => o.id === values?.area),
      group: _.find(groupList, (o) => o.id === values?.group),
      debit: values.debit,
      credit: values.credit ,
    }
  }

  const formatPVPayload = (values, requestedAccounts, user, company) => {
    let formattedAccounts = [];

    requestedAccounts.forEach((o) => {
      formattedAccounts.push({
        accountTitle: o.accountTitle,
        department: {id: o.department.id},
        group: {id: o.group.id },
        area: {id: o.area.id}, 
        amount: o?.accountTitle?.type ==="Debit" ? o.debit : o.credit
      })
    })

    return {
      type: "PJV",
      date: values.date,
      vendor: values?.vendor !== undefined ? {id: values.vendor} : values.vendor, 
      rrNumber: typeof values.rrNumber === 'string'? values.rrNumber : _.find(listRR, (o) => o.id === values.rrNumber)['number'],
      rrDate: values.rrDate, 
      siNumber: values.siNumber, 
      drNumber: values.drNumber,
      poNumber: values.poNumber,
      preparedBy: {id: user},
      manual: values.manual,
      remarks: values.remarks,
      accountTitles: formattedAccounts,
      company: {id: company}
    }
  }

  return { formatAccountData, formatPVPayload }
}

export default PVHelper;