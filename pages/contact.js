import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'

const Contact = ({ url }) => (
  <AppProvider url={url} title='Contact'>
    <Head title='Contact' />
    <section>
      <div className='page-title'>Contact</div>
    </section>
    <style jsx>{``}</style>
  </AppProvider>
)

export default Contact
