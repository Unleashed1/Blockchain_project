// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function makePayment(address payable recipient) external payable onlyOwner {
        require(recipient != address(0), "Invalid recipient address");
        require(msg.value > 0, "Payment amount must be greater than 0");

        // Transfer the payment to the recipient
        recipient.transfer(msg.value);
    }
}
