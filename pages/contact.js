import { graphql, compose } from 'react-apollo'
import withData from '../lib/withData'
import AppProvider from '../lib/redux/AppProvider'
import { contactInfo } from '../lib/queries'
import Head from '../components/Head'

const Contact = props => {
  const email = 'templetantrumfest@gmail.com'
  const splitEmail = email.split('').map((l, i) => <span key={i}>{ l }</span>)
  console.log(props)
  const volunteerLink = props.data.allContactInfoes ? props.data.allContactInfoes[0].volunteerFormLink : ''
  return (
    <AppProvider {...props} title='Contact'>
      <Head title='Contact' />
      <section>
        <a className='volunteer' href={volunteerLink}> {'\>VOLUNTEER WITH US\<'}</a>
        <div className='msg'>WE LOOK FORWARD TO HEARING FROM YOU!</div>
        <a href={`mailto:${email}`} target='_blank'>
          <div className='email'>
            <span>{'\<'}</span>{splitEmail}<span>{'\>'}</span></div>
        </a>
        <style jsx>{`
          section {
            color: white;
            font-family: leafy;
            width: 100vw;
            height: 110vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            letter-spacing: 0.125em;
            font-size: 2em;
            text-align: center;
            z-index: 4;
            margin-top: 10vh;
          }
          .email {
            width: 100vw;
            display: flex;
            justify-content: center;
            font-size: 2em;
            flex-wrap: wrap;
          }
          .email:hover, .volunteer:hover {
            color: rgba(249, 209, 71);
          }
          .volunteer {
            font-size: 2em;
            margin-bottom: 1em;
          }
          @media screen and (max-width: 700px) {
            .email {
              font-size: .5em;
            }
          }
        `}</style>
      </section>
    </AppProvider>
  )
}

// export default Contact
export default withData(
  graphql(contactInfo)(Contact)
)
