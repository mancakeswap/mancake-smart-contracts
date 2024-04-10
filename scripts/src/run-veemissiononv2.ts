import { ethers, network } from 'hardhat'

import { abi as MasterChefABI } from '@pancakeswap/masterchef-v3/artifacts/contracts/MasterChef.sol/MasterChef.json'
import { abi as MasterChefV2ABI } from '@pancakeswap/masterchef-v3/artifacts/contracts/MasterChefV2.sol/MasterChefV2.json'
import { abi as MasterChefV3ABI } from '@pancakeswap/masterchef-v3/artifacts/contracts/MasterChefV3.sol/MasterChefV3.json'

import { abi as MasterChefV3ReceiverABI } from '@pancakeswap/fee/artifacts/contracts/receiver/MasterChefV3Receiver.sol/MasterChefV3Receiver.json'

import { abi as ERC20ABI } from '@openzeppelin/contracts/build/contracts/IERC20.json'

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name

  let tx

  const DUMMY = '0xE5e58AbE5b1C2639b8abf4e4f397775Ce7A717D3'

  const mc = await import(`@pancakeswap/masterchef-v3/deployed/${networkName}.json`)
  const masterchef = new ethers.Contract(mc.MasterChef, MasterChefABI, owner)
  const masterchefv2 = new ethers.Contract(mc.MasterChefV2, MasterChefV2ABI, owner)
  const masterchefv3 = new ethers.Contract(mc.MasterChefV3, MasterChefV3ABI, owner)

  // const fee = await import(`@pancakeswap/fee/deployed/${networkName}.json`)
  // const masterchefv3receiver = new ethers.Contract(fee.MasterChefV3Receiver, MasterChefV3ReceiverABI, owner)

  // tx = await masterchefv2.add(100, DUMMY, false, false)
  // await tx.wait(5)
  // console.log('MasterChefv2 add:', tx.hash)

  // const dummy = new ethers.Contract(DUMMY, ERC20ABI, owner)
  // tx = await dummy.approve(masterchefv2.address, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
  // await tx.wait(5)
  // console.log('dummy approve:', tx.hash)

  tx = await masterchefv2.updateWhiteList(owner.address, true)
  await tx.wait(5)
  console.log('masterchefv2 updateWhiteList:', tx.hash)

  tx = await masterchefv2.deposit(1, 1)
  await tx.wait(5)
  console.log('masterchefv2 deposit:', tx.hash)

  // tx = await masterchefv3receiver.depositForMasterChefV2Pool(DUMMY)
  // await tx.wait(5)
  // console.log('MasterChefV3Receiver depositForMasterChefV2Pool:', tx.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
