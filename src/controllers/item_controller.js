import fs from "fs";
import { itemJsonDataPath } from "../utils/file.js";

const jsonData = JSON.parse(fs.readFileSync(itemJsonDataPath, "utf-8"));
// console.log(jsonData);

export const getItemController = (req, res) => {
  const queryName = req.query.name;
  if (queryName === undefined) {
    return res.status(200).json(jsonData); // early return
  }

  const categoryQuery = req.query.category;
  // console.log(categoryQuery);

  const results = jsonData.filter((item) =>
    item.name.toLowerCase().includes(queryName.toLowerCase())
  );

  if (categoryQuery == "" || categoryQuery == undefined) {
    return res.status(200).json(results);
  }

  const finalResults = results.filter((item) =>
    item.categoryId.toLowerCase().includes(categoryQuery.toLowerCase())
  );
  res.status(200).json(finalResults);
  // console.log("Final Result:", finalResults);
};

export const postItemController = (req, res) => {
  /// Validation
  console.log(req.body);

  /// Operation
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
    fs.writeFileSync(itemJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  }
};
export const getItemByIdController = (req, res) => {
  const paramId = req.params.id;
  const result = jsonData.find(({ id }) => id == paramId);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ status: 404, message: `Id: ${paramId} Not found.` });
  }
};
export const putItemByIdController = (req, res) => {
  const paramId = req.params.id;
  const reqName = req.body.name;
  const reqCategoryId = req.body.categoryId;
  const reqPrice = req.body.price;
  const index = jsonData.findIndex(({ id }) => id == paramId);
  // console.log(index);
  if (index >= 0) {
    jsonData[index].name = reqName;
    jsonData[index].categoryId = reqCategoryId;
    jsonData[index].price = reqPrice;
    fs.writeFileSync(itemJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Update successfully.`,
    });
  } else {
    res.status(404).json({ status: 404, message: `Id: ${paramId} Not found.` });
  }
};
export const patchItemByIdController = (req, res) => {
  const paramId = req.params.id;
  const reqName = req.body.name;
  const reqCategoryId = req.body.categoryId;
  const reqPrice = req.body.price;
  const index = jsonData.findIndex(({ id }) => id == paramId);
  if (index >= 0) {
    jsonData[index].name =
      reqName === undefined ? jsonData[index].name : reqName;
    jsonData[index].categoryId =
      reqCategoryId === undefined ? jsonData[index].categoryId : reqCategoryId;
    jsonData[index].price =
      reqPrice === undefined ? jsonData[index].price : reqPrice;
    fs.writeFileSync(itemJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Patch successfully.`,
    });
  } else {
    res.status(404).json({ status: 404, message: `Id: ${paramId} Not found.` });
  }
};
export const deleteItemByIdController = (req, res) => {
  const paramId = req.params.id;
  const index = jsonData.findIndex(({ id }) => id == paramId);
  if (index >= 0) {
    jsonData.splice(index, 1);
    fs.writeFileSync(itemJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Delete successfully.`,
    });
  } else {
    res.status(404).json({ status: 404, message: `Id: ${paramId} Not found.` });
  }
};
