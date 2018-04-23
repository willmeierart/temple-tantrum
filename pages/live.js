import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'

const Live = ({ url }) => (
  <AppProvider url={url} title='Live'>
    <Head title='Live' />
    <section>
      <div className='page-title'>Live</div>
    </section>
    <style jsx>{``}</style>
  </AppProvider>
)

export default Live
