import { abi as POOL_ABI } from '@pancakeswap/v3-core/artifacts/contracts/MancakeV3Pool.sol/MancakeV3Pool.json'
import { Contract, Wallet } from 'ethers'
import { IPancakeV3Pool } from '../../typechain-types'

export default function poolAtAddress(address: string, wallet: Wallet): IPancakeV3Pool {
  return new Contract(address, POOL_ABI, wallet) as IPancakeV3Pool
}
