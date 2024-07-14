import {
  deleteAEmployeeQuery,
  getAEmployeeFilteredByIdQuery,
  getEmployeesFilteredAutoQuery,
  postAEmployeeQuery,
  putAEmployeeQuery,
} from "../database/query/pg_query_employee.js";
import { deleteAImageQuery } from "../database/query/pg_query_image.js";
import { deleteImage } from "../helpers/cloudinary.js";

export const getEmployeeController = async (req, res) => {
  try {
    const { user_id, name, from, to, email, address, phone, offset, limit } =
      req.query;

    const employees = await getEmployeesFilteredAutoQuery(
      user_id,
      name,
      from,
      to,
      email,
      address,
      phone,
      offset,
      limit
    );

    res.status(200).json(employees);
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const getEmployeeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await getAEmployeeFilteredByIdQuery(id);

    if (employee.length > 0) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ status: 404, message: `Employee not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postEmployeeController = async (req, res) => {
  try {
    const { user_id, name, dob, email, address, phone, image_id } = req.body;

    await postAEmployeeQuery(
      user_id,
      name,
      dob,
      email,
      address,
      phone,
      image_id
    );

    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const putEmployeeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { user_id, name, dob, email, address, phone, image_id } = req.body;

    const employee = await getAEmployeeFilteredByIdQuery(id);

    if (employee.length > 0) {
      await putAEmployeeQuery(
        user_id,
        name,
        dob,
        email,
        address,
        phone,
        !image_id ? employee[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Update successfully.`,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: `This employee is not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const patchEmployeeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const { user_id, name, dob, email, address, phone, image_id } = req.body;

    const employee = await getAEmployeeFilteredByIdQuery(id);

    if (employee.length > 0) {
      await putAEmployeeQuery(
        !user_id ? employee[0].user.user_id : user_id,
        !name ? employee[0].employee_name : name,
        !dob ? employee[0].dob : dob,
        !email ? employee[0].email : email,
        !address ? employee[0].address : address,
        !phone ? employee[0].phone : phone,
        !image_id ? employee[0].image.image_id : image_id,
        id
      );

      res.status(201).json({
        status: 201,
        message: `Patch successfully.`,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: `This employee is not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const deleteEmployeeByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await getAEmployeeFilteredByIdQuery(id);

    if (employee.length > 0) {
      await deleteAEmployeeQuery(id);

      await deleteAImageQuery(employee[0].image.image_id);

      await deleteImage(id, "employees");

      res.status(201).json({
        status: 201,
        message: `Delete successfully.`,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: `This employee is not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
