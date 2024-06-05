const jwtAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) throw new Error("must log in for this action");

    const validToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!validToken) throw new Error("token is not valid");

    return res.status(200).json({
      message: "You have a valid token",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
  next();
};

module.exports = jwtAuth;