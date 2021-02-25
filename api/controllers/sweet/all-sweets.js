module.exports = {


  friendlyName: 'All sweets',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      description: 'Retrieved all sweets successfully'
    }

  },


  fn: async function (_, exits) {

    const sweets = await Sweet.find().populate('author').sort('createdAt DESC')

    return exits.success({success: true, sweets})

  }


};
