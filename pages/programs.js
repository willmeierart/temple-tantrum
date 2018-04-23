import AppProvider from '../lib/redux/AppProvider'
import Head from '../components/Head'

const Programs = ({ url }) => (
  <AppProvider url={url} title="Programs">
    <Head title="Programs" />
    <section>
      <div className="page-title">Programs</div>
    </section>
    <style jsx>{``}</style>
  </AppProvider>
)

export default Programs
