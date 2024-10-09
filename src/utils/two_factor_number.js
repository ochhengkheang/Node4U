import crypto from "crypto";

const generateSecureVerificationCode = () => {
  return crypto.randomInt(100000, 1000000).toString();
};
