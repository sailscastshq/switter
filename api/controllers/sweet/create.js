module.exports = {


  friendlyName: 'Create',


  description: 'Create sweet.',


  inputs: {
    text: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'Sweet posted successfully'
    },
  },


  fn: async function ({ text }, exits) {
   try {
     const sweet = await Sweet.create({
       text,
       author: this.req.session.userId
     }).fetch()
     return exits.success({ success: true, sweet })
   } catch (error) {
     sails.log(error)
     return exits.error({success: false, message: error.message })
   }

  }


};
