const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {

  const Dappcord = await ethers.getContractFactory("DiscordDapp")
  dappcord = await Dappcord.deploy("Dappcord", "DAPP", { gasLimit: 6000000 })
  await dappcord.deployed()
  console.log(`Deployed Dappcord to: ${dappcord.address}`)

  for (let i = 1; i <= 3; i++) {
    const tx = await dappcord.connect(deployer).createChannel(`Channel ${i}`, tokens(1), { gasLimit: 3000000 })
    await tx.wait()
    console.log(`Created Channel ${i}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});