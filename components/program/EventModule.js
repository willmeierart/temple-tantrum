import moment from 'moment'

const EventModule = ({ program, hoverCursor, i }) => {
  const { dateTime, image: { url }, link, title } = program
  const formatTime = moment(dateTime).isValid()
    ? [moment(dateTime).format('dddd - MMMM Do'), moment(dateTime).format('h:mm a')]
    : ['Check back later for event time', '']
  const day1 = moment(dateTime).isValid() ? parseInt(moment(dateTime).format('D')) : 0
  console.log(day1)
  return (
    <div className='outer-container'>
      <a href={link} className='inner-container'>
        <img alt={`temple tantrum fest ${title || 'event'}`} src={url} />
      </a>
      <div className='inner-container'>
        <div className='title'>{title || 'Event'}</div>
        <div className='date day'>{formatTime[0]}</div>
        <div className='date'>{ formatTime[1] }</div>
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
          font-family: leafy;
        }
        .inner-container {
          width: 50%;
          height: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          flex-wrap: nowrap;
        }
        .title {
          font-size: 5vw;
          letter-spacing: .05em;
        }
        .date {
          font-size: 3vw;
          white-space: nowrap;
        }
        .day {
          color: ${day1 === 1 ? '#689cb3' : 'white'};
        }
        img {
          max-width: 30vw;
          margin: 0 4vw;
        }
      `}</style>
    </div>
  )
}

EventModule.propTypes = {}

export default EventModule
