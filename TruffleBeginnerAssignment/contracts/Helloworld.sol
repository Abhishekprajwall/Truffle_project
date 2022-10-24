// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Helloworld {
    string public message;
    address public owner;
  // construction
  constructor(string memory _message){
    owner = msg.sender;
    message = _message;
  }
  function hello() public view returns (string memory) {
    return message;
  }
  function setMessage(string memory _message) public {
    // add condition to check that it should perform setMessage only if the msg sender is the owner
    message = _message;
  }
}
