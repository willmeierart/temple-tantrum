import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
import withData from '../lib/withData'
import { homePage } from '../lib/queries'
import { binder } from '../lib/_utils'
import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'
import HomeWrapper from '../components/home'

// include boilerplate for global loader dependent on graphql req's:
class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sponsors: []
    }
    // binder(this, ['renderTextBoxes'])
  }

  componentDidUpdate (prevProps) {
    const sponsors = this.props.data.allSponsorses
    if (this.props.data) {
      if (sponsors !== prevProps.data.allSponsorses && sponsors.length > 0) {
        this.props.onSetSponsors(sponsors)
      }
    }
  }

  render () {
    console.log(this.props)
    return (
      <AppProvider sponsors={this.state.sponsors} {...this.props} title='Home'>
        <Head title='Home' />
        <HomeWrapper {...this.props} />
      </AppProvider>
    )
  }
}

// example of GraphQL with multiple queries composed:
export default withData(
  graphql(homePage)(HomePage)
)
