const Helloworld = artifacts.require('Helloworld')

contract("Helloworld", accounts => {
    // test cases
    it("test constructor", async ()=>{
        let instance = await Helloworld.deployed();
        let message = await instance.message();
        assert.equal(message, "set value using constructor");
    })
    it("owner verify",async ()=>{
        let instance = await Helloworld.deployed();
        let owner = await instance.owner();
        assert.equal(owner, accounts[0]);
    })
    it("verify set message method inside constact",async ()=>{
        let setMessageInput = "new message usign set message method";
        let instance = await Helloworld.deployed();
        // set new message
        await instance.setMessage(setMessageInput);
        let message = await instance.message();
        assert.equal(message, setMessageInput);
    })
})