import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Exhibition from '../ethereum/exhibition';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {

    state = {
        value: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();
        const exhibition = Exhibition(this.props.address);
        this.setState({ loading: true, errorMessage: ''});

    try {
        const accounts = await web3.eth.getAccounts();
        await exhibition.methods.makeContribution().send({
            from: accounts[0],
            value: web3.utils.toWei(this.state.value, 'ether')
        });
        
        Router.replaceRoute(`/exhibitions/${this.props.address}`);
        Router.reload(window.location.pathname);

    } catch (err) {
        this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' });
};


    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
                <Form.Field>
                    <label><h3>Amount To Contribute</h3></label>
                    <Input
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                    label="ether"
                    labelPosition="left"
                    />
                </Form.Field>

                <Message error header="Oops" content={this.state.errorMessage} />
                
                <Button color="orange" loading={this.state.loading}>

                    Become An Arts Patron!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;