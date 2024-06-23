const selector = async (req, res, next) => {
try {
  const role = req.role
  console.log("selector", role);
  // if(role !== 'admin') throw new Error('not admin');

next()
} catch (error) {
  console.log(error);
  return res.status(401).json({
    message: "invalid role",
    success: false,
  });
}
}

module.exports = selector