import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';


const Header = (props) => {
    return (
        <Menu inverted position="left" style={{ marginTop: '5px' }}>
            <Link route="/">
                <h1>
                <a className="item">
                CURATION STATION
                </a>
                </h1>
            </Link>
        
        <Menu.Menu position="right">
        <Link route="/">
        <h2>
                <a className="item">
                CURRENT EXHIBITIONS
                </a>
                </h2>
            </Link>
            <Link route="/exhibitions/new">
                <a className="item">
                +
                </a>

            </Link>
        </Menu.Menu>

        </Menu>
    )
};
export default Header;