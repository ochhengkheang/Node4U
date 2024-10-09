import { config } from "../config/config.js";
import { deleteAImageQuery } from "../database/pg/query/pg_query_image.js";
import {
  deleteAPlaceQuery,
  getAPlaceFilteredByIdQuery,
  getPlacesFilteredAutoQuery,
  postAPlaceQuery,
  putAPlaceQuery,
} from "../database/pg/query/pg_query_place.js";
import { deleteImage } from "../helpers/cloudinary.js";
import { getClientIP } from "../helpers/ip.js";

export const getPlaceController = async (req, res) => {
  try {
    const clientIP = getClientIP(req);

    const clientEnv = {
      baseUrl: config.mainConfig.baseUrl,
      googleMapApiKey: config.apiConfig.googleMapApiKey,
      clientIP: clientIP,
    };

    const { name, label, address, user_id, offset, limit } = req.query;

    const places = await getPlacesFilteredAutoQuery(
      name,
      label,
      address,
      user_id,
      offset,
      limit
    );

    return res.render("pages/place.pug", {
      clientEnv,
      places,
      nonce: res.locals.nonce,
    });
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/notfound");
  }
};

export const getPlaceByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await getAPlaceFilteredByIdQuery(id);

    if (address.length > 0) {
      res.status(200).json(address);
    } else {
      res.status(404).json({ status: 404, message: `Place not found.` });
    }
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const postPlaceController = async (req, res) => {
  try {
    const {
      user_id,
      place_id,
      lat,
      lng,
      label,
      name,
      address,
      link,
      image_id,
    } = req.body;

    await postAPlaceQuery(
      user_id,
      place_id,
      lat,
      lng,
      label,
      name,
      address,
      link,
      image_id
    );

    return res.status(201).json({
      status: 201,
      message: `Add successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const putPlaceByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      user_id,
      place_id,
      lat,
      lng,
      label,
      name,
      address,
      link,
      image_id,
    } = req.body;

    const addressResult = await getAPlaceFilteredByIdQuery(id);

    if (addressResult.length <= 0) {
      return res.status(404).json({
        status: 404,
        message: `Place Not found.`,
      });
    }

    if (user_id != addressResult[0].user.user_id) {
      return res.status(401).json({
        status: 401,
        message: `Unauthorized`,
      });
    }

    await putAPlaceQuery(
      lat,
      lng,
      label,
      name,
      address,
      link,
      image_id,
      !place_id ? addressResult[0].place_id : place_id,
      user_id
    );

    return res.status(201).json({
      status: 201,
      message: `Update successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const patchPlaceByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      user_id,
      place_id,
      lat,
      lng,
      label,
      name,
      address,
      link,
      image_id,
    } = req.body;

    const addressResult = await getAPlaceFilteredByIdQuery(id);

    if (addressResult.length <= 0) {
      return res.status(404).json({
        status: 404,
        message: `Place Not found.`,
      });
    }

    // if (user_id != addressResult[0].user.user_id) {
    //   return res.status(401).json({
    //     status: 401,
    //     message: `Unauthorized`,
    //   });
    // }

    await putAPlaceQuery(
      !lat ? addressResult[0].lat : lat,
      !lng ? addressResult[0].lng : lng,
      !label ? addressResult[0].label : label,
      !name ? addressResult[0].name : name,
      !address ? addressResult[0].address : address,
      !link ? addressResult[0].link : link,
      !image_id ? addressResult[0].image.image_id : image_id,
      !place_id ? addressResult[0].place_id : place_id,
      !user_id ? addressResult[0].user.user_id : user_id
    );
    return res.status(201).json({
      status: 201,
      message: `Update successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};

export const deletePlaceByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    //Todo: Get user id authentication
    const user_id = 1; // mock data

    const address = await getAPlaceFilteredByIdQuery(id);

    if (address.length <= 0) {
      return res.status(404).json({
        status: 404,
        message: `Place Not found.`,
      });
    }

    if (user_id != address[0].user.user_id) {
      return res.status(401).json({
        status: 401,
        message: `Unauthorized`,
      });
    }

    await deleteAPlaceQuery(id, user_id);

    // await deleteAImageQuery(address[0].image.image_id);

    // await deleteImage(id, "places");

    res.status(201).json({
      status: 201,
      message: `Delete successfully.`,
    });
  } catch (error) {
    res.status(error.code ?? 500).json({ message: error.message });
  }
};
