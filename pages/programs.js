import React, { Component } from 'react'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'
import ProgramsWrapper from '../components/program/Wrapper'
import ProgramList from '../components/program/ProgramList'
import SubList from '../components/program/SubList'
import withData from '../lib/withData'
import { graphql, compose } from 'react-apollo'
import { allPrograms } from '../lib/queries'

class Programs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: 'All'
    }
    this.filters = ['All', 'Music', 'Art', 'Comedy', 'Experiences']
    this.setActiveFilter = this.setActiveFilter.bind(this)
    this.filterList = this.filterList.bind(this)
  }
  setActiveFilter (filter) {
    const thisFilter = this.filters.filter(filter2 => {
      const ret = filter2.indexOf(filter) === 0
      return ret
    })[0]
    this.setState({ filter: thisFilter })
  }

  filterList (list = []) {
    const { filter } = this.state
    return list.filter(item => filter === 'All' ? true : filter.indexOf(item.type) !== -1)
  }

  render () {
    const { data, url } = this.props
    const programs = data.allProgramses
    const allGenerals = data.allGenerals
    console.log(allGenerals)
    const types = programs ? programs.map(program => program.type) : null
    const pageDescription = typeof allGenerals !== 'undefined' && typeof allGenerals[0] !== 'undefined' ? allGenerals[0].programsPageDescription : null
    const pageTitle = typeof allGenerals !== 'undefined' && typeof allGenerals[0] !== 'undefined' ? allGenerals[0].programsPageTitle : null
    return (
      <AppProvider {...this.props} title='Programs'>
        <Head description={pageDescription || "Two Full days Music, Art, Funhouse, Wrestling, Costumes, Experience and Food Trucks.  What else could you ask for?"} title={pageTitle || 'Temple Tantrum - Programs'} />
        <ProgramsWrapper setActiveFilter={this.setActiveFilter} filters={this.filters} filter={this.state.filter} programs={this.filterList(programs)} />
      </AppProvider>
    )
  }
}

export default withData(
  graphql(allPrograms)(Programs)
)
