import { verifyContract } from "@pancakeswap/common/verify";
import { configs } from "@pancakeswap/common/config";
import { network } from "hardhat";

export const cakePerBlock = "40000000000000000000";
export const startBlock = 0;

export const devAddr = "0x7BDF85dF9186E055697C4f2803366973b491ef4a";

async function main() {
  const networkName = network.name;
  const config = configs[networkName as keyof typeof configs];

  if (!config) {
    throw new Error(`No config found for network ${networkName}`);
  }
  const deployedContractsMasterchefV3 = await import(`@pancakeswap/masterchef-v3/deployed/${networkName}.json`);
  const deployedContractsV3Periphery = await import(`@pancakeswap/v3-periphery/deployed/${networkName}.json`);

  console.log("Verify masterChef contracts");
  await verifyContract(deployedContractsMasterchefV3.MancakeToken, []);
  await verifyContract(deployedContractsMasterchefV3.SyrupBar, [deployedContractsMasterchefV3.MancakeToken]);
  await verifyContract(deployedContractsMasterchefV3.MasterChef, [
    deployedContractsMasterchefV3.MancakeToken,
    deployedContractsMasterchefV3.SyrupBar,
    deployedContractsMasterchefV3.MasterChefDevAddress,
    cakePerBlock,
    startBlock,
  ]);
  await verifyContract(deployedContractsMasterchefV3.MasterChefV2, [
    deployedContractsMasterchefV3.MasterChef,
    deployedContractsMasterchefV3.MancakeToken,
    2,
    devAddr,
  ]);
  await verifyContract(deployedContractsMasterchefV3.MasterChefV3, [
    deployedContractsMasterchefV3.MancakeToken,
    deployedContractsV3Periphery.NonfungiblePositionManager,
    config.WNATIVE,
  ]);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
