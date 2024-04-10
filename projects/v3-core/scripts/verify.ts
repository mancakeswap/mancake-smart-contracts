import { verifyContract } from '@pancakeswap/common/verify'
import { network } from 'hardhat'

async function main() {
  const networkName = network.name
  const deployedContracts = await import(`@pancakeswap/v3-core/deployed/${networkName}.json`)

  console.log('Verify MancakeV3PoolDeployer')
  await verifyContract(deployedContracts.V3PoolDeployer)

  console.log('Verify pancakeV3Factory')
  await verifyContract(deployedContracts.V3Factory, [deployedContracts.V3PoolDeployer])

  console.log('Verify output code hash')
  await verifyContract('0x6044fc2E39f98C70acB550Eb017327AE32078E4a')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
