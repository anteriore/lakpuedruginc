import { useSelector } from 'react-redux';

export const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    datatype: 'string',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    datatype: 'string',
  },
  {
    title: 'TIN',
    dataIndex: 'tin',
    key: 'tin',
    datatype: 'string',
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    datatype: 'string',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    datatype: 'string',
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    key: 'isActive',
    datatype: 'boolean',
  },
];

const FormDetails = () => {
  const areas = useSelector((state) => state.maintenance.departmentArea.areaList);
  const departments = useSelector((state) => state.maintenance.departmentArea.deptList);
  const groups = useSelector((state) => state.maintenance.groupsCategories.groupList);

  const formDetails = {
    form_name: 'vendor',
    form_items: [
      {
        label: 'Name',
        name: 'name',
        rules: [{ required: true, message: 'Please provide a valid name' }],
        placeholder: 'Name',
      },
      {
        label: 'Code',
        name: 'code',
        rules: [{ required: true, message: 'Please provide a valid code' }],
        placeholder: 'Code',
      },
      {
        label: 'Full Name',
        name: 'fullName',
        rules: [{ required: true, message: 'Please provide a valid full name' }],
        placeholder: 'Full Name',
      },
      {
        label: 'Address',
        name: 'address',
        rules: [{ required: true, message: 'Please provide a valid address' }],
        placeholder: 'Address',
      },
      {
        label: 'Contact Person',
        name: 'contactPerson',
        rules: [{ required: true, message: 'Please provide a valid contact person' }],
        placeholder: 'Contact Person',
      },
      {
        label: 'Phone Number',
        name: 'phoneNumber',
        rules: [{ required: true, message: 'Please provide a valid phone number' }],
        placeholder: 'Phone Number',
      },
      {
        label: 'Terms',
        name: 'terms',
        type: 'number',
        rules: [{ required: true, message: 'Please provide valid Terms' }],
        placeholder: 'Terms',
      },
      {
        label: 'TIN',
        name: 'tin',
        rules: [{ required: true, message: 'Please provide a valid TIN' }],
        placeholder: 'TIN',
      },
      {
        label: 'VAT',
        name: 'vat',
        rules: [{ required: true, message: 'Please provide a valid VAT' }],
        placeholder: 'VAT',
      },
      {
        label: 'Area',
        name: 'area',
        type: 'select',
        selectName: 'name',
        choices: areas,
        rules: [{ required: true, message: 'Please select an Area' }],
      },
      {
        label: 'Department',
        name: 'department',
        type: 'select',
        selectName: 'name',
        choices: departments,
        rules: [{ required: true, message: 'Please select a Department' }],
      },
      {
        label: 'Group',
        name: 'group',
        type: 'select',
        selectName: 'name',
        choices: groups,
        rules: [{ required: true, message: 'Please select a Group' }],
      },
    ],
  };
  return {formDetails};
}

export default FormDetails;