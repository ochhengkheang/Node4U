import { config } from "../config/config.js";
import { addressesJsonDataPath } from "../utils/file.js";
import { getClientIP } from "../utils/ip.js";
import fs from "fs";

const jsonData = JSON.parse(fs.readFileSync(addressesJsonDataPath, "utf-8"));
// console.log(jsonData);

export const getAddressController = (req, res) => {
  try {
    const clientIP = getClientIP(req);

    const addresses = jsonData;

    return res.render("pages/address.pug", {
      googleMapApiKey: config.googleMapApiKey,
      clientIP: clientIP,
      addresses,
    });
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/notfound");
  }
};

export const postAddressController = (req, res) => {
  const placeIdRequest = req.body.place_id;
  const result = jsonData.some(({ place_id }) => place_id === placeIdRequest); // return true if found, false if not
  // console.log(result);
  if (result) {
    return res.status(409).json({
      status: 409,
      message: `This place: ${req.body.name} is already exists.`,
    });
  } else {
    const requestData = JSON.parse(JSON.stringify(req.body));
    jsonData.push(requestData);
    fs.writeFileSync(addressesJsonDataPath, JSON.stringify(jsonData));
    return res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  }
};

export const patchAddressByIdController = (req, res) => {
  const paramPlaceId = req.params.id;
  const reqUserId = req.body.user_id;
  const reqLabel = req.body.label;
  const reqLat = req.body.lat;
  const reqLng = req.body.lng;
  const reqName = req.body.name;
  const reqLink = req.body.link;
  const index = jsonData.findIndex(({ place_id }) => place_id == paramPlaceId);
  if (index >= 0) {
    jsonData[index].label =
      reqLabel === undefined ? jsonData[index].label : reqLabel;
    fs.writeFileSync(addressesJsonDataPath, JSON.stringify(jsonData));
    return res.status(201).json({
      status: 201,
      message: `Update successfully.`,
    });
  } else {
    return res.status(404).json({
      status: 404,
      message:
        reqName == undefined
          ? `Failed to update. Please check if you have submit the right information.`
          : `This place: ${reqName} not found.`,
    });
  }
};

export const deleteAddressByIdController = (req, res) => {
  const paramPlaceId = req.params.id;
  const index = jsonData.findIndex(({ place_id }) => place_id == paramPlaceId);
  if (index >= 0) {
    jsonData.splice(index, 1);
    fs.writeFileSync(addressesJsonDataPath, JSON.stringify(jsonData));
    res.status(201).json({
      status: 201,
      message: `Delete successfully.`,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: `Place Not found.`,
    });
  }
};
