import moment from 'moment';

export const formatEmployeePayload = (value) => {
  const employeeList = [];
  if (typeof value !== 'undefined' && value !== null) {
    value.employees.forEach((employee) => {
      employeeList.push({
        date: moment(),
        numberOfHours: employee.numberOfHours ?? 0,
        output: employee.output ?? '',
        timeIn: employee.timeIn ?? moment(),
        timeOut: employee.timeOut ?? moment(),
        employee: { id: employee.id },
        moInventory: { id: value.moNumber },
        procedure: { id: employee.procedure },
      });
    });
  }

  return employeeList;
};
