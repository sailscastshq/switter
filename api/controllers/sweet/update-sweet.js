module.exports = {
  friendlyName: 'Update sweet',
  description: '',
  inputs: {
    sweet: {
      type: 'number',
      isInteger: true,
      required: true
    },
    text: {
      type: 'string',
      required: true
    }
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
    const sweetToUpdate = await Sweet.findOne({ id });

    if (!sweetToUpdate) {return exits.sweetNotFound({success: false, message: 'Sweet with the provided ID was not found on switter'});}
    else if (sweetToUpdate.author !== this.req.session.userId) { return exits.notAuthorized({success: false, message: 'You are not authorized for this operation'}); }

    const updatedSweet = await Sweet.updateOne({ id }).set({
      text
    });

    return exits.success({success: true, updatedSweet});
  }


};
