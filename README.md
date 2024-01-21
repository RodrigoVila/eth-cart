# 🚧 Work in progress 🚧

### 1. **Create DB container & populate it with data**

Go to [SQL-Docker Repository](https://github.com/RodrigoVila/sql-docker/blob/main/README.md) and follow the steps _1, 2 & 3_ for the DBs you want to work with.

### 2. **Create Ethereum Node**

Go to [Faucet Repository](https://github.com/RodrigoVila/codecrypto-faucet/blob/main/README.md) and follow the next steps:

- [BLOCKCHAIN CONFIGURATION](https://github.com/RodrigoVila/codecrypto-faucet/blob/main/README.md#blockchain-configuration)
- [ADDING EXTRA WALLET **_(Optional)_**](https://github.com/RodrigoVila/codecrypto-faucet/blob/main/README.md#adding-extra-wallet)
- [BLOCKCHAIN INITIALIZATION](https://github.com/RodrigoVila/codecrypto-faucet/blob/main/README.md#blockchain-intialization)
- [LAUNCH DB](https://github.com/RodrigoVila/codecrypto-faucet/blob/main/README.md#launch-db)
  docker run --rm -it -p 9999:8888 -v ${PWD}/data:/data ethereum/client-go:latest --datadir /data --allow-insecure-unlock --miner.etherbase 53aa164b2a5362ce50c07ab503ad1321222ac136 --mine --unlock "53aa164b2a5362ce50c07ab503ad1321222ac136" --http --http.addr "0.0.0.0" --http.port 8888 --http.corsdomain "\*" --ipcdisable --http.api "admin,eth,debug,miner,net,txpool,personal,web3"
