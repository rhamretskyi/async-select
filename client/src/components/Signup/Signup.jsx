import React, { Component} from 'react'
import { Button, Form } from 'semantic-ui-react';
import Layout from '../Layout';
import axios from 'axios';

class Signup extends Component {    
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({[name]: value});
      }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/users', this.state);
    }

    render() {
        return  (
            <Layout topText="Users" link="/users">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>User Name</label>
                        <input name="userName" placeholder='User Name' onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input name="email" placeholder='Email' onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input name="password" type="password" placeholder='Password' onChange={this.handleChange} />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </Layout>
        )
    }
}

export default Signup;