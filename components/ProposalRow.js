import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Exhibition from '../ethereum/exhibition';
import { Router } from '../routes';

class ProposalRow extends Component {

    onApprove = async () => {
        const exhibition = Exhibition(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await exhibition.methods.endorseProposal(this.props.id).send({
        from: accounts[0]
        });
        Router.reload(window.location.pathname);
       
    };
    
    onFinalize = async () => {
        const exhibition = Exhibition(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await exhibition.methods.finalizeProposal(this.props.id).send({
            from: accounts[0]
        });
        Router.reload(window.location.pathname);
        
    };


    render() {
        const { Row, Cell } = Table;
        const { id, proposal, patronEndorsersCount } = this.props;
        const readyToFinalize = proposal.endorseCount > patronEndorsersCount / 2;


        return (

            <Row disabled={proposal.complete} positive={readyToFinalize && !proposal.complete}>
                <Cell>{this.props.id}</Cell>
                <Cell>{this.props.proposal.description}</Cell>
                <Cell>{web3.utils.fromWei(this.props.proposal.value, 'ether')}</Cell>
                <Cell>{this.props.proposal.recipient}</Cell>
                <Cell>{this.props.proposal.endorseCount}/{patronEndorsersCount}</Cell>

                <Cell> 
                    {proposal.complete ? null : (
                    <Button color="olive" onClick={this.onApprove} >
                    Endorse Proposal
                    </Button>
                    )}
                </Cell>

                <Cell>
                    {proposal.complete ? null : (
                <Button color="brown" onClick={this.onFinalize} >
                    Finalize Proposal
                    </Button>
                    )}

                </Cell>

            </Row>


        );
    }
}
export default ProposalRow;