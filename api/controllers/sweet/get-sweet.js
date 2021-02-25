module.exports = {
  inputs: {
    sweet: {
      type: 'number',
      isInteger: true,
      required: true
    }
  },
  exits: {
    success: {
      description: 'Successfully retrieved sweet'
    },
    sweetNotFound: {
      statusCode: 404,
      description: 'Sweet not found'
    }
  },
  fn: async function ({sweet: id}, exits) {
    const sweet = await Sweet.findOne({ id }).populate('author');
    if (!sweet) {return exits.sweetNotFound({success: false, message: 'Sweet with the provided ID was not found on switter'});}
    return exits.success({success: true, sweet});
  }
};
