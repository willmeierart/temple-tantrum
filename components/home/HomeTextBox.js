import Link from 'next/link'

const HomeTextBox = ({ data, L, hoverCursor }) => {
  const { title, body, backgroundText, linktext, linkURL } = data
  return (
    <div className='outer-container'>
      <div className='inner-container'>
        <div className='background-txt'>{ backgroundText }</div>
        <div className='main-content'>
          <div className='title'>{ title }</div>
          <div className='description'>{ body }</div>
          <div onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} className='link'>
            <Link href={linkURL}><a>{linktext}</a></Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .outer-container {
          width: 100vw;
          position: relative;
          color: white;
          display: flex;
          justify-content: ${L === true ? 'flex-start' : 'flex-end'};
          align-items: center;
          margin-bottom: 11vh;
        }
        .inner-container {
          width: 60%;
          height: 100%;
          min-height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #67bfad;
          padding: 3em 10vw;
          position: relative;
        }
        .main-content {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .title {
          font-family: 'Euphorigenic';
          color: #1D1E47;
          font-size: 3em;
          padding-bottom: .5em;
        }
        .description {
          color: white;
          padding-bottom: 1em;
          width: 80%;
          align-self: flex-end;
        }
        .background-txt {
          font-family: 'Leafy';
          font-weight: bold;
          font-size: 7em;
          transform: rotate(-30deg);
          color: #5fa38f;
          position: absolute;
          z-index: 15;
          width: 50%;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
          {/* align-content: flex-start; */}
          margin-left: -10vw;
        }
        .link, .link a {
          font-family: 'Verlag-Book';
          color: #1D1E47;
          text-decoration: underline;
          text-align: right;
        }
        .main-content {
          z-index: 20;
        }
        @media screen and (max-width: 700px) {
          .background-txt {
            font-size: 4em;
          }
        }
      `}</style>
    </div>
  )
}

HomeTextBox.propTypes = {}

export default HomeTextBox
