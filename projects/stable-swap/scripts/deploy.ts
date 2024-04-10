import { ethers, network } from 'hardhat'
import { writeFileSync } from 'fs'

const currentNetwork = network.name

const main = async () => {
  console.log('Deploying to network:', currentNetwork)

  const LPFactory = await ethers.getContractFactory('MancakeStableSwapLPFactory')
  const lpFactory = await LPFactory.deploy()
  await lpFactory.deployed()
  console.log('MancakeStableSwapLPFactory deployed to:', lpFactory.address)

  const TwoPoolDeployer = await ethers.getContractFactory('MancakeStableSwapTwoPoolDeployer')
  const twoPoolDeployer = await TwoPoolDeployer.deploy()
  await twoPoolDeployer.deployed()
  console.log('MancakeStableSwapTwoPoolDeployer deployed to:', twoPoolDeployer.address)

  const ThreePoolDeployer = await ethers.getContractFactory('MancakeStableSwapThreePoolDeployer')
  const threePoolDeployer = await ThreePoolDeployer.deploy()
  await threePoolDeployer.deployed()
  console.log('MancakeStableSwapThreePoolDeployer deployed to:', threePoolDeployer.address)

  const Factory = await ethers.getContractFactory('MancakeStableSwapFactory')
  const factory = await Factory.deploy(lpFactory.address, twoPoolDeployer.address, threePoolDeployer.address)
  await factory.deployed()
  console.log('MancakeStableSwapFactory deployed to:', factory.address)

  await lpFactory.transferOwnership(factory.address)
  console.log('MancakeStableSwapLPFactory ownership transferred to:', factory.address)
  await twoPoolDeployer.transferOwnership(factory.address)
  console.log('MancakeStableSwapTwoPoolDeployer ownership transferred to:', factory.address)
  await threePoolDeployer.transferOwnership(factory.address)
  console.log('MancakeStableSwapThreePoolDeployer ownership transferred to:', factory.address)

  const TwoPoolInfo = await ethers.getContractFactory('MancakeStableSwapTwoPoolInfo')
  const twoPoolInfo = await TwoPoolInfo.deploy()
  await twoPoolInfo.deployed()
  console.log('MancakeStableSwapTwoPoolInfo deployed to:', twoPoolInfo.address)

  const ThreePoolInfo = await ethers.getContractFactory('MancakeStableSwapThreePoolInfo')
  const threePoolInfo = await ThreePoolInfo.deploy()
  await threePoolInfo.deployed()
  console.log('MancakeStableSwapThreePoolInfo deployed to:', threePoolInfo.address)

  const Info = await ethers.getContractFactory('MancakeStableSwapInfo')
  const info = await Info.deploy(twoPoolInfo.address, threePoolInfo.address)
  await info.deployed()
  console.log('MancakeStableSwapInfo deployed to:', info.address)

  const contracts = {
    StableSwapLPFactory: lpFactory.address,
    StableSwapTwoPoolDeployer: twoPoolDeployer.address,
    StableSwapThreePoolDeployer: threePoolDeployer.address,
    StableSwapFactory: factory.address,
    StableSwapTwoPoolInfo: twoPoolInfo.address,
    StableSwapThreePoolInfo: threePoolInfo.address,
    StableSwapInfo: info.address,
  }

  writeFileSync(`./deployed/${network.name}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
