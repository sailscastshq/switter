module.exports = {


  friendlyName: 'Delete sweet',


  description: '',


  inputs: {
    sweet: {
      type: 'number',
      isInteger: true,
      required: true
    },
  },


  exits: {
    success: {
      statusCode: 200,
      description: 'Sweet updated successfully'
    },
    sweetNotFound: {
      statusCode: 404,
      description: 'Sweet not found'
    },
    notAuthorized: {
      statusCode: 403,
      description: 'Not authorized for this operation'
    }
  },


  fn: async function ({sweet: id, text}, exits) {
    const sweetToDelete = await Sweet.findOne({ id });

    if (!sweetToDelete) {return exits.sweetNotFound({success: false, message: 'Sweet with the provided ID was not found on switter'});}
    else if (sweetToDelete.author !== this.req.session.userId) { return exits.notAuthorized({success: false, message: 'You are not authorized for this operation'}); }

    const deletedSweet = await Sweet.destroyOne({ id });

    return exits.success({success: true, deletedSweet});

  }


};
