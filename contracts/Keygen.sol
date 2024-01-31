// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract definition
contract Keygen {
    // Function to generate Keccak-256 hash from a string
    function generateKeccak256(string memory input) public pure returns (bytes32) {
        // Convert the string to bytes and calculate the Keccak-256 hash
        return keccak256(abi.encodePacked(input));
    }

    function bytes32ToString(bytes32 data) public pure returns (string memory) {
        bytes memory bytesString = new bytes(32);
        for (uint256 i = 0; i < 32; i++) {
            bytes1 char = bytes1(bytes32(uint256(data) * 2 ** (8 * i)));
            bytesString[i] = char;
        }
        return string(bytesString);
    }
}
