const jwt = require("jsonwebtoken");

const jwtAuth = async (req, res, next) => {

  // console.log('middlwer');
  try {
    
    const token = req.cookies.token;
    // console.log(token);
    if (!token) throw new Error("must log in for this action");

    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('validToken',validToken);

    if (!validToken) throw new Error("token is not valid");

    const payload =  { id: validToken.id, role: validToken.role };
    
    req.role = payload.role
    // console.log(payload);
    const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 3,
    });
    // console.log(newToken);
    res.cookie("token", newToken, {
      maxAge: 1000 * 60 * 60 * 3,
      httpOnly: true,
    });

    
    // return res.status(200).json({
      //   message: "You have a valid token",
      //   success: true,
      // });
      next();
  } catch (error) {
    return res.status(401).json({
      message: "invalid token",
      success: false,
    });
  }
};

module.exports = jwtAuth;
