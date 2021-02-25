module.exports = {


  friendlyName: 'Get sweet',


  description: '',


  inputs: {
    sweet: {
      type: 'number',
      isInteger: true,
      required: true
    }
  },


  exits: {
    success: {
      description: 'Successfully retrieved a sweet'
    },
    sweetNotFound: {
      statusCode: 404,
      description: 'Sweet not found'
    }
  },


  fn: async function ({ sweet: id }, exits) {
    const sweet = await Sweet.findOne({ id }).populate('author')
    if (!sweet) return exits.sweetNotFound({ success: false, message: 'Sweet not found'})
    return exits.success({ success: true, sweet })
  }


};
