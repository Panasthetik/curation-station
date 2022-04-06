import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";


function getLibrary(provider) {
    return new Web3(provider)
}

function App({ Component, pageProps }) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
    <Component {...pageProps} />
    </Web3ReactProvider>
    )
};

export default App;