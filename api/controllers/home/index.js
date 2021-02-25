module.exports = {

  friendlyName: 'Index',

  description: 'Index home.',

  inputs: {

  },


  exits: {
    success: {
      description: 'Successfully reached root endpoint'
    }

  },


  fn: async function (inputs, exits) {
    return exits.success({message: 'You\'ve reached the switter API. We are like twitter but sweeter'});

  }


};
