import jwt from "jsonwebtoken";

export const errorHandler = (err, req, res, next) => {
  const defaultMessage =
    " sorry we are facing a tachnical issue , try again later";
  const { status, message, error } = err;
  if (error) {
    console.log(error);
  }
  res.status(status).json({ message: message || defaultMessage });
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.dirni_token;

  if (!token) {
    return next({ status: 401, message: "you are not authorized" });
  }
  jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
    if (err) return next({ status: 403, message: "forbidden" });
    req.user = user;
    next();
  });
};
