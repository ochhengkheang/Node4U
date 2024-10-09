// Duplicated value from database
// The primary key of that value doesn't exist, so can't push foreign key.

export const customPgException = (pgError) => {
  let message;
  let code;
  switch (pgError.code) {
    case "23505":
      const uniqueViolationMatch = pgError.detail.match(
        /Key \((\w+)\)=\((.+)\) already exists./
      );

      if (uniqueViolationMatch) {
        const [_, column, value] = uniqueViolationMatch;
        message = `The value '${value}' for '${column}' already exists.`;
      } else {
        message = "Value already exists.";
      }

      code = 409;
      break;

    case "23503":
      const foreignKeyViolationMatch = pgError.detail.match(
        /Key \((\w+)\)=\((.+)\) is not present in table "(\w+)"/
      );

      if (foreignKeyViolationMatch) {
        const [_, column] = foreignKeyViolationMatch;
        message = `The value for '${column}' is not found.`;
      } else {
        message = "Value not found.";
      }

      code = 404;
      break;

    case "22P02":
      code = 400;
      message = "Invalid input. Check if you have input the valid information.";
      break;

    case "ECONNREFUSED":
      code = 500;
      message = "Connection refused to the server. Server problem, not client.";
      break;

    case "42601":
      code = 400;
      message =
        "Invalid query, check your query if it is valid. Hint: Check syntax.";
      break;

    case "42703":
      code = 404;
      message = pgError.message;

    case "08P01":
      code = 400;
      message = pgError.message;
      break;

    default:
      code = 500;
      message = pgError.message
        ? `Internal Sever error. Hint: ${pgError.message}`
        : "Internal Sever error";
  }
  console.log(pgError);
  const error = new Error(message);
  error.code = code;
  return error;
};

export const customCloudinaryException = (cloudinaryError) => {
  let message;
  let code;
  console.log(cloudinaryError);
  switch (cloudinaryError.error.message) {
    default:
      code = cloudinaryError.error.http_code ?? 500;
      message = cloudinaryError.error.message
        ? `Internal Sever error. Hint: ${cloudinaryError.error.message}`
        : "Internal Sever error";
  }
  const error = new Error(message);
  error.code = code;
  return error;
};
