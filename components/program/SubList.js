const ProgramList = ({ filters, filter, setActiveFilter, hoverCursor }) => {
  const renderList = () => {
    return filters.map((type, i) => {
      const isActive = filter === type
      return (
        <li onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} onClick={() => { setActiveFilter(type) }} key={i} className='module-wrapper'>
          <div className='type'>{ type }</div>
          <style jsx>{`
            .module-wrapper {
              display: flex;
              font-weight: ${isActive && 'bold'};
              justify-content: center;
              align-items: center;
              color: ${isActive ? '#f8d147' : 'white'};
              font-family: leafy;
              font-size: ${isActive ? '2.25em' : '2em'};
              margin: 10px;              
            }
          `}</style>
        </li>
      )
    })
  }
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <ul>{ renderList() }</ul>
      </div>
      <style jsx>{`
        .outer-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .inner-container {
          width: 80vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        ul {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }
      `}</style>
    </div>
  )
}

ProgramList.propTypes = {}

export default ProgramList
