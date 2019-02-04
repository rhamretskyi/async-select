import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from './Layout.module.scss';

const Layout = ({ children, topText, link }) => {
    return (
        <Grid centered columns={2}>
            <Grid.Column>
                <div className={styles.top}>
                    <Link to={link}>
                        <Button>
                            {topText}
                        </Button>
                    </Link>
                </div>
                {children}
            </Grid.Column>
        </Grid>
    );
}

export default Layout;