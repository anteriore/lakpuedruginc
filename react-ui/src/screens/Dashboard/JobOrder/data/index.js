import moment from 'moment';
import { useSelector } from 'react-redux';

export const tableHeader = [
  {
    title: 'Mo No',
    dataIndex: 'moInventory',
    key: 'moInventory',
    datatype: 'object',
    render: (object) => object?.moNumber ?? "",
    sorter: (a,b) => {
      const left = a.moInventory?.moNumber ?? 0;
      const right = b.moInventory?.moNumber ?? 0;
      return left - right;
    }
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    datatype: 'date',
  },
  {
    title: 'Employee',
    dataIndex: 'employee',
    key: 'employee',
    datatype: 'string',
    render: (object) => `${object?.firstName ?? ""} ${object?.middleName ?? ""} ${object?.lastName ?? ""}`,
    sorter: (a,b) => {
      const left = `${a.employee?.firstName ?? ""} ${a.employee?.middleName ?? ""} ${a.employee?.lastName ?? ""}`
      const right = `${b.employee?.firstName ?? ""} ${b.employee?.middleName ?? ""} ${b.employee?.lastName ?? ""}`
      return left.length - right.length;
    }
  },
  {
    title: 'Procedure',
    dataIndex: 'procedure',
    key: 'procedure',
    datatype: 'string',
    render: (object) => `[${object?.code ?? ""}] ${object?.name ?? ""}`,
    sorter: (a,b) => {
      const left = `[${a.procedure?.code ?? ""}] ${a.procedure?.name ?? ""}`
      const right = `[${b.procedure?.code ?? ""}] ${b.procedure?.name ?? ""}`
      return left.length - right.length;
    }
  },
  {
    title: 'Time In',
    dataIndex: 'timeIn',
    key: 'timeIn',
    datatype: 'date',
    render: (value) => moment(new Date(value)).format("LT"),
    sorter: (a,b) => a.timeIn - b.timeIn
  },
  {
    title: 'Time Out',
    dataIndex: 'timeOut',
    key: 'timeOut',
    datatype: 'date',
    render: (value) => moment(new Date(value)).format("LT"),
    sorter: (a,b) => a.timeOut - b.timeOut
  },
]

const FormDetails = () => {
  const { moInventoryList } = useSelector((state) => state.rnd.moInventories)
  const { employeeList } = useSelector((state) => state.dashboard.employees)
  const { productionAreaList } = useSelector((state) => state.maintenance.productionArea);

  const formDetails = {
    form_name: 'jobOrder',
    form_items: [
      {
        label: 'MO Inventory',
        name: 'moNumber',
        type: 'selectSearch',
        selectName: 'name',
        choices: moInventoryList,
        render: (object) => `[${object?.moNumber ?? ""}] ${object?.finishedGood?.code ?? ""} - ${object?.typeLabel ?? ""}`,
        rules: [{ required: true }],
      },
    ]
  }

  const tableDetails = {
    label: 'Employees',
    name: 'employee',
    key: 'id',
    rules: [{ required: true }],
    isVisible: true,
    fields: [
      {
        label: 'Emp No',
        name: 'number',
        render: (object) => object?.number ?? ""
      },
      {
        label: 'Name',
        name: 'name',
        render: (object) => `${object?.firstName ?? ""} ${object?.middleName ?? ""} ${object?.lastName ?? ""}`
      },
      {
        label: 'Time In',
        name: 'timeIn',
        type: 'timepicker',
        rules: [{required: true, message: "Please select a time in"}]
      },
      {
        label: 'Time Out',
        name: 'timeOut',
        type: 'timepicker',
        rules: [{required: true, message: "Please select a time in"}]
      },
      {
        label: '# of Hours',
        name: 'numberOfHours',
        type: 'number',
        rules: [{required: true, message: "Please provide number of hours"}],
        min: 0
      },
      {
        label: 'Area',
        name: 'productionArea',
        type: 'selectSearch',
        choices: productionAreaList,
        rules: [{ required: true }],
        placeholder: 'Area',
      },
    ],
    foreignKey: 'id',
    selectedKey: 'id',
    selectData: employeeList,
    selectFields: [
      {
        title: "Emp No",
        dataIndex: 'number',
        key: 'number'
      },
      {
        title: 'Name',
        key: 'name',
        render: (object) =>  `${object?.firstName ?? ""} ${object?.middleName ?? ""} ${object?.lastName ?? ""}`
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Monthly Salary',
        dataIndex: 'monthlySalary',
        key: 'monthlySalary',
      },
      {
        title: 'Hourly Rate',
        dataIndex: 'hourlyRate',
        key: 'hourlyRate',
      }
    ],
    checkSelected: (selectedData, rowData) => {
      console.log(selectedData, rowData)
      if (
        typeof selectedData !== 'undefined' &&
        selectedData !== null &&
        selectedData.some((item) => item.id === rowData.id)
      ) {
        return true;
      }
    }
  }

  return {formDetails, tableDetails}
}

export default FormDetails