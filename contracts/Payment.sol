// Payment.sol
pragma solidity ^0.8.0;

contract Payment {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function makePaymentTo(address payable _receiver) external payable {
        require(msg.value > 0, "Insufficient funds");
        _receiver.transfer(msg.value);
    }
}
