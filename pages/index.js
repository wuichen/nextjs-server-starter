import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Page, Layout, Stack, Card, TextField, Button, AccountConnection, Link } from '@shopify/polaris';
import Cookie from 'js-cookie';
import Loader from 'react-loading';
import styled from 'styled-components';

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: false,
      loading: true,
      accountName: ''
    }
  }

  async componentDidMount() {
    // const cookie = Cookie.get('auth_shop')
    // if (cookie) {
    //   this.setState({
    //     loading: false,
    //     connected: true,
    //     accountName: cookie
    //   })
    // } else {
    //   this.setState({
    //     loading: false
    //   })
    // }
    // const fetchOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + cookie
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     name: 'testingdiscount',
    //     // shop: '',
    //     products: ['ee'],
    //     influencers: ['aas'],
    //     collections: [],
    //     influencers_condition: {
    //       followers_greater_than: '1000'
    //     },
    //     influencers_discount: '30%',
    //     influencers_rebate: '10%',
    //     buyer_discount: '10%',
    //   })
    // }

    // const account = await fetch('/api/discounts', fetchOptions)
    // console.log(account)
  }


  async connect() {
    // try {
    //   const fetchOptions = {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     credentials: 'include',
    //   }

    //   const account = await fetch('/api/connect', fetchOptions)
      
    // } catch (err) {
    //   console.log(err)
    // }


    // this.setState((state) => {
    //   const connected = !state.connected;
    //   const accountName = connected ? 'Jane Appleseed' : '';

    //   return {
    //     connected,
    //     accountName,
    //   };
    // });
  };
  render() {
    const {accountName, connected} = this.state;
    const buttonText = connected ? 'Disconnect' : 'Connect';
    const details = connected ? 'Account connected' : 'No account connected';
    const terms = connected ? null : (
      <p>
        By clicking <strong>Connect</strong>, you agree to accept Starchain’s{' '}
        <Link url="Example App">terms and conditions</Link>.
      </p>
    );

    const LoaderWrapper = styled.div`
      display: flex;
      justify-content: center;
      margin-top: 10%;
    `;

    // if (this.state.loading) {
    //   return (
    //     <LoaderWrapper>
    //       <Loader
    //         type={"spin"}
    //         color={"#1A1F55"}
    //         height={"100px"} 
    //         width={"100px"}
    //       />
    //     </LoaderWrapper>
    //   )
      
    // } else {
      return (
        <Page
          title="Account"
        >
          <Layout sectioned>
            <AccountConnection
              accountName={accountName}
              connected={connected}
              title="Starchain"
              action={{
                content: buttonText,
                onAction: this.connect.bind(this),
              }}
              details={details}
              termsOfService={terms}
            />
          </Layout>
        </Page>
      )
    // }

  }

}

function mapStateToProps({
  requestFields,
  requestInProgress,
  requestError,
  responseBody,
}) {
  return {
    requestFields,
    requestInProgress,
    requestError,
    responseBody,
  };
}

export default connect()(Account);
