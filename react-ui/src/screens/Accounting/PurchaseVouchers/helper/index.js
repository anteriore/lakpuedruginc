import { useSelector } from 'react-redux';
import _, { last } from 'lodash';

const PVHelper = () => {
  const { list: listAccounts } = useSelector(state => state.accounting.accountTitles);
  const { deptList, areaList } = useSelector(state => state.maintenance.departmentArea);
  const { groupList } = useSelector(state => state.maintenance.groupsCategories);
  
  const formatAccountData = (values, lastValue) => {
    console.log(lastValue)
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

  return { formatAccountData }
}

export default PVHelper;