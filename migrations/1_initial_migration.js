const Charity = artifacts.require("Charity");
const Token = artifacts.require("Token")

module.exports = async function (deployer) {

    // const token = await deployer.deploy(Token);

     await  deployer.deploy(Charity, "0x1313Ef117B24a3140C6C7B3744AB0608C37424Dd");
};
