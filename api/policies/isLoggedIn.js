module.exports = function (req, res, proceed) {

  if (req.session.userId) return proceed()

  res.status(403).json({ success: false, message: 'Not authenticated'})
}
