import bn from 'bignumber.js'
import { ethers, network } from 'hardhat'
import { configs } from '@pancakeswap/common/config'
import fs from 'fs'

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  const config = configs[networkName as keyof typeof configs]

  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const MancakeInterfaceMulticallV2 = await ethers.getContractFactory('MancakeInterfaceMulticallV2')
  const mancakeInterfaceMulticallV2 = await MancakeInterfaceMulticallV2.deploy()
  await mancakeInterfaceMulticallV2.deployed()
  console.log('MancakeInterfaceMulticallV2', mancakeInterfaceMulticallV2.address)

  const contracts = {
    MulticallV2: mancakeInterfaceMulticallV2.address,
  }

  fs.writeFileSync(`./deployed/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
