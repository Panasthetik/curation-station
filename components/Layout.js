import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Header from './Header';
import { Container } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import ConnectButton from './ConnectButton';
import { injected } from '../components/wallet/connectors';
import { useWeb3React } from '@web3-react/core';
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import MetaMaskProvider from './MetaMaskProvider';
import web3 from '../ethereum/web3';
import { useRouter } from 'next/router';


const Layout = (props) => {

    const router = useRouter();
 
    const refreshData = () => {
        router.replace(router.asPath);
    }
  
    function getLibrary(provider) {
        return new Web3(provider)
    }
    
    return (

        
        <Container>
            <Header />
            
            <Web3ReactProvider getLibrary={getLibrary}>

            <ConnectButton />
            { props.children }
            </Web3ReactProvider>
            
            <br />
            <br />
            
            </Container>
    )
    refreshData();
    
};

export default Layout;