import fs from "fs";
import { categoryJsonDataPath } from "../utils/file.js";

const jsonData = JSON.parse(fs.readFileSync(categoryJsonDataPath, "utf-8"));
// console.log(jsonData);

export const getCategoryController = (req, res) => {
  res.status(200).json(jsonData);
};
export const postCategoryController = (req, res) => {
  const reqId = req.body.id;
  const result = jsonData.some(({ id }) => id === reqId);
  //   console.log(`Result: ${result}`);
  if (result) {
    res.status(409).json({
      status: 409,
      message: `Id: ${reqId} already exists.`,
    });
  } else {
    const reqBody = req.body;
    jsonData.push(reqBody);
    fs.writeFileSync(categoryJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  }
};
export const getCategoryByIdController = (req, res) => {
  const paramId = req.params.id;
  const result = jsonData.find(({ id }) => id == paramId);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ status: 404, message: `Id: ${paramId} Not found.` });
  }
};
export const putCategoryByIdController = (req, res) => {
  const paramId = req.params.id;
  const reqLabel = req.body.label;
  const reqDescription = req.body.description;
  const index = jsonData.findIndex(({ id }) => id == paramId);
  // console.log(index);
  if (index >= 0) {
    jsonData[index].name = reqName;
    jsonData[index].description = reqDescription;
    fs.writeFileSync(categoryJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Update successfully.`,
    });
  } else {
    res.status(404).json({ status: 404, message: `Id: ${paramId} Not found.` });
  }
};
export const patchCategoryByIdController = (req, res) => {
  const paramId = req.params.id;
  const reqName = req.body.name;
  const reqDescription = req.body.description;
  const index = jsonData.findIndex(({ id }) => id == paramId);
  if (index >= 0) {
    jsonData[index].name =
      reqName === undefined ? jsonData[index].name : reqName;
    jsonData[index].description =
      reqDescription === undefined
        ? jsonData[index].description
        : reqDescription;
    fs.writeFileSync(categoryJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Patch successfully.`,
    });
  } else {
    res.status(404).json({ status: 404, message: `Id: ${paramId} Not found.` });
  }
};

export const deleteCategoryByIdController = (req, res) => {
  const paramId = req.params.id;
  const index = jsonData.findIndex(({ id }) => id == paramId);
  if (index >= 0) {
    jsonData.splice(index, 1);
    fs.writeFileSync(categoryJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Delete successfully.`,
    });
  } else {
    res.status(404).json({ status: 404, message: `Id: ${paramId} Not found.` });
  }
};
