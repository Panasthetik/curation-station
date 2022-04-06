import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import station from '../../ethereum/station';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';


class ExhibitionNew extends Component {

    state = {
        minimumPatronage: '',
        Title: '',
        Description: '',
        SuggestedGoal: '',
        CuratorName: '',
        ArtKeyword: '',
        errorMessage: '',
        loading: false
    };
    
    onSubmit = async event => {

        try {

        event.preventDefault();

        this.setState({ loading: true, errorMessage: '' });

        const { minimumPatronage, Title, Description, SuggestedGoal, CuratorName, ArtKeyword } = this.state;

        const accounts = await web3.eth.getAccounts();

        await station.methods
        .launchExhibition(minimumPatronage, Title, Description, SuggestedGoal, CuratorName, ArtKeyword)
        .send({
            from: accounts[0]
        });

        
        Router.pushRoute('/');
    } catch (err) {
        this.setState({ errorMessage: err.message });

    }
        this.setState({ loading: false})
  
    };

    render () {
        return ( 
        <Layout>
        <h2 align="right">Launch An Exhibition!!</h2>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
                <label>Minimum Patronage</label>
                <Input 
                label="Amount in wei"
                labelPosition="right"
                value= { this.state.minimumPatronage }
                onChange={ event =>
                    this.setState({ minimumPatronage: event.target.value})}
                />
            </Form.Field>
            <Form.Field>
                <label>Title</label>
                <Input 
                label="16 characters"
                labelPosition="right"
                value= { this.state.Title }
                onChange={ event =>
                    this.setState({ Title: event.target.value})}
                />
            </Form.Field>

            <Form.Field>
                <label>Description</label>
                <Input 
                label="A Few Words"
                labelPosition="right"
                value= { this.state.Description }
                onChange={ event =>
                    this.setState({ Description: event.target.value})}
                />
            </Form.Field>

            <Form.Field>
                <label>Suggested Goal</label>
                <Input 
                label="Suggested Total Goal (wei)"
                labelPosition="right"
                value= { this.state.SuggestedGoal }
                onChange={ event =>
                    this.setState({ SuggestedGoal: event.target.value})}
                />
            </Form.Field>

            <Form.Field>
                <label>Curator Name</label>
                <Input 
                label="First, Last"
                labelPosition="right"
                value= { this.state.CuratorName }
                onChange={ event =>
                    this.setState({ CuratorName: event.target.value})}
                />
            </Form.Field>

            <Form.Field>
                <label>Art Keyword</label>
                <Input 
                label="ex: Videoart"
                labelPosition="right"
                value= { this.state.ArtKeyword }
                onChange={ event =>
                    this.setState({ ArtKeyword: event.target.value})}
                />
            </Form.Field>


           
            <Message error header="Oops" content={this.state.errorMessage} />
            <Button loading={this.state.loading} color="teal">Launch!</Button>
        </Form>
        </Layout>
        );
        }
}
export default ExhibitionNew;
