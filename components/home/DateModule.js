import PropTypes from 'prop-types'

const DateModule = ({ date }) => {
  // console.log(date);
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div>{date.start}-{date.end}</div>
        <div className='ln2'>DENVER, CO</div>
      </div>
      <style jsx>{`
        .outer-container {
          width: 150px;
          font-size: .8em;
          letter-spacing: .2em;
          line-height: 2em;
          color: white;
          font-family: 'Verlag-Book';
        }
        .ln2 {
          font-size: .8em;
        }
      `}</style>
    </div>
  )
}

DateModule.propTypes = {}

export default DateModule
