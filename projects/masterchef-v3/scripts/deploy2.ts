/* eslint-disable camelcase */
import { ethers, run, network } from "hardhat";
import { configs } from "@pancakeswap/common/config";

import { writeFileSync } from "fs";

export const cakePerBlock = "40000000000000000000";
export const startBlock = 0;

export const devAddr = "0x7BDF85dF9186E055697C4f2803366973b491ef4a";

async function main() {
  const [owner] = await ethers.getSigners();
  const networkName = network.name;
  // Check if the network is supported.
  console.log(`Deploying to ${networkName} network...`);

  // Compile contracts.
  await run("compile");
  console.log("Compiled contracts...");

  const config = configs[networkName as keyof typeof configs];
  if (!config) {
    throw new Error(`No config found for network ${networkName}`);
  }

  const v3PeripheryDeployedContracts = await import(`@pancakeswap/v3-periphery/deployed/${networkName}.json`);
  const masterchefV3DeployedContracts = await import(`@pancakeswap/masterchef-v3/deployed/${networkName}.json`);

  // const Cake = await ethers.getContractFactory("CakeToken");
  // const cake = await Cake.deploy();
  // await cake.deployed();
  // console.log("Cake deployed to:", cake.address);

  // const SyrupBar = await ethers.getContractFactory("SyrupBar");
  // const syrup = await SyrupBar.deploy(cake.address);
  // await syrup.deployed();
  // console.log("SyrupBar deployed to:", syrup.address);

  // const MasterChef = await ethers.getContractFactory("MasterChef");
  // const masterchef = await MasterChef.deploy(cake.address, syrup.address, owner.address, cakePerBlock, startBlock);
  // await masterchef.deployed();
  // console.log("MasterChef deployed to:", masterchef.address);

  const MasterChefV2 = await ethers.getContractFactory("MasterChefV2");
  // const masterchefv2 = await MasterChefV2.deploy(masterchef.address, cake.address, 0, devAddr);
  const masterchefv2 = await MasterChefV2.deploy(
    masterchefV3DeployedContracts.MasterChef,
    masterchefV3DeployedContracts.CakeToken,
    2,
    devAddr
  );
  await masterchefv2.deployed();
  console.log("MasterChefV2 deployed to:", masterchefv2.address);

  // const MasterChefV3 = await ethers.getContractFactory("MasterChefV3");
  // const masterchefv3 = await MasterChefV3.deploy(
  //   cake.address,
  //   v3PeripheryDeployedContracts.NonfungiblePositionManager,
  //   config.WNATIVE
  // );
  // await masterchefv3.deployed();
  // console.log("MasterChefV3 deployed to:", masterchefv3.address);

  // await cake.connect(owner).transferOwnership(masterchef.address);
  // await syrup.connect(owner).transferOwnership(masterchef.address);

  writeFileSync(
    `./deployed/${networkName}.json`,
    JSON.stringify(
      {
        ...masterchefV3DeployedContracts,
        // CakeToken: cake.address,
        // SyrupBar: syrup.address,
        // MasterChef: masterchef.address,
        MasterChefV2: masterchefv2.address,
        // MasterChefV3: masterchefv3.address,
        // MasterChefDevAddress: devAddr,
      },
      null,
      2
    )
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
