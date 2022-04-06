const path = require("path");

require('dotenv').config({path: './.env'});

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const MetaMaskAccountIndex = 0;


module.exports = {
contracts_build_directory: path.join(__dirname, "./build/contracts"),
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
  development: {
  host: "localhost",     // Localhost (default: none)
    port: 8545,            // Standard Ethereum port (default: none)
    network_id: "*",       // Any network (default: none)
  },

  ganache_local: {
    provider: function() {
      return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", MetaMaskAccountIndex)
    },
    network_id: 5777,
  },

  ropsten: {
    provider: function() {
      return new HDWalletProvider(process.env.MNEMONIC, "wss://ropsten.infura.io/ws/v3/" + process.env.INFURA_API_KEY);
    },
      network_id: 3,       // Ropsten's id
    gas: 7500000,
    gasPrice: 20000000000,
    confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    networkCheckTimeout: "100000",
    websockets: true,  // # of blocks before a deployment times out  (minimum/default: 50)
    skipDryRun: false
    }, 
    
    kovan: {
    provider: function() {
      return new HDWalletProvider(process.env.MNEMONIC, "https://kovan.infura.io/v3/be30debfceb848a49f8a262977d4c9b9");
    },
  
      network_id: 42,
    gas: 5500000,
    gasPrice: 10000000000,
    
    //confirmations: 2,    // # of confs to wait between deployments. (default: 0)
    //networkCheckTimeout: "100000",
    //websockets: true,  // # of blocks before a deployment times out  (minimum/default: 50)
    //skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows: 
  // $ truffle migrate --reset --compile-all
  //
  // db: {
    // enabled: false,
    // host: "127.0.0.1",
    // adapter: {
    //   name: "sqlite",
    //   settings: {
    //     directory: ".db"
    //   }
    // }
  // }
};