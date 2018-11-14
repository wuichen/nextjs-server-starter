import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import createStore from '../redux/store'
import {loadData, startClock, tickClock} from '../redux/actions'
import axios from 'axios'
import {AppProvider, Card, Tabs} from '@shopify/polaris'
import Router from 'next/router'

const tabs = [
  {
    id: 'account',
    content: 'Account',
    accessibilityLabel: 'Account',
    panelID: 'account',
    route: '/'
  },
  {
    id: 'timer',
    content: 'Timer',
    accessibilityLabel: 'Timer',
    panelID: 'timer',
    route: '/timer'
  },
  {
    id: 'other',
    content: 'Other',
    panelID: 'other',
    route: '/other'
  }
];


class MyApp extends App {

  state = {
    client: false,
    selected: 0
  }

  handleTabChange = (selectedTabIndex) => {
    this.setState({selected: selectedTabIndex});

    Router.push(tabs[selectedTabIndex].route)
  };

  static async getInitialProps (object) {
    console.log(object.router.query)
    const {Component, ctx} = object
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx })
    }
    pageProps = {
      ...pageProps,
      ...object.router.query
    }
    // console.log(Component)
    // console.log(ctx)
    // const fetchOptions = {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include',
    // }
    // try {
    //   const shop = await axios('http://localhost:3000/v1/api/shop', fetchOptions)
    //   console.log(shop.data)
    // } catch (err) {
    //   console.log(err)
    // }
    
    return { pageProps }
  }

  async componentDidMount() {
    const {router} = this.props
    let selected = 0;
    if (router.route === '/') {
      selected = 0
    } else if (router.route === '/timer') {
      selected = 1
    } else if (router.route === '/other') {
      selected = 2
    }
    this.setState({
      client: true,
      selected
    })
    
    // const fetchOptions = {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include',
    // }
    // try {
    //   const shop = await axios('/v1/api/shop', fetchOptions)
    //   console.log(shop.data)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  render () {
    const { Component, pageProps, store, router } = this.props
    const {selected} = this.state

    if (this.state.client) {
      if (router.route === '/toshopify') {
        return (
          <Container>
            <Component {...pageProps} />
          </Container>
        )
      } else {
        return (
          <AppProvider shopOrigin={this.props.pageProps.shop} forceRedirect={true} apiKey={this.props.pageProps.shopify_apiKey}>
            <Container>
              <Provider store={store}>
                <Card>
                  <Tabs fitted tabs={tabs} selected={selected} onSelect={this.handleTabChange} />
                  <Card.Section>
                    <Component {...pageProps} />
                  </Card.Section>
                </Card>
              </Provider>
            </Container>
          </AppProvider>
        )
      }
      
    } else {
      return (<div></div>)
    }
    
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(MyApp))
