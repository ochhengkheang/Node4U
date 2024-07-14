export const customCloudinaryResponseParser = (cloudinaryResponse) => {
  let message;
  let code;

  switch (cloudinaryResponse.result) {
    case "not found":
      code = 404;
      message = "Image not found.";
      break;

    case "ok":
      code = 201;
      message = "Image Delete Successfully";
      break;

    default:
      code = 500;
      message = cloudinaryResponse.result
        ? `Internal Sever error. Hint: ${cloudinaryResponse.result}`
        : "Internal Sever error";
  }

  return { code, message };
};
