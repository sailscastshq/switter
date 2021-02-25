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
      description: 'User logged in to switter successfully'
    },
    badRequest: {
      statusCode: 400,
      description: 'User with the provided email does not exist on switter'
    }

  },


  fn: async function ({email, password}, exits) {

    try {

      const user = await User.findOne({email}).decrypt();

      if (!user || (user.password !== password || user.email !== email)) {

        return exits.badRequest({success: false, message: 'Login credentials combination is invalid'});

      }


      this.req.session.userId = user.id;

      return exits.success({success: true, user});
    } catch (error) {

      sails.log(error);

      return exits.error({success: false, message: error.message});

    }

  }

};
