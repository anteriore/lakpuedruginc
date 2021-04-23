export const formDetailG = {
  form_name: 'groups',
  form_items: [
    {
      label: 'Name',
      name: 'name',
      rules: [{ required: true, message: 'Please provide a valid group name' }],
      placeholder: 'Group name',
    },
  ],
};

export const formDetailC = {
  form_name: 'categories',
  form_items: [
    {
      label: 'Name',
      name: 'name',
      rules: [{ required: true, message: 'Please provide a valid category name' }],
      placeholder: 'Category name',
    },
  ],
};
