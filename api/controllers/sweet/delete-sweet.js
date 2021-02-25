module.exports = {


  friendlyName: 'Delete sweet',


  description: '',


  inputs: {
    sweet: {
      type: 'number',
      required: true,
      isInteger: true
    },
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


  fn: async function ({ sweet: id }, exits) {
    const sweetToDelete = await Sweet.findOne({ id })

    if (!sweetToDelete) return exits.sweetNotFound({ success: false, message: 'Sweet not found'})
    else if (sweetToDelete.author !== this.req.session.userId) {
      return exits.notAuthorized({ success: false, message: 'Not authorized '})
    }

    const deletedSweet = await Sweet.destroy({ id }).fetch()

    return exits.success({ success: true, deletedSweet})

  }


};
