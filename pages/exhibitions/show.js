import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Exhibition from '../../ethereum/exhibition';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';


class ExhibitionShow extends Component {

   
    state = {
        loading: false,
        errorMessage: ''
    };

    static async getInitialProps(props) {
        const exhibition = Exhibition(props.query.address);
    
        const summary = await exhibition.methods.getSummary().call();
        
    

    return{
        address: props.query.address,
        minimumPatronage: summary[0],
        balance: summary[1],
        Title: summary[2],
        Description: summary[3],
        proposalsCount: summary[4],
        patronEndorsersCount: summary[5],
        SuggestedGoal: summary[6],
        CuratorName: summary[7],
        ArtKeyword: summary[8],
        curator: summary[9]

    };

    }

    renderCards() {

        const {
            Title,
            Description,
            balance,
            curator,
            CuratorName,
            SuggestedGoal,
            ArtKeyword,
            minimumPatronage,
            proposalsCount,
            patronEndorsersCount
        } = this.props;


        const items = [
            {
                header: Title,
                meta: 'Title',
                description: 'Name of exhibition.',
                style: { overflowWrap: 'break-word' }
            
            },
            
            {
                header: Description,
                meta: 'Short Description',
                description: 'A few words about the project.',
                style: { overflowWrap: 'break-word' }

            },
            {
                header: curator,
                meta: 'Curator Address',
                description: 'The Curator launched this exhibition and can make expense proposals.',
                style: { overflowWrap: 'break-word' }

            },
            {
                header: CuratorName,
                meta: 'Curator Name',
                description: 'The name of the Curator.',
                style: { overflowWrap: 'break-word' }
                
            },
            {
                header: web3.utils.fromWei(SuggestedGoal, 'ether'),
                meta: 'Total Suggested Goal Amount (ether)',
                description: 'The Curator has suggested this total goal amount (ETH).',
                
            },
            {
                header: ArtKeyword,
                meta: 'Exhibition Category',
                description: 'The category of the show: photo, videoart etc.',
                style: { overflowWrap: 'break-word' }

            },


            {
                header: minimumPatronage,
                meta: 'Minimum Patronage (wei)',
                description: 'You must support us with at least this much wei to become a patron.'
                },
                {
                header: proposalsCount,
                meta: 'Number of Proposals',
                description: 'A proposal withdraws money for exhibition expenses. Must be endorsed by patrons.'
                
    
                },
                {
                    header: patronEndorsersCount,
                    meta: 'Number of Patrons',
                    description: 'Number of patrons who have already supported this exhibition.'
            
                    },
                    {
                    header: web3.utils.fromWei(balance, 'ether'),
                    meta: 'Exhibition Budget (ether)',
                    description: 'How much exhibition budget remaining.'
                
                        }
                
        ];
        return <Card.Group items={items} />;

    }


    render() {
        return (
        <Layout>
        <h2>Exhibition Information</h2>
        <Grid>
            <Grid.Row>
            <Grid.Column width={13}>
            {this.renderCards()}
           
            </Grid.Column>

            <Grid.Column width={3}>
            <ContributeForm address={this.props.address} />
            <h3>View Current Expense Proposals</h3>
            <Link route={`/exhibitions/${this.props.address}/requests`}>
                <a>
                    <Button color="olive">View Expense Proposals</Button>
                </a>
            
            </Link>
            </Grid.Column>
            </Grid.Row>
            <Grid.Column width={5}>
            <Grid.Row>
            
            </Grid.Row>
            </Grid.Column>

        </Grid>    
     
       
        </Layout>
        );
        
    };
};

export default ExhibitionShow;