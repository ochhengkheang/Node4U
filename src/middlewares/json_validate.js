export const validateJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // JSON parsing error
    res.status(400).json({ error: "Invalid JSON format. Check your syntax." });
  } else {
    next();
  }
};
