import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'
import withData from '../lib/withData'
import { graphql, compose } from 'react-apollo'
import { aboutPage } from '../lib/queries'
import AboutWrapper from '../components/about/Wrapper'

class About extends Component {
  componentDidMount () {
  }
  render () {
    return (
      <AppProvider {...this.props} title='About'>
        <Head title='About' />
        <section>
          <AboutWrapper data={this.props.data} />
        </section>
        <style jsx>{``}</style>
      </AppProvider>
    )
  }
}

// export default About
export default withData(
  graphql(aboutPage)(About)
)
