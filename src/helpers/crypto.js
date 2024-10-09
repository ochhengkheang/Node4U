import crypto from "crypto";

const generateJwtSecret = () => {
  const jwtSecret = crypto.randomBytes(64).toString("hex");
  console.log(jwtSecret);
};

generateJwtSecret();
