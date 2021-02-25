module.exports = {


  friendlyName: 'Update sweet',


  description: '',


  inputs: {
    sweet: {
      type: 'number',
      required: true,
      isInteger: true
    },
    text: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Sweet updated'
    },
    sweetNotFound: {
      statusCode: 404,
      description: 'Sweet not found'
    },
    notAuthorized: {
      statusCode: 403,
      description: 'Can not update sweet'
    }
  },


  fn: async function ({ sweet: id, text }, exits) {
    const sweetToUpdate = await Sweet.findOne({ id })

    if (!sweetToUpdate) {
      return exits.sweetNotFound({success: false, message: 'Sweet not found'})
    } else if (sweetToUpdate.author !== this.req.session.userId) {
      return exits.notAuthorized({ success: false, message: 'Not authorized for this action'})
    }

    const updatedSweet = await Sweet.updateOne({ id }).set({
      text
    })

    return exits.success({success: true, updatedSweet})

  }


};
