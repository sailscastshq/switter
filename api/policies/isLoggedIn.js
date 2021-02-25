module.exports = async function (req, res, proceed) {

  if (req.session.userId) {
    return proceed()
  }

  return res.status(403).json({success: false, message: 'User is not authenticated'})

}
