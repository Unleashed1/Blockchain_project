const Payment_Contract = artifacts.require("PaymentCOntract");

module.exports = function(deployer){
    deployer.deploy(Payment_Contract);

};
