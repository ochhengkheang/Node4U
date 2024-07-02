import { employeeJsonDataPath } from "../utils/file.js";
import fs from "fs";

const jsonData = JSON.parse(fs.readFileSync(employeeJsonDataPath, "utf-8"));
// console.log(jsonData);

export const getEmployeeController = (req, res) => {
  res.status(200).json(jsonData);
};

export const getEmployeeByIdController = (req, res) => {
  const reqId = req.params.id;
  // validation
  const result = jsonData.find(({ id }) => id == reqId); // return js value if found, undefined of not
  // console.log(result);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ status: 404, message: `Id: ${reqId} Not found.` });
  }
};

export const postEmployeeController = (req, res) => {
  const reqId = req.body.id;
  // validation
  const result = jsonData.some(({ id }) => id === reqId); // return true if found, false if not
  // console.log(result);
  if (result) {
    res.status(409).json({
      status: 409,
      message: `Id: ${reqId} already exists.`,
    });
  } else {
    const reqData = JSON.parse(JSON.stringify(req.body));
    jsonData.push(reqData);
    fs.writeFileSync(employeeJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  }
};

export const updateEmployeeByIdController = (req, res) => {
  const reqId = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  // validation
  const index = jsonData.findIndex(({ id }) => id == reqId); // return true if found, false if not
  // console.log(index);
  if (index >= 0) {
    jsonData[index].name = name;
    jsonData[index].email = email;
    fs.writeFileSync(employeeJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Update successfully.`,
    });
  } else {
    res.status(404).json({ status: 404, message: `Id: ${reqId} Not found.` });
  }
};

export const deleteEmployeeByIdController = (req, res) => {
  const reqId = req.params.id;
  // validation
  const index = jsonData.findIndex(({ id }) => id == reqId); // return true if found, false if not
  // console.log(index);
  if (index >= 0) {
    jsonData.splice(result, 1);
    fs.writeFileSync(employeeJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Delete successfully.`,
    });
  } else {
    res.status(404).json({ status: 404, message: `Id: ${reqId} Not found.` });
  }
};
