const { API_KEY, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;

const { ethers } = require('hardhat');
const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json')

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
  const message = await helloWorldContract.message();
  console.log('Current message: ', message);

  console.log('Updating the message');
  const tx = await helloWorldContract.update('this is the new message');
  await tx.wait();

  const newMessage = await helloWorldContract.message();
  console.log("New message: ", newMessage);
}


main()
.then(() => process.exit(0))
.catch(err => {
  console.error(err);
  process.exit(1);
})