module.exports = {


  friendlyName: 'Index',


  description: 'Index home.',


  inputs: {

  },


  exits: {
    success: {
      description: 'Show endpoint message'
    }
  },


  fn: async function (inputs, exits) {

    return exits.success({message: 'Welcome to Switter. We are like Twitter but Sweeter :)'});

  }


};
