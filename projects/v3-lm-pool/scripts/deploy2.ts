import { ethers, network } from 'hardhat'
import { configs } from '@pancakeswap/common/config'
import { tryVerify } from '@pancakeswap/common/verify'
import fs from 'fs'
import { abi as MancakeV3Factory } from '@pancakeswap/v3-core/artifacts/contracts/MancakeV3Factory.sol/MancakeV3Factory.json'
import { abi as MasterChefV3 } from '@pancakeswap/masterchef-v3/artifacts/contracts/MasterChefV3.sol/MasterChefV3.json'

import { parseEther } from 'ethers/lib/utils'
const currentNetwork = network.name

async function main() {
  const [owner] = await ethers.getSigners()
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@pancakeswap/v3-core/deployed/${networkName}.json`)
  const mcV3DeployedContracts = await import(`@pancakeswap/masterchef-v3/deployed/${networkName}.json`)

  const v3Factory_address = v3DeployedContracts.V3Factory

  const V3LmPoolDeployer = await ethers.getContractFactory('MancakeV3LmPoolDeployer')
  const v3LmPoolDeployer = await V3LmPoolDeployer.deploy(mcV3DeployedContracts.MasterChefV3)

  console.log('v3LmPoolDeployer deployed to:', v3LmPoolDeployer.address)

  const v3Factory = new ethers.Contract(v3Factory_address, MancakeV3Factory, owner)
  await v3Factory.setLmPoolDeployer(v3LmPoolDeployer.address)

  const masterchefV3 = new ethers.Contract(mcV3DeployedContracts.MasterChefV3, MasterChefV3, owner)
  await masterchefV3.setLMPoolDeployer(v3LmPoolDeployer.address)

  const contracts = {
    V3LmPoolDeployer: v3LmPoolDeployer.address,
  }
  fs.writeFileSync(`./deployed/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
