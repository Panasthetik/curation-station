
import Web3 from "web3";


let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts"});

    web3 = new Web3(window.ethereum);

} else {

    const provider = new Web3.providers.HttpProvider(
      "https://kovan.infura.io/v3/be30debfceb848a49f8a262977d4c9b9"
    
       );
    web3 = new Web3(provider);
}
export default web3;