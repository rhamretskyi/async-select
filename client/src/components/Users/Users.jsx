import React, { Component} from 'react'
import Layout from '../Layout';
import axios from 'axios';
import AsyncPaginate from "react-select-async-paginate";
import { Table } from 'semantic-ui-react';
import styles from './Users.module.scss';
import _ from 'lodash';

class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            valueUserName: [],
            valueRegistrationDate: [],
        }

        this.pageUserName = 0;
        this.pagesUserName = 0;
        this.pageRegistrationDate = 0;
        this.pagesRegistrationDate = 0;
    }

    onChangeUserName = value => {
        this.setState({
          valueUserName: value,
        });
    };

    onChangeRegistrationDate= value => {
        this.setState({
          valueRegistrationDate: value,
        });
    };

    loadOptionsUserName = async (search, prevOptions) => {
        this.pageUserName = this.pageUserName <= this.pagesUserName ? this.pageUserName + 1 : this.pageUserName;
        let options = [];

        let hasMore = false;

        const res = await this.getData(search, this.pageUserName)
        const data = res.docs;
        this.pagesUserName = res.pages;

        options = data.map((user) => {
            return {
                value: user._id,
                label: user.userName,
                user: user
            }
        });

        hasMore = this.pageUserName < this.pagesUserName || (search.length === 0 &&  this.pageUserName <= this.pagesUserName)? true : false;
        
        return {
            options,
            hasMore
        };
    }

    loadOptionsRegistrationDate = async (search, prevOptions) => {
        this.pageRegistrationDate = this.pageRegistrationDate <= this.pagesRegistrationDate ? this.pageRegistrationDate + 1 : this.pageRegistrationDate;
        let options = [];

        let hasMore = false;

        const res = await this.getData(search, this.pageRegistrationDate)
        const data = res.docs;
        this.pagesRegistrationDate = res.pages;

        options = data.map((user) => {
            return {
                value: user._id,
                label: user.registrationDate,
                user: user,
            }
        });

        hasMore = this.pageRegistrationDate < this.pagesRegistrationDate|| (search.length === 0 &&  this.pageRegistrationDate <= this.pagesRegistrationDate)? true : false;
        
        return {
            options,
            hasMore
        };
    }

    getData = async (search = '', page = 1) => {
        const res = await axios.get(`http://localhost:3001/users?search=${search}&&page=${page}`);

        return res.data;
    }

    formattedData = () => {
        let users = _.concat(this.state.valueUserName, this.state.valueRegistrationDate);
        users = _.uniqBy(users, 'value');
        return users.map(item => {
            return (<Table.Row key={item.user.registrationDate}>
                <Table.Cell>
                    {item.user.userName}
                </Table.Cell>
                <Table.Cell>{item.user.registrationDate}</Table.Cell>
            </Table.Row>)
        })
    }

    render() {
        return (
            <Layout topText="Sign Up" link="/">
                <div className={styles.filters}>
                    <AsyncPaginate
                        value={this.state.valueUserName}
                        loadOptions={this.loadOptionsUserName}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={this.onChangeUserName}
                        />
                    <AsyncPaginate
                        value={this.state.valueRegistrationDate}
                        loadOptions={this.loadOptionsRegistrationDate}
                        isMulti
                        closeMenuOnSelect={false}
                        onChange={this.onChangeRegistrationDate}
                    />
                </div>
                <div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>User Name</Table.HeaderCell>
                                <Table.HeaderCell>Registration Date</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.formattedData()}
                        </Table.Body>
                    </Table>
                </div>
            </Layout>
        )
    }
}

export default Users;