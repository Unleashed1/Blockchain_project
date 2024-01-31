const Keygen = artifacts.require("Keygen");

module.exports = function (deployer) {
  deployer.deploy(Keygen);
};
