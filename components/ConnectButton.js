import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { injected } from '../components/wallet/connectors';
import { useWeb3React } from '@web3-react/core';
import MetaMaskProvider from './MetaMaskProvider';

const ConnectButton = (props) =>  {

        const { active, account, chainId, activate } = useWeb3React() ;


        async function connect() {
            try {
                await activate(injected)
            } catch (ex) {
                console.log(ex)
            }
        }
       
        return (
            <MetaMaskProvider>
            <div>               
                <Button position="left" color="green" onClick={connect}>Connect To Metamask</Button>
                {active ? <span>    Already connected with <b>{account}</b></span> : <span>Not Connected : Please verify your wallet connection.</span>}
                 <span>    / / / / </span>{active ? <span><b>ChainId: </b><b>{chainId}</b></span> : <span>No ChainId Detected!</span> }
            </div> 
            </MetaMaskProvider>
        )
 
};


export default ConnectButton;