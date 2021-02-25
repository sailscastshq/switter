module.exports = {


  friendlyName: 'Create comment',


  description: '',


  inputs: {

    text: {
      type: 'string',
      required: true
    },
    sweet: {
      type: 'number',
      isInteger: true,
      required: true
    }

  },


  exits: {
    success: {
      statusCode: 201,
      description: 'Comment posted successfully'
    }

  },


  fn: async function ({text, sweet}, exits) {
    try {

      const comment = await Sweet.create({
        text,
        sweet,
        author: this.req.session.userId
      }).fetch()

      return exits.success({success: true, comment})
    } catch (error) {

      sails.log(error)

      return exits.error({success: false, message: error.message})

    }
  }


};
