# ETH Cart

This is a [CodeCrypto](https://codecrypto.academy/) project that allow us to set up and run a Blockchain node, a backend and a frontend in order to process a payment using cryptocurrencies.

## TECH USED

- [Docker](https://www.docker.com/)
- [Node.JS](https://nodejs.org/en)
- [Express JS](https://expressjs.com/)
- [Ethers Library](https://docs.ethers.org/v6/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

## BLOCKCHAIN CONFIGURATION

Go to node folder `cd node`
Run

```bash
docker run --rm -it -v ${PWD}/data:/data ethereum/client-go:latest account new --datadir /data
```

_This will create a wallet with address, public and private key._

Copy the address from node/data/keystore/UTC--XXXX" at the key "address".

![image](https://github.com/RodrigoVila/codecrypto-faucet/assets/42290738/ae7937db-98ba-4701-8ebe-d9491e113b6c)

Replace the address inside node/genesis.json:

- At "alloc" object
- At the "extradata" string. NOTE: There should be 64 "0" before the the address (below image address starts with ebc) and 130 after (address ends with 3d3).

![image](https://github.com/RodrigoVila/codecrypto-faucet/assets/42290738/650dacf5-707c-4b2c-86c6-f01cd438d29d)

### ADDING EXTRA WALLET

You can add an extra wallet to receive funds when you initialize the Blockchain. To do so, copy the public address from your wallet and add it to the alloc object

![image](https://github.com/RodrigoVila/codecrypto-faucet/assets/42290738/04d2f11e-f970-4daa-82ff-577dc8698a4b)

## BLOCKCHAIN INTIALIZATION

Run

```bash
docker run --rm -it -v ${PWD}/genesis.json:/genesis.json -v ${PWD}/data:/data ethereum/client-go:latest init --datadir /data /genesis.json
```

## LAUNCH DB

Replace "--miner.etherbase" and "--unlock" addresses in the next command for the same address you used at the genesis.json at the previous step.

**IMPORTANT NOTE: I'm using windows 11 with WSL and I needed to add the flag --ipcdisable. If you are runing a unix system, probably you don't need this flag**

Run

```bash
docker run --rm -it -p 9999:8545 -v ${PWD}/data:/data ethereum/client-go:latest \
    --datadir /data \
    --allow-insecure-unlock \
    --miner.etherbase 57d0e543d0b96f4141fb43505801bcb7e3b09d3d \
    --mine \
    --unlock "57d0e543d0b96f4141fb43505801bcb7e3b09d3d" \
    --http \
    --http.addr "0.0.0.0" \
    --http.port 8545 \
    --http.corsdomain "*" \
    --ipcdisable \
    --http.api "admin,eth,debug,miner,net,txpool,personal,web3"
```

## ADD BLOCKCHAIN TO YOUR METAMASK

Login on your Metamask account
Click on the current network > Add new network > Add a network manually
Add the data below and save

![image](https://github.com/RodrigoVila/codecrypto-faucet/assets/42290738/86640b25-a026-418b-98aa-1154898271d0)

## LAUNCH BACKEND

Go to "back" folder and open the .env file
Add the business acount (The one you will be using to receive the fake money after the transaction is completed).

Open a new console
Go to back folder `cd back`
Install dependencies. Run `npm i`
Run `npx nodemon app.js`. Install nodemon if necessary

## LAUNCH FRONTEND

Open a new console
Go to front folder `cd front`
Install dependencies. Run `npm i`
Run `npm run dev`

## HOW TO USE?

Visit website at `http://localhost:5173/`
Add some items to the cart and pay with [your Metamask account](https://docs.metamask.io/wallet/how-to/connect/) using fake ethers
