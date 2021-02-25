export const tableHeader = [
  {
    title: 'Emp No',
    dataIndex: 'number',
    key: 'number',
    sorter: (a, b) => a.length - b.length,
  },
  {
    title: 'Name',
    align: 'center',
    key: 'name',
    datatype: 'string',
    render: (object) =>
      `${object?.firstName ?? ''} ${object?.middleName ?? ''} ${object?.lastName ?? ''}`,
    sorter: (a, b) => {
      const left = `${a.employee?.firstName ?? ''} ${a.employee?.middleName ?? ''} ${
        a.employee?.lastName ?? ''
      }`;
      const right = `${b.employee?.firstName ?? ''} ${b.employee?.middleName ?? ''} ${
        b.employee?.lastName ?? ''
      }`;
      return left.length - right.length;
    },
  },
  {
    title: 'Given Name',
    dataIndex: 'givenName',
    key: 'givenName',
    align: 'center',
    sorter: (a, b) => {
      return a.givenName.length - b.givenName.length;
    },
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    align: 'center',
    sorter: (a, b) => {
      return a.gender.length - b.gender.length;
    },
  },
  {
    title: 'Monthly Salary',
    dataIndex: 'monthlySalary',
    key: 'monthlySalary',
    align: 'center',
    sorter: (a, b) => a.mothlySalary - b.mothlySalary,
  },
  {
    title: 'Hourly Rate',
    dataIndex: 'hourlyRate',
    key: 'hourlyRate',
    align: 'center',
    sorter: (a, b) => a.hourlyRate - b.hourlyRate,
  },
];

export const formDetails = {
  form_name: 'employee',
  form_items: [
    {
      label: 'Number ',
      name: 'number',
      rules: [{ required: true, message: 'Please provide a proper account name' }],
      placeholder: 'Employee number',
    },
    {
      label: 'First Name',
      name: 'firstName',
      rules: [{ required: true, message: 'Please provide a proper employee first name' }],
      placeholder: 'First name',
    },
    {
      label: 'Middle Name',
      name: 'middleName',
      rules: [{ required: true, message: 'Please provide a proper employee middle name' }],
      placeholder: 'Middle name',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      rules: [{ required: true, message: 'Please provide a proper employee last name' }],
      placeholder: 'Last name',
    },
    {
      label: 'Given Name',
      name: 'givenName',
      rules: [{ required: true, message: 'Please provide a proper employee given name' }],
      placeholder: 'Given name',
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'radioGroup',
      selectName: 'name',
      initialValue: 'MALE',
      choices: [
        {
          id: 'MALE',
          name: 'MALE',
        },
        {
          id: 'FEMALE',
          name: 'FEMALE',
        },
      ],
      rules: [{ required: true }],
    },
    {
      label: 'Tax Exmp. Code',
      name: 'taxExemptCode',
      rules: [{ required: true, message: 'Please provide a proper employee tax exempted code' }],
      placeholder: 'Tax Exmp. Code',
    },
    {
      label: 'ATM Account No',
      name: 'atmAccountNo',
      rules: [{ required: true, message: 'Please provide an employee atm account number' }],
      placeholder: 'ATM Account Number',
    },
    {
      label: 'Hourly Rate',
      name: 'hourlyRate',
      type: 'number',
      rules: [{ required: true, message: 'Please provide employee hourly rate' }],
      min: 0,
    },
    {
      label: 'Monthly Salary',
      name: 'monthlySalary',
      type: 'number',
      rules: [{ required: true, message: 'Please provide employee monthly salary' }],
      min: 0,
    },
    {
      label: 'PAGIBIG',
      name: 'pagibigId',
      rules: [{ required: true, message: 'Please provide a employee PAGIBIG id' }],
      placeholder: 'PAGIBIG ID',
    },
    {
      label: 'SSS No',
      name: 'sssNo',
      rules: [{ required: true, message: 'Please provide an employee a SSS id' }],
      placeholder: 'SSS No',
    },
    {
      label: 'TIN No',
      name: 'tinNo',
      rules: [{ required: true, message: 'Please provide an employee TIN id' }],
      placeholder: 'TIN No',
    },
    {
      label: 'Level Code',
      name: 'levelCode',
      rules: [{ required: true, message: 'Please provide an employee level code' }],
      placeholder: 'Level Code',
    },
    {
      label: 'Has Insurance',
      name: 'hasInsurance',
      type: 'radioGroup',
      selectName: 'name',
      initialValue: false,
      choices: [
        {
          id: true,
          name: 'true',
        },
        {
          id: false,
          name: 'false',
        },
      ],
      rules: [{ required: true }],
    },
  ],
};