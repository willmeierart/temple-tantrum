import Link from 'next/link'
import NavBar from './NavBar'

const Header = ({ url, mobileMenu, hoverCursor }) => (
  <div className='header-outer'>
    <div className='header-inner'>
      <Link href='/'>
        <div className='logo-wrapper'>
          <img onMouseEnter={() => { hoverCursor(true) }} onMouseLeave={() => { hoverCursor(false) }} src='/static/images/logos/tt.png' />
        </div>
      </Link>
      { !mobileMenu && <NavBar hoverCursor={hoverCursor} url={url} /> }
      
    </div>
    <style jsx>{`
      .header-outer {
        z-index: 6;
        position: absolute;
        width: 100%;
      }
      .header-inner {
        padding: 4em 10vw;
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
