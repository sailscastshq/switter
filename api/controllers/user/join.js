module.exports = {


  friendlyName: 'Join',


  description: 'Join user.',


  inputs: {

    name: {
      type: 'string',
      example: 'Mike McNeil'
    },

    email: {
      type: 'string',
      example: 'mikemcneil@example.com'
    },

    password: {
      type: 'string',
      example: 'verysecurepassword'
    }

  },


  exits: {

    success: {
      statusCode: 201,
      description: 'New switter user created'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email is already in use by a switter user.'
    },
    badRequest: {
      statusCode: 400,
      description: 'Missing or invalid parameters'
    }

  },


  fn: async function ({name, email, password}, exits) {
    try {

      const user = await User.create({
        name,
        email,
        password
      })
        .fetch()

      return exits.success({success: true, user})

    } catch (error) {

      if (error.code === 'E_UNIQUE') {

        return exits.emailAlreadyInUse({success: false, message: 'The provided email is already in use by a switter user.'})

      } else if (error.name === 'UsageError') {

        return exits.badRequest({success: false, message: 'Missing or invalid inputs'})

      }
    }
  }


};
