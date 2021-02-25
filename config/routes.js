/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /': 'home/index',

  'POST /users': 'user/join',

  'POST /users/login': 'user/login',

  'POST /sweets': 'sweet/create',

  'GET /sweets': 'sweet/get-sweets',

  'GET /sweets/:sweet': 'sweet/get-sweet',

  'PATCH /sweets/:sweet': 'sweet/update-sweet',

  'DELETE /sweets/:sweet': 'sweet/delete-sweet',

  'POST /sweets/:sweet/comments': 'sweet/create-comment'
};
