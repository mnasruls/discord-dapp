const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("discord-dapp", () => {
  let dappcord
  let deployer
  let addr1
  let addr2

  beforeEach(async () => {
    [deployer, addr1, addr2] = await ethers.getSigners()

    // Deploy DiscordDapp contract
    const Dappcord = await ethers.getContractFactory("DiscordDapp")
    dappcord = await Dappcord.deploy("Dappcord", "DAPP", { gasLimit: 6000000 })
    await dappcord.deployed()

    // Get signers
    const tx = await dappcord.connect(deployer).createChannel("General", tokens(1), { gasLimit: 3000000 })
    await tx.wait()
  })
  
  describe("Deployment", () => {
    it("Sets the name", async () => {
      expect(await dappcord.name()).to.equal("Dappcord")
    })
    it("Sets the symbol", async () => {
      expect(await dappcord.symbol()).to.equal("DAPP")
    })
    it("Sets the owner", async () => {
      expect(await dappcord.owner()).to.equal(deployer.address)
    })
  })

  describe("Get Channel", () => {
    it("Returns the channel", async () => {
      const channel = await dappcord.connect(deployer).getChannel(1)
      expect(channel.id).to.equal(1)
      expect(channel.name).to.equal("General")
      expect(channel.cost).to.equal(tokens(1))
    })
  })

  describe("Mint", () => {
    const id = 1
    const cost = ethers.utils.parseUnits("1", 'ether')
    
    beforeEach(async () => {
      const tx = await dappcord.connect(addr1).mint(id, { value: cost })
      await tx.wait()
    })

    it("Updates totalSupply", async () => {
      expect(await dappcord.totalSupply()).to.equal(1)
    })
    it("Updates hasJoined", async () => {
      expect(await dappcord.hasJoined(id, addr1.address)).to.equal(true)
    })
    it("Updates contract balance", async () => {
      expect(await ethers.provider.getBalance(dappcord.address)).to.equal(cost)
    })
  })

  describe("Withdraw", () => {
    const id = 1
    const cost = ethers.utils.parseUnits("1", 'ether')
    
    beforeEach(async () => {
      let tx = await dappcord.connect(addr1).mint(id, { value: cost })
      await tx.wait()

      tx = await dappcord.connect(deployer).withdraw()
      await tx.wait()
    })

    it("Updates contract balance", async () => {
      expect(await ethers.provider.getBalance(dappcord.address)).to.equal(0)
    })

    it("Updates owner balance", async () => {
      expect(await ethers.provider.getBalance(deployer.address)).to.be.greaterThan(cost)
    })

  })
})
