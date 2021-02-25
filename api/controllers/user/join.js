module.exports = {


  friendlyName: 'Join',


  description: 'Join user.',


  inputs: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'Successfully created new switter user'
    },
    emailAlreadyInUse: {
      statusCode: 409,
      description: 'Email already in use in switter. Try another'
    },
    badRequest: {
      statusCode: 400,
      description: 'Invalid or missing parameters'
    }
  },


  fn: async function ({ name, email, password }, exits) {
    try {
      const newUser = await User.create({
        name,
        email,
        password
      }).fetch();

      return exits.success({ success: true, user: newUser });
    } catch (error) {
      sails.log(error);
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({ success: false, message: 'This email is already in use'});
      } else if (error.name === 'UsageError') {
        return exits.badRequest({ success: false, message: 'Missing or invalid parameters'});
      }
      return exits.error({success: false, message: error.message});
    }

  }


};
