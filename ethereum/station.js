import web3 from './web3';
import CurationStation from './build/contracts/CurationStation.json';

const instance = new web3.eth.Contract (
    CurationStation.abi,


/*
PASTE DEPLOYED GANACHE CONTRACT INSTANCE HERE:
*/

    '0x4DeBa2B15Fcb7608F378EdcF90AAe33bEC5f03Dd'

    );

export default instance;
