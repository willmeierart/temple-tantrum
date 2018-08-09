import moment from 'moment'

const EventModule = ({ program, hoverCursor, i }) => {
  const { dateTime, image: { url }, link, title } = program
  const formatTime = moment(dateTime).isValid()
    ? moment(dateTime).format('dddd, MMMM Do YYYY, h:mm a')
    : 'Check back later for event time'
  return (
    <div className='outer-container'>
      <a href={link} className='inner-container'>
        <img src={url} />
      </a>
      <div className='inner-container'>
        <div className='title'>{title || 'Event'}</div>
        <div className='date'>{formatTime}</div>
      </div>
      <style jsx>{`
        .outer-container {
          width: 80vw;
          display: flex;
          justify-content: space-around;
          align-items: center;
          color: white;
          flex-direction: ${i % 2 === 0 ? 'row-reverse' : 'row'};
          margin-bottom: 3em;
        }
        .inner-container {
          width: 50%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .title {
          font-family: leafy;
          font-size: 2em;
          letter-spacing: .05em;
        }
        img {
          max-width: 30vw;
        }
      `}</style>
    </div>
  )
}

EventModule.propTypes = {}

export default EventModule
