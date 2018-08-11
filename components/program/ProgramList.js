import EventModule from './EventModule'
import moment from 'moment'

const formatTime = program => {
  const { dateTime } = program
  const momentVal = moment(dateTime).isValid() ? moment(dateTime).format('h:mm').split(':') : [-100, -100]
  const amPm = moment(dateTime).format('a').toLowerCase()
  if (moment(dateTime).isValid() && ((momentVal[0] === '12' && amPm.indexOf('a') !== -1) || amPm.indexOf('p') !== -1)) {
    momentVal[0] = momentVal[0] + 12
  }
  return momentVal
}

const ProgramList = ({ programs, filter, hoverCursor }) => {
  const renderMany = () => {
    return programs.filter(p => p.timeVisibility).sort((a, b) => {
      if (formatTime(a)[0] === formatTime(b)[0]) {
        return formatTime(b)[1] - formatTime(a)[1]
      } else {
        return formatTime(b)[0] - formatTime(a)[0]
      }
    }).concat(programs.filter(p => !p.timeVisibility)).map((program, i) => {
      return (
        <div onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} key={i} className={i % 2 === 0 ? 'left module-wrapper' : 'right module-wrapper'}>
          <EventModule i={i} hoverCursor={hoverCursor} program={program} />
          <style jsx>{`
            .module-wrapper {
              display: flex;
              width: 80%;
              align-items: center;              
            }
            .left {
              justify-content: flex-start;
            }
            .right {
              justify-content: flex-end;
            }
          `}</style>
        </div>
      )
    })
  }
  return (
    <div className='outer-container'>
      <div className='inner-container'>{ programs
        ? programs.length > 0
          ? renderMany()
          : <div className='none-wrapper'>
            <div>Please check back for more { filter } later!</div>
          </div>
        : null
      }</div>
      <style jsx>{`
        .outer-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .none-wrapper {
          color: rgba(249, 209, 71);
          font-family: leafy;
          font-size: 2em;
        }
        .inner-container {
          width: 80vw;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          position: relative;
        }
      `}</style>
    </div>
  )
}

ProgramList.propTypes = {}

export default ProgramList
