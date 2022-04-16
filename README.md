# Web3 template

## Hardhat

Install node depencies with either `npm` or `yarn`. Go to the `src` folder and also install the dependencies.

To compile the sample contract you can run `npx hardhat compile`

This project also comes configured to deploy to the Polygon test network (mumbai). To deploy you need to configure at least your private keys

- Create a .env file and add `PRIVATE_KEY=.....`

If you also want to verify your contract in the future, you can add `POLYGONSCAN_API=...` you can get this from https://polygonscan.com/

After configuring your private key you can run `npx hardhat run scripts/sample-script.js --network mumbai`, be sure to have MATIC on your account, the one you exported the private key. Be extra careful with this, I would recommend just creating another account to test things out, you can get free matic on the mumbai network here https://faucet.polygon.technology/.

After running this you should get an address like this `0xf9549900A5E1973c0E519c0b08bb6a0AD21ab6ED` (this was my deploy of this). You don't need to verify this contract since the bytecode will match to others who already did this. But the command looks like `npx hardhat verify 0xf9549900A5E1973c0E519c0b08bb6a0AD21ab6ED "Hello from hardhat" --network mumbai`.

With this, you want to go into `src/context/index.tsx` and change the `contractAddress` in the provider to your own address.

## Next

Now that we have a contract we can interact with, this simple next project has two basic functionalities

1. Request metamask access. There is also a small logic, to sign the message, that should be moved to a backend (if you want that extra layer).
2. Interact with the `Greeter.sol` contract

You can start the next app with `npm run dev`. There's no error handling around, you can probably implement those up, I would start with a backend to validate the signed message if you would like it too. But for this to work, either remove the logic, or look at the console.log to see your message

```
let expectedSign = 'something'
// this will change for you (since it uses your private key), you probably want to move this out to a backend
console.log(`signedMessage ${signedMessage}`)
//let isValid = ethers.utils.verifyMessage('Welcome to myApp!', signedMessage) returns back the address
if (signedMessage == expectedSign) {
    ...
}
```

You can remove that extra `signedMessage == expectedSign` or change `let expectedSign = 'something'` to what you see in the console

## How to recreate this app from scratch

You can probably reuse the files that don't come out of the box like

1. `hardhat.config.js`
2. `.mocharc.json`
3. `src/components`

And recreate with `npx create-next-app -e with-tailwincss src`.

Then you can run `npx hardhat` that will pop up some options and it'll create the hardhat project for you. You'll need to install the extra dependencies for deploying to other networks and verifying as well, but that will show up whenever you try to use that custom `hardhat.config.js`

That's pretty much it.
