const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Get signers
  const [deployer] = await ethers.getSigners()

  const Dappcord = await ethers.getContractFactory("DiscordDapp")
  dappcord = await Dappcord.deploy("Dappcord", "DAPP", { gasLimit: 6000000 })
  await dappcord.deployed()
  console.log(`Deployed Dappcord to: ${dappcord.address}`)

  const channel_names = ["General", "Random", "Announcements"]
  const channel_costs = [tokens(1), tokens(0.5), tokens(0.25)]

  for (let i = 0; i < 3; i++) {
    const tx = await dappcord.connect(deployer).createChannel(channel_names[i], channel_costs[i], { gasLimit: 3000000 })
    await tx.wait()
    console.log(`Created Channel ${i} with name ${channel_names[i]} and cost ${channel_costs[i]}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});