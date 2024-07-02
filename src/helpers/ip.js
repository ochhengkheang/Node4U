export const getClientIP = (request) => {
  let ip =
    request.headers["x-forwarded-for"] ||
    request.connection.remoteAddress ||
    request.socket.remoteAddress ||
    request.connection.socket.remoteAddress;
  ip = ip.split(",")[0];
  ip = ip.split(":").slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"

  if (ip === "::1") {
    ip = "127.0.0.1"; // Handle IPv6 loopback address
  }
  return ip;
};
