import web3 from './web3';
import Exhibition from './build/contracts/Exhibition.json';

const Address = (address) => {
    return new web3.eth.Contract (
        Exhibition.abi,
        address
    );
    
};
export default Address;