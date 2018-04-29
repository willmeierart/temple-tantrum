// import { graphql, compose } from 'react-apollo'
// import Loader from 'react-loaders'
// import withData from '../lib/withData'
// import { allFadeColors, allPaintings } from '../lib/queries'
// import { formatColors } from '../lib/_utils'
import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'
import Socials from '../components/Socials'
import DateModule from '../components/DateModule'

// include boilerplate for global loader dependent on graphql req's:
export default class HomePage extends Component {

  render () {
    return (
      <AppProvider url={this.props.url} title='Home'>
        <Head title='Home' />
        <section>
          <div className='socials-wrapper'>
            <Socials />
          </div>
          <div className='date-wrapper'>
            <DateModule />
          </div>
          {/* <div className='img-wrapper'>
            <img src='/static/images/home_text.png' />
          </div> */}
          {/* {allThings1.loading || allThings2.loading ? (
            <div className='loader-wrapper'>
              <Loader type='line-spin-fade-loader' active />
            </div>
          ) : ( */}
          {/* )} */}
        </section>
        <style jsx>{`
          section {
            position: relative;
            height: 100vh;
            width: 100vw;
          }
          .img-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
          }
          img {
            width: 50%;
            height: 50%;
          }
          .socials-wrapper {
            position: absolute; 
            top: 30vh;
            right: 10vw;
          }
          .date-wrapper {
            position: absolute;
            width: 150px;
            left: 10vw;
            top: 10vw;
          }
            {/* .loader-wrapper {
              width:100%; height:100%;
              display: flex; justify-content: center; align-items:center;
            } */}
        `}</style>
      </AppProvider>
    )
  }
}

// example of GraphQL with multiple queries composed:
// export default withData(
//   compose(
//     graphql(allThings1, { name: 'allThings1' }),
//     graphql(allThings2, { name: 'allThings2' })
//   )(HomePage)
// )
