const Payment = artifacts.require("Payment");
//const StringManagement = artifacts.require("StringManagement");

module.exports = function (deployer) {
  deployer.deploy(Payment);
  //deployer.deploy(StringManagement);
};
