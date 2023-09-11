// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StringManagement {
    // Declare a state variable to store the list of strings
    string[] public stringList;

    // Function to add or update a string at a specific index
    function setStringAtIndex(uint256 index, string memory newString) public {
        require(index < stringList.length, "Index out of bounds");

        // Update the string at the specified index
        stringList[index] = newString;
    }

    // Function to delete a string at a specific index
    function deleteStringAtIndex(uint256 index) public {
        require(index < stringList.length, "Index out of bounds");

        // Shift elements to the left to remove the string at the specified index
        for (uint256 i = index; i < stringList.length - 1; i++) {
            stringList[i] = stringList[i + 1];
        }

        // Remove the last element (duplicate)
        stringList.pop();
    }

    // Function to retrieve the total count of strings in the list
    function getStringCount() public view returns (uint256) {
        return stringList.length;
    }

    // Function to retrieve a string by its index
    function getStringByIndex(uint256 index) public view returns (string memory) {
        require(index < stringList.length, "Index out of bounds");
        return stringList[index];
    }

    // Function to add a new string to the end of the list
    function addString(string memory newString) public {
        stringList.push(newString);
    }
}
