import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'

const Contact = props => {
  const email = 'templetantrumfest@gmail.com'
  const splitEmail = email.split('').map(l => <span>{ l }</span>)
  return (
    <AppProvider {...props} title='Contact'>
      <Head title='Contact' />
      <section>
        <div className='msg'>WE LOOK FORWARD TO HEARING FROM YOU!</div>
        <a href={`mailto:${email}`} target='_blank'><div className='email'>{ splitEmail }</div></a>
      </section>
      <style jsx>{`
        section {
          color: white;
          font-family: leafy;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          letter-spacing: 0.125em;
          font-size: 2em;
          text-align: center;
          z-index: 4;
          margin-top: 20vh;
        }
        .email {
          width: 100vw;
          display: flex;
          justify-content: center;
          margin-top: 2em;
          font-size: 2em;
          {/* white-space: pre-wrap; */}
          flex-wrap: wrap;
        }
        .email:hover {
          color: rgba(249, 209, 71);
        }
      `}</style>
    </AppProvider>
  )
}

export default Contact
