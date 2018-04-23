import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'

const Cause = ({ url }) => (
  <AppProvider url={url} title="Cause">
    <Head title="Cause" />
    <section>
      <div className="page-title">Cause</div>
    </section>
    <style jsx>{``}</style>
  </AppProvider>
)

export default Cause
