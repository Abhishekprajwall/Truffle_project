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