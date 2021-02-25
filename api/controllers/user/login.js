module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Successfully logged in a switter use'
    },
    badRequest: {
      statusCode: 400,
      description: 'Login credentials combination does not match any record'
    }
  },


  fn: async function ({ email, password }, exits) {
    try {
      const user = await User.findOne({ email }).decrypt();
      if (!user || (user.email !== email || user.password !== password)) {
        return exits.badRequest({ success: false, message: 'Login credentials does not match any record'});
      }
      this.req.session.userId = user.id;
      return exits.success({ success: true, user });
    } catch (error) {
      sails.log(error);
      return exits.error({ success: false, message: error.message });
    }


    // All done.
    return;

  }


};
