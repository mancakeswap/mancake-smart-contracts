import { ethers, network } from 'hardhat'

import { abi as MasterChefABI } from '@pancakeswap/masterchef-v3/artifacts/contracts/MasterChef.sol/MasterChef.json'
import { abi as MasterChefV2ABI } from '@pancakeswap/masterchef-v3/artifacts/contracts/MasterChefV2.sol/MasterChefV2.json'
import { abi as MasterChefV3ABI } from '@pancakeswap/masterchef-v3/artifacts/contracts/MasterChefV3.sol/MasterChefV3.json'

import { abi as ERC20ABI } from '@openzeppelin/contracts/build/contracts/IERC20.json'

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name

  let tx

  const mc = await import(`@pancakeswap/masterchef-v3/deployed/${networkName}.json`)
  const masterchef = new ethers.Contract(mc.MasterChef, MasterChefABI, owner)
  const masterchefv2 = new ethers.Contract(mc.MasterChefV2, MasterChefV2ABI, owner)
  const masterchefv3 = new ethers.Contract(mc.MasterChefV3, MasterChefV3ABI, owner)

  // tx = await masterchef.set(1, 0, false)
  // await tx.wait(5)
  // console.log('MasterChef set:', tx.hash)
  // tx = await masterchef.add(1, '0xDDC512e0D55904FE23984e4c6aaA4D9f731C5641', false)
  // await tx.wait(5)
  // console.log('MasterChef add:', tx.hash)

  const dMCV1toV2 = new ethers.Contract('0xDDC512e0D55904FE23984e4c6aaA4D9f731C5641', ERC20ABI, owner)
  tx = await dMCV1toV2.approve(
    masterchefv2.address,
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  )
  await tx.wait(5)
  console.log('dMCV1toV2 approve:', tx.hash)

  tx = await masterchefv2.init(dMCV1toV2.address)
  await tx.wait(5)
  console.log('MasterChefV2 init:', tx.hash)

  const dMCV2toV3 = new ethers.Contract('0xFA9f37c1e7fe536130AF6b82B38B16fBAFF07266', ERC20ABI, owner)
  tx = await dMCV2toV3.approve(
    masterchefv3.address,
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
