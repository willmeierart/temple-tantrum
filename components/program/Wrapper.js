import React, { Component } from 'react'
import SubList from './SubList'
import ProgramList from './ProgramList'
import { connect } from 'react-redux'
import { hoverCursor } from '../../lib/redux/actions'
import { binder } from '../../lib/_utils'

class ProgramsWrapper extends Component {
  constructor (props) {
    super(props)
    // binder(this, [''])
  }

  componentDidMount () {}

  render () {
    return (
      <div className='outer-wrapper'>
        <section>
          { !this.props.isMobile && <div className='subnav'>
            <SubList hoverCursor={this.props.onHoverCursor} setActiveFilter={this.props.setActiveFilter} filters={this.props.filters} filter={this.props.filter} />
          </div> }
          <div className='list-wrapper'>
            <ProgramList hoverCursor={this.props.onHoverCursor} filter={this.props.filter} programs={this.props.programs} />
          </div>
        </section>
        <style jsx>{`
          .outer-wrapper {
            z-index: 4;
            position: relative;
            margin-bottom: 150px;
          }
          section {
            margin-top: 30vh;
          }
          .sublist {
            width: 80%;
            margin-left: 10%;
          }
          .list-wrapper {
          }
        `}</style>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isMobile: state.env.isMobile
    // dims: state.env.dims,
    // cursorHovered: state.env.cursorHovered,
    // sponsors: state.cachedData.sponsors
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onHoverCursor: bool => dispatch(hoverCursor(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsWrapper)
