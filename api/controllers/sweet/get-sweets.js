module.exports = {


  friendlyName: 'Get sweets',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      description: 'Sweets retrieved successfully'
    }
  },
  fn: async function (_, exits) {
    const sweets = await Sweet.find().populate('author').sort('createdAt DESC')
    return exits.success({ success: true, sweets })
  }
};
