const Payment_Contract = artifacts.require("PaymentContract");

module.exports = function(deployer){
    deployer.deploy(Payment_Contract);

};
