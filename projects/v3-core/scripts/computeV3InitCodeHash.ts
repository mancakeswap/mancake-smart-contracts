import { ethers } from 'hardhat'
import PancakeV3PoolArtifact from '../artifacts/contracts/MancakeV3Pool.sol/MancakeV3Pool.json'

const hash = ethers.utils.keccak256(PancakeV3PoolArtifact.bytecode)
console.log(hash)
