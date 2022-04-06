import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Exhibition from '../../../ethereum/exhibition';
import ProposalRow from '../../../components/ProposalRow';
import ProposalForm from '../../../components/ProposalForm';




class ProposalIndex extends Component {

   

    state = {
        loading: false,
        errorMessage: ''
    };

    static async getInitialProps(props) {
        const { address } = props.query;
        const exhibition = Exhibition(address);
        const proposalsCount = await exhibition.methods.getProposalsCount().call();
        const patronEndorsersCount = await exhibition.methods.patronEndorsersCount().call();


        const proposals = await Promise.all(
            Array(parseInt(proposalsCount)).fill().map((element, index) => {
                return exhibition.methods.expenseproposals(index).call();
            })
        );


        return { address, proposals, proposalsCount, patronEndorsersCount };
    }
    
    renderRow() {
        return this.props.proposals.map((proposal, index) => {
            return (
            <ProposalRow
            key={index}
            id={index}
            proposal={proposal}
            address={this.props.address}
            patronEndorsersCount={this.props.patronEndorsersCount}
            />
            );
        });
    }



    render() {
        const { Header, Row, HeaderCell, Body } = Table;
       
        
        return (
        <Layout>
            <div>
            <ProposalForm address={this.props.address} />
                </div>
           
        <h2>Exhibition Expense Proposals</h2>
       
            <Table inverted>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Expense Description</HeaderCell>
                        <HeaderCell>Amount (ETH)</HeaderCell>
                        <HeaderCell>Vendor / Recipient Address</HeaderCell>
                        <HeaderCell>Endorsement Count</HeaderCell>
                        <HeaderCell>Endorse (Project Patrons)</HeaderCell>
                        <HeaderCell>Finalize (Project Curator)</HeaderCell>
                
                    </Row>
                </Header>
                <Body>
                    {this.renderRow()}
                </Body>
            </Table>

            <div>Found {this.props.proposalsCount} Proposals.</div>
           

        </Layout>
        );
       
    }
}
export default ProposalIndex;