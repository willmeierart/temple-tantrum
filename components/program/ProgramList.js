import EventModule from './EventModule'

const ProgramList = ({ programs, filter, hoverCursor }) => {
  const renderMany = () => {
    return programs.map((program, i) => {
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
