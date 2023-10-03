const PaymentContract = artifacts.require("PaymentContract");
const StringManagement = artifacts.require("StringManagement");

module.exports = function (deployer) {
  deployer.deploy(PaymentContract);
  deployer.deploy(StringManagement);
};
