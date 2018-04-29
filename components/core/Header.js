import Link from 'next/link'
import NavBar from './NavBar'

const Header = () => (
  <div className='header-outer'>
    <div className='header-inner'>
      <Link href='/'>
        <div className='logo-wrapper'>
          <img src='/static/images/logo.png' />
        </div>
      </Link>
      <NavBar />
    </div>
    <style jsx>{`
      .header-outer {
        z-index: 6;
        position: relative;
        width: 100%;
      }
      .header-inner {
        padding: 4em;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo-wrapper {
        cursor: pointer;
      }
      
    `}</style>
  </div>
)

export default Header
