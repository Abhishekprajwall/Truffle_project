## Smart Contract with Truffle Assignment

### Installation and Contract creation

- Install truffle
```sh
npm install truffle -g
```
- Create default project structure
```sh
npm init
```
- Create Helloworld contract inside contract directory
```sh
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Helloworld {
  function hello() public pure returns (string memory) {
    return "hello world";
  }
}
```
- Compile the contracts
```sh
truffle compile //generte build
```
- For performing migrations we need to run
```sh
truffle develop
```
- Run this command to migrate
```sh
migrate
```
- Interact with the deployed contract using console
```sh
truffle(develop)> let instance = await Helloworld.deployed()
undefined
truffle(develop)> instance.hello()
'hello world'
truffle(develop)> 
```

## Migration and Deployment of the contract

- Make modification inside Helloworld contract by adding a constructor and setMessage

```sh
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Helloworld {
    string public message;
  // construction
  constructor(string memory _message){
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
```
- Add default value to set using constructor
```sh
const Helloworld = artifacts.require("Helloworld");
module.exports = function(deployer) {
  deployer.deploy(Helloworld,"set value using constructor");
};
```
- Deploy and interact with the contract.
```sh
truffle(develop)> let instance = await Helloworld.deployed()
undefined
truffle(develop)> instance.hello()
'set value using constructor'
truffle(develop)> instance.setMessage("new value",{from: accounts[0]})
```

### Interaction between the contract
- Create a new contract ie. HelloworldPermanent
```sh
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
contract HelloworldPermanent {
    string public message;
  // construction
  constructor(string memory _message){
    message = _message;
  }
}
```
- Update migrations
```sh
const Helloworld = artifacts.require("Helloworld");
const HelloworldPermanent = artifacts.require("HelloworldPermanent");

module.exports = function(deployer) {
  deployer.deploy(Helloworld,"set value using constructor").then(async ()=>{
    let instance = await Helloworld.deployed();
    let message = instance.message();
    // deploy HelloworldPermanent and pass message to it get from Helloworld
    return deployer.deploy(HelloworldPermanent,message);
  })
};
```

## Testing contract
- Create test files for Helloworld and HelloworldPermanent contract
- Run test cases
```sh
truffle test
```
```sh
> Compiled successfully using:
   - solc: 0.8.17+commit.8df45f5f.Emscripten.clang
  Contract: HelloworldPermanent
    ✔ test constructor
  Contract: Helloworld
    ✔ test constructor
    ✔ owner verify (64ms)
    ✔ verify set message method inside constact (69ms)
  4 passing (259ms)
```

## Deployment on testnet
Note: In lecture we have used ropsten testnet network but that has been deprecated now. Hence using geroli testnet for deployment and testing.
- Install @truffle/hdwallet-provider
- Generate mnemonic and test on testnet network
- Interact with the deployed contracts
