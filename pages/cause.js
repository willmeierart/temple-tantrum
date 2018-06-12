import { graphql, compose } from 'react-apollo'
import withData from '../lib/withData'
import { causePage } from '../lib/queries'
import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'

const Cause = props => {
  let isMobile
  const checkIfMobile = () => {
    if (typeof window !== 'undefined') {
      if (typeof window.orientation !== 'undefined') {
        isMobile = true
      }
    } else {
      setTimeout(checkIfMobile, 200)
    }
  }
  checkIfMobile()
  const cause = props.data.allCausePages ? props.data.allCausePages[0] : { body: '<div/>', header: '' }
  const { body, header } = cause
  return (
    <AppProvider {...props} title='Cause'>
      <Head title='Cause' />
      <section>
        <div className='good-cause'>
          <div className='all-for'>ALL FOR A GOOD</div>
          <div className='cause'>CAUSE</div>
        </div>
        <div className='content'>
          <div className='logo-wrapper'>
            <img src='/static/images/logos/pforum.png' />
          </div>
          { !isMobile && <div className='img-wrapper'>
            <img src='/static/images/cause-img.png' />
          </div> }
          <div className='txt'>
            <div className='header'>{ header }</div>
            <div className='body' dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </div>
        <style jsx>{`
          section {
            width: 80%;
            height: 70vh;
            position: relative;
            margin-left: 10%;
            margin-top: 30vh;
            flex-grow: 1;
            height: 100%;
            color: white;
            font-family: 'Verlag-Black';
            letter-spacing: 0.125em;
            margin-bottom: 150px;
            z-index: 4;
          }
          .good-cause {
            font-family: Leafy;
            text-align: center;
            position: absolute;
            top: 0;
            left: 5vw;
            transform: rotate(-20deg);
            z-index: 20;
          }
          .good-cause .cause {
            font-size: 3em;
            line-height: 1em;
          }
          .content {
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-rows: 150px 50px 2fr;
            grid-template-columns: 1fr 1fr 2.75fr;
          }
          .logo-wrapper {
            grid-column: 2/4;
            grid-row: 1/3;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            position: relative;
          }
          .logo-wrapper img {
            max-width: 100vw;
          }
          .img-wrapper {
            grid-column: 1/3;
            grid-row: 2/4;
            position: relative;
            object-fit: contain;
          }
          .img-wrapper img {
            position: absolute;
            width: 100%;
          }
          .txt {
            grid-row: 3/4;
            grid-column: ${!isMobile ? '3/4' : '1/4'};
            padding: 1.5em;
            font-size: 1.25em;
            line-height: 1.25em;
          }
          .header {
            font-size: 1.25em;
          }
          @media screen and (min-width: 500px) and (max-width: 700px) {
            .img-wrapper img {
              top: 5vw;
            }
          }
          @media screen and (max-width: 499px) {
            .img-wrapper img {
              top: 8vw;
            }
          }
          @media screen and (min-width: 1100px) {
            section {
              margin-bottom: 30vw;
            }
          }
        `}</style>
      </section>
    </AppProvider>
  )
}

export default withData(
  graphql(causePage)(Cause)
)
