// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization").replace("Bearer ", " ");
//   // const token = req.headers.authorization.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ msg: "No token, authorization denied" });
//   }
//   console.log(token);
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     req.user = decoded.user;

//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check if the Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Remove 'Bearer ' from the header value to get the token
    // const token = req.header("Authorization").replace("Bearer ", " ");
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    // console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
