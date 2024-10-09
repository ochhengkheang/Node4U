export const convertRowToEmployeeModel = (row) => ({
  employee_id: row.employee_id,
  employee_name: row.employee_name,
  dob: row.dob,
  email: row.employee_email,
  address: row.address,
  phone: row.phone,
  image: {
    image_id: row.employee_image_id,
    image_url: row.employee_image_url,
  },
  user: {
    user_id: row.user_id,
    name: row.user_name,
    email: row.user_email,
    image: {
      image_id: row.user_image_id,
      image_url: row.user_image_url,
    },
  },
});
