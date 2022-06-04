import React, { Component } from 'react';
import station from '../ethereum/station';
import { Card } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../components/Layout';
import { Link } from '../routes';



class ExhibitionIndex extends Component {

    

    static async getInitialProps() {
        const exhibitions = await station.methods.getLaunchedExhibitions().call();
        return { exhibitions };
    }


    renderExhibitions() {

        const items = this.props.exhibitions.map(address => {
            return {
                    header: address,
                    description:
                    (
        
                    // <Link route={ `/exhibitions/${address}`}>
                            <Link href={`/exhibitions/show?address=${address}`} as={`/exhibitions/show?address=${address}`} passHref>
        
                    
                    <a>
                    <Button 
        floated="left"
        content="View Exhibition"
        
        color="teal" basic
        />
                        </a>
                        
                    </Link>
                    ),
                    fluid: true
            };
        
        });
        
       
        return  <Card.Group items={items}/>;
        
    }

    

    render() {
        
        return (
        <Layout>
        <div>
            <h2 align="right">Current Exhibitions</h2>
            <h4>Click on the View Exhibition links below to find out more about each exhibition!</h4>
        
        <Link route="/exhibitions/new">
        <a>
        <Button 
        floated="right"
        content="Launch Exhibition"
        icon="add circle"
        color="teal"
        />
        </a>
        </Link>
        { this.renderExhibitions()}
       
         </div>
         
         </Layout>
        );
        
    }
}

export default ExhibitionIndex;
