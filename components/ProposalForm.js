import React, { Component } from 'react';
import { Form, Button, Message, Input, Grid } from 'semantic-ui-react';
import Exhibition from '../ethereum/exhibition';
import web3 from '../ethereum/web3';
import { Router } from '../routes';




class ProposalForm extends Component {

    state = {
        value: '',
        description: '',
        recipient: '',
        loading: false,
        errorMessage: ''
    }  

    onSubmit = async event => {
        event.preventDefault();

        const exhibition = Exhibition(this.props.address);
        const { description, value, recipient } = this.state;

        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await exhibition.methods.createExpenseProposal(
            description,
            web3.utils.toWei(value, 'ether'),
            recipient
            ).send({from: accounts[0] });

            Router.replaceRoute(`/exhibitions/${this.props.address}/requests`);
            Router.reload(window.location.pathname);
            
        } catch (err) {
        this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <br/>
                 <div><h2>Submit A Proposal (Curator Only)</h2></div>
                 <Grid columns={4} divided>
                     <Grid.Row>
 <Grid.Column>
                
            <Form.Field>
                    <label>Description</label>
                    <Input
                    value={this.state.description}
                    onChange={event => this.setState({ description: event.target.value})}
                    />
                </Form.Field>
                </Grid.Column>

                <Grid.Column>            
            <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value})}
                    />
                </Form.Field>
                </Grid.Column>
                <Grid.Column>
           
            <Form.Field>
                    <label>Recipient</label>
                    <Input 
                    value={this.state.recipient}
                    onChange={event => this.setState({ recipient: event.target.value})}
                    
                    />
                </Form.Field>
                </Grid.Column>
                <Grid.Column>
                
            <Message error header="Oops!" content={this.state.errorMessage} />
                <Button color='olive' loading={this.state.loading}>Create!</Button>
                
                </Grid.Column>
                </Grid.Row>
                </Grid>
        </Form>
       



           
           
          
        );
    }


}

export default ProposalForm;
