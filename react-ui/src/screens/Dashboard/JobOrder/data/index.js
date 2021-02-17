import moment from 'moment';

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