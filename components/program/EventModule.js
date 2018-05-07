import moment from 'moment'

const EventModule = ({ program, hoverCursor }) => {
  const { dateTime, image: { url }, link, title } = program
  const formatTime = moment(dateTime).isValid()
    ? moment(dateTime).format('dddd, MMMM Do YYYY, h:mm a')
    : 'Check back later for event time'
  return (
    <div className='outer-container'>
      <a href={link}>
        <div className='inner-container'>
          <div className='title'>{ title || 'Event' }</div>
          <div className='date'>{ formatTime }</div>
          <img src={url} />
        </div>
      </a>
      <style jsx>{`
        .outer-container {
          width: 30vw;
          position: relative;
          color: white;
        }
        .inner-container {
          width: 100%;
          height: 100%;
        }
        .title {
          font-family: leafy;
          font-size: 2em;
          letter-spacing: .05em;
        }
        img {
          max-width: 30vw;
          {/* height: 30vw; */}
        }
      `}</style>
    </div>
  )
}

EventModule.propTypes = {}

export default EventModule
