const HelloworldPermanent = artifacts.require('HelloworldPermanent')

contract("HelloworldPermanent", accounts => {
    // test cases
    it("test constructor", async ()=>{
        let instance = await HelloworldPermanent.deployed();
        let message = await instance.message();
        assert.equal(message, "set value using constructor");
    })
})