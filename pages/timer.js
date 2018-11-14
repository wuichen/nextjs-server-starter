import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {loadData, startClock, tickClock} from '../redux/actions'
import Page from '../components/page'

class Index extends React.Component {
  static async getInitialProps (props) {
    const { store, isServer } = props.ctx
    store.dispatch(tickClock(isServer))

    if (!store.getState().placeholderData) {
      store.dispatch(loadData())
    }

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

    return { isServer }
  }

  componentDidMount () {
    // this.props.dispatch(startClock())
  }

  render () {
    return <Page title='Index Pge' linkTo='/other' NavigateTo='Other Page' />
  }
}

export default connect()(Index)
